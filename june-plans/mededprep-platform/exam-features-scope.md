# MedEdPrep Exam Features — Technical Scoping Report

**Date:** 2026-06-01
**Codebase:** `/home/jeramey/projects/mededprep-c` (Laravel)
**Features:** Exclude Questions from Grade + Medical/Program Director Digital Signatures

---

## 1. Current Architecture Overview

### How Instructor Exams and Exit Exams Work

Both instructor-led exams ("unit exams") and exit exams use the **same underlying model**: `UnitExamCreateExam`. They are differentiated by a `type` column:

- `unit_exam` — Instructor-led exams
- `exit_exam` — Exit exams

The `ExitExamExamsController` simply applies a global scope `where('type', 'exit_exam')` and aliases the model as `ExitExam`. All result views, grade calculations, and the High Stakes Exam Form are shared between both exam types. This means **any changes apply to both exam types automatically**.

### Key Database Tables

| Table | Purpose |
|-------|---------|
| `unit_exam_create_exam` | The exam itself (name, group, exam level, dates, times, type) |
| `unit_exam_group_selected_questions` | Which questions are assigned to an exam (exam_id, question_id) |
| `unit_exam_questions` | The question bank (question text, options, status, usage_type) |
| `unit_exam_question_answers` | Correct answer options per question |
| `unit_exam_quiz_attempt_history` | Per-student, per-question attempt records (answer_status, is_attempted) |
| `unit_exam_attempt_history_question_answers` | Selected answers + confidence level |
| `unit_exam_student_exam_info` | Per-student exam summary (total_correct, total_incorrect, number_of_questions, submit status) |
| `exit_exam_question_sets` | Question set templates for exit exams |
| `exit_exam_question_set_questions` | Questions within a question set |
| `roles` | Role definitions (id, name, has_schools) |
| `user_roles` | User-to-role mapping |
| `globalsettings` | Already has CAPCE signature fields (medical director, program coordinator) |

### Role/Permission System

- **Admin:** `user.id === 1` (hardcoded)
- **Program Director:** Any user whose role has `has_schools == 1` (checked via `$user->rolename->has_schools`)
- **State Director:** `user.user_type == 2` (config value `mededprep.STATE_DIRECTOR`)
- **Student:** `user.user_type == 0`
- **Medical Director:** No dedicated role exists in the system currently. The CAPCE integration stores a medical director name/number/signature globally in `globalsettings`, but there is no per-user medical director role or school-level medical director assignment.

### Grade Calculation — All Locations

Grades are calculated in **multiple places** (this is the main complexity):

1. **On exam submit** (`UnitExamService::submitQuiz`, line 877):
   - Counts `answer_status = 1` from `unit_exam_quiz_attempt_history`
   - Saves `total_correct_answers` and `total_incorrect_answers` into `unit_exam_student_exam_info`
   - `number_of_questions` is set to total count of attempt history rows

2. **Student list page** (controller: `UnitExamStudentController::examResultStudentWise`, line 918):
   - Calls `UnitExamStudentService::totalCorrectAnswers()` which uses raw SQL aggregation on `unit_exam_quiz_attempt_history` joined with `unit_exam_attempt_history_question_answers`
   - Calculates percentage: `total_correct_answers / totalQuestions * 100`
   - `totalQuestions` is the COUNT of all `unit_exam_quiz_attempt_history` rows for that user+exam

3. **High Stakes Exam Form** (`UnitExamStudentController::printHighStakesExamAnalysis`, line 757):
   - Highest/lowest scores from `unit_exam_student_exam_info` using `(total_correct_answers / number_of_questions) * 100`
   - Class average/median from same calculation across all submitted students
   - Cut score = `(highest + lowest) / 2`
   - Subcategory performance from `unit_exam_quiz_attempt_history` grouped by question + subcategory

4. **Frontend review page** (`UnitExamController::reviewQuestion`, line 396):
   - `$correct / $totalQuestion * 100` where both are counted from attempt history

5. **Performance report controllers** (separate controllers for unit exam and exit exam student performance reports)

---

## 2. Relevant File Paths

### Models
- `/app/Models/UnitExamCreateExam.php` — The exam model (both types)
- `/app/Models/UnitExamGroupSelectedQuestion.php` — Question-to-exam pivot
- `/app/Models/UnitExamQuestion.php` — Question bank
- `/app/Models/UnitExamQuestionAnswer.php` — Answer options
- `/app/Models/UnitExamQuizAttemptHistory.php` — Per-student attempt records
- `/app/Models/UnitExamAttemptHistoryQuestionAnswer.php` — Selected answers
- `/app/Models/UnitExamStudentExamInfo.php` — Exam summary per student
- `/app/Models/ExitExamQuestionSet.php` — Exit exam question set template
- `/app/Models/ExitExamQuestionSetQuestion.php` — Questions in a set
- `/app/Models/Role.php` — Roles (simple: id, name, has_schools, status)
- `/app/Models/UserRole.php` — User-role mapping
- `/app/Models/User.php` — User model (role_id, isAdmin, isPd, isStateDirector)
- `/app/Models/Settings.php` — Global settings (has CAPCE signature fields)

### Controllers
- `/app/Http/Controllers/Admin/UnitExamStudentController.php` — Main exam management (create, results, High Stakes)
- `/app/Http/Controllers/Admin/ExitExamExamsController.php` — Exit exam list (thin wrapper)
- `/app/Http/Controllers/Frontend/UnitExamController.php` — Student-facing exam taking + review
- `/app/Http/Controllers/Admin/Reports/UnitExamStudentPerformanceReportController.php`
- `/app/Http/Controllers/Admin/Reports/ExitExamStudentPerformanceReportController.php`

### Services
- `/app/Services/Admin/UnitExamStudentService.php` — Grade calculation (`totalCorrectAnswers` at line 2061), exam CRUD, autogeneration
- `/app/Services/Frontend/UnitExamService.php` — Student exam submission (`submitQuiz` at line 747)

### Views
- `/resources/views/admin/unitexam/printHighStakesExamAnalysis.blade.php` — THE High Stakes Exam Form
- `/resources/views/admin/unitexam/examResultStudentWise.blade.php` — Student list page
- `/resources/views/admin/unitexam/examResultQuestionWise.blade.php` — Question list page (has Print High Stakes button)
- `/resources/views/admin/unitexam/list.blade.php` — Instructor-led exam list
- `/resources/views/admin/unitexam/create.blade.php` — Exam creation
- `/resources/views/admin/unitexam/questionlist.blade.php` — Question selection during exam creation
- `/resources/views/admin/unitexam/reviewdetails.blade.php` — Admin review of student attempt
- `/resources/views/admin/exit-exam/exams/index.blade.php` — Exit exam list
- `/resources/views/admin/director/listing.blade.php` — Director list per school (only Program Directors currently)

### Routes
- `/routes/web.php` (lines 694-731) — All unit exam routes under `admin/unitexam/`
- `/routes/web.php` (line 604+) — Exit exam routes under `admin/exit-exam/`
- `/routes/web.php` (line 723) — High Stakes form: `GET /admin/unitexam/print/high-stakes-exam-analysis/{id}`

### Migrations
- `/database/migrations/2023_11_03_032514_create_unit_exam_create_exam_table.php`
- `/database/migrations/2023_11_03_032943_create_unit_exam_student_exam_info_table.php`
- `/database/migrations/2025_10_24_033451_add_toggle_fields_to_unit_exam_create_exam_table.php` — Pattern for adding toggle fields
- `/database/migrations/2026_01_07_170000_add_capce_fields_to_globalsettings_table.php` — CAPCE signature pattern

---

## 3. Feature 1: Exclude Questions from Grade

### What Needs to Change

#### A. Database Migration — `unit_exam_group_selected_questions` table
Add a boolean column `excluded_from_grade` (default false) to the `unit_exam_group_selected_questions` table. This is the pivot table between exams and questions, so exclusion is per-exam (a question excluded in one exam can still be graded in another).

**Complexity: Simple**

#### B. Exam Editor UI — Question selection/management views
Add a toggle/checkbox next to each question in the exam editor. This toggle writes to `unit_exam_group_selected_questions.excluded_from_grade`.

Files to modify:
- `/resources/views/admin/unitexam/questionlist.blade.php` — Add toggle column
- `/resources/views/admin/unitexam/examResultQuestionWise.blade.php` — Show exclude toggle on question results page
- New AJAX endpoint in `UnitExamStudentController` to toggle the field
- JavaScript file `unit_exam_question_create.js` or `unit_exam_reassign_create.js` (public assets)

**Complexity: Medium** — The question list uses AJAX pagination and existing JS state management for "question stacks" stored in sessionStorage. The toggle needs to integrate with this existing JS pattern.

#### C. Grade Calculation Logic — Multiple locations (the hardest part)

**Every** place that calculates a grade needs to be updated to exclude questions where `excluded_from_grade = true`:

1. **`UnitExamService::submitQuiz()`** (line 877) — When calculating `total_correct_answers` at submit time, need to JOIN with `unit_exam_group_selected_questions` and filter out excluded questions. Also need to adjust `number_of_questions` count. **GOTCHA:** The `total_correct_answers` and `total_incorrect_answers` stored in `unit_exam_student_exam_info` are snapshots — if an instructor excludes a question AFTER students have already taken the exam, these stored values become wrong. Two options:
   - **Option A:** Always recalculate on-the-fly (never trust the stored values when exclusions exist)
   - **Option B:** Re-process all stored values when an exclusion changes (fire a job)
   - **Recommendation:** Option A for display, keep stored values as-is for audit trail. Add a computed method on `UnitExamStudentExamInfo` that recalculates excluding filtered questions.

2. **`UnitExamStudentService::totalCorrectAnswers()`** (line 2061) — Add a LEFT JOIN or subquery to filter out excluded question_ids

3. **`UnitExamStudentController::printHighStakesExamAnalysis()`** (line 757) — Filter excluded questions from highest/lowest score calculations, class average, median, cut score, and subcategory performance

4. **`UnitExamController::reviewQuestion()`** (frontend, line 396) — Filter the score calculation

5. **Performance report controllers** — Both unit exam and exit exam student performance report controllers

6. **`UnitExamStudentController::examResultStudentWise()`** (line 918) — The percentage display on the student list page

**Complexity: Complex** — Grade calculation is scattered across 6+ locations with no central grade service. Each uses slightly different SQL patterns (some use raw DB queries, some use Eloquent, some count from attempt history, some read from `unit_exam_student_exam_info`).

**Recommendation:** Create a dedicated `GradeCalculationService` that centralizes the logic and is used everywhere, rather than patching each location individually.

#### D. High Stakes Exam Form — Auto-populate excluded questions
Add a section to `/resources/views/admin/unitexam/printHighStakesExamAnalysis.blade.php` that lists excluded questions in the "Changes made to exam if applicable" textarea (line 330-337).

Pass excluded question data from the controller. The textarea currently uses a `<textarea class="textarea-input">` that renders into a PDF via mpdf with `useActiveForms = true`.

**Complexity: Simple** — Just need to query excluded questions and pass them to the view. Populate the textarea or add a dedicated display section.

#### E. Exit Exam Question Sets
Exit exams use `exit_exam_question_set_questions` as their question pivot (not `unit_exam_group_selected_questions`). However, when an exit exam is created, questions are copied into `unit_exam_group_selected_questions` as well. Need to verify the exact flow — may need `excluded_from_grade` on both tables.

**Complexity: Medium** — Need to trace the exit exam question assignment flow carefully.

### Feature 1 Summary

| Component | Files | Complexity |
|-----------|-------|-----------|
| Migration | 1 new migration | Simple |
| Exam editor toggle UI | 2-3 blade files + 1 JS file + 1 controller method | Medium |
| Grade calculation (all locations) | 6+ files | Complex |
| High Stakes Form update | 1 blade file + 1 controller method | Simple |
| Exit exam compatibility | 1-2 models + verify flow | Medium |
| **Total** | ~12-15 files | **Complex overall** |

---

## 4. Feature 2: Medical Director / Program Director Digital Signatures

### What Needs to Change

#### A. Database Migration — New `exam_signatures` table

```
exam_signatures
  id
  unit_exam_id (FK -> unit_exam_create_exam)
  user_id (FK -> users)
  role_type (enum: 'medical_director', 'program_director')
  signature_data (text/blob — the actual signature, or a path to stored image)
  signed_at (timestamp)
  created_at
  updated_at
```

No `deleted_at` — signatures are permanent per requirement.

**Alternative:** If we don't want actual drawn signatures (just "I approve" + timestamp), the `signature_data` could simply be the user's name as text, or reference a pre-uploaded signature image already on file.

**Complexity: Simple**

#### B. Medical Director Role

Currently there is NO medical director role in the system. Options:

1. **Add a new role** in the `roles` table for "Medical Director" — cleanest
2. **Add a new user_type value** in config (currently 0=student, 2=state_director) — follows existing pattern for non-role-based types
3. **Assign medical directors at the school level** — add `medical_director_id` column to `schools` table

**Recommendation:** Option 3 — assign medical directors at the school level. This matches the real-world relationship (a medical director oversees a program/school). Add `medical_director_id` (nullable FK to users) on the `schools` table. The user keeps their existing role but gains the ability to sign as medical director for that school's exams.

For program directors, the existing role system already identifies them (`has_schools == 1`), so no new role is needed.

**Complexity: Medium** — Needs careful consideration of how medical directors log in and what they can see.

#### C. "Review & Sign" Button on Exam Pages

Add a "Review & Sign" button visible to medical directors and program directors on:
- `/resources/views/admin/unitexam/examResultQuestionWise.blade.php` (question results page)
- `/resources/views/admin/unitexam/examResultStudentWise.blade.php` (student results page)

When clicked:
1. Show a confirmation modal (possibly with a signature pad using existing `signaturepad` pattern from surveys)
2. POST to a new controller endpoint
3. Store the signature record
4. Refresh to show the signature + timestamp inline

New controller method in `UnitExamStudentController`:
- `POST /admin/unitexam/sign/{id}` — stores signature

**Complexity: Medium**

#### D. High Stakes Exam Form — Display Signatures

The current form already has placeholders for signatures (lines 362-411):
- "Exam results reviewed with: Faculty" — Y/N + Date
- "Exam results reviewed with: Medical Director" — Y/N + Date
- "Program Director: ____________ Date: ___"

These are currently **blank fillable fields** rendered into a PDF. The change would:
1. If a medical director has signed, auto-fill the "Medical Director" row with "Y" checked and the date
2. If a program director has signed, auto-fill the "Program Director" line with their name and date
3. Keep the form printable with mpdf

The controller method `printHighStakesExamAnalysis` would query the `exam_signatures` table and pass the data to the view.

**Complexity: Simple** — The placeholders already exist. Just need to populate them conditionally.

#### E. Persistence & Access Control

- Signatures cannot be deleted (no soft delete, no delete endpoint)
- Only the assigned medical director for the school can sign as medical director
- Only a program director with `has_schools` access to the relevant school can sign as PD
- Show signed status on the exam list pages so directors can see which exams need review

**Complexity: Simple**

### Feature 2 Summary

| Component | Files | Complexity |
|-----------|-------|-----------|
| Migration (exam_signatures table + school MD column) | 1-2 new migrations | Simple |
| Medical director assignment (school-level) | School model + admin school form | Medium |
| "Review & Sign" button + modal | 2 blade files + 1 JS + 1 controller method | Medium |
| Signature storage endpoint | 1 controller method + 1 model | Simple |
| High Stakes Form auto-populate | 1 blade file + 1 controller update | Simple |
| Access control | Middleware or inline checks | Simple |
| **Total** | ~8-10 files | **Medium overall** |

---

## 5. Gotchas and Dependencies

### Feature 1
1. **Grade calculation is scattered** — This is the biggest risk. There is no central grade service. Calculations happen in raw SQL, Eloquent queries, and inline PHP across controllers and services. A change missed in one location creates an inconsistency where the student list shows one grade and the High Stakes form shows another.
2. **Retroactive exclusion** — If a PD excludes a question after students have already taken the exam, the stored `total_correct_answers` in `unit_exam_student_exam_info` becomes stale. The feature must recalculate on-the-fly or reprocess stored values.
3. **Performance reports** — The performance report controllers (`UnitExamStudentPerformanceReportController`, `ExitExamStudentPerformanceReportController`) and their service layers also display scores. These need to be audited.
4. **Exit exam question flow** — Exit exams have a separate `exit_exam_question_set_questions` table for question sets, but actual exam instances still use `unit_exam_group_selected_questions`. Need to verify the exclude flag persists through the question set -> exam instance copy.
5. **Background jobs** — `GenerateUnitAndExitExamCategoryWiseReport` and `GenerateSubCategoryObjectiveWiseReportForUnitExitExam` run after exam submission. These calculate stored report data and may need to respect exclusions.

### Feature 2
1. **No medical director role exists** — This is the primary dependency. The system has no way to identify a medical director today. A school-level assignment is the simplest path.
2. **Signature format** — The CAPCE integration already stores signatures as image file paths in `globalsettings`. For exam signatures, a drawn-signature pad (canvas) would be more formal, but a simple "I approve" + name + timestamp is faster to build.
3. **PDF rendering** — The High Stakes form uses mpdf with `useActiveForms = true`. Embedding signature images in the PDF is supported by mpdf but needs testing for proper rendering.
4. **Multi-school programs** — A program director can manage multiple schools. Signatures should be scoped to the specific exam/school, not global.

---

## 6. Recommended Build Order

### Phase 1 (Feature 1 — Foundation)
1. Create migration for `excluded_from_grade` on `unit_exam_group_selected_questions`
2. Create a `GradeCalculationService` that centralizes grade logic with exclusion support
3. Add the toggle endpoint in `UnitExamStudentController`
4. Update `examResultQuestionWise` view to show the toggle
5. Update `examResultStudentWise` to use new grade service
6. Update `printHighStakesExamAnalysis` to use new grade service + show excluded questions

### Phase 2 (Feature 2 — Signatures)
1. Create migration for `exam_signatures` table
2. Create migration to add `medical_director_id` to `schools`
3. Create `ExamSignature` model
4. Add sign endpoint in `UnitExamStudentController`
5. Add "Review & Sign" button to exam result views
6. Update `printHighStakesExamAnalysis` to show signatures

### Phase 3 (Polish)
1. Update performance report controllers for exclusion support
2. Update frontend review page for exclusion display
3. Add signed/unsigned status indicators to exam list views
4. Test exit exam flow end-to-end

---

## 7. Estimated Effort

| Feature | Estimated Dev Time |
|---------|-------------------|
| Feature 1: Exclude from Grade | 3-5 days (due to scattered grade calculation) |
| Feature 2: Digital Signatures | 2-3 days (cleaner scope, smaller surface area) |
| Testing + QA | 1-2 days |
| **Total** | **6-10 days** |

The main risk multiplier is Feature 1's grade calculation refactor. If we centralize the grade logic first, every subsequent change becomes trivial. If we patch each location individually, it's error-prone and doubles the testing surface.
