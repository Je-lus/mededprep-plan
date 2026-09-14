# Exam Features Unified Plan: Exclude Questions from Grade + Digital Signatures

**Date:** 2026-06-01
**Source:** Synthesis of Codex and Gemini scoping reports
**Codebase:** `/home/jeramey/projects/mededprep-c` (Laravel)
**Scope Narrowing Applied:** Feature 1 only affects Students List, Questions List, and High Stakes Report

---

## 1. Cross-Report Comparison

### Where Both Reports Agree

Both agents independently arrived at the same conclusions on core architecture:

- **Shared model:** Both confirm `UnitExamCreateExam` serves both unit exams and exit exams via a `type` enum column. No separate models.
- **Exit exam flow:** Both confirm exit exams use `ExitExamQuestionSet` / `ExitExamQuestionSetQuestion` as templates, then instantiate into `unit_exam_group_selected_questions` when assigned. Exclusion belongs on the instance table, not the template.
- **Grade calculation is scattered:** Both identify multiple independent locations with no central grade service.
- **No Medical Director role exists:** Both confirm only a global CAPCE `capce_medical_director_name`/`capce_medical_director_signature` in `Settings` -- no per-user or per-school MD role.
- **High Stakes form already has signature placeholders:** Both confirm the existing form has blank fields for Medical Director and Program Director signatures that just need to be populated.
- **Migration target for exclusion:** Both agree: add a boolean column to `unit_exam_group_selected_questions` (per-exam-instance, not per-question-bank).
- **Retroactive recalculation is the hard part:** Both flag that excluding a question after students submit means stored `unit_exam_student_exam_info` values become stale.
- **`status` column is different from exclusion:** Gemini explicitly calls this out -- `status=0` (unpublish) removes a question before the exam; `is_excluded` leaves it visible but ungraded. Codex does not mention this distinction but implies it by placing exclusion on a separate column.

### Where They Disagree

| Topic | Codex | Gemini | Resolution |
|-------|-------|--------|------------|
| **Grade calculation locations** | 6+ locations | 4 locations | Codex is more thorough -- see reconciliation below |
| **Column naming** | `excluded_from_grade` | `is_excluded` + `excluded_by` + `excluded_at` | Gemini's is better -- audit trail matters. Use `is_excluded`, `excluded_by`, `excluded_at` |
| **Signature storage (Feature 2)** | Separate `exam_signatures` table | Columns directly on `unit_exam_create_exam` | Gemini's approach is simpler and sufficient -- one MD and one PD per exam. A separate table is overkill for two signatures. Use columns on `unit_exam_create_exam` |
| **Medical Director role approach** | School-level assignment (`medical_director_id` on `schools`) | New role in `roles` table | Codex's school-level approach is more correct for the real-world relationship. A "Medical Director" role alone doesn't link an MD to a specific program. Use school-level assignment (Option 3 from Codex) |
| **Recalculation strategy** | Option A (always recalculate on-the-fly for display) vs Option B (reprocess stored values) -- recommends Option A | Synchronous batch recalculation on toggle | For the narrowed scope, Gemini's batch recalculation approach is cleaner -- update `unit_exam_student_exam_info` when the toggle fires, so the High Stakes form reads correct stored values without needing on-the-fly recalc. See detailed discussion below. |
| **Build order** | Feature 1 first (foundation), Feature 2 second | Feature 2 first (simpler, lower risk) | Gemini's order is better -- ship signatures first as a quick win while the harder exclusion work proceeds |
| **Effort estimate** | 6-10 days total | 3-4 days total | Codex's estimate was for the full unscoped feature. With narrowed scope, Gemini's is closer but slightly optimistic. Unified estimate below. |

### Where One Found Something the Other Missed

**Codex found, Gemini missed:**
- Performance report controllers (`UnitExamStudentPerformanceReportController`, `ExitExamStudentPerformanceReportController`) as additional grade calculation locations -- but these are OUT OF SCOPE per the narrowing
- Background jobs (`GenerateUnitAndExitExamCategoryWiseReport`, `GenerateSubCategoryObjectiveWiseReportForUnitExitExam`) that calculate stored report data -- also OUT OF SCOPE
- The `printReport` method (line 725) as a separate entry point -- Gemini lists this route but does not discuss it as a grade calculation site
- Director listing view (`admin/director/listing.blade.php`) -- relevant for Feature 2's MD assignment UI
- JavaScript files for question management (`unit_exam_question_create.js`, `unit_exam_reassign_create.js`) -- relevant if the toggle needs to integrate with existing JS state in sessionStorage

**Gemini found, Codex missed:**
- The `status` column distinction -- explicit warning not to overload `status` for exclusion
- `excluded_by` and `excluded_at` audit columns -- Codex only proposed the boolean
- The `discriminationCalculation` method in `UnitExamStudentService` -- notes that excluded questions should still show discrimination index data (they are beta questions being analyzed)
- The `code` field on `UnitExamQuestion` used as a display identifier -- useful for the "Changes made to exam" textarea
- Subcategory performance calculation on the High Stakes form (lines 792-829) as a separate location needing exclusion filtering

---

## 2. Reconciled Grade Calculation Locations (All Found Across Both Reports)

| # | Location | File | Line | What It Does | IN SCOPE? |
|---|----------|------|------|-------------|-----------|
| 1 | `submitQuiz` | `app/Services/Frontend/UnitExamService.php` | 877 | Counts correct/incorrect at submit time, persists to `unit_exam_student_exam_info` | **YES** -- stored values feed Students List and High Stakes |
| 2 | `totalCorrectAnswers` | `app/Services/Admin/UnitExamStudentService.php` | 2061 | Admin-side aggregate query for student grades | **YES** -- feeds Students List page |
| 3 | `examResultStudentWise` | `app/Http/Controllers/Admin/UnitExamStudentController.php` | 918 (count at ~953) | Calculates percentage per student from attempt history + total questions count | **YES** -- IS the Students List page |
| 4 | `printHighStakesExamAnalysis` | `app/Http/Controllers/Admin/UnitExamStudentController.php` | 757 (scores at ~770) | Highest/lowest/average/median from `unit_exam_student_exam_info`; subcategory performance at ~792-829 | **YES** -- IS the High Stakes Report |
| 5 | `reviewQuestion` | `app/Http/Controllers/Frontend/UnitExamController.php` | 396-411 | Student-facing review with correct/incorrect/total counts | **NO** -- student-facing review page, not in narrowed scope |
| 6 | Performance report controllers | `app/Http/Controllers/Admin/Reports/UnitExamStudentPerformanceReportController.php` and `ExitExamStudentPerformanceReportController.php` | Various | Separate reporting controllers | **NO** -- broader reporting system |
| 7 | Background jobs | `GenerateUnitAndExitExamCategoryWiseReport`, `GenerateSubCategoryObjectiveWiseReportForUnitExitExam` | Various | Stored report generation | **NO** -- broader reporting system |
| 8 | `discriminationCalculation` | `app/Services/Admin/UnitExamStudentService.php` | Various | Discrimination index per question | **PARTIAL** -- Questions List shows this, but excluded questions should STILL show their discrimination index (per Gemini's insight). No filtering needed here, just visual marking. |

**In-scope locations requiring code changes: #1, #2, #3, #4, and visual indicator on Questions List.**

---

## 3. Narrowed Scope: What Actually Needs to Change

### Feature 1: Exclude Questions from Grade

Given the scope narrowing to only Students List, Questions List, and High Stakes Report:

#### A. Database Migration

Add three columns to `unit_exam_group_selected_questions`:

```
is_excluded       BOOLEAN DEFAULT FALSE
excluded_by       UNSIGNED BIGINT NULLABLE (FK -> users)
excluded_at       TIMESTAMP NULLABLE
```

**One migration file. Simple.**

#### B. Toggle Endpoint

New route and controller method:

```
POST admin/unitexam/toggle-question-exclusion/{examId}/{questionId}
```

In `UnitExamStudentController`. On toggle:
1. Update `is_excluded`, `excluded_by`, `excluded_at` on the pivot row
2. Trigger batch recalculation of `unit_exam_student_exam_info` for all students on this exam (see below)
3. Return JSON for AJAX response

**One controller method. Simple.**

#### C. Batch Recalculation (triggered by toggle)

When a question's exclusion status changes, recompute for every student who took this exam:
1. Get all excluded question IDs for the exam from `unit_exam_group_selected_questions`
2. For each student's `unit_exam_quiz_attempt_history` rows on this exam, recount `total_correct_answers`, `total_incorrect_answers`, and `number_of_questions` -- excluding the excluded question IDs
3. Bulk update `unit_exam_student_exam_info`

This can be a method on `UnitExamStudentService` or a standalone service. The dataset is small (dozens of students per exam, not thousands), so synchronous execution on toggle is fine.

**One service method. Medium complexity due to the existing raw SQL patterns.**

#### D. Students List Page (examResultStudentWise)

**Controller** (`UnitExamStudentController::examResultStudentWise`, line 918):
- The `totalCorrectAnswers` service call (Location #2) needs to exclude questions where `is_excluded = true`. Add a `LEFT JOIN` or `WHERE question_id NOT IN (...)` subquery.
- The `totalQuestions` count (at ~line 953) needs the same filter.

**View** (`resources/views/admin/unitexam/examResultStudentWise.blade.php`):
- No structural changes needed if the controller passes corrected numbers. Possibly add a small note like "(N questions excluded)" if any exclusions exist.

**Two code locations in one controller + one service method. Medium.**

#### E. Questions List Page (examResultQuestionWise)

**Controller** (`UnitExamStudentController::examResultQuestionWise`, line 681):
- Load `is_excluded` status for each question from `unit_exam_group_selected_questions`
- Pass to view

**View** (`resources/views/admin/unitexam/examResultQuestionWise.blade.php`):
- Add a toggle/checkbox column for each question row (AJAX call to toggle endpoint)
- Visually mark excluded questions (strikethrough, badge, muted row, etc.)
- Excluded questions should still show their discrimination index and stats (they are being analyzed for quality -- that is the whole point of excluding rather than removing)

**One controller method update + one view update + JS. Medium.**

#### F. High Stakes Report

**Controller** (`UnitExamStudentController::printHighStakesExamAnalysis`, line 757):
- Scores at ~line 770: These read from `unit_exam_student_exam_info`. If batch recalculation runs on toggle (section C), these are already correct. No change needed here.
- Subcategory performance at ~lines 792-829: This loops over `unit_exam_quiz_attempt_history` grouped by question. Must filter out excluded question IDs.
- Pass list of excluded questions (with their `code` identifiers) to the view.

**View** (`resources/views/admin/unitexam/printHighStakesExamAnalysis.blade.php`):
- Auto-populate the "Changes made to exam if applicable" textarea (lines 330-337) with text like: "The following questions were excluded from grade calculation: Q123, Q456, Q789"

**One controller update + one view update. Simple-Medium.**

### Feature 2: Medical Director / Program Director Digital Signatures

#### A. Database Migrations

**Migration 1:** Add signature columns to `unit_exam_create_exam`:
```
medical_director_signed_by    UNSIGNED BIGINT NULLABLE (FK -> users)
medical_director_signed_at    TIMESTAMP NULLABLE
program_director_signed_by    UNSIGNED BIGINT NULLABLE (FK -> users)
program_director_signed_at    TIMESTAMP NULLABLE
```

**Migration 2:** Add `medical_director_id` to `schools` table:
```
medical_director_id    UNSIGNED BIGINT NULLABLE (FK -> users)
```

**Two migrations. Simple.**

#### B. Medical Director Assignment

- Add `medical_director_id` column to schools (migration above)
- Update the school admin form to allow selecting a user as Medical Director
- Add accessor on User model: `isMedicalDirectorOf($schoolId)` that checks if the user is assigned as MD for that school
- The MD does not need a separate role -- they keep their existing role but gain signing authority for their school's exams

Relevant view: `resources/views/admin/director/listing.blade.php` (Codex found this)

**School model + admin school form + User model accessor. Medium.**

#### C. Sign Endpoint

New route and controller method:
```
POST admin/unitexam/sign/{examId}/{role}    (role = medical_director | program_director)
```

In `UnitExamStudentController`:
1. Validate the user has authority to sign (MD: `isMedicalDirectorOf($exam->school_id)`; PD: `has_schools == 1` for the relevant school)
2. Set `{role}_signed_by` and `{role}_signed_at` on the exam record
3. Return JSON for AJAX

Signatures are permanent -- no unsign endpoint.

**One controller method. Simple.**

#### D. Sign Button UI

On both `examResultStudentWise.blade.php` and `examResultQuestionWise.blade.php`:
- Show "Review & Sign" button if the current user can sign and has not yet signed
- Show "Signed by [Name] on [Date]" if already signed
- Confirmation dialog before signing ("This cannot be undone")
- AJAX POST to sign endpoint

**Two view updates + JS. Simple.**

#### E. High Stakes Report Signature Display

**Controller** (`printHighStakesExamAnalysis`):
- Load the exam's signature data (signed_by users + timestamps)
- Pass to view

**View** (`printHighStakesExamAnalysis.blade.php`):
- "Medical Director" row (around line 362): If signed, show "Y" checked + signer name + date
- "Program Director" line (around line 400): If signed, show signer name + date
- If unsigned, leave as current blank/manual fields

**One controller update + one view update. Simple.**

---

## 4. Gotchas and Risk Factors

### Critical

1. **Batch recalculation correctness.** When the toggle fires, the recalculation must match exactly what `totalCorrectAnswers` and `examResultStudentWise` produce for live queries. If these diverge (different SQL patterns, edge cases with `is_attempted` values), grades will be inconsistent between the Students List (live query) and the High Stakes form (reads stored values). **Mitigation:** Write the recalculation logic once and use it in both the toggle handler and the student list query, or at minimum, test both paths produce identical results for the same exam.

2. **The `number_of_questions` field must also change.** Every percentage calculation divides by `number_of_questions`. When questions are excluded, this count must decrease. Both stored (in `unit_exam_student_exam_info`) and live (COUNT queries) versions must agree.

3. **`submitQuiz` must respect exclusions at submit time.** If a student takes an exam after a question has already been excluded, the submit-time calculation (Location #1) should exclude it too. Otherwise the stored values are immediately wrong. This requires the submit path to check `is_excluded` when counting.

### Important

4. **Exit exam question flow.** When an exit exam is created from a question set, questions are copied into `unit_exam_group_selected_questions`. The `is_excluded` column will exist and default to `false`, so this works naturally. No changes needed to the exit exam creation flow.

5. **The `status` column is not the same as exclusion.** Do not overload it. `status=0` (unpublish) likely prevents the question from appearing at all; `is_excluded` leaves it visible and answerable but removes it from grade calculation.

6. **Discrimination index should still compute for excluded questions.** The Questions List page shows statistical analysis -- excluded questions are being analyzed for quality. Show the stats but visually indicate the question is excluded from grading.

7. **Medical Directors may not have accounts.** If the MD for a school does not have a user account in the system, one must be created before they can sign. The school admin form should make this clear.

8. **PDF rendering of signatures.** The High Stakes form renders via mPDF. Text-based signatures (name + date) will render fine. If drawn/image signatures are ever desired, mPDF supports embedded images but it needs testing. For v1, text signatures are sufficient.

### Low Risk

9. **Out-of-scope locations will show old grades.** The student-facing review page, performance reports, and background jobs will NOT reflect exclusions. This is acceptable per the scope narrowing -- but it means a student reviewing their own exam will see a different grade than the instructor sees on the Students List. This should be documented and communicated.

10. **Multi-school program directors.** A PD managing multiple schools should only sign exams for schools they oversee. The existing `has_schools` mechanism likely already scopes this, but verify the school-to-user relationship in the signing authorization check.

---

## 5. Implementation Plan

### Build Order

**Phase 1: Digital Signatures (Feature 2) -- Ship First**
Lower risk, no grade logic changes, independent of Feature 1.

| Step | What | Files | Effort |
|------|------|-------|--------|
| 1.1 | Migration: signature columns on `unit_exam_create_exam` | New migration | 15 min |
| 1.2 | Migration: `medical_director_id` on `schools` | New migration | 15 min |
| 1.3 | Model updates: `ExamSignature` relationships on `UnitExamCreateExam`, `isMedicalDirectorOf()` on `User` | `UnitExamCreateExam.php`, `User.php` | 30 min |
| 1.4 | School admin form: MD assignment dropdown | School admin view + controller | 1 hr |
| 1.5 | Sign endpoint | `UnitExamStudentController.php`, `routes/web.php` | 1 hr |
| 1.6 | Sign button UI on exam result pages | `examResultStudentWise.blade.php`, `examResultQuestionWise.blade.php` + JS | 1.5 hr |
| 1.7 | High Stakes form: auto-populate signatures | `printHighStakesExamAnalysis` controller + view | 1 hr |
| 1.8 | Test end-to-end | -- | 1 hr |

**Phase 1 total: ~1 day**

**Phase 2: Exclude Questions from Grade (Feature 1) -- Narrowed Scope**

| Step | What | Files | Effort |
|------|------|-------|--------|
| 2.1 | Migration: `is_excluded`, `excluded_by`, `excluded_at` on `unit_exam_group_selected_questions` | New migration | 15 min |
| 2.2 | Toggle endpoint + batch recalculation method | `UnitExamStudentController.php`, `UnitExamStudentService.php` (or new service), `routes/web.php` | 2-3 hr |
| 2.3 | Questions List: toggle UI + visual indicator | `examResultQuestionWise.blade.php` + controller update + JS | 1.5 hr |
| 2.4 | Students List: filter exclusions in grade query | `UnitExamStudentService::totalCorrectAnswers`, `UnitExamStudentController::examResultStudentWise` | 1.5 hr |
| 2.5 | `submitQuiz`: respect exclusions at submit time | `UnitExamService::submitQuiz` (line 877) | 1 hr |
| 2.6 | High Stakes: subcategory exclusion + "Changes made" textarea | `printHighStakesExamAnalysis` controller + view | 1 hr |
| 2.7 | Test: verify grades match across Students List and High Stakes for same exam with exclusions | -- | 1.5 hr |

**Phase 2 total: ~1.5 days**

**Phase 3: Integration Testing**

| Step | What | Effort |
|------|------|--------|
| 3.1 | Test both features together on a single exam | 30 min |
| 3.2 | Test exit exam flow (question set -> instance -> exclude -> sign) | 30 min |
| 3.3 | Verify PDF rendering of High Stakes form with both features active | 30 min |
| 3.4 | Edge cases: exclude all questions, exclude then re-include, sign before/after exclusion | 30 min |

**Phase 3 total: 0.5 day**

---

## 6. Effort Summary

| Phase | Estimate |
|-------|----------|
| Phase 1: Digital Signatures | 1 day |
| Phase 2: Exclude from Grade (narrowed) | 1.5 days |
| Phase 3: Integration Testing | 0.5 day |
| **Total** | **3 days** |

The original Codex estimate of 6-10 days was for the full unscoped feature (all grade locations, performance reports, background jobs, centralized grade service refactor). The scope narrowing eliminates roughly 60% of that work. Gemini's 3-4 day estimate was closer; with the three-page constraint, 3 days is realistic for a developer familiar with the codebase.

**If scope creeps back** (e.g., "actually we need the student review page too" or "performance reports should also reflect exclusions"), add 1-2 days per additional surface.

---

## 7. Key Decisions Recorded

1. **Column naming:** `is_excluded` / `excluded_by` / `excluded_at` (Gemini's approach -- audit trail)
2. **Signature storage:** Columns on `unit_exam_create_exam` (Gemini's approach -- simpler, sufficient for one MD + one PD per exam)
3. **Medical Director identification:** School-level assignment via `medical_director_id` on `schools` (Codex's approach -- models the real-world relationship correctly)
4. **Recalculation strategy:** Synchronous batch recalculation on toggle, updating `unit_exam_student_exam_info` (Gemini's approach -- keeps stored values correct so High Stakes reads are simple)
5. **Build order:** Feature 2 first (Gemini's recommendation -- quick win, lower risk)
6. **No centralized grade service refactor:** With the narrowed scope, the cost of refactoring all grade calculations into a central service outweighs the benefit. Patch the 3-4 in-scope locations directly. If full-scope work is ever needed, revisit the centralization idea then.
7. **Excluded questions remain visible:** On the Questions List, excluded questions show their full stats (including discrimination index) with a visual indicator. They are not hidden -- the purpose of exclusion is to analyze while not counting toward grades.

---

## 8. Files to Modify (Complete List)

### New Files
| File | Purpose |
|------|---------|
| `database/migrations/2026_06_XX_add_exclusion_fields_to_unit_exam_group_selected_questions.php` | Feature 1 migration |
| `database/migrations/2026_06_XX_add_signature_fields_to_unit_exam_create_exam.php` | Feature 2 migration |
| `database/migrations/2026_06_XX_add_medical_director_to_schools.php` | Feature 2 migration |

### Modified Files
| File | Feature | What Changes |
|------|---------|-------------|
| `app/Http/Controllers/Admin/UnitExamStudentController.php` | F1 + F2 | Toggle endpoint, sign endpoint, pass exclusion/signature data to views |
| `app/Services/Admin/UnitExamStudentService.php` | F1 | `totalCorrectAnswers` exclusion filter, batch recalculation method |
| `app/Services/Frontend/UnitExamService.php` | F1 | `submitQuiz` exclusion filter at submit time |
| `app/Models/UnitExamCreateExam.php` | F2 | Signature relationships (belongsTo for signed_by users) |
| `app/Models/UnitExamGroupSelectedQuestion.php` | F1 | `is_excluded`, `excluded_by`, `excluded_at` fillable/casts |
| `app/Models/User.php` | F2 | `isMedicalDirectorOf($schoolId)` accessor |
| `resources/views/admin/unitexam/examResultQuestionWise.blade.php` | F1 + F2 | Exclusion toggle column, sign button |
| `resources/views/admin/unitexam/examResultStudentWise.blade.php` | F1 + F2 | Exclusion count note, sign button |
| `resources/views/admin/unitexam/printHighStakesExamAnalysis.blade.php` | F1 + F2 | Excluded questions list, auto-populated signatures |
| `routes/web.php` | F1 + F2 | Two new POST routes |
| School admin view (exact path TBD) | F2 | MD assignment dropdown |
| JS assets (exact path TBD -- likely `unit_exam_question_create.js` or inline) | F1 + F2 | AJAX for toggle and sign actions |

**Total: 3 new files + ~12 modified files**
