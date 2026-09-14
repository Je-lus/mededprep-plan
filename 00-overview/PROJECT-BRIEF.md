# Project Brief: MedEdPrep Corporate Architecture

## What This Is

A strategic plan for building a multi-entity corporate structure around the MedEdPrep ecosystem — healthcare education, certification, accreditation, and data products — with clean separation between entities that protects intellectual property, maintains regulatory defensibility, and enables long-term growth across multiple verticals.

This research collection documents the legal, tax, regulatory, and market foundations needed to design and implement this structure over the coming years.

---

## Current State — Where We Are Today

**Everything operates under a single entity: MedEdPrep, LLC (Georgia).**

MedEdPrep LLC currently houses all products, all IP, all accreditations, and all revenue. There are no subsidiaries, no holding company, no separate entities. The multi-entity structure described below is the target architecture that will be built over time as the business grows.

### What MedEdPrep LLC Does Today

- **Student test preparation** — EMT, AEMT, and Paramedic levels. ~10,600 items, ~1.55 million student responses. Revenue comes from students and programs paying for test prep access.
- **Unit exams and exit exams** — Sold to EMS education programs. State-approved EOPA ($30/student/attempt).
- **Continuing education** — CAPCE organizational accreditation is already held. CE courses are live and generating completions.
- **CoAssist** — Accreditation compliance management platform for EMS programs. Free to programs permanently. Loss-leader that drives program adoption → student test prep revenue.
- **Pulse** — Gamified learning platform with 16 item types.
- **Adaptive testing engine** — Launched November 2025. 2,616 items in the adaptive pool, 254 unique users, ~42,500 responses so far.

### What MedEdPrep LLC Does NOT Have Yet

- No separate holding company / IP vault
- No separate certification entity
- No separate data analytics entity
- No 501(c)(3) (board is confirmed, formation pending attorney/accountant meeting)
- No trust structure
- No intercompany licensing agreements (nothing to license between yet)

---

## The Entity Map — Future State

The target architecture separates functions that need independence (certification from education, nonprofit from for-profit) while keeping IP centralized and data flowing to where it creates value.

### Ownership Structure (For-Profit Side)

```
Trust (future — Wyoming DAPT)
  └── The Vault — MedEdPrep, LLC (Holding / IPCo — Wyoming LLC)
        │
        │   Owns all IP: question banks, analytics algorithms,
        │   software platforms, trademarks, trade secrets,
        │   cognitive process taxonomy / measurement framework.
        │   Licenses IP to operating companies at arm's length.
        │   Takes no operational risk.
        │
        ├── Company A — MedEdPrep Education (for-profit, Georgia LLC)
        │     Initial education, test prep, continuing education,
        │     school exams, state-approved EOPA ($30/student/attempt).
        │     Generates student performance data.
        │     Pulse gamified learning platform.
        │
        ├── Company B — MedEdPrep Accreditation (for-profit, Georgia LLC)
        │     CoAssist platform — accreditation management tooling.
        │     Free for programs (loss-leader / lead generator).
        │     Programs use it for CoAEMSP compliance, state compliance.
        │     Georgia SOEMS redesignation tooling opportunity.
        │
        ├── Company C — [TBD Brand] Certification (for-profit, Georgia LLC)
        │     Certification agency issuing exams at ALL levels:
        │     EMR, EMT, AEMT, Paramedic, Paramedic Practitioner.
        │     Separate question database. Independent governance board.
        │     Bifactor model: pass/fail + diagnostic feedback.
        │     CAPCE-accredited CE "recert by exam" as item calibration engine.
        │     Deliberately for-profit for transparency.
        │
        ├── Company D — Hospice Software (for-profit, Georgia LLC, in development)
        │
        └── Company E — MedEdPrep Data (for-profit, Georgia LLC)
              Aggregates data from Companies A, B, C, D.
              Reporting by state, region, school, individual.
              Audits and validates Company C's certification exams.
              Provides top-down analytics to external stakeholders.
              Only entity that sees data from both A and C,
              and only at aggregate level.
```

### Independent Nonprofit (Not Owned — Separate Legal Entity)

```
┌───────────────────────────────────────┐
│  [TBD Name] Foundation                │
│  501(c)(3) — Georgia nonprofit corp   │
│                                       │
│  Mission: healthcare education access │
│  + end-of-life care.                  │
│  Funded by grants.                    │
│                                       │
│  Purchases software/services from     │
│  Companies A, D at FMV via arm's-     │
│  length contracts.                    │
│                                       │
│  Provides free education tools to     │
│  high school EMS programs.            │
│  Serves hospice/end-of-life care      │
│  communities.                         │
│                                       │
│  Independent board (80%+ independent) │
│  Not owned by anyone.                 │
│  Not a subsidiary of The Vault.       │
└───────────────────────────────────────┘
```

**Why it's separate:** A 501(c)(3) cannot be owned, cannot be a subsidiary, and has no parent entity. The relationship between the nonprofit and the for-profit entities is purely contractual — the nonprofit purchases software and services at fair market value. The IRS scrutinizes transactions between a nonprofit and related for-profit entities. When independent directors (with no financial stake in MedEdPrep) approve those transactions, it creates a rebuttable presumption of reasonableness.

**Board (confirmed 2026-04-09):**

| Person | Role | Independence |
|---|---|---|
| Jeramey | Founder | Not independent (founder seat) |
| Allyson Cooper | PA / ACOD, pursuing MBA | Independent |
| Bryan Rothkin | Hospice business partner (separate company, no MedEdPrep ties) | Independent — Company D conflicts handled by COI policy and recusal |
| Chrystal McDaniel | NP / Paramedic, 30+ years healthcare | Independent |
| David Tanner | Local friend, community/public safety | Independent |

5 total, 4 independent = 80%. Board recruitment complete. Next step: attorney/accountant meeting.

---

## What Needs to Happen — Entity by Entity

This section maps what currently exists under MedEdPrep LLC to what each future entity will eventually own.

### The Vault (IP Holding Company)
**Currently:** All IP lives in MedEdPrep LLC. No formal IP assignments or licensing.
**To create:** Form Wyoming LLC. Execute Section 351 tax-free IP transfer. Establish royalty agreements with each operating company (0-15% of revenue, phased by maturity stage, Section 482 compliant — see [transfer-pricing-implementation.md](../02-ip-strategy/transfer-pricing-implementation.md) for rate schedule). Phase 1: 0% or cost-recovery. Phase 2 ($50-500K revenue): 5-8%. Phase 3 ($500K+): 10-15%.

### Company A (Education)
**Currently:** This IS MedEdPrep LLC today. All education, test prep, CE, Pulse, adaptive testing, EOPA — everything. When entities separate, Company A retains the education operations.
**To create:** May simply continue as the current LLC, or re-domicile depending on Vault structure.

### Company B (Accreditation)
**Currently:** CoAssist is built and operational inside MedEdPrep LLC. Free for programs.
**To create:** Separate Georgia LLC. Transfer CoAssist platform. CoAssist remains free — it drives programs to MedEdPrep for student testing, which is where the revenue is.

### Company C (Certification)
**Currently:** Does not exist. CAPCE accreditation is held under MedEdPrep LLC, which gives the CE "recert by exam" pipeline a head start on item calibration.
**To create:** New Georgia LLC with separate governance board. Build separate question database (items born on Company C's side of the firewall). CE "recert by exam" is a Company C product — credential maintenance is a certification function. Apply for NCCA accreditation (EMT first).
**Critical insight:** The data from both education (Company A) and CE (which will move to Company C) can be used to validate question framing for the certification exam — but only through the proper channels (Company E aggregation at population level, or the CE pipeline's own calibration data within Company C).

### Company D (Hospice)
**Currently:** In development. Not operational.
**To create:** Separate Georgia LLC when product is ready.

### Company E (Data)
**Currently:** The analytics capabilities exist inside MedEdPrep LLC's reporting. No separate entity.
**To create:** Separate Georgia LLC. Builds ETL pipelines from Companies A, B, C, D. Provides aggregate analytics, state/regional reports, certification exam auditing. The only entity that sees data from both A and C, and only at aggregate level. This is the firewall.

### 501(c)(3) Foundation
**Currently:** Board confirmed. Formation not yet started.
**To create:** File Georgia nonprofit Articles of Incorporation. Apply for 501(c)(3) via Form 1023. Full filing package is drafted (see 01-corporate-structure/).

---

## Key Structural Decisions (Already Made)

**Certification body is FOR-PROFIT.** NCCA allows it (NASM, CompTIA, NCCPT are precedent). The deliberate choice is about transparency.

**Only ONE 501(c)(3).** Serves both EMS education and hospice/end-of-life care. Multiple program areas strengthen charitable purpose.

**The nonprofit purchases software at FMV, not in-kind donation.** Arm's length, defensible, traceable.

**Education (A) and Certification (C) have strict data separation.** Company E aggregates both at population level only. NCCA/ISO 17024 firewall.

**The Vault owns all IP.** Including the validated cognitive process taxonomy — licensed to both A and C.

**Items are dual-validated.** Bifactor model: general factor for pass/fail, specific factors for diagnostic feedback, same items feeding both. First mover in credentialing.

**CE "recert by exam" is a Company C product.** Credential maintenance is a certification function. Items born on Company C's side of the firewall. CE volume provides industrial-scale item calibration.

**No external gatekeeper on credentials.** IBSC certification (which is NCCA-accredited — CP-C, CCP-C, FP-C, TP-C) is accepted but NOT required for the PP credential. Company C owns eligibility end-to-end.

**CoAssist is free.** Not a SaaS revenue play. It's a loss-leader that drives program adoption and student test prep revenue. 10 students over 2 months generates more than any annual subscription fee.

---

## Data Flow Architecture

```
Company A (Education)          Company C (Certification)
  Student performance            Candidate exam data
  Test prep analytics            Pass/fail + diagnostic profiles
  CE completion data             CE "recert by exam" data
  Pulse response data            Separate question bank
       │                              │
       │    ┌─────────────────────────┐│
       └───>│     Company E (Data)    │<┘
            │  Aggregation & Analytics │
            │  State/regional reports  │
            │  Certification audit     │
            │  Workforce pipeline      │
            │  Cross-level tracking    │
            └──────────┬──────────────┘
                       │
            ┌──────────┴──────────────┐
            │  State EMS offices      │
            │  Accreditation bodies   │
            │  Programs / schools     │
            │  Instructors / students │
            │  Other MedEdPrep cos    │
            └─────────────────────────┘
```

Company B (Accreditation) feeds program-level compliance data into Company E.
Company D (Hospice) feeds operational data into Company E as it matures.

---

## Intercompany Relationships (Future State)

| From | To | Relationship | Agreement Type |
|---|---|---|---|
| The Vault | Companies A, B, C, D, E | IP licensing | Royalty agreements (0-15% of revenue, phased by maturity — see [transfer-pricing-implementation.md](../02-ip-strategy/transfer-pricing-implementation.md)) |
| Company E | Companies A, B, C | Data services, analytics, audit | Service agreements at FMV |
| Company A | Company E | Student performance data feed | Data sharing agreement |
| Company C | Company E | Certification exam data feed (aggregate) | Data sharing agreement |
| Company B | Company E | Program compliance data feed | Data sharing agreement |
| 501(c)(3) | Company A | Software access for HS programs | Purchase at FMV, funded by grants |
| 501(c)(3) | Company D | Hospice services/tools | Purchase at FMV, funded by grants |

---

## By the Numbers (Verified)

| Metric | Value | Source |
|---|---|---|
| Total items in database | ~10,600 (9,303 published) | [QUESTION-ANALYSIS-REPORT.md](../06-question-analysis/QUESTION-ANALYSIS-REPORT.md) |
| Total student responses | ~1.55 million | Live database query, 2026-04-06 |
| Peak monthly responses | 202,752 (March 2026) | Live database query |
| Item pools | Standard (2,521), Unit Exam (3,912), Exit Exam (1,580), Adaptive (2,616) | Live database query |
| NREMT nationally certified | ~551,693 (NREMT 2025 data) | competitive-positioning-analysis.md |
| Broader certified clinician base | ~620,000+ (includes state-only certifications) | capce-recert-by-exam-research.md |
| CE volume opportunity | ~14M CE hours/yr across certified base | capce-recert-by-exam-research.md |

---

## Implementation Timeline (Conceptual)

**Phase 1 — Foundation (Now)**
- Sell. Drive student and program adoption. Revenue is the engine for everything else.
- Stand up the 501(c)(3) with confirmed independent board
- Formalize IP ownership (what lives in The Vault)
- Establish basic intercompany agreements
- Begin psychometric validation (SME tagging, database analysis)
- Launch CAPCE-accredited CE "recert by exam"
- Continue building product (education + CoAssist already operating)
- Research and apply for available grants (MedEdPrep LLC as applicant)

**Phase 2 — Entity Separation (Year 1-2)**
- Form The Vault as Wyoming LLC
- Formally separate Company A, B, C as distinct Georgia LLCs
- Company C gets independent governance board
- Begin JTA for EMT certification (first credential to launch)
- CoAssist enters market as Company B product (still free)
- Company E pilot with Georgia state data

**Phase 3 — Certification Launch (Year 2-4)**
- EMT certification exam launches with bifactor model
- NCCA accreditation for EMT
- Paramedic and AEMT certifications follow
- CE pipeline calibrating items at scale
- Company E producing state/regional analytics
- State recognition campaign begins (Georgia first)

**Phase 4 — Expansion (Year 4-8)**
- EMR and PP credentials launch
- Full 5-level NCCA accreditation
- Trust ownership layer above The Vault
- Full transfer pricing documentation
- Self-hosted testing center when volume justifies
- ISO 17024 dual accreditation
- Multi-state recognition

---

## Complete Research Index

### 01-corporate-structure/ (14 files)
Entity design, governance, formation, and funding.

- **[entity-domicile-analysis.md](../01-corporate-structure/entity-domicile-analysis.md)** — State-by-state domicile analysis. Wyoming for The Vault (charging order protection). Georgia for all operating companies. Georgia addback statute (O.C.G.A. § 48-7-28.3) neutralizes state tax benefit of intercompany royalties.
- **[trust-ownership.md](../01-corporate-structure/trust-ownership.md)** — Revocable vs irrevocable trusts, DAPTs (Delaware/Nevada), asset protection, grantor vs non-grantor tax treatment, charging order protections.
- **[dual-entity-framework.md](../01-corporate-structure/dual-entity-framework.md)** — 501(c)(3) alongside for-profit: private inurement, private benefit, intermediate sanctions (Section 4958), board independence, COI policies, rebuttable presumption, UBIT.
- **[501c3-formation-design.md](../01-corporate-structure/501c3-formation-design.md)** — Complete formation blueprint: mission, 3 programs, board (5-seat, 80% independent), Georgia filing sequence, Form 1023 strategy, firewall, COI framework, 12-week timeline.
- **[501c3-articles-of-incorporation-draft.md](../01-corporate-structure/501c3-articles-of-incorporation-draft.md)** — Ready-to-file draft Articles of Incorporation for Georgia nonprofit.
- **[501c3-bylaws-outline.md](../01-corporate-structure/501c3-bylaws-outline.md)** — Complete bylaws outline (10 articles). Staggered terms, 2/3 independence threshold, 5 committees, dual-signature authority.
- **[501c3-coi-policy.md](../01-corporate-structure/501c3-coi-policy.md)** — Standalone Conflict of Interest Policy for Form 1023 Part V. Lists all MedEdPrep entities as Related Entities. Rebuttable presumption protocol. Annual Disclosure Statement template.
- **[501c3-30-day-action-plan.md](../01-corporate-structure/501c3-30-day-action-plan.md)** — Day-by-day checklist from incorporation decision through Form 1023 preparation.
- **[grant-strategy-comprehensive.md](../01-corporate-structure/grant-strategy-comprehensive.md)** — Master grant strategy: prioritized funding timeline, public charity support test analysis, Year 1 projections.
- **[grant-landscape.md](../01-corporate-structure/grant-landscape.md)** — Federal/state/private funding overview. Perkins V CTE as strongest early match.
- **[grant-landscape-private-foundations.md](../01-corporate-structure/grant-landscape-private-foundations.md)** — 20+ foundations evaluated, tiered. Firehouse Subs and Laerdal as top early targets.
- **[hrsa-programs.md](../01-corporate-structure/hrsa-programs.md)** — HRSA programs ranked. RHNDP ($100K planning grant) is #1 entry.
- **[federal-workforce-grants.md](../01-corporate-structure/federal-workforce-grants.md)** — FEMA AFG, DOL WIOA, SAMHSA analysis.
- **[georgia-state-funding.md](../01-corporate-structure/georgia-state-funding.md)** — GTC, OEMS, CTAE/Perkins V vendor pathway, State Office of Rural Health.

### 02-ip-strategy/ (5 files)
How IP moves into The Vault and flows to operating companies.

- **[ip-restructure.md](../02-ip-strategy/ip-restructure.md)** — Section 351 tax-free transfers, "all substantial rights" doctrine, boot/control prerequisites, IP valuation methodologies.
- **[intercompany-licensing.md](../02-ip-strategy/intercompany-licensing.md)** — Section 482, arm's length standard, Best Method Rule, SaaS royalty benchmarking, 10 Principal Documents.
- **[transfer-pricing-implementation.md](../02-ip-strategy/transfer-pricing-implementation.md)** — Practical implementation: phased royalty ramp (0% → 5-8% → 10-15%), intercompany agreement structures, "lite" TP study at current scale, dynasty trust jurisdiction comparison.
- **[software-asset-inventory.md](../02-ip-strategy/software-asset-inventory.md)** — Full software IP inventory. HIGH RISK: JpGraph (commercial, non-transferable), SurveyJS (commercial, needs transfer review), mpdf (GPL-2.0, swap for DOMPDF), ems-books-rag textbook content (copyrighted, exclude). ~95% of dependencies are MIT/Apache/BSD.
- **[software-asset-inventory.csv](../02-ip-strategy/software-asset-inventory.csv)** — CSV with 100+ software asset rows plus blank physical asset section.

### 03-market-landscape/ (15 files)
Industry context, regulatory environment, competitive analysis, and market strategy.

- **[healthcare-regtech.md](../03-market-landscape/healthcare-regtech.md)** — Healthcare RegTech structures: HealthStream, symplr, Relias. Hybrid nonprofit/for-profit models.
- **[certification-standards.md](../03-market-landscape/certification-standards.md)** — ISO 17024, NCCA, psychometric validation requirements, state-specific pathways, EMS Compact (REPLICA).
- **[accreditation-landscape.md](../03-market-landscape/accreditation-landscape.md)** — CoAEMSP monopoly, NASEMSO reform (not replacement), AEMT expansion, Company B pivot.
- **[advanced-practice-paramedic.md](../03-market-landscape/advanced-practice-paramedic.md)** — GEMR, I-CAPP (Suwanee GA), IBSC (NCCA-accredited since 2018), Kentucky 202 KAR 7:410.
- **[ncca-accreditation-path.md](../03-market-landscape/ncca-accreditation-path.md)** — NCCA process, costs, 21 standards, timeline. For-profit is allowed.
- **[perkins-v-funding-pathway.md](../03-market-landscape/perkins-v-funding-pathway.md)** — Georgia Perkins V / CTE deep dive: $51.2M allocation, vendor pathway, 60-100 HS EMS programs.
- **[certification-testing-infrastructure.md](../03-market-landscape/certification-testing-infrastructure.md)** — NCCA for-profit precedent, ISO 17024 comparison, test delivery vendors, self-hosted center economics (break-even ~2,000 tests/yr), CAT platform requirements.
- **[pp-credential-strategy.md](../03-market-landscape/pp-credential-strategy.md)** — PP positioning, I-CAPP engagement model, Kentucky 202 KAR 7:410 deep dive, eligibility design (3 pathways, no IBSC gatekeeper), state recognition strategy.
- **[item-security-and-bank-separation.md](../03-market-landscape/item-security-and-bank-separation.md)** — How NREMT/NBME/NCLEX/IBSC manage item security. CAT bank sizing (600-1,000 items). Minimum viable security vs. gold standard.
- **[coaemssp-compliance-landscape.md](../03-market-landscape/coaemssp-compliance-landscape.md)** — CoAEMSP pain points (57% cite cost, 50% time). No integrated compliance tool exists. AEMT expansion doubles market.
- **[competitive-positioning-analysis.md](../03-market-landscape/competitive-positioning-analysis.md)** — Full competitive analysis across all entities. Company A diagnostic reporting validated as industry-leading. Company B has clearest vacuum. Pearson consolidation is biggest risk.
- **[coassist-current-state.md](../03-market-landscape/coassist-current-state.md)** — CoAssist codebase: 27 feature areas, 85+ models, 58% CoAEMSP coverage / 26% partial / 16% gap.
- **[coassist-market-strategy.md](../03-market-landscape/coassist-market-strategy.md)** — Go-to-market strategy. **NOTE: Pricing section is outdated.** CoAssist is free permanently — loss-leader model. Revenue projections based on SaaS pricing do not apply.
- **[coassist-feature-gap-analysis.md](../03-market-landscape/coassist-feature-gap-analysis.md)** — Features mapped against CoAEMSP standards, Georgia OEMST requirements. Top 10 feature gaps ranked.
- **[capce-recert-by-exam-research.md](../03-market-landscape/capce-recert-by-exam-research.md)** — CAPCE accreditation requirements, NREMT recertification pathways, Company C can hold both NCCA + CAPCE. Volume math: 620K certified clinicians, ~14M CE hours/yr.

### 04-product-vision/ (18 files)
Psychometric foundations, measurement frameworks, competency design, product architecture.

- **[testing-vision.md](../04-product-vision/testing-vision.md)** — Original 10 foundational questions for the assessment system.
- **[database-retroactive-analysis-plan.md](../04-product-vision/database-retroactive-analysis-plan.md)** — 5-phase plan to validate cognitive process taxonomy using production database. Bifactor model for dual-validated items.
- **[psychometric-literature-review.md](../04-product-vision/psychometric-literature-review.md)** — No certification body uses bifactor for dual-purpose scoring. No validated EMS cognitive taxonomy exists. NCSBN's CJMM is closest analogue.
- **[cognitive-process-tagging-rubric.md](../04-product-vision/cognitive-process-tagging-rubric.md)** — Full 6-level EMS cognitive process taxonomy with definitions, decision rules, examples, inter-rater reliability protocol (kappa >= 0.70).
- **[validation-implementation-plan.md](../04-product-vision/validation-implementation-plan.md)** — Phase 0-5 with SQL queries, R script outlines, 16-week timeline, decision tree, risk register.
- **[item-selection-query.sql](../04-product-vision/item-selection-query.sql)** — Ready-to-run SQL against MedEdPrep database. First-attempt deduplication, classical item stats, discrimination index.
- **[tagging-operations-guide.md](../04-product-vision/tagging-operations-guide.md)** — Operational process: 2 taggers + 1 adjudicator, 50 items/batch, 7-day turnaround.
- **[data-quality-assessment-plan.md](../04-product-vision/data-quality-assessment-plan.md)** — Sufficiency thresholds (N>=200 for IRT), exam type ranking, red flags.
- **[certification-hierarchy-strategy.md](../04-product-vision/certification-hierarchy-strategy.md)** — Full 5-level credential hierarchy. NCCA sequencing (EMT first). Launch timeline (8-9 years full accreditation). Revenue projections ($95K-$285K Year 2 → $2.59M-$5.17M Year 8). NOTE: per-level item bank sizes and scored item counts are superseded by the individual competency framework documents below.
- **[emr-competency-framework.md](../04-product-vision/emr-competency-framework.md)** — 46 functions, 5 domains. 85 scored + 5-10 diagnostic. Item bank: 250-400 launch.
- **[emt-competency-framework.md](../04-product-vision/emt-competency-framework.md)** — 48 functions, 5 domains. 110 scored + 10-15 diagnostic. Item bank: 350-500 launch, 700-1,000 mature.
- **[aemt-competency-framework.md](../04-product-vision/aemt-competency-framework.md)** — 46 functions, 5 domains. 115 scored + 10-15 diagnostic.
- **[paramedic-competency-framework.md](../04-product-vision/paramedic-competency-framework.md)** — 52 functions, 5 domains. 130 scored + 15 diagnostic.
- **[pp-competency-framework.md](../04-product-vision/pp-competency-framework.md)** — 60 functions, 7 domains. 125 scored + 10-16 diagnostic. 18 functions exceed IBSC. 3 eligibility pathways.
- **[company-e-data-product-design.md](../04-product-vision/company-e-data-product-design.md)** — Product strategy for 5 customer segments. ATI Nursing ($750M) as model. Revenue: $20-90K Year 1 → $1.3-3.5M Year 5.
- **[company-e-technical-architecture.md](../04-product-vision/company-e-technical-architecture.md)** — Data flow, ETL pipeline, PostgreSQL warehouse, Metabase dashboards, RBAC, $215-430/mo Phase 1.
- **[pulse-item-types-psychometric-analysis.md](../04-product-vision/pulse-item-types-psychometric-analysis.md)** — All 16 Pulse item types classified for IRT. 7 certification-viable now. NREMT TEI mapping.
- **[ce-to-certification-item-pipeline.md](../04-product-vision/ce-to-certification-item-pipeline.md)** — Complete 9-stage item lifecycle. Firewall solution: CE as Company C product. At 3,000 CE examinees/yr: 90-150 items calibrated/yr. EMT launch-ready via CE pipeline: 3-4 years (certification exam can launch earlier with newly written items). NOTE: Source A description should read "~10,600 items with ~1.55 million responses" (not "hundreds of thousands of items").

### 05-gaps-and-questions/ (1 file)
- **[RESEARCH-QUEUE.md](../05-gaps-and-questions/RESEARCH-QUEUE.md)** — Prioritized research gaps with status tracking.

### 06-question-analysis/ (1 file)
- **[QUESTION-ANALYSIS-REPORT.md](../06-question-analysis/QUESTION-ANALYSIS-REPORT.md)** — Authoritative item count and response data from live database query (2026-04-06).

---

## Founder Decisions Still Needed

1. **501(c)(3) name** — TBD
2. **Certification body brand** — Company C needs a name separate from MedEdPrep
3. **Exam pricing** — per level, relative to NREMT
4. **Dual-certification positioning** — NREMT + Company C, or replacement?
5. **PP JTA timing** — start parallel with EMT or wait?
6. **I-CAPP engagement** — initiate contact?
7. **Kentucky KBEMS outreach** — contact about PP regulatory pathway?

---

*Last updated: 2026-04-13*
