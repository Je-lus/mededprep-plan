# CE Assessment-Only Model (Pathway 1)

**Product Specification — Pulse CE**
**Version:** 1.0
**Date:** 2026-05-21
**Status:** Ready for implementation upon CAPCE organizational accreditation

---

## 1. Overview

The Assessment-Only CE model is Pathway 1 in MedEdPrep's three-pathway continuing education architecture. It allows EMS professionals to earn CAPCE-accredited continuing education hours by completing an adaptive competency exam — no video lectures, no reading materials, no seat time watching content they already know.

CAPCE explicitly permits assessment-only CE. MedEdPrep's organizational accreditation grants self-accrediting authority: no per-activity review queue, no external approval delays. Assessment-only activities can launch within days of accreditation.

**Brand:** Pulse CE (by MedEdPrep)
**Platform:** Web application, responsive (desktop + mobile)

---

## 2. Why Assessment-Only CE

### For Experienced Providers

Veteran paramedics and EMTs are forced to sit through hours of lecture content they mastered years ago. Assessment-only CE respects their time: prove you know it, get your credit, move on. If the exam reveals gaps, targeted remediation fills them — not a one-size-fits-all lecture.

### For the Business

- **Launches within days of CAPCE accreditation.** No video production, no SME recording sessions, no post-production pipeline. The item bank and adaptive engine already exist.
- **Zero content production cost per activity.** Items are drawn from MedEdPrep's existing bank and generated via the question generation pipeline (ems-books-rag + qgen). SME review is the only per-activity cost.
- **No competitor offers this.** Across 40+ mapped CE providers, zero offer adaptive assessment-only CE. CE Solutions has a "test out" feature, but it is architecturally different (static, non-adaptive, no remediation loop).

### For the Market

- NREMT permanently removed online CE limits in 2023 — structural tailwind.
- NREMT is shifting toward competency-based recertification. Assessment-only CE positions MedEdPrep ahead of the regulatory curve.
- Assessment identifies specific gaps and proves learning occurred — this is measurable outcomes, not hours-watched.

---

## 3. CAPCE Compliance: Character Count Method

CAPCE determines CE hour credit for text-based and assessment-only activities using character count (confirmed directly with CAPCE representative, April 2026).

### Character Count Formula

| Threshold | CEH Awarded |
|-----------|-------------|
| ~7,500 characters (including spaces) | 0.5 CEH |
| ~15,000 characters | 1.0 CEH |

CEH is awarded in **0.5-hour increments** only.

### MedEdPrep Character Count Analysis

A 30-question assessment with full rationales produces approximately **20,700 characters**. This is calculated from:

- Average question stem: ~250 characters
- 4 answer options at ~80 characters each: ~320 characters
- Rationale/explanation: ~300 characters
- Per-question total: ~690 characters
- 30 questions x 690 = ~20,700 characters

**20,700 characters is 2.8x the 0.5 CEH minimum (7,500).** Assessment-only CE does not merely meet the character count requirement — it substantially exceeds it.

For the actual activity formats:

| Activity Format | Questions | Est. Characters | CEH Awarded | Character Surplus |
|----------------|-----------|-----------------|-------------|-------------------|
| Quick (0.5 CEH) | 15-20 | ~10,350-13,800 | 0.5 CEH | 1.4x-1.8x minimum |
| Full (1.0 CEH) | 45 | ~31,050 | 1.0 CEH | 2.1x minimum |

Character counts must be documented per activity and available for CAPCE audit.

---

## 4. User Flow

### 4.1 Discovery and Purchase

```
Browse CE Catalog
  → Filter by topic, CEH amount, format (0.5 or 1.0), NCCP domain
  → View activity detail page (topic, objectives, CEH, standards mapped, format)
  → Purchase (individual B2C or pre-enrolled via agency B2B)
  → Activity added to learner's dashboard
```

### 4.2 Pre-Assessment

```
Select activity from dashboard
  → Review learning objectives and mapped standards
  → Confirm readiness (cannot pause and resume mid-exam — see Timer Enforcement)
  → System initiates timer and adaptive engine
```

### 4.3 Adaptive Exam

```
Question presented (one at a time, no skipping, no going back)
  → Learner selects answer
  → IF CORRECT:
      → Brief confirmation + rationale displayed
      → Next question selected by adaptive engine (difficulty adjusts)
  → IF INCORRECT:
      → Remediation loop triggered (see Section 5)
  → Repeat until question count met
```

### 4.4 Completion and Certification

```
All questions answered
  → Score calculated
  → IF SCORE >= 70%:
      → PASS
      → Certificate generated immediately
      → CAPCE auto-reported (activity number, CEH, completion date)
      → NREMT record updated via CAPCE integration
      → Diagnostic report available (performance by domain, objective, standard)
  → IF SCORE < 70%:
      → FAIL
      → Fail path triggered (see Section 7)
```

---

## 5. Adaptive Remediation Loop

This is MedEdPrep's novel mechanic. No EMS CE provider has implemented this. It is grounded in testing effect research and immediate corrective feedback literature.

### Trigger

Learner answers a question incorrectly.

### Sequence

1. **Incorrect answer flagged.** The system displays the correct answer.
2. **Forced rationale reading.** The full explanation is displayed. The learner cannot advance until they have spent a minimum dwell time on the rationale (enforced, not honor-system). Minimum dwell time is calibrated to character count at ~200 words per minute reading speed.
3. **Follow-up verification question.** A similar (not identical) question covering the same concept is presented. This question tests whether the learner absorbed the rationale.
4. **Continue exam regardless of follow-up result.** The follow-up question is formative, not summative. It does not count toward the pass/fail score. It exists to reinforce learning at the moment of the mistake.

### CAPCE Compliance Note

The remediation loop is framed as **educational content** (formative), not assessment (summative). Formative items are unrestricted under CAPCE rules. The follow-up question is a learning tool, not a scored test item.

### Character Count Impact

Each remediation cycle adds approximately 600-900 characters (rationale + follow-up question + follow-up rationale). For a learner who triggers remediation on 10 questions, that adds ~6,000-9,000 characters to the activity — further exceeding the character count threshold.

---

## 6. Timer Enforcement

CAPCE requires that learners spend the allotted time for the awarded CEH. The system must enforce this.

### Rules

| CEH | Minimum Time Required |
|-----|----------------------|
| 0.5 CEH | 30 minutes |
| 1.0 CEH | 60 minutes |

### Implementation

- **Timer starts** when the learner begins the assessment (after confirming readiness).
- **Timer is visible** to the learner at all times (countdown or elapsed, configurable).
- **Timer is server-side.** Client-side display is cosmetic; the authoritative timer runs on the server. No client-side manipulation can bypass it.
- **Early completion blocked.** If a learner finishes all questions before the minimum time, the system holds the result screen. The learner sees a message: "You've completed all questions. Your results will be available in [remaining time]. Use this time to review flagged rationales." The system surfaces rationales from incorrectly-answered questions for optional review during the hold period.
- **No pause/resume.** Once started, the timer runs continuously. Learners must commit the time block. This is a CAPCE requirement, not a design choice.
- **Timeout.** If the session exceeds 2x the minimum time (e.g., 60 minutes for a 0.5 CEH activity), the system auto-submits with questions answered so far scored and unanswered questions marked incorrect.
- **Timer logged.** Start time, end time, and total elapsed time are stored per attempt for audit purposes.

### Expected Pacing

At ~1 minute per question (question reading + answer selection + rationale review), plus additional time for remediation loops:

- **0.5 CEH (15-20 questions):** Natural completion in 20-30 minutes. Learners who answer many questions correctly may hit the 30-minute floor. This is expected and acceptable — the hold period with rationale review is a genuine learning opportunity.
- **1.0 CEH (45 questions):** Natural completion in 50-70 minutes. Most learners will exceed the 60-minute minimum organically.

---

## 7. Adaptive Question Selection

### Algorithm

Questions are selected using Item Response Theory (IRT) to match difficulty to the learner's demonstrated ability level.

### Selection Logic

1. **Initial questions** are drawn from a calibrated starting difficulty (medium).
2. After each response, the system updates its estimate of the learner's ability (theta).
3. The next question is selected to provide **maximum information** at the current theta estimate — questions that are too easy or too hard for the learner are skipped.
4. All selected questions must map to the activity's stated learning objectives.
5. Questions are drawn from a pool large enough that no two attempts present the same question set.

### Question Counts by Format

| Format | Scored Questions | Remediation Follow-ups (est.) | Total Questions Presented |
|--------|-----------------|-------------------------------|--------------------------|
| 0.5 CEH | 15-20 | 5-8 (if ~30% incorrect) | 20-28 |
| 1.0 CEH | 45 | 12-18 (if ~30% incorrect) | 57-63 |

Remediation follow-up questions are formative and do not count toward the scored total.

### Question Types

All six question types supported by the MedEdPrep engine:

- Multiple Choice (MCQ) — single best answer
- Multiple Select (MSQ) — select all that apply
- Matrix — table-based matching
- Ranking — drag-and-drop ordering
- Yes/No — binary judgment
- Dropdown — select from list

Technology-Enhanced Items (TEIs) align with NREMT's 2025 exam redesign, which introduced TEIs at all certification levels.

### IRT Calibration Note

IRT parameters must be calibrated from CE-specific response data, not test prep student data. Student responses and provider responses represent different populations with different ability distributions. Initial launch will use classical test theory metrics from the existing item bank. IRT calibration begins after the first 500 CE-specific responses per item are collected.

---

## 8. Fail Path

### Trigger

Learner scores below 70% on the summative assessment.

### Sequence

1. **Score displayed** with diagnostic breakdown by domain, objective, and mapped standard.
2. **Specific gaps identified.** The diagnostic report highlights exactly which competency areas fell below threshold. This is not a generic "you failed" — it is a targeted gap analysis.
3. **Pathway 2 required.** The learner must complete the corresponding Pathway 2 content resources (video or reading material covering the same topic) before retaking the assessment. This is enforced by the system — the retake button is locked until Pathway 2 completion is recorded.
4. **Retake available.** After completing Pathway 2, the learner can retake the Pathway 1 assessment. The retake uses **different questions** drawn from the same objective-mapped pool. Unlimited retakes are permitted.
5. **No additional charge for retakes.** The learner has already purchased the activity. Retakes and the required Pathway 2 content are included.

### Rationale

Failing the assessment means the learner has demonstrable gaps that cannot be closed by assessment alone. Forcing Pathway 2 completion ensures the learner engages with educational content before attempting again. This is pedagogically sound and CAPCE-compliant — the learner is not simply re-guessing until they pass.

---

## 9. Standards Mapping

Every assessment-only CE activity maps to four national standards frameworks. This is Richard's four-standard mapping — no competitor maps to all four.

| Standard | Full Name | Purpose |
|----------|-----------|---------|
| NES | National Education Standards | Defines what EMS education programs must teach |
| NSOP | National Scope of Practice | Defines what each certification level can legally do |
| NMG | National Model Guidelines | Clinical practice guidelines for EMS |
| NCCP | National Continued Competency Program | NREMT recertification requirements |

### Per-Activity Requirements

Each activity must document:

- **NCCP domain(s):** Which recertification category the activity fulfills (required for NREMT auto-reporting)
- **NES alignment:** Which education standards the content maps to
- **NSOP scope:** Which certification level(s) the activity is appropriate for
- **NMG reference:** Which clinical guidelines are assessed
- **Learning objectives:** 3-5 measurable objectives per activity, mapped to specific items in the question pool

---

## 10. Certificate Specification

Upon passing (score >= 70%), a certificate is generated immediately as a downloadable PDF.

### Required Fields

| Field | Source |
|-------|--------|
| Learner full name | Account profile |
| Activity title | Activity metadata |
| CAPCE activity number | Assigned during activity creation (self-accredited) |
| CEH earned | 0.5 or 1.0 |
| NCCP domain(s) | Activity metadata |
| Completion date | Server timestamp at score calculation |
| Provider name | MedEdPrep / Pulse CE |
| Learning objectives met | Activity metadata (3-5 per activity) |
| Certificate number | Unique, sequential, stored in database |
| QR verification code | Links to verification endpoint for employer/agency validation |

### Auto-Reporting

- Completion data is transmitted to CAPCE via their activity reporting integration API.
- CAPCE propagates the record to NREMT.
- The learner does not need to manually enter CE hours for NREMT recertification.
- Reporting is real-time (or near-real-time, depending on CAPCE API batch windows).
- The CAPCE reporting integration endpoint is not available until organizational accreditation is finalized — build the wrapper now, wire the endpoint after approval.

### Verification

Employers and agencies can verify any certificate by:

1. Scanning the QR code on the certificate PDF
2. Entering the certificate number at a public verification URL
3. Viewing the CE transcript in the agency admin dashboard (for B2B enrolled learners)

---

## 11. Content Production Requirements

### Per-Activity Checklist

Before an assessment-only CE activity can be published:

- [ ] **Topic defined** with clear clinical scope (e.g., "Pediatric Respiratory Emergencies," not "Pediatrics")
- [ ] **3-5 measurable learning objectives** written and reviewed by SME
- [ ] **Four-standard mapping** completed (NES, NSOP, NMG, NCCP)
- [ ] **Question pool assembled** — minimum 3x the scored question count (e.g., 60+ items for a 20-question activity) to support retakes with different questions
- [ ] **All items map to stated learning objectives** — every question must align to at least one objective
- [ ] **Rationales written** for every question (correct answer explanation + why each distractor is wrong)
- [ ] **Remediation follow-up questions** authored for each item (similar concept, different question)
- [ ] **Character count documented** and exceeds threshold (7,500 for 0.5 CEH, 15,000 for 1.0 CEH)
- [ ] **SME review completed** — at minimum one subject matter expert with relevant credentials has reviewed all items and rationales
- [ ] **Conflict of interest disclosures** filed for all contributors (SMEs, authors, reviewers) — CAPCE requirement
- [ ] **Activity metadata populated** — title, description, CAPCE activity number, NCCP domain, target certification level(s), CEH, format
- [ ] **Internal QA passed** — activity tested end-to-end by non-author (timer, scoring, certificate generation, adaptive selection)

### Production Timeline

With an existing item bank and SME availability, a single 0.5 CEH activity can be produced in **1-3 days**:

| Task | Time |
|------|------|
| Define topic + objectives | 2-4 hours |
| Assemble question pool from existing bank + write remediation items | 4-8 hours |
| SME review | 2-4 hours |
| Conflict of interest disclosures | 30 minutes |
| QA testing | 1-2 hours |
| Publish | Immediate (self-accredited) |

Compare this to Pathway 2 (video-based CE), which requires scripting, recording, editing, and post-production — a timeline measured in weeks, not days.

---

## 12. Diagnostic Report

Every completed assessment (pass or fail) generates a diagnostic report. This is the product's core differentiator and the "aha moment" that drives word-of-mouth and agency adoption.

### Report Contents

- **Overall score** with pass/fail determination
- **Performance by learning objective** — percentage correct per objective
- **Performance by NCCP domain** — maps directly to recertification requirements
- **Performance by NES standard** — identifies education gaps
- **Confidence analysis** (if confidence tagging is enabled) — identifies high-confidence incorrect answers (dangerous knowledge gaps) and low-confidence correct answers (uncertain knowledge)
- **Time analysis** — average time per question, flagging rushed answers (<15 seconds) and prolonged deliberation (>120 seconds)
- **Remediation summary** — which concepts triggered the remediation loop, and whether follow-up questions were answered correctly
- **Comparison to peer cohort** (anonymized) — percentile ranking within the activity's completers

### Agency Value

For B2B agency enrollment, diagnostic data aggregates to the agency admin dashboard:

- Which providers have gaps in which domains
- Department-wide competency heat maps
- Targeted training recommendations based on actual assessment data, not self-reported confidence
- Compliance tracking (who has completed required CE, who is due)

---

## 13. Revenue Model

### Pricing Structure

| Channel | Model | Price Point | Notes |
|---------|-------|-------------|-------|
| B2C Individual | Per-activity purchase | $5-15 per 0.5 CEH, $10-25 per 1.0 CEH | Competitive with the $35-72/yr "good enough" tier when buying a la carte |
| B2C Bundle | Annual subscription | $49-99/year | Unlimited access to assessment-only CE catalog |
| B2B Agency | Per-seat enrollment | $30-60/seat/year | Bulk pricing with agency admin dashboard, compliance tracking, diagnostic reporting |
| B2B Agency | Per-activity assignment | $3-8/seat/activity | For agencies that want specific topics without full subscription |

### Unit Economics (Per 0.5 CEH Activity Completion)

| Line Item | Cost |
|-----------|------|
| CAPCE certification fee | $0.31 |
| Server/infrastructure (marginal) | ~$0.01 |
| SME review (amortized across completions) | ~$0.10-0.50 (volume dependent) |
| Item bank maintenance | ~$0.05 |
| **Total COGS per completion** | **~$0.47-0.87** |

At a $10 B2C price point per 0.5 CEH activity, gross margin is approximately 91-95%. At B2B per-seat pricing, margins are lower but volume is higher and stickier.

### Competitive Positioning

Do not compete on price. The $35-72/yr "good enough" providers sell hours. Pulse CE sells competency validation, gap identification, and diagnostic data. The value proposition is:

- **For individuals:** "Earn your CE by proving what you know, not watching what you already learned."
- **For agencies:** "See exactly where your providers are strong and where they need work — backed by data, not guesswork."

---

## 14. Technical Requirements

### Systems Involved

| System | Role |
|--------|------|
| Adaptive Engine | Question selection via IRT, theta estimation, item pool management |
| Item Bank | Question storage, metadata, objective mapping, rationale content |
| Timer Service | Server-side timer enforcement, minimum time tracking |
| Certificate Generator | PDF generation with QR code (pdf-lib, matching existing mededprep-ce pattern) |
| CAPCE Reporting Wrapper | API integration for auto-reporting completions (endpoint wired post-accreditation) |
| Diagnostic Engine | Score calculation, domain/objective/standard breakdown, peer comparison |
| Payment System | Stripe integration for B2C purchases; agency enrollment management for B2B |
| Learner Dashboard | Activity catalog, progress tracking, certificate access, CE transcript |
| Agency Admin Dashboard | Roster management, assignment, compliance tracking, aggregate diagnostics |

### Data Model (Key Entities)

```
Activity
  - id, title, description, topic
  - ceh_amount (0.5 | 1.0)
  - capce_activity_number
  - nccp_domains[]
  - learning_objectives[]
  - nes_standards[], nsop_scope[], nmg_references[]
  - question_pool_id
  - min_score_percent (70)
  - min_time_seconds (1800 for 0.5 CEH, 3600 for 1.0 CEH)
  - max_time_seconds (2x min_time)
  - scored_question_count (15-20 or 45)
  - status (draft | active | archived)
  - sme_reviewer_ids[]
  - conflict_of_interest_disclosures[]
  - character_count
  - created_at, updated_at

Attempt
  - id, activity_id, learner_id
  - started_at, completed_at
  - elapsed_seconds
  - score_percent
  - passed (boolean)
  - question_sequence[] (ordered list of presented question IDs)
  - responses[] (question_id, selected_answer, correct, time_spent_seconds)
  - remediation_events[] (trigger_question_id, followup_question_id, followup_correct)
  - theta_estimate (final IRT ability estimate)
  - certificate_id (null if failed)
  - capce_reported (boolean)
  - capce_reported_at

Certificate
  - id, certificate_number, certificate_hash
  - attempt_id, learner_id, activity_id
  - ceh_earned, completion_date
  - capce_activity_number
  - nccp_domains[], learning_objectives[]
  - pdf_url, qr_code_url
  - verification_url
  - created_at

DiagnosticReport
  - id, attempt_id
  - score_by_objective[] (objective_id, questions_presented, questions_correct, percent)
  - score_by_nccp_domain[] (domain, questions_presented, questions_correct, percent)
  - score_by_nes_standard[] (standard, questions_presented, questions_correct, percent)
  - remediation_summary[] (concept, triggered, followup_correct)
  - time_analysis (avg_time, rushed_count, prolonged_count)
  - peer_percentile
  - generated_at
```

### API Endpoints (Core)

```
GET    /api/ce/catalog                    — Browse available activities
GET    /api/ce/catalog/:id                — Activity detail
POST   /api/ce/attempts                   — Start an attempt (initiates timer)
GET    /api/ce/attempts/:id/next-question — Get next adaptive question
POST   /api/ce/attempts/:id/respond       — Submit answer, receive feedback + next action
GET    /api/ce/attempts/:id/result        — Get score and pass/fail (blocked until timer met)
GET    /api/ce/attempts/:id/diagnostic    — Get diagnostic report
GET    /api/ce/certificates/:id           — Download certificate PDF
GET    /api/ce/certificates/:id/verify    — Public verification endpoint
GET    /api/ce/transcript                 — Learner's full CE transcript
POST   /api/ce/capce/report               — Internal: batch-report completions to CAPCE
```

---

## 15. Launch Sequence

### Phase 1: Pre-Accreditation (Now)

- [ ] Build the adaptive assessment player (question presentation, remediation loop, scoring)
- [ ] Build timer enforcement service (server-side)
- [ ] Build certificate generator (PDF with QR code)
- [ ] Build CAPCE reporting wrapper (API client, ready to wire endpoint)
- [ ] Build diagnostic report engine
- [ ] Assemble first 5 activity question pools from existing item bank
- [ ] SME review first 5 activities
- [ ] Build activity catalog and purchase flow
- [ ] QA end-to-end flow

### Phase 2: Accreditation Day (Day 0)

- [ ] Wire CAPCE reporting endpoint
- [ ] Assign CAPCE activity numbers to first 5 activities
- [ ] File conflict of interest disclosures
- [ ] Document character counts
- [ ] Publish first 5 activities
- [ ] Announce to existing MedEdPrep user base and Pulse players

### Phase 3: First 30 Days

- [ ] Monitor completion data, timer compliance, certificate generation
- [ ] Collect learner feedback
- [ ] Publish 5-10 additional activities (targeting high-demand NCCP domains)
- [ ] Begin IRT calibration data collection (500 responses per item target)
- [ ] Activate agency B2B enrollment for first partner agencies

### Phase 4: First 90 Days

- [ ] 20+ activities in catalog
- [ ] IRT calibration complete for initial item pools — switch from classical to adaptive selection
- [ ] Agency admin dashboard live with aggregate diagnostics
- [ ] Peer comparison percentiles active (sufficient N for meaningful comparison)
- [ ] Pathway 2 content production underway for fail-path remediation

---

## 16. Content Priority

First activities should target the highest-demand NCCP recertification domains and Georgia-specific requirements:

1. **Pediatric emergencies** — Georgia requires 8 hours of pediatric CE
2. **Cardiovascular emergencies** — highest volume clinical domain
3. **Airway management and ventilation** — critical skills, high failure rates
4. **Trauma assessment** — maps to NREMT's Primary Assessment emphasis
5. **Pharmacology updates** — frequent protocol changes drive recertification need

Each topic should be offered in both 0.5 CEH (narrow scope, on-shift friendly) and 1.0 CEH (comprehensive) formats.

---

## 17. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| CAPCE accreditation delayed | Low | High | All development proceeds in parallel; no dependency on accreditation except publishing and CAPCE activity numbers |
| Learners game the timer (walk away) | Medium | Low | Remediation loop and rationale dwell time make passive waiting less efficient than genuine engagement; activity timeout at 2x minimum prevents indefinite sessions |
| Item pool exhaustion on retakes | Low | Medium | Minimum 3x question pool ensures different questions per attempt; item generation pipeline (ems-books-rag + qgen) can expand pools on demand |
| IRT calibration insufficient at launch | Expected | Low | Launch with classical test theory; IRT calibration is an enhancement, not a requirement. Classical metrics from the existing 1.55M response dataset provide adequate initial difficulty estimates |
| Price resistance ("I can get CE for $35/year") | Medium | Medium | Compete on value, not price. Diagnostic reports, adaptive difficulty, and remediation loop are features no $35 provider offers. Agency B2B channel is less price-sensitive than individual B2C |
| CAPCE rule changes | Low | High | Maintain direct relationship with Jay Scott at CAPCE; participate in NEMSAC advisory process; design system to be adaptable to changing requirements |

---

## 18. Success Metrics

| Metric | Target (First 90 Days) |
|--------|----------------------|
| Activities published | 20+ |
| Individual completions | 500+ |
| Pass rate (first attempt) | 60-80% (indicates appropriate difficulty) |
| Average completion time (0.5 CEH) | 25-35 minutes |
| Certificate generation success rate | 100% |
| CAPCE auto-reporting success rate | 100% |
| Learner satisfaction (post-completion survey) | 4.0+/5.0 |
| Agency accounts activated | 3+ |
| Fail-path conversion (complete Pathway 2 + retake + pass) | 70%+ |

---

## Appendix A: CAPCE Compliance Checklist

For each published assessment-only CE activity:

- [ ] Learning objectives defined and mapped to content
- [ ] Character count documented and exceeds CEH threshold
- [ ] Summative assessment with 70% passing standard
- [ ] Timer tracking enforced (server-side, auditable)
- [ ] SME review documented with reviewer credentials
- [ ] Conflict of interest disclosures on file for all contributors
- [ ] CAPCE activity number assigned
- [ ] NCCP domain mapping documented
- [ ] Auto-reporting integration tested
- [ ] Certificate contains all required fields
- [ ] Activity accessible to learners (ADA compliance for web content)

## Appendix B: Glossary

| Term | Definition |
|------|-----------|
| **CEH** | Continuing Education Hour. The unit of CE credit. |
| **CAPCE** | Commission on Accreditation for Pre-Hospital Continuing Education. The accrediting body for EMS CE. |
| **NCCP** | National Continued Competency Program. NREMT's recertification framework. |
| **NREMT** | National Registry of Emergency Medical Technicians. The national certification body. |
| **IRT** | Item Response Theory. Statistical framework for adaptive testing. |
| **Theta** | The IRT ability estimate for a learner. Higher theta = higher demonstrated ability. |
| **Pathway 1** | Assessment-only CE (this document). |
| **Pathway 2** | Content-based CE (video/reading + post-test). |
| **Pathway 3** | Combined CE (Pathway 1 + Pathway 2, in any order). |
| **Remediation Loop** | MedEdPrep's novel mechanic: wrong answer triggers forced rationale reading + follow-up verification question. |
| **TEI** | Technology-Enhanced Item. Non-traditional question formats (drag-and-drop, matrix, ranking, etc.). |
| **NES** | National Education Standards. |
| **NSOP** | National Scope of Practice. |
| **NMG** | National Model Guidelines. |
