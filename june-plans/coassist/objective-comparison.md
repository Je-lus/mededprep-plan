# JetPack vs CoAssist — Objective Feature Comparison

**Date:** 2026-06-01
**Purpose:** Factual, sourced comparison for internal strategy. Not marketing material.

---

## Platform & Business Context

| Dimension | JetPack (Virtual Atlantic) | CoAssist (MedEdPrep) |
|-----------|---------------------------|----------------------|
| **Built for** | Accrediting bodies | EMS education programs |
| **Primary user** | Accreditor staff, site visitors, commissioners | Program directors, faculty, clinical coordinators |
| **Target buyer** | The accrediting body itself (CoAEMSP, IACBE, CSI, etc.) | Individual EMS programs |
| **Cost** | Enterprise, undisclosed. One reviewer called it "prohibitive up front" (review - Cecilia L.). Competitor ARMATURE lists at $24K/month (Capterra listing). Best guess: $10K+/month. | Free. No fees, no tiers, no credit card. |
| **EMS/CoAEMSP experience** | None. Clients are pharmacy, business, architecture, Christian schools, BBB (vainc.com). CoAEMSP is their first EMS accreditor (CoAEMSP email). | Purpose-built for CoAEMSP standards from day one. |
| **Maturity** | ~decade in accreditation technology (vainc.com). Multiple live accreditors including IACBE (Sep 2025), CSI (Feb 2023), AACP (ongoing transition) (IACBE rollout, CSI case study). | Newer. Single-vertical focus (EMS). |
| **Client base** | 10+ accrediting/regulatory bodies (vainc.com). | EMS programs directly. |
| **Reviews** | 4 reviews on Capterra/GetApp (all 5.0/5.0), 2 on SoftwareSuggest (both 5/5). All from accreditor-side users (Capterra listing). Zero program-side reviews exist. | N/A (newer product). |
| **Pricing model** | Subscription. VA states no long-term contracts, no limits on applications/surveys (vainc.com/meet-jetpack). | Free. |

---

## Feature Comparison

### Accreditation Lifecycle Management

| Feature | JetPack | Source | CoAssist |
|---------|---------|--------|----------|
| Standards framework management | Yes -- accreditor configures standards | (vainc.com/meet-jetpack) | Yes -- 80+ CoAEMSP standards pre-loaded |
| Self-study submission portal | Yes -- receives and manages submissions | (vainc.com/meet-jetpack) | Yes -- drafts and prepares submissions |
| Annual report workflow | Yes -- receives annual reports | (vainc.com/meet-jetpack) | Yes -- prepares annual report data |
| Compliance dashboard | Yes -- cross-program view for accreditor | (vainc.com/meet-jetpack) | Yes -- per-program weighted scoring |
| Reaccreditation cycle tracking | Yes -- historical data carries across cycles | (vainc.com/meet-jetpack) | Yes -- timeline and deadline management |
| Peer review coordination | Yes -- assigns reviewers, manages site visits | (vainc.com/meet-jetpack) | No |
| Commission/board decision workflow | Yes -- committee deliberation and voting | (vainc.com/meet-jetpack) | No |
| Site visit management | Yes -- schedules and assigns visitors | (vainc.com/meet-jetpack) | Yes -- 40+ item prep checklist, countdown roadmap (preparation side) |
| Cross-program benchmark reporting | Yes -- trend analysis across all programs | (vainc.com/meet-jetpack) | No -- single-program focus |
| Survey management | Yes -- integrates with Bungee Enterprise Survey Management | (Software Advice) | Yes -- graduate, employer, and RAM surveys with automated distribution |
| Automated notifications/reminders | Yes -- triggers, task management | (Capterra listing) | Yes -- credential expiration alerts, deadline reminders |
| AI-assisted narrative drafting | No | | Yes -- generates first drafts from program data |
| AI-powered gap analysis | No | | Yes -- identifies compliance risks before submission |
| Substantive change tracking | Unknown | | Yes |
| Appendices auto-generation (E, F, G, H) | No | | Yes |

### Program Operations & Data Management

These are features that serve the program's internal needs -- the day-to-day work that happens between accreditation submissions.

| Feature | JetPack | Source | CoAssist |
|---------|---------|--------|----------|
| Student outcome tracking (NREMT, retention, placement) | No | | Yes |
| 70% threshold alerts | No | | Yes |
| Personnel & credential management (8+ roles) | No | | Yes |
| Credential expiration alerts | No | | Yes |
| Medical director engagement tracking | No | | Yes |
| Advisory committee management | No | | Yes |
| Advisory committee QR check-in | No | | Yes |
| Meeting minutes & action items | No | | Yes |
| Clinical site/affiliate management | No | | Yes |
| Preceptor management & credentials | No | | Yes |
| Agreement expiration tracking | No | | Yes |
| Field internship/capstone tracking | No | | Yes |
| Cohort management | No | | Yes |
| Graduate & employer surveys (automated) | No | | Yes |
| RAM surveys (11 domains) | No | | Yes |
| Outcome Action Plans | No | | Yes |
| Physical document location mapping | No | | Yes |
| Student competency matrix (SMC) | No | | Yes |
| CSV bulk import (cohorts, affiliates, preceptors) | No | | Yes |
| Cohort comparison reporting | No | | Yes |

### Platform & Technical

| Feature | JetPack | Source | CoAssist |
|---------|---------|--------|----------|
| Role-based access control | Yes | (Capterra listing) | Yes -- 18-role RBAC |
| Audit trail | Yes | (Capterra listing) | Yes -- dual audit system, append-only |
| Document management | Yes -- centralized storage | (vainc.com/meet-jetpack) | Yes |
| API access | Yes -- listed | (Software Advice) | Yes -- REST, SSE |
| SSO | Yes | (Software Advice) | No (on roadmap) |
| Mobile access | Yes -- Android/iOS | (Software Advice) | Yes -- PWA |
| Integrations | Google Suite, Salesforce, QuickBooks | (Software Advice) | SendGrid, AWS |
| Custom report builder | Yes | (Capterra listing) | Yes |
| Auditor access tokens (temporary, time-limited) | Unknown | | Yes |
| MFA/TOTP | Unknown | | Yes |

---

## Where JetPack Has Capabilities CoAssist Does Not

These are areas where JetPack serves needs CoAssist was never designed to address, because they are accreditor-side functions.

| Capability | Source | Why CoAssist doesn't have it |
|------------|--------|------------------------------|
| Peer review coordination (assigning reviewers, managing review workflows) | (vainc.com/meet-jetpack) | This is the accreditor's job, not the program's |
| Commission/board decision workflows | (vainc.com/meet-jetpack) | Programs don't make accreditation decisions |
| Cross-program benchmarking and trend analysis | (vainc.com/meet-jetpack) | Requires data from all programs; only the accreditor has this |
| Multi-accreditation-type support (CE/CME, programmatic, institutional) | (vainc.com/meet-jetpack) | CoAssist is EMS-specific by design |
| SSO | (Software Advice) | On CoAssist's roadmap, not yet built |
| Salesforce/QuickBooks integration | (Software Advice) | Not relevant to EMS program operations |

---

## Where CoAssist Has Capabilities JetPack Does Not

These are areas where CoAssist serves needs JetPack was never designed to address, because they are program-side functions.

| Capability | Why JetPack doesn't have it |
|------------|-----------------------------|
| AI-assisted self-study narrative drafting | Accreditors receive documents, they don't help programs write them |
| AI-powered gap analysis and compliance risk identification | An accreditor has no incentive to help programs look good before submission |
| Student outcome tracking with threshold alerts | Internal program operations data |
| Personnel and credential management (8+ roles with expiration tracking) | Not the accreditor's responsibility to manage |
| Medical director engagement tracking | EMS-specific operational need |
| Advisory committee management with QR check-in | Internal program governance |
| Clinical site, affiliate, and preceptor management | Program-side field operations |
| Automated graduate and employer surveys (11-domain RAM) | Programs collect this data; the accreditor just receives summaries |
| Cohort management and comparison | Internal enrollment management |
| Auto-generated appendices (E, F, G, H) | Programs prepare these; JetPack receives them |
| Free pricing | JetPack is enterprise software sold to accreditors at enterprise pricing |

---

## What We Do NOT Know About JetPack

These are features or capabilities that are plausible but unconfirmed from public sources. They are marked here to avoid making claims in either direction.

| Unknown | Why it matters | Best guess |
|---------|---------------|------------|
| What the program-facing portal actually looks like | Determines how much programs can do inside JetPack vs. needing external tools. No public screenshots exist of the entity-side view. | Likely functional but limited -- focused on submission, not preparation. IACBE gives only 2 full-access users per institution (IACBE rollout). |
| Whether JetPack's API is open to third-party tools | Determines whether CoAssist could push data directly into JetPack | Unknown. API is "listed" on Software Advice, but no public documentation or partner ecosystem exists. |
| Whether programs will pay anything | CoAEMSP could absorb the cost or pass it through | IACBE appears to absorb costs as part of membership. One reviewer noted cost is "prohibitive up front" for the accreditor (review - Cecilia L.). |
| Whether CoAEMSP will require exclusive use of JetPack's portal | Programs might be blocked from using alternative submission channels | Unknown. IACBE appears to still have legacy web forms active 9 months after launch (IACBE rollout). |
| MFA/multi-factor authentication | Security baseline | Not confirmed from public sources. |
| Temporary/time-limited access tokens for auditors | Relevant for site visit workflows | Not confirmed. |
| How much data-entry burden falls on programs | JetPack could be a structured data-entry interface or a simple file-upload portal | IACBE programs submit self-study, IQAR, OAP, annual reports, and contact changes through JetPack (IACBE rollout). Degree of structured entry vs. file upload is unknown. |
| Whether JetPack includes any program-side preparation tools | JetPack markets to accreditors, but the portal could include checklists, templates, or guidance | No evidence of this. Virtual Atlantic explicitly states "accreditors and the end users they accredit are completely different types of entities with very different needs" (vainc.com/meet-jetpack). |
| What the IACBE YouTube webinar reveals about the portal | Recording exists but hasn't been fully reviewed | https://www.youtube.com/watch?v=tqGtiFdnA8k |

---

## Source Key

| Abbreviation | What it refers to |
|-------------|-------------------|
| (vainc.com) | Virtual Atlantic homepage -- https://vainc.com |
| (vainc.com/meet-jetpack) | JetPack features/product page -- https://vainc.com/meet-jetpack/ |
| (Capterra listing) | Capterra profile, 123 listed features, 4 reviews -- https://www.capterra.com/p/174191/Jetpack |
| (Software Advice) | Software Advice profile -- https://www.softwareadvice.com/accreditation-management/jetpack-accreditation-management-profile |
| (CoAEMSP email) | Official CoAEMSP newsletter announcing JetPack adoption, 2026-06-01 |
| (CSI case study) | CSI announcement of JetPack adoption, Feb 2023 -- https://csionline.org/csi-accreditation-introduces-new-accreditation-management-software/ |
| (IACBE rollout) | IACBE JetPack launch events and compliance pages, Sep 2025 -- https://iacbe.org |
| (review - Cecilia L.) | Capterra review by Cecilia L., Associate Executive Director, Higher Education |
| (review - David T.) | Capterra review by David T., VP Finance & Operations, Pharma |
| (review - Michael L.) | Capterra review by Michael L., CFO/COO, Biotech |
| (review - Matthew N.) | Capterra review by Matthew N., Director of Marketing |
| (review - Jennifer Z.) | SoftwareSuggest review by Jennifer Zamudio, 51-200 employees |

---

## Notes on Methodology

1. JetPack features are sourced from public materials only. No screenshots of the program-facing portal exist publicly. All listed features come from the accreditor-side marketing and listing pages.

2. CoAssist features are based on the built product.

3. "No" in the JetPack column for program operations features means "not part of JetPack's stated purpose or feature set." It does not mean JetPack's portal definitely cannot display this data -- we simply have no evidence it does, and Virtual Atlantic's own messaging positions these as outside their scope.

4. "Unknown" means no public source confirms or denies the capability. These are not counted as wins or losses for either product.

5. This comparison does not include internal technical metrics (test counts, architecture details, HIPAA compliance claims) as those are not relevant to what each product does for its users.
