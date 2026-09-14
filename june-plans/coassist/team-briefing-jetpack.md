# Team Briefing: The JetPack Announcement

**Date:** June 1, 2026
**From:** Jeramey
**To:** Full team
**Classification:** Internal — read fully before responding to anyone externally

---


## What Is JetPack?

[JetPack](https://vainc.com) is an accreditation management platform built by Virtual Atlantic, a company that has spent the better part of the last decade building software exclusively for accrediting bodies. Their tagline: *"The Only Accreditation Management Platform Designed Exclusively for Accreditors by the Experts Who Understand Your World."*

Key facts about Virtual Atlantic and JetPack:

- **Website:** [vainc.com](https://vainc.com) | [Meet JetPack features page](https://vainc.com/meet-jetpack/)
- **Existing clients** (all accrediting bodies, not programs):
  - AACP (American Association of Colleges of Pharmacy)
  - ACPE (Accreditation Council for Pharmacy Education)
  - IACBE (International Accreditation Council for Business Education)
  - CSI (Christian Schools International) — [adoption case study](https://csionline.org/csi-accreditation-introduces-new-accreditation-management-software/)
  - NAAB (National Architectural Accrediting Board)
  - ACEP (American College of Emergency Physicians)
  - LCMS (Lutheran Church - Missouri Synod)
  - ODHE (Ohio Department of Higher Education)
  - BBB (Better Business Bureau)
- **Reviews:** Only [4 reviews on Capterra](https://www.capterra.com/p/174191/Jetpack/) — all 5.0/5.0, all from accreditor-side organizations. Also listed on [GetApp](https://www.getapp.com/education-childcare-software/a/jetpack/) and [Software Advice](https://www.softwareadvice.com/accreditation-management/jetpack-accreditation-management-profile/).
- **Pricing:** Not publicly listed. Enterprise, quote-only. One reviewer noted "the cost may seem prohibitive up front." A comparable competitor (ARMATURE) lists at $24,000/month.
- **EMS experience:** None. Their current verticals are pharmacy, business education, architecture, Christian schools, and regulatory bodies.

**The critical detail every team member needs to understand: JetPack is built for accreditors, not for programs.** Every single one of their clients is an accrediting body or regulatory organization. They serve the people who *run* accreditation, not the people who *go through* it.

From JetPack's own website:

> "Accreditors and the end users they accredit are completely different types of entities with very different needs; VA knows that."

---

## The CoAEMSP Announcement

On June 1, 2026, CoAEMSP sent an official email newsletter announcing JetPack as their mandatory AMS. Three people were quoted:

> **Dr. Michael J. Souter, CoAEMSP Board Chair:**
> "The AMS is being developed to simplify a process that can be cumbersome, and which currently relies on technology that is outdated."

> **Austin Farshi, Virtual Atlantic President:**
> "The rollout will be iterative and carefully evaluated before full implementation, which is anticipated in summer 2027."

> **Dr. George Hatch, CoAEMSP Executive Director:**
> "CoAEMSP is excited to take this important step to create a comprehensive data management strategy that improves efficiency and value for programs and accreditation teams alike."

The email referenced **IACBE** (the business education accreditor) as the success story — IACBE implemented JetPack in September 2025.

Benefits were framed to programs as:
1. **Streamlined Workflows** — a "one-stop shop" guiding programs through steps, timelines, and documentation
2. **Centralized Digital Integration** — all accreditation data in one secure system
3. **Real-Time Collaboration** — secure portals for programs, reviewers, and staff
4. **Dynamic Reporting Tools** — customized, data-driven reports

The announcement also revealed what CoAEMSP's *current* system looks like: manual processes, downloading spreadsheets, and managing file naming conventions. JetPack replaces that — on the CoAEMSP side.


---

## The Critical Distinction: Accreditor vs. Program

This is the single most important thing in this entire document. Read it twice if you need to.

**JetPack serves the ACCREDITOR. CoAssist serves the PROGRAM. These are fundamentally different products serving different sides of the same process.**

### The TurboTax / IRS Analogy

Think of it this way:

- **JetPack is the IRS.** It is the system where you file your taxes. It receives your forms, processes them, tracks your compliance, and issues decisions.
- **CoAssist is TurboTax.** It is the tool that helps you *prepare* your taxes. It organizes your financial data, identifies what you owe, flags problems before you file, and generates the documents you submit.

The IRS building a better filing portal does not put TurboTax out of business. It makes TurboTax *more necessary* — because now there is a specific, structured system you need to prepare for.

### The Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        EMS PROGRAM                              │
│                                                                 │
│   CoAssist manages the INTERNAL work:                          │
│   - Personnel credentials & expiration alerts (8+ roles)       │
│   - Student outcomes (NREMT, retention, placement)             │
│   - Clinical sites, preceptors, agreements                     │
│   - Advisory committee meetings & QR check-in                  │
│   - Graduate & employer surveys                                │
│   - Self-study drafting (AI-assisted)                          │
│   - Gap analysis against 80+ CoAEMSP standards                │
│   - Site visit preparation (40+ item checklist)                │
│   - Appendices E, F, G, H auto-generation                     │
│                                                                 │
│   ┌──────────────────────────────────────────────┐             │
│   │         CoAssist → JetPack Export            │             │
│   │  • Completed self-study report               │             │
│   │  • Auto-generated appendices                 │             │
│   │  • Outcome data & annual report data         │             │
│   │  • Evidence documents                        │             │
│   └────────────────────┬─────────────────────────┘             │
│                        │                                        │
└────────────────────────┼────────────────────────────────────────┘
                         │
                         ▼  SUBMISSION
┌─────────────────────────────────────────────────────────────────┐
│                    CoAEMSP (JetPack)                            │
│                                                                 │
│   JetPack manages the ACCREDITOR'S work:                       │
│   - Receiving & organizing submissions                         │
│   - Assigning peer reviewers & site visitors                   │
│   - Coordinating review workflows                              │
│   - Commission/board deliberations & decisions                 │
│   - Cross-program benchmarking & compliance monitoring         │
│   - Reaccreditation cycle management                           │
│   - Automated notifications & reporting                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

PROGRAM SIDE (CoAssist)          ACCREDITOR SIDE (JetPack)
Where you PREPARE                Where you SUBMIT
Where you do the WORK            Where you get the DECISION
Built for program directors      Built for CoAEMSP staff
Free                             Enterprise-priced
EMS-native from day one          New to EMS
```

Programs will interact with JetPack as end-users of a submission portal — uploading documents, checking status, receiving decisions. They will NOT use JetPack to run their day-to-day program operations, track their students, manage their clinical sites, or prepare their self-studies.

**CoAssist is where programs do the work. JetPack is where they submit the results.**

---

## Evidence from Other Verticals

We are not guessing about this distinction. It already exists in other accreditation ecosystems:

### IACBE (Business Education) — JetPack + Kramah Ki

IACBE implemented JetPack in September 2025. It is the reference implementation CoAEMSP cited in their announcement. Here is what the ecosystem actually looks like:

- **JetPack** handles the accreditor side: submissions, review coordination, compliance tracking
- **[Kramah Ki-IACBE](https://www.kramah.com/iacbe-software/)** is a third-party, program-side tool that helps business schools prepare for IACBE accreditation — Assurance of Learning reporting, evidence management, faculty credential tracking, gap analysis, and self-study preparation
- Kramah Ki costs an estimated **$5,000–$15,000/year** per program
- JetPack and Kramah Ki are not integrated. They are separate tools serving separate sides. Schools prepare in Kramah Ki, then submit through JetPack

**The existence of Kramah Ki proves the market pattern: accreditor portals do not eliminate the need for program-side prep tools. They create demand for them.**

### ACPE (Pharmacy Education) — PHARMS

ACPE uses **PHARMS** (Pharmacy Accreditation Report Management System) for pharmacy school accreditation submissions. ACPE explicitly states:

> **PHARMS "is not meant to be used for data collection."** It is designed for creation and submission of the final report only.

Programs still need their own tools to collect data, run assessments, and prepare evidence. The official portal is the endpoint, not the workspace.

### AACP (Pharmacy Education) — Three Concurrent Systems

AACP is currently running **three systems simultaneously** during their JetPack transition: AAMS (legacy), Survey System 1.0, and Jetpack Survey System 2.0. AAMS does not sunset until December 31, 2026. Even for an established accreditor, the JetPack transition takes 1–2 years of parallel systems. Programs using AACP's systems must export data manually between them.

### Enflux (Pharmacy Prep Layer)

**[Enflux](https://enflux.com)** functions as the program-side analytics and prep layer for pharmacy schools facing accreditation. It pulls data from testing platforms and clinical management systems into accreditation-ready dashboards. It is widely considered essential for pharmacy programs facing "Standards 2025" requirements — even though ACPE has its own mandatory submission portal.

### The Pattern

In every vertical where JetPack (or a similar accreditor AMS) exists, program-side tools also exist — and they charge thousands of dollars per year. The accreditor portal handles receiving. The prep tool handles preparing. These are separate markets serving separate customers.

**CoAssist is the EMS version of this pattern. And it is free.**

---

## Feature Comparison: JetPack vs. CoAssist

These products do not overlap. They complement.

### What JetPack Does (Accreditor Side)

| Capability | JetPack | CoAssist |
|---|:---:|:---:|
| Standards framework configuration | Yes (accreditor defines) | -- |
| Receive & manage program submissions | Yes | -- |
| Assign & coordinate peer reviewers | Yes | -- |
| Schedule & manage site visits | Yes | -- |
| Commission/board decision workflows | Yes | -- |
| Cross-program benchmarking & reporting | Yes | -- |
| Compliance monitoring (all programs) | Yes | -- |
| Reaccreditation cycle management | Yes | -- |

### What CoAssist Does (Program Side)

| Capability | JetPack | CoAssist |
|---|:---:|:---:|
| 80+ CoAEMSP standards pre-loaded | -- | Yes |
| AI-powered gap analysis | -- | Yes |
| AI-assisted narrative/self-study drafting | -- | Yes |
| Personnel & credential management (8+ roles) | -- | Yes |
| Credential expiration alerts | -- | Yes |
| Student outcome tracking (NREMT, retention, placement) | -- | Yes |
| 70% threshold alerts | -- | Yes |
| Clinical site & affiliate management | -- | Yes |
| Preceptor management & credentials | -- | Yes |
| Agreement expiration tracking | -- | Yes |
| Advisory committee management | -- | Yes |
| Advisory committee QR check-in | -- | Yes |
| Meeting minutes & action items | -- | Yes |
| Graduate & employer surveys (automated) | -- | Yes |
| RAM surveys (11 domains) | -- | Yes |
| Site visit prep checklist (40+ items) | -- | Yes |
| Appendices auto-generation (E, F, G, H) | -- | Yes |
| Cohort management & comparison | -- | Yes |
| Outcome Action Plans | -- | Yes |
| Substantive change tracking | -- | Yes |
| Medical director engagement tracking | -- | Yes |
| Physical document location mapping | -- | Yes |
| CSV bulk import | -- | Yes |

### Where Both Operate (Different Perspectives)

| Capability | JetPack | CoAssist |
|---|---|---|
| Self-study workflow | Receives submissions | Creates & drafts submissions |
| Annual reports | Receives reports | Prepares report data |
| Compliance dashboard | Bird's eye across all programs | Deep dive per program, weighted scoring |
| Site visit management | Sends site visitors | Prepares programs for site visitors |
| Document management | Centralized accreditor storage | Program-side evidence organization |
| Role-based access | Yes | Yes (18-role RBAC) |
| Audit trail | Yes | Yes (dual audit system, append-only) |
| API | Yes (listed) | Yes (REST, SSE) |

### Platform Details

| | JetPack | CoAssist |
|---|---|---|
| **Cost** | Enterprise, quote-only — estimated ~$10K+/month based on [competitor pricing](https://www.capterra.com/p/143217/ARMATURE/) and [reviewer feedback](https://www.capterra.com/p/174191/Jetpack/) noting "prohibitive up front" | Free — no fees, no tiers |
| **Target user** | Accrediting bodies ([vainc.com](https://vainc.com)) | EMS education programs |
| **EMS experience** | None — current verticals are pharmacy, business, architecture, Christian schools ([client logos on homepage](https://vainc.com)) | Purpose-built for CoAEMSP standards |
| **Maturity** | ~10 years in accreditation tech, multiple live accreditors ([vainc.com/the-jetpack-difference](https://vainc.com/the-jetpack-difference/)) | Newer, single-vertical focus |
| **Mobile** | Android/iOS ([Capterra](https://www.capterra.com/p/174191/Jetpack/)) | PWA |
| **Data ownership** | Through accreditor | Full export, non-proprietary formats |

---

## What This Means for Us — The Opportunity

Here is the honest strategic picture:

**Before this announcement,** EMS programs had no mandatory digital submission system. Accreditation was spreadsheets, emails, and Word documents. Programs could get through the process — painfully — without any specialized software. CoAssist made their lives easier, but the urgency was diffuse.

**After this announcement,** every single EMS education program in the country is about to face a mandatory new digital system they have never used before. Summer 2027 is not far away. Program directors are going to need to:

1. Organize all their program data in a way that maps to the new system
2. Prepare submissions in whatever format JetPack expects
3. Transition from their current (manual, messy) workflows to a structured digital process
4. Do all of this while still running their programs day-to-day

**CoAssist is the answer to every single one of those problems.** And we are free.

JetPack being mandatory creates urgency that did not exist before. Every program director who reads that CoAEMSP email is now thinking about how they are going to manage this transition. The ones who find CoAssist will have their data organized, their standards mapped, their self-study drafted, and their gaps identified before JetPack goes live. The ones who do not will be starting from scratch on a system they do not understand.

This is a growth catalyst, not a threat. The addressable market just got a deadline attached to it.

---

## Our Position

Here is where we stand:

| Asset | Status |
|---|---|
| **The only free, EMS-native accreditation prep tool** | Live and production-ready |
| **80+ CoAEMSP standards** | Pre-loaded and mapped |
| **AI-powered features** | Gap analysis, narrative drafting, compliance scoring — capabilities no accreditor portal has incentive to build |
| **ACCREDITCON 2026** | Busiest booth, keynote sponsor, 55 leads collected |
| **July meeting with Dr. George Hatch** | CoAEMSP Executive Director — the person leading the JetPack rollout |
| **EMS-native from day one** | JetPack has never served EMS. We have 80+ standards built for it |
| **Free** | [Kramah Ki](https://www.kramah.com/iacbe-software/) charges $5K–$15K/year. [Enflux](https://enflux.com) is enterprise-priced. We charge nothing |

JetPack's own philosophy supports our position. From their website: *"VA won't: A la carte every feature. Implementation should be all-encompassing, not piecemeal."* They are building a comprehensive accreditor platform. They are not building program-side operational tools. That is our lane.

When program directors look at JetPack's portal and think "this is where I submit, but where do I *prepare*?" — the answer is CoAssist.

---

## Next Steps

### July Meeting with Dr. George Hatch and JD

This is the most important meeting on our calendar. We have prepared extensively. The strategy:

1. **Lead with curiosity, not pitch.** Spend the first half understanding JetPack's rollout plan, timeline, program portal capabilities, and CoAEMSP's vision. Show we have done our homework.

2. **Position CoAssist as the complement.** The frame is always: "JetPack gives CoAEMSP a modern way to manage accreditation. CoAssist gives programs a modern way to prepare for it. Together, you get better submissions, more accurate data, and less burden on your staff."

3. **Propose a pilot.** Ask if a small group of programs could use CoAssist alongside JetPack during the rollout, generating data on whether the combination improves submission quality.

4. **Ask for the VA introduction.** Request that CoAEMSP facilitate a connection with Virtual Atlantic to explore integration possibilities.

Key questions we need answered:
- What does JetPack's program-facing portal actually look like?
- Does JetPack have an API for external systems to push data?
- What is the exact rollout timeline? Pilot cohort or big bang?
- Will programs bear any cost?
- Is CoAEMSP open to recommending complementary tools?
- How has CoAEMSP ensured JetPack will accommodate EMS-specific needs (clinical requirements, psychomotor competencies, field internship tracking)?

### Before the July Meeting

- Finalize the one-pager: ["How CoAssist Complements JetPack"](july-meeting-one-pager.md) (draft complete)
- Prepare a live demo showing how CoAssist data could flow into an AMS portal
- Research JetPack's API capabilities further
- Follow up with all 55 ACCREDITCON leads — the JetPack announcement is the perfect conversation starter

### What the Team Should Know Right Now

- **If anyone asks you about JetPack:** "We have studied it closely. JetPack is built for CoAEMSP — it is their management platform. CoAssist is built for programs — it is where you prepare. They are complementary tools serving different sides of the same process. We are meeting with CoAEMSP leadership in July to discuss how they work together."

- **Do not say** JetPack competes with us. It does not.

- **Do not say** we are worried. We are not.

- **Do say** this makes our value proposition even clearer. When every program needs to submit through a new digital system, the programs using CoAssist will be ready. That is the message.

---

## Key Dates

| Date | Event |
|---|---|
| **May 28, 2026** | ACCREDITCON 2026 — busiest booth, 55 leads, keynote sponsor |
| **June 1, 2026** | CoAEMSP official JetPack announcement email |
| **July 2026** | Meeting with Dr. George Hatch (CoAEMSP Executive Director) and JD |
| **Summer 2027** | JetPack full implementation anticipated (per Austin Farshi) |

## Key People

| Name | Role | Relevance |
|---|---|---|
| **Dr. George Hatch** | CoAEMSP Executive Director | Our July meeting contact. Leading the JetPack rollout. Quoted in the announcement. |
| **Dr. Michael J. Souter** | CoAEMSP Board Chair | Quoted in the announcement. Decision-maker on the AMS. |
| **Austin Farshi** | President, Virtual Atlantic | Built JetPack. Opened ACCREDITCON before the keynote MedEdPrep sponsored. |
| **JD** | CoAEMSP (role TBD) | Attending July meeting alongside Dr. Hatch. |

## Key Links

| Resource | URL |
|---|---|
| Virtual Atlantic / JetPack | [vainc.com](https://vainc.com) |
| JetPack Features | [vainc.com/meet-jetpack](https://vainc.com/meet-jetpack/) |
| JetPack Reviews (Capterra) | [capterra.com/p/174191/Jetpack](https://www.capterra.com/p/174191/Jetpack/) |
| JetPack Reviews (GetApp) | [getapp.com/.../jetpack](https://www.getapp.com/education-childcare-software/a/jetpack/) |
| JetPack Reviews (Software Advice) | [softwareadvice.com/.../jetpack](https://www.softwareadvice.com/accreditation-management/jetpack-accreditation-management-profile/) |
| CSI JetPack Adoption | [csionline.org/...](https://csionline.org/csi-accreditation-introduces-new-accreditation-management-software/) |
| Kramah Ki-IACBE (program-side precedent) | [kramah.com/iacbe-software](https://www.kramah.com/iacbe-software/) |
| Enflux (pharmacy prep layer) | [enflux.com](https://enflux.com) |
| IACBE JetPack Overview Webinar | [YouTube](https://www.youtube.com/watch?v=tqGtiFdnA8k) |

---

*This briefing is based on extensive research conducted June 1, 2026, including competitive audits of JetPack, feature parity analysis, IACBE rollout research, accreditation prep tool landscape analysis across multiple verticals, and review of all publicly available JetPack documentation and reviews. Full research files are available in the coassist planning directory.*
