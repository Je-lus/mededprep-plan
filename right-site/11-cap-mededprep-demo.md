# Capability Teardown — `/mededprep-demo/` & demo.mededprep.com

**What it is:** A Laravel 12 / PHP 8.3 application that is a pixel-faithful clean-room replica of the MedEdPrep admin panel, wrapped in a guided self-service onboarding/sales layer. It is the **direct evolution of `/gtc-demo/`** — same codebase lineage (identical README, CLAUDE.md, screenshots, baseline.sqlite, Lightsail keys carried forward), forked and substantially extended. Deployed live at **demo.mededprep.com** on AWS Lightsail.

This document inventories everything `/mededprep-demo/` added **over** `/gtc-demo/`, mapped to the RightSite requirement set.

> **Lineage proof:** Both repos share `CLAUDE.md`, `README.md`, `composer.json` skeleton, `tests/visual/baselines`, `LightsailDefaultKey-*.pem`, and the same 36-screenshot golden-baseline set. `/gtc-demo/` last commit Mar 2026; `/mededprep-demo/` actively developed through Jun 2026. gtc-demo = "GTC Training Sandbox"; mededprep-demo = "MedEdPrep Demo" (generic, no customer branding) with v3.0 co-browse milestone.

---

## 0. The single most important finding for RightSite

**Neither demo contains an embedded-video training engine.** Both demos teach by driving the *real (replica) app UI* — the learner clicks through actual pages while a guide panel narrates, highlights elements, and auto-validates each action. There is no "watch a screencast with an explainer popping up mid-click" player, no interleaved multiple-choice video gates, and no branching call simulation.

**Implication for the RightSite build:** the parts MedEdPrep can reuse near-wholesale are the *wrapper* (auth gate, hosting, per-session isolation, completion telemetry, admin/stats dashboard, certificate + verification, AI chat helper, mode selection, audio narration). The parts that are **net-new** for RightSite are exactly the things Chip Walls emphasized: (1) the chaptered video player with mid-action explainer overlays, (2) knowledge-check *questions interleaved in the video timeline*, and (3) the scripted **branching live-call simulation**. The student-side quiz/exam engine (see §7) is the closest existing primitive to bolt a post-test onto.

---

## 1. Architecture baseline (carried over from gtc-demo, reused by mededprep-demo)

These already exist and are directly reusable for a RightSite training app:

| Capability | Mechanism | Reuse value for RightSite |
|---|---|---|
| **Per-session isolation** | `DatabaseBind` / `SessionLifecycle` middleware copies `baseline.sqlite` → a per-session SQLite file keyed by `sandbox_uuid`. Each visitor gets a private sandbox. | Each fire-dept trainee gets an isolated state without per-user accounts. |
| **Gate authentication** | Single shared credential, pre-filled & `readonly` on the login form (`config('sandbox.gate_username')` / `gate_password`). Visitor first registers a lightweight "trainee" record (name/email), then passes the gate. | Frictionless org-wide access: hand Houston FD one URL + one credential; capture identity at register step. |
| **Inactivity / session timer** | `InactivityTimeout` middleware + 45-min countdown with warning modal (gtc used 15-min). | Keeps sessions bounded; not strictly needed but free. |
| **Reset to baseline** | `ResetController@reset` restores the per-session DB. | Trainee can restart the module cleanly. |
| **Visual-fidelity discipline** | Playwright golden-baseline pixel-diff harness (`npm run visual:test`, 36 PNGs). | The clean-room methodology for faithfully reproducing RightSite's UI as an "illusion." |
| **Static-asset stack** | AdminLTE 3.2 dark theme, Alpine.js, jQuery/Select2/SweetAlert; **no Vite/Mix** — assets served static from `public/`. | Low-ops hosting model. |

---

## 2. NEW: Guided Walkthrough engine (the core onboarding system)

This is the headline addition over gtc-demo's simpler guide. Content lives in **`guide-content.json`** (11 tasks, ~62 KB) and is rendered by an Alpine.js store stack in `public/assets/guide/`.

**Content model (`guide-content.json`):**
- Top-level `tasks[]`, each with: `id`, `title`, `description` (multi-sentence value framing), `icon`, `estimated_minutes`, `completion_message` ("Next, you'll…" forward-linking), `chapter`, and `steps[]`.
- Each **step** has: `order`, `title`, `instruction`, `navigate_to` (route the guide will push the user to), `highlight` (CSS selector to spotlight) or `highlight_sequence[]`, `popoverSide`, and an **`auto_complete`** trigger.
- **`auto_complete` types** (this IS the "knowledge check" mechanism in this codebase): `route`, `click`, `scroll` (with threshold), `input_change`, `form_submit`, `dom_exists`. The learner must *actually perform the real action* to advance — not click "Next." This is interactive, non-passive completion gating.

**Engine (`public/assets/guide/`):**
- `guide-store.js` — Alpine store: accordion, per-step completion tracking in `sessionStorage` (`demo_completed_steps`), progress %, task-complete detection, telemetry POSTs, completion-screen fetch, confetti milestone.
- `guide-driver.js` + `guide-driver-integration.js` (driver.js) — element spotlight/popover overlay engine.
- `guide-content.js` — compiled task content for the client.
- `guide-skip.js` — lets a user skip a task; calls a **seed endpoint** (`SeedStepController`, `POST /api/demo/seed-step/{taskId}`) that programmatically seeds the DB into the post-task state so later steps still work.
- `guide-help.js` — contextual help.
- `guide-panel.css` / `guide-driver.css` / `guide-help.css` — themed panel UI.

**Three parallel guide MODES** (a major gtc→mededprep addition):
1. **Tour mode** — self-guided learner walkthrough (`guide-store-tour.js`, `guide-panel-tour.css`).
2. **Sales mode** — page-aware battle cards / talking points for reps (`guide-store-sales.js`, `guide-content-sales.js`, `guide-sales-content.json`, `guide-panel-sales.css`).
3. **Guided Walkthrough** — the default 11-task onboarding flow above.
- Separate content file `guide-content-testprep.json` (4 tasks) shows the content is **swappable per audience** — directly relevant: a RightSite content pack would be a new JSON.

---

## 3. NEW: Audio / TTS narration

`public/assets/guide/guide-audio.js` + `guide-audio.css` — an Alpine `audio` store that plays **pre-rendered MP3 narration** per task and per event type:
- File convention `/assets/guide/audio/{voice}/{taskId}-{type}.mp3` (e.g. `nova/view-students-intro.mp3`); `type` ∈ intro/complete.
- **Three voices: Nova, Onyx, Studio** (OpenAI TTS voice names) with A/B/C voice testing; user prefs (`demo_audio_speed` {1.0/1.25/1.5}, `demo_audio_muted`, `demo_audio_voice`) in localStorage.
- Auto-plays a task's intro narration on open and a completion sound when all steps finish.
- Narration is **static audio files** (no live TTS call at runtime) — cheap, deterministic, reusable model for RightSite voiceover.

---

## 4. NEW: AI chat assistant (page-contextual)

`ChatController.php` + `public/assets/chat/` (`chat-store.js`, `chat-markdown.js`, `chat-widget.css`). Route: `POST /api/chat` (throttle 20/min).
- Backed by an Anthropic model (project notes: **Haiku 4.5**), with **page-contextual suggested questions**.
- **Context bucketing:** routes are mapped into ~7 buckets (`dashboard`, `students`, `payment`, `groups`, `exams`, `reports`, `general`) so the same question on similar pages **shares a cache entry** (cost control).
- **Per-session budget:** 50 API-hitting messages/session (cached responses are free).
- **Pain-point priming:** tone/emphasis adjusted by the visitor's selected pain (see §6) — "no new facts introduced."
- `SeedChatCache.php` console command pre-warms the answer cache.
- **Chat logs are admin-viewable** (`ChatLogController`, `/admin/compliance/chat-log`) and `ChatEngagementNotification` emails the sales team on engagement.

---

## 5. NEW: Admin / stats dashboard + completion telemetry (the "admin login" RightSite wants)

This is the strongest direct match to RightSite's "admin login to see users + completion stats." Two layers:

**A. Compliance / admin dashboard** (`/admin/compliance`, `ComplianceDashboardController`, `ComplianceAuthController`, `EnsureComplianceDashboardAccess` middleware):
- Separate admin login (independent from the trainee gate).
- `index` — dashboard of trainee stats, charts, filters.
- `show/{trainee}` — single-trainee detail with task/step breakdown.
- `export` — **CSV export** of filtered trainee data.
- Per-trainee **certificate generate** and **email** actions.
- Chat-log viewer.

**B. Analytics funnel dashboard** (`AnalyticsController`, view `admin/analytics/funnel`, route `/analytics/funnel`; plus token-protected JSON `GET /api/analytics/summary`):
- Metrics: total visitors, demos started, demos completed, **completion rate**, average session duration, features explored, **top pages**, and **drop-off points / funnel per task & per step** (started → completed, drop-off %, avg time per step).
- Backed by two persistent tables (see below), separate from the throwaway per-session sandbox DB.
- `EnsureAnalyticsToken` middleware (bearer token) guards the API.

**C. Telemetry pipeline** (`TelemetryController`, called from `guide-store.js`):
- `POST /api/telemetry/step-start`, `/step-complete` (records duration), `/complete` (marks trainee complete → triggers certificate), `GET /summary` (per-task timing JSON).
- `TrackRouteUsage` middleware logs every page hit → `route_hits` table.

**Persistent data model (new migrations over gtc-demo):**
- `route_hits` — every URI visited (`2026_03_20`).
- `trainees` table gains `saved_session_path` (session resume), `started_at`, `completed_at`, `selected_pain`, `selected_pain_text` (`2026_04_06`, `2026_06_04` pain-telemetry).
- `TraineeStepEvent` model — per-step start/complete/duration events (the funnel substrate).
- `sales_team_members` (`2026_04_06`) — engagement notification recipients.
- Trainee model uses a dedicated **`persistent` DB connection** — survives session resets, unlike the per-session sandbox DB. This separation is the key pattern: ephemeral training state vs. durable admin/reporting store.

---

## 6. NEW: Mode-selection / pain-router landing

`choose-mode.blade.php` + `ChooseModeController` (`choose-mode.submit`): instead of the server silently picking a mode, the visitor picks "what are you trying to fix?" (pain buttons: reports/weak-areas, replace-tool, exam-integrity, ROI-accreditation, or free-text). Selection is stored on the trainee (`selected_pain`) and primes chat tone + sales emphasis. A RightSite analog would be role selection (medic / supervisor / dispatcher).

---

## 7. EXISTING student-side quiz/exam engine (closest primitive for a RightSite post-test)

Because the demo replicates the *full* MedEdPrep platform, it already carries a working **student quiz + exam engine** (replicated, not the real backend): `Frontend\QuizzeController`, `Frontend\UnitExamController`, `public/pages/frontend/quiz.js`, `quiztest.js`, `quiz_review.js`. Routes under `/student/*` cover: create targeted quiz / simulator, start session, save individual answers, submit, score, review question-by-question, retake. This is the asset to repurpose for RightSite's **post-test** (and as the scoring spine under a branching sim). It is *not* video-interleaved — it's standalone quiz pages.

---

## 8. NEW: Certificate + QR verification (the "certificate on finish" match)

`CertificateController` + `simplesoftwareio/simple-qrcode` + `barryvdh/laravel-dompdf` (both present in composer; QR lib is new vs. gtc). Views `certificate/completion.blade.php`, `certificate/verify.blade.php`.
- On telemetry `complete`, a certificate is generated (PDF via dompdf).
- Public routes: `/certificate/{hash}` (inline view), `/certificate/{hash}/download`, `/verify/{hash}` (**public verification page with QR**).
- Admin can regenerate/email a trainee's certificate from the compliance dashboard.
- gtc-demo already had certificate generation (it "issued certificates on completion"); mededprep-demo **added QR-coded public verification**. Reusable as-is for RightSite completion certs.

---

## 9. NEW: Live co-browse (v3.0 milestone) — sales rep & prospect share screen

Not required by RightSite (their ask is *async*), but documents how far the platform went and what's available. `CobrowseController`, `CobrowseJoinController`, `CobrowseSession` middleware, models `CobrowseRoom`/`CobrowseRoomMember`; `public/assets/cobrowse/*` (cursor sync, scroll sync, nav sync, annotation via `perfect-freehand` "invisible ink," interaction transfer). Powered by **Laravel Reverb** (the one new composer dep over gtc: `laravel/reverb`) over WebSockets, with 4-digit phone-friendly join codes ("go to demo.mededprep.com and type A7K3"). Both browsers run the real app against the *same* per-session SQLite. Listed here for completeness; likely out of scope for the RightSite async module but a possible upsell ("live-assist a fire dept onboarding").

---

## 10. Feature delta summary: gtc-demo → mededprep-demo

| Feature | gtc-demo | mededprep-demo | RightSite relevance |
|---|---|---|---|
| Replica admin UI + visual baseline harness | ✅ | ✅ | Clean-room method |
| Per-session SQLite isolation | ✅ | ✅ | Reusable |
| Gate auth (shared credential) | ✅ | ✅ | Reusable (admin hand-off) |
| Session timer / reset | ✅ (15m) | ✅ (45m) | Optional |
| Guide panel (basic) | ✅ (`guide-panel.js`) | ✅ rebuilt as driver.js store stack | Core onboarding |
| Multi-mode guide (Tour / Sales / Walkthrough) | ❌ | ✅ | Audience-swappable content |
| Swappable content packs (JSON) | single | ✅ multiple JSON files | RightSite = new JSON pack |
| Audio/TTS narration (3 voices) | ❌ | ✅ | Voiceover for module |
| AI chat assistant (contextual, cached, budgeted) | ❌ | ✅ Haiku 4.5 | "Ask a question" helper |
| Pain/mode selection router | ❌ | ✅ | Role selection analog |
| Route-hit + step-event telemetry tables (persistent) | ❌ | ✅ | Completion stats engine |
| Analytics funnel dashboard (drop-off, avg time) | ❌ | ✅ | **Admin stats — direct match** |
| Compliance/admin dashboard (per-trainee, CSV export, cert email) | partial (gtc compliance routes) | ✅ expanded | **Admin login — direct match** |
| Certificate generation | ✅ | ✅ | Completion cert |
| QR public verification | ❌ | ✅ | Cert authenticity |
| Live co-browse (Reverb WebSockets) | ❌ | ✅ | Out of async scope |
| **Embedded video player w/ mid-action explainer overlays** | ❌ | ❌ | **NET-NEW for RightSite** |
| **Knowledge-check questions interleaved in video timeline** | ❌ | ❌ (auto_complete gates ≠ quiz items) | **NET-NEW for RightSite** |
| **Scripted branching live-call simulation** | ❌ | ❌ | **NET-NEW for RightSite** |
| Standalone quiz/exam + scoring + review engine | ✅ (replica) | ✅ (replica) | Post-test spine |

---

## 11. Recommended reuse plan for the RightSite module (derived from this teardown)

1. **Fork the wrapper, not the content.** Clone the mededprep-demo skeleton: gate auth, per-session SQLite, persistent telemetry tables (`route_hits`, `trainee_step_events`, `trainees`), compliance/admin dashboard, analytics funnel, certificate+QR. These satisfy "admin login + completion stats + certificate" with minimal new code.
2. **Build the video engine as the one genuinely new subsystem.** A chaptered HTML5 video player with timeline-anchored overlay cues (explainer clip + knowledge-check question gates). Model its content file on `guide-content.json`'s task/step/auto_complete shape — replace `auto_complete` route/click triggers with **time-coded** triggers (`at: 0:42 → pause → show question`). Reuse the existing quiz engine (§7) for the question UI and scoring.
3. **Branching call simulation** = a state-machine content pack (nodes = call states, edges = trainee choices) rendered over the RightSite UI "illusion." No existing primitive; design fresh but score it through the §7 quiz/result tables so it feeds the same completion telemetry → certificate.
4. **Reuse audio narration** (pre-rendered MP3 per node) and **optionally the AI chat** as an in-module "ask a question" helper, both already cost-controlled.
5. **Content ingestion:** RightSite hands over their live presentation + raw demo footage → snip into chapter clips + explainer inserts → author a `rightsite-content.json` pack. The clean-room UI illusion is built per the §1 visual-baseline discipline.

---

## Sources touched

### Files (internal)
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

### URLs (external)
- `https://demo.mededprep.com` — attempted live scrape; site gates `/` → trainee registration so anonymous scrape returned no public content (consistent with the gate-auth model documented in the route map). FLAG: live UI not independently captured; all live-behavior claims are grounded in source code, not a rendered page.
