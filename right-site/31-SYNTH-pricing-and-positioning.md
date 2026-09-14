# 31 — SYNTHESIS: Pricing & Positioning for the RightSite Training-Module Deal

**What this file is:** A decision-ready pricing and positioning synthesis drawn from three research files (`20-market-pricing.md`, `21-market-competitors-structure.md`, `22-our-prior-pricing-research.md`). It answers four questions in order: (1) what is the open-market *floor* (commodity per-minute), (2) what do comparable shops actually charge, (3) how should we *structure* the deal (build fee + recurring), and (4) what is the *defensible recommended price range* anchored on replacement-cost and value-to-RightSite. Every load-bearing number is tagged with how many independent sources support it; single-sourced figures are flagged **[SINGLE SOURCE]**.

**The one-sentence thesis:** Price the build at the agency "scored branching simulation" comp (~$20K–$23K) because that is exactly the deliverable, layer a recurring hosting/admin/maintenance fee that we are uniquely able to charge (RightSite has no LMS), and anchor the *value* story on the fact that RightSite literally cannot scale into Houston/Dallas without solving this — making even a $25K build a rounding error against a $240K–$480K/yr per-seat-LMS alternative they would otherwise face.

---

## 1. The open-market floor (commodity per-minute) — what this is NOT

The cheapest honest framing of custom e-learning is **cost per finished minute / per finished hour**, and the floor is genuinely low for *passive* content:

- **$20–$120 per finished minute** is the realistic spread; a common rule-of-thumb anchor is **$500/finished minute ≈ $30,000 for a 60-min course** (2+ sources: Bluecarrot, AllenComm). A $20/min vendor ships click-next templates; a $120/min vendor ships scenario-driven multimedia.
- **$5,000 per finished hour** is the absolute commodity floor for a simple template-based module (3+ sources: AllenComm, Bluecarrot, eLearningSolutionsLab all converge on ~$5K as the bottom).
- For a literal 30-min module at the *floor* template rate, the commodity number is roughly **$2,500–$3,500** (the "15-min compliance / SCORM-conversion-of-a-PPT" tier — Bluecarrot, eLSL).

**Why the floor is a trap, not a target.** RightSite explicitly does **not** want the passive "watch a video, click-through, done" experience that the floor buys. Their ask is the single most expensive *quadrant* in the entire market: **short AND high-interactivity.** Per-minute averages collapse here — "a 3-minute branching scenario can take as much design time as 10 minutes of standard content" (Bluecarrot). A 5-minute branching call-sim can cost more than a 15-minute linear module. So the per-minute floor is useful only as the number we are *beating on quality*, never as the price.

**Where RightSite's ask sits on the interactivity ladder (the real cost driver):** Interactivity level is universally cited as "the single largest cost variable" (AllenComm). Using the canonical Chapman Alliance dev-hour ratios (2+ corroborating sources: eLearning Industry, Christy Tucker, Thinkdom, CEDMA):

| Level | What it is | Dev hrs per finished hr | Cost per finished hr |
|---|---|---|---|
| L1 Basic | click-next, text, basic quiz | ~79 hrs avg | $5K–$10K |
| L2 Interactive | exercises, animation | ~184:1 | $10K–$20K |
| **L3 Advanced** | **simulations, branching, scored decisions** | **up to ~716:1** | **$20K–$35K** |
| L4 Custom | full sim + systems integration | highest | $35K–$50K+ |

RightSite's described ask — interleaved graded knowledge checks + a **scripted branching simulation of the live call** + interactive video + certificate + admin tracking — lands squarely in **Level 3**. That is the tier we price from, not the floor.

---

## 2. What comparable shops actually charge (the numbers a buyer sees)

Three competitor categories exist; **none does the whole RightSite job**, which is the heart of our pricing leverage.

**Category A — Custom e-learning agencies (Blue Carrot, AllenComm, SweetRush, boutique IDs).** These are the natural comp for the *deliverable quality*. They build assessment, branching, SCORM, and certificates from raw footage (the snipping/reassembly RightSite asked for). Their most relevant line item:

- **60-min sales-enablement SIMULATION (decision trees + scored tracking + scenario feedback): $20,000–$23,000, 8–12 weeks** (Bluecarrot). **This is the structural twin of RightSite's branching-call-sim requirement and is our primary anchor.**
- 60-min branching soft-skills: $15K–$18K. 30-min onboarding module: $5K–$6.5K standalone. Custom game-based sim: $40K–$100K+.
- **Their fatal gap for this deal:** they hand RightSite a **SCORM file that needs an LMS RightSite does not have**, they do **not host**, and they do **not provide an admin completion dashboard**. They also rarely build a *faithful clickable software illusion* — they describe a UI with screenshots/animation.

**Category B — Interactive-demo SaaS (Storylane, Navattic, Reprise, Arcade).** Closest analog to "watch the platform being used + click through it," and they *do* host. But they are **self-serve subscriptions, not done-for-you**, with weak/absent assessment, no per-learner completion tracking, no scored branching post-test, and no certificates.

- Storylane: Starter $40/mo → Growth $500/mo → Premium $1,200/mo. Real-world spend (Vendr): **median ~$11,500/yr up to ~$31,325/yr** — **[SINGLE SOURCE, self-described as unverifiable]**.
- Navattic: Base $500/mo → Growth $1,000/mo; "from $6,000/yr" per HowdyGo.
- Reprise: no public pricing; **from ~$38,000/yr climbing to $100,000+** — **[SINGLE SOURCE: HowdyGo citing market reports]**.
- Arcade: Pro $32/mo → Growth $42.50/user/mo (branching is a paid feature). HowdyGo: from $1,908/yr — **[SINGLE SOURCE: self-reported]**.
- **Their gap:** these are *engagement* analytics (views, drop-off, ABM de-anonymization), not *training-compliance* records — and RightSite would still have to build it themselves and bolt on quizzes/post-test/certs from other tools = exactly the passive stitched-together experience they rejected.

**Category C — Authoring tools (Articulate 360, Captivate, H5P).** The DIY layer. Articulate 360 ~**$1,749/user/yr** (Teams, 2+ sources). These *can* do everything but require a skilled builder (40–80+ dev-hrs/finished-hr) and still produce a file that needs an LMS to host and track. Not a service; not a comp for a done-for-you buyer.

**The synthesis takeaway:** RightSite's job is a **fusion** sitting in the white space between all three. The agency owns deliverable quality but not hosting/tracking; the demo-SaaS owns hosting but not assessment/certs/completion records; authoring tools own nothing turnkey. MedEdPrep is the only player that bundles **faithful clean-room illusion + interleaved assessment + scored branching sim + hosting + admin completion dashboard + certificate** in one already-built engine (`/gtc-demo` → `/mededprep-demo` → demo.mededprep.com, confirmed present on disk with full screenshot history and CLAUDE.md spec). That uniqueness is what lets us price *at* the agency comp while delivering *above* it.

---

## 3. How to STRUCTURE the deal — three line items, not one number

This is a **net-new service line.** MedEdPrep has **zero internal pricing precedent** for "build a client's training, host it, give them an admin dashboard" — every prior dollar figure on record is per-student SaaS ($35/mo, $80/student/yr) or grant-coordination admin fees (`22-our-prior-pricing-research.md`). The company's stated historical philosophy is even *anti*-this shape ("always per student, no admin fee, no annual fee"). So this deal is a **deliberate departure**, and we should structure it as professional services + recurring platform, not contort it into the per-seat model. Recommended structure:

### Line item 1 — One-time build fee (the module)
The video reassembly + clean-room HTML illusion + interactive video + interleaved knowledge checks + branching call-sim post-test + certificate logic. This is the Level-3 deliverable. Anchored on the agency $20K–$23K simulation comp.

### Line item 2 — Recurring hosting + admin/dashboard + completion reporting (annual platform fee)
RightSite has **no LMS**; the admin login they asked for *is* an LMS function. This is the line only we can charge in this bundle, and it should be a **flat annual platform fee with unlimited (or per-department) seats** — NOT per-seat. The seat-math is the whole argument:

> At a generic **$5–$10/user/mo** SaaS LMS, **Houston's ~4,000 personnel = $20K–$40K/month = $240K–$480K/yr** in seat licensing alone, before any content (2+ sources on the $5–$10/user/mo rate). Dallas is next, which only grows that number.

Against that, a **flat annual platform fee** is simultaneously cheaper for RightSite and more profitable/predictable for us. Anchor it against commercial-LMS small/mid tiers (**$3,000–$60,000/yr** — AllenComm) and frame it as the thing that *avoids* the $240K+/yr per-seat cost.

### Line item 3 — Maintenance / content-refresh retainer
The product UI changes → the demo "rots." Agencies disclose this as a hidden cost; **we turn it into recurring revenue.** Industry standard: **15–25% of original build cost per year** for maintenance of custom-built software (AllenComm). On a $20K–$30K build that is **~$3,000–$7,500/yr**, scaling as departments/footage are added.

**Optional structural lever — per-department expansion pricing.** Because the engine is built once and reused, each new department (Dallas after Houston) is a low-marginal-cost content/skin instantiation. Price each *additional* department rollout as a small incremental build (e.g., $5K–$10K) plus an uptick in the annual platform fee. This converts RightSite's growth directly into our recurring revenue.

---

## 4. Defensible recommended price range (two independent anchors that agree)

### Anchor A — Replacement cost (what RightSite would pay anyone else)
- An agency builds the branching sim for **$20K–$23K (8–12 wks)** and **still hands them an unhostable SCORM file** — they would then *additionally* need an LMS at $3K–$60K/yr (or the per-seat trap at $240K+/yr).
- A demo-SaaS subscription is **$6K–$31K/yr**, they build it themselves, and it has no real assessment/certs/completion tracking.
- Replacement-cost ceiling for an equivalent *bundled* solution from the market is therefore **build ($20K–$23K) + first-year LMS ($3K–$60K)** = comfortably **$25K–$80K all-in year one**, and they still wouldn't get the faithful clickable illusion or the EMS domain fluency.

### Anchor B — Value to RightSite (the strategic frame)
RightSite **cannot expand into Houston/Dallas-scale fire departments on live Zoom training** — that is the entire reason this deal exists. The module is the gating dependency on a multi-thousand-seat market expansion. Against a market they unlock worth far more than the build, a $20K–$30K build is immaterial; the value-based ceiling is well above replacement cost. We should not leave this on the table by quoting only cost-plus.

### Recommended numbers

| Line item | Recommended | Floor (don't go below) | Stretch (value-justified) |
|---|---|---|---|
| **Build fee (one module)** | **$22,000–$28,000** | $15,000 | $35,000 |
| **Annual platform / hosting + admin dashboard** | **$9,000–$18,000/yr** | $6,000/yr | $30,000/yr+ as depts scale |
| **Maintenance / refresh** (can fold into platform fee) | **$4,000–$6,000/yr** (≈15–20% of build) | $3,000/yr | $7,500/yr |
| **Each additional department rollout** | **$6,000–$10,000** one-time + platform-fee uptick | $5,000 | $12,000 |

**Headline framing for the proposal:** *"$25K build + ~$15K/yr hosted, tracked, certified platform"* — landing between the agency's $20K–$23K (which leaves them with an unhostable file) and the demo-SaaS $6K–$31K/yr (which leaves them stitching assessment together themselves), while delivering the complete bundle neither competitor offers.

### Why we win on margin even at market price
Our **marginal build cost is far below an agency's** because the hard infrastructure — gate auth, per-session isolated state, guided interactive walkthrough, certificate-on-completion, admin/session tracking — is **already built and in production** (gtc-demo lineage, confirmed on disk). RightSite's module is a content/skin/branch-tree instantiation of a working engine, not a from-scratch build. We price *at* the agency comp and capture the delta as margin. The clean-room HTML illusion is also a moat against demo-rot: we control a static intentional replica, not a brittle DOM clone that breaks when the live UI changes.

---

## 5. Flagged single-sourced figures (do not over-rely on these in the proposal)
- **Storylane real-world spend $11,500–$31,325/yr** — [SINGLE SOURCE, Vendr, self-described unverifiable].
- **Reprise $38K–$100K+/yr** — [SINGLE SOURCE: HowdyGo citing unnamed market reports].
- **Navattic "from $6,000/yr" and HowdyGo "from $1,908/yr"** — [SINGLE SOURCE each, self-reported on vendor comparison pages].
- **Bluecarrot agency role rates** (ID $50–100/hr, Multimedia $60–150/hr, PM $75–150/hr) — [SINGLE SOURCE for the exact bands, though consistent with general market].
- **2D animation $3,000–$8,000/min (eLSL)** — flagged in source as an order-of-magnitude outlier vs. Bluecarrot's ~$500/min; do not use the high figure. (Largely moot — RightSite's "video" is screen-capture / clean-room illusion, not animation.)

Everything else used in the recommendation (the $5K floor, $20K–$23K branching-sim comp, $5K–$50K/finished-hour range, $5–$10/user/mo seat rate, 15–25% maintenance rule, Chapman dev-hour ratios) is corroborated by 2+ independent sources per the upstream files.

---

## Sources touched

**Internal files (read for this synthesis):**
- `/home/jeramey/projects/domination/right-site/20-market-pricing.md` — open-market floor, per-finished-hour by interactivity level, Chapman dev-hour ratios, per-project ranges, media add-ons, SaaS/vendor-hosted LMS tiers, the 4,000-seat seat-math, and the per-finished-minute commodity framing.
- `/home/jeramey/projects/domination/right-site/21-market-competitors-structure.md` — three competitor categories and their packaging/pricing (demo-SaaS tiers, agency project benchmarks incl. the $20K–$23K branching-sim comp, authoring-tool licenses), the capability gap matrix, and MedEdPrep's differentiated fusion position.
- `/home/jeramey/projects/domination/right-site/22-our-prior-pricing-research.md` — confirmed NO internal precedent for a client-build/host/admin engagement; documented MedEdPrep's per-student SaaS prices, the anti-admin-fee philosophy (the departure this deal represents), state-contract ambition ($100–250K) as a ceiling-of-ambition reference, and the external $5K–$50K/finished-hour anchor.
- `/home/jeramey/projects/gtc-demo/` (dir listing: PROJECT-PLAN.md, SPRINT-PLAN.md, CLAUDE.md, AGENT-TASKS.md, ~25 dated screenshots) — verified the original certificate-issuing demo asset exists on disk; the proof-of-pattern that gives us low marginal build cost.
- `/home/jeramey/projects/mededprep-demo/` (dir listing) — verified the evolved interactive-video + tracking + admin engine asset exists.
- `/home/jeramey/projects/ruby-studio/` (dir listing: CLAUDE.md, backend, canon, character-sheets, data, docs) — confirmed the conversational/personality training assets exist (relevant if the branching call-sim needs scripted persona dialogue).

**External URLs** — no new external fetches were required for this synthesis; all external pricing benchmarks were inherited from the three upstream files, which already documented and corroborated them. The load-bearing external sources (re-cited here for traceability) are:
- https://bluecarrot.io/blog/e-learning-content-development-cost-per-hour-explained/ — the $20K–$23K 60-min sales-enablement simulation comp (primary build anchor), $5K–$50K/finished-hour range, $5–$10/user/mo seat rate.
- https://www.allencomm.com/2026/04/custom-elearning-development-what-it-costs-and-what-impacts-pricing/ — $5K floor, "interactivity = single largest cost variable," commercial-LMS annual tiers ($3K–$60K), the 15–25% maintenance rule.
- https://elearningsolutionslab.com/elearning-development-costs/ — cost-per-finished-hour by Level 1–4 ($5K→$50K+), corroborating the Level-3 ($20K–$35K) placement of RightSite's ask.
- https://www.howdygo.com/blog/navattic-vs-reprise and https://www.arcade.software/post/storylane-pricing-is-it-worth-it-2024 — demo-SaaS tier pricing (flagged single-sourced figures above).
