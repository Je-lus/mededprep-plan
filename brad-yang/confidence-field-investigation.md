# Confidence Field Investigation — mededprep-c

**Repo:** `/home/jeramey/projects/mededprep-c` (branch `master`)
**Method:** Read-only code/grep investigation, delegated to Codex and independently spot-verified against source.
**Date:** 2026-06-06

---

## 1. VERDICT

**The product owner is correct.** A continuous numeric confidence (slider, stored verbatim) IS persisted — the High/Medium/Low enum is a derived, client-side label only. The continuous value lives in `confidence_level_range` (bigint). It is captured for **Targeted Quiz**, **Unit Exam**, and **Exit Exam**. It is **NOT** captured in the active write paths for **Simulator**, **EOPA**, or **Adaptive**.

The prior "coarse 3-level enum only" conclusion was wrong: the enum is a presentation derivative of a raw 1–100 slider.

---

## 2. Numeric field vs. enum field (exact table.column + migration)

Two physical answer tables carry confidence, each with BOTH a numeric and an enum column.

### Targeted Quiz / Simulator — `quiz_attempt_history_question_answers`

All three columns added in one migration:
`database/migrations/2025_02_19_001505_add_new_field_to_quiz_attempt_history_question_answers_table.php`

| Column | Type | Role | Line |
|---|---|---|---|
| `confidence_level` | `enum('High','Medium','Low')` nullable | **enum (presentation)** | :17 |
| `reason` | `string` nullable | free-text reason | :18 |
| `confidence_level_range` | `bigInteger` `default(0)` nullable | **raw numeric 1–100** | :19 |

Model fillable: `app/Models/QuizAttemptHistoryQuestionAnswer.php` (includes all three).

### Unit Exam / Exit Exam — `unit_exam_attempt_history_question_answers`

The enum was created with the table in 2022; the **numeric column was added in Oct 2024**:

| Column | Type | Role | Migration:Line |
|---|---|---|---|
| `confidence_level` | `enum('High','Medium','Low')` nullable | **enum (presentation)** | `2022_06_14_111345_create_unit_exam_attempt_history_question_answers_table.php:24` |
| `reason` | `string` nullable | free-text reason | `...111345...:25` |
| `confidence_level_range` | `bigInteger` `default(0)` (non-null) | **raw numeric 1–100** | `2024_10_03_071210_add_confidence_level_range_field_on_unit_exam_attempt_history_question_answers_table.php:17` |

Model fillable: `app/Models/UnitExamAttemptHistoryQuestionAnswer.php`.
Exit Exam shares this table (Exit Exam is a `type` of unit exam — `UnitExamCreateExam::TYPE_EXIT_EXAM`; reports filter the shared `unit_exam_quiz_attempt_history` by `type = exit_exam` in `app/Utilities/ExitExamUtilitiesForPerformaceReport.php`).

### EOPA — `eopa_quiz_attempt_question_answers` — NO confidence at all
`database/migrations/2025_04_30_065151_create_eopa_quiz_attempt_question_answers_table.php:16-22` defines only `answer` (string). No numeric, no enum.

### Adaptive — `adaptive_exam_attempt_histories` — NO self-rated confidence
`database/migrations/2025_07_14_081244_create_adaptive_exam_attempt_histories_table.php` stores `answer_ids`, `given_answer`, status, time only. The only "confidence" in Adaptive code is a **timing-derived "confidence quadrant"** heuristic (`app/Models/AdaptiveExamAttempt.php:154,304` — `calculateConfidenceQuadrant`), NOT a student self-rating.

---

## 3. Enum-derivation thresholds (the enum IS derived from the numeric)

Derivation happens **client-side**: as the student drags the 1–100 slider, JS auto-clicks the matching High/Med/Low radio. The enum is therefore a pure function of the numeric.

| Numeric range | Derived enum |
|---|---|
| `1–29` | Low |
| `30–70` | Medium |
| `71–100` (`>=71`) | High |

Evidence (identical logic in both banks):
- Targeted Quiz: `resources/views/frontend/quiztest.blade.php:609-619` (`.confidence_level_range` input handler).
- Unit/Exit shared JS: `public/assets/frontend/js/unitexamexam-dedicated.js:39-53`.

The export script documents the same mapping and its midpoints in a docstring: `metacognition/generate_full_dataset.py:330-342`.

Instructor/admin views consume the **enum only**, as grouped counts (e.g. `COUNT(CASE WHEN confidence_level = 'high' ...)`), confirming it is the instructor-facing presentation layer: `app/Services/Admin/GroupService.php` (~:348-360), `app/Services/Admin/UnitExamStudentService.php` (~:2066-2083). This matches the product owner's "instructors aren't psychometricians" rationale.

---

## 4. Write path + mandatory-entry enforcement

### Write path (raw 1–100 stored verbatim)

**Targeted Quiz:**
- Slider input: `resources/views/frontend/quiztest.blade.php` (`.confidence_level_range`, ~:237-240).
- JS posts raw value as `confidentLevelRange`: `public/pages/frontend/questions.js:434` (`confidentLevelRange: $(".confidence_level_range").val()`), alongside `confidentLevel` (the derived enum) and `reason`.
- Controller: `app/Http/Controllers/Frontend/QuizzeController.php` (~:241-247) → `QuizService`.
- **Stored verbatim:** `app/Services/Frontend/QuizService.php:615` — `'confidence_level_range' => $request->get('confidentLevelRange', null)` (also submit path at :1012). No bucketing/transformation before insert.

**Unit/Exit Exam:**
- Slider input: `resources/views/frontend/unit_exam_quiztest.blade.php` (~:102-105).
- JS posts `confidentLevelRange`: `public/pages/frontend/unit_exam_questions.js` (~:474-484).
- Controller: `app/Http/Controllers/Frontend/UnitExamController.php` (~:351-357) → `UnitExamService`.
- **Stored verbatim** (with a `?? 1` fallback): `app/Services/Frontend/UnitExamService.php` (~:628-634, submit ~:844-850).

### Mandatory-entry enforcement

- **Client-side: present.** JS blocks Next/palette navigation (and Submit) when an answered question has no confidence value.
  - Targeted Quiz: `public/pages/frontend/questions.js` (~:343-348 next/palette, ~:906-919 submit gate).
  - Unit/Exit: `public/pages/frontend/unit_exam_questions.js` (~:388-416 next, ~:621-642 submit).
- **Server-side: ABSENT.** No `Validator`/FormRequest rule enforces confidence on the save/submit endpoints. Controllers call services directly, and services default missing confidence to `null`/`'Low'`/`1`. So the "cannot proceed without entering it" guarantee is **client-side only** — a determined/automated client could submit without it, and it would persist a default.

---

## 5. Coverage by bank

| Bank | Numeric 1–100 captured? | Storage column | Field added (migration date) |
|---|---|---|---|
| **Targeted Quiz** | ✅ Yes | `quiz_attempt_history_question_answers.confidence_level_range` | 2025-02-19 |
| **Simulator** | ❌ No (active path) | (column exists in shared quiz table, but active simulator JS `public/pages/frontend/simulator_cat.js:283-287` and service `QuizService.php:707-711` omit confidence) | column 2025-02-19; not written |
| **Unit Exam** | ✅ Yes | `unit_exam_attempt_history_question_answers.confidence_level_range` | 2024-10-03 |
| **Exit Exam** | ✅ Yes | (shared) `unit_exam_attempt_history_question_answers.confidence_level_range` | 2024-10-03 |
| **EOPA** | ❌ Not captured | none — table has only `answer` | n/a (table created 2025-04-30, no confidence) |
| **Adaptive** | ❌ Not captured (self-rating) | none — only a timing-derived "confidence quadrant" heuristic | n/a (table created 2025-07-14, no self-rating) |

Note on Simulator: the enum/numeric columns physically exist (shared `quiz_attempt_history_question_answers`), but the active Simulator front-end (`simulatorTest.blade.php` + `simulator_cat.js`) does not render a slider or POST `confidentLevelRange`, and the simulator branch of `QuizService` inserts without confidence. An older `simulatorTest--with-confidance-level.blade.php` view exists but is not the wired-up template. So Simulator effectively does not capture self-rated confidence today.

---

## 6. Tie to the export ("combined question report" `Confidence` column)

The anonymized combined dataset generator sources `Confidence` **from the numeric field first**, falling back to enum midpoints only for pre-migration rows:

- `resolve_confidence(confidence_level_range, confidence_level_enum)` — `metacognition/generate_full_dataset.py:321-360`:
  - Returns `int(confidence_level_range)` when `> 0` (numeric-first).
  - Falls back to enum midpoints **only** when numeric is null: `High→85, Medium→50, Low→15` (:352-360).
- Targeted Quiz rows map numeric → `Confidence`: ~:433-448, :479-482.
- Unit/Exit rows: ~:503-517, :546-549.
- Adaptive rows are exported as `Confidence: 0` because no confidence is captured: ~:561-566, :590-602.

So the 0–100 values in the export's `Confidence` column are the raw slider values (`confidence_level_range`), not derived from the enum (except legacy pre-migration rows).

---

## 7. Implication for W1 (continuous calibration feasibility)

**Continuous confidence calibration is feasible NOW** for the banks that capture the slider:

- **Available (Brier curves, continuous over/under-confidence, calibration plots):** Targeted Quiz, Unit Exam, Exit Exam — wherever `confidence_level_range > 0`. The export already surfaces these as 0–100, so W1 analysis can proceed directly off `metacognition/generate_full_dataset.py` output without schema changes.
- **Blocked (no continuous data):**
  - **Simulator** — columns exist; only needs front-end slider + a one-line service write to start capturing. Lowest-effort unblock.
  - **EOPA** — needs a new numeric column on `eopa_quiz_attempt_question_answers` + capture path.
  - **Adaptive** — needs a new numeric column on `adaptive_exam_attempt_histories` + capture path; the existing "confidence quadrant" is timing-inferred and is NOT a substitute for self-rated calibration.

**Caveats for W1:**
1. Server-side enforcement is missing — expect some rows with default `0`/`1`/`null` confidence that must be filtered (the export already filters `> 0` for numeric). Quantify the proportion of `0`/null rows before reporting calibration to avoid biased curves.
2. Pre-migration rows (Unit/Exit before 2024-10-03; Quiz before 2025-02-19) have only enum → export imputes midpoints (85/50/15). Those imputed points are coarse; exclude or flag them in continuous-calibration work.
3. "Mandatory" is a client-side UX guarantee, not a DB constraint — treat completeness as empirical, not assumed.

---

### Appendix — verified citations
Independently confirmed against source (not just Codex output): migration column types (`2025_02_19...:17-19`, `2024_10_03...:17`, `2022_06_14_111345...:24-25`); threshold JS (`quiztest.blade.php:609-619`, `unitexamexam-dedicated.js:39-53`); verbatim store (`QuizService.php:607-615`); POST field name (`questions.js:434`); EOPA absence (`...065151...:16-22`); Adaptive heuristic-only (`AdaptiveExamAttempt.php:154,304`); export resolver (`generate_full_dataset.py:321-360`).
