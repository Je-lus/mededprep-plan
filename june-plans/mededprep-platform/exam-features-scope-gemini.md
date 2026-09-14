# Exam Features Scoping Report: Exclude Questions from Grade + Digital Signatures

**Date:** 2026-06-01
**Codebase:** /home/jeramey/projects/mededprep-c (Laravel)

---

## 1. Current Architecture Overview

### How Instructor Exams and Exit Exams Work

Both instructor-led ("unit") exams and exit exams share the same underlying data model. They are **not** separate models -- they are both `UnitExamCreateExam` records differentiated by a `type` enum column:

```php
// app/Models/UnitExamCreateExam.php
const TYPE_EXIT_EXAM = "exit_exam";
const TYPE_UNIT_EXAM = "unit_exam";
```

Exit exams have an additional layer: `ExitExamQuestionSet` and `ExitExamQuestionSetQuestion` tables define reusable question pools. A job (`CreateExitExamFromQuestionSetJob`) instantiates these into `unit_exam_create_exam` + `unit_exam_group_selected_questions` rows when an exit exam is assigned.

---

## 2. Relevant Code Files

### Models
| File | Purpose |
|---|---|
| `/home/jeramey/projects/mededprep-c/app/Models/UnitExamCreateExam.php` | Main exam model (both types). Has `TYPE_EXIT_EXAM`/`TYPE_UNIT_EXAM` constants. |
| `/home/jeramey/projects/mededprep-c/app/Models/UnitExamGroupSelectedQuestion.php` | Junction table: links questions to a specific exam instance. Has `status` (publish/unpublish). |
| `/home/jeramey/projects/mededprep-c/app/Models/UnitExamStudentExamInfo.php` | Persisted student results: `total_correct_answers`, `number_of_questions`, `total_incorrect_answers`, `total_time_taken_seconds`. |
| `/home/jeramey/projects/mededprep-c/app/Models/UnitExamQuizAttemptHistory.php` | Per-question per-student response records. `answer_status` (0/1), `is_attempted` (0/1/2), `time_spent`. |
| `/home/jeramey/projects/mededprep-c/app/Models/UnitExamAttemptHistoryQuestionAnswer.php` | Per-answer per-student selections. Stores `selected_option`, `confidence_level`. |
| `/home/jeramey/projects/mededprep-c/app/Models/UnitExamQuestion.php` | Question content. Has a `code` field used as identifier, `usage_type` enum (`exit_exam`/`unit_exam`). |
| `/home/jeramey/projects/mededprep-c/app/Models/ExitExamQuestionSet.php` | Exit exam question set (template). |
| `/home/jeramey/projects/mededprep-c/app/Models/ExitExamQuestionSetQuestion.php` | Questions within an exit exam question set template. |
| `/home/jeramey/projects/mededprep-c/app/Models/User.php` | User model. `role_id` FK to `roles`. `is_program_director` accessor checks `rolename->has_schools == 1`. |
| `/home/jeramey/projects/mededprep-c/app/Models/Role.php` | Roles table. Columns: `id`, `name`, `status`, `has_schools`. |
| `/home/jeramey/projects/mededprep-c/app/Models/Settings.php` | Global settings. Already has `capce_medical_director_name`, `capce_medical_director_number`, `capce_medical_director_signature`. |

### Controllers
| File | Purpose |
|---|---|
| `/home/jeramey/projects/mededprep-c/app/Http/Controllers/Admin/UnitExamStudentController.php` | Admin-facing exam results. Methods: `examResultQuestionWise` (line 681), `examResultStudentWise` (line 918), `printHighStakesExamAnalysis` (line 757), `printReport` (line 725). |
| `/home/jeramey/projects/mededprep-c/app/Http/Controllers/Frontend/UnitExamController.php` | Student-facing. Method: `reviewQuestion` (line 396) -- shows the student their exam results and score. |

### Services
| File | Purpose |
|---|---|
| `/home/jeramey/projects/mededprep-c/app/Services/Frontend/UnitExamService.php` | `submitQuiz` (line 747) -- core grade calculation at submission time. |
| `/home/jeramey/projects/mededprep-c/app/Services/Admin/UnitExamStudentService.php` | `totalCorrectAnswers` (line 2061) -- admin-side grade aggregation for the student list. Also `examResultQuestionWise`, `discriminationCalculation`. |

### Views (Blade Templates)
| File | Purpose |
|---|---|
| `/home/jeramey/projects/mededprep-c/resources/views/admin/unitexam/printHighStakesExamAnalysis.blade.php` | The High Stakes Exam Form -- rendered to PDF via mPDF. |
| `/home/jeramey/projects/mededprep-c/resources/views/admin/unitexam/examResultStudentWise.blade.php` | Admin student list with grades. |
| `/home/jeramey/projects/mededprep-c/resources/views/admin/unitexam/examResultQuestionWise.blade.php` | Admin question-level analysis with discrimination index. |
| `/home/jeramey/projects/mededprep-c/resources/views/frontend/unitexamreviewQuestion.blade.php` | Student-facing result review page. |

### Routes (all in `/home/jeramey/projects/mededprep-c/routes/web.php`)
| Route | Controller Method | Line |
|---|---|---|
| `GET admin/unitexam/view/result/{id}` | `examResultQuestionWise` | 719 |
| `GET admin/unitexam/studentwise/view/result/{id}` | `examResultStudentWise` | 720 |
| `GET admin/unitexam/print/high-stakes-exam-analysis/{id}` | `printHighStakesExamAnalysis` | 723 |
| `GET /view/result/{id}` (frontend) | `UnitExamController@reviewQuestion` | 1081 |

### Migrations
| File | Table |
|---|---|
| `database/migrations/2023_11_03_032514_create_unit_exam_create_exam_table.php` | `unit_exam_create_exam` |
| `database/migrations/2023_11_03_032514_create_unit_exam_group_selected_questions_table.php` | `unit_exam_group_selected_questions` |
| `database/migrations/2023_11_03_032943_create_unit_exam_student_exam_info_table.php` | `unit_exam_student_exam_info` |
| `database/migrations/2022_06_14_074139_create_unit_exam_quiz_attempt_history_table.php` | `unit_exam_quiz_attempt_history` |
| `database/migrations/2024_08_06_051704_add_new_type_field_in_unit_exam_create_exam_table.php` | Adds `type` enum to `unit_exam_create_exam` |
| `database/migrations/2024_08_02_021926_create_exit_exam_question_set_questions_table.php` | `exit_exam_question_set_questions` |

---

## 3. Current Database Schema (Key Tables)

### `unit_exam_create_exam`
```
id, name, group_id (FK groups), exam_level (FK exam_levels), total_questions,
status (0=publish/1=unpublish), created_by, exam_date, start_time, end_time,
type (enum: unit_exam, exit_exam), disable_palette, disable_review,
is_draft, session_id, session_data, soft deletes, timestamps
```

### `unit_exam_group_selected_questions`
```
id, unit_exam_id (FK unit_exam_create_exam), group_id (FK groups),
question_id (FK unit_exam_questions), exam_level (FK exam_levels),
status (boolean: 0=unpublish, 1=publish), created_by, soft deletes, timestamps
```

### `unit_exam_student_exam_info`
```
id, unit_exam_id (FK unit_exam_create_exam), user_id (FK users),
session, number_of_questions, submit, endTime,
total_correct_answers, total_incorrect_answers, total_time_taken_seconds,
type (enum: unit_exam, exit_exam), soft deletes, timestamps
```

### `unit_exam_quiz_attempt_history`
```
id, user_id (FK users), question_id (FK unit_exam_questions),
unit_exam_id (FK unit_exam_create_exam), questions_answers_id (FK unit_exam_question_answers),
answer_status (1=correct, 0=incorrect), is_attempted (0=unseen, 1=visited, 2=attempted),
time_spent, timestamps
```

### `exit_exam_question_set_questions`
```
id, question_set_id (FK exit_exam_question_sets), unit_exam_question_id,
exam_level_id, category_names, subcategory_names, sequence, timestamps
```

---

## 4. Current Grade Calculation Logic (Critical -- Multiple Locations)

Grades are calculated in **three independent places**. All three must be updated for Feature 1.

### Location 1: Submit time (`UnitExamService::submitQuiz`, line 877)
```php
$marks = UnitExamQuizAttemptHistory::where('unit_exam_id', $unitExamExtemtedStudentInfo->unit_exam_id)
    ->select("user_id",
        DB::raw("COUNT(CASE WHEN answer_status = 1 THEN 1 ELSE NULL END) as total_correct_answers"),
        DB::raw("COUNT(CASE WHEN answer_status = 0 AND is_attempted = 2 THEN 1 ELSE NULL END) as total_incorrect_answers"))
    ->where('user_id', $unitExamExtemtedStudentInfo->user_id)
    ->first();

$totalNumberOfQuestions = UnitExamQuizAttemptHistory::query()
    ->where('unit_exam_id', ...)
    ->where('user_id', ...)
    ->count();
```
Results are persisted to `unit_exam_student_exam_info`.

### Location 2: Admin student list (`UnitExamStudentService::totalCorrectAnswers`, line 2061)
```php
$totalCorrectAnswers = UnitExamQuizAttemptHistory::where('unit_exam_id', $examId)
    ->select('user_id',
        DB::raw('COUNT(DISTINCT CASE WHEN answer_status = 1 THEN ...question_id END) as total_correct_answers'),
        // ... plus incorrect, attempted, confidence_level counts
    )
    ->leftJoin('unit_exam_attempt_history_question_answers', ...)
    ->groupBy('user_id')
    ->get();
```
This is used by `examResultStudentWise` controller method (line 953) which also does:
```php
$totalQuestions = UnitExamQuizAttemptHistory::where('unit_exam_id', $examId)
    ->where('user_id', $studentDetails->user_id)
    ->count();
$user_marks['total_correct_pc'] = ($user_marks['total_correct_answers'] / $totalQuestions) * 100;
```

### Location 3: High Stakes Exam Form (`printHighStakesExamAnalysis`, line 770)
```php
// Highest score
$highestScoreRecord = UnitExamStudentExamInfo::where('unit_exam_id', $examId)
    ->where('submit', 1)
    ->selectRaw("*, (total_correct_answers / NULLIF(number_of_questions, 0)) * 100 AS percentage")
    ->orderBy('percentage', 'desc')->first();

// All scores for average/median
$allScrores = UnitExamStudentExamInfo::where('unit_exam_id', $examId)
    ->selectRaw("(total_correct_answers / NULLIF(number_of_questions, 0)) * 100 AS percentage")
    ->where('submit', 1)->pluck('percentage');
```
This reads from the **persisted** `unit_exam_student_exam_info` data.

### Location 4: Student-facing review (`UnitExamController::reviewQuestion`, line 411)
```php
$totalattemped = UnitExamQuizAttemptHistory::where('unit_exam_id', $quizId)
    ->where('user_id', Auth::user()->id)->where('is_attempted', 2)->count();
$incorrect = UnitExamQuizAttemptHistory::where('unit_exam_id', $quizId)
    ->where('user_id', Auth::user()->id)->where('is_attempted', 2)->where('answer_status', 0)->count();
$totalQuestion = $UnitExamStudentExamInfo->number_of_questions;
```

---

## 5. Current High Stakes Exam Form Content

The form (`printHighStakesExamAnalysis.blade.php`) is rendered to PDF via mPDF. It contains:

**Auto-populated fields:**
- Program Name (from school)
- Exam Name/Topic (from `$exam->name`)
- Exam Date (from submission date range)
- Number of students completing exam
- Highest Score, Lowest Score, Cut Score (avg of highest+lowest), Class Average, Class Median
- Content areas receiving unexpected low scores (subcategories below 50%)
- "Is statistical analysis of questions conducted?" (checkbox, pre-checked Yes)

**Manual/empty fields (currently editable textareas and text inputs):**
- Course Name, Course Dates, Course Number, Lead Instructor
- "Recommendations from learning prescription if applicable" (empty textarea)
- **"Changes made to exam if applicable"** (empty textarea -- THIS IS WHERE EXCLUDED QUESTIONS WILL GO)
- "Strategies to address low performing areas" (empty textarea)
- "Program Director/Lead Instructor comments" (empty textarea)

**Signature section (currently manual):**
- "Exam results reviewed with: Faculty" -- Y/N checkboxes + Date input
- "Medical Director" -- Y/N checkboxes + Date input
- "Program Director: ____________________________" -- blank signature line + Date input

---

## 6. Role/Permission System

The role system is straightforward:
- `roles` table with `id`, `name`, `status`, `has_schools`
- `user_roles` table linking `user_id` to `role_id`
- `users.role_id` also exists as a direct FK

**Program Director** identification:
```php
// User model, line 101
public function getIsProgramDirectorAttribute(){
    return optional($this->rolename)->has_schools == 1;
}
```

**Medical Director** -- There is NO explicit Medical Director role in the code. The `Settings` model has `capce_medical_director_name`, `capce_medical_director_number`, and `capce_medical_director_signature` (global CAPCE settings), but there is no user-level Medical Director role. This means we either need to:
1. Create a new "Medical Director" role in the `roles` table, OR
2. Add a `is_medical_director` flag to the user, OR
3. Use the existing CAPCE medical director info from Settings (not ideal -- that's a global singleton, not per-school)

**Existing signature precedent:** `capce_medical_director_signature` in Settings suggests the platform already stores a signature somewhere (likely as a file path or base64). This could inform the UX pattern.

---

## 7. Feature 1: Exclude Questions from Grade

### What Needs to Change

#### Migration 1: Add `is_excluded` to `unit_exam_group_selected_questions`
```php
Schema::table('unit_exam_group_selected_questions', function (Blueprint $table) {
    $table->boolean('is_excluded')->default(false)->after('status');
    $table->unsignedBigInteger('excluded_by')->nullable()->after('is_excluded');
    $table->timestamp('excluded_at')->nullable()->after('excluded_by');
});
```
**Complexity: Simple**

#### New Route + Controller Method: Toggle exclusion
Add a POST route in `routes/web.php` and method in `UnitExamStudentController`:
```
POST admin/unitexam/toggle-question-exclusion/{examId}/{questionId}
```
Should accept AJAX, toggle `is_excluded`, record who and when.
**Complexity: Simple**

#### Update: `examResultQuestionWise.blade.php` -- Add toggle UI
Add a toggle/checkbox column in the question analysis table for each question row. AJAX call to the new endpoint.
**Complexity: Simple**

#### Update: `UnitExamService::submitQuiz` (line 877-906) -- Exclude at submit time
The `COUNT` queries need a `WHERE question_id NOT IN (excluded question IDs)` clause. This requires joining to or subquerying `unit_exam_group_selected_questions` to get excluded IDs.
**Complexity: Medium** -- The existing raw SQL aggregates are complex; adding a join/subquery requires care.

#### Update: `UnitExamStudentService::totalCorrectAnswers` (line 2061-2089) -- Admin student list
Same exclusion filter needed on the aggregate query.
**Complexity: Medium**

#### Update: `UnitExamStudentController::examResultStudentWise` (line 953) -- Total question count
The `count()` call for `totalQuestions` needs the same exclusion filter.
**Complexity: Simple**

#### NEW: Batch recalculation method
When a question is excluded **after** students have already submitted, the persisted `unit_exam_student_exam_info` rows must be recalculated. This is the most complex part -- need a method that:
1. Gets all excluded question IDs for the exam
2. Recounts correct/incorrect/total for each student, excluding those questions
3. Updates `unit_exam_student_exam_info` in bulk
**Complexity: Medium-Complex**

#### Update: `printHighStakesExamAnalysis` controller + view
- Controller (line 757): Pass excluded questions list to the view
- View: Auto-populate the "Changes made to exam if applicable" textarea with: "The following questions were excluded from grade calculation: [Q123, Q456, ...]"
- Also: The `$allScores` / `$highestScore` / `$lowestScore` queries read from `unit_exam_student_exam_info` -- if batch recalc has run, these are already correct. If not, need to recalculate on-the-fly.
**Complexity: Medium**

#### Update: `UnitExamController::reviewQuestion` (line 411) -- Student-facing
The student review page counts correct/incorrect from `unit_exam_quiz_attempt_history`. Need to exclude the excluded question IDs from these counts.
**Complexity: Medium** -- Must join to `unit_exam_group_selected_questions` to know which questions are excluded.

### Gotchas for Feature 1

1. **Retroactive recalculation is the hard part.** If a question is excluded after 50 students finished, all 50 rows in `unit_exam_student_exam_info` must be recalculated. This should be done synchronously on toggle (the dataset per exam is small -- dozens of students, not thousands).

2. **The `number_of_questions` field is persisted.** It must also be decremented when questions are excluded. Every percentage calculation divides by this number.

3. **Subcategory performance on the High Stakes form** (lines 792-829) also needs exclusion filtering. The subcategory aggregation loops over `unit_exam_quiz_attempt_history` grouped by `question_id` -- excluded questions should be skipped.

4. **Discrimination index** in the question-wise view (`discriminationCalculation`) should still work on excluded questions (the point of beta questions is to analyze them). Consider showing but visually marking excluded questions rather than hiding them.

5. **Exit exam question sets** (`exit_exam_question_set_questions`) are templates. Exclusion should happen at the **exam instance level** (`unit_exam_group_selected_questions`), not the template level. This is already the correct table.

6. **The `status` column on `unit_exam_group_selected_questions`** (publish/unpublish) is conceptually similar but functionally different. `status=0` (unpublish) likely removes the question entirely before the exam starts. `is_excluded` should leave the question visible but not count toward the grade. Do not overload `status`.

---

## 8. Feature 2: Medical Director / Program Director Digital Signatures

### What Needs to Change

#### Migration 2: Add signature columns to `unit_exam_create_exam`
```php
Schema::table('unit_exam_create_exam', function (Blueprint $table) {
    $table->unsignedBigInteger('medical_director_signed_by')->nullable();
    $table->foreign('medical_director_signed_by')->references('id')->on('users')->onDelete('set null');
    $table->timestamp('medical_director_signed_at')->nullable();

    $table->unsignedBigInteger('program_director_signed_by')->nullable();
    $table->foreign('program_director_signed_by')->references('id')->on('users')->onDelete('set null');
    $table->timestamp('program_director_signed_at')->nullable();
});
```
**Complexity: Simple**

#### New Routes + Controller Methods: Sign endpoint
```
POST admin/unitexam/sign/{examId}/{role}  (role = medical_director | program_director)
```
Should validate the user's role, record `user_id` and `now()`, return updated signature data for AJAX.
**Complexity: Simple**

#### Update: `examResultStudentWise.blade.php` and `examResultQuestionWise.blade.php`
Add a "Review & Sign" button section. Show:
- Button (if not yet signed by this role)
- Signed indicator with name + timestamp (if already signed)
- Both buttons visible to both roles -- each can only sign their own

The button should be a confirmation dialog ("Are you sure? This cannot be undone.") then AJAX POST.
**Complexity: Simple**

#### Update: `printHighStakesExamAnalysis.blade.php`
Replace the manual signature section:
- "Medical Director" row: If signed, show signer name + date instead of Y/N checkboxes
- "Program Director" line: If signed, show signer name + date instead of blank line

The `printHighStakesExamAnalysis` controller method (line 757) needs to load the exam's signature relationships and pass the signer User models to the view.
**Complexity: Simple**

#### Role identification for Medical Director
**This is the biggest open question.** Options:

**Option A (recommended): Add a "Medical Director" role to the `roles` table.**
- Most consistent with existing patterns
- Add a `isMedicalDirector()` method to User model matching pattern of `isSurveyor()` / `isSurveyManager()`
- Requires a seeder or manual DB insert for the new role
- **Complexity: Simple**

**Option B: Reuse CAPCE Medical Director from Settings.**
- The `capce_medical_director_name` is a single global entry, not a user account
- Doesn't work for sign-in because there's no `user_id` to authenticate against
- **Not viable** unless we add a `capce_medical_director_user_id` to Settings

**Option C: Add `is_medical_director` boolean to `users` table.**
- Quick but doesn't scale if more roles are needed
- **Complexity: Simple** but less clean

### Gotchas for Feature 2

1. **Persistence requirement ("not clearable")** -- The migration columns are nullable (null = unsigned), and once set, the UI should have no "unsign" button. But consider: should a super-admin be able to clear it? Probably not in v1.

2. **The current High Stakes form is rendered to PDF via mPDF.** Signatures are just text (name + date), not actual drawn signatures or images. This simplifies things -- no need for a signature pad widget. Just the logged-in user's name and the timestamp.

3. **The existing `capce_medical_director_signature` in Settings** might be a file path or base64 for CAPCE compliance forms. If so, it could optionally be rendered on the High Stakes form too, but that's a stretch goal.

4. **Program Directors already have user accounts** (they create exams -- `created_by` column). Medical Directors may or may not have accounts in the system today. If they don't, accounts would need to be created before they can sign.

5. **Both signature columns are on `unit_exam_create_exam`** -- this means one signature per exam, which is correct (one MD and one PD sign off per exam instance).

---

## 9. Complexity Summary

| Component | Complexity | Notes |
|---|---|---|
| **F1: Migration (is_excluded)** | Simple | Single column add |
| **F1: Toggle UI (question-wise view)** | Simple | AJAX checkbox |
| **F1: Toggle endpoint** | Simple | Single column update + batch recalc trigger |
| **F1: Batch recalculation** | Medium-Complex | Must recompute for all students on the exam |
| **F1: submitQuiz exclusion filter** | Medium | Raw SQL modification, needs testing |
| **F1: Admin student list recalc** | Medium | Complex existing aggregate query |
| **F1: Student-facing review exclusion** | Medium | Needs join to get excluded IDs |
| **F1: High Stakes form auto-populate** | Simple-Medium | Pass data + update textarea |
| **F1: Subcategory performance exclusion** | Medium | Loop in controller, filter excluded |
| **F2: Migration (signatures)** | Simple | Four columns |
| **F2: Sign endpoint** | Simple | Validation + update |
| **F2: Sign button UI** | Simple | Conditional button + AJAX |
| **F2: High Stakes form signature display** | Simple | Replace placeholder text |
| **F2: Medical Director role definition** | Simple | Role seeder or migration insert |

### Overall Estimates
- **Feature 1 (Exclude Questions):** Medium complexity. 6-8 files changed. The batch recalculation and the four independent grade calculation locations are the main risk. Suggest 2-3 dev days.
- **Feature 2 (Digital Signatures):** Simple complexity. 4-5 files changed. Straightforward CRUD + UI. The only decision point is how to identify Medical Directors. Suggest 1 dev day.

---

## 10. Suggested Implementation Order

1. Feature 2 first (simpler, no grade logic changes, lower risk)
2. Feature 1 migration + toggle endpoint
3. Feature 1 batch recalculation logic (test thoroughly)
4. Feature 1 submitQuiz integration
5. Feature 1 admin + student view updates
6. Feature 1 High Stakes form integration
7. End-to-end testing with both features together
