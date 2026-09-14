# MedEdPrep — Unified Psychometric Data Inventory
*Merged from two recon passes on `mededprep-c` (2026-06-06). Detail lives in the two source files; this is the curated union + gap-fills.*

**Source files (full detail):**
- `data-inventory-captured.md` — Codex, "what we capture now" (58KB, exhaustive table by domain)
- `data-inventory-gaps.md` — Gemini, "what we could derive / capture" (latent value + wishlist)

---

## The 60-second picture
- **Richest data:** legacy quiz / simulator / unit / exit **response records** — per-question correctness, selected-option text, item category/objective tags — joined to a real **student → school → branch(satellite) → instructor → group/cohort** hierarchy via `users.school_id` / `school_branch_id` / `instructor_id` and `group_students`.
- **Thinnest / watch-outs:** **no item statistics are stored** (no difficulty/point-biserial/discrimination/IRT params persisted — discrimination is computed ad hoc in `UnitExamStudentService.php`, never saved); **timing is recent-only** (Feb 2026); **confidence is bank-limited** (quiz/sim/unit/exit yes; EOPA + Adaptive none); **NREMT outcomes are sparse + manual** (`nremt_attempts`, ~225, no FK, no attempt#/date); **Bloom's absent**; demographics = DOB + gender only.
- **Not in this repo:** Pulse schema, flashcards/Leitner (`Card.php` is Stripe), no distinct `program` table (program ≈ school+branch+instructor+group).

---

## Gap-fills (rows Gemini's pass dropped — verified in migrations today)
| Signal | Where | Derivable? | Why it matters |
|---|---|---|---|
| **Exam-level progression** (EMT→AEMT→Paramedic over time) | `user_exam_level_histories` (2022) | now | Longitudinal growth; defines "same student, harder level" for learning-curve work |
| **Retake signal (adaptive)** | `adaptive_exam_retake_requests` (2025) | now | Repeated-exposure / practice-effect modeling |
| **School transfers** | `user_school_transfer_histories` (2025) | now | ⚠️ school membership is **point-in-time, not fixed** — multilevel cluster assignment must use transfer history, not just current `school_id` |
| **Cross-bank student linkage** | shared `user_id` across `quiz_attempt_history`, `unit_exam_quiz_attempt_history`, `eopa_*`, `adaptive_exam_attempt_histories`, `poll_attempt_history` | now | Build one unified longitudinal record per student spanning every bank |
| **Item-exposure counts** | `COUNT(*) GROUP BY question_id` over response tables | now | Sets the N-threshold deciding which items can be calibrated (1PL vs 2PL) |
| **Distractor migration across *separate* attempts** | response history, same student×item across attempts | now (where retakes exist) | Did they move off a distractor toward the key? (distinct from mid-attempt answer-change, which is deleted — see below) |
| **Survey/poll responses** | `poll_attempt_history` | now | Possible UX/feedback signal; scope TBD |

---

## Cross-cutting data-quality traps (carry into every analysis)
1. **No stored item parameters** — Brad computes them from scratch; nothing to validate against.
2. **Timing recent-only** (Feb 2026 migrations) — sequence/fatigue/speededness models have a large historical blind spot. *But* `*_time_logs.question_number` makes them cleanly derivable on recent data.
3. **NREMT N≈225, no FK, manual match** — predictive validity is low-power now (see "N-as-a-lever" in the context packet — Brad can grow this).
4. **Text-match option keying** — early in-place edits to `questions.option_N` will fail to join to the modern key; quantify the NULL-key rate on old data and exclude the tail.
5. **`nremt_attempts.result` enum has `'RECYCLED '` with a trailing space** — a literal filter-breaker.
6. **Mid-attempt answer changes are deleted** (`QuizService.php:598` et al.) — the "vacillation" path isn't recoverable historically; a going-forward capture item.
7. **Confidence + timing gaps by bank** — don't assume uniform coverage across banks.

---

*Next: `context-packet.md` curates this into the ideation brief (Phase 0).*
