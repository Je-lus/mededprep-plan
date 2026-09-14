# CE Initiative — Month-by-Month Milestone Plan

**Platform:** Pulse CE by MedEdPrep
**Clock starts:** Day of CAPCE organizational accreditation confirmation
**Duration:** 12 months from accreditation
**Status:** Original operational plan
**Owner:** Jeramey (execution lead), Richard (CE content lead), Gene (CAPCE compliance)

> **Note:** This original plan does NOT include the assessment-only track (Pathway 1), which was added later via Richard's three-pathway model. See `ce-two-track-timeline.md` for the updated parallel-track view.

---

## Month 1: Foundation

**Goal:** Confirm accreditation, stand up core infrastructure, begin content production.

### Accreditation & Compliance
- [ ] CAPCE organizational accreditation confirmed — self-accrediting authority active
- [ ] Wire CAPCE activity reporting endpoint (API wrapper already built; connect live endpoint)
- [ ] Assign CAPCE activity numbers to first 5 CE course topics
- [ ] File conflict of interest disclosures for all SMEs (Richard, Samantha, Gene, Dr. Tim Thomas, Heather)

### Platform Engineering
- [ ] Certificate generation system live (PDF via pdf-lib, QR code verification, all required fields per CAPCE spec)
- [ ] Timer enforcement system live (server-side authoritative clock, 30-min minimum for 0.5 CEH, 60-min for 1.0 CEH)
- [ ] CAPCE auto-reporting integration tested end-to-end with live endpoint
- [ ] Adaptive assessment player functional (question presentation, scoring, remediation loop)

### Content Production
- [ ] First 3-5 CE course topics selected and assigned to SMEs:
  - **#2 AHA Guidelines Update** (Richard + Dr. Tim Thomas) — free lead magnet, top priority
  - **#1 Pediatric Respiratory & Airway** (Samantha + Dr. Tim Thomas) — Georgia 8-hr peds mandate
  - **#3 STEMI & 12-Lead ECG** (Gene + Dr. Tim Thomas) — cardiovascular, highest paramedic demand
- [ ] SME contracts executed (recording schedule, deliverable expectations, CAPCE disclosure obligations)
- [ ] Content production kickoff: learning objectives drafted, four-standard mapping started (NES, NSOP, NMG, NCCP)
- [ ] Question pools assembled from existing 10.6K item bank for first 3 topics (minimum 3x scored question count per activity)
- [ ] Sydney begins editing AHA Guidelines content concurrent with recording

### Market Preparation
- [ ] Georgia market targeting begins — identify first 10 agencies for outreach via Richard and Dr. Tim Thomas relationships
- [ ] Landing page or catalog preview live on Pulse CE domain
- [ ] Email announcement drafted for existing MedEdPrep program base (100+ programs)

### Milestone Gate
**CAPCE approval is the trigger. Nothing publishes without it. Everything builds in parallel so Day 1 post-approval is not Day 1 of work.**

---

## Month 2: First Courses in Production

**Goal:** Content pipeline running, platform UI complete, payment integration live.

### Content Production
- [ ] AHA Guidelines free course recorded, edited, and in QA
- [ ] Pediatric Respiratory & Airway modules 1-2 recorded (Samantha)
- [ ] STEMI & 12-Lead modules 1-3 recorded (Gene)
- [ ] Rationales written for all knowledge check and post-test items in first 3 topics
- [ ] Remediation follow-up questions authored for each item (similar concept, different question)
- [ ] Character counts documented per activity and verified against CAPCE thresholds (7,500 chars = 0.5 CEH)

### Platform Engineering
- [ ] Course catalog UI live (browse, filter by topic/NCCP domain/cert level/CEH format)
- [ ] Enrollment and progress tracking functional (learner dashboard shows status per activity)
- [ ] Payment integration live (Stripe B2C — individual purchase flow, checkout session, webhook handler)
- [ ] Promo code / coupon support configured for launch promotions

### Marketing & Sales
- [ ] Announce CE platform to existing MedEdPrep program base via email
- [ ] AHA Guidelines free course positioned as lead magnet in all communications
- [ ] Georgia agency warm outreach begins (Richard + Dr. Tim Thomas personal network)
- [ ] Social media tease campaign — "Free AHA Guidelines CE coming soon"

### Team
- [ ] Heather full-time and ramping on operational topics (#8 Resilience, #14 EMS Operations)
- [ ] Parallel recording schedule active: 2 SMEs recording on different topics same week

---

## Month 3: Launch

**Goal:** First paid courses live. Free lead magnet live. Revenue begins.

### Courses Published
- [ ] **AHA Guidelines Update — FREE** (2.0 CEH) — permanent free lead magnet, live Week 1
  - Cost per free completion: ~$0.33 (CAPCE cert fee $0.31 + infrastructure $0.02)
  - Target: 500 free completions in first 60 days
- [ ] **Pediatric Respiratory & Airway** (2.0 CEH, 4 x 0.5 CEH modules) — first paid course
- [ ] **STEMI & 12-Lead ECG** (3.0 CEH, 6 x 0.5 CEH modules) — first 3 of 6 modules live
- [ ] Georgia pediatric mandate coverage: 2.0 CEH toward 8-hr requirement
- [ ] Georgia cardiovascular mandate coverage: 2.0+ CEH toward 4-hr requirement

### Platform Features
- [ ] Student/provider dashboard with CE transcript (completed activities, certificates, CEH totals by NCCP domain)
- [ ] CAPCE auto-reporting tested and live — completions flow to CAPCE, propagate to NREMT
- [ ] Certificate PDF download with QR verification functional for all published activities
- [ ] Diagnostic report generated on every completion (performance by objective, NCCP domain, NES standard)

### Data Collection
- [ ] Begin collecting CE-specific response data for IRT recalibration (CE provider population differs from test prep student population)
- [ ] Response data pipeline: every item response logged with timing, theta estimate, remediation events
- [ ] Target: first 100 CE-specific responses per item in high-traffic activities

### Marketing
- [ ] Launch announcement email to full MedEdPrep contact list
- [ ] "Free AHA CE" promoted across LinkedIn, EMS Facebook groups, partner channels
- [ ] First rotating free module announced (Month 2 rotation: Behavioral Emergencies, 1 module)

### Revenue
- [ ] First paid transactions processed
- [ ] Pricing live: $5 per 0.5 CEH module (B2C individual)

---

## Month 4: Growth Begins

**Goal:** Catalog hits 10+ CEH. Agency conversations start. Diagnostic data proves value.

### Courses Published (Cumulative: ~15 CEH in catalog)
- [ ] STEMI & 12-Lead remaining 3 modules live (cumulative 3.0 CEH cardiovascular)
- [ ] **#4 Stroke Recognition** (2.0 CEH) published
- [ ] **#5 Prehospital Sepsis** (2.0 CEH) published — module (d) counts toward pediatric mandate
- [ ] **#6 Trauma Assessment & Hemorrhage** (2.0 CEH) published — Georgia trauma mandate coverage begins

### Platform Features
- [ ] Diagnostic reports refined based on first 30 days of learner feedback
- [ ] Spaced retrieval (Daily Check) integration: completed CE courses seed the retrieval queue
- [ ] Course completion analytics dashboard (internal): completion rates, pass rates, average scores, time distribution

### Business Development
- [ ] Agency outreach active: present CE platform + diagnostic data to first 5 Georgia agencies
- [ ] Prepare agency pilot proposal (bulk seat pricing, admin dashboard preview, compliance value prop)
- [ ] Collect testimonials from first 50 individual completers

### Data & Analytics
- [ ] Course completion rate tracking by activity and pathway
- [ ] First pass rate analysis: target 60-80% first-attempt pass rate (indicates appropriate difficulty)
- [ ] Average completion time analysis per CEH format (0.5 CEH target: 25-35 min)

---

## Month 5: Catalog Depth

**Goal:** Georgia mandates fully covered. 20+ CEH in catalog. Agency pilot contracts in negotiation.

### Courses Published (Cumulative: ~21 CEH in catalog)
- [ ] **#7 Behavioral Emergencies** (2.0 CEH) — highest provider demand topic
- [ ] **#9 Pediatric Medical Emergencies** (2.0 CEH) — Georgia peds mandate continues
- [ ] **#13 Pediatric Trauma** (2.0 CEH) — double-counts: Georgia peds + trauma mandates

### Georgia Mandate Status
- [ ] **Pediatric:** 8+ CEH available (Courses #1, #5d, #9, #13 + pediatric content in other courses) — **MANDATE MET**
- [ ] **Cardiovascular:** 7+ CEH available (Courses #2, #3, #4) — **MANDATE EXCEEDED**
- [ ] **Trauma:** 4+ CEH available (Courses #6, #13) — **MANDATE MET**

### Business Development
- [ ] First agency pilot contracts in negotiation (target: 3 agencies, Georgia-based)
- [ ] B2B pricing proposal finalized for pilot: $30-60/seat/year or $3-8/seat/activity
- [ ] Agency value prop deck complete — built around diagnostic data, not just compliance

### Data & Analytics
- [ ] First 500 CE-specific responses collected for highest-traffic items → IRT recalibration trigger
- [ ] Classical-to-IRT transition plan: items meeting 500-response threshold switch to IRT-based adaptive selection
- [ ] Remediation loop effectiveness analysis: are follow-up questions answered correctly at higher rates?

---

## Month 6: Agency Pilot

**Goal:** First agency contracts signed. Agency admin dashboard MVP. B2B revenue begins.

### Courses Published (Cumulative: ~27 CEH in catalog)
- [ ] **#8 Provider Resilience & Burnout** (2.0 CEH) — Operations domain, emotional hook
- [ ] **#10 Obstetric Emergencies** (2.0 CEH) — massive competency gap topic
- [ ] **#11 Pharmacology — High-Risk Medications** (2.0 CEH) — module (d) counts toward peds

### Agency Infrastructure
- [ ] Agency bulk enrollment system live (admin creates roster, purchases seats, assigns activities)
- [ ] Agency admin dashboard MVP:
  - Provider roster with completion status per course
  - Progress tracking (not started / in progress / completed / overdue)
  - Deadline management (due dates on assignments)
  - Basic aggregate pass rates and completion metrics
- [ ] First agency pilot contracts signed (target: 3 agencies)
- [ ] Agency providers receiving invitations and completing first assignments

### Decision Gate
**3 agency contracts → prioritize agency dashboard features for Month 7-8 iteration. Fewer than 3 → continue B2C focus, revisit agency strategy.**

### NCCP Coverage
- [ ] NCCP domain coverage expanding — target 50% of National Component hours available
- [ ] Provider can fulfill 15+ CEH from catalog (meaningful portion of recertification cycle)

### Revenue Tracking
- [ ] B2C individual enrollment count tracked weekly
- [ ] B2B agency seat revenue tracked separately
- [ ] CAPCE certification fee costs tracked ($0.31 per completion) against revenue

---

## Month 7: Scale Infrastructure

**Goal:** 30+ CEH in catalog. Agency dashboard iteration. Content pipeline at full velocity.

### Courses Published (Cumulative: ~31 CEH in catalog)
- [ ] **#12 Geriatric Emergencies** (2.0 CEH) — aging population, high call volume
- [ ] **#14 EMS Operations & Crew Resource Management** (2.0 CEH) — NCCP Operations hours

### Agency Dashboard Iteration
- [ ] Agency analytics: provider-level diagnostic data (which domains are weak across roster)
- [ ] Agency compliance reporting: exportable CSV/PDF compliance status per provider
- [ ] Assignment management: agency admin assigns required courses with deadlines
- [ ] Aggregate diagnostic heatmaps: department-wide competency view

### Content Pipeline
- [ ] Production pipeline running at 8-10 modules per month (steady state)
- [ ] 3+ recording days per week utilized
- [ ] Sydney editing 3-4 modules per week
- [ ] Review cycle bottleneck addressed: Gene + Richard QA throughput scaled via batch review

### Platform
- [ ] IRT calibration active for items with 500+ CE responses — adaptive difficulty improves
- [ ] Peer comparison percentiles active in diagnostic reports (sufficient N for meaningful comparison)
- [ ] CAPCE reporting fully automated — zero manual intervention for standard completions

---

## Month 8: B2B Pricing & Pipeline

**Goal:** B2B pricing finalized. Conference circuit engagement. 35+ CEH in catalog.

### Courses Published (Cumulative: ~36 CEH in catalog)
- [ ] **#15 Advanced Airway Management** (2.0 CEH) — Airway domain depth
- [ ] **#16 Cardiac Arrest & Post-ROSC Care** (2.0 CEH) — cardiovascular depth
- [ ] Additional modules from Tier 2/3 topics in production

### Business Development
- [ ] B2B pricing finalized based on pilot feedback:
  - Per-seat annual: $50-100/seat (full catalog access)
  - Per-activity: $3-8/seat/activity (a la carte)
  - Enterprise/custom: negotiated for 50+ seat agencies
- [ ] Agency pilot feedback collected and synthesized — iterate dashboard and workflow
- [ ] New agency pipeline: 5+ agencies in active sales conversation

### Marketing & Conferences
- [ ] Conference circuit engagement: NAEMSE, state EMS conferences (Georgia, adjacent states)
- [ ] Conference presentation or booth showcasing diagnostic CE data
- [ ] Collect conference leads for agency pipeline
- [ ] Case study from pilot agencies: "Before/after" competency data

### Platform
- [ ] Annual subscription model (B2C) evaluated based on usage data
- [ ] Referral program designed: provider-to-provider referral incentive

---

## Month 9: Full NCCP Coverage

**Goal:** Complete National Component coverage. Georgia fully covered. Comprehensive recertification solution.

### Courses Published (Cumulative: 39+ CEH in catalog)
- [ ] **#17 Toxicology & Overdose** (2.0 CEH) — opioid crisis relevance
- [ ] **#18 Environmental Emergencies** (1.5 CEH) — Georgia heat illness relevance
- [ ] **#19 QI & Evidence-Based Practice** (1.5 CEH) — Operations domain completion
- [ ] **#20 Community Paramedicine** (1.5 CEH) — forward-looking career content

### Coverage Milestone
- [ ] **Full NCCP National Component coverage achieved:**
  - Airway: 4.0 CEH (133% of Paramedic requirement)
  - Cardiovascular: 9.0 CEH (200% of requirement)
  - Trauma: 4.0 CEH (133% of requirement)
  - Medical: 16.5 CEH (367% of requirement)
  - Operations: 5.5 CEH (183% of requirement)
  - Total: 39+ CEH across 78+ individually accredited modules
- [ ] Georgia state requirements fully covered (peds 8+, cardiovascular 4+, trauma 4+)
- [ ] Marketing claim validated: "One platform for your entire recertification"

### Agency Analytics
- [ ] Agency analytics and compliance reporting refined from 3+ months of pilot data
- [ ] Department-wide competency reporting: identify system-level training needs
- [ ] Targeted training recommendations generated from diagnostic data

### Provider Features
- [ ] Referral program for providers launched
- [ ] CE transcript covers all NCCP domains — exportable for recertification documentation
- [ ] Daily Check (spaced retrieval) pool covers all completed topics

---

## Month 10: Demand Spike Preparation

**Goal:** Prepare for December/January recertification rush. Expand content team capacity.

### Operations
- [ ] December/January CE demand spike preparation:
  - Server capacity reviewed and scaled
  - CAPCE auto-reporting throughput tested at 10x current volume
  - Certificate generation queue load-tested
  - Customer support capacity planned for spike
- [ ] Content pipeline continues: additional modules, updated content for guideline changes
- [ ] Quality audit: review all published activities for accuracy, currency, learner feedback

### Business Development
- [ ] Additional certification level content scoping: AEMT-specific courses, Paramedic-specific depth
- [ ] State expansion research: identify 3 target states beyond Georgia (states where Heather/Richard have connections)
- [ ] Agency pipeline health: 10+ agencies in conversation, 5+ signed

### Revenue Analysis
- [ ] Revenue tracking: B2C vs B2B split, average revenue per provider, LTV projections
- [ ] CAPCE fee analysis: $0.31/cert costs vs revenue — validate unit economics
- [ ] Pricing optimization: is $5/0.5 CEH optimal? Data-driven pricing review

---

## Month 11: Recertification Season

**Goal:** Capture demand spike. Revenue milestone. Prove the model.

### Demand Spike Execution
- [ ] Recertification season marketing: "Complete your CE before your deadline" campaign
- [ ] Targeted outreach to providers with approaching recertification deadlines
- [ ] Agency urgency: training officers assigning required CE before cycle end
- [ ] Free rotating module aligned with high-demand topic for maximum acquisition

### Revenue Milestones
- [ ] Track against revenue targets (set in Month 6 based on first-half performance)
- [ ] B2B agency revenue: contracted seats × completion rate × per-seat price
- [ ] B2C individual revenue: enrollment volume × average transaction size
- [ ] Free lead magnet conversion rate: % of free AHA completers who purchase paid courses

### Platform Performance
- [ ] System uptime during demand spike: 99.9% target
- [ ] CAPCE auto-reporting latency: same-day reporting maintained under load
- [ ] Certificate generation: sub-5-second PDF generation maintained
- [ ] Support ticket volume and resolution time tracked

---

## Month 12: Maturity & Year 2 Planning

**Goal:** Stabilize operations. Plan Year 2 expansion. Strategic assessment.

### Year 1 Retrospective
- [ ] Full 12-month metrics review:
  - Total courses published (target: 20 topics, 78+ modules, 39+ CEH)
  - Total individual enrollments
  - Total agency contracts signed
  - Course completion rates by topic and pathway
  - Pass rates (first attempt and overall)
  - CAPCE reporting accuracy (target: 100%)
  - Revenue (B2C + B2B)
  - Georgia market penetration (% of Georgia EMS providers who have used platform)
  - Customer satisfaction (NPS or equivalent)

### Year 2 Planning
- [ ] **State partnerships:** Joe House (Kansas, NASEMSO), adjacent states, state-level adoption proposals
- [ ] **Additional state requirements:** Map state-specific CE mandates beyond Georgia for top 5 target states
- [ ] **Content expansion:** AEMT-specific courses, Paramedic-specific advanced content, protocol updates
- [ ] **Company C certification integration:** Year 2 target per psychometric analysis plan
- [ ] **Advanced analytics:** Program-level diagnostic data products for agencies, aggregated competency reports for state EMS offices
- [ ] **Pathway 2 content depth:** Video production pipeline at scale for combined pathway offerings
- [ ] **Subscription model:** Annual subscription pricing based on 12 months of usage data and willingness-to-pay signals

### Operations
- [ ] Content team expansion decision: hire additional SMEs based on demand and production bottleneck analysis
- [ ] Technology investment: IRT recalibration infrastructure, advanced adaptive engine, variable-length exams
- [ ] Agency dashboard v2 scoping based on 6+ months of agency feedback
- [ ] Partnership development: EMS conferences, state offices, educational program integrations

---

## Key Decision Gates

| Gate | Trigger | Action |
|------|---------|--------|
| **CAPCE approval** | Accreditation confirmed | Everything goes live. Publishing begins immediately. |
| **First 500 CE responses** | Item-level response threshold met | IRT recalibration begins for items meeting threshold. Switch from classical to adaptive selection. |
| **3 agency contracts** | Third agency pilot signed | Prioritize agency dashboard features. Shift engineering resources to B2B. |
| **Revenue threshold** | Monthly revenue covers content team costs | Expand content team: hire additional SMEs, increase production velocity. |
| **Georgia saturation** | 20%+ of Georgia EMS providers have used platform | Begin state expansion. Replicate Georgia playbook in next target state. |
| **Demand spike** | December/January recertification season | Scale infrastructure, increase marketing spend, prepare support capacity. |

---

## Success Metrics

### Leading Indicators (Monthly Tracking)

| Metric | Month 3 Target | Month 6 Target | Month 9 Target | Month 12 Target |
|--------|---------------|----------------|----------------|-----------------|
| Courses published (topics) | 3 | 11 | 20 | 20+ |
| CEH in catalog | 7.0 | 27.0 | 39.0 | 39.0+ |
| Free AHA completions | 200 | 1,500 | 3,500 | 5,000 |
| Paid individual enrollments | 50 | 500 | 1,500 | 3,000 |
| Agency contracts signed | 0 | 3 | 5 | 10 |
| Agency provider seats active | 0 | 100 | 300 | 750 |

### Quality Metrics (Ongoing)

| Metric | Target | Notes |
|--------|--------|-------|
| First-attempt pass rate | 60-80% | Below 60% = too hard. Above 80% = too easy. |
| Course completion rate | 85%+ | Enrolled → completed (excluding abandoned within 24 hrs) |
| CAPCE reporting accuracy | 100% | Every passing completion reported to CAPCE successfully |
| Average completion time (0.5 CEH) | 25-35 min | Natural pacing with remediation loop |
| Certificate generation success | 100% | Every pass generates a valid, downloadable certificate |
| Learner satisfaction | 4.0+/5.0 | Post-completion survey |
| Diagnostic report usefulness (agency) | 4.0+/5.0 | Agency admin feedback |

### Revenue Metrics (Monthly after Month 3)

| Metric | Description |
|--------|-------------|
| B2C revenue | Individual enrollment revenue (Stripe transactions) |
| B2B revenue | Agency seat purchases and per-activity revenue |
| COGS per completion | CAPCE fee ($0.31) + infrastructure + amortized SME review |
| Gross margin per completion | Revenue minus COGS — target 85%+ at B2C, 70%+ at B2B |
| Free lead magnet conversion | % of free AHA completers who make a paid purchase within 90 days |
| LTV per provider | Average revenue per provider over 12 months |

---

## Team Responsibilities

| Person | Role | Primary Months | Focus |
|--------|------|---------------|-------|
| **Jeramey** | Execution lead, platform engineering, pricing | All | Overall program management, platform build, business decisions |
| **Richard** | CE content lead, four-standard mapping, agency relationships | All | Content quality, standard alignment, Georgia agency outreach |
| **Gene** | CAPCE compliance, program director, QA | All | CAPCE documentation, activity review, compliance audit |
| **Dr. Tim Thomas** | Medical director | All (review) | Clinical accuracy review, medical director sign-off, agency credibility |
| **Samantha** | SME — critical care, pediatric | Months 1-6 | Peds airway, sepsis, peds medical, OB, peds trauma, toxicology |
| **Gene** | SME — cardiology, airway, pharmacology | Months 1-8 | STEMI/12-Lead, adult airway, cardiac arrest, pharmacology |
| **Heather** | SME — operations, special populations (full-time) | Months 2-12 | Resilience, geriatric, EMS ops, QI, community paramedicine |
| **Sydney** | Video editor | All | Post-production from Day 1, concurrent editing with recording |

---

## Content Production Velocity

| Period | Modules/Month | Bottleneck | Notes |
|--------|--------------|------------|-------|
| Months 1-2 | 4-6 | SME onboarding, first pipeline run | Learning curve on four-standard mapping, CAPCE documentation |
| Months 3-4 | 6-8 | Review cycle (Gene + Richard QA) | Pipeline established, parallel recording active |
| Months 5-6 | 8-10 | Editing throughput (Sydney) | Steady state, multiple SMEs recording in parallel |
| Months 7-12 | 8-10 (maintenance) | Topic selection for updates | Full catalog built; shift to updates, new topics, guideline refreshes |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| CAPCE accreditation delayed | Low | High | All development proceeds in parallel. No dependency except publishing and CAPCE activity numbers. |
| Low initial adoption | Medium | Medium | Free AHA lead magnet guarantees top-of-funnel. Georgia relationships provide warm agency pipeline. |
| Agency sales cycle longer than expected | Medium | Medium | Continue B2C focus. Agency revenue is gravy on top of individual enrollment revenue. |
| Content production bottleneck (Gene QA) | Medium | Medium | Batch review process. Cross-train Richard on CAPCE compliance documentation. |
| Competitor copies assessment-only model | Low (Year 1) | Low | MedEdPrep's IRT engine, item bank calibration, and four-standard mapping are 12-18 months ahead. |
| CAPCE rule changes | Low | High | Maintain relationship with Jay Scott at CAPCE. Design system for adaptability. |
| IRT calibration insufficient at launch | Expected | Low | Launch with classical test theory metrics from existing 1.55M responses. IRT is an enhancement, not a requirement. |
| Provider price resistance ($5/module vs $35/year competitors) | Medium | Medium | Compete on value (diagnostic data, adaptive difficulty, remediation loop), not price. Agency channel is less price-sensitive. |

---

## Appendix: Georgia Market First-Mover Advantage

Georgia is the launch market because of converging advantages:

1. **MedEdPrep is Georgia-based.** Local credibility matters in EMS.
2. **Richard and Dr. Tim Thomas have direct Georgia agency relationships.** Warm introductions, not cold outreach.
3. **Georgia Trauma Commission relationship already exists.** MedEdPrep serves GTC through the existing mededprep-ce platform.
4. **Local competitor (GA EMS Academy) is weak.** Not CAPCE-accredited, 2007-era website, state-approved only.
5. **Georgia mandates create urgency.** 8 hrs pediatric, 4 hrs cardiovascular, 4 hrs trauma — providers must get these hours.
6. **Georgia accepts NREMT/NCCP recertification.** No separate state CE approval process needed.

Once Georgia proves the model, expand to states where the team has connections and where mandates create similar urgency.
