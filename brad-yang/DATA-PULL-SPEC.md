# Data Pull — Two CSV Files

** Run on your side (direct SQL, like the GA/KS pull script). CSV only. Deliver raw with names. Splitting by bank/year + gzip is fine.**

---

## File 1 — Response export (match `sample-distractor-export.csv`)

Re-run the GA/KS combined question report script — **all programs this time** — and add 4 columns at the end:

| New column | Where it is |
|---|---|
| Selected Option Text | `quiz_attempt_history_question_answers.selected_option` (TQ/Sim) · `unit_exam_attempt_history_question_answers.selected_option` (Unit/Exit) |
| Selected Option Key | match that text to the question's `option_1..6` (trim+lowercase, same as `Questions::correctAnswer`) — leave NULL if no match |
| Selected Option Is Correct | 1/0 from `questions_answers` / `unit_exam_question_answers` |
| Correct Option Key | which option slot is keyed correct |

Banks: **Targeted Quiz, Simulator, Unit Exam, Exit Exam.** Skip Adaptive + EOPA. Filter `is_attempted = 2`.

## File 2 — Question bank export (match `sample-item-bank-export.csv`)

One row per question, all banks **including Adaptive option-based** (skip matrix questions + EOPA): question text, options 1–6 with correct flag, category/subcategory/objectives, version info, plus **raw counts only** — total attempts, times each option was selected, distinct respondents (same per-option counting `QuestionReportExport.php` already does). No computed stats

---

**With delivery, please send:** row counts per bank, and File 1's NULL-key rate (how many rows didn't text-match an option).

**The two sample CSVs are the contract — match the columns exactly. **
