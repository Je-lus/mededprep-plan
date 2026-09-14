# Competitive Landscape & Delivery Structure — Async Interactive Software/Product Training

**Deal context:** RightSite Health wants its live, Zoom-delivered "how to use the RightSite platform" demo converted into an async, trackable, interactive e-learning module — hosted by us, with an admin login for completion stats, interleaved knowledge checks, a branching post-test simulation of the live call, and certificates. They have no LMS of their own. This file maps WHO ELSE could build this, HOW each category packages and prices the work, and WHERE MedEdPrep's position ("we host + admin + proven engine + faithful clean-room demo") is differentiated.

**Bottom line up front:** No single competitor category cleanly does the whole RightSite job. The interactive-demo SaaS tools (Storylane/Navattic/Reprise/Arcade) nail the "click-through software illusion" but are sold as *self-serve marketing/sales subscriptions* with weak assessment, no real LMS/completion tracking, no certificates, and no branching post-test. The custom-eLearning agencies and Articulate ecosystem nail *assessment, branching, SCORM/certificates* but (a) charge per-finished-hour project fees, (b) hand you a SCORM file that needs an LMS RightSite doesn't have, and (c) don't host or give you an admin dashboard. MedEdPrep is one of the few players who can fuse the faithful clean-room software illusion WITH interleaved assessment, a branching sim, hosting, an admin completion dashboard, and certificates — because the `/gtc-demo` → `/mededprep-demo` → demo.mededprep.com engine already does exactly this (per-session isolated state, gate auth, guided interactive walkthrough, certificate-on-completion, admin tracking). See the "MedEdPrep position" section.

---

## Category 1 — Interactive Demo / "product tour" SaaS (Storylane, Navattic, Reprise, Walnut, Arcade, Supademo, HowdyGo)

These are the closest analog to RightSite's "watch the platform being used + click through it" requirement. They capture a product's UI (via screenshots, recorded video, or HTML DOM clone) and replay it as a guided, clickable tour. Crucially, they are sold as **self-serve SaaS subscriptions**, not done-for-you services — RightSite (or we) would still have to *build* the demo, and the assessment/certificate/LMS layer is thin to nonexistent.

### How they package & deliver
- **Model:** SaaS subscription, billed monthly or annually, almost always **per-seat (builder seats)** + feature-gated tiers. Viewers are usually unlimited; you pay for the people who *create* demos and for advanced features. Some (Arcade) also meter by number of demos.
- **What you do:** You record/clone the product yourself in their editor. The vendor does not produce content for you except at the Enterprise/"professional services" tier.
- **Hosting:** They host the demo (shareable link or embed). This is a plus vs. agencies — but the analytics are *engagement* analytics (views, drop-off, click-depth, account de-anonymization for ABM), **not learner/completion records, and not certificates.**

### Pricing (2026, corroborated across 2+ sources where noted)

| Tool | Entry / model | Mid tier | Top tier | Notes |
|---|---|---|---|---|
| **Storylane** | Free (1 published demo, screenshots/video only); **Starter from $40/mo** (annual), $40/extra seat | **Growth $500/mo** (5 seats, HTML capture, A/B, account reveal); extra seats $100 | **Premium $1,200/mo** (10 seats, SSO, Salesforce, whitelabel); Enterprise custom (sandbox demos, API) | Real-world spend reported by Vendr: **median ~$11,500/yr, up to ~$31,325/yr** (flagged: Vendr figures self-described as unverifiable/anonymous). Mobile-unfriendly; steep learning curve. |
| **Navattic** | Free (1 demo); **Base $500/mo** (5 seats, 5 demos) | **Growth $1,000/mo** (10 seats, 20 demos, A/B, account ID) | Enterprise custom | ABM-marketing focused. ~2-week time to first demo. HowdyGo cites Navattic "from $6,000 annually." |
| **Reprise** | **No public pricing** | — | **From ~$38,000/yr, climbs to $100,000+** (per HowdyGo, citing market reports) | Enterprise sales-engineering heavyweight: full app cloning (Replay/Replicate/Reveal), SOC2 Type II, ISO 27001. Needs dedicated technical resources. |
| **Arcade** | Free (3 demos); **Pro $32/mo** (unlimited demos) | **Growth $42.50/user/mo** (branching logic, whitelabel, collaboration) | Enterprise custom | Record-first; "choose your own adventure" **branching** is a paid feature; synthetic voiceover 30+ languages; mobile-optimized. |
| **HowdyGo** | **From $1,908/yr** (~$159/mo, unlimited seats + demos) | — | — | Positions as the cheap, fast (hours-to-first-demo) alternative; single source — pricing self-reported on own comparison page (flagged). |
| **Walnut / Supademo** | Custom / freemium | — | — | Walnut = enterprise/mid-market, expensive, no public pricing; Supademo = cheaper challenger. (Mentioned in comparisons; specific tiers not pulled.) |

### What they include vs. what they DON'T (this is the gap RightSite cares about)
- ✅ Faithful click-through replica of software UI (HTML capture clones the real DOM — the gold standard for "watch the platform being used"); ✅ embedded explainer tooltips/overlays mid-flow; ✅ hosting + engagement analytics; ✅ lead capture / CTAs; some have ✅ branching ("choose your own adventure," Arcade/Storylane) and ✅ synthetic voiceover.
- ❌ **Interleaved graded knowledge checks** — these are sales/marketing tools, not assessment engines; quiz/scoring is rudimentary or absent.
- ❌ **A scored, branching post-test simulation with pass/fail and remediation** — branching exists as a *navigation* feature, not as a scored exam.
- ❌ **Per-learner completion tracking + an LMS-style admin roster** (who finished, when, score) — analytics are aggregate/marketing-shaped, not training-compliance-shaped.
- ❌ **Certificates of completion.**
- ❌ **Done-for-you build** at normal price points — RightSite would have to learn the tool and build it themselves, or pay Enterprise "professional services."

**Implication for RightSite:** A demo-SaaS subscription gives them a pretty click-through tour but leaves them assembling video editing, quizzes, a post-test sim, completion tracking, and certificates from other tools — exactly the "watch-a-video, click-through, done" passive experience they explicitly said they do NOT want.

---

## Category 2 — Custom eLearning development vendors / instructional-design agencies (AllenComm, Blue Carrot, ELM, SweetRush, boutique IDs, Upwork freelancers)

These are full-service shops that take raw materials (RightSite's live presentation, embedded videos, raw demo footage) and produce a finished course — including the snipping/reassembly RightSite explicitly asked for. They are the natural home for *assessment, branching scenarios, SCORM, and certificates*. But they are **project-priced, hand off a SCORM/xAPI package, and do NOT host or provide an admin dashboard** — which is fatal for a client (RightSite) that has no LMS.

### How they package & deliver
- **Model:** **Project-based, priced per finished hour of instruction** (sometimes time-and-materials or retainer for ongoing libraries). The industry rule of thumb is **40–80 hours of development per finished hour** for interactive content (up to ~50 hrs for instructional design alone per finished hour at the high end).
- **What you get:** A finished, standards-compliant course file (SCORM 1.2 / SCORM 2004 / xAPI / cmi5) that you then **upload to your own LMS**. The agency does not typically host it or give you a live admin/completion dashboard — that's the LMS's job, and RightSite doesn't have one.
- **Rates:** US custom-eLearning agencies run **~$100/hr**; US instructional designers average ~$45/hr (offshore far lower). Vendor-reported per-hour all-in cost of finished eLearning in 2026: **$5,000–$50,000 per finished hour** depending on media and interactivity.

### Per-project pricing benchmarks (Blue Carrot, 2026 — representative full-service agency)

| Project type | Price range | What's included | Timeline |
|---|---|---|---|
| SCORM conversion of existing PPT (30 slides) | from **$3,500** | narration, light interactivity, basic knowledge check | 1–3 wks |
| 15-min compliance micro-course | **$2,500–$3,500** (+$600–$2,000 if SME-built from scratch) | template slides, branded visuals, AI narration, knowledge check | 2–4 wks |
| 30-min onboarding module | **$5,000–$6,500** standalone (full program $33k–$38k) | basic interaction | 3–5 wks |
| **60-min soft-skills course w/ branching** | **$15,000–$18,000** | custom interactions, **branching scenarios (6–12 nodes/objective)**, richer media | 6–10 wks |
| **60-min sales-enablement SIMULATION** | **$20,000–$23,000** | **complex decision trees, scored performance tracking, scenario feedback** | 8–12 wks |
| Full curriculum (5–10 hrs) | **$37,500–$60,000+** | learning strategy, production, QA, localization | 16–24 wks |

> **Most relevant comp for RightSite:** the "60-min sales-enablement simulation" line — **$20k–$23k, 8–12 weeks** — is structurally almost identical to RightSite's "scripted branching simulation of the live call" requirement (decision trees + scored tracking + scenario feedback). This is the price/effort benchmark MedEdPrep should anchor against, *plus* the value-add that an agency would still hand RightSite a SCORM file they can't host.

### Hidden costs agencies disclose (and that MedEdPrep absorbs by hosting)
Revision cycles & late change requests; authoring-tool licenses; **post-launch maintenance/content updates** (the product UI changes → demo rots); accessibility/508 compliance; localization done twice.

### What they include vs. don't
- ✅ Real instructional design; ✅ interleaved graded assessments; ✅ scored branching simulations; ✅ SCORM/xAPI + certificate logic; ✅ professional video snipping/reassembly of provided footage.
- ❌ **Hosting** (they hand you a file). ❌ **Admin/completion dashboard** (that lives in your LMS — RightSite has none). ❌ **A faithful live software illusion** — agencies typically *describe* a UI with screenshots/animation, they rarely build a clickable HTML clone of the actual product. ❌ Fast turnaround (6–12+ weeks). ❌ EMS/clinical domain fluency.

---

## Category 3 — Authoring-tool ecosystem (Articulate Storyline/Rise/360, Adobe Captivate, H5P, Camtasia, iSpring, Vyond)

This is the DIY/tooling layer underneath Category 2. Anyone — including RightSite or MedEdPrep — could buy these and build the module in-house. They are **per-seat annual software licenses**, not services, and they produce a SCORM/xAPI file that still needs a host/LMS.

### How they package & deliver
- **Model:** **Per-user annual subscription** (authoring software). Output is a SCORM/xAPI/cmi5 package or embeddable HTML5; **you still need somewhere to host + track it.**
- **Articulate 360** (the dominant suite — Storyline for branching/simulation authoring, Rise for responsive courses): **~$1,749/user/year (Teams), ~$1,449/yr (Personal)** as of 2026 (Articulate 360 AI tier). Historical climb corroborated: was $1,199 Personal / $1,499 Teams effective July 2024 → has risen since.
- **H5P:** open-source/low-cost; strong free **interactive-video and branching-scenario** content types (the exact "questions interleaved throughout the video" pattern); needs a host (Moodle/WordPress/LMS) and lacks polished admin reporting on its own.
- **Adobe Captivate, Camtasia, iSpring, Vyond:** screen-capture + simulation + video; varying license models; same "build-it-yourself, host-it-elsewhere" pattern.

### Capability reality
- Storyline/Captivate **can** do interleaved video questions, branching simulations, scoring, and certificates — but only if someone with the skill builds it (40–80 dev-hrs/finished-hr), and the result still needs an LMS to track completions and a place to live. H5P gives the interactive-video + branching pattern cheaply but with weak native reporting/cert/admin.
- ❌ No hosting, ❌ no turnkey admin dashboard, ❌ no faithful clone of *RightSite's specific* UI without manual rebuild, ❌ no done-for-you service, ❌ no domain expertise.

---

## Where MedEdPrep is differentiated — "we host + admin + proven engine + faithful clean-room demo"

The RightSite ask is a **fusion job** that sits in the white space *between* the three categories above. Each category owns one or two of the requirements and misses the rest:

| RightSite requirement | Demo-SaaS (Storylane/Navattic/Arcade) | eLearning agency (Blue Carrot et al.) | Authoring tools (Articulate/H5P) | **MedEdPrep** |
|---|---|---|---|---|
| Faithful clickable software illusion | ✅ (HTML capture) | ❌ (screenshots/animation) | ⚠️ (manual rebuild) | ✅ **clean-room HTML replica** (proven: demo replicates MedEdPrep admin panel pixel-for-pixel) |
| Embedded video + mid-action explainer | ✅ | ✅ | ✅ | ✅ (demo engine already overlays guided coaching mid-flow) |
| Knowledge checks **interleaved throughout** | ❌ | ✅ | ✅ (H5P/Storyline) | ✅ (MedEdPrep is fundamentally an assessment/IRT company) |
| Scored **branching post-test simulation** | ⚠️ (navigation branching only) | ✅ ($20k–$23k) | ⚠️ (build-it) | ✅ (branching/adaptive logic is core competency) |
| **We host it** | ✅ | ❌ | ❌ | ✅ (demo.mededprep.com is a live hosted product on our infra) |
| **Admin login + per-learner completion stats** | ❌ (engagement analytics only) | ❌ (needs their LMS) | ❌ (needs LMS) | ✅ (per-session isolated state, tracking, gate auth already built) |
| **Certificate on completion** | ❌ | ✅ (in a file) | ⚠️ | ✅ (`/gtc-demo` shipped certificate-on-completion; lineage is literally this feature) |
| Snip/reassemble their raw footage | partial | ✅ | ⚠️ | ✅ (in-house studio: 4 cameras, DaVinci Resolve, editor) |
| Domain credibility (EMS/clinical) | ❌ | ❌ | ❌ | ✅ (CAPCE-accredited, practicing medic founder, EMS-native) |

### The positioning argument
1. **We are the only category that hosts AND tracks AND certifies AND builds the faithful illusion in one engine.** A demo-SaaS subscription leaves RightSite stitching quizzes + post-test + completion records + certs from other tools (= the passive experience they reject). An agency hands them a SCORM file they cannot host because **they have no LMS** — the single most important fact in this deal. RightSite explicitly wants an **admin login to see users + completion** — that is an LMS function, and only MedEdPrep brings it bundled with the build.
2. **Clean-room principle is a moat, not a constraint.** We never touch RightSite's code; from a login walkthrough we reproduce the UX as a faithful HTML "illusion" (already proven — the MedEdPrep demo is a CSS/Blade replica of the real admin panel down to <15% visual diff). This sidesteps the HTML-capture vendors' biggest weakness — **demo rot** when the live product UI changes — because we control a static, intentional replica rather than a brittle DOM clone.
3. **The proven engine collapses cost and timeline.** Agencies quote **8–12 weeks and $20k+** for a branching sales simulation alone, then add hosting/LMS RightSite still has to solve. MedEdPrep's `/gtc-demo`→`/mededprep-demo` lineage means the hard infrastructure (gate auth, per-session SQLite isolation, guided walkthrough framework, certificate issuance, session tracking) is **already built and in production** — RightSite's module is a content/skin/branch-tree instantiation of a working engine, not a from-scratch build.
4. **Price anchor:** Position against the agency "scored branching simulation" comp (**$20k–$23k + their LMS gap**) and the demo-SaaS annual subscription (**$6k–$31k/yr, and they still build it**). MedEdPrep can credibly land between as a **done-for-you, hosted, tracked, certified module** — capturing the agency's deliverable quality plus the SaaS's hosting/analytics, with neither's gap.

### Risks / honest caveats
- Demo-SaaS HTML-capture tools genuinely produce a more "real" software feel with less manual effort *for software they can point a Chrome extension at*; our clean-room replica is hand-built. Counter: RightSite's UI is bounded (one login walkthrough), so a faithful replica is tractable and avoids demo rot.
- Agencies bring deeper formal instructional-design polish (ADDIE, accessibility/508). If RightSite cares about 508/accessibility compliance for a 4,000-person fire department, budget for it.
- This is positioned as a **services + hosting** engagement, not a self-serve SaaS seat — pricing should reflect hosting/maintenance over time (the product UI will change; the demo will need updates — the agencies' disclosed "hidden cost" we can turn into recurring revenue).

---

## Sources touched

**Files (internal):**
- `/home/jeramey/projects/domination/right-site/initial-chat-copy.md` — deal origin/context (Chip Walls, RightSite model, MACHO network); confirmed RightSite has no LMS and the relationship/BD framing.
- `/home/jeramey/projects/mededprep-demo/CLAUDE.md` — proof of the proven engine: clean-room visual replica of MedEdPrep admin panel, guide panel, session timer, gate auth, per-session SQLite isolation, deployed live at demo.mededprep.com — the "we host + admin + faithful illusion" capability.
- `/home/jeramey/projects/mededprep-demo/README.md`, `/home/jeramey/projects/gtc-demo/README.md` — default Laravel boilerplate (no useful content; confirmed the real specs live in CLAUDE.md not README).
- Directory scan of `/home/jeramey/projects/*` — located demo lineage repos (`gtc-demo`, `mededprep-demo`, `mededprep-inst-demo`, `ruby-studio`, `gtc-survey-onboarding`); `mededprep-inst-demo` empty.

**URLs (external):**
- https://www.howdygo.com/blog/navattic-vs-reprise — Navattic tiers ($500/$1,000/mo; from $6k/yr), Reprise ($38k–$100k+/yr, no public pricing), HowdyGo ($1,908/yr); per-seat model, time-to-demo, weaknesses (mobile, learning curve).
- https://www.arcade.software/post/storylane-pricing-is-it-worth-it-2024 — Storylane full tier breakdown (Free/Starter $40/Growth $500/Premium $1,200/Enterprise), Vendr median $11,500–$31,325/yr (flagged unverifiable), per-seat add-ons; Arcade tiers ($32 Pro / $42.50 Growth / Enterprise), Arcade branching ("choose your own adventure") as paid feature.
- https://bluecarrot.io/blog/e-learning-content-development-cost-per-hour-explained/ — $5k–$50k per finished hour; per-project bundles incl. **60-min sales-enablement simulation $20k–$23k (8–12 wks)** and **60-min branching soft-skills $15k–$18k**; US agency ~$100/hr, ID ~$45/hr; hidden costs (revision, maintenance/demo-rot, accessibility, localization).
- https://www.articulate.com/360/pricing/ — Articulate 360 total ~$1,749/yr (Teams, per user) — authoring-tool per-seat license model.
- https://www.articulatesupport.com/article/Articulate-360-Pricing-Options — corroborates Articulate 360 AI: Teams $1,749, Personal $1,449 per year (2nd source on Articulate pricing).
- https://www.reddit.com/r/elearning/comments/1bu7w2s/another_price_hike_for_articulate_360/ — corroborating price-history (was $1,199 Personal / $1,499 Teams eff. July 2024; confirms upward trend).
- https://lindsayoconsulting.com/how-interactive-is-your-elearning-h5p-storyline-and-captivate-compared/ — H5P vs Storyline vs Captivate interactivity comparison (authoring-tool capability spread).
- https://www.reddit.com/r/instructionaldesign/comments/1rgo1ca/ — industry rule of thumb: 40–80 dev-hours per finished hour of interactive eLearning.
- (Search-result listings, not deep-read, used for corroboration only): saltfish.ai Storylane review, supademo.com Navattic/Walnut/Supademo & Storylane pricing posts, allencomm.com custom-eLearning cost ($15k–$25k/hr intro course), elearningart.com calculator (~$100/hr agency), goconsensus.com Navattic review, atomisystems.com Storyline alternatives, community.articulate.com interactive-video/H5P threads.
