# Data Pull Request — Dev Team Brief
*For the morning meeting (June 2026). Goal: refreshed full export in hand before Brad starts 6/15.*

---

## The ask in one sentence
**Re-run the combined question report script — same format as the Georgia/Kansas pulls you did before — but current through the run date, expanded scope, and with one new addition: the answer option the student actually selected.**

---

## What to say in the meeting (talking points)

> "Remember the combined question report script you built for the Georgia and Kansas pulls? I need it re-run with everything current as of this week, and one extension.
>
> **Part 1 — Refresh.** Same script, same columns, same format. Just current data through the day you run it.
>
> **Part 2 — Add the selected option.** Right now the report says correct/incorrect but not *which* answer the student picked. That data is already stored — no schema change. It's in:
> - `quiz_attempt_history_question_answers.selected_option` (Targeted Quiz / Simulator)
> - `unit_exam_attempt_history_question_answers.selected_option` (Unit / Exit Exam)
>
> Add three columns to the report: the selected option text, which option slot it maps to (match the stored text against `questions.option_1..6` — trim + lowercase, same as the app's own scoring in `Questions::correctAnswer`), and whether that option was the keyed-correct one.
>
> **Scope:** legacy banks only — Targeted Quiz, Simulator, Unit Exam, Exit Exam. **Skip the adaptive/SurveyJS system and EOPA entirely** — different shape, handled separately later.
>
> **Multi-select questions:** leave them as-is — one row per selected option is fine.
>
> **Deliver it raw with real names/IDs.** I apply the anonymization mapping myself before it goes anywhere, same as last time."

---

## Decisions to state (so there's no back-and-forth)
| Decision | Call |
|---|---|
| Scope of students | **⟵ DECIDE: all programs, or GA + KS refresh only?** ("All the data" = all programs; note your name→number mapping must be extended to cover new students) |
| Banks | Targeted Quiz, Simulator, Unit Exam, Exit Exam. **No adaptive, no EOPA.** |
| Grain | One row per question-response (MSQ = one row per selected option, as the tables store it) |
| Timing column | Keep as-is (it's recent-only anyway — Feb 2026 onward; known limitation) |
| Anonymization | Dev team delivers raw → **Jeramey applies the Student Code mapping** → only then to Brad |
| NREMT file | Also refresh the `*_student_nremt_matched` file if any new outcomes have been recorded |

## Deadline framing
- Brad starts **Monday 6/15**.
- Ask for the pull by **Thursday/Friday (6/12–6/13)** so you have the weekend to apply the anonymization mapping and spot-check.
- The run date becomes the label: *"current as of 6/12/2026"* (or whatever day they run it).

## One QA check to request
Ask them (or note for Brad) to report **how many rows fail the option-text match** (selected text matches none of `option_1..6`). Expected: small, concentrated in early-days data before option versioning existed. That number goes in the data notes for Brad.

## Why this is easy for them (preempt pushback)
- The selected option is **already persisted for every bank** — confirmed in the codebase (`QuizService.php:605`, `UnitExamService.php:631`).
- The app **already does this exact text-match** in `QuestionReportExport.php:53-59` (per-option pick counts) — they're reusing proven logic, not inventing it.
- It's their existing script + one join + three columns. No schema change, no deploy, no production risk.

---

## What Jeramey does after delivery
1. Apply the name → Student Code mapping (**must reuse the existing mapping** so codes line up with Brad's prior GA/KS files; extend it for any new students).
2. Drop the anonymized files into `confidence-data/anonymous/` alongside the existing ones.
3. Spot-check: row counts vs. prior pull, Student Codes join across old/new files, NULL-key rate on selected option.
4. Hand to Brad day 1: *"Same stuff you worked with before, current as of 6/XX — plus the selected-option columns for the distractor work."*

*Full technical detail (schema map, dev-ready SQL templates, resolved open questions): `distractor-data-investigation.md` in this folder.*
*Target output format: `sample-distractor-export.csv` in this folder — the existing 16 columns unchanged, plus 4 new columns appended at the end (`Selected Option Text`, `Selected Option Key`, `Selected Option Is Correct`, `Correct Option Key`).*
