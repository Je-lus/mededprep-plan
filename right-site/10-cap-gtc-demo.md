# Capability Teardown — `/gtc-demo/` (GTC Training Sandbox)

**Purpose of this doc:** Establish exactly what MedEdPrep's `/gtc-demo/` asset is and is not, so the RightSite proposal rests on verified internal capability rather than assumption. The RightSite brief asserts that gtc-demo "issued certificates on completion" and "evolved into mededprep-demo / demo.mededprep.com (expanded interactive video + interleaved questions + admin tracking)." **The first claim is true and verified. The second is partly true: the certificate + admin-tracking + guided-walkthrough engine is real and reusable, but the interactive-VIDEO-with-interleaved-questions pattern RightSite wants is NOT in gtc-demo.** gtc-demo is a guided tour of a *clickable software replica*, not a video player. See "Limitations / gap vs. RightSite ask" below — this distinction drives scoping.

Repo path: `/home/jeramey/projects/gtc-demo` (local Laravel app, git history present, last commit `0696811` May 21 2026).

---

## 1. What it is (in one paragraph)

gtc-demo is a **standalone, pixel-perfect, factory-reset training simulator of the MedEdPrep admin panel**, built for Georgia Trauma Commission (GTC) program-director onboarding. It is a purpose-built *replica* of the ~6 sidebar features a Program Director uses, backed by **ephemeral per-session SQLite databases** (every visit is fresh, no real data, no consequences) plus a **second persistent SQLite database** that survives sessions and holds the only things that need to: trainee registrations, per-step telemetry, issued certificates, and route-hit logs. On top of the replica sits a **right-hand "guide/coach" panel** that walks the trainee through ~10 tasks / ~51 steps; steps auto-complete by watching the DOM (route changes, clicks, scrolls, form submits). When all tasks reach 100%, the system marks the trainee complete, **auto-generates a verifiable PDF certificate, and emails it.** An **admin "Compliance Dashboard"** lets a non-MedEdPrep stakeholder log in and see every trainee's status, completion %, per-task timing, and certificate. (`PROJECT-PLAN.md`, `gtc-demo/CLAUDE.md`)

It is explicitly **NOT** a fork of the production app's data layer, NOT multi-tenant, and NOT a "watch-a-video" course. Its interactivity comes from the learner actually operating a faithful software illusion while being coached. This is precisely the "clean-room faithful HTML illusion" pattern the RightSite engagement calls for — gtc-demo is the proof that MedEdPrep has built this before.

---

## 2. Exact tech stack — Supabase / Hugo CONFIRMED OR DENIED

**Supabase: DENIED.** No Supabase anywhere. Zero matches for "supabase" across `.php/.json/.md/.js` (excluding vendor/node_modules). Persistence is plain SQLite files. (grep, `config/database.php`)

**Hugo: DENIED.** No Hugo, no static-site generator. This is a server-rendered dynamic app. (grep)

> Note: The deal brief's mention of "Supabase and Hugo" came from *founder decision research* (evaluating options) — neither was adopted in gtc-demo. If those words appear in RightSite planning, treat them as roads-not-taken, not as this asset's stack.

**Actual stack (verified from `composer.json`, `package.json`, `config/database.php`):**

| Layer | Technology |
|---|---|
| Framework | **Laravel 12** (PHP ^8.2), `laravel/tinker` |
| Database | **SQLite** — two connections: `default`/`sqlite` (ephemeral per-session) + **`persistent`** (`persistent.sqlite`, survives sessions) |
| PDF / certificates | **`barryvdh/laravel-dompdf` ^3.1** (DomPDF) |
| QR codes (cert verification) | **`simplesoftwareio/simple-qrcode` ^4.2** |
| Front-end guide engine | **Alpine.js store** (`$store.guide`) — vanilla JS, no SPA framework. Files: `public/assets/guide/guide-store.js` (~1,948 LOC), `guide-content.js` |
| Styling/UI chrome | Inherited AdminLTE-style blades + FontAwesome icons (copied from production) |
| Email | Laravel Mail (`CertificateEmail` mailable; dev uses `MAIL_MAILER=log`) |
| Testing | Playwright (visual regression: `visual:capture`, `pixelmatch`, `pngjs`); PHPUnit 11 |
| Hosting | AWS **Lightsail** (multiple `LightsailDefaultKey-us-east-1*.pem` in repo); intended URL pattern `train.mededprep.app` (`PROJECT-PLAN.md`) |
| Background jobs | `php artisan queue:listen` + scheduled stale-session cleanup |

Content is data-driven: `guide-content.json` (38 KB) defines all tasks, steps, instructions, highlight selectors, and auto-complete rules.

---

## 3. How it tracked completion

Two-tier model, both in the **`persistent`** SQLite DB (so a wiped session never loses tracking):

**Front-end (per browser):** the Alpine `guide` store keeps `completedSteps` in `sessionStorage` (`gtc_completed_steps`), cleared on every login. It computes per-task and overall progress and fires milestone toasts at 25/50/75/100% (`guide-store.js`).

**Server-side telemetry** (`TelemetryController.php`, model `TraineeStepEvent`):
- `POST /api/telemetry/step-start` → records `started_at` for a `(trainee_id, step_key)` row.
- `POST /api/telemetry/step-complete` → sets `completed_at` and computes `duration_seconds = started_at→completed_at`.
- `POST /api/telemetry/complete` → fired when all tasks hit 100%; sets `trainee.completed_at` and triggers certificate generation + email.
- `GET /api/telemetry/summary` → returns per-task timing rollup for the completion screen.
- **Integrity check:** every telemetry write is validated against the guide config — `TraineeStepEvent::isValidGuideStep()` uses `hash_equals()` against an expected step-key map built from `config/guide.tasks`, so a client cannot fake completion of steps that don't exist in the current guide.
- **Trainee status** is derived (`Trainee::getStatusAttribute`): `not_started` / `in_progress` / `completed` / `expired` (in-progress but idle ≥60 min → "Incomplete"). The `markTraineeStarted` helper stamps `started_at` once on first activity.

**Admin visibility — the "admin login to see users + completion stats" that RightSite explicitly wants** (`ComplianceDashboardController.php`, routes under `admin/compliance` behind `sandbox.compliance-access` middleware):
- Index dashboard: total / completed / in-progress / expired / not-started counts, filterable by institution, with a completions-over-time chart and a paginated trainee table (name, institution, % complete, per-task progress, certificate link).
- Per-trainee detail view; admin can **manually (re)generate** a certificate (`/certificates/{trainee}/generate`) and **(re)send the email** (`/certificates/{trainee}/email`).
- CSV export (`StreamedResponse`).

This is the single most directly reusable subsystem for RightSite: a hand-built, LMS-free admin/completion dashboard for an org that "likely has NO LMS of their own."

---

## 4. How it issued certificates

`CertificateController::generate(Trainee)` (`CertificateController.php`):
- Guards: only if `trainee.completed_at` is set; idempotent (returns existing cert if present).
- Sums `duration_seconds` across completed step events → total time-on-task printed on the cert.
- Creates a `Certificate` row with a **UUID `hash`**, trainee name/email/institution, completed/issued timestamps, total duration.
- **PDF render:** DomPDF loads blade `certificate.completion`, A4 landscape, `isRemoteEnabled`/`isHtml5ParserEnabled`.
- **Verification QR:** generates an SVG QR (simple-qrcode) pointing at `/verify/{hash}`, embedded as a base64 data-URI `<img>` (DomPDF-safe); QR failure degrades gracefully.
- **Delivery:** `download` (attachment) and `preview` (inline stream) endpoints; `CertificateEmail` mailable sends the PDF; `email_sent_at` stamped.
- **Public verification:** `GET /verify/{hash}` renders `certificate.verify` showing validity — anyone can confirm a certificate is genuine. This is a real authenticity feature, not decoration, and maps cleanly to a fire-department's need to prove "this medic completed RightSite training."
- Auto-trigger path: the `/api/telemetry/complete` endpoint generates + emails the certificate automatically on 100%, wrapped in try/catch so a mail failure never blocks the completion response.

---

## 5. Interactive mechanics — the guided walkthrough + question/assessment engine

**This is the heart of the asset and the part most relevant to RightSite's "no passive watching" requirement.**

**Guide / coach panel** (`resources/views/components/guide-panel.blade.php` + `guide-store.js`): a right-rail accordion of tasks → steps. Each step has an instruction, an optional `highlight` CSS selector ("Show me" scrolls to + highlights the element), an optional `navigate_to`, and an `auto_complete` rule. The coach can collapse to a compass icon in the sidebar.

**Auto-complete detectors** (data-driven via `guide-content.json`; wired in `guide-store.js`). Observed type frequencies in the live config: `click` (14), `route` (14), `route_pattern` (9), `dom_exists` (8), `scroll` (2), `form_submit` (2), `hover` (1), `input_change` (1). Supported types:
- `route` — current pathname matches a value (active task only)
- `route_pattern` — pathname matches a regex
- `click` — user clicks an element matching a selector
- `dom_exists` — an element appears in the DOM (MutationObserver-style)
- `form_submit` — a matching form is submitted
- `scroll` — a container is scrolled past a threshold
- `input_change` — an input/select value changes

So the learner is **assessed by doing**: they don't watch someone create a quiz — they create one in the replica, and the system detects the form submit. This is exactly the "branching simulation of the live call" mechanic RightSite wants, applied to software operation.

**Question/assessment surfaces present (inherited from production replica):** because gtc-demo replicates the real admin panel, it includes a fully working **quiz/unit-exam creation wizard** (curated bank: 20 EMT + 20 AEMT + 20 Paramedic = 60 questions, pick 10), exit-exam management, performance/category reports, and a **"View as Student" toggle** so the trainee can take the assessment they just built. There is genuine question-bank + scored-attempt machinery here (models: `UnitExam*`, `Quiz*`, `Question*`, `EopaQuiz*`, attempt-history tables) — i.e., MedEdPrep already owns post-test / knowledge-check infrastructure, just not wired to an inline video.

**Supporting session machinery** (the "illusion" plumbing): `SessionManager.php` clones a fresh SQLite snapshot per session; `DateShifter.php` shifts all seed dates relative to today so reports feel current; `PaymentSimulator.php` fakes Stripe (coupon `G26` = 100% off) so subscription-gated features work without real money; scheduled cleanup deletes stale session DBs (15-min/60-min idle). A `/gate` page with a shared dummy credential is the speed-bump entry.

---

## 6. Limitations / gap vs. the RightSite ask

**Reusable as-is (high value, directly maps to RightSite):**
- Admin/compliance dashboard with per-user completion %, timing, status, CSV export — for an org with no LMS. ✅
- Auto-issued, QR-verifiable PDF certificate + email on completion. ✅
- Tamper-checked server-side telemetry per step. ✅
- Data-driven step/auto-complete engine (just JSON + selectors) — fast to re-skin for a new "illusion." ✅
- Clean-room replica philosophy already proven ("copy the UX, not the code"). ✅

**Does NOT exist in gtc-demo (must be built or pulled from the sibling demo) — scoping-critical:**
- **No embedded interactive video.** gtc-demo coaches a *clickable software replica*; it has no video player, no mid-action explainer-video pop-ins, no video-timeline event hooks. The "video" blades found in the repo (`frontend/video.blade.php`, `VideoPlayHistory` model) are inert inherited production artifacts, not the interactive-video feature. RightSite's #1 visual requirement (watch the platform being used + explainer video appears mid-action as buttons are clicked) is **net-new** relative to gtc-demo.
- **No questions interleaved inside a video timeline.** gtc-demo's assessment is "do the task in the UI" + a separate quiz wizard; it does not pause a video to ask a question.
- **No branching simulation tree.** Steps are linear/auto-completing; there is no scripted decision-branch "live call" simulator. Net-new.
- **Single-tenant, single shared gate password**, AWS-Lightsail-bound, MedEdPrep-themed throughout. Any RightSite build needs its own branding/tenancy and likely real auth (not a shared speed-bump) if completion records are compliance-grade.
- **Heavy inherited surface:** ~65–75% of the codebase is copied MedEdPrep application surface (per the V2 valuation); only ~25–35% is the reusable "delivery wrapper." Lifting the wrapper cleanly for RightSite means extracting the guide engine + telemetry + certificate + compliance dashboard *without* dragging the EMS-exam domain models.

**Where the missing pieces actually live:** the interactive-video + interleaved-question evolution is in the **sibling `mededprep-demo` repo** (`/home/jeramey/projects/mededprep-demo`), whose root commit is literally `"Initial import from gtc-demo (pre-transformation)"` (2026-04-01) — confirming gtc-demo is the genetic ancestor. That repo expands to 11 tasks / 63 steps and a sales-mode, and is the closer reference for the video-centric RightSite build. A separate static `gtc-lms-demo` (plain `index.html` + `shell.js`, under mededprep-portal) is a lightweight LMS-shell mockup, not the dynamic engine. (These should each get their own teardown; this doc is scoped to gtc-demo.)

**Bottom line for the proposal:** gtc-demo proves MedEdPrep can deliver the *tracking, admin-login, certificate, verification, and "learn by operating a faithful illusion"* half of the RightSite ask today, on a battle-tested Laravel+SQLite+DomPDF stack with zero external LMS or SaaS dependency. The *interactive-video + interleaved-question + branching-call-simulation* half is the build effort — its closest internal precedent is mededprep-demo, not gtc-demo.

---

## Sources touched

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

**URLs:** None. This teardown was sourced entirely from internal codebases; no external web research was required (and none would corroborate a private internal asset).
