# JetPack Competitive Audit

**Priority:** P0 — CRITICAL
**Touches:** CoAssist strategy, entire product roadmap
**Deadline context:** July 2026 meeting with CoAEMSP (George & JD)
**Last updated:** 2026-06-01

## Situation

At ACCREDITCON 2026, CoAEMSP announced they are going with JetPack (https://vainc.com/) as their mandatory Accreditation Management Software (AMS). Expected effective Summer 2027.

This was NOT anticipated. In April 2026, CoAEMSP had only announced they were beginning to develop a plan for an AMS. They moved far faster than expected.

---

## THE CRITICAL FINDING

**JetPack is built for ACCREDITORS, not for programs.**

This is the single most important takeaway from this research. JetPack (by Virtual Atlantic / VA, Inc.) markets itself as "The Only Accreditation Management Platform Designed Exclusively for Accreditors by the Experts Who Understand Your World."

Their entire product, positioning, client base, and architecture is designed to serve the **accrediting body** (CoAEMSP) — NOT the individual EMS education programs that go through accreditation.

**CoAssist is built for PROGRAMS** — the EMS education programs that are being accredited.

These are fundamentally different products serving different sides of the same process. This is NOT a direct replacement scenario.

---

## JetPack Profile

### Company
- **Name:** Virtual Atlantic (VA, Inc.)
- **Product:** JETPACK® (registered trademark)
- **Website:** https://vainc.com
- **Positioning:** "Accreditation Management Software For Accreditors"
- **Founded focus:** Has spent "the better part of the last decade" in accreditation technology

### Existing Clients (Accrediting Bodies)
- AACP (American Association of Colleges of Pharmacy)
- ACEP (American College of Emergency Physicians)
- ACPE (Accreditation Council for Pharmacy Education)
- BBB (Better Business Bureau)
- CSI (Christian Schools International)
- IACBE (International Accreditation Council for Business Education)
- LCMS (Lutheran Church - Missouri Synod)
- NAAB (National Architectural Accrediting Board)
- ODHE (Ohio Dept of Higher Education)
- Whatcom (community college)

**Note:** All clients are accrediting/regulatory bodies, NOT individual programs or schools. This confirms JetPack's accreditor-side positioning.

### What JetPack Does (Accreditor Side)
1. **Standards Management** — Configure and organize accreditation standards frameworks
2. **Self-Study Submission Portal** — Programs submit evidence through a portal
3. **Peer Review Coordination** — Manage site visits, virtual reviews, reviewer assignments
4. **Commission/Board Decisions** — Workflow for committee and board deliberations
5. **Document Management** — Centralized storage with audit trails
6. **Compliance Tracking** — Monitor program compliance across cycles
7. **Reporting/Analytics** — Benchmark reporting, trend analysis, longitudinal data
8. **Automated Notifications** — Triggers, reminders, task management
9. **Role-Based Permissions** — Separate access for staff, reviewers, commissioners, programs
10. **Reaccreditation Cycle Management** — Historical data carries across cycles

### Accreditation Types Supported
- **CE/CME Accreditation** — Provider management, LMS integration, standards tracking
- **Programmatic Accreditation** — Program-specific criteria, multiple standards
- **Institutional Accreditation** — Broad-spectrum compliance, KPI tracking

### Pricing
- **Not publicly listed** — "Contact vendor for pricing"
- One review noted: "the cost may seem prohibitive up front" but described as a total package with no hidden fees, no limits on applications/surveys
- Competitor ARMATURE lists at $24,000/month for comparison
- Subscription model (no long-term contracts — VA explicitly says they won't lock you in)

### Reviews
- **Only 4 reviews total** across Capterra/SoftwareAdvice/GetApp (all 5.0/5.0)
- All reviewers are from accreditor-side organizations (Higher Ed, Pharma, Biotech)
- Reviewers praise: customizability, collaborative implementation, responsive team
- One reviewer switched FROM Qualtrics (XM for Strategy & Research)
- Small user base — this is a niche, high-touch enterprise product

### Technology
- Web-based (also Android/iPhone access)
- Built on WordPress/Elementor (marketing site)
- Integrations: Google Docs, Google Forms, Google Charts, Google Tag Manager, QuickBooks, Salesforce
- HIPAA compliant
- SSO capable

### Key Quotes
- "Accreditors and the end users they accredit are completely different types of entities with very different needs; VA knows that" — JetPack Difference page
- "VA won't: A la carte every feature. Implementation should be all-encompassing, not piecemeal." — VA philosophy
- "No limits to the complexity of the system and reporting you want to build" — Reviewer

---

## How JetPack Will Likely Work for CoAEMSP

When CoAEMSP adopts JetPack, the expected flow is:

```
CoAEMSP (uses JetPack internally)
    ↓
Programs submit self-study, annual reports, evidence → through JetPack's PORTAL
    ↓
CoAEMSP staff manage review cycles, assign site visitors → in JetPack
    ↓
Commission deliberates, makes decisions → in JetPack
    ↓
Programs receive decisions, track compliance → through JetPack's PORTAL
```

**Programs will interact with JetPack as end-users of a portal**, not as administrators of the platform. The portal experience will likely be functional but limited — focused on submission and receiving decisions, not on internal program management.

---

## What This Means for CoAssist

### What JetPack REPLACES (Overlap)
- Self-study submission workflow (programs will submit through JetPack instead)
- Annual report submission to CoAEMSP
- Some document storage (whatever CoAEMSP requires goes through JetPack)
- Communication channel with CoAEMSP during accreditation cycles

### What JetPack DOES NOT Replace (CoAssist's Moat)
- **Internal program management** — Day-to-day operations that programs run
- **Student tracking and outcomes** — Enrollment, grades, clinical hours, completion rates
- **Graduate tracking and employer surveys** — Longitudinal outcome data
- **Internal compliance preparation** — Getting ready BEFORE you submit to CoAEMSP
- **Curriculum management** — Course mapping, clinical scheduling, skills tracking
- **Multi-role program management** — Medical directors, program directors, clinical coordinators
- **Institutional-level dashboards** — For sponsors/schools overseeing multiple programs
- **Real-time readiness assessment** — "Are we compliant?" before the site visit

### The Gap JetPack Creates
JetPack gives CoAEMSP a way to receive and manage program data. But programs still need to:
1. Collect and organize that data internally
2. Prepare their self-study documentation
3. Track ongoing compliance between submission cycles
4. Manage the day-to-day operations that produce the data CoAEMSP wants

**CoAssist can be the engine that FEEDS JetPack.**

---

## Strategic Positioning Options

### Option A: Integration Partner (RECOMMENDED)
Position CoAssist as the program-side complement to JetPack. Programs use CoAssist for internal management, and CoAssist exports/feeds data into JetPack when submission time comes.

**Pitch to CoAEMSP (July meeting):** "JetPack gives you the receiving end. CoAssist gives programs the sending end. Together, you get better data, more consistent submissions, and happier program directors."

**Pros:** Creates a symbiotic relationship. Makes CoAssist more valuable, not less. Could lead to CoAEMSP recommending CoAssist to programs.
**Cons:** Requires JetPack/VA to be open to API integration. Dependency on their cooperation.

### Option B: Program-Side Prep Tool
Position CoAssist purely as the "get ready for accreditation" tool. Programs use CoAssist year-round to manage operations and track compliance. When it's time to submit to CoAEMSP via JetPack, they export from CoAssist.

**Pitch:** "CoAssist is where you do the work. JetPack is where you submit the results."

**Pros:** No dependency on JetPack cooperation. Clear lane separation.
**Cons:** Programs might find it annoying to use two systems.

### Option C: Expand Beyond Accreditation
Use this as a catalyst to expand CoAssist's value proposition beyond just accreditation management. Add features like:
- Full LMS capabilities
- Clinical scheduling and tracking (already have Clinicals)
- Student information system features
- CE management (already building Pulse CE)

**Pitch:** "CoAssist is your entire program management platform. Accreditation is one output, not the whole product."

**Pros:** Bigger TAM, less dependent on CoAEMSP decisions.
**Cons:** Scope creep, harder to differentiate.

---

## What We Don't Know Yet (July Meeting Questions)

1. **What does JetPack's program-facing portal actually look like?** How much can programs do in it?
2. **Does JetPack have an API?** Can external systems push data into it?
3. **What's the timeline?** Is Summer 2027 firm or aspirational?
4. **What's the cost to programs?** Does CoAEMSP absorb the cost, or do programs pay?
5. **Will programs be REQUIRED to use JetPack's portal exclusively?** Or can they submit data through other channels?
6. **Is CoAEMSP open to recommending complementary tools?**
7. **What data format will JetPack expect from programs?** This informs our export capabilities.
8. **Has JetPack worked with EMS accreditation before?** Their current clients are pharmacy, business, architecture, Christian schools — NOT EMS.

---

## CoAEMSP Official Announcement (2026-06-01)

CoAEMSP sent an official email newsletter announcing JetPack on June 1, 2026. Key details:

**People named:**
- **Dr. Michael J. Souter** — CoAEMSP Board Chair
- **Austin Farshi** — Virtual Atlantic President
- **Dr. George Hatch** — CoAEMSP Executive Director (the "George" from our July meeting)

**Timeline quote:** "The rollout will be iterative and carefully evaluated before full implementation, which is anticipated in summer 2027" — Austin Farshi

**Why quote:** "The AMS is being developed to simplify a process that can be cumbersome, and which currently relies on technology that is outdated" — Dr. Souter

**Success story:** Referenced IACBE (business education accreditor) who implemented JetPack in 2025.

**Benefits framed TO PROGRAMS (their exact language):**
1. Streamlined Workflows — "one-stop shop" guiding programs through steps, timelines, documentation
2. Centralized Digital Integration — all accreditation data in one secure system
3. Real-Time Collaboration — secure portals for programs, reviewers, and staff
4. Dynamic Reporting Tools — customized, data-driven reports

**What CoAEMSP's current system apparently looks like:** "eliminate many manual processes, including downloading spreadsheets and managing file naming conventions"

**Note:** Virtual Atlantic's president (Austin Farshi) did the opening before the ACCREDITCON keynote, which MedEdPrep sponsored. The CEO of the company replacing your current approach opened the conference you paid to sponsor. Worth noting for the July conversation.

---

## Recommended Action Plan

### Before July Meeting
1. Build a CoAssist feature inventory (what we do today)
2. Create a demo showing how CoAssist data could flow into an AMS portal
3. Prepare a one-pager: "How CoAssist Complements JetPack"
4. Research JetPack's API capabilities (or lack thereof)
5. Talk to VA/Virtual Atlantic if possible — understand their partner ecosystem

### At July Meeting
1. Ask all the questions in the "What We Don't Know" section
2. Present CoAssist as a complementary tool, not a competitor
3. Propose a pilot: CoAssist → JetPack data pipeline for a few programs
4. Gauge CoAEMSP's receptiveness to recommending program-side tools

### After July Meeting
1. Adjust strategy based on answers
2. If integration path exists: build the CoAssist → JetPack connector
3. If no integration path: double down on Option B (prep tool) or Option C (expand)

---

## Status

**Research phase: COMPLETE (2026-06-01)**
Awaiting CoAssist feature inventory for parity comparison.
Next: Prepare July meeting materials.
