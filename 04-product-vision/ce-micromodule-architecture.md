# CE Micromodule Architecture

*MedEdPrep Pulse CE Platform -- Modular Course Design Specification*
*Last updated: 2026-05-21*

---

## 1. Base Unit: The Micromodule

The atomic unit of CE content on the MedEdPrep platform is the **15-minute micromodule**, worth **0.25 CEH** (Continuing Education Hours).

This is not arbitrary. It is the product of three independent constraints converging on the same number:

- **CAPCE minimum.** 0.25 CEH (15 minutes) is the smallest accreditable CE unit under CAPCE standards.
- **Cognitive science.** Market research across microlearning meta-analyses confirmed 15 minutes as the optimal duration for adult learner engagement and retention, particularly for clinically dense material.
- **Operational reality.** EMS providers on 24-hour shifts need content that fits between calls. Fifteen minutes is the realistic attention window.

Each micromodule is a complete, self-contained learning experience. A learner can complete a single micromodule, earn 0.25 CEH, and walk away with something meaningful. But modules are designed to stack.

---

## 2. Stackability: How Modules Combine into Courses

Micromodules stack into two standard course formats:

| Format | Modules | CEH | Total Time | Exam Questions | Content Time | Use Case |
|--------|---------|-----|------------|----------------|-------------|----------|
| **Quick** | 2 modules | 0.5 CEH | ~30 min | 15-20 | 15-20 min | On-shift, between calls |
| **Full** | 4 modules | 1.0 CEH | ~60 min | 30-45 | 30-45 min | Dedicated study time, agency assignments |

### The 30/30 Concept (Richard's Model)

The Quick format embodies Richard's "30/30 concept": 30 minutes of content + assessment combined, split roughly evenly between learning and proving. This is the micro-session sweet spot -- narrow enough to fit a shift break, broad enough to be clinically meaningful.

For a 0.5 CEH Quick course:
- ~15 minutes of content (video or reading across 2 micromodules)
- ~15 minutes of assessment (15-20 questions with rationale review)
- Total: ~30 minutes = 0.5 CEH

For a 1.0 CEH Full course:
- ~30 minutes of content (video or reading across 4 micromodules)
- ~30 minutes of assessment (30-45 questions with rationale review)
- Total: ~60 minutes = 1.0 CEH

### Stacking Rules

1. **Independent completion.** Any micromodule can be completed on its own for 0.25 CEH. A learner does not need to commit to the full sequence.
2. **Sequence recommended, not required.** Within a topic group, modules are numbered in a logical teaching order, but learners can take them in any order.
3. **Progress persistence.** If a learner completes Module 1 of a 4-module course today and Module 2 next week, both count. No expiration on partial progress within a recertification cycle.
4. **Course-level certificate.** Completing all modules in a group earns a course-level certificate (0.5 or 1.0 CEH) in addition to the per-module credits. This matters for agency compliance tracking.
5. **Flexible bundling.** The same micromodule can appear in multiple course bundles. For example, "Pediatric Airway Assessment" (Module) can be part of both "Pediatric Emergencies" (Full course) and "Airway Management Quick Review" (Quick course).

---

## 3. The 65-Module Breakdown

Sixty-five micromodules across seven NCCP domains, designed to provide comprehensive coverage for EMT through Paramedic recertification. Modules are grouped into Quick (0.5 CEH, 2-module) and Full (1.0 CEH, 4-module) course packages.

### Domain 1: Airway, Respiration & Ventilation (10 modules)

| # | Module Title | Cert Level | Course Package |
|---|-------------|------------|----------------|
| A-01 | Basic Airway Assessment & Management | EMT+ | Quick: Basic Airway (A-01 + A-02) |
| A-02 | Oxygen Delivery Systems & Monitoring | EMT+ | |
| A-03 | Supraglottic Airway Devices | AEMT+ | Quick: Advanced Airway Devices (A-03 + A-04) |
| A-04 | Endotracheal Intubation & Verification | Paramedic | |
| A-05 | Pediatric Airway Management | AEMT+ | Full: Pediatric Airway (A-05 + A-06 + A-07 + A-08) |
| A-06 | Neonatal Airway & Resuscitation | Paramedic | |
| A-07 | Pediatric Respiratory Emergencies | EMT+ | |
| A-08 | Pediatric Ventilation Strategies | Paramedic | |
| A-09 | Mechanical Ventilation in Transport | Paramedic | Quick: Ventilation Management (A-09 + A-10) |
| A-10 | Capnography: Interpretation & Clinical Use | AEMT+ | |

**Course packages:** 3 Quick (0.5 CEH each) + 1 Full (1.0 CEH) = 2.5 CEH total domain coverage

### Domain 2: Cardiology (12 modules)

| # | Module Title | Cert Level | Course Package |
|---|-------------|------------|----------------|
| C-01 | 12-Lead ECG: Systematic Interpretation | Paramedic | Full: 12-Lead Mastery (C-01 + C-02 + C-03 + C-04) |
| C-02 | Axis Deviation & Bundle Branch Blocks | Paramedic | |
| C-03 | STEMI Recognition & Cath Lab Activation | Paramedic | |
| C-04 | STEMI Equivalents & Subtle Ischemia | Paramedic | |
| C-05 | Cardiac Arrest Management: BLS Foundations | EMT+ | Quick: Cardiac Arrest (C-05 + C-06) |
| C-06 | ACLS Algorithms: 2026 Updates | Paramedic | |
| C-07 | Rapid Rhythm Identification | AEMT+ | Full: Dysrhythmia Deep Dive (C-07 + C-08 + C-09 + C-10) |
| C-08 | Narrow Complex Tachycardias | Paramedic | |
| C-09 | Wide Complex Tachycardias & VT vs SVT-A | Paramedic | |
| C-10 | Bradycardia & Heart Blocks | AEMT+ | |
| C-11 | Pediatric Cardiac Emergencies | Paramedic | Quick: Pediatric Cardiology (C-11 + C-12) |
| C-12 | Acute Coronary Syndromes: Field to ED | Paramedic | |

**Course packages:** 2 Quick (0.5 CEH each) + 2 Full (1.0 CEH each) = 3.0 CEH total domain coverage

### Domain 3: Trauma (12 modules)

| # | Module Title | Cert Level | Course Package |
|---|-------------|------------|----------------|
| T-01 | Hemorrhage Control: Tourniquets to TXA | EMT+ | Quick: Hemorrhage Control (T-01 + T-02) |
| T-02 | Pelvic & Junctional Hemorrhage Management | AEMT+ | |
| T-03 | Traumatic Brain Injury: Field Assessment | EMT+ | Full: Neurotrauma (T-03 + T-04 + T-05 + T-06) |
| T-04 | Spinal Motion Restriction: Evidence Update | EMT+ | |
| T-05 | Pediatric Head Injury Assessment | EMT+ | |
| T-06 | Blast & Penetrating CNS Injury | Paramedic | |
| T-07 | Chest Trauma: Tension PTX to Cardiac Tamponade | AEMT+ | Quick: Chest Trauma (T-07 + T-08) |
| T-08 | Thoracic Interventions in the Field | Paramedic | |
| T-09 | Pediatric Trauma Assessment | EMT+ | Full: Pediatric Trauma (T-09 + T-10 + T-11 + T-12) |
| T-10 | Non-Accidental Trauma Recognition | EMT+ | |
| T-11 | Pediatric Burns & Environmental Injury | EMT+ | |
| T-12 | Pediatric Shock: Recognition & Management | AEMT+ | |

**Course packages:** 2 Quick (0.5 CEH each) + 2 Full (1.0 CEH each) = 3.0 CEH total domain coverage

### Domain 4: Medical (14 modules)

| # | Module Title | Cert Level | Course Package |
|---|-------------|------------|----------------|
| M-01 | Stroke Assessment: FAST to Thrombectomy Window | EMT+ | Quick: Stroke (M-01 + M-02) |
| M-02 | Large Vessel Occlusion Screening Tools | AEMT+ | |
| M-03 | Diabetic Emergencies: Hypo & Hyperglycemia | EMT+ | Quick: Endocrine Emergencies (M-03 + M-04) |
| M-04 | DKA & HHS: Field Recognition & Management | Paramedic | |
| M-05 | Seizure Management: Status Epilepticus | AEMT+ | Quick: Neurological Emergencies (M-05 + M-06) |
| M-06 | Altered Mental Status: Differential in the Field | EMT+ | |
| M-07 | Respiratory Emergencies: Asthma & COPD | EMT+ | Full: Respiratory Medicine (M-07 + M-08 + M-09 + M-10) |
| M-08 | CHF & Pulmonary Edema: CPAP to Meds | Paramedic | |
| M-09 | Anaphylaxis: Recognition & Epinephrine | EMT+ | |
| M-10 | Toxicological Emergencies: Common Exposures | Paramedic | |
| M-11 | Sepsis Screening & Early Intervention | AEMT+ | Full: Critical Medical (M-11 + M-12 + M-13 + M-14) |
| M-12 | Pain Management: Prehospital Pharmacology | Paramedic | |
| M-13 | Opioid Emergencies & Naloxone Protocols | EMT+ | |
| M-14 | Behavioral Emergencies & Chemical Restraint | Paramedic | |

**Course packages:** 3 Quick (0.5 CEH each) + 2 Full (1.0 CEH each) = 3.5 CEH total domain coverage

### Domain 5: OB/Peds & Special Populations (8 modules)

| # | Module Title | Cert Level | Course Package |
|---|-------------|------------|----------------|
| O-01 | Normal Delivery & Immediate Newborn Care | EMT+ | Quick: Field Delivery (O-01 + O-02) |
| O-02 | Complicated Delivery: Breech, Cord, Shoulder | AEMT+ | |
| O-03 | Obstetric Emergencies: Eclampsia & Hemorrhage | Paramedic | Quick: OB Emergencies (O-03 + O-04) |
| O-04 | Trauma in Pregnancy | AEMT+ | |
| O-05 | Geriatric Assessment: Falls, Polypharmacy, AMS | EMT+ | Full: Special Populations (O-05 + O-06 + O-07 + O-08) |
| O-06 | Bariatric & Access-Challenged Patients | EMT+ | |
| O-07 | Patients with Special Healthcare Needs | EMT+ | |
| O-08 | End-of-Life Care & POLST/DNR Navigation | EMT+ | |

**Course packages:** 2 Quick (0.5 CEH each) + 1 Full (1.0 CEH) = 2.0 CEH total domain coverage

### Domain 6: EMS Operations (5 modules)

| # | Module Title | Cert Level | Course Package |
|---|-------------|------------|----------------|
| E-01 | MCI Triage: START to JumpSTART | EMT+ | Quick: MCI Response (E-01 + E-02) |
| E-02 | MCI Command & Resource Management | EMT+ | |
| E-03 | Crew Resource Management & Communication | EMT+ | Quick: Crew Safety (E-03 + E-04) |
| E-04 | Provider Safety & Situational Awareness | EMT+ | |
| E-05 | EMS Legal & Ethical Decision-Making | EMT+ | Standalone 0.25 CEH |

**Course packages:** 2 Quick (0.5 CEH each) + 1 standalone = 1.25 CEH total domain coverage

### Domain 7: Preparatory / Professional (4 modules)

| # | Module Title | Cert Level | Course Package |
|---|-------------|------------|----------------|
| P-01 | Evidence-Based Practice for EMS | EMT+ | Quick: Professional Development (P-01 + P-02) |
| P-02 | Documentation & Medical-Legal Protection | EMT+ | |
| P-03 | Cultural Competency & Health Equity in EMS | EMT+ | Quick: Cultural & Wellness (P-03 + P-04) |
| P-04 | Provider Wellness & Resilience | EMT+ | |

**Course packages:** 2 Quick (0.5 CEH each) = 1.0 CEH total domain coverage

### Summary

| Domain | Modules | Quick Courses | Full Courses | Standalone | Total CEH |
|--------|---------|--------------|-------------|------------|-----------|
| Airway, Resp & Ventilation | 10 | 3 | 1 | 0 | 2.50 |
| Cardiology | 12 | 2 | 2 | 0 | 3.00 |
| Trauma | 12 | 2 | 2 | 0 | 3.00 |
| Medical | 14 | 3 | 2 | 0 | 3.50 |
| OB/Peds & Special Populations | 8 | 2 | 1 | 0 | 2.00 |
| EMS Operations | 5 | 2 | 0 | 1 | 1.25 |
| Preparatory / Professional | 4 | 2 | 0 | 0 | 1.00 |
| **Total** | **65** | **16** | **8** | **1** | **16.25** |

This provides 16.25 CEH across 25 courses (16 Quick + 8 Full + 1 standalone), well exceeding the typical 40-hour biennial recertification requirement when combined with exam-only pathway credits. The module set is designed to grow -- new modules slot into existing domain groups or create new course packages.

---

## 4. Module Taxonomy: Four-Standard Mapping

Every micromodule maps to four national standards. This is Richard's key addition and a competitive differentiator -- no other CE provider maps to all four.

### The Four Standards

| Standard | Abbreviation | What It Defines | How Modules Map |
|----------|-------------|----------------|-----------------|
| **National Education Standards** | NES | What EMS providers should *know* at each certification level | Learning objectives align to NES competency statements |
| **National Scope of Practice** | NSOP | What EMS providers are *authorized to do* | Skills and interventions referenced are level-appropriate per NSOP |
| **National Model Guidelines** | NMG | Evidence-based *how* of clinical practice | Clinical procedures and protocols follow NMG recommendations |
| **NCCP Requirements** | NCCP | Domain-specific CE hour requirements for recertification | Each module maps to an NCCP topic area for recertification tracking |

### Mapping Workflow

Richard is the primary mapper. The process for each module:

1. **NCCP domain assignment.** Primary domain (e.g., Cardiology) plus any secondary domains if applicable.
2. **NES competency alignment.** List specific NES competency statements addressed at each certification level (EMR/EMT/AEMT/Paramedic).
3. **NSOP scope verification.** Confirm all skills and interventions in the module are within scope for the tagged certification levels.
4. **NMG guideline references.** Link to specific NMG evidence-based guidelines the module content supports.

### Mapping Data Model

Each module carries a standards object in its metadata:

```
module.standards = {
  nccp: {
    primary_domain: "Cardiology",
    secondary_domains: ["Medical"],
    topic_area: "12-Lead ECG Interpretation"
  },
  nes: {
    emt: ["6.1.a", "6.1.b"],
    aemt: ["6.1.a", "6.1.b", "6.2.c"],
    paramedic: ["6.1.a", "6.1.b", "6.2.c", "6.3.d", "6.3.e"]
  },
  nsop: {
    minimum_level: "Paramedic",
    skills_referenced: ["12-Lead acquisition", "12-Lead interpretation", "Cath lab activation"]
  },
  nmg: {
    guidelines: ["STEMI Management", "Chest Pain Assessment"],
    version: "2025-v3"
  }
}
```

This mapping feeds directly into the diagnostic reports, making them the most comprehensive competency assessment available in EMS continuing education. Medical directors and agencies see not just "passed/failed a CE course" but a detailed map of where a provider's demonstrated competency sits relative to four national frameworks.

---

## 5. Module Structure: The Template

Every micromodule follows the same structural template. Consistency reduces cognitive load and makes content production predictable.

### Module Template (15 minutes, 0.25 CEH)

```
MODULE: [Domain Code]-[##] [Title]
Duration: 15 minutes
CEH: 0.25
Certification Level: [EMR | EMT | AEMT | Paramedic]+
NCCP Domain: [Primary Domain]
Version: [Major.Minor] (e.g., 1.0)

LEARNING OBJECTIVES (2-3 per module)
  1. [Action verb] + [specific measurable outcome]
  2. [Action verb] + [specific measurable outcome]
  3. [Action verb] + [specific measurable outcome] (if needed)

CONTENT SEGMENT (~12 minutes)
  Format: Video OR Reading (platform supports both; video preferred)
  
  Video specifications:
    - Duration: 10-12 minutes of instructional content
    - Resolution: 1080p minimum, 4K preferred
    - Aspect ratio: 16:9
    - Style: Instructor-led with clinical visuals (not talking head alone)
    - Chapters: 2-3 natural break points with chapter markers
    - Key concept callouts: Timestamped "High Yield" and "Clinical Pearl" markers
  
  Reading specifications (alternative):
    - Word count: 1,500-2,000 words (CAPCE words-per-minute standard)
    - Structure: Subheadings every 200-300 words
    - Clinical images/diagrams: Minimum 2 per module
    - Callout boxes: Key takeaways, clinical pearls, common pitfalls

KNOWLEDGE CHECK (3-5 questions, ~3 minutes)
  - Formative assessment embedded within or immediately after content
  - Multiple choice, 4 options per question
  - Rationale provided for all options (correct and incorrect)
  - NOT graded for pass/fail -- educational purpose only
  - Questions sourced from the calibrated item bank where available
  - Mapped to module learning objectives

RATIONALE MATERIAL
  - Full explanation for each knowledge check question
  - Connects incorrect answers to common misconceptions
  - References NMG guidelines or evidence base
  - Available as expandable text (not forced reading at this level)

STANDARDS MAPPING (metadata, not learner-facing)
  - NES references
  - NSOP scope confirmation
  - NMG guideline links
  - NCCP domain/topic area
```

### How Segments Compose at Course Level

When modules combine into a Quick or Full course, the course player stitches them together:

**Quick Course (0.5 CEH = 2 modules):**
```
[Module 1 Content] -> [Module 1 Knowledge Check] -> 
[Module 2 Content] -> [Module 2 Knowledge Check] -> 
[Course Post-Test: 15-20 questions] -> [Results & Certificate]
```

**Full Course (1.0 CEH = 4 modules):**
```
[Optional Pre-Assessment: 10-15 questions] ->
[Module 1 Content] -> [Module 1 Knowledge Check] -> 
[Module 2 Content] -> [Module 2 Knowledge Check] -> 
[Module 3 Content] -> [Module 3 Knowledge Check] -> 
[Module 4 Content] -> [Module 4 Knowledge Check] -> 
[Course Post-Test: 30-45 questions] -> [Diagnostic Report & Certificate]
```

Learners can pause between modules and resume later. Progress persists.

---

## 6. Content Production Workflow

### Pipeline Stages

The content pipeline follows a 6-stage kanban workflow, already reflected in the platform admin mockup (Screen 66: Content Pipeline).

```
DRAFT -> IN REVIEW -> RECORDING/WRITING -> EDITING -> QA -> PUBLISHED
```

### Detailed Workflow

#### Stage 1: Draft (Days 1-3)

**Owner:** SME (content author)
**Output:** Module script or outline

1. SME receives module assignment with the template (Section 5 above)
2. SME drafts learning objectives (2-3 per module)
3. SME writes the content script (video) or full text (reading)
   - Video script: ~1,500 words for 12 minutes of instruction
   - Reading content: ~1,800 words with embedded visual callouts
4. SME drafts 3-5 knowledge check questions with full rationales
5. SME completes the four-standard mapping for the module (with Richard's guidance)
6. Output uploaded to pipeline as "Draft"

#### Stage 2: In Review (Days 4-5)

**Owner:** Richard (CE Content Lead) + Gene (CAPCE Program Director)
**Output:** Approved script with revisions

1. Richard reviews for clinical accuracy, educational flow, and standard alignment
2. Gene reviews for CAPCE compliance:
   - Learning objectives meet CAPCE formatting requirements
   - Content duration matches CEH claim
   - Questions meet CAPCE assessment standards
3. Medical Director (Dr. Tim Thomas) reviews for clinical currency
4. Revisions returned to SME if needed (target: 1 revision cycle)
5. Approved scripts move to Recording/Writing

#### Stage 3: Recording / Writing (Days 6-8)

**Owner:** SME (records) + Sydney (camera/initial edit)
**Output:** Raw video or finalized reading content

For video modules:
1. SME records in MedEdPrep studio
   - 4 Lumix cameras, pro lighting, teleprompter
   - Target: 2-3 module recordings per studio day
   - Multiple SMEs can record on the same day (parallel production)
2. Sydney captures and organizes raw footage
3. Clinical visuals, diagrams, and overlays specified by SME

For reading modules:
1. SME finalizes text based on approved script
2. Clinical images and diagrams sourced or created
3. Content formatted per reading specification

#### Stage 4: Editing (Days 9-12)

**Owner:** Sydney (Video Editor)
**Output:** Final video or formatted reading content

1. Sydney edits video:
   - Cut to 10-12 minute instructional segment
   - Add chapter markers, key concept callouts
   - Insert clinical visuals, diagrams, animations
   - Add "High Yield" and "Clinical Pearl" timestamp markers
   - Export at 1080p/4K
2. For reading: Final formatting with images, callout boxes, subheadings

#### Stage 5: QA (Days 13-14)

**Owner:** Gene (CAPCE) + Richard (Content) + Platform team (Technical)
**Output:** Publish-ready module

1. CAPCE compliance final check (Gene):
   - Verify CEH claim matches actual content duration
   - Confirm learning objectives, assessment alignment
   - Prepare CAPCE submission materials
2. Content accuracy final check (Richard):
   - Watch/read final version end-to-end
   - Verify standard mapping is correct
   - Confirm knowledge check questions align with content
3. Technical QA (Platform team):
   - Video playback quality
   - Knowledge check questions load correctly
   - Module metadata complete (standards mapping, tags, level)
   - Spaced retrieval questions tagged and queued

#### Stage 6: Published

**Owner:** Platform team
**Output:** Live module on Pulse CE platform

1. Module goes live in the catalog
2. CAPCE submission filed (auto-report integration)
3. Module available for course bundling (Quick/Full packages)
4. Knowledge check questions enter the spaced retrieval pool
5. Learner analytics tracking enabled

### Timeline Summary

| Stage | Duration | Owner | Parallel? |
|-------|----------|-------|-----------|
| Draft | 3 days | SME | Yes -- multiple SMEs draft simultaneously |
| Review | 2 days | Richard + Gene + Medical Director | Sequential per module |
| Record/Write | 3 days | SME + Sydney | Yes -- 2-3 modules per studio day |
| Edit | 4 days | Sydney | 1-2 modules in parallel |
| QA | 2 days | Gene + Richard + Platform | Sequential per module |
| **Total per module** | **~14 calendar days** | | |

### Production Capacity

With 5-6 SMEs and the production infrastructure in place:

- **Studio capacity:** 3+ recording days per week
- **SME throughput:** Each SME can draft 2 modules/week
- **Editing throughput:** Sydney can edit 3-4 modules/week
- **Bottleneck:** CAPCE review cycle and Gene's QA bandwidth, not recording

**Projected velocity at steady state:** 8-10 published modules per month. At that rate, the full 65-module catalog is achievable in 7-8 months of production.

---

## 7. Assessment Integration

Assessment operates at two levels: within individual modules (formative) and across courses (summative).

### Module-Level Assessment (Formative)

Each micromodule includes 3-5 embedded knowledge check questions.

- **Purpose:** Formative -- reinforces learning, not a gate
- **Format:** Multiple choice, 4 options
- **Rationale:** Provided for all answer options after the learner responds
- **Grading:** Not scored for pass/fail at the module level
- **Adaptive remediation:** If the learner selects an incorrect answer, the rationale is displayed with the common misconception highlighted. This is the per-question remediation, not the full remediation loop (which operates at the course level).
- **Item bank source:** Questions are drawn from the calibrated item bank where available, or newly authored and tagged for future IRT calibration

### Course-Level Assessment (Summative)

When modules combine into a 0.5 or 1.0 CEH course, the course includes a summative post-test.

**Quick Course Post-Test (0.5 CEH):**
- 15-20 questions covering both modules
- 70% passing score (CAPCE-compliant, industry standard)
- Adaptive difficulty using IRT-calibrated items
- Forced rationale reading on incorrect answers (Richard's remediation loop)
- Follow-up verification question after each incorrect answer
- Time: ~15 minutes

**Full Course Post-Test (1.0 CEH):**
- 30-45 questions covering all four modules
- 70% passing score
- Adaptive difficulty using IRT-calibrated items
- Full remediation loop active
- Optional pre-assessment to establish baseline (enables pre/post comparison in diagnostic report)
- Time: ~30 minutes

### The Remediation Loop (at Course Level)

Richard's novel mechanic, implemented in the course-level post-test:

```
Question presented -> Learner answers
  |
  +-> Correct -> Next question (difficulty may increase)
  |
  +-> Incorrect -> Forced rationale reading (must read full explanation)
                   |
                   +-> Follow-up verification question (similar concept, different question)
                       |
                       +-> Regardless of result -> Continue exam
```

This loop is educationally grounded in retrieval practice and immediate corrective feedback research. No other EMS CE provider has implemented it. CAPCE compliance is achieved by framing the remediation items as "educational content" (formative), not assessment -- formative items are unrestricted under CAPCE standards.

### Pass/Fail Consequences

- **Pass (70%+):** CE credit awarded. Diagnostic report generated. CAPCE auto-reported. Certificate issued.
- **Fail (<70%):** No CE credit from the exam. Learner must complete the content pathway (Pathway 2) before retaking. Retake uses different questions from the item bank. Unlimited retakes permitted.

---

## 8. Spaced Retrieval Integration: Daily Check

Completed modules feed the **Daily Check** spaced retrieval system -- the platform's long-term retention engine.

### How It Works

1. **Question pool.** When a learner completes a module, 2-3 questions from that module's knowledge check bank are flagged for spaced retrieval.
2. **Dashboard trigger.** Each time the learner logs in, the Daily Check card appears on the dashboard. One question, drawn from the learner's personal spaced retrieval pool.
3. **Spacing algorithm.** Questions reappear on an expanding schedule based on the learner's performance:
   - Correct answer: interval expands (1 day -> 3 days -> 7 days -> 14 days -> 30 days)
   - Incorrect answer: interval resets to 1 day, rationale re-displayed
4. **Domain weighting.** Questions from domains where the learner scored lower on course assessments appear more frequently.
5. **Decay detection.** If a learner consistently misses questions from a previously-completed module, the system flags that domain as "decaying" and recommends a refresher module.

### Daily Check UX (from mockups, Batch 1A)

- **Entry:** Single question card with domain tag and confidence buttons
- **Answer:** Immediate feedback with rationale
- **Complete:** Active days this month tracked (not streaks -- avoids punitive UX), encouragement, next review countdown, link to extended practice
- **Duration:** Under 60 seconds per session
- **Optional:** Learners can skip the Daily Check. It is a retention tool, not a gate.

### Spaced Retrieval Data Value

The Daily Check generates longitudinal competency data. Over months, the system builds a picture of which domains are retaining and which are decaying for each learner. This data feeds:

- **Learner dashboard:** Personal competency heatmap
- **Agency dashboard:** Aggregate decay patterns across a roster
- **Diagnostic reports:** Long-term retention evidence alongside point-in-time assessment results
- **Research:** Anonymized retention curves across clinical domains (potential publication data)

---

## 9. Certification Level Tagging

Every module carries a minimum certification level tag. Learners see content appropriate for their credentials.

### Level Hierarchy

```
EMR < EMT < AEMT < Paramedic
```

### Tagging Rules

- **Tag indicates minimum level.** A module tagged "AEMT+" is visible to AEMT and Paramedic learners but not EMT.
- **"EMT+" means universal.** Most foundational modules are tagged EMT+, making them visible to all certification levels.
- **Paramedic-only content** covers pharmacology, advanced procedures, and expanded assessment skills that are outside EMT/AEMT scope.
- **Learner profile drives visibility.** During registration, the learner selects their certification level. The catalog filters accordingly. Learners can change their level in settings.
- **Cross-level modules.** Some modules teach the same topic at different depths. For example, "Cardiac Arrest Management: BLS Foundations" (EMT+) and "ACLS Algorithms: 2026 Updates" (Paramedic) cover related material at different scopes.

### Level Distribution in the 65-Module Catalog

| Certification Level | Module Count | Percentage |
|---------------------|-------------|------------|
| EMT+ (visible to all) | 34 | 52% |
| AEMT+ | 14 | 22% |
| Paramedic only | 17 | 26% |
| **Total** | **65** | **100%** |

This distribution ensures that every certification level has substantial content. An EMT sees 34 modules; an AEMT sees 48; a Paramedic sees all 65.

---

## 10. Versioning: Handling Guideline Updates

Clinical guidelines change. AHA updates resuscitation algorithms. Trauma protocols evolve. The module versioning system handles this without breaking learner records.

### Version Numbering

```
[Module Code] v[Major].[Minor]

Major version: Guideline change that alters clinical recommendations
  Example: C-06 v1.0 -> C-06 v2.0 (AHA 2026 guidelines replace 2025)

Minor version: Corrections, improved visuals, better rationales (no clinical change)
  Example: C-06 v1.0 -> C-06 v1.1 (fixed incorrect diagram)
```

### Update Workflow

#### Major Version (Guideline Change)

1. **Trigger:** New guideline published (e.g., AHA, NAEMSP, NASEMSO) that affects module content.
2. **New version created.** The updated module is built as a new version, following the full production pipeline (Section 6).
3. **Old version sunset.** The previous version is marked "Archived" in the catalog. It remains accessible for transcript records but cannot be newly started.
4. **Learner notification.** Learners who completed the old version receive a notification:
   - "Cardiac Arrest Management has been updated to reflect the 2026 AHA guidelines. Your previous completion (v1.0, completed [date]) is still on your transcript. The updated module is available now."
5. **Agency notification.** Agency admins are notified that an updated module is available. They can assign the new version to their roster.
6. **CE credit.** Completing the updated version earns new CE credit (it is new content). The old completion stays on the transcript.
7. **Grace period.** Old version remains completable for 90 days after the new version publishes, for learners who were mid-course.

#### Minor Version (Corrections)

1. **In-place update.** The module is updated without creating a new version number visible to learners.
2. **No learner notification.** Minor corrections do not require re-completion.
3. **Changelog.** Internal changelog tracks all minor version changes for audit purposes.

### Guideline Tracking Responsibility

- **Richard + Gene** monitor national guideline publications (AHA, NAEMSP, NASEMSO, state protocols)
- **Quarterly review.** Every quarter, the content team reviews published guideline updates against the module catalog
- **Priority triggers:** AHA guideline updates, NAEMSP position statements, state protocol changes affecting multiple modules

### Impact on Spaced Retrieval

When a module receives a major version update:
- Questions from the old version are removed from the spaced retrieval pool
- Questions from the new version are added after the learner completes the updated module
- If the learner has not completed the updated module, old questions remain in the pool with a "guideline update available" flag

---

## 11. Richard's 30/30 Concept: The Micro-Session Sweet Spot

The 30/30 concept is the architectural philosophy that ties everything together.

### The Principle

**30 minutes of content + 30 minutes of assessment = 1.0 CEH of meaningful engagement.**

This is not a rigid formula. It is a design constraint that keeps every course focused:

- **Narrow enough to be manageable.** "Pediatric Chest Trauma" rather than "all of trauma." "STEMI Equivalents" rather than "all of cardiology."
- **Broad enough to be meaningful.** Every 30/30 session teaches something a provider can use on their next shift.
- **Flexible enough to slice many ways.** "There are a lot of ways to slice it up" (Richard). The same clinical domain can be divided into focused 0.5 CEH sessions or combined into comprehensive 1.0 CEH deep dives.

### How 30/30 Maps to the Architecture

| Element | 0.5 CEH (Quick) | 1.0 CEH (Full) |
|---------|-----------------|-----------------|
| Content modules | 2 x 15 min = ~24 min of instruction | 4 x 15 min = ~48 min of instruction |
| Knowledge checks | 2 x 3-5 questions (formative) | 4 x 3-5 questions (formative) |
| Course post-test | 15-20 questions + rationale review | 30-45 questions + rationale review |
| **Content time** | **~15 min** | **~30 min** |
| **Assessment time** | **~15 min** | **~30 min** |
| **Total** | **~30 min** | **~60 min** |

The 30/30 split works because the assessment time includes the remediation loop. A 30-question post-test where the learner gets some wrong, reads rationales, and answers follow-up questions easily fills 30 minutes of educational engagement. Under CAPCE standards, this assessment time qualifies toward CEH because the learner is actively engaged in learning, not just clicking through a quiz.

### Competitive Advantage

Every competitor in EMS CE delivers one format: watch a video, take a quiz, get a certificate. The 30/30 concept delivers *flexibility* as a competitive advantage:

- A medic on shift has 30 minutes between calls? Quick format.
- An agency assigns recertification prep? Full format.
- A motivated learner wants to go deep? Stack multiple Full courses.
- A provider just wants to prove competency? Exam-only pathway (Pathway 1) at 0.25 CEH per domain assessment.

The micromodule architecture makes all of these possible from the same content library. Write once, bundle many ways.

---

## Appendix A: Module ID Convention

```
[Domain]-[##]

Domain codes:
  A  = Airway, Respiration & Ventilation
  C  = Cardiology
  T  = Trauma
  M  = Medical
  O  = OB/Peds & Special Populations
  E  = EMS Operations
  P  = Preparatory / Professional

Examples:
  C-01 = Cardiology module 1 (12-Lead ECG: Systematic Interpretation)
  T-09 = Trauma module 9 (Pediatric Trauma Assessment)
  E-05 = EMS Operations module 5 (EMS Legal & Ethical Decision-Making)
```

## Appendix B: Course Package ID Convention

```
[Domain]-[Q|F][##]

Q = Quick (0.5 CEH)
F = Full (1.0 CEH)

Examples:
  C-Q01 = Cardiology Quick Course 1 (Cardiac Arrest: C-05 + C-06)
  T-F02 = Trauma Full Course 2 (Pediatric Trauma: T-09 + T-10 + T-11 + T-12)
```

## Appendix C: Database Schema (Module Record)

Key fields for the module data model:

```
module_id:          VARCHAR     -- "C-01"
title:              VARCHAR     -- "12-Lead ECG: Systematic Interpretation"
version_major:      INTEGER     -- 1
version_minor:      INTEGER     -- 0
status:             ENUM        -- draft | review | recording | editing | qa | published | archived
ceh:                DECIMAL     -- 0.25
duration_minutes:   INTEGER     -- 15
content_format:     ENUM        -- video | reading
cert_level_min:     ENUM        -- emr | emt | aemt | paramedic
nccp_domain:        VARCHAR     -- "Cardiology"
nccp_secondary:     VARCHAR[]   -- ["Medical"]
nes_references:     JSONB       -- level-specific NES competency codes
nsop_skills:        VARCHAR[]   -- skills/interventions referenced
nmg_guidelines:     JSONB       -- guideline references with versions
learning_objectives: TEXT[]     -- 2-3 objectives per module
knowledge_check_ids: INTEGER[]  -- FK to item bank questions
spaced_retrieval_ids: INTEGER[] -- subset of knowledge_check_ids flagged for Daily Check
course_packages:    VARCHAR[]   -- ["C-F01", "C-Q01"] -- which course bundles include this module
published_at:       TIMESTAMP
archived_at:        TIMESTAMP   -- null if active
guideline_version:  VARCHAR     -- "AHA-2025", "NAEMSP-2026", etc.
created_by:         VARCHAR     -- SME identifier
reviewed_by:        VARCHAR     -- reviewer identifier
```

## Appendix D: CAPCE Compliance Checklist (Per Module)

Before any module enters QA:

- [ ] Learning objectives use action verbs (Bloom's taxonomy)
- [ ] Content duration matches CEH claim (15 min = 0.25 CEH)
- [ ] Knowledge check questions have rationales for all answer options
- [ ] Four-standard mapping complete (NES, NSOP, NMG, NCCP)
- [ ] Certification level tag accurate (content within scope for tagged level)
- [ ] No promotional content (CAPCE prohibition)
- [ ] Disclosure statement included (conflicts of interest)
- [ ] References cited for clinical claims
- [ ] Video/reading meets accessibility standards (captions, alt text)
- [ ] Post-test questions (at course level) differ from knowledge check questions
