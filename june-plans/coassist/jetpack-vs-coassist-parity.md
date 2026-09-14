# JetPack vs CoAssist — Parity Analysis

**Date:** 2026-06-01
**Purpose:** Feature-by-feature comparison to inform July CoAEMSP meeting strategy

---

## TL;DR

These products don't compete. They serve opposite sides of the accreditation process.

| | JetPack | CoAssist |
|---|---------|----------|
| **Built for** | Accrediting bodies (CoAEMSP) | EMS education programs |
| **User** | CoAEMSP staff, site visitors, commissioners | Program directors, faculty, clinical coordinators |
| **Purpose** | Manage the accreditation process | Prepare for and maintain accreditation |
| **Pricing** | Enterprise (undisclosed, likely $10K+/mo) | Free — no fees, no tiers, no credit card |
| **Reviews** | 4 total (all 5-star) | N/A (newer) |
| **EMS experience** | None (pharmacy, architecture, Christian schools) | Purpose-built for EMS/CoAEMSP |

---

## Side-by-Side Feature Comparison

### Accreditation Lifecycle Management

| Feature | JetPack | CoAssist | Notes |
|---------|:-------:|:--------:|-------|
| Standards framework configuration | Yes (accreditor configures) | Yes (80+ CoAEMSP standards pre-loaded) | JetPack: accreditor defines. CoAssist: pre-built for CoAEMSP. |
| Self-study submission portal | Yes (receives submissions) | Yes (creates/drafts submissions) | JetPack = mailbox. CoAssist = the letter writer. |
| AI-assisted narrative drafting | No | Yes | CoAssist generates first drafts from program data |
| Peer review coordination | Yes | No | JetPack manages reviewer assignments and workflows |
| Site visit management | Yes (schedules, assigns visitors) | Yes (40+ item prep checklist, countdown roadmap) | Different sides: JetPack sends visitors, CoAssist prepares for them |
| Commission decisions | Yes | No | JetPack manages board deliberations |
| Annual report submission | Yes (receives) | Yes (prepares) | Same pattern: CoAssist prepares, JetPack receives |
| Compliance dashboard | Yes (across all programs) | Yes (per-program, weighted scoring) | JetPack: bird's eye across programs. CoAssist: deep dive per program. |
| Gap analysis | No | Yes (AI-powered) | CoAssist identifies compliance risks before submission |
| Reaccreditation cycle tracking | Yes | Yes (timeline & deadline management) | Both track cycles, from different perspectives |

### Program Operations (CoAssist's Territory)

| Feature | JetPack | CoAssist |
|---------|:-------:|:--------:|
| Student outcome tracking (NREMT, retention, placement) | No | Yes |
| 70% threshold alerts | No | Yes |
| Personnel & credential management (8+ roles) | No | Yes |
| Credential expiration alerts | No | Yes |
| Medical director engagement tracking | No | Yes |
| Advisory committee management | No | Yes |
| Advisory committee QR check-in | No | Yes |
| Meeting minutes & action items | No | Yes |
| Clinical site/affiliate management | No | Yes |
| Preceptor management & credentials | No | Yes |
| Agreement expiration tracking | No | Yes |
| Field internship/capstone tracking | No | Yes |
| Cohort management | No | Yes |
| Graduate & employer surveys | No | Yes (automated distribution) |
| RAM surveys (11 domains) | No | Yes |
| Outcome Action Plans | No | Yes |
| Substantive change tracking | No | Yes |
| Appendices auto-generation (E, F, G, H) | No | Yes |
| Physical document location mapping | No | Yes |
| Student competency matrix (SMC) | No | Yes |
| CSV bulk import (cohorts, affiliates, preceptors) | No | Yes |

### Platform & Technical

| Feature | JetPack | CoAssist |
|---------|:-------:|:--------:|
| Role-based access control | Yes | Yes (18-role RBAC) |
| Audit trail | Yes | Yes (dual audit system, append-only) |
| Auditor access tokens | Unknown | Yes (temporary, time-limited) |
| Document management | Yes | Yes |
| MFA | Unknown | Yes (TOTP) |
| API | Yes (listed) | Yes (REST, SSE) |
| SSO | Yes | No (on roadmap) |
| Mobile access | Yes (Android/iOS) | Yes (PWA) |
| Integrations | Google Suite, Salesforce, QuickBooks | SendGrid, AWS, LMS-agnostic |
| HIPAA compliant | Yes | Yes (encryption, security headers) |

### Reporting & Analytics

| Feature | JetPack | CoAssist |
|---------|:-------:|:--------:|
| Cross-program benchmark reporting | Yes | No (single-program focus) |
| Trend analysis across programs | Yes | Per-program trending |
| Custom report builder | Yes | Yes |
| Survey response analytics | Unknown | Yes |
| Cohort comparison | No | Yes |
| System health monitoring | Unknown | Yes (synthetic monitoring) |

---

## The Integration Opportunity

```
┌─────────────────────────────────────────────────┐
│                 EMS PROGRAM                       │
│                                                   │
│  CoAssist manages:                               │
│  - Personnel & credentials                       │
│  - Clinical sites & preceptors                   │
│  - Student outcomes & surveys                    │
│  - Advisory committee                            │
│  - Self-study drafting (AI-assisted)             │
│  - Gap analysis & compliance tracking            │
│  - Site visit preparation                        │
│                                                   │
│  ┌─────────────────────────────────┐             │
│  │  CoAssist → JetPack Export      │             │
│  │  • Self-study report            │             │
│  │  • Appendices (auto-generated)  │             │
│  │  • Outcome data                 │             │
│  │  • Annual report data           │             │
│  │  • Evidence documents           │             │
│  └──────────────┬──────────────────┘             │
└─────────────────┼───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│               CoAEMSP (JetPack)                  │
│                                                   │
│  JetPack manages:                                │
│  - Receiving submissions                         │
│  - Assigning peer reviewers                      │
│  - Coordinating site visits                      │
│  - Commission deliberations                      │
│  - Accreditation decisions                       │
│  - Cross-program benchmarking                    │
│  - Compliance monitoring (accreditor view)       │
│                                                   │
└─────────────────────────────────────────────────┘
```

---

## CoAssist's Unique Value Propositions (What JetPack Can Never Do)

1. **Free for programs** — JetPack is enterprise-priced for accreditors. Programs won't pay for JetPack's portal — CoAEMSP absorbs that cost. But CoAssist gives them tools JetPack's portal never will.

2. **AI-powered prep** — Gap analysis and narrative drafting are things an accreditor's portal has zero incentive to build. These help programs look good, which is CoAssist's job.

3. **Day-to-day operations** — Personnel management, credential tracking, clinical site management, advisory committees, surveys — this is the 95% of accreditation work that happens BETWEEN submissions.

4. **EMS-native** — JetPack has never served an EMS accreditor. Their clients are pharmacy, architecture, Christian schools. CoAssist was built from day one for CoAEMSP standards.

5. **No vendor lock-in** — Full data export, non-proprietary formats. Programs own their data.

6. **1,194 tests passing** — Production-grade quality with 100% test pass rate.

---

## July Meeting Talking Points

### Frame 1: "We're the Other Half"
"JetPack gives CoAEMSP a modern way to manage the accreditation process. CoAssist gives programs a modern way to prepare for it. Together, you get better submissions, more accurate data, and happier program directors."

### Frame 2: "Better Data In = Better Decisions Out"
"The quality of what JetPack receives depends on how well programs collect and organize their data. CoAssist standardizes that process across all programs, which means more consistent, accurate submissions flowing into JetPack."

### Frame 3: "We Know Your Standards"
"JetPack is learning EMS accreditation for the first time. We've had 80+ CoAEMSP standards mapped and integrated since day one. We can help programs prepare submissions that match exactly what JetPack expects."

### Frame 4: "Free Reduces Friction"
"If programs have to pay for their own tools AND interact with a new mandatory portal, adoption will be slow and painful. CoAssist being free removes one barrier entirely."

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| JetPack's portal is rich enough that programs don't need CoAssist | Low | High | JetPack's incentive is to serve the accreditor, not the program. Portal will be functional but limited. |
| CoAEMSP tells programs NOT to use third-party tools | Very Low | Critical | Position as complementary, not competing. Free = no conflict of interest. |
| JetPack builds program-side features | Low (not their model) | Medium | They explicitly don't serve program-side needs. It's architectural, not a feature gap. |
| CoAEMSP doesn't care about program-side tooling | Medium | Low | Even without CoAEMSP endorsement, programs still need these tools. CoAssist stands on its own. |
| Integration with JetPack is blocked (no API access) | Medium | Medium | Fall back to export-based workflow. CoAssist prepares, programs manually submit to JetPack. |

---

## Conclusion

**CoAssist is not threatened by JetPack. CoAssist is made MORE valuable by JetPack.**

When CoAEMSP mandates JetPack, every EMS program will need to submit data through a new system. The programs that have their data organized, their standards mapped, their self-study drafted, and their gaps identified will have an easy time. The programs that don't will struggle.

CoAssist is how programs don't struggle.

**Recommended strategy: Integration Partner (Option A from the main audit)**
