# Jira Ticket — paste-ready
*Attach to parent: `DATA-PULL-SPEC.md`, `sample-distractor-export.csv`, `sample-item-bank-export.csv`*

---

## PARENT STORY

**Summary:** Bulk data pull: response history + question bank exports (2 CSV files)

**Priority:** High · **Due:** Friday, June 13, 2026

**Description:**

Two CSV files for psychometric item analysis. Full spec + sample files attached — **the sample CSVs are the contract, match the columns exactly.**

Run server-side with direct SQL, same as the GA/KS combined report script — NOT the in-app exports (they'll time out; row count exceeds the Excel limit). Deliver raw with real names — anonymization happens on my side. Splitting by bank/year + gzip is fine.

**Done means:**
- [ ] Both files match the attached samples, all programs, current through run date
- [ ] Row counts per bank reported
- [ ] File 1 NULL-key rate reported (rows that didn't text-match an option)

---

## SUB-TASK 1

**Summary:** File 1 — Response export (extend GA/KS combined report script)

**Description:**

Re-run the combined question report script — **all programs** — and append 4 columns (see `sample-distractor-export.csv`):

- **Selected Option Text** — `quiz_attempt_history_question_answers.selected_option` (TQ/Sim) · `unit_exam_attempt_history_question_answers.selected_option` (Unit/Exit)
- **Selected Option Key** — match text to the question's `option_1..6` (trim+lowercase, same as `Questions::correctAnswer`); NULL if no match, don't fix
- **Selected Option Is Correct** — 1/0 from `questions_answers` / `unit_exam_question_answers`
- **Correct Option Key** — which slot is keyed correct

Banks: Targeted Quiz, Simulator, Unit Exam, Exit Exam. Skip Adaptive + EOPA. Filter `is_attempted = 2`.

---

## SUB-TASK 2

**Summary:** File 2 — Question bank export with per-option pick counts

**Description:**

One row per question, no student data (see `sample-item-bank-export.csv`): question text, options 1–6 with correct flag, category/subcategory/objectives, version info, plus raw counts — total attempts, times each option selected, distinct respondents. Same per-option counting `QuestionReportExport.php` already does.

Banks: all four legacy + Adaptive option-based. Skip matrix questions + EOPA. **Raw counts only — no computed stats.**
