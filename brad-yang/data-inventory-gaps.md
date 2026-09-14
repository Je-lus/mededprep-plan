# MedEdPrep Psychometric Data Opportunities & Gaps

## Summary
The single highest-value latent opportunity currently derivable is **Sequence & Fatigue Analysis via Time Logs**. Because the recent `quiz_attempt_history_time_logs` and `unit_exit_attempt_history_time_logs` tables explicitly capture `question_number`, `clock_in`, `clock_out`, and `duration`, we can map the exact trajectory of student fatigue and test speededness. This unlocks psychometric signals (e.g., rapid-guessing behavior near the end of exams) that the platform's current aggregate dashboards completely miss.

## Latent Psychometric Opportunities Inventory

| Opportunity | Why it matters (psychometrically) | Derivable-now vs Needs-capture | Where in code (table.column / file) | Effort |
|---|---|---|---|---|
| **Per-Item Response Time** | Flags rapid guessing, item complexity, and allows for log-normal timing models. | **Derivable-now** (Recent data only) | `quiz_attempt_history_time_logs.duration` and `unit_exit_attempt_history_time_logs.duration` | Low |
| **Item Sequence / Position** | Controls for order effects. Identifies if items perform worse when placed later in an exam. | **Derivable-now** | `quiz_attempt_history_time_logs.question_number` | Low |
| **Within-Attempt Fatigue** | Can we measure cognitive decline over the exam? Yes, by tracking accuracy vs `question_number`. | **Derivable-now** | `*_time_logs.question_number` joined to `answer_status` | Med |
| **Confidence-Accuracy Calibration** | Do students know what they don't know? High-confidence incorrects flag bad distractors or misconceptions. | **Derivable-now** | `quiz_attempt_history_question_answers.confidence_level` | Low |
| **Platform-to-Outcome Linkage** | Correlating platform performance directly against actual NREMT pass rates. | **Derivable-now** | `nremt_attempts.student_id` & `result` ('PASS','FAIL','RECYCLED') | Low (but N is sparse) |
| **Answer-Change Events** | Switching from Correct to Incorrect (or vice versa) reveals distractor attractiveness and item ambiguity. | **Needs-New-Capture** | Currently deleted mid-attempt in `QuizService.php:598` | High |
| **Broad Demographics** | Necessary for strict Differential Item Functioning (DIF) checks for fairness. | **Needs-New-Capture** | `users` lacks race/ethnicity/SES | Low to add, Hard to collect |

## Multilevel / Hierarchy Potential

The `users` schema already contains extensive foreign key linkages to organizational structures. This is a massive win for multilevel modeling (HLM), allowing us to measure cohort effects, instructor value-added, and structural variances. 

**FKs Verified on the `users` table (`2014_10_12_000000_create_users_table.php`):**
*   `school_id` (Present) -> Links to `schools`
*   `school_branch_id` (Present) -> Links to `school_branches`
*   `instructor_id` (Present) -> Links to `instructor` table
*   `state_id` (Present) -> Links to `states`
*   `group_id` (Present via Pivot) -> The `group_students` table links `user_id` to `groups` (`2023_11_03_032943_create_group_students_table.php`).

**What this unlocks:**
1.  **State-Level DIF:** We can evaluate if specific protocols or items function differently by state (`users.state_id`).
2.  **Instructor / Program Value-Added:** We can isolate the variance in performance attributed to the `instructor_id` or `group_id` versus the student's baseline.
3.  **Cohort Calibration:** Group-level clustering allows for much more accurate IRT (Item Response Theory) calibration than assuming a homogenous national population.

## Capture-Going-Forward Wishlist

1.  **Mid-Attempt Answer Changes (The "Vacillation" Metric):** 
    *   *Where:* `app/Services/Frontend/QuizService.php` and `UnitExamService.php`.
    *   *The Issue:* Currently, when a student changes their answer during an attempt, the code does `$quizQuestions->quizAttemptHistoryQuestionAnswer()->delete();` and recreates the row. 
    *   *The Fix:* Implement an `answer_change_logs` table (or soft-deletes with timestamps) to capture the *path* of the student's reasoning, not just their final destination.
2.  **Versioning on Legacy Questions:**
    *   *Where:* `questions` table (`2022_06_03_115829_create_questions_table.php`).
    *   *The Issue:* While the new `unit_exam_questions` table has `parent_id` and `version` columns, the legacy `questions` table does not. In-place edits to legacy questions silently invalidate historical calibration data.
    *   *The Fix:* Implement the same versioning schema on `questions` to freeze item parameters.
3.  **Expanded Demographics:**
    *   *Where:* `users` table.
    *   *The Issue:* We only have `date_of_birth` and `gender` (string). 
    *   *The Fix:* Add columns or an external secure survey for race, primary language (ESL status is critical for NREMT prep), and educational background to ensure test fairness and accurate DIF analysis.

## Data-Quality Risks

*   **Recent-Only Timing:** The `quiz_attempt_history_time_logs` and `unit_exit_attempt_history_time_logs` were only created in early 2026. Models relying on `duration` or `clock_in`/`clock_out` will have a massive historical blind spot.
*   **Sparse NREMT Outcomes:** The `nremt_attempts` table is the holy grail for predictive validity, but with only ~225 matched outcomes, statistical power is extremely low for item-level linkage.
*   **Text-Match Keying Vulnerability:** As noted in the distractor investigation, early in-place edits to `questions.option_N` mean that some legacy `selected_option` strings will fail to join against the modern correct-answer key.
*   **Self-Reported Data:** NREMT passes and demographic info may be self-reported, injecting bias.