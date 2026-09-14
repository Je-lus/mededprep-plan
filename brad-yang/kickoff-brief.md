# Brad Yang — Summer Kickoff Brief
**Psychometrics Intern · June 15 – Aug 21, 2026 · ~20 hrs/wk (flex to 40)**
*One-pager to align on in the Week 1 meeting. Goal: Brad walks in with direction and a running start.*

---

## The one-sentence direction
**Build the IRT calibration layer that doesn't exist yet, let item-quality flagging fall out of it, then stand up a real CAT in the CE/CAPCE product — with the metacognition study running as the parallel research/portfolio thread.**

---

## What you already have (no platform account needed)
You work entirely from **anonymized, de-identified exports** — no access to mededprep.com production, which keeps the ethics/NDA scope clean. The existing pull lives here:

- `confidence-data/anonymous/Georgia/anon_GA_combined_question_report.csv` (~308K response rows)
- `confidence-data/anonymous/Kansas/anon_KS_combined_question_report.csv`
- `…/anon_*_student_nremt_matched.csv` — NREMT pass/fail outcomes (~225 students total)

**Grain:** one row = one question-response. Columns include `Student Code`, `Question Code`, `Accuracy (0/1)`, `Confidence (0–100)`, `Quiz Type`, categories/subcategories/objectives, exam level, timing, quiz order. This is already a person × item × correct matrix — i.e., **calibration-ready on day one.**

**Quiz-type volume (GA sample):** Exit Exam 183.7K · Unit Exam 103.9K · Targeted Quiz 15.3K · Simulator 5.1K.

---

## The four tracks (dependency-ordered — they are NOT parallel equals)
1. **IRT Parameter Estimation — THE SPINE.** 1PL across the production bank; 2PL where response volume supports it. *No full 3PL across all 10,600 items* (sparse items get excluded — that's expected). Everything downstream consumes these parameters.
2. **Item Quality & Distractor Analysis — falls out of #1.** Flag misfit / low-discrimination / bad-distractor items; write the rubric that feeds the AI question generator. *(Requires the selected-option data — see "in flight" below.)*
3. **CAT Formalization — deploy in the CE / CAPCE product, NOT main mededprep.com.** Theta estimation + max-information selection + stopping rules, built on #1's parameters. CE is the right target: new build, lower-stakes than NREMT, current business priority.
4. **Adaptive Learning Loop + Metacognition — the research lane.** Rerun the metacognition analyses with updated categorizations (TQZ + confidence signal); design the psychometric gating for AI-generated items. Publication-track for your portfolio.

---

## What you do in Week 1 (running start)
1. Meet the team; align on this brief (spine + which parallel track).
2. Load the GA/KS exports in R (`mirt`). Filter to a coherent stream.
3. Fit a **1PL baseline on Exit + Unit Exam responses** → first real difficulty/discrimination parameters this week.
4. Report the **per-item response-count distribution** — this sets the N-threshold deciding which items support 1PL vs 2PL.

---

## Calibration ground rules (decide together in Week 1)
- **Separate the streams.** Calibrate on **Exit + Unit Exam** (consistent-stakes) first. Treat **Targeted Quiz** as the *metacognition signal*, not calibration input — voluntary low-stakes effort biases difficulty estimates. The `Quiz Type` column makes this a one-line filter.
- **No 3PL-across-everything.** 1PL bank-wide, 2PL where data is rich. Exclude very-low-N items for now.
- **NREMT outcomes are ~225 students** — fine for descriptive validity, too thin to anchor heavy prediction. Don't let prediction become a centerpiece.

---

## The distractor data — RESOLVED (good news)
The current export omits the chosen option, but the platform **already stores the selected answer for every bank** — no schema change needed. The dev team just adds a join to the existing pull. Exact locations:
- Targeted Quiz / Simulator → `quiz_attempt_history_question_answers.selected_option`
- Unit / Exit Exam → `unit_exam_attempt_history_question_answers.selected_option`
- Adaptive → `adaptive_exam_attempt_histories.answer_ids` (normalized option IDs — the clean one)

**One caveat to handle:** in the legacy banks the selection is stored as the option **TEXT string**, not an id, so you match it back to `questions.option_1..6` and flag correctness via `questions_answers`. Edited/duplicate option text is the main data-quality risk on that join. Full dev-ready SQL + 7 open questions for the dev team → **`distractor-data-investigation.md`** (this folder). *Track 1 doesn't wait on this; Track 2 uses it.*

---

## What "a great summer" looks like
A calibrated item bank handed to the dev team for adaptive routing **+** an item-quality worklist/rubric **+** a working CE CAT prototype (ideally deployed) **+** a drafted metacognition analysis. That's the audition for the full-time psychometrician seat — let the work make that case on its own.
