# MedEdPrep Psychometrics — Prioritized Wishlist & Build Plan

*Final reconciled deliverable. Synthesizes the W1–W24 master wishlist against two independent, read-only feasibility passes (codex + gemini) verified against the `mededprep-c` schema. Where both passes agree, the verdict is treated as confident. Where they differ, the disagreement is noted and the conservative reading is adopted.*

*Scale reality: N ≈ 225 matched NREMT outcomes, sparse per-item bank, 1PL/2PL only (no full 3PL, no 50k-examinee methods). Built for Jeramey and Brad to prioritize directly.*

> **⚠️ CORRECTION (2026-06-06, post-publication):** The confidence signal is **continuous (1–100), not a 3-level enum.** Students self-rate per question on a mandatory 1–100 slider, stored raw as `confidence_level_range` (Targeted Quiz / Unit Exam / Exit Exam answer tables); the High/Med/Low enum is a *derived* presentation label for instructors (1–29 Low · 30–70 Med · 71+ High). **This upgrades W1/W4/W5/W18 from coarse calibration-by-bucket to genuine continuous calibration (Brier curves, continuous over/under-confidence)** — a remarkable mandatory per-question metacognition dataset across 1.6M responses. Caveats: not captured on Simulator / EOPA / Adaptive; mandatory entry is **client-side-only**, so filter `confidence_level_range > 0` and quantify missingness before reporting. Full trace: `confidence-field-investigation.md`.

---

## 1. Executive Summary — Top 5 Bets (high value AND feasible)

These five clear both bars: they create real, distinctive value AND both feasibility passes confirm the data exists today. Start here.

1. **Confidence-Accuracy Calibration Engine (W1).** Measure whether students are *confident-and-right* vs. *confident-and-wrong* per item, student, and cohort. The "confident-wrong on an airway item" quadrant is exactly the EMS clinical-safety story no competitor can tell — because almost no competitor captures confidence. **Correction (2026-06-06):** confidence is in fact **continuous 1–100** (`confidence_level_range`); the enum is a derived label. The continuous Brier-curve framing is *correct*, not overstated. Captured on Quiz/Unit/Exit; absent on Simulator/EOPA/Adaptive; mandatory entry is client-side-only → filter `confidence_level_range > 0` and quantify missingness.

2. **Full Distractor / Option-Trace Analysis (W2).** Because we store the *selected option text* (not just right/wrong), we can see which wrong answers attract whom — flagging dead distractors, distractors that lure high-ability students, and keys that underperform a distractor. This is the single strongest under-used signal in the bank and it feeds the AI generator and student remediation. Raw selection rates are available now; the "high-ability picks the distractor" cut needs theta from W6.

3. **Confidence-Keyed Miskey & Ambiguity Detector (W4).** Items where *high-confidence* responses are systematically wrong → probable miskeys or ambiguous stems. This is a second, independent miskey catcher that needs **no IRT at all**, so it works even where per-item N is too thin to calibrate. Fastest path to cleaning the keying-failure tail. Both passes: have-now (coarse).

4. **Program / Branch / Instructor Value-Added Model (W9) — paired with Incoming-Ability Adjustment (W10).** The real FK hierarchy (school → branch → instructor → student) is the single most distinctive institutional asset; no generic test bank has it. Partition outcome variance and report shrinkage-adjusted value-added — but *only* with W10's incoming-ability baseline so it doesn't punish programs serving weaker-entering students. **Conservative flag (both passes):** the `user_school_transfer_histories` table links user *records* but carries **no school columns and no explicit transfer date** — time-correct membership is harder than the wishlist implied. Run on internal exit proficiency now; NREMT as the outcome waits on W17.

5. **Cohort & State Benchmarking Reports (W15).** "How do my students compare?" is the #1 program-director ask, and 30+ states / 239 programs make it immediately meaningful. The most directly *sellable* artifact and the natural payload of the acquisition calls. **Honest-labeling flag (both passes):** "national distribution" is **internal-bank-relative**, not an externally normed benchmark — label it as such.

**Two binding constraints sit behind everything:**
- **NREMT N ≈ 225** caps every predictive/validity claim until Brad grows it (W17).
- **Coarse/absent confidence signal** degrades (does not kill) W1/W4/W5 and blocks a confidence-aware CAT stopping rule.

Neither pass found a single item that is outright **NOT feasible**.

---

## 2. Full Ranked Wishlist

Reconciled feasibility verdict legend: **have-now** (data exists, build it) · **derivable-now** (computable from existing data, no schema change) · **needs-new-capture** (requires a logging/schema change) · **needs-NREMT-acquisition** (gated on growing matched N). Effort: S / M / L. *Disagreements between the two passes are flagged in the verdict cell and resolved conservatively.*

### TIER 1 — Quick Wins

| # | What it is | Value | Data need | Reconciled feasibility | Effort | Tier |
|---|---|---|---|---|---|---|
| **W1** | Confidence-accuracy calibration (Brier/calibration-by-bucket, over/under-confidence index) | High — distinctive safety signal, doubles as student + cohort + predictor surface | `*_question_answers.confidence_level` (enum) joined to correctness | **have-now (continuous 1–100)** — `confidence_level_range`; enum is derived. Quiz/Unit/Exit only (not Sim/EOPA/Adaptive); client-side-only enforcement → filter `>0` | M | 1 |
| **W2** | Full distractor / option-trace analysis | Very high — strongest under-used signal; feeds W8 + W11 | `selected_option` text vs. `option_1..6` + key | **have-now / derivable-now** — passes split on label (have vs. derivable); both confirm data. Raw rates now; ability cut gated on W6 | M | 1 |
| **W3** | Rapid-guessing / non-effort timing filter | High — quality multiplier for all calibration | `*_time_logs.duration` + `time_spent` | **have-now (recent-only)** — both confirm; **hard cap: post-Feb-2026 only** (migration dates verified twice) | S–M | 1 |
| **W4** | Confidence-keyed miskey & ambiguity detector | High — IRT-independent miskey catch for thin-N items | confidence enum vs. correctness | **have-now (coarse)** — both agree; same enum caveat as W1 | S | 1 |
| **W5** | Confidence-weighted targeted remediation queue | Med-high — reuses existing Targeted Quiz surface; uncopyable without confidence | W1 quadrants on existing surface | **derivable-now** — both agree; depends on W1 | M | 1 |

### TIER 2 — Foundational

| # | What it is | Value | Data need | Reconciled feasibility | Effort | Tier |
|---|---|---|---|---|---|---|
| **W6** ⭐ | Uneven-N calibration tiering (1PL default → 2PL where supported) | Keystone — prerequisite for W7/W11/W14/W16/W18/W19/W20/W22 | Exposure counts + correctness from response tables | **derivable-now** — both agree. **No persisted item params exist**; pure from-scratch build, nothing to validate against | L | 2 |
| **W7** | Rasch fit-statistic flagging (infit/outfit + point-biserial) | High — makes 20k+ items human-reviewable; cheapest keying detector | W6 outputs + per-option correctness | **derivable-now** — both agree (gemini calls effort S, codex M → **use M**); depends on W6 | M | 2 |
| **W8** | Distractor-misconception map → adaptive feedback | High — turns "is distractor functioning" into "what misconception" | W2 data + objective text for naming | **DISAGREEMENT → needs-new-capture (conservative).** Codex: derivable-now (uses existing objectives). Gemini: needs-new-capture (no misconception field). **Empirical layer derivable; named-misconception labels require net-new authoring/storage** | L | 2 |
| **W9** | Program/branch/instructor value-added (multilevel) | Very high — most distinctive institutional asset | Hierarchy FKs + `user_school_transfer_histories` | **have-now** — both agree; **conservative: transfer table lacks school columns + transfer date → time-correct membership is partial**. Outcome DV weak until W17 | L | 2 |
| **W10** | Incoming-ability adjustment layer (fair value-added) | High — non-negotiable companion to W9 | First-attempt proficiency via cross-bank `user_id` | **derivable-now** — both agree | M | 2 |
| **W11** | AI-item quality rubric & pre-screen gate | Very high — closes generate→vet→improve loop no prep shop has | Signals from W2/W3/W6/W7; write-back column | **derivable-now (signals) / needs-new-capture (write-back)** — both agree exactly. Persisting grades = new migration | L | 2 |
| **W12** | Knowledge-decay / forgetting curves by domain | High — genuine retention product (recert + NREMT prep) | `created_at` + retakes + domain tags | **derivable-now** — both agree | M–L | 2 |
| **W13** | Exit-exam cut-score validation | High — turns "you're ready" into a credentialed claim | Exit proficiency vs. `nremt_attempts.result` | **derivable-now (low-power now)** — both agree; bottlenecked by W17 N. Mind `RECYCLED ` trailing-space enum + no-FK match | M | 2 |
| **W14** | Cross-bank common-item linking & equating | High — one honest difficulty scale; seeds CAT pool | Shared anchor items / `origin_id` across banks | **derivable-now** — both agree; **conservative: shared anchors must be verified empirically**, not guaranteed by schema. Depends on W6 | L | 2 |
| **W15** | Cohort & state benchmarking reports | Very high — most directly sellable; #1 director ask | Hierarchy + `state_id` FKs | **derivable-now** — both agree; **"national" = internal-bank-relative, label honestly** | M | 2 |

### TIER 3 — Stretch

| # | What it is | Value | Data need | Reconciled feasibility | Effort | Tier |
|---|---|---|---|---|---|---|
| **W16** ⭐ | CAT engine for CE/CAPCE (EAP theta + max-info) | Headline gap — real adaptive test vs. today's random domain-mastery | Calibrated bank (W6) + live SE/exposure logging | **derivable-now (engine) / needs-new-capture (live logging)** — both agree. Hard-gated on W6; confidence-aware stop is needs-new-capture (no confidence on Adaptive) | L | 3 |
| **W17** ⭐ | NREMT outcome acquisition campaign (matched, consented) | Binding constraint — unlocks W13/W18/W19/W24 | External matched outcomes; thin `nremt_attempts` schema | **needs-NREMT-acquisition** — both agree. Operational/long-pole; **start day-one in parallel**. Grow N *and* fix schema (FK, attempt#, exam date, consent) | L | 3 (long pole) |
| **W18** | Pass-probability predictive model (parsimonious, N-honest) | Headline "evidence-based" asset | Logistic on exit + accuracy + calibration + exposure vs. `nremt_attempts.result` | **derivable-now (N-honest)** — both agree; CV intervals at N≈225, sharpens with W17. Confidence feature is coarse | M | 3 |
| **W19** | Individual learning-curve trajectories (theta-over-time) | High — "on pace / off pace for NREMT" | `user_exam_level_histories` + retakes | **derivable-now (theta-gated on W6)** — both agree | L | 3 |
| **W20** | Hierarchy-aware multilevel item difficulty (partial pooling) | High — principled fix for sparse per-item N | Partial pooling over hierarchy FKs + W6 | **derivable-now** — both agree; **same transfer-table limitation as W9**; heavy build | L | 3 |
| **W21** | Program-facing reporting dashboard (productized) | High — turns W9/W10/W15 into recurring sticky product | Outputs of W9/W10/W15 | **derivable-now (productize)** — both agree; engineering, no data blocker | L | 3 |
| **W22** | Program/state DIF screening (curricular, honest scope) | Med-high — content-alignment defect detector + credibility asset | MH/logistic DIF on program/branch/state/gender | **derivable-now (curricular) / needs-new-capture (protected-class)** — both agree. **Demographics = DOB + gender only**; protected-class DIF capture-limited. Depends on W6 | M | 3 |
| **W23** | Item exposure / aging / retirement ledger | Med — disposition home for flags; **CAT-security prereq for W16** | `COUNT(*)` over responses; drift across windows | **derivable-now** — both agree; persisting ledger may want a light new table | S–M | 3 |
| **W24** | Predictive-validity white paper | High — sales + CAPCE-accreditation asset at near-zero compute | Packages W18/W9 (AUC, sens/spec at cut) | **derivable-now (scales with W17)** — both agree; strength bounded by N≈225 until W17 | S–M | 3 |

**Where the two passes disagreed:** only **W8** produced a genuine verdict split (codex: derivable-now; gemini: needs-new-capture). Resolved **conservatively to needs-new-capture** — the empirical distractor layer is derivable, but the *named misconception labels* require net-new authoring and a place to store them. Elsewhere the passes differed only on effort sizing (W7) or wording of the same have-now/derivable verdict (W1, W2), not on direction.

---

## 3. Needs New Capture

These require a logging or schema change in `mededprep-c` (dev-team migration work). The **analysis is derivable today; only the persistence/runtime storage is missing.** Sequence the captures so the dev team batches them.

| Item | What to start capturing | Why |
|---|---|---|
| **W11** AI-item rubric gate | New columns/table in `questions` / `unit_exam_questions` to **write back** the computed quality grade + rubric tags + pre-publication gate flag | Read-side signals already derivable; the generate→vet→improve loop needs the score persisted so the generator can train against it. *(Also confirm where the ~10k AI items physically land — schema not yet verified.)* |
| **W16** CAT engine | **Live SE, theta, and exposure-count logging** columns in the Adaptive/CE runtime; plus per-item confidence capture if a confidence-aware stop is ever wanted | The selection engine is derivable from a calibrated bank, but a real adaptive test must log ability/SE/exposure as it runs. No such columns today. |
| **W16** confidence-aware stop | Add `confidence_level` capture to **Adaptive/EOPA** flows | Confidence exists only on quiz/sim/unit/exit. A confidence-aware stopping rule is impossible until Adaptive captures it. |
| **W23** retirement ledger | A lightweight **ledger table** for cumulative exposure, drift snapshots, and retire/revise/retain disposition | Core analysis derivable; a clean standing record wants its own table. This is the **safety prerequisite before W16 goes live** — overexposed/drifted items must be identifiable. |
| **W8** misconception map | A **misconception-label field** mapping distractor → named misconception (human/AI authored) | The empirical distractor data (W2) exists; the *named* misconception layer is net-new content + storage. (This is why W8 resolved to needs-new-capture.) |
| **W22** protected-class DIF | (Optional, sensitive) demographic capture beyond DOB + gender | Curricular DIF is doable now; protected-class fairness DIF is capture-limited and would need new, consented demographic fields. Recommend staying with the honest curricular framing rather than expanding capture. |

**Capture-hygiene note (affects W1/W4/W5/W18):** confidence IS continuous 1–100 (`confidence_level_range`) — corrected 2026-06-06. The only hygiene items: (a) absent on Simulator/EOPA/Adaptive, and (b) mandatory entry is **client-side-only**, so quantify and filter null/zero rows (`confidence_level_range > 0`) before reporting Brier curves.

---

## 4. Needs NREMT Acquisition

These items are analytically built today but **weak until Brad grows the matched-outcome N**. They all ride the same ~225 records. This ties directly to the **W17 collection campaign** — and the campaign is the single highest-leverage operational move in the whole plan.

| Item | What it delivers | How W17 sharpens it |
|---|---|---|
| **W17** | The campaign itself — Brad calls/emails the 239 programs to collect *individually-matched* NREMT pass/fail under a lightweight MOU/consent, growing N from ~225 toward 800–1,500 | This is the lever. The same calls warm the accounts we later sell reporting to. |
| **W13** Cut-score validation | The empirical "you're ready" threshold (sensitivity/specificity) | More outcomes tighten the cut and the confidence intervals |
| **W18** Pass-probability model | "Students at proficiency X passed at rate Y" | Each new matched outcome directly sharpens the model and narrows CV intervals |
| **W24** Validity white paper | The published "evidence-based" sales + CAPCE asset (AUC, sens/spec) | Persuasive power scales directly with N |
| **W9** Value-added (NREMT as DV) | Strongest version uses NREMT as the outcome variable | Runs on internal exit proficiency now; upgrades to NREMT-anchored as N grows |
| **W19** Learning-curve readiness date | "Projected NREMT-ready date" | Calibrating the readiness target against real outcomes needs the N |

**Design imperative both passes underline:** insist on **individual-matched** outcomes. Aggregate program pass rates are analytically far weaker. And **W17 should fix the schema, not just the count** — `nremt_attempts` today has `student_id` with no FK, no attempt number, no exam date, and a `RECYCLED ` enum with a trailing space. Add FK, attempt#, exam date, and a consent flag while building the pipeline.

---

## 5. Out of Scope / Not Feasible Here

**Neither feasibility pass found a single item that is outright NOT feasible.** The genuinely binding limits are *degradations*, not blockers. Listed here so expectations are set honestly and nobody over-promises:

| Constraint | One-line reason |
|---|---|
| ~~Continuous 0–100 confidence calibration~~ **(CORRECTED — this IS feasible)** | Originally listed not-feasible on the belief confidence was a 3-level enum. It is actually continuous 1–100 (`confidence_level_range`) on Quiz/Unit/Exit — see correction banner at top. The only real not-feasible confidence limit is **Simulator/EOPA/Adaptive**, which don't capture it. |
| **Confidence anything on EOPA / Adaptive** | Not feasible — confidence is simply not captured on those flows; any confidence-aware CAT stopping rule is blocked. |
| **Speededness filtering on the historical bank (pre-Feb-2026)** | Not feasible — timing tables only exist post-Feb-2026 (verified by migration dates in both passes); the historical bulk cannot be retroactively cleaned. |
| **Protected-class (race/ethnicity/language) fairness DIF** | Not feasible — demographics captured are DOB + gender only; expanding would require new sensitive capture. Stay with curricular DIF framing. |
| **True national/external norms in benchmarking (W15)** | Not feasible as "national" — only internal-bank-relative distributions exist; must be labeled honestly. |
| **Full 3PL / 50k-examinee methods** | Out of scope by mandate and by N — 1PL/2PL only; partial pooling (W20) is the principled answer to sparse N, not guessing-parameter models. |
| **Validating computed item stats against existing params** | No persisted difficulty/discrimination/IRT params exist anywhere (only an ad-hoc non-persisted calc) — everything is built from raw responses with nothing to check against. |

---

## 6. Suggested Summer Sequencing (~200 hours)

Maps the top bets onto Brad's summer. Two tracks run in parallel: an **operational long pole** (W17, mostly relationship/phone work) and an **analytical build** (everything else). The keystone (W6) gates most of Tier 2–3, so it lands early.

**Week 0 / Day 1 — kick off the long pole (ongoing, ~2–4 hrs/week background):**
- **W17 NREMT acquisition campaign.** Start calling/emailing programs immediately under a lightweight MOU. This has the longest lead time and unlocks W13/W18/W19/W24. Insist on individual-matched outcomes. Flag the `nremt_attempts` schema fixes to the dev team now.

**Weeks 1–3 — Tier 1 quick wins (no W6 dependency, ~40 hrs):**
- **W1** confidence calibration (coarse, bucketed) → **W4** confidence-keyed miskey detector → **W2** distractor/option-trace (raw selection rates).
- These three ship distinctive, demo-able value fast and need zero new capture. W5 (remediation queue) follows once W1 is solid.

**Weeks 3–6 — the keystone + its immediate children (~50 hrs):**
- **W6** uneven-N calibration tiering (1PL→2PL). Build this first in the foundational tier — it's the prerequisite for almost everything below.
- Then **W7** (fit + point-biserial flagging) and complete the ability-cut on **W2**.

**Weeks 6–9 — the sellable institutional layer (~50 hrs):**
- **W15** benchmarking reports (label "national" honestly) — the most directly sellable artifact, and the natural payload of the W17 calls.
- **W9 + W10 together** value-added with incoming-ability adjustment. Budget extra time for the partial transfer-history reconstruction. Run on internal exit proficiency now.
- **W13** cut-score validation at current N (low power, sharpens as W17 lands).

**Weeks 9–12 — evidence + closing the loop (~50 hrs):**
- **W18** pass-probability model (N-honest, CV intervals) → **W24** white paper draft under Brad's byline.
- **W11** AI-item rubric (read-side signals now; queue the write-back migration with the dev team).
- If time remains: **W23** retirement ledger (the safety prereq that must exist before any future W16 CAT work).

**Explicitly deferred past summer** (gated, heavy, or long-pole): **W16** CAT engine (needs W6 mature + new live-logging migration), **W12 / W19 / W20 / W21 / W22** (valuable but second-wave, several gated on W6 and on the transfer-history reconstruction). These become the natural fall roadmap once the foundation and the growing N are in place.

**One-line throughline:** *Ship the confidence + distractor quick wins now (they're uncopyable and need no new data), build the W6 calibration keystone early, stand up the sellable value-added/benchmarking layer, and let Brad's day-one NREMT campaign quietly compound under all of it.*
