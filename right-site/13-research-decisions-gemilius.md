# Recovered Decision Research: "Gemilius," Supabase, Hugo & the Interactive-Video Approach

**Task:** Recover the decision research that shaped `gtc-demo` → `mededprep-demo` (demo.mededprep.com), the pattern MedEdPrep will reuse to build RightSite Health's asynchronous, trackable, interactive training module.
**Date compiled:** 2026-06-19
**Bottom line up front:** The research EXISTS, is largely intact, and is mostly in `mededprep-demo/research/gmelius-onboarding/` (12 docs) plus a Pulse-side synthesis and a standalone Supabase evaluation. The four targets resolve as follows:

| Target you asked for | What it actually is | Found? |
|---|---|---|
| (a) "Gemilius" Gmail-platform onboarding teardown | **Gmelius Academy** (`learn.gmelius.com`) — a Gmail collaboration platform's training hub. "Gemilius" is a phonetic misremembering of **Gmelius**. Full teardown recovered. | YES — complete |
| (b) Supabase evaluation/decision notes | TWO different things got conflated under this name. (1) **Supademo** = the interactive-demo SaaS that actually powers Gmelius Academy — fully researched. (2) **Supabase** = backend-as-a-service, evaluated separately for the Pulse mobile app — full standalone eval recovered. | YES — both, see §3 |
| (c) Hugo decision notes | **Hugo** = Crisp's AI support agent (crisp.chat). Gmelius uses it for support chat. Full analysis recovered. | YES — complete |
| (d) Interactive-video approach research | Playwright-recorded choreographed video tours + action-in-tooltip + audio narration. Fully recovered. | YES — complete |

> **Critical naming clarification for the whole team:** "Gemilius," "Gmelius," "Supademo," and "Supabase" are FOUR distinct things that sound alike and have been getting cross-confused even inside MedEdPrep's own files (the Pulse synthesis doc, `DEMO-RESEARCH-SYNTHESIS.md`, explicitly flags this confusion in its §3). Do not let this contaminate the RightSite conversation. Resolution below.

---

## 0. How the two demos relate (the lineage you're reusing for RightSite)

- **`gtc-demo`** (`/home/jeramey/projects/gtc-demo`) — the ORIGINAL. A pixel-perfect, ephemeral Laravel sandbox replica of the MedEdPrep admin panel built for Georgia Trauma Commission program-director onboarding. Tech: Laravel 12 + per-session SQLite + Blade + AdminLTE 3 + Bootstrap 4 + Alpine.js + jQuery. Shipped v1.0 + v2.0 (Mar 2026). Key invention: **copy-on-login DB isolation** (each visitor gets a private SQLite copy, destroyed on logout/timeout) + a **JSON-driven guide panel** with "Take me there" buttons + a date-shifting pipeline so reports look current. It issued completion artifacts and was the proof that a faithful HTML "illusion" of a real product UI can be a training environment.
- **`mededprep-demo`** (`/home/jeramey/projects/mededprep-demo`, deployed to demo.mededprep.com) — the EVOLUTION. Same Laravel/SQLite/Alpine core, but expanded into: an **11-task / 50+ step guided tour** with **7 auto-complete trigger types** (route, click, dom_exists, form_submit, scroll, input_change, route_pattern), a **dual-mode split** (prospect "Tour" mode vs internal "Sales" battle-card mode, later a "Test Prep Focus" vs "Full Platform Tour" track chooser), an **AI chat assistant** (Claude Haiku, context-stuffed knowledge base, SSE streaming), **telemetry/compliance tracking**, **co-browse**, and a roadmap that added **Driver.js tooltips + audio narration + Playwright video tours**.

For RightSite, this lineage is exactly the asset: `gtc-demo` proves the "build a faithful clickable illusion of a vendor's UI for training" clean-room pattern; `mededprep-demo` proves the interleaved-questions / tracking / admin-stats / certificate-on-completion / dual-format (interactive sandbox + recorded video) layer Chip Walls is describing.

---

## 1. The "Gemilius"/Gmelius Academy teardown (target a) — RECOVERED IN FULL

**Source files:** `research-gmelius-analysis-v2.md`, `research-gmelius-analysis.md`, `research-gmelius-platform.md`, and the consolidated `SYNTHESIS.md`, all in `mededprep-demo/research/gmelius-onboarding/`. Dated 2026-04-03.

**What Gmelius Academy is:** `learn.gmelius.com` is the interactive product-training hub for Gmelius, a Gmail collaboration platform. The founder studied it as the gold-standard onboarding experience he liked. The teardown was done by HTML inspection + web verification.

**Conclusion #1 — It's not custom-built; it's Supademo.** Direct evidence: all CSS/JS loads from `cdn.supademo.com/v3.0.23/`; `data-wappalyzer-identifier="supademo"` in the HTML; `og:site_name="Supademo"`; the URL is a Supademo "Showcase" (`/showcase/clsj273...`, a CUID); it's a Next.js client-rendered SPA on a custom domain (CNAME to Supademo). What looks like a bespoke Academy is a no-code SaaS configuration.

**Conclusion #2 — Decomposition of the experience the founder liked:**
- AI voice narration during walkthroughs (Supademo's ElevenLabs integration)
- A brief "digital presenter"/avatar overlay (flagged as UNVERIFIED — Supademo doesn't natively do avatars; may be a video overlay or a Navattic-bleed; the doc explicitly says "needs verification")
- Clickable "sandbox" of a simulated Gmail interface (Supademo HTML capture / Clickable Sandbox)
- Optional video version of the same tour
- Tooltip popups with action buttons + pulsing highlight outlines (Supademo callout/area hotspots)
- Left category sidebar organizing many demos (Supademo "Showcases")
- Custom branding, no watermark, custom domain (Supademo Scale+ features)

**Conclusion #3 — Gmelius is paying ~$350/mo (Supademo Growth) just for the demo layer**, plus ~$95/mo for Hugo support chat = ~$445/mo (~$5,340/yr) for demo + chat.

**Conclusion #4 — the strategic verdict (this is the most important recovered decision):** Do NOT subscribe to Supademo. Supademo's "interactive" demos are **frozen DOM snapshots recorded with rrweb — no JS runs, no API calls, no backend.** MedEdPrep's demo is the *real application* with real DB writes and session isolation. The synthesis line: *"This isn't a slideshow of screenshots. This is the real application. Every button works. Every form submits."* Subscribing would be a downgrade. Instead, close the polish gap (tooltips, audio, AI chat) with cheap/free tooling. **This is the clean-room precedent for RightSite: build the faithful working illusion ourselves, don't rent a snapshot tool.**

---

## 2. Interactive-video & tooltip approach research (target d) — RECOVERED IN FULL

Two complementary docs, plus the roadmap phase.

### 2a. Action-in-tooltip + pulsing highlight (`research-action-tooltip-ux.md`)
This is the "explainer appears mid-action as buttons are clicked" mechanic Chip Walls described. Recovered decisions:
- **"Do this for me" action button inside the tooltip** that programmatically `.click()`s the real element (with `navigate`/`fill`/`select` variants for Select2, form fills, modals). Auto-derives the action from existing `highlight`/`navigate_to` fields.
- **Positioning:** Floating UI (`@floating-ui/dom`, ~8KB, CDN, Popper.js successor) for tooltip placement, flip, shift, arrow.
- **Highlight:** keep box-shadow pulse (gold) + offer a purple "Gmelius-style" variant + optional radar-ping ring; spotlight dimming via the existing 9999px box-shadow trick or an SVG-mask cutout.
- **Integration:** purely additive to `guide-store.js`'s `updateHighlight()` — nothing rewritten. Effort ~12 hrs, phased.
- Open question recorded: should the tooltip overlay BLOCK clicks outside the target (Gmelius does) — recommendation was NO for MedEdPrep (values free exploration), but **for RightSite training you may want YES (forced linear path) — note this divergence.**

### 2b. Programmatic video tours via Playwright (`research-playwright-video.md`)
This is the "snip and reassemble their raw footage / produce a watchable recorded walkthrough" capability. Recovered decisions:
- **Recording:** Playwright native `recordVideo` (WebM/VP8, ~25fps, ~60KB/s, ~18MB for 5 min). Verified working on Playwright 1.58.2.
- **Cursor:** headless recording does NOT capture the OS cursor — inject a fake SVG cursor DOM element that tracks `mousemove`, add click-ripple effect; re-inject after every navigation. Verified working.
- **Choreography:** a `TourDirector` class wrapping Playwright actions with cinematic timing (settle pauses, eased `mouse.move({steps})`, reading beats, natural typing).
- **Post-processing:** ffmpeg WebM→MP4 (`-crf 18`), Ken Burns zoom/pan, intro/outro concat, merge narration audio track.
- **Higher-quality alt:** headed mode in Xvfb + ffmpeg x11grab (real cursor, any bitrate, audio) — heavier; only if needed.
- **Rejected:** abandoned `playwright-video` npm pkg (2020); Remotion/Motion Canvas (overkill for browser capture).
- **The "Gmelius-style dual offering" decision:** present BOTH on the landing page — "Interactive Sandbox: Try it yourself" AND "Video Tour: Watch a guided walkthrough." This directly maps to RightSite's "watch the platform being used" + "interact with it" dual requirement.

### 2c. Audio narration (`research-audio-narration.md`, summarized in the synthesis/roadmap)
- Winner: **OpenAI `tts-1-hd`, `nova` voice** — near-human, ~$0.30 to generate the entire ~50-clip corpus. ElevenLabs is the upgrade path for voice cloning.
- **Pre-generated static MP3s** (zero latency, no runtime API, browser-cached), default-muted/opt-in, 300ms fade on step change, catch/ignore autoplay rejections, preload per-task on expand.

---

## 3. Supabase vs Supademo — the conflation, resolved (target b)

There is no single "Supabase decision that shaped the demo," because **Supabase never shaped the demo.** What happened:

1. **Supademo** (interactive-demo SaaS) is the thing that powers Gmelius and was deeply researched for the demo — see §1 and these files in `gmelius-onboarding/`: `research-supademo-platform.md`, `research-supademo-alternatives.md`, `research-supademo-open-source.md`, `research-rrweb-analysis.md`. Decision: **build our own live sandbox, don't buy Supademo.** The platform landscape (Supademo / Arcade / Storylane / Navattic / Walnut / Tourial) was matrixed with verified pricing.
2. **Supabase** (Postgres backend-as-a-service) was evaluated entirely separately — NOT for the demo, but for the **Pulse React Native mobile app**. The dedicated doc is `pulse-app/.research/backend-infra/SUPABASE-EVALUATION.md` (dated 2026-06-02), with companions `SELF-HOSTED-ALTERNATIVES.md` and `SUPABASE-SELF-HOST-TECHNICAL.md`.

**The Pulse Supabase evaluation's conclusion (recovered):** **Do NOT adopt Supabase as Pulse's primary backend.** Reasoning: Pulse already has a production Node/Express + Prisma + Postgres + Socket.IO backend with 13 custom stateful game engines, server-authoritative timers, Redis crash recovery, and bespoke scoring/economy logic — none of which PostgREST/Edge Functions (2s timeout, 256MB) can host. Supabase shines for *greenfield* simple-CRUD apps; for a future greenfield MedEdPrep product, use **Supabase cloud (not self-hosted)** at ~$25/mo. Self-hosting Supabase (12-container Docker Compose, 8GB RAM min) is "a trap" for a solo founder's ops budget. Vendor risk judged low-moderate (well-funded, data is portable Postgres).

> **Relevance to RightSite:** The demo lineage uses **Laravel + per-session SQLite**, NOT Supabase. If RightSite's module needs an admin login + completion stats, the existing demo's telemetry/compliance pattern (Laravel + SQLite/MySQL + a `trainees` table + step-completion logging) is the proven path. Supabase is only worth considering if RightSite is scoped as a brand-new standalone greenfield product with simple CRUD and you want managed auth + a stats dashboard out of the box — in which case Supabase **cloud** is defensible. Flag this as an open architecture decision for the RightSite build, not a settled one.

---

## 4. Hugo / Crisp decision notes (target c) — RECOVERED IN FULL

**Source:** `research-hugo-ai-chat.md` + `research-ai-support-chat.md` + `research-demo-ai-assistant.md` (all in `gmelius-onboarding/`), synthesized in `SYNTHESIS.md` and the Pulse cherry-pick doc.

- **Hugo** = the AI support agent built by **Crisp** (crisp.chat, French co.). RAG-based, trained on a customer KB, LLM-agnostic (Claude/GPT/Llama), uses MCP for live tools, smart human-escalation. Gmelius uses Crisp+Hugo as its support chat.
- **Pricing (2026):** Mini $45/mo (~90 AI convos), Essentials $95/mo (~450), Plus $295/mo (~1,350), Enterprise custom. 50% nonprofit/student discount, 14-day trial. Gmelius is on ~$95/mo.
- **DECISION: Build our own, don't buy Crisp/Hugo.** For the demo's needs, a custom Claude API chat is better and cheaper: **Claude Haiku 4.5 with context-stuffing** (KB ~15–30K tokens fits in the system prompt — no RAG, no vector DB), SSE streaming, prompt caching → ~$0.006/follow-up, ~$33/mo at 1,000 exchanges.
- **Hugo UX patterns worth stealing (platform-agnostic, apply to RightSite too):** "AI Answer" badge, source citations, graceful "I don't know," suggested follow-up chips, typing indicator, in-session memory, non-intrusive trigger, streaming responses, and an explicit **"what we don't cover"** section in the KB to prevent hallucination.

---

## 5. Where each piece lives (quick index for the RightSite build team)

| Piece | Path |
|---|---|
| Gmelius teardown (the "Gemilius" doc) | `mededprep-demo/research/gmelius-onboarding/research-gmelius-analysis-v2.md` (+ `-analysis.md`, `-platform.md`) |
| Master synthesis (12 docs distilled) | `mededprep-demo/research/gmelius-onboarding/SYNTHESIS.md` |
| Implementation roadmap (Driver.js/audio/chat/video phases) | `mededprep-demo/research/gmelius-onboarding/research-implementation-roadmap.md` |
| Action-in-tooltip + pulsing highlight | `mededprep-demo/research/gmelius-onboarding/research-action-tooltip-ux.md` |
| Playwright video tours | `mededprep-demo/research/gmelius-onboarding/research-playwright-video.md` |
| Audio narration / TTS | `mededprep-demo/research/gmelius-onboarding/research-audio-narration.md` |
| Hugo/Crisp + AI chat | `mededprep-demo/research/gmelius-onboarding/research-hugo-ai-chat.md`, `research-ai-support-chat.md`, `research-demo-ai-assistant.md` |
| Supademo platform / alternatives / OSS / rrweb | `mededprep-demo/research/gmelius-onboarding/research-supademo-platform.md`, `-alternatives.md`, `-open-source.md`, `research-rrweb-analysis.md` |
| Tour-framework lib eval (Driver.js vs Shepherd vs Intro.js) | `mededprep-demo/research/gmelius-onboarding/research-tour-frameworks.md` |
| Supabase backend eval (Pulse, NOT the demo) | `mededprep-ecosystem/pulse-app/.research/backend-infra/SUPABASE-EVALUATION.md` |
| Pulse-side cherry-pick of all demo research | `mededprep-ecosystem/pulse-app/.research/demo-research-cherry-pick/DEMO-RESEARCH-SYNTHESIS.md` |
| Demo-mode split / track chooser / interleaved-question track | `mededprep-demo/.planning/research/phase3-demo-mode-split.md` |
| gtc-demo architecture/stack/decisions (the original sandbox) | `gtc-demo/.planning/research/ARCHITECTURE.md`, `STACK.md`, `gtc-demo/.planning/PROJECT.md` |

---

## 6. Could-not-find / gaps (explicit)

- **No file literally named "Gemilius."** Confirmed: zero hits for `gemilius`/`gemilus`/`gemilious` anywhere under `/home/jeramey/projects` (incl. `.recovery/`). The asset is `Gmelius` — the founder's phonetic recall was off by transposed letters. Not a loss; the teardown is intact under "gmelius."
- **The "digital presenter / AI avatar" the founder may remember from Gmelius Academy is UNVERIFIED** in the research itself (the analysis doc flags it as needing verification — Supademo doesn't natively do avatars). If RightSite wants a talking-head, treat it as net-new, not a recovered/solved pattern.
- **No standalone Hugo doc in `domination/` or `.recovery/`** — the Hugo notes live only inside the `mededprep-demo` repo, not in the domination planning tree. Recovered, just located elsewhere.
- **`research-demo-expansion.md` is listed in the `.recovery/files/` index but does NOT exist on disk** at `/home/jeramey/projects/domination/research-demo-expansion.md` (open attempt returned "file does not exist"). It may be a stale index entry or an un-restored recovery target. Flagging as a possible still-lost file; all its likely content is nonetheless covered by the `gmelius-onboarding/` corpus and the roadmap.
- **Single-source figures (flagged):** the "48% higher completion for hub-and-spoke" stat (Navattic), Navattic's "$500+/mo" and Walnut's "$10K+/yr" pricing are each cited from a single source/estimate in the research and were NOT independently re-verified in this recovery pass. Treat as directional.

---

## Sources touched

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

No external URLs were fetched in this recovery pass; the original research files themselves cite the external sources (supademo.com/pricing, arcade.software/pricing, navattic.com, storylane.io, learn.gmelius.com, crisp.chat, github driver.js/shepherd/intro.js) with their own verification dates of 2026-04-03 / 2026-06-02.
