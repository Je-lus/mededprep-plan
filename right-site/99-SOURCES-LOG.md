# 99 — Consolidated Sources Log (RightSite Health Engagement)

**What this is:** A single consolidated index of every source — internal file path and external URL — touched across the RightSite research/synthesis corpus in `/home/jeramey/projects/domination/right-site/`. Compiled by extracting the "## Sources touched" section from each `*.md` file in this directory.

**How to read it:** Grouped by the source document that touched them. Each entry preserves its original one-line note. A deduped "All external URLs" appendix follows at the bottom for quick reference.

**Note:** `initial-chat-copy.md` is the raw Chip Walls call-prep chat transcript and has no "## Sources touched" section (it is itself a primary source, not a research output). It is listed in the appendix for completeness.

---

## 00-RIGHT-SITE-MASTER-BRIEF.md

**Internal files opened (the four upstream syntheses this brief consolidates):**
- `/home/jeramey/projects/domination/right-site/30-SYNTH-capability-and-build.md` — the reuse map: what lifts-and-shifts (admin dashboard, telemetry, certificate, hosting), what needs adaptation (step engine → time-coded triggers, quiz engine → inline, role router, Driver.js overlays), and the three net-new builds (video player, interleaved checks, branching sim + clean-room illusion); rough effort sizing; honest gaps (auth decision, wrapper extraction, talking-head unverified, Supabase/Hugo out of scope).
- `/home/jeramey/projects/domination/right-site/31-SYNTH-pricing-and-positioning.md` — pricing: Level-3 placement, the $20K–$23K branching-sim agency comp, the three competitor categories and their gaps, the three-line-item deal structure, the recommended price table, the 4,000-seat $240K–$480K/yr seat-math, and the single-source pricing flags (Storylane/Reprise/Navattic/Arcade).
- `/home/jeramey/projects/domination/right-site/23-deal-structure-legal-kit.md` — the four-doc contract stack (NDA→MSA→SOW→order), the mutual-NDA gate + permitted-purpose/clean-room language, the three-bucket IP clause (background/deliverable/client materials, license-not-assignment), the light data terms (no BAA/no FERPA), the attorney archetype, and the ~$4,500/$1,000–$2,500 internal cost figures (flagged single-source).
- `/home/jeramey/projects/domination/right-site/25-lawyers-fit-analysis.md` — the ranked attorney recommendation: #1 Krevolin & Horst (Gerry Balboni) with the verbatim-match rationale and rate watch-out; runners-up ContractsCounsel (price-check), Martin & Martin (backbone/retainer), Reed Leeper (budget backup); the who-NOT-to-hire guidance.

**External URLs:** None fetched for this consolidation. All external pricing/legal benchmarks were inherited (with their multi-source corroboration and single-source flags intact) from the four upstream synthesis files, which carry the live source URLs in their own "Sources touched" sections.

---

## 10-cap-gtc-demo.md

**Files opened:**
- `/home/jeramey/projects/gtc-demo/PROJECT-PLAN.md` — definitive description: standalone replica, session lifecycle, 6-sidebar feature scope, `train.mededprep.app` URL, factory-reset philosophy.
- `/home/jeramey/projects/gtc-demo/composer.json` — Laravel 12, PHP ^8.2, barryvdh/laravel-dompdf, simplesoftwareio/simple-qrcode, tinker; dev: phpunit, pint, sail.
- `/home/jeramey/projects/gtc-demo/package.json` — Playwright + pixelmatch/pngjs visual-regression tooling; Alpine/vanilla front-end (no SPA framework).
- `/home/jeramey/projects/gtc-demo/config/database.php` (grep) — confirmed dual SQLite connections incl. `persistent`; denied MySQL/Supabase as the live store.
- `/home/jeramey/projects/gtc-demo/.env` / `.env.example` (grep) — `DB_CONNECTION=sqlite`, MAIL config, APP settings.
- `/home/jeramey/projects/gtc-demo/app/Http/Controllers/CertificateController.php` — full certificate generation, DomPDF render, QR-verify, download/preview/email/verify logic.
- `/home/jeramey/projects/gtc-demo/app/Http/Controllers/TelemetryController.php` — step-start/step-complete/complete/summary endpoints, duration calc, guide-step validation, auto-cert-on-complete.
- `/home/jeramey/projects/gtc-demo/app/Models/Trainee.php` — persistent connection, derived status (not_started/in_progress/completed/expired), relations to stepEvents/certificate/routeHits.
- `/home/jeramey/projects/gtc-demo/app/Models/TraineeStepEvent.php` — tamper-check (`hash_equals`) against guide config step-key map.
- `/home/jeramey/projects/gtc-demo/app/Http/Controllers/ComplianceDashboardController.php` — admin dashboard stats, filters, completions chart, paginated trainee table, CSV export.
- `/home/jeramey/projects/gtc-demo/guide-content.json` (grep) — auto-complete type inventory (click/route/route_pattern/dom_exists/scroll/form_submit/hover/input_change), task/step structure.
- `/home/jeramey/projects/gtc-demo/public/assets/guide/guide-store.js` (grep) — Alpine guide store: sessionStorage completedSteps, telemetry POSTs, milestone toasts, auto-complete detector engine (~1,948 LOC).
- `/home/jeramey/projects/gtc-demo/resources/views/components/guide-panel.blade.php` (grep) — coach-panel "Show me" highlight/scroll behavior.
- `/home/jeramey/projects/gtc-demo/routes/web.php` (grep) — gate/login, certificate/verify, admin/compliance, telemetry API routes.
- `/home/jeramey/projects/gtc-demo/app/Models/` (dir listing) — confirms inherited production domain surface (UnitExam*, Quiz*, Question*, EopaQuiz*, VideoPlayHistory, Videos) vs. wrapper models.
- `/home/jeramey/projects/gtc-demo/app/Services/` — SessionManager, DateShifter, PaymentSimulator, RecentActivityService (illusion plumbing).
- `/home/jeramey/projects/domination/.recovery/files/valuation-v2/mededprep-demo.md` — verified mededprep-demo root commit "Initial import from gtc-demo (pre-transformation)" 2026-04-01; ~65–75% inherited surface / 25–35% wrapper; 11 tasks/63 steps; confirms gtc-demo is the ancestor and the wrapper is the novel/reusable IP.
- `/home/jeramey/projects/mededprep-demo/` (dir listing + grep) — confirmed presence of guide-content.json (testprep variant), the evolution target for video/interleaved-question work.
- `/home/jeramey/projects/mededprep-ecosystem/mededprep-portal/gtc-lms-demo/` (dir listing) — static `index.html`+`shell.js` LMS-shell mockup, distinct from the dynamic gtc-demo engine.

**URLs:** None. Sourced entirely from internal codebases; no external web research required.

---

## 11-cap-mededprep-demo.md

**Files (internal):**
- `/home/jeramey/projects/mededprep-demo/CLAUDE.md` — project identity, demo-specific feature list, deployment target (demo.mededprep.com, Lightsail 34.236.108.206), tech stack, gate credential model.
- `/home/jeramey/projects/gtc-demo/CLAUDE.md` — confirmed shared lineage; gtc = 15-min timer, "GTC Training Sandbox."
- `/home/jeramey/projects/gtc-demo/docs/ROUTE-MAP.md` — full baseline route inventory (168 routes) showing what gtc already had (gate, compliance, telemetry, certificate, student quiz engine, reports).
- `/home/jeramey/projects/mededprep-demo/README.md` — stock Laravel readme (no product info; noted for completeness).
- `/home/jeramey/projects/mededprep-demo/.planning/PROJECT.md` — current state: Tour+Sales+Walkthrough modes, Haiku 4.5 chat, 3 TTS voices, v3.0 co-browse milestone, Reverb decision.
- `/home/jeramey/projects/mededprep-demo/.planning/EVAL-2026-04-20.md` — 5-agent eval; confirms guide content quality, chatbot UX, completion/telemetry API, certificate flow, sales battle cards, known gaps.
- `/home/jeramey/projects/mededprep-demo/guide-content.json` — 11-task walkthrough; task/step/auto_complete content model (the onboarding engine's data shape).
- `/home/jeramey/projects/gtc-demo/guide-content.json` — 10-task simpler guide; no video/audio, simpler step schema (delta evidence).
- `/home/jeramey/projects/mededprep-demo/guide-sales-content.json` & `guide-content-testprep.json` — proof of swappable per-audience content packs.
- `/home/jeramey/projects/mededprep-demo/app/Http/Controllers/AnalyticsController.php` — funnel/summary metrics: visitors, started, completed, completion rate, avg duration, top pages, drop-off per task/step.
- `/home/jeramey/projects/mededprep-demo/app/Http/Controllers/ChatController.php` — AI chat: context buckets, 50-msg budget, pain priming, caching.
- `/home/jeramey/projects/mededprep-demo/app/Http/Controllers/TelemetryController.php` — step-start/complete/complete/summary endpoints (head inspected).
- `/home/jeramey/projects/mededprep-demo/app/Models/Trainee.php` — persistent connection; started_at/completed_at/selected_pain/saved_session_path fields.
- `/home/jeramey/projects/mededprep-demo/routes/web.php` (480 lines) — confirmed routes for analytics, chat, quote, cobrowse, certificate, compliance, telemetry, seed-step, guide-lab.
- `/home/jeramey/projects/mededprep-demo/database/migrations/` — route_hits, sales_team_members, cobrowse_room_members, chat_cache, saved_session, pain telemetry migrations (the new persistent stores).
- `/home/jeramey/projects/mededprep-demo/public/assets/guide/guide-audio.js` — TTS narration store; Nova/Onyx/Studio voices; pre-rendered MP3 convention.
- `/home/jeramey/projects/mededprep-demo/public/assets/guide/guide-store.js` — completion tracking, telemetry POSTs, audio hooks, completion screen.
- `/home/jeramey/projects/mededprep-demo/resources/views/choose-mode.blade.php` — pain/mode selection router (reports/replace-tool/integrity/ROI).
- `/home/jeramey/projects/mededprep-demo/resources/views/gate.blade.php` — shared-credential gate, prefilled readonly username/password from config.
- `/home/jeramey/projects/mededprep-demo/resources/views/certificate/` (`completion.blade.php`, `verify.blade.php`) — certificate + public verification views.
- `/home/jeramey/projects/mededprep-demo/composer.json` vs `/home/jeramey/projects/gtc-demo/composer.json` — sole new dep `laravel/reverb` (co-browse); both carry dompdf + simple-qrcode.
- `app/Http/Controllers/` listing both repos (controller-set diff) — mededprep added Analytics, Chat, ChatLog, Cobrowse(+Join), Quote, SeedStep, StudentView/* controllers and Cobrowse/Analytics/SecurityHeaders/StudentModeAuth middleware over gtc.
- `public/pages/frontend/quiz.js`, `quiztest.js`, `quiz_review.js` (+ `Frontend\QuizzeController`/`UnitExamController` in route map) — existing replica quiz/exam engine = post-test spine.
- `public/assets/cobrowse/*` & `app/Http/Controllers/CobrowseController.php` (via route grep) — Reverb-based live co-browse (cursor/scroll/nav/annotation/transfer).
- `/home/jeramey/projects/domination/june-plans/demo/mededprep-demo-update.md` — internal note: demo needs to become exact 1:1 mirror (status: not started).

**URLs (external):**
- `https://demo.mededprep.com` — attempted live scrape; site gates `/` → trainee registration so anonymous scrape returned no public content (consistent with the gate-auth model documented in the route map). FLAG: live UI not independently captured; all live-behavior claims are grounded in source code, not a rendered page.

---

## 12-cap-ruby-studio.md

- `/home/jeramey/projects/ruby-studio/CLAUDE.md` — confirmed Ruby Studio's purpose (local NSFW companion gen), stack (FastAPI+Ollama+Mem0+React, SSE-only, no auth), and project layout; the "Chat System Improvement Sprint" context naming the chat half as the relevant subsystem.
- `/home/jeramey/projects/ruby-studio/identity/ruby.md` — the persona/"personality training" system prompt and the deliberate "author giving voice to" framing technique.
- `/home/jeramey/projects/ruby-studio/backend/routers/beats_router.py` — story-beats CRUD API and the beat shape (scenario_override, stage, unlocked, completed, completion_triggers, sort_order) — the scenario-engine surface.
- `/home/jeramey/projects/ruby-studio/backend/emotions.py` — the four background LLM extractors (user mood, character mood, relationship indicators, session recap) + prompt-injection formatter; the dynamic-state and auto-scoring pattern.
- `/home/jeramey/projects/ruby-studio/backend/chat.py` (read lines 57-186 + grep of beat/stage/relationship usage) — `_check_lore_conditions()` fail-closed gating, active-beat fetch + `## Current Story Beat` injection, per-turn relationship update + `check_and_advance_stage` calls, `ChatService` pipeline overview.
- `/home/jeramey/projects/ruby-studio/backend/database.py` (grep + read ~2464-2520) — `relationship_state` and `story_beats` table schemas, `_STAGE_ORDER`/`_STAGE_THRESHOLDS`, and `check_and_advance_stage()` advancement logic.
- `/home/jeramey/projects/ruby-studio/frontend/src/components/BeatIndicator.tsx` — frontend rendering of the active beat (confirms beats surface in the UI); listing of `useChat.ts`, `ChatView.tsx`, `chatStore.ts`, `beatStore.ts`, `beatsApi.ts` as the reusable chat/beat front-end stack.
- `/home/jeramey/projects/ruby-studio/docs/archive/DYNAMIC-STORYTELLING-PLAN.md` — confirmed this "storytelling" plan is about LLM-generated *image storyboards*, NOT dialogue branching (ruled out as a branching-sim asset).
- `/home/jeramey/projects/ruby-studio/tools/madlibs/` (directory listing) — confirmed "madlibs" is ComfyUI image inpainting/prompt testing, not conversational mad-libs (ruled out).
- Directory tree of `/home/jeramey/projects/ruby-studio/` (top level + 2-level find) — established the image-gen vs. chat split and located all relevant files; confirmed `canon/`, `lora-training/`, `workflows/`, `outputs/` are image/video (not relevant).
- `find /home/jeramey/projects -iname "*ruby-studio*"` — located the studio at `/home/jeramey/projects/ruby-studio` (and a `worktrees/ruby-studio` copy); confirmed no ruby-studio assets live inside the domination repo or its `.recovery/`.

**URLs:** None (internal codebase only).

---

## 13-research-decisions-gemilius.md

**Files opened (all absolute paths):**
- `/home/jeramey/projects/domination/right-site/initial-chat-copy.md` — the RightSite/Chip Walls call-prep context; confirmed no mention of Gemilius/Supabase/Hugo in the chat itself (the brief's keywords came from elsewhere).
- `/home/jeramey/projects/gtc-demo/.planning/research/STACK.md` — gtc-demo tech stack decisions (Laravel 12, per-session SQLite, AdminLTE 3, Alpine.js); "what NOT to use" rejections.
- `/home/jeramey/projects/gtc-demo/.planning/research/ARCHITECTURE.md` — copy-on-login DB isolation, middleware DB binding, template-adaptation, date-shift patterns; build order.
- `/home/jeramey/projects/gtc-demo/.planning/PROJECT.md` — gtc-demo purpose, shipped milestones, key decisions table (the original GTC onboarding sandbox).
- `/home/jeramey/projects/mededprep-demo/.planning/research/phase3-demo-mode-split.md` — dual-track chooser, interleaved "Take a Sample Quiz" task, AI chat track-awareness, telemetry/compliance.
- `/home/jeramey/projects/mededprep-demo/research/gmelius-onboarding/research-gmelius-analysis-v2.md` — the core Gmelius Academy teardown; Supademo confirmation; DIY-vs-platform verdict; platform comparison matrix + verified pricing.
- `/home/jeramey/projects/mededprep-demo/research/gmelius-onboarding/SYNTHESIS.md` — master synthesis of all 12 demo-research docs; tool decisions (Driver.js/OpenAI TTS/Claude Haiku/Playwright); "build not buy" rationale for Supademo AND Crisp/Hugo; 4-phase roadmap.
- `/home/jeramey/projects/mededprep-demo/research/gmelius-onboarding/research-action-tooltip-ux.md` — action-in-tooltip ("Do this for me"), Floating UI, pulsing-highlight CSS, step orchestration, ~12hr effort estimate.
- `/home/jeramey/projects/mededprep-demo/research/gmelius-onboarding/research-playwright-video.md` — programmatic video tours, fake-cursor injection, TourDirector choreography, ffmpeg pipeline, dual-offering recommendation.
- `/home/jeramey/projects/mededprep-ecosystem/pulse-app/.research/demo-research-cherry-pick/DEMO-RESEARCH-SYNTHESIS.md` — Pulse-side distillation; EXPLICITLY documents the Supademo-vs-Supabase naming confusion; onboarding/AI/audio/UX-psychology findings.
- `/home/jeramey/projects/mededprep-ecosystem/pulse-app/.research/backend-infra/SUPABASE-EVALUATION.md` — full Supabase backend evaluation for Pulse; "do not adopt as primary backend" verdict; cloud-vs-self-host; pricing; vendor risk.

**Searches run (no web fetches needed — all targets were internal):**
- Recursive grep across `/home/jeramey/projects` for `gemilius|gmelius|supademo|supabase|hugo|interactive video|interleave|explainer` — located the `gmelius-onboarding/` corpus and the Pulse `.research/` docs; confirmed zero "gemilius" hits (name is "Gmelius").
- Directory listings of `gtc-demo/.planning`, `mededprep-demo/.planning` + `/research`, `domination/.recovery/files/` — mapped where each decision doc lives and confirmed `research-demo-expansion.md` is missing on disk despite being indexed.

**External URLs:** None fetched in this recovery pass; the original research files themselves cite the external sources (supademo.com/pricing, arcade.software/pricing, navattic.com, storylane.io, learn.gmelius.com, crisp.chat, github driver.js/shepherd/intro.js) with their own verification dates of 2026-04-03 / 2026-06-02.

---

## 20-market-pricing.md

**Files (internal asset hunt):**
- `/home/jeramey/projects/domination/right-site/initial-chat-copy.md` — deal context (already provided in task).
- `/home/jeramey/projects/gtc-demo/` (README.md, PROJECT-PLAN.md, SPRINT-PLAN.md, screenshots present) — confirms the original certificate-issuing demo asset exists; the proof-of-pattern that lets us price at market with low marginal cost.
- `/home/jeramey/projects/mededprep-demo/` (README.md, SPRINT-PLAN.md, screenshots) — confirms the evolved interactive-video + interleaved-question + admin/tracking demo asset exists.
- `/home/jeramey/projects/mededprep-inst-demo/` — empty dir; instructor-demo placeholder, no pricing content.
- `/home/jeramey/projects/domination/.recovery/` (RECOVERY-REPORT.md, manifest.json, files/) — recovery store; no eLearning-pricing content found relevant to this task.

**Web sources (pricing research):**
- https://bluecarrot.io/blog/e-learning-content-development-cost-per-hour-explained/ — per-finished-hour by customization tier, project ranges (15-min/30-min/60-min/sim/curriculum), media per-minute costs, agency role rates, dev-hour ratios.
- https://elearningsolutionslab.com/elearning-development-costs/ — cost per finished hour by Level 1–4, freelance-vs-agency project ranges, branching/simulation ranges, authoring-tool and LMS recurring costs.
- https://www.allencomm.com/2026/04/custom-elearning-development-what-it-costs-and-what-impacts-pricing/ — "industry standard = cost per finished hour," 80–300 hr/finished-hr ratio, $5K–$100K+ band, LMS annual tiers ($3K–$200K+), 15–25% maintenance rule, app-dev costs.
- Chapman Alliance data via eLearning Industry / Christy Tucker (christytuckerlearning.com) / Thinkdom (thinkdom.co) / CEDMA PDF (cedma-europe.org) — Level 1/2/3 dev-hour ratios (79 avg L1, 184:1 L2, up to 716:1 L3), study methodology (250 orgs / 4,000 pros, 2010).
- Capterra/Teachfloor/myelearningworld search results — TalentLMS plan pricing ($69/$109/$179/mo, per active user) and LearnWorlds ($24–$249/mo flat), certification-tracking capability — used for the seat-vs-flat-fee analysis.

---

## 21-market-competitors-structure.md

**Files (internal):**
- `/home/jeramey/projects/domination/right-site/initial-chat-copy.md` — deal origin/context (Chip Walls, RightSite model, MACHO network); confirmed RightSite has no LMS and the relationship/BD framing.
- `/home/jeramey/projects/mededprep-demo/CLAUDE.md` — proof of the proven engine: clean-room visual replica of MedEdPrep admin panel, guide panel, session timer, gate auth, per-session SQLite isolation, deployed live at demo.mededprep.com — the "we host + admin + faithful illusion" capability.
- `/home/jeramey/projects/mededprep-demo/README.md`, `/home/jeramey/projects/gtc-demo/README.md` — default Laravel boilerplate (no useful content; confirmed the real specs live in CLAUDE.md not README).
- Directory scan of `/home/jeramey/projects/*` — located demo lineage repos (`gtc-demo`, `mededprep-demo`, `mededprep-inst-demo`, `ruby-studio`, `gtc-survey-onboarding`); `mededprep-inst-demo` empty.

**URLs (external):**
- https://www.howdygo.com/blog/navattic-vs-reprise — Navattic tiers ($500/$1,000/mo; from $6k/yr), Reprise ($38k–$100k+/yr, no public pricing), HowdyGo ($1,908/yr); per-seat model, time-to-demo, weaknesses (mobile, learning curve).
- https://www.arcade.software/post/storylane-pricing-is-it-worth-it-2024 — Storylane full tier breakdown (Free/Starter $40/Growth $500/Premium $1,200/Enterprise), Vendr median $11,500–$31,325/yr (flagged unverifiable), per-seat add-ons; Arcade tiers ($32 Pro / $42.50 Growth / Enterprise), Arcade branching ("choose your own adventure") as paid feature.
- https://bluecarrot.io/blog/e-learning-content-development-cost-per-hour-explained/ — $5k–$50k per finished hour; per-project bundles incl. 60-min sales-enablement simulation $20k–$23k (8–12 wks) and 60-min branching soft-skills $15k–$18k; US agency ~$100/hr, ID ~$45/hr; hidden costs (revision, maintenance/demo-rot, accessibility, localization).
- https://www.articulate.com/360/pricing/ — Articulate 360 total ~$1,749/yr (Teams, per user) — authoring-tool per-seat license model.
- https://www.articulatesupport.com/article/Articulate-360-Pricing-Options — corroborates Articulate 360 AI: Teams $1,749, Personal $1,449 per year (2nd source on Articulate pricing).
- https://www.reddit.com/r/elearning/comments/1bu7w2s/another_price_hike_for_articulate_360/ — corroborating price-history (was $1,199 Personal / $1,499 Teams eff. July 2024; confirms upward trend).
- https://lindsayoconsulting.com/how-interactive-is-your-elearning-h5p-storyline-and-captivate-compared/ — H5P vs Storyline vs Captivate interactivity comparison (authoring-tool capability spread).
- https://www.reddit.com/r/instructionaldesign/comments/1rgo1ca/ — industry rule of thumb: 40–80 dev-hours per finished hour of interactive eLearning.
- (Search-result listings, not deep-read, used for corroboration only): saltfish.ai Storylane review, supademo.com Navattic/Walnut/Supademo & Storylane pricing posts, allencomm.com custom-eLearning cost ($15k–$25k/hr intro course), elearningart.com calculator (~$100/hr agency), goconsensus.com Navattic review, atomisystems.com Storyline alternatives, community.articulate.com interactive-video/H5P threads.

---

## 22-our-prior-pricing-research.md

**Internal files:**
- `/home/jeramey/projects/mededprep-website/reviews/codex-pricing-analysis.md` — the richest internal pricing doc; gave student tiers ($35/mo, $90/qtr, $300/yr), institutional $80/student/yr, Pulse free, HS free. All SaaS per-seat, none for client builds.
- `/home/jeramey/projects/Proposals/conversation.md` — "always per student, no admin/instructor/annual fee" pricing philosophy; commission/MRR economics; per-program $2,500–5,000/yr range.
- `/home/jeramey/projects/Proposals/revised.md` + `Proposals/Bennie/`, `Proposals/Kip/`, `Proposals/Katie/` (proposal .md/.html) — per-program contract pricing, $3,200 example deals, $100–250k state-contract ambition. Confirms no e-learning-build line item.
- `/home/jeramey/projects/SOW26/MedEdPrep_SOW_Program1.html` — GTC Scope of Work: $70k program budget, 10% admin fee model. The cost-plus precedent, not a software price.
- `/home/jeramey/projects/mededprep-demo/research/` (listing + `kb-email-pricing-objections.md`, sales-rep-tool, gmelius-onboarding) — confirmed: objection-handling for MedEdPrep's own prices, no service-build pricing.
- `/home/jeramey/projects/gtc-demo/README.md` and `/home/jeramey/projects/mededprep-demo/README.md` — stock Laravel boilerplate; the proven interactive-video/tracking/certificate asset, but never priced as a sellable deliverable.
- `/home/jeramey/projects/domination/.recovery/files/ce-microlearning-research/04-competitive-landscape.md`, `03-ems-ce-preferences.md` — CE-market/competitor pricing, but per-learner content model, adjacent not applicable.
- `/home/jeramey/projects/domination/right-site/initial-chat-copy.md` — RightSite deal context; confirmed buyer/payer ("who pays") is still an open question (agency vs RightSite vs payer-funded), which affects which of our billing models could apply.

**External URLs (custom e-learning build-cost benchmark):**
- https://www.allencomm.com/2026/04/custom-elearning-development-what-it-costs-and-what-impacts-pricing/ — $5,000 simple module → $50,000+ range.
- https://bluecarrot.io/blog/e-learning-content-development-cost-per-hour-explained/ — corroborates $5k–$50k per finished hour (2nd independent source).
- https://christytuckerlearning.com/time-estimates-for-e-learning-development/ — ~2 hrs per finished minute (120:1) for Storyline/Captivate interactivity.
- https://www.reddit.com/r/elearning/comments/1e9hbdq/ — practitioner: ~90 hrs for a 30–40 min mildly interactive module (effort corroboration).
- https://elearningart.com/development-calculator/ — development time/cost calculator (methodology reference, listed not opened in depth).

---

## 23-deal-structure-legal-kit.md

**Internal files:**
- `/home/jeramey/projects/lawyer/FINDING-A-LAWYER.md` — MedEdPrep's own attorney-archetype thinking (small-business/startup + SaaS; avoid big-firm/litigator; flat-fee green flags; "you don't need that yet" honesty).
- `/home/jeramey/projects/lawyer/LAWYER-SEARCH.md` — task-by-task local-vs-remote matrix; names Bosin (ToS package), Founders Legal/ContractsCounsel; flags local firm as traditional-business-law, not SaaS.
- `/home/jeramey/projects/lawyer/PRIORITIES.md` — confirms the Bosin SaaS bundle (~$4,500) decision, MSA cost range ($1,000–$2,500), MSA clause checklist (liability caps, IP-license-not-sale, data/breach, termination/portability), and that FERPA is a *future/conditional* concern only.
- `/home/jeramey/projects/heather-contract.md` — real MedEdPrep contract template (entity name "MedEdPrep, LLC," Dallas/Carrollton GA address, payment/term/tax structure) used as the house drafting style and entity reference.
- `/home/jeramey/projects/gtc-demo/` and `/home/jeramey/projects/mededprep-demo/` — confirmed the demo lineage exists as deployed apps (Laravel-based, Lightsail-hosted); establishes the reusable "engine" that is Bucket-A background IP. (READMEs were Laravel boilerplate; asset value is the existence of the prior builds.)
- `/home/jeramey/projects/SOW26/` — existing MedEdPrep SOW PDFs (GTC FY2026), confirming MedEdPrep already operates an MSA/SOW-style document practice to mirror.

**External sources:**
- https://www.genieai.co/blog/essential-ip-and-ownership-clauses-in-software-development-and-services-agreements — work-made-for-hire vs. assignment (WMFH narrow for software → assignment backstop); background-IP carve-out + perpetual license-back; tie ownership to payment; reservation of rights.
- https://gouchevlaw.com/pre-existing-intellectual-property-rights/ — defines background/pre-existing IP; warns against vague "each party keeps its IP"; enhancements-to-background-IP trap; license-vs-transfer-vs-reserve framing; MSA+SOW with an IP schedule; corroborates IP-clause structure (2nd independent source).
- https://faisonlawgroup.com/blog/technology-transactions-lawyer/ — the technology-transactions/SaaS attorney archetype, scope (SaaS + professional/managed services + IP licensing + light data terms), and the "reusable template/playbook" engagement model; corroborates attorney archetype and MSA structure.
- https://commonpaper.com/standards/mutual-nda/ — free mutual-NDA template (2,000+ companies) as a clean starting draft for the gate-NDA.
- https://www.databricks.com/legal/mutual-non-disclosure-agreement — confirms standard no-reverse-engineer/no-decompile language in mutual NDAs (used to scope the clean-room nuance).
- https://hipaauniversity.com/blog/data-processing-agreements/ and https://www.hipaaexams.com/blog/data-processing-agreements — a BAA/DPA belongs where PHI/personal data is processed; basis for the "no BAA needed for training-completion data" conclusion (2 independent sources).

**Single-source flags:**
- The specific $4,500 Bosin SaaS-bundle figure and the $1,000–$2,500 MSA range appear in MedEdPrep's internal notes only (`PRIORITIES.md`) — treat as MedEdPrep's own prior research/estimate, not an externally verified market quote.

---

## 24-lawyers-candidates.md

- https://www.khlawfirm.com/landing/atlanta-saas-lawyer/ — Krevolin & Horst SaaS practice page; named contact Gerry Balboni; confirms SaaS + professional-services form-agreement drafting (Tier 1 lead).
- https://www.r-llaw.com/business-law/startup-small-business-law/ — Reed Leeper, P.C. Marietta small-business/startup, cost-conscious contracts.
- https://www.majpc.com/ — Mark A. Johnson, P.C., Marietta/North Atlanta business-law solo.
- https://www.chouhanlaw.com/business-attorney-marietta/ — Chouhan Law Firm Marietta; commercial contracts, operating agreements.
- https://www.martinandmartinlaw.com/small-business-law.html — Martin & Martin Marietta; flat-fee + monthly-retainer small-business/corporate.
- https://lawyers.findlaw.com/contracts/georgia/cobb-county/ — FindLaw Cobb County contracts; surfaced Brian King, Kennesaw.
- https://www.justia.com/lawyers/business-law/georgia/cobb-county — Justia Cobb County business-lawyer directory (additional NW-metro vetting).
- https://www.clarkhill.com/news-events/news/clark-hill-opens-atlanta-office-with-8-laterals-from-taylor-english/ — establishes Taylor English Duma as a recognized Atlanta tech/commercial firm (8 lawyers recruited away).
- https://www.mmmlaw.com/news-resources/mmm-adds-depth-to-highly-regarded-tech-transactions-practice/ — Morris, Manning & Martin "highly regarded Technology practice" / tech-transactions group.
- https://www.womblebonddickinson.com/us/services/digital-solutions — Womble Digital Solutions: SaaS/cloud, software licensing, data contracts.
- https://www.bradley.com/practices-and-industries/practices/intellectual-property/technology-transactions — Bradley IP/Technology Transactions, Atlanta presence.
- https://www.alston.com/en/services/practices/intellectual-property/intellectual-property-licensing-transactions/ip--software-licensing — Alston & Bird IP & Software Licensing (Atlanta HQ).
- https://www.contractscounsel.com/l/t/us/georgia/atlanta/saas-agreement-lawyers — GA SaaS-agreement lawyer network (~15 GA tech lawyers), flat-fee model.
- https://www.contractscounsel.com/l/t/us/georgia/software-agreement-lawyers — GA software-agreement lawyer network.
- https://www.contractscounsel.com/l/t/us/georgia/saas-reseller-agreement-lawyers — GA SaaS-reseller lawyer network; named Meghan Thomas (single-source).
- https://www.bestlawyers.com/united-states/georgia/atlanta/technology-law — Best Lawyers Atlanta Technology Law ranked directory (vetting).
- https://www.avvo.com/licensing-lawyer/ga/atlanta.html — Avvo: 63 Atlanta licensing attorneys with reviews (vetting solos).
- Local file: /home/jeramey/projects/domination/right-site/ (confirmed output dir; only prior file initial-chat-copy.md) — no internal attorney/legal assets found.
- Local dir: /home/jeramey/projects/domination/01-corporate-structure/ — entity-formation docs only; no attorney candidate list (no relevant counsel names to reuse).

---

## 25-lawyers-fit-analysis.md

- /home/jeramey/projects/domination/right-site/24-lawyers-candidates.md — the candidate list being ranked; supplied all 13 firms, tiers, named contacts, and the prior single-source flags.
- https://www.khlawfirm.com/landing/atlanta-saas-lawyer/ — Krevolin & Horst Atlanta SaaS page; verified the exact "Form Agreements for Licensing of Software and Provision of Professional Services" + "software development, training… data processing" language, the Gerry Balboni contact, and a current "2026 Chambers USA" recognition banner. Primary evidence for the #1 pick.
- https://www.linkedin.com/in/gmbii — Gerry (Gerardo) Balboni LinkedIn; independent corroboration that he is a corporate lawyer specializing in licensing software/SaaS/Cloud at Krevolin & Horst.
- https://www.martinandmartinlaw.com/small-business-law.html (via search snippet) — confirmed Martin & Martin's flat-fee / reasonable-hourly / monthly-retainer model and Marietta small-business/corporate focus (#3 pick economics).
- https://www.r-llaw.com/business-law/startup-small-business-law/ and https://www.r-llaw.com/ (via search snippets) — Reed Leeper, P.C.; surfaced a construction + business-law emphasis and no SaaS/IP specialization, supporting the FLAG and the #4 ranking.
- https://www.contractscounsel.com/l/t/us/georgia/saas-agreement-lawyers (carried from candidate list) — GA SaaS-agreement fixed-fee network; basis for the #2 price-check recommendation; named attorney Meghan Thomas remains single-source/unverified.

---

## 26-codex-market-crosscheck.md

- https://www.qualis.ie/index_htm_files/howlong-100914094357-phpapp02.pdf — Chapman Alliance 2010 source for eLearning levels, development ratios, and average costs per finished hour.
- https://www.edc.org/sites/default/files/edc-distance-edu-book-CH11.pdf — EDC Chapter 11 restating Chapman ratios, Defelice 2021 module development hours, and 2022-dollar cost estimates.
- https://elearningart.com/development-calculator/ — eLearning development calculator; Chapman-style level definitions/ratios and freelance/agency hourly-rate guidance.
- https://christytuckerlearning.com/time-estimates-for-e-learning-development/ — Commentary on eLearning development-time benchmarks and Storyline/Captivate authoring estimates.
- https://www.td.org/content/atd-blog/how-long-does-it-take-to-develop-training-new-question-new-answers — ATD/Defelice 2021 article page confirming 2020 methodology and engagement-level framing; full chart content was not accessible in fetched text.
- https://www.leadinglearning.com/cost-to-create-e-learning/ — Cost conversion using Defelice/ATD estimates and Chapman comparison.
- https://learningcarton.com/guide-to-custom-elearning-costs/ — Custom eLearning package ranges for basic/intermediate/complex courses and Learning Strategist hourly rate.
- https://www.sweetrush.com/articles/custom-elearning-solution-cost — SweetRush public ranges for 60 minutes of Level 1, Level 2, and Level 3 custom eLearning and scenario-branching cost explanation.
- https://bluecarrot.io/blog/e-learning-content-development-cost-per-hour-explained/ — 2026 eLearning development cost guide, hourly role rates, per-hour range, and project examples.
- https://services.elblearning.com/create-learning/elearning-course-development-pricing — ELB Learning custom course pricing factors and interactivity packaging; no fixed dollar pricing.
- https://elmlearning.com/ — ELM Learning official site; confirms custom eLearning agency positioning, no public numeric pricing found.
- https://learningpool.com/blog/off-the-shelf-or-custom-elearning-content — Learning Pool custom content positioning and use cases; no public numeric custom-build pricing found.
- https://www.allencomm.com/2026/04/custom-elearning-development-what-it-costs-and-what-impacts-pricing/ — AllenComm pricing article URL found, but page fetch returned an internal error; search result indicated $15,000-$25,000 for a one-hour moderate course.
- https://www.articulate.com/360/pricing/ — Articulate 360 AI, Reach Starter, Reach Pro, and Localization pricing; creator-seat pricing and learner licensing notes.
- https://www.articulate.com/360/reach/ — Reach positioning and admin/reporting features for no-LMS delivery.
- https://lmschef.com/reach-360-review/ — Third-party Reach review and older Reach pricing signal; useful but superseded by Articulate's current pricing page for exact starting price.
- https://www.storylane.io/plans — Storylane official pricing and feature tiers.
- https://www.xpay.sh/saas-pricing/storylane-io/ — Third-party Storylane pricing snapshot and plan corroboration.
- https://www.navattic.com/pricing — Navattic official pricing/features page; confirms free tier, Base features, seats/demos, but not exact paid dollar amounts in fetched text.
- https://www.arcade.software/post/navattic-pricing-2024 — Third-party Navattic pricing signal for Base and Growth tiers.
- https://www.howdygo.com/blog/navattic-vs-reprise — Third-party comparison citing Navattic and Reprise starting annual prices and implementation notes.
- https://www.walnut.io/pricing/ — Walnut official quote-based pricing page and packaging language.
- https://www.spendflo.com/blog/walnut-pricing-guide — Third-party Walnut Lite/Pro pricing signals.
- https://www.hexus.ai/blog/walnut-pricing-reviews-alternatives-comparison — Third-party Walnut pricing corroboration and Enterprise estimate range.
- https://www.reprise.com/pricing — Reprise official pricing model page: annual platform fee plus per-user licenses.
- https://www.arcade.software/post/reprise-pricing-is-it-worth-it-2024 — Third-party Reprise pricing signal using reported Vendr data.
- https://supademo.com/blog/reprise-pricing — Third-party Reprise pricing range and median contract signal.
- https://www.reprise.com/platform — Reprise platform feature positioning for interactive demos/sandboxes.
- https://www.talentlms.com/prices — TalentLMS public plan pricing, flexible active-user model, and enterprise >1,000 active users.
- https://help.talentlms.com/hc/en-us/articles/9652402239516-How-TalentLMS-subscription-plans-work — TalentLMS plan mechanics and active/flexible-user definitions.
- https://www.talentlms.com/blog/lms-pricing/ — LMS pricing-model guide and annual budget tiers.
- https://www.ispring.com/pricing — iSpring LMS pricing model and feature set, including active-user definition and reports/analytics.
- https://www.ispring.com/knowledge-hub/lms-pricing-guide — iSpring LMS pricing guide with active-user model explanation and 300-user annual example.
- https://www.learnupon.com/pricing/ — LearnUpon official use-case pricing page, user thresholds, features, and quote-based packaging.

---

## 27-gemini-market-crosscheck.md

- [raccoongang.com](https://raccoongang.com) — Provided Chapman Alliance development hours, cost definitions, and analysis of modern development efficiencies.
- [trainingcost.com](http://trainingcost.com) — Corroborated Chapman Alliance cost benchmarks ($10,054, $18,583, $50,371) and inflation-adjusted estimates.
- [christytuckerlearning.com](https://www.christytuckerlearning.com) — Provided detailed comparative analysis of the Chapman Alliance study and the ATD/Defelice studies, with advice on benchmarking.
- [elearningindustry.com](https://elearningindustry.com) — Corroborated the Chapman Alliance study metrics and provided general industry-standard pricing ranges.
- [elearninginmotion.com](https://elearninginmotion.com) — Provided the specific ATD / Kapp & Defelice e-learning development hours (34, 49, 116, 217 hours) and explained the difference between development levels and Kirkpatrick levels.
- [articulate.com](https://articulate.com) — Verified Reach 360 packaging, active learner definitions, and the 300 active-learner limit on the Starter plan.
- [articulatesupport.com](https://articulatesupport.com) — Provided the licensing cost of Articulate 360 Teams ($1,499/year) and Reach 360 Pro contact requirements.
- [rusticisoftware.com](https://rusticisoftware.com) — Provided official pricing tiers for SCORM Cloud (Tester, Little, Medium, Big, Bigger, Mega, Ultra) and registration limits.
- [arcade.software](https://arcade.software) — Provided pricing for the Arcade interactive walkthrough tool and competitor feature analysis.
- [supademo.com](https://supademo.com) — Provided Supademo pricing (Pro, Scale, Enterprise) and detailed comparisons regarding SCORM/LMS limitations of sales-demo tools.
- [storylane.io](https://storylane.io) — Provided Storylane pricing tiers and user seat parameters.
- [navattic.com](https://navattic.com) — Provided Navattic's core feature offerings, landing model, and focus on sales-enablement metrics.
- [vendr.com](https://www.vendr.com) — Provided SaaS contract benchmarks and starting annual pricing data for Walnut, Reprise, Navattic, and Storylane.
- [sweetrush.com](https://www.sweetrush.com) — Provided SweetRush services, staff augmentation offerings, and corporate custom-quote positioning.
- [allencomm.com](https://www.allencomm.com) — Provided AllenComm service details and standard e-learning cost calculators.
- [cognota.com](https://cognota.com) — Corroborated ATD development hours and provided time-tracking recommendations.
- [edgepointlearning.com](https://www.edgepointlearning.com) — Corroborated the ATD / Kapp & Defelice e-learning development hours.

---

## 30-SYNTH-capability-and-build.md

**Files opened:**
- `/home/jeramey/projects/domination/right-site/10-cap-gtc-demo.md` — verified gtc-demo capability: Laravel 12 + dual SQLite + DomPDF + simple-qrcode; persistent telemetry (tamper-checked via `hash_equals`); compliance dashboard + CSV; auto-cert + QR verify; JSON-driven guide engine w/ 8 auto_complete detector types; replica quiz/exam machinery present; confirmed NO video player, NO interleaved-question-in-video, NO branching sim; Supabase/Hugo denied as stack.
- `/home/jeramey/projects/domination/right-site/11-cap-mededprep-demo.md` — verified mededprep-demo deltas over gtc: multi-mode guide (Tour/Sales/Walkthrough), swappable JSON content packs, 3-voice TTS narration, Claude Haiku 4.5 cached/budgeted chat, pain/mode router, analytics funnel + compliance dashboards, QR cert verification, co-browse (Reverb, out of async scope); feature-delta table marking video player / interleaved questions / branching sim as NET-NEW; quiz engine = post-test spine; the §11 reuse plan.
- `/home/jeramey/projects/domination/right-site/12-cap-ruby-studio.md` — Ruby Studio's reusable core for the branching sim: `story_beats` + `beats_router.py` + chat.py injection (authored-node engine), `relationship_state` + `check_and_advance_stage()` + fail-closed `_check_lore_conditions()` (state-gated unlock), persona-authoring method, `emotions.py` background-judge pattern; caveats (re-implement logic in HTML/demo stack not Ruby's; deterministic vs generative; NSFW/brand risk; no auth/single-user).
- `/home/jeramey/projects/domination/right-site/13-research-decisions-gemilius.md` — resolved Gemilius=Gmelius=Supademo naming confusion; Gmelius Academy = Supademo showcase (frozen rrweb snapshots) → "build the illusion ourselves, don't rent" clean-room precedent; recovered interactive-video research (Playwright recordVideo + fake-cursor + TourDirector + ffmpeg; action-in-tooltip ~12hr est; "block outside clicks for forced linear path" flagged YES-for-RightSite); TTS = OpenAI tts-1-hd/nova ~$0.30/corpus; Hugo/Crisp rejected for custom Haiku chat; Supabase = Pulse-only road-not-taken; talking-head avatar UNVERIFIED; single-source pricing figures flagged.

**URLs:** None. Pure synthesis of four internal capability/research teardowns; no external corroboration applicable.

---

## 31-SYNTH-pricing-and-positioning.md

**Internal files (read for this synthesis):**
- `/home/jeramey/projects/domination/right-site/20-market-pricing.md` — open-market floor, per-finished-hour by interactivity level, Chapman dev-hour ratios, per-project ranges, media add-ons, SaaS/vendor-hosted LMS tiers, the 4,000-seat seat-math, and the per-finished-minute commodity framing.
- `/home/jeramey/projects/domination/right-site/21-market-competitors-structure.md` — three competitor categories and their packaging/pricing (demo-SaaS tiers, agency project benchmarks incl. the $20K–$23K branching-sim comp, authoring-tool licenses), the capability gap matrix, and MedEdPrep's differentiated fusion position.
- `/home/jeramey/projects/domination/right-site/22-our-prior-pricing-research.md` — confirmed NO internal precedent for a client-build/host/admin engagement; documented MedEdPrep's per-student SaaS prices, the anti-admin-fee philosophy, state-contract ambition ($100–250K) as a ceiling-of-ambition reference, and the external $5K–$50K/finished-hour anchor.
- `/home/jeramey/projects/gtc-demo/` (dir listing: PROJECT-PLAN.md, SPRINT-PLAN.md, CLAUDE.md, AGENT-TASKS.md, ~25 dated screenshots) — verified the original certificate-issuing demo asset exists on disk; the proof-of-pattern that gives us low marginal build cost.
- `/home/jeramey/projects/mededprep-demo/` (dir listing) — verified the evolved interactive-video + tracking + admin engine asset exists.
- `/home/jeramey/projects/ruby-studio/` (dir listing: CLAUDE.md, backend, canon, character-sheets, data, docs) — confirmed the conversational/personality training assets exist (relevant if the branching call-sim needs scripted persona dialogue).

**External URLs** — no new external fetches; all inherited from the three upstream files. Load-bearing external sources (re-cited for traceability):
- https://bluecarrot.io/blog/e-learning-content-development-cost-per-hour-explained/ — the $20K–$23K 60-min sales-enablement simulation comp (primary build anchor), $5K–$50K/finished-hour range, $5–$10/user/mo seat rate.
- https://www.allencomm.com/2026/04/custom-elearning-development-what-it-costs-and-what-impacts-pricing/ — $5K floor, "interactivity = single largest cost variable," commercial-LMS annual tiers ($3K–$60K), the 15–25% maintenance rule.
- https://elearningsolutionslab.com/elearning-development-costs/ — cost-per-finished-hour by Level 1–4 ($5K→$50K+), corroborating the Level-3 ($20K–$35K) placement of RightSite's ask.
- https://www.howdygo.com/blog/navattic-vs-reprise and https://www.arcade.software/post/storylane-pricing-is-it-worth-it-2024 — demo-SaaS tier pricing (flagged single-sourced figures).

---

## initial-chat-copy.md

No "## Sources touched" section — this file is the raw Chip Walls / RightSite call-prep chat transcript and is itself a primary source (referenced by 13, 20, 21, 22 above as deal-context).

---

## Appendix — All external URLs (deduped)

Bare-domain references from `27-gemini-market-crosscheck.md` are folded into specific URLs where another file cites a deeper page on the same domain; otherwise listed as the domain.

### E-learning cost / dev-ratio benchmarks
- https://bluecarrot.io/blog/e-learning-content-development-cost-per-hour-explained/
- https://www.allencomm.com/2026/04/custom-elearning-development-what-it-costs-and-what-impacts-pricing/
- https://www.allencomm.com (domain)
- https://elearningsolutionslab.com/elearning-development-costs/
- https://christytuckerlearning.com/time-estimates-for-e-learning-development/
- https://www.christytuckerlearning.com (domain)
- https://www.qualis.ie/index_htm_files/howlong-100914094357-phpapp02.pdf
- https://www.edc.org/sites/default/files/edc-distance-edu-book-CH11.pdf
- https://elearningart.com/development-calculator/
- https://www.td.org/content/atd-blog/how-long-does-it-take-to-develop-training-new-question-new-answers
- https://www.leadinglearning.com/cost-to-create-e-learning/
- https://learningcarton.com/guide-to-custom-elearning-costs/
- https://elearningindustry.com
- https://elearninginmotion.com
- https://cognota.com
- https://www.edgepointlearning.com
- https://raccoongang.com
- http://trainingcost.com
- https://www.reddit.com/r/elearning/comments/1e9hbdq/
- https://www.reddit.com/r/instructionaldesign/comments/1rgo1ca/
- https://www.reddit.com/r/elearning/comments/1bu7w2s/another_price_hike_for_articulate_360/

### Custom e-learning agencies
- https://www.sweetrush.com/articles/custom-elearning-solution-cost
- https://www.sweetrush.com (domain)
- https://services.elblearning.com/create-learning/elearning-course-development-pricing
- https://elmlearning.com/
- https://learningpool.com/blog/off-the-shelf-or-custom-elearning-content

### Authoring tools / LMS / hosting
- https://www.articulate.com/360/pricing/
- https://www.articulate.com/360/reach/
- https://articulate.com (domain)
- https://www.articulatesupport.com/article/Articulate-360-Pricing-Options
- https://articulatesupport.com (domain)
- https://lmschef.com/reach-360-review/
- https://www.talentlms.com/prices
- https://help.talentlms.com/hc/en-us/articles/9652402239516-How-TalentLMS-subscription-plans-work
- https://www.talentlms.com/blog/lms-pricing/
- https://www.ispring.com/pricing
- https://www.ispring.com/knowledge-hub/lms-pricing-guide
- https://www.learnupon.com/pricing/
- https://rusticisoftware.com
- https://lindsayoconsulting.com/how-interactive-is-your-elearning-h5p-storyline-and-captivate-compared/

### Interactive-demo / product-tour SaaS
- https://www.howdygo.com/blog/navattic-vs-reprise
- https://www.arcade.software/post/storylane-pricing-is-it-worth-it-2024
- https://www.arcade.software/post/navattic-pricing-2024
- https://www.arcade.software/post/reprise-pricing-is-it-worth-it-2024
- https://arcade.software (domain)
- https://www.storylane.io/plans
- https://storylane.io (domain)
- https://www.xpay.sh/saas-pricing/storylane-io/
- https://www.navattic.com/pricing
- https://navattic.com (domain)
- https://www.walnut.io/pricing/
- https://www.spendflo.com/blog/walnut-pricing-guide
- https://www.hexus.ai/blog/walnut-pricing-reviews-alternatives-comparison
- https://www.reprise.com/pricing
- https://www.reprise.com/platform
- https://supademo.com/blog/reprise-pricing
- https://supademo.com (domain)
- https://www.vendr.com (domain)

### Legal / contracts / IP
- https://www.genieai.co/blog/essential-ip-and-ownership-clauses-in-software-development-and-services-agreements
- https://gouchevlaw.com/pre-existing-intellectual-property-rights/
- https://faisonlawgroup.com/blog/technology-transactions-lawyer/
- https://commonpaper.com/standards/mutual-nda/
- https://www.databricks.com/legal/mutual-non-disclosure-agreement
- https://hipaauniversity.com/blog/data-processing-agreements/
- https://www.hipaaexams.com/blog/data-processing-agreements

### Attorney candidates / directories
- https://www.khlawfirm.com/landing/atlanta-saas-lawyer/
- https://www.linkedin.com/in/gmbii
- https://www.r-llaw.com/business-law/startup-small-business-law/
- https://www.r-llaw.com/
- https://www.majpc.com/
- https://www.chouhanlaw.com/business-attorney-marietta/
- https://www.martinandmartinlaw.com/small-business-law.html
- https://lawyers.findlaw.com/contracts/georgia/cobb-county/
- https://www.justia.com/lawyers/business-law/georgia/cobb-county
- https://www.clarkhill.com/news-events/news/clark-hill-opens-atlanta-office-with-8-laterals-from-taylor-english/
- https://www.mmmlaw.com/news-resources/mmm-adds-depth-to-highly-regarded-tech-transactions-practice/
- https://www.womblebonddickinson.com/us/services/digital-solutions
- https://www.bradley.com/practices-and-industries/practices/intellectual-property/technology-transactions
- https://www.alston.com/en/services/practices/intellectual-property/intellectual-property-licensing-transactions/ip--software-licensing
- https://www.contractscounsel.com/l/t/us/georgia/atlanta/saas-agreement-lawyers
- https://www.contractscounsel.com/l/t/us/georgia/software-agreement-lawyers
- https://www.contractscounsel.com/l/t/us/georgia/saas-reseller-agreement-lawyers
- https://www.bestlawyers.com/united-states/georgia/atlanta/technology-law
- https://www.avvo.com/licensing-lawyer/ga/atlanta.html

### Internal asset referenced by URL
- https://demo.mededprep.com — live MedEdPrep demo (gated; not independently scraped)

### Inherited (cited inside upstream research files, not re-fetched here)
- supademo.com/pricing, arcade.software/pricing, navattic.com, storylane.io, learn.gmelius.com, crisp.chat, and the driver.js / shepherd / intro.js GitHub repos (from `13-research-decisions-gemilius.md`, verified 2026-04-03 / 2026-06-02)
