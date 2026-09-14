# Entry Strategy & Fit With Existing MedEdPrep Assets

**Date:** 2026-06-19
**Classification:** Internal expansion strategy
**Status:** Direction set by founder; execution is a **later** initiative (US v1 comes first).

**Bottom line:** The **platform travels; the content and accreditation do not.** Enter Europe platform-first, re-authoring clinical content from scratch against UK/Ireland guidelines with a recruited European expert paramedic. This is explicitly a future phase — captured now so it's not re-litigated and so the platform stays designed in a way that doesn't block it later.

---

## 1. Founder direction on record (2026-06-19)

Jeramey is OK with:
- **Taking the existing platform** into Europe (the instructor-first LMS / orchestration layer).
- **Re-working / re-authoring the content from scratch** — new clinical material, **different textbooks**, aligned to European guidelines.
- **Recruiting a European expert paramedic** (and/or doing substantial research himself) to author and validate clinically correct content.
- Treating this as a **later** initiative, not a now thing. US v1 and CAPCE/CME work come first (consistent with the v1 scope guard).

## 2. Why platform-first

| Asset | Travels to Europe? | Why |
|---|---|---|
| **Instructor-first LMS / platform** | **Yes** | Not tied to US protocols. Instructor tooling, cohort management, adaptive testing are guideline-agnostic. |
| **CE/clinical content library** | **No** | Hard-coded to US NHTSA/NREMT guidelines, drugs, scope. Must be re-authored against JRCALC (UK) / PHECC (Ireland). |
| **CAPCE/NREMT accreditation** | **No** | US-only construct; no standing with HCPC/PHECC. |
| **US brand/reputation** | **No** | Starts from zero in-market. |

The sharpest strategic point: the part of the business we're investing most in for the US (accreditation + US-specific content) is the part that **doesn't** cross the Atlantic. The platform — the harder thing to build — is the part that does.

## 3. Two entry models to pressure-test later

1. **B2B platform sale** (lower localization cost): sell the LMS to UK paramedic schools / universities / ambulance trusts who **supply their own JRCALC-aligned content**. Sidesteps re-authoring the whole clinical library. Likely the cheaper, more defensible first move.
2. **B2C / direct CE content** (higher localization cost): sell re-authored CPD content directly to registrants. Requires the full clinical re-authoring effort up front, but captures more margin and matches the US model.

Founder's stated appetite (re-author everything, get different textbooks, hire a European expert) supports eventually doing #2 — but #1 may be the **lower-risk beachhead** that funds #2. Decision deferred.

## 4. Fit with what we already have in /domination

- **`04-product-vision/`** — confirm the platform architecture stays content-agnostic enough that European guideline content can be dropped in without a rebuild. (Design constraint to carry forward, not act on now.)
- **`ce-platform-design/` + `ce-platform-mockups/`** — the CE platform is the asset that travels; keep internationalization (guideline-set abstraction, locale, terminology) as a *future-proofing* consideration, not a v1 feature.
- **`03-market-landscape/`** — US competitor deep-dives; this folder is the international counterpart.
- **`00-overview/STATE-OF-PLAY.md`** — Europe sits *behind* US v1 in priority. No scope creep into current sprint.

## 5. What "later" should be gated on

Don't start Europe execution until: (a) US v1 platform + CAPCE pipeline are shipped/stable, and (b) we've done a real UK market-sizing pass and decided B2B-platform vs B2C-content. EMS2027 (May 2027) is the natural **scouting milestone** to inform that decision without committing build resources.

---

## Related files

- `01-ems2027-ireland-event-and-budget.md` — the scouting trip + budget
- `02-european-market-landscape.md` — addressable market
- `03-regulatory-and-cpd.md` — why content must be re-authored
- `05-open-questions-next-research.md` — what to research before deciding
