# Competitor Deep Dive: Platinum Educational Group / EMSTesting

**Date:** 2026-05-21
**Classification:** Internal competitive intelligence -- not for external distribution
**Status:** Regenerated (original lost in gh-pages incident; rebuilt from internal research files + training knowledge)

---

## Company Overview

### The Company

Platinum Educational Group is a privately held educational technology company headquartered in Jenison, Michigan (Grand Rapids metro area). Founded in 2002 by CEO Kris Kazmierczak, the company has built a 24-year track record serving EMS, fire, nursing, and allied health education programs. The company employs approximately 25 people.

Platinum operates three major product brands:

1. **EMSTesting** -- instructor exam bank and assessment platform for EMS programs
2. **Platinum Planner** -- clinical scheduling, attendance tracking, and competency management
3. **AccredAssist** -- CoAEMSP accreditation compliance and self-study report tooling

The company also offers products for fire science (FireTesting) and nursing education, though EMS remains their core market.

### Market Position

Platinum is the strongest independent EMS education technology company in the United States. Unlike Jones & Bartlett/Fisdap (owned by Ascend Learning) or Brady/MyLab (owned by Pearson), Platinum is not a subsidiary of a textbook publisher or PE-backed education conglomerate. This independence is both a strength (EMS-focused decision-making, no portfolio neglect) and a vulnerability (limited capital for R&D, no content ecosystem lock-in).

Platinum's relationship with Pearson is worth noting: some Pearson EMS programs bundle or recommend EMSTesting alongside Brady textbooks. Pearson's EMS "adaptive testing" offering is reportedly Platinum's product resold through the Pearson channel. This makes a future Pearson acquisition of Platinum a credible scenario to monitor.

**Key statistics (estimated):**
- ~25 employees
- Founded 2002 (24-year head start over MedEdPrep)
- Serves hundreds of EMS programs nationally
- Deep instructor adoption -- many program directors learned on EMSTesting and default to it
- CAPCE accredited for workshops/conferences (announced Nov 2025) -- but NOT for CE delivery

---

## Product Suite

### EMSTesting (Core Product)

EMSTesting is Platinum's flagship product and MedEdPrep's most direct competitor for the instructor-facing testing market.

**Core capabilities:**

| Feature | Description |
|---------|-------------|
| Exam Bank | Large pre-validated question bank covering EMR, EMT, AEMT, and Paramedic levels |
| Custom Test Builder | Instructors build unlimited tests by selecting questions from the bank, filtering by topic, difficulty, and question type |
| Custom Question Creation | Instructors can author their own questions and mix them with bank items |
| Validated Final Exams | Pre-built comprehensive exams validated against NREMT exam content areas |
| Online Testing | Students take exams online with timed sessions, randomized question order, and randomized answer choices |
| Score Reports | Detailed score breakdowns by content area after exam completion |
| Admissions/Entrance Testing | Standardized entrance exams for program admissions ($5/student) |
| "CAT" (Computer Adaptive Testing) | Marketed as adaptive -- but see analysis below |

**What instructors see day-to-day:**

1. Log in to EMSTesting admin dashboard
2. Select questions from the bank (filter by topic, level, Bloom's taxonomy, etc.)
3. Build a quiz or unit exam -- drag and drop questions, set time limits
4. Assign to a section/cohort with a testing window
5. Students log in, take the exam within the window
6. Instructor views score reports: class average, per-student breakdown, per-content-area breakdown
7. Download or print reports for accreditation documentation

**The instructor workflow is familiar, low-friction, and purpose-built for EMS.** This is Platinum's biggest asset. Program directors who have used EMSTesting for years know exactly how to build an exam in 10 minutes. The workflow is not flashy, but it works.

### Platinum Planner (Clinical Scheduling)

A clinical rotation scheduling and management platform. Separate product from EMSTesting but shares the Platinum account ecosystem.

| Feature | Description |
|---------|-------------|
| Clinical Scheduling | Assign students to clinical sites, shifts, and preceptors |
| Attendance Tracking | Log student attendance at clinical rotations (no GPS verification) |
| Skills Tracking | Document student skill performance during clinicals |
| Evaluations | Preceptor and student evaluation forms |
| Reporting | Hours tracking, site utilization reports |

**Pricing model:** Free for schools; students pay per-student fees. This is a smart distribution strategy -- removes the budget approval barrier for program directors.

**Weaknesses vs. MedEdPrep Scheduler (planned):**

| Pain Point | Platinum Planner | MedEdPrep Opportunity |
|-----------|-----------------|----------------------|
| Mobile UX | Adequate but not mobile-first | Mobile-first, 44px touch targets |
| GPS verification | Attendance tracking only (no GPS) | GPS + photo as core feature |
| Oversight views | Not available (no resource/Gantt) | Custom implementation at no extra cost |
| Gradebook integration | Standalone | Native MedEdPrep gradebook feed |
| Modern UI | Adequate | shadcn/ui + Tailwind, consistent ecosystem |
| Site manager role | Not available | Full scoped portal (planned) |

### AccredAssist (Accreditation Compliance)

An add-on for programs seeking or maintaining CoAEMSP accreditation. Available through Platinum Planner and EMSTesting subscriptions.

| Feature | Description |
|---------|-------------|
| Self-Study Report Builder | Imports cohort data into CoAEMSP report templates |
| Document Management | Drag-and-drop file uploads organized by CoAEMSP standards |
| Appendix G Excel Export | Generates Student Minimum Competency (SMC) matrix format |
| Year-Round Readiness | Keeps programs audit-ready continuously |
| Integration | Seamless with Platinum Planner scheduling and EMSTesting |

**Key limitation:** Only available to Platinum customers. Programs using Fisdap or another testing vendor cannot access AccredAssist standalone. This lock-in is both Platinum's retention strategy and its vulnerability -- it creates resentment among programs that want the accreditation tools but don't want to switch their entire testing stack.

---

## Pricing Model

Platinum uses a hybrid institutional + per-student pricing model.

### EMSTesting Pricing (Verified)

| Component | Price |
|-----------|-------|
| School subscription (Full Access) | $500/year |
| Student access -- EMR level | $26/student |
| Student access -- EMT level | Estimated $30-50/student |
| Student access -- Paramedic level | Estimated $50-105/student |
| Admissions/entrance testing | $5/student |
| AccredAssist add-on | Not publicly listed (requires quote; verified at ~$475) |

**Total cost per program (estimated):** A paramedic program with 30 students might pay:
- $500 school subscription
- $1,500-3,150 student fees (30 x $50-105)
- $475 AccredAssist
- **Total: ~$2,475-4,125/year**

### MedEdPrep Pricing Comparison

MedEdPrep charges $26/student (flat across all levels) with no school subscription fee. A comparable 30-student paramedic program would pay ~$780/year. That is a 3-5x cost advantage.

From the one-year plan: *"MedEdPrep is already cheaper than Platinum ($26 vs $105/student) and not textbook-locked like J&B/Pearson. Price is already an advantage."*

---

## The "CAT" Question

Platinum markets a "Computer Adaptive Testing" capability. This claim requires careful analysis.

**What Platinum appears to have:**
- Classical Test Theory (CTT) metrics: P-values (item difficulty), KR-20 (reliability), point-biserial (item discrimination)
- Score reports broken down by content area
- Possibly some form of variable-length or difficulty-adjusted test delivery

**What Platinum does NOT appear to have:**
- Published Item Response Theory (IRT) parameters (no 1PL, 2PL, or 3PL model documentation)
- True theta estimation (no maximum likelihood or Bayesian ability estimation during the exam)
- Adaptive item selection based on real-time ability estimation
- Psychometric validation studies or published technical manuals

**The litmus test (from one-year plan):** *"Ask them what IRT model they use. If they can't say '2PL' or '3PL,' it's not IRT."*

Platinum's "CAT" is most likely:
1. A variable-length exam that stops when a student has clearly passed or failed (sequential probability testing, not IRT-CAT)
2. Or simply the ability to select questions by difficulty level when building tests
3. Or a marketing term applied to their online testing delivery (i.e., "testing on a computer" = "computer adaptive testing")

This is a critical competitive intelligence point. True IRT-based Computer Adaptive Testing requires:
- A calibrated item bank with estimated discrimination (a), difficulty (b), and guessing (c) parameters
- A theta estimation algorithm that updates after every response
- An item selection algorithm that picks the most informative next item given current theta
- A stopping rule based on standard error of measurement

MedEdPrep's adaptive engine is live in production. Whether Platinum's "CAT" is real adaptive testing or CTT-based testing marketed as adaptive is one of the most important questions in the competitive landscape.

---

## Strengths (What Makes Platinum Dangerous)

### 1. Deep Instructor Adoption and Muscle Memory

This is Platinum's most formidable competitive advantage. Many EMS program directors have used EMSTesting for 10+ years. They know how to build exams in their sleep. Switching costs are not just technical -- they are habitual. An instructor who can build a unit exam in 10 minutes on EMSTesting is not excited about learning a new platform, regardless of how much better it might be.

### 2. Purpose-Built for EMS Instructors

EMSTesting was designed from day one for EMS education. Every feature, every workflow, every report is built for the specific needs of EMS program directors. This isn't a generic LMS or test-bank system adapted for EMS -- it's native to the market.

### 3. Large Pre-Validated Question Bank

Platinum's exam bank has been curated over 20+ years with input from EMS educators nationally. Instructors trust the questions. The bank is mapped to NREMT content areas. While MedEdPrep's bank is larger (10,600+ items vs. estimated ~5,000 for Platinum -- the one-year plan states "twice their bank"), Platinum's bank has decades of instructor familiarity.

### 4. Ecosystem Breadth

EMSTesting + Platinum Planner + AccredAssist creates a three-product ecosystem that covers testing, clinicals, and accreditation. Programs that adopt all three get integrated data flow. This stickiness is real -- switching testing means losing AccredAssist, which means manual accreditation tracking.

### 5. Established Relationships and Distribution

Platinum attends every major EMS education conference. They have existing relationships with program directors, state EMS offices, and textbook publishers. Their Pearson distribution channel puts their products in front of programs adopting Brady textbooks. These relationships took 24 years to build.

### 6. Free-for-Schools Platinum Planner Model

By making Platinum Planner free for schools and charging students, Platinum removes the biggest adoption barrier: budget approval. Program directors don't need to request funding -- they just tell students to buy access. This is an underrated distribution strategy.

---

## Weaknesses (Where Platinum Is Vulnerable)

### 1. No Adaptive Testing (Real IRT-Based CAT)

Despite marketing claims, Platinum has no published evidence of IRT-based adaptive testing. Their metrics are CTT-based (P-values, KR-20, point-biserial). This means:
- Every student gets the same (or randomly selected) questions regardless of ability
- No real-time ability estimation during an exam
- No measurement precision optimization
- No diagnostic theta-based feedback

MedEdPrep's adaptive engine, while currently using domain-percentage allocation with random pool selection (not full IRT-CAT yet), is architecturally ahead and has the data foundation (1.55M calibrated responses) to move to true IRT-CAT.

### 2. No Student-Facing Study Tools

EMSTesting is institutional-only. Students cannot:
- Purchase access independently (no B2C channel)
- See correct answers after exams ("Platinum's KB explicitly states this. Students call it 'a freaking joke.'")
- Study with flashcards, practice modes, or spaced repetition
- Access diagnostic reports on their own performance
- Track their own NREMT readiness

This is a structural gap, not a feature gap. Platinum's entire business model is B2B (sell to institutions). Building a B2C channel would require rethinking their pricing model, instructor relationships, and platform architecture. It is unlikely they will do this.

### 3. Limited Analytics Beyond Score Reports

Platinum provides score breakdowns by content area. They do NOT provide:
- Multi-dimensional diagnostic reports (by cognitive level, by competency domain, by NREMT objective)
- Confidence/metacognition data
- Learning velocity tracking
- Comparative performance against national norms
- Predictive NREMT readiness scoring
- Item-level analytics with distractor analysis available to instructors in real-time

MedEdPrep's `getPerformanceAnalytics()` generates timing analysis, stamina patterns, confidence quadrants, streak analysis, and domain breakdowns. This diagnostic depth is the "aha moment" that drives instructor conversion.

### 4. No Classroom Engagement Features

Platinum has no equivalent to Pulse. There is no:
- Live classroom game mode
- Real-time competitive review sessions
- Gamification (XP, streaks, leaderboards, achievements)
- Student engagement tracking between classes
- Instructor dashboard showing who's studying outside class

The engagement gap is significant because it means Platinum is invisible between exam days. MedEdPrep/Pulse is present in every class session and every study session.

### 5. No Compliance/Accreditation Tool for Non-Customers

AccredAssist requires a Platinum subscription. Programs using Fisdap, MedEdPrep, or any other testing platform cannot access it. CoAssist (MedEdPrep's accreditation tool) is free, standalone, and works with any testing platform. This is a wedge strategy: programs can adopt CoAssist without switching their testing, then discover MedEdPrep's testing from within the ecosystem.

AccredAssist pricing ($475 add-on) vs. CoAssist (free) is a clean sales line.

### 6. No CE Delivery Platform

Platinum received CAPCE accreditation in November 2025, but explicitly for workshops and conferences -- NOT for online CE delivery. They cannot:
- Deliver CAPCE-accredited continuing education online
- Offer adaptive CE assessments
- Provide diagnostic CE competency reports
- Serve the agency/B2B CE market

MedEdPrep is building the only adaptive/psychometric CE platform in the entire EMS market.

### 7. Aging Technology Stack

While not publicly documented in detail, Platinum's platform shows signs of a mature codebase:
- User interface is functional but not modern (not a contemporary SPA framework)
- No evidence of real-time features (WebSocket, live updates)
- Reports are static, not interactive/filterable
- No public API or integration endpoints

---

## How Instructors Use EMSTesting Day-to-Day

Understanding the daily workflow is critical for displacement strategy.

**Typical instructor workflow:**

1. **Semester setup:** Create a new class/section, add student roster (often manual entry or CSV)
2. **Unit exam creation:** Open the exam builder, filter bank by chapter/topic/content area, select 25-50 questions, set time limit (60-90 min), assign to class with a testing window (e.g., available Monday 8am - Wednesday 11:59pm)
3. **Students take exam:** Students log in during the window, take the timed exam. Questions are randomized. Answer choices are randomized. One attempt unless instructor allows retakes.
4. **Review results:** Instructor views class score report. Sees average score, score distribution, per-content-area breakdown. Identifies which content areas the class struggled with.
5. **Midterm/final exams:** Use Platinum's pre-validated comprehensive exams or build custom comprehensive exams from the bank
6. **Accreditation documentation:** Export score reports for CoAEMSP annual reporting. If using AccredAssist, cohort data flows into report templates automatically.
7. **Admissions testing:** Some programs use Platinum's entrance exam ($5/student) to screen applicants

**What instructors value most:**
- Speed: "I can build an exam in 10 minutes"
- Trust: "These questions are validated"
- Simplicity: "It just works"
- Familiarity: "I've used this for 8 years"

**What instructors complain about:**
- Students can't review what they got wrong (by design -- to protect the question bank)
- Limited visibility into why students are struggling (score reports show what, not why)
- No student study tools (students have to find third-party prep tools)
- AccredAssist costs extra on top of an already expensive platform
- No modern UX refinements

---

## How MedEdPrep Differentiates

### Head-to-Head Comparison

| Dimension | Platinum/EMSTesting | MedEdPrep |
|-----------|-------------------|-----------|
| **Adaptive testing** | CTT-based; markets as "CAT" but no published IRT | Adaptive engine live in production; domain-based with IRT infrastructure building |
| **Item bank size** | Estimated ~5,000 items | 10,600+ items, 1.55M responses |
| **Diagnostic reporting** | Score breakdown by content area | Multi-dimensional: domain, cognitive level, confidence, timing, stamina, streaks |
| **Student-facing tools** | None (institutional only) | Full B2C platform: practice exams, flashcards, diagnostic reports, readiness tracking |
| **Classroom engagement** | None | Pulse: live games, leaderboards, XP, streaks, flashcards, study tracking |
| **Accreditation compliance** | AccredAssist ($475, requires subscription) | CoAssist (free, standalone, works with any testing) |
| **CE delivery** | Workshops/conferences only (CAPCE Nov 2025) | Building only adaptive CE platform in EMS |
| **Confidence/metacognition** | Not captured | 1M+ responses tagged High/Medium/Low confidence |
| **Psychometric depth** | CTT (P-values, KR-20, point-biserial) | CTT + IRT pipeline, bifactor model planned |
| **Pricing** | $500 school + $26-105/student + $475 AccredAssist | $26/student flat, no school fee, CoAssist free |
| **B2C channel** | None | Students buy individually |
| **Technology** | Mature, functional, not modern | Modern stack, real-time capable, API-first |

### MedEdPrep's Structural Advantages

**1. Data moat:** 10,600+ items with 1.55M calibrated responses. This data enables IRT parameter estimation, difficulty calibration, and diagnostic precision that Platinum cannot replicate without years of equivalent response data.

**2. Dual-channel (B2B + B2C):** MedEdPrep sells to both institutions and individual students. Platinum is B2B only. This means MedEdPrep can grow revenue from students even at programs that haven't adopted MedEdPrep institutionally.

**3. Full-stack ownership:** MedEdPrep owns 15 codebases across the entire EMS education value chain -- test prep, CE, compliance, clinicals, engagement, governance. Platinum has three products (testing, scheduling, accreditation). MedEdPrep's ecosystem is deeper and wider.

**4. Psychometric expertise:** The founder has psychometric expertise in IRT, classical test theory, and adaptive testing. Platinum was built by EMS educators, not psychometricians. This difference shows in the assessment architecture.

**5. Engagement layer:** Pulse fills the gap between exam days. While Platinum is invisible between testing events, Pulse keeps students and instructors engaged daily. This creates data, habit, and switching cost that Platinum has no answer for.

---

## What It Would Take for Platinum to Close the Gap

### Could they build adaptive testing?
**Difficulty: Very High. Timeline: 18-36 months minimum.**

True IRT-based adaptive testing requires:
- Hiring psychometric expertise (or contracting with companies like Caveon, ETC, or Alpine Testing)
- Calibrating their entire item bank with IRT parameters (requires large response datasets per item, typically 500+ responses)
- Building theta estimation and item selection algorithms
- Validating the adaptive engine against fixed-form equivalents
- Rebuilding their exam delivery platform to support real-time adaptation

Platinum's likely response: improve marketing around their existing "CAT" rather than building real IRT. Cheaper, faster, and most instructors can't tell the difference.

### Could they build a B2C student platform?
**Difficulty: Very High. Timeline: 12-24 months.**

This would require:
- Rethinking the question bank access model (currently, students cannot see correct answers)
- Building a payment system for individual students
- Creating study tools (flashcards, practice modes, spaced repetition)
- Marketing directly to students (entirely new channel)
- Potentially alienating instructors who control question bank access

Platinum's entire value proposition is built on instructor control. Opening the platform to students undermines that premise. **This is structurally unlikely.**

### Could they build classroom engagement features?
**Difficulty: High. Timeline: 12-18 months.**

Building a Pulse competitor would require:
- Real-time WebSocket infrastructure
- Game design and gamification expertise
- Mobile-optimized UX
- An entirely new product category for a 25-person company

Platinum could acquire or partner (e.g., integrating with a generic classroom engagement tool), but EMS-specific game content is not something off-the-shelf tools provide.

### Could they make AccredAssist free?
**Difficulty: Medium. Timeline: 1-3 months.**

This is Platinum's most likely competitive response. If CoAssist gains traction, Platinum could drop AccredAssist pricing to zero to eliminate MedEdPrep's wedge. However:
- AccredAssist still requires a Platinum subscription (it's not standalone)
- Making it free erodes revenue without addressing the standalone gap
- Programs using other testing platforms still can't access it

### Could they build real diagnostic reporting?
**Difficulty: Medium. Timeline: 6-12 months.**

Platinum already has the data to build better reports. They could add:
- Per-objective breakdowns (not just content area)
- Cognitive level analysis (if questions are tagged by Bloom's)
- Trend tracking across multiple exams
- Comparative analytics

This is the most actionable improvement Platinum could make. However, without IRT parameters and confidence data, their reports would still be shallower than MedEdPrep's.

### Most Likely Platinum Response (Near-Term)

1. **Claim "real IRT" more aggressively** in marketing materials (low cost, fast)
2. **Improve score reports** with more granular breakdowns (moderate effort, meaningful)
3. **Consider making AccredAssist free** if CoAssist gains visible traction
4. **Double down on instructor relationships** at conferences and through state EMS offices
5. **Explore Pearson partnership deepening** (or formal acquisition)

What Platinum is **unlikely** to do in the next 12-18 months:
- Build a student-facing platform
- Ship real IRT-based adaptive testing
- Build classroom engagement features
- Launch online CE delivery
- Open a B2C sales channel

---

## Strategic Implications

### This Is the Competitor Most Likely to Be Displaced

Platinum occupies exactly the market position MedEdPrep is targeting: the instructor-facing exam bank for EMS programs. Unlike Pearson (too large to care about EMS) or Fisdap/Ascend (bundled with J&B textbooks and clinical tracking), Platinum's core business is directly in MedEdPrep's crosshairs.

### The Displacement Strategy

**Phase 1 -- Wedge (Now through Q3 2026):**
Don't ask programs to drop Platinum overnight. Use two wedge strategies:
1. **CoAssist (free):** Programs adopt CoAssist for accreditation compliance without changing their testing vendor. Once inside the ecosystem, they discover MedEdPrep's testing capabilities.
2. **B2C student adoption:** Students buy MedEdPrep individually even if their program uses Platinum. Students compare the diagnostic reporting and study tools with Platinum's "you can't see your answers" approach. Students advocate to instructors.

**Phase 2 -- Parallel Pilot (Q3-Q4 2026):**
*"Run us alongside Platinum for one cohort."* Programs try MedEdPrep for one cohort or one course while keeping Platinum for others. Low risk for the program. The diagnostic reporting gap becomes visible.

**Phase 3 -- Full Conversion (Q1 2027+):**
Programs that ran parallel pilots see the data quality difference. MedEdPrep's adaptive engine, Pulse engagement, diagnostic reports, and CoAssist compliance are a comprehensive upgrade at a fraction of the cost.

### The Pricing Advantage Is Already Won

At $26/student (flat, all levels) vs. Platinum's $500 school fee + $26-105/student + $475 AccredAssist, MedEdPrep is 3-5x cheaper for a typical program. **Do not raise prices in Year 1.** The priority is market share, not margin optimization. Price increases are a Year 2 lever once MedEdPrep has 300+ active programs and strong retention data.

### When to Worry

1. **Pearson acquires Platinum outright** (not just distribution). This would give Platinum access to Pearson's capital, content ecosystem, and institutional sales force. Even then, corporate integration takes 12-24 months. Watch for M&A signals.

2. **Platinum hires psychometric talent** and begins publishing IRT technical documentation. This would signal genuine adaptive testing investment rather than marketing.

3. **Platinum launches a student-facing product.** This would be a fundamental strategy shift. Monitor their product pages and conference presentations for any B2C signals.

4. **Platinum drops AccredAssist to free AND makes it standalone.** This would neutralize CoAssist's wedge. Currently unlikely because AccredAssist requires the Platinum ecosystem.

### The 12-18 Month Window

MedEdPrep has a structural advantage window of 12-18 months. Every month of CoAssist adoption, student B2C growth, and Pulse classroom penetration builds switching cost that Platinum cannot easily reverse. The moat is built through data and relationships, not features alone.

Platinum's most likely response in Year 1: improve marketing around their "CAT," possibly make AccredAssist pricing more competitive, and lean harder on conference relationships. These are defensive moves, not game-changers.

**Move fast. The window is real but finite.**

---

## Key Intelligence Gaps (Needs Live Research)

The following items could not be verified from internal research files and should be updated with live web research when tools are available:

- [ ] Current exact pricing for EMT, AEMT, and Paramedic student tiers on EMSTesting
- [ ] Total number of programs currently using EMSTesting (estimated "hundreds" but no hard number)
- [ ] Platinum's current employee count and any recent hires (especially technical/psychometric)
- [ ] Any product updates or announcements since Nov 2025 CAPCE workshop accreditation
- [ ] Platinum's current website messaging around "CAT" and adaptive testing claims
- [ ] Whether Platinum has published any technical documentation or validation studies
- [ ] LinkedIn signals: job postings, leadership changes, partnership announcements
- [ ] Recent conference presentations or booth presence at EMS education events
- [ ] Any M&A rumors or Pearson partnership changes

---

## Sources

### Internal Research Files (Used to Build This Document)

- `/home/jeramey/projects/domination/one-year-plan.html` -- Competitive strategy section (lines 2150-2280)
- `/home/jeramey/projects/mededprep-ecosystem/mededprep-portal/.notes/archive/accredassist-market-research.md` -- Full AccredAssist competitive analysis (Jan 2026)
- `/home/jeramey/projects/mededprep-ecosystem/mededprep-scheduler/.planning/research/FEATURES.md` -- Platinum Planner competitive comparison
- Claude memory: `project_competitive_landscape.md` -- Competitive landscape overview
- Claude memory: `project_ce_strategy.md` -- CE initiative strategy and differentiation
- Claude memory: `reference_mededprep_codebase.md` -- MedEdPrep codebase reference (adaptive engine details)

### External Sources (Referenced in Internal Research)

- [Platinum AccredAssist Product Page](https://www.platinumed.com/accredassist)
- [Platinum Pricing Page](https://www.platinumed.com/pricing/)
- [EMSTesting](https://www.emstesting.com)
- [CoAEMSP](https://coaemsp.org/) -- Accreditation requirements
