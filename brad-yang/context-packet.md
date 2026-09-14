# Context Packet — "What Would a Psychometrician Want?" Ideation
*Phase 0 brief. This is the shared context every ideation agent receives. Goal: a tailored, scale-aware wishlist of psychometric work — NOT a generic IRT/DIF literature review.*

---

## The platform (ground truth)
- **MedEdPrep** = EMS certification test-prep (EMT / AEMT / Paramedic), nationwide but **growing, not large**.
- **Scale:** ~4,222 students · ~1.6M response records · 10,600+ published items (+~10k AI-generated awaiting review) · 30+ states · 239 programs.
- **Criterion of record:** **NREMT pass/fail.** Currently only **~225 matched outcomes** — the binding constraint on anything predictive.
- **Question banks (all in `mededprep-c`):** Exit Exam, Unit Exam, Targeted Quiz, Simulator, EOPA, and a separate **Adaptive** engine (SurveyJS, normalized option IDs). The legacy banks share a common option_1..6 / boolean-key shape; Adaptive is its own world.
- **Current "adaptive" exam is NOT IRT** — domain-mastery proficiency with random selection. No theta, no item information. This is the gap Brad fills.
- **Business angle:** "evidence-based" is a real differentiator in this market; calibrated items + published research + program-level insight all have commercial value. CAT can be deployed in the **CE/CAPCE product** (not main mededprep.com).

## What we CAN measure today (high signal)
- Per-response **correctness + selected option (text)** across the legacy banks → IRT calibration + distractor analysis.
- **Confidence (0–100)** per response on quiz/sim/unit/exit (none on EOPA/Adaptive) → confidence-accuracy calibration, metacognition.
- A real **student → school → branch(satellite) → instructor → group/cohort** hierarchy (FKs present) → **multilevel modeling, instructor/program value-added, DIF by state/program, cohort-aware calibration.** (Caveat: school membership changes over time — use `user_school_transfer_histories`.)
- **Per-item timing + position** via `*_time_logs.question_number` (recent data only) → sequence/order effects, within-attempt fatigue, end-of-test rapid-guessing/speededness.
- **Longitudinal signal:** exam-level progression (`user_exam_level_histories`), retakes, cross-bank linkage via shared `user_id`, item-exposure counts (derivable).

## Hard constraints — respect these or the idea is out of scope
- **No 50,000-examinee fantasies.** Median item exposure is modest; many items are sparse. 1PL bank-wide, 2PL where data supports, **no full 3PL across all items.**
- **NREMT N≈225 right now.** Low power for item-level prediction. BUT — see N-as-a-lever below.
- **No stored item statistics** — everything is computed from raw responses; nothing pre-exists to lean on.
- **Timing is recent-only** (Feb 2026). **Bloom's absent.** **Demographics = DOB + gender only** (no race/ethnicity/language → strict DIF/fairness work is capture-limited).
- **Text-match option keying** has an early-data failure tail; **adaptive/EOPA lack confidence**; mid-attempt answer-changes are deleted.

## N-as-a-lever (IN SCOPE — treat data acquisition as a deliverable)
The 225 NREMT outcomes are *today's* number, not a ceiling. Brad — a credentialed psychometrician with a company email — can **run a collection campaign** (call/email programs: "I'm the MedEdPrep psychometrician gathering NREMT outcomes"), which doubles as program-relationship building. Ideation should treat growing N as a lever and may propose a **data-acquisition plan**, not just analysis.
- **Design caveat for any such plan:** individual-matched outcomes (this student passed) are analytically gold; aggregate program pass rates are far weaker and different. Mind FERPA/consent — design the ask deliberately (likely an MOU/consent), don't wing it.

## What we want OUT of the ideation
A **ranked wishlist** of psychometric work/assets a sharp in-house psychometrician would build here, each tagged with: rough value, the data it needs, and whether that data is **have-now / derivable / needs-new-capture / needs-acquisition (NREMT)**. Bias toward things that are *distinctively possible here* (e.g., the hierarchy, the confidence signal, the AI-item pipeline) over generic textbook items everyone has.

## The three ideation lenses (one agent each — stay in your lane to maximize coverage)
1. **Item & Test Quality** — IRT calibration strategy for uneven-N banks, distractor/option analysis, DIF, item-quality rubric feeding the AI generator, linking/equating across banks, flagging/retirement.
2. **Student Learning & Adaptive** — CAT in the CE product (theta estimation, max-info selection, stopping rules), ability-estimate feedback, metacognition (TQZ + confidence), remediation, knowledge-decay, learning curves.
3. **Institutional, Validity & Business** — multilevel/instructor-program value-added, cohort/state benchmarking, **NREMT predictive validity + the acquisition campaign**, "evidence-based" research/publications as marketing, program-facing reporting.

*Cross-cutting: respect the constraints above; prefer derivable-now; call out where an idea needs new capture or acquisition.*
