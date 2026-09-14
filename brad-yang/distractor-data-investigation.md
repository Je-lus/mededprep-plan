# Distractor Analysis Data — MedEdPrep Codebase Investigation

**Repo investigated (read-only):** `/home/jeramey/projects/mededprep-c` (Laravel/PHP)
**Date:** 2026-06-05
**Question:** Can we extract, per student response, the *specific answer option the student selected* (not just correct/incorrect) so we can run distractor analysis (point-biserial per option, distractor selection frequencies)?

---

## Headline answer

**YES — the selected option IS persisted today, for every question bank.** Each per-question response row stores the actual answer choice the student picked, alongside correctness. The current "combined question report" simply doesn't *include* that column; the data is already in the database and only needs to be joined in.

**The single most important thing for the dev team:** In the legacy banks (Targeted Quiz, Simulator, Unit Exam, Exit Exam, EOPA) the selected option is stored as the **option TEXT string**, not an option id/index. To get a clean per-option key (option_1..6) you must match that stored text back against the question's `option_1`...`option_6` columns (trim + lowercase, exactly how the app's own scoring does it). The newer **Adaptive Exam** bank already stores normalized **option IDs** (`adaptive_question_options.id`) — that's the clean model. There is one data-quality caveat: in the legacy banks an answer choice is only identifiable by its text, so duplicate option texts or post-hoc edits to question option text can break the join (see Open Questions).

---

## Schema map

### A. Item / question content + correct-answer key

| Concern | Table | Key columns | File |
|---|---|---|---|
| Quiz/Simulator question stem + options | `questions` | `id`, `code` (unique), `type` (0=single/MCQ, 1=multi/MSQ), `option_1`…`option_6` (option **text**) | `database/migrations/2022_06_03_115829_create_questions_table.php` |
| Which option(s) are correct (the KEY) | `questions_answers` | `question_id`, `option_1`…`option_6` (boolean 1=correct) | `database/migrations/2022_06_06_142723_create_questions_answers_table.php` |
| Unit/Exit Exam question + options | `unit_exam_questions` | same shape as `questions` + versioning (`parent_id`,`version`,`origin_id`,`question_status`) | `database/migrations/2023_10_04_022104_create_unit_exam_questions_table.php` |
| Unit/Exit Exam correct-answer key | `unit_exam_question_answers` | `question_id`, `option_1`…`option_6` (boolean) | `database/migrations/2023_10_04_022145_create_unit_exam_question_answers_table.php` |
| EOPA question key | `eopa_question_answers` | `eopa_question_id`, `option_1`…`option_6` (boolean) | `database/migrations/2025_04_30_013822_create_eopa_question_answers_table.php` |
| Adaptive question options (NORMALIZED) | `adaptive_question_options` | `id`, `adaptive_question_id`, `option_text`, `is_correct` (bool), `currect_order` | `database/migrations/2025_06_30_083557_create_adaptive_question_options_table.php` |

The correct-answer key model helper that the app itself uses: `Questions::correctAnswer($questionId)` in `app/Models/Questions.php:72` — it reads the boolean flags in `questions_answers`, pulls the matching `option_N` **text** from `questions`, then `rtrim`/`ltrim`/`strtolower`s them. The student's `selected_option` is compared against that array. **This is the canonical "is this option correct?" logic — mirror it exactly in any export.** (`UnitExamQuestion::correctAnswer()` at `app/Models/UnitExamQuestion.php:121` is the equivalent for the unit/exit bank.)

### B. Per-response attempt history (one row per question shown)

| Bank | Parent attempt table | Per-response answer table (the gold) | File |
|---|---|---|---|
| Targeted Quiz + Simulator | `quiz_attempt_history` | `quiz_attempt_history_question_answers` | `2022_06_14_074139_create_quiz_attempt_history_table.php`, `2022_06_14_111345_create_quiz_attempt_history_question_answers_table.php` |
| Unit Exam + Exit Exam | `unit_exam_quiz_attempt_history` | `unit_exam_attempt_history_question_answers` | `2022_06_14_074139_create_unit_exam_quiz_attempt_history_table.php`, `2022_06_14_111345_create_unit_exam_attempt_history_question_answers_table.php` |
| EOPA | `eopa_quiz_attempt_history` | `eopa_quiz_attempt_question_answers` | `2025_04_30_065151_create_eopa_quiz_attempt_question_answers_table.php` |
| Adaptive Exam | `adaptive_exam_attempts` | `adaptive_exam_attempt_histories` (self-contained) | `2025_07_14_081244_create_adaptive_exam_attempt_histories_table.php` |

**Parent table key columns** (`quiz_attempt_history` / `unit_exam_quiz_attempt_history`): `id`, `user_id`, `question_id`, `quiz_id` (or `unit_exam_id`), `questions_answers_id`, `answer_status` (1=correct/0=incorrect), `is_attempted` (0=unseen,1=visited,2=attempted).

### C. Bank discriminators (how to label each row's Quiz Type)

- `quizzes.type` ENUM = **`targeted_quiz`** | **`simulator`** — `2022_05_26_135422_create_quizzes_table.php:23`
- `unit_exam_create_exam.type` ENUM = **`unit_exam`** | **`exit_exam`** — `2024_08_06_051704_add_new_type_field_in_unit_exam_create_exam_table.php:18`
- Adaptive and EOPA are their own tables.

### D. Timing (for "Avg Time Taken Per Question")

- `quiz_attempt_history_time_logs` — `quiz_id`, `user_id`, `question_id`, `clock_in`, `clock_out`, `duration` (seconds). File: `2026_02_19_075324_create_quiz_attempt_history_time_logs_table.php`
- `unit_exit_attempt_history_time_logs` — equivalent for unit/exit. File: `2026_02_20_035453_create_unit_exit_attempt_history_time_logs_table.php`

---

## Where the selected option lives (the central question)

**It is persisted. Exact locations:**

| Bank | `table.column` | Format |
|---|---|---|
| Targeted Quiz / Simulator | **`quiz_attempt_history_question_answers.selected_option`** (TEXT, nullable) | The **option text string** the student picked (one row per selected option; MSQ → multiple rows) |
| Unit Exam / Exit Exam | **`unit_exam_attempt_history_question_answers.selected_option`** (TEXT, nullable) | Same — option text string. Also carries `confidence_level`, `reason` |
| EOPA | **`eopa_quiz_attempt_question_answers.answer`** (string) | Selected answer value |
| Adaptive Exam | **`adaptive_exam_attempt_histories.answer_ids`** (string) and **`given_answer`** (text) | `answer_ids` = the selected `adaptive_question_options.id`(s); `given_answer` = text |

**Evidence it's the option text, not an index** — the write path in `app/Services/Frontend/QuizService.php:605-621`:

```php
foreach ($request['selectedAnswer'] as $saveAnswer) {
    $selectedAnswerData = str_replace('~','"',$saveAnswer);   // un-escape the option text
    QuizAttemptHistoryQuestionAnswer::create([
        'attempt_history_id' => $quizQuestions->id,
        'question_id'        => $quizQuestions->question_id,
        'selected_option'    =>  $selectedAnswerData,          // <-- stores the literal option text
        'confidence_level'   => $request->get('confidentLevel', 'Low'),
        ...
    ]);
    if (in_array(strtolower($selectedAnswerData), $correctAnswers)) { ... }  // compared as text
}
```

The same pattern is in `UnitExamService.php:631` and `:847`, and the simulator path `QuizService.php:704-711`. Confidence fields (`confidence_level`, `reason`, `confidence_level_range`) were added to `quiz_attempt_history_question_answers` in `2025_02_19_001505_add_new_field_to_quiz_attempt_history_question_answers_table.php` — these are the same Confidence values already in the combined export.

**Confirmation the app already does per-option distractor counts:** `app/Exports/QuestionReportExport.php:53-59` loops `option_1..6` and counts `selected_option == option text` per option. This is an *item-level aggregate* report (one row per question with per-option pick counts) — proof the join works, but it is NOT the per-response/per-student combined export Brad needs. We extend, not reinvent.

---

## Existing export mechanism

The platform uses **Laravel Maatwebsite/Excel exporter classes** in `app/Exports/`:
- `QuestionReportExport.php` — item-level quiz report **with per-option `selected_option` counts already** (the distractor logic, in aggregate form).
- `UnitExitQuestionReportExport.php` — unit/exit equivalent.
- `StudentExport.php`, plus `Adaptive/` subfolder exporters.

Aggregate performance reporting lives in `app/Services/Admin/PerformanceReportService.php`, `ExitExamPerformanceReportService.php`, `UnitExamPerformanceReportService.php` (query-builder + `joinSub` heavy).

**Important finding about the "combined question report" specifically:** The exact header strings from that CSV (`Student Code`, `Quiz Unique ID`, `Avg Time Taken Per Question`, `Sort Date`, `Quiz Order`, etc.) **do not appear anywhere in the PHP codebase** (searched `app/`, `resources/`, `routes/`). That report is therefore almost certainly produced by an **ad-hoc SQL query / external script run directly against the database** (or a tool outside this repo), not by an in-repo exporter class. The closest in-repo machinery to model a new pull on is the `*Export.php` classes above and the query-builder joins in the `*PerformanceReportService.php` services. **Confirm with the dev team where that CSV is actually generated** (see Open Questions) — the new option-level pull should hang off the same place.

"Student Code" anonymization: `users.registry_number` exists (`app/Models/User.php:46`) and is the most likely source of the anonymized student code; there's also `app/Console/Commands/RegistrynumberNotification.php`. The combined export's Student Code is a coded/registry value — reuse whatever mapping the existing CSV uses so codes stay consistent.

---

## Multi-bank handling

**Multiple tables, not one.** Three response stores plus adaptive:

1. `quiz_attempt_history(_question_answers)` → split into **Targeted Quiz** vs **Simulator** by `quizzes.type`.
2. `unit_exam_quiz_attempt_history` / `unit_exam_attempt_history_question_answers` → split into **Unit Exam** vs **Exit Exam** by `unit_exam_create_exam.type`.
3. `eopa_quiz_attempt_history` / `eopa_quiz_attempt_question_answers` → **EOPA**.
4. `adaptive_exam_attempt_histories` → **Adaptive Exam** (normalized options; different shape).

They are unioned with a `UNION ALL` of per-bank SELECTs that each project to a common column set (student code, bank label, quiz id, question code, selected option text/key, correct-option text/key, accuracy, confidence, timing). Banks 1 and 2 align cleanly because they share the `option_1..6` text + boolean-key shape; EOPA aligns too. Adaptive needs the option join through `adaptive_question_options` instead of text columns.

---

## Proposed query / process (dev-ready)

### Strategy

Reuse the app's own correctness definition (`Questions::correctAnswer` logic): a `selected_option` is correct iff its trimmed/lowercased text is one of the option texts flagged `=1` in `questions_answers`. Resolve which **slot** (option_1..6) a selection corresponds to by matching the stored text to `questions.option_N`. Output one row per *selected option per response*, which is exactly the grain distractor analysis needs.

### SQL — Targeted Quiz / Simulator bank (template; replicate for unit/exit & EOPA)

```sql
SELECT
    u.registry_number                         AS student_code,          -- consistent w/ existing Student Code
    CASE q.type WHEN 'simulator' THEN 'Simulator'
                ELSE 'Targeted Quiz' END       AS quiz_type,
    q.quiz_code                                AS quiz_unique_id,
    qz.code                                    AS question_code,
    qah.answer_status                          AS accuracy,             -- 1/0 (row-level overall)
    qahqa.selected_option                      AS selected_option_text, -- the actual choice the student picked
    -- which slot the picked text maps to (for clean distractor keying):
    CASE
      WHEN LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_1)) THEN 'option_1'
      WHEN LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_2)) THEN 'option_2'
      WHEN LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_3)) THEN 'option_3'
      WHEN LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_4)) THEN 'option_4'
      WHEN LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_5)) THEN 'option_5'
      WHEN LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_6)) THEN 'option_6'
      ELSE NULL END                            AS selected_option_key,
    -- is the picked option the keyed-correct one (distractor flag):
    CASE WHEN (
        (LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_1)) AND qa.option_1 = 1) OR
        (LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_2)) AND qa.option_2 = 1) OR
        (LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_3)) AND qa.option_3 = 1) OR
        (LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_4)) AND qa.option_4 = 1) OR
        (LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_5)) AND qa.option_5 = 1) OR
        (LOWER(TRIM(qahqa.selected_option)) = LOWER(TRIM(qz.option_6)) AND qa.option_6 = 1)
    ) THEN 1 ELSE 0 END                        AS selected_option_is_correct,
    qahqa.confidence_level                     AS confidence,
    tl.duration                                AS time_taken_seconds,
    qah.created_at                             AS sort_date
FROM quiz_attempt_history_question_answers qahqa
JOIN quiz_attempt_history qah ON qah.id   = qahqa.attempt_history_id
JOIN quizzes            q   ON q.id        = qah.quiz_id
JOIN questions          qz  ON qz.id       = qahqa.question_id
JOIN questions_answers  qa  ON qa.question_id = qz.id
JOIN users              u   ON u.id        = qah.user_id
LEFT JOIN quiz_attempt_history_time_logs tl
       ON tl.quiz_id = qah.quiz_id AND tl.user_id = qah.user_id AND tl.question_id = qah.question_id
WHERE qah.is_attempted = 2;   -- only actually-answered responses
```

**Unit / Exit Exam variant:** same query against `unit_exam_attempt_history_question_answers` → `unit_exam_quiz_attempt_history` (join key `unit_exam_id` → `unit_exam_create_exam`), `unit_exam_questions`, `unit_exam_question_answers`; quiz_type from `unit_exam_create_exam.type` (`unit_exam`/`exit_exam`); timing from `unit_exit_attempt_history_time_logs`.

**EOPA variant:** `eopa_quiz_attempt_question_answers.answer` matched against `eopa_questions.option_N` / `eopa_question_answers`.

**Adaptive variant (cleaner — use option IDs directly):**
```sql
SELECT u.registry_number AS student_code, 'Adaptive Exam' AS quiz_type,
       aeh.exam_id AS quiz_unique_id, aeh.question_id,
       aeh.answer_ids AS selected_option_ids,      -- adaptive_question_options.id(s)
       opt.option_text, opt.is_correct AS selected_option_is_correct,
       aeh.answer_status, aeh.time_spent
FROM adaptive_exam_attempt_histories aeh
JOIN users u ON u.id = aeh.user_id
LEFT JOIN adaptive_question_options opt
       ON FIND_IN_SET(opt.id, aeh.answer_ids)       -- answer_ids may be comma-joined
WHERE aeh.attempt_status = 2;
```

Then `UNION ALL` the per-bank SELECTs (project to a common column list) for one combined CSV.

### Recommended packaging

Mirror the existing pipeline: add a new Maatwebsite exporter (e.g. `App\Exports\DistractorResponseExport`) + an Artisan command (e.g. `php artisan report:distractor-export`) that runs the per-bank query builders, unions them, and streams CSV. Keep the Student Code mapping identical to whatever the current combined CSV uses so codes line up across both files. This extends the established `app/Exports/*` + `*PerformanceReportService` pattern rather than introducing a parallel mechanism.

---

## Open questions for the dev team

1. **Where is the existing "combined question report" CSV actually generated?** The header strings aren't in this repo — confirm it's an ad-hoc SQL/external script vs. a route/command we missed, so the new option-level pull hangs off the same source and reuses the same Student Code mapping.
2. **Student Code source:** Is the anonymized Student Code `users.registry_number`, or a separate hash? Confirm so the new export's codes match the existing CSV exactly.
3. **Duplicate / edited option text risk:** Because legacy banks store the *selected text*, distractor keying breaks if two options share identical text, or if a question's option text was edited after responses were recorded (the stored `selected_option` would no longer match any current `option_N`). How often are question options edited in place? Is there versioning on `questions` like there is on `unit_exam_questions` (`parent_id`/`version`/`origin_id`)? Quantify rows where `selected_option_key` comes back NULL.
4. **MSQ (multi-select) handling:** MSQ responses produce multiple `*_question_answers` rows per response (one per picked option). Confirm Brad wants per-selected-option grain (good for distractor frequencies) vs. per-response grain — the query above is per-selected-option.
5. **EOPA `answer` format:** Confirm whether `eopa_quiz_attempt_question_answers.answer` is option text (like the others) or an index/key, and whether EOPA is in scope for distractor analysis.
6. **Adaptive `answer_ids` delimiter:** Confirm `answer_ids` is comma-separated `adaptive_question_options.id` values (the `FIND_IN_SET` join assumes that).
7. **Timing join cardinality:** The time-log join is on `(quiz_id,user_id,question_id)` and the combined export already has "Avg Time Taken Per Question" — confirm whether to keep timing aggregated or per-response.

---

## ANSWERS (from Jeramey, 2026-06-05) — resolves the open questions

1. **Where the combined report is generated → RESOLVED.** It is a **bespoke script the dev team built specifically for this**, saved on their own system (not in this repo — matches the agent's finding). **Action:** ask the dev team to extend *that* script to add the selected-option column; don't rebuild in-repo.
2. **Student Code source → NOT `registry_number`.** It came from a **manual name → number find-and-replace mapping Jeramey holds**, not an in-app field. **Implication:** code consistency across pulls depends on reusing *Jeramey's* mapping. To join the new distractor pull to Brad's existing GA/KS files, the same name→number key must be applied — coordinate this with Jeramey, don't assume the DB can regenerate it.
3. **Edited/duplicate option text → mostly a non-issue going forward.** Current process: editing an option **saves the old version, unpublishes it, and creates a new v1/v2/v3** — so history is preserved and the text-match join is safe on modern data. **Some early-days data may have in-place edits.** **Action:** quantify the NULL-key rate *on older responses only*; modern data is clean. Brad flags/excludes the small unmatched early tail.
4. **MSQ / EOPA → handle as they arise.** Present per-selected-option as-is; decide grain case-by-case. Low priority, not a blocker.
5. **(EOPA)** — same as #4: work it when it comes up.
6. **Adaptive bank → treat separately.** It's a **different system built on SurveyJS** (the first adaptive system, hence the normalized-option-ID model the agent noted). Do **not** force it into the legacy `UNION ALL`. Calibrate/analyze the legacy banks (Exit/Unit/TQZ/Simulator) together; handle adaptive on its own — it's also the existing engine that Track 3 (CAT) builds on.
7. **Timing is recent-only.** "Avg Time Taken Per Question" is a **new feature — only a few months of history.** **Implication:** response-time features (aberrance flags, timing-informed models) are viable only on recent data, not the historical bulk. Don't design core analyses around timing.

### Net for Brad's data work
- **Selected-option pull:** dev team extends their existing script (+ reuse Jeramey's Student Code mapping).
- **Calibration scope:** legacy banks together; adaptive separate.
- **Two honest data limits:** (a) a small early-data tail may not text-match (quantify + exclude); (b) timing only covers recent months.
