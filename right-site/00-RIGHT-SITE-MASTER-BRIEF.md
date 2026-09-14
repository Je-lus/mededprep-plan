# RightSite Health — Master Brief

**For:** Founder, ahead of the Tuesday 11am call with Chip Walls (VP, EMS Partnerships)
**Date:** 2026-06-19
**What this is:** The single decision document. It pulls together capability, pricing, deal structure, and legal into one plain-language read. It is built from four deeper synthesis files (capability/build, pricing/positioning, deal-structure/legal, attorney fit) — see "Sources touched" at the bottom. Every number that rests on only one source is flagged.

---

## Executive summary (read this, skip the rest if you're busy)

- **We have already built the hard, unsexy half of what Chip wants.** Our `gtc-demo` → `mededprep-demo` → demo.mededprep.com lineage already ships hosted training for an org with no LMS: a separate **admin login + completion dashboard + CSV export + auto-issued, QR-verifiable PDF certificate**, on a low-ops, zero-external-SaaS stack. That whole subsystem is a re-skin, not a rebuild. It is our credibility anchor.

- **The "wow" half is genuine net-new, but none of it is from-scratch.** The three things Chip emphasized — (1) chaptered video with mid-action explainer overlays, (2) knowledge-check questions interleaved *throughout* the video, (3) a scripted **branching live-call simulation** — do not exist as shipped features. But each rides a strong in-house primitive (our JSON step-engine, our quiz/scoring engine, and Ruby Studio's beat/stage state machine). The new engineering is the *glue*, not the foundation.

- **Price it as a Level-3 interactive build, not commodity e-learning.** Chip's ask sits in the single most expensive quadrant of the market (short *and* highly interactive). The market comp for a scored branching simulation is **$20K–$23K** (agency rate). **Recommended: ~$25K build + ~$15K/yr hosted-and-tracked platform fee.** That lands between the agency (who hands them an unhostable file) and demo-SaaS (who leaves them stitching assessment together themselves) — while we deliver the complete bundle neither competitor offers.

- **Structure it as build + recurring, three line items.** One-time build fee, an annual platform/hosting/admin fee (the line only we can charge, because RightSite has no LMS), and a maintenance/refresh retainer. The recurring fee is justified by brutal seat-math: a generic per-seat LMS would cost Houston alone **$240K–$480K/yr** — our flat platform fee is cheaper for them and recurring revenue for us. Each new department (Dallas next) is a low-cost re-skin that grows our recurring line.

- **Legal: a four-doc stack (NDA → MSA → SOW → annual order), and the IP clause is the whole game.** Sign a **mutual NDA before any login walkthrough**. Keep our engine as Background IP we always keep; license RightSite the assembled module; their footage/brand stays theirs. Data terms stay light — **no HIPAA BAA, no FERPA** (this trains personnel on a platform; it stores no patient data). **Recommended attorney: Krevolin & Horst (Gerry Balboni, Atlanta)** — a tech-transactions/SaaS attorney whose published practice literally describes building "form agreements for software licensing + provision of professional services."

---

## 1. What is a reasonable price?

Chip's ask is **Level 3 (Advanced) custom e-learning** — simulations, branching, scored decisions. That is universally cited as the most expensive interactivity tier (the cost driver is interactivity, not minutes). Do **not** anchor on per-minute or per-hour "commodity" rates; those buy the passive watch-and-click experience Chip explicitly rejected. A 5-minute branching call-sim can cost more than a 15-minute linear module.

**Recommended pricing (two independent anchors — replacement cost and value — agree on this range):**

| Line item | Recommended | Floor (don't go below) | Stretch (value-justified) |
|---|---|---|---|
| **Build fee (one module)** | **$22,000–$28,000** | $15,000 | $35,000 |
| **Annual platform / hosting + admin dashboard** | **$9,000–$18,000/yr** | $6,000/yr | $30,000/yr+ as depts scale |
| **Maintenance / refresh** (can fold into platform fee) | **$4,000–$6,000/yr** (~15–20% of build) | $3,000/yr | $7,500/yr |
| **Each additional department rollout** (Dallas, etc.) | **$6,000–$10,000** one-time + platform-fee uptick | $5,000 | $12,000 |

**Headline number to say out loud:** *"~$25K to build it, ~$15K/yr to host, track, and certify it."*

**Why this is defensible:**
- **Replacement cost:** An agency builds the branching sim for $20K–$23K and *still* hands them a SCORM file they can't host (RightSite has no LMS), forcing an additional $3K–$60K/yr LMS — so an equivalent bundled solution from the market is $25K–$80K all-in year one, and still without the faithful clickable illusion or EMS-domain fluency.
- **Value:** RightSite literally cannot expand into Houston/Dallas-scale departments on live Zoom. This module is the gating dependency on a multi-thousand-seat expansion. Against that, a $25K build is a rounding error — don't leave value on the table by quoting only cost-plus.

---

## 2. What are comparable places charging?

Three competitor categories exist, and the key insight is **none of them does the whole job** — that white space is our leverage.

- **Custom e-learning agencies** (Blue Carrot, AllenComm, SweetRush): build the branching sim well. The directly comparable line item is a **60-min scored sales-enablement simulation: $20,000–$23,000, 8–12 weeks** — the structural twin of Chip's ask, and our primary anchor. **Their gap:** they hand over a SCORM file that needs an LMS RightSite doesn't have; they don't host; they don't give an admin completion dashboard; they rarely build a faithful clickable software illusion.

- **Interactive-demo SaaS** (Storylane, Navattic, Reprise, Arcade): closest to "watch the platform being used + click through it," and they *do* host. Pricing roughly $6K–$31K/yr. **Their gap:** these are self-serve subscriptions, not done-for-you; weak/absent assessment, no per-learner completion tracking, no scored branching post-test, no certificates. RightSite would still build it themselves and bolt on quizzes — exactly the stitched-together passive experience they rejected.

- **Authoring tools** (Articulate 360 ~$1,749/user/yr, Captivate, H5P): DIY layer. Can do everything but need a skilled builder and still produce a file that needs an LMS. Not a done-for-you comp.

**Bottom line:** RightSite's job is a *fusion* in the white space between all three. We are the only player bundling **faithful clean-room illusion + interleaved assessment + scored branching sim + hosting + admin completion dashboard + certificate** in one already-built engine. That uniqueness lets us price *at* the agency comp while delivering *above* it.

*Single-source pricing figures (do not over-rely on these in the proposal): Storylane real-world spend $11,500–$31,325/yr [Vendr, self-described unverifiable]; Reprise $38K–$100K+/yr [HowdyGo]; Navattic "from $6,000/yr" and Arcade "from $1,908/yr" [vendor-comparison pages, self-reported]. The load-bearing numbers — the $20K–$23K branching-sim comp, $5K floor, Level-3 = $20K–$35K, $5–$10/user/mo seat rate, 15–25% maintenance rule — are each corroborated by 2+ sources.*

---

## 3. How do they structure the work?

The market default — and what a tech-transactions attorney will reach for — is **professional services + recurring platform**, not one fat number and not our old per-student SaaS model. (Note: this is a *deliberate departure* for us; we have zero internal precedent for "build a client's training, host it, give them a dashboard," and our historical philosophy was even anti-admin-fee. Treat this as a new service line, priced on its own logic.)

**Three line items:**
1. **One-time build fee** — the Level-3 deliverable (video reassembly + clean-room illusion + interactive video + interleaved checks + branching post-test + certificate logic).
2. **Annual platform fee** — hosting + admin dashboard + completion reporting. **Flat, with unlimited or per-department seats — never per-seat.** This is the line only we can charge in this bundle. The seat-math is the whole argument (see §6 recurring).
3. **Maintenance / content-refresh retainer** — the product UI changes, so the module "rots." Agencies hide this as a cost; we turn it into recurring revenue at ~15–25% of build/yr.

**Optional lever — per-department expansion pricing.** Because the engine is built once and reused, each new department (Dallas after Houston) is a low-marginal-cost content/skin instantiation: price each additional rollout as a small incremental build plus an uptick in the annual platform fee. This converts RightSite's growth directly into our recurring revenue.

---

## 4. What we can REUSE from existing assets

This is the credibility core. The headline trio of Chip's ask — **admin login + completion stats + certificate** — is essentially a **re-skin job** off `mededprep-demo`. Fork the skeleton, re-brand, swap content; do not rebuild.

**Lifts-and-shifts directly (working, deployed code):**
- **Admin/compliance dashboard** — separate admin login, per-trainee status/%, per-task timing, charts, filters, CSV export. *This is the strongest single match in the whole portfolio — a direct hit on "admin login to see users + completion stats."*
- **Analytics funnel dashboard** — visitors → started → completed, drop-off per step, avg time. Free bonus beyond what RightSite asked for.
- **Per-step completion telemetry** — tamper-checked (matters because fire-dept completion is compliance-grade).
- **Auto-issued PDF certificate + public QR verification** — direct hit on "certificate on finish"; re-skin to RightSite branding.
- **Per-session isolation + gate auth** — hand Houston FD one URL + one credential, capture identity at register. (Auth is an open decision — see §6 build risks.)
- **Pre-rendered MP3 narration** (3 voices, ~$0.30 to regenerate the whole corpus) and an **optional AI "ask a question" chat helper** (~$33/mo at volume).
- **Low-ops hosting model** (AWS Lightsail, static asset stack) — proven "we host it" target.

**Needs adaptation (the primitive exists; re-point it):**
- **JSON-driven step engine** — today it advances when a learner performs a real UI action. Add a **time-coded trigger type** ("at 0:42 → pause → show question"). The content model is the right template for the video content pack.
- **Quiz/scoring engine** — a working standalone quiz machine. Re-host it **inline** to power (a) interleaved video checks, (b) the post-test, and (c) scoring the branching sim.
- **Mode/role router** — re-skin to role selection (medic / company officer / supervisor / dispatcher) so content can branch by role.
- **Driver.js spotlight/overlay stack** — reuse for the clean-room UI illusion and the mid-action explainer cues. *Decision: for training we likely want forced-linear path (block outside clicks) — opposite of our free-exploration default.*

**The clean-room method itself is proven.** `gtc-demo` is a pixel-perfect replica of our own admin panel, and our prior research explicitly concluded "build the faithful illusion ourselves, don't rent a snapshot tool." The Playwright golden-baseline pixel-diff discipline is the method we reuse to reproduce RightSite's UI faithfully (for training only — never their code).

---

## 5. What we'd need to BUILD (and what that build looks like)

Three genuinely net-new items — exactly the "not a passive watch-and-click" experience Chip demanded. None is greenfield-from-zero; each rides an in-house primitive.

**5a. Chaptered interactive video player with mid-action explainer overlays** *(effort: M–L, risk: Med)*
HTML5 player of RightSite platform footage with **timeline-anchored overlay cues** — at a coded timestamp, pause and surface an explainer clip/callout as a button is clicked. *Leverage:* model the content pack on our `guide-content.json` shape (swap action triggers for time-coded triggers); the Driver.js/Floating UI overlay stack supplies the visual cue layer; our researched Playwright + ffmpeg pipeline (native video record, injected fake cursor + click-ripple, choreography, WebM→MP4 + narration merge) is the **ingestion/assembly pipeline** for snipping and reassembling RightSite's raw footage. The plumbing references exist; the synchronized player + cue engine is the new part.

**5b. Knowledge-check questions interleaved IN the video timeline** *(effort: M, risk: Med)*
At a coded timestamp the video pauses, a question (from the adapted quiz engine, re-hosted inline) appears, the learner must answer to continue. Answers feed existing scoring tables → existing telemetry → existing certificate. *Leverage:* question UI + scoring = the adapted quiz engine; the "must-act-to-advance" gating becomes "must-answer-to-advance." New glue: the timeline↔question binding + pause/resume controller.

**5c. Scripted branching "live-call" simulation + the clean-room HTML illusion of RightSite's platform** *(effort: L, risk: High — this is the dominant cost and risk)*
Two intertwined parts:
- **Branch engine (logic):** a state machine — nodes = call states, edges = trainee choices. No in-house product ships this, but the closest match is **Ruby Studio's** authored-node + unlock-gate + completion-trigger + state-gated-content machinery. Reuse the *data model and state-machine logic* — re-implemented in the Laravel/demo stack, **not** Ruby's stack (Ruby is Python/single-user/NSFW/brand-toxic — wrong stack). For a gradeable, trackable sim use Ruby's **deterministic** parts (authored nodes, explicit completion triggers); an optional LLM realism layer could sit on top later.
- **Clean-room illusion (UI):** a faithful HTML reproduction of RightSite's platform UX, built from a login walkthrough, never copying code. The *method* is proven (gtc-demo + Playwright pixel-baseline); the *specific RightSite UI* is built from scratch against their actual screens. Scoring routes through the same quiz/result tables → same certificate.

**Plus the supporting work:**
- **Wrapper extraction** *(effort: M, risk: Med)* — separate the reusable delivery wrapper (guide engine + telemetry + certificate + dashboards + quiz) from the heavy inherited MedEdPrep exam-domain surface (~65–75% of the demo codebase is copied app cruft we must shed). Not yet done in any repo.
- **Content ingestion** *(effort: M, recurring)* — snip/reassemble RightSite's presentation + raw footage into chapter clips + explainer inserts, author the content JSON, record TTS narration. Quality depends on the footage they hand over.

**Critical-path read:** Credibility (admin + tracking + certificate) is cheap and basically done. Differentiation (interactive video + interleaved questions + branching sim) is the real engagement, with the **branching call-sim as the dominant cost and risk**, followed by the video player + timeline-question binding.

**Honest open decisions to keep on the radar:**
- **Auth.** Our demos use one shared gate credential. Fire-dept completion is compliance-grade, so proving "medic X completed training" may need **real per-user auth**, not one shared password — unless register-step identity is enough. Confirm against RightSite's expectations (open architecture decision).
- **Talking-head / digital presenter.** If RightSite wants an avatar (possibly remembered from the Gmelius reference), treat it as **net-new and unestimated** — no precedent in our assets, and unverified even in the reference tool.
- **Don't let Supabase/Hugo re-enter scope.** The proven path is Laravel + per-session SQLite + DomPDF. Supabase cloud is only defensible if this is rescoped as a brand-new greenfield CRUD product.

---

## 6. Recommended deal structure (build + recurring)

**Build now, recur forever.** Concretely:

- **Build fee:** ~$25K one-time (range $22K–$28K), tied to milestones (storyboard sign-off → interactive prototype → content integration → UAT → launch), with payment tranches per milestone.
- **Annual platform fee:** ~$15K/yr (range $9K–$18K), **flat, not per-seat.** This is the recurring engine of the deal and the line only we can charge because RightSite has no LMS.
  - **The seat-math that wins the argument:** at a generic $5–$10/user/mo SaaS LMS, **Houston's ~4,000 personnel = $20K–$40K/month = $240K–$480K/yr in seat licensing alone**, before any content. Dallas only grows that. A flat annual fee is simultaneously cheaper for them and more profitable/predictable for us. Anchor against commercial-LMS small/mid tiers ($3K–$60K/yr) and frame it as the thing that *avoids* the $240K+/yr per-seat trap.
- **Maintenance/refresh:** ~$4K–$6K/yr (can fold into the platform fee).
- **Per-department expansion:** each new department = a small incremental build ($6K–$10K) + a platform-fee uptick. This is how RightSite's growth becomes our recurring revenue.
- **Keep hosting renewal on its own annual order**, independent of the one-time build, so the recurring revenue is clean.

**Why we win on margin even at market price:** our marginal build cost is far below an agency's because the hard infrastructure (gate auth, session isolation, guided walkthrough, certificate-on-completion, admin tracking) is already in production. RightSite's module is a content/skin/branch-tree instantiation of a working engine. We price *at* the agency comp and capture the delta as margin. The clean-room illusion is also a moat against demo-rot — we control a static intentional replica, not a brittle DOM clone.

---

## 7. Recommended attorney (and why)

**Engage first: Krevolin & Horst, LLC (Atlanta / Midtown) — contact Gerry (Gerardo) Balboni.**

- **Why:** Their published Atlanta SaaS page names our deliverables almost verbatim — *"Preparing Form Agreements for the Licensing of Software and the Provision of Professional Services"* and work *"involving software development, training, service… data processing."* Balboni is independently corroborated (LinkedIn) as a corporate lawyer specializing in licensing software/SaaS/Cloud. It is the only candidate found that satisfies tech-transactions depth **AND** a reusable-template mindset **AND** non-mega-firm economics simultaneously. Atlanta-based (we're a Georgia, USA company).
- **Watch-out:** mid-size Chambers-ranked firm = rate uncertainty. Mitigate by framing it as a **fixed-scope, reusable-template build** and asking for a flat or capped fee; pitch the recurring nature (each future hosted-training client reuses the kit).
- **First-contact angle:** lead with the match to his own page's language — "small Georgia ed-tech company hosting custom interactive training for enterprise clients; we need a reusable form-agreement kit (MSA + SOW + IP-ownership-with-license-back + white-label/hosting + admin-data terms) — exactly the 'form agreements for software licensing and provision of professional services' your page describes; first client is live, kit reused per deal — can you scope it flat or capped?"

**In parallel:** post the kit on **ContractsCounsel** (GA SaaS network) for a fixed-fee bid as a price-check and fallback. Hold **Martin & Martin (Marietta)** as a backbone + ongoing-retainer relationship candidate *only if* they're comfortable with the software IP-license-back/white-label clauses (otherwise route those to K&H). **Reed Leeper** is a budget backup only.

**Who NOT to hire:** a healthcare-regulatory/HIPAA specialist (tempting because RightSite is a health company, but this product handles no PHI — they'll reflexively bolt on a BAA and inflate cost); a generalist business lawyer (will mis-handle the IP-license-vs-assignment distinction that *is* the deal); a litigator or big firm.

**The contract stack and the IP crux (what counsel must get right):**
- **Sign order: NDA → MSA → SOW #1 → annual hosting order.** The **mutual NDA is the most time-sensitive doc — nothing (login, screen-share, raw footage) moves until it's signed.** It must define confidential info broadly enough to cover "the visual appearance/screens/workflow observed during a demo," and the permitted-purpose clause must explicitly bless "creating training depictions of the observed interface."
- **IP buckets (the whole game):** **Bucket A — our engine is Background IP we always keep** (list it in a schedule; enhancements made during RightSite's work stay ours — don't let a "everything is work-for-hire, assign it all to client" sweep grab the engine). **Bucket B — RightSite gets a perpetual license to use the assembled hosted module**, not the engine/source. **Bucket C — their footage/brand/UI appearance stays theirs**, licensed to us to build/host. Tie all client rights to full payment.
- **Data terms stay light:** trainee completion records only (name, role/dept, completion status/time). **No HIPAA BAA, no FERPA** — proportionate "commercially reasonable safeguards," ownership/access/return-on-termination, one breach-notice clause, inside the MSA.
- **Cost reference:** internal notes earmark a ~$4,500 SaaS-bundle and $1,000–$2,500 MSA-template range *(these specific figures are MedEdPrep's own internal estimates, single-source — treat as our prior research, not verified market quotes).*

---

## 8. Open items for the Tuesday 11am call with Chip

**Asset hand-off**
- Confirm exactly what they'll give us and in what form: the live presentation (with embedded videos), the **raw demo footage**, brand assets, and a **login walkthrough** of the platform.
- Set expectation: **mutual NDA signed before the login walkthrough / any footage** — get that moving immediately.
- Ask who their **SME reviewer** is for clinical/operational accuracy (this is a client dependency on our timeline).
- Gauge footage quality — our content-ingestion effort depends heavily on what they hand over.

**Seat volume**
- Confirm Houston headcount (~4,000) and the Dallas timeline/size; ask which departments come after.
- Probe whether completion needs to be **per-individual compliance-grade** (drives the real-auth decision) or whether register-step identity capture is acceptable.
- Confirm there is truly **no LMS** on their side (validates the platform-fee logic).

**Timeline**
- Agency comp for this deliverable is **8–12 weeks**; our reuse should beat that, but the branching sim + clean-room UI are the long poles. Don't over-commit before we see their footage/screens.
- Map their Dallas rollout date against module-1 delivery so we can sequence the per-department expansion.

**Budget**
- Float the headline: **~$25K build + ~$15K/yr hosted, tracked, certified platform.**
- Frame against the **$240K–$480K/yr per-seat alternative** for Houston — the flat platform fee is the thing that *avoids* that.
- Surface the **per-department expansion** model (Dallas = small incremental build + platform-fee uptick) as the growth story.
- Decide internally before the call whether to anchor high (stretch: $35K build) given the value framing, then negotiate down to recommended.

**Things to explicitly NOT promise on the call:** a talking-head/avatar (unestimated), any specific auth model (open decision), and any timeline commitment before seeing their footage and screen count.

---

## Sources touched

**Internal files opened (the four upstream syntheses this brief consolidates):**
- `/home/jeramey/projects/domination/right-site/30-SYNTH-capability-and-build.md` — the reuse map: what lifts-and-shifts (admin dashboard, telemetry, certificate, hosting), what needs adaptation (step engine → time-coded triggers, quiz engine → inline, role router, Driver.js overlays), and the three net-new builds (video player, interleaved checks, branching sim + clean-room illusion); rough effort sizing; honest gaps (auth decision, wrapper extraction, talking-head unverified, Supabase/Hugo out of scope).
- `/home/jeramey/projects/domination/right-site/31-SYNTH-pricing-and-positioning.md` — pricing: Level-3 placement, the $20K–$23K branching-sim agency comp, the three competitor categories and their gaps, the three-line-item deal structure, the recommended price table, the 4,000-seat $240K–$480K/yr seat-math, and the single-source pricing flags (Storylane/Reprise/Navattic/Arcade).
- `/home/jeramey/projects/domination/right-site/23-deal-structure-legal-kit.md` — the four-doc contract stack (NDA→MSA→SOW→order), the mutual-NDA gate + permitted-purpose/clean-room language, the three-bucket IP clause (background/deliverable/client materials, license-not-assignment), the light data terms (no BAA/no FERPA), the attorney archetype, and the ~$4,500/$1,000–$2,500 internal cost figures (flagged single-source).
- `/home/jeramey/projects/domination/right-site/25-lawyers-fit-analysis.md` — the ranked attorney recommendation: #1 Krevolin & Horst (Gerry Balboni) with the verbatim-match rationale and rate watch-out; runners-up ContractsCounsel (price-check), Martin & Martin (backbone/retainer), Reed Leeper (budget backup); the who-NOT-to-hire guidance.

**External URLs:** None fetched for this consolidation. All external pricing/legal benchmarks were inherited (with their multi-source corroboration and single-source flags intact) from the four upstream synthesis files, which carry the live source URLs in their own "Sources touched" sections (bluecarrot.io, allencomm.com, elearningsolutionslab.com, howdygo.com, arcade.software for pricing; genieai.co, gouchevlaw.com, faisonlawgroup.com, commonpaper.com, databricks.com, hipaauniversity.com/hipaaexams.com for legal; khlawfirm.com + Balboni LinkedIn for the attorney pick). No figure in this brief rests on a source those files did not already corroborate or flag.
