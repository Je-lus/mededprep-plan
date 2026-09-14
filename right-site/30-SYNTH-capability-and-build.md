# SYNTHESIS — RightSite Build: Capability & Reuse Map

**Date:** 2026-06-19
**Inputs synthesized:** `10-cap-gtc-demo.md`, `11-cap-mededprep-demo.md`, `12-cap-ruby-studio.md`, `13-research-decisions-gemilius.md`
**Purpose:** Tell the build team exactly what lifts-and-shifts from existing MedEdPrep assets, what needs adaptation, what is genuinely net-new, and what the net-new work costs in rough effort. The honesty discipline here matters: the RightSite proposal must rest on verified capability, not on the optimistic framing in the original deal brief.

---

## 0. The one paragraph the proposal hangs on

MedEdPrep has already shipped, twice (`gtc-demo` → `demo.mededprep.com`), the *hard, unsexy half* of what Chip Walls is asking for: a hosted, self-contained training environment for an external org with **no LMS of its own**, with **per-user completion tracking, a separate admin login + stats dashboard, CSV export, and an auto-issued, QR-verifiable PDF certificate on completion** — on a low-ops Laravel + SQLite + DomPDF stack with **zero external SaaS dependency**. That entire subsystem lifts-and-shifts. What does **NOT** exist anywhere in the portfolio is the *visible, marketable* half Chip emphasized: (1) a **chaptered video player with mid-action explainer overlays**, (2) **knowledge-check questions interleaved on the video timeline**, and (3) a **scripted branching live-call simulation**. Those three are the real build. The good news: each has a strong adjacent primitive in-house (the JSON-driven step engine, the replica quiz/scoring engine, and Ruby Studio's beat/stage state machine), so net-new ≠ from-scratch.

---

## 1. LIFTS-AND-SHIFTS DIRECTLY (clone the wrapper, minimal new code)

These exist as working, deployed code in `mededprep-demo` (and most also in `gtc-demo`). Fork the `mededprep-demo` skeleton and re-skin; do **not** rebuild.

| Capability | Source asset | RightSite requirement it satisfies | Reuse note |
|---|---|---|---|
| **Admin/compliance dashboard** (separate admin login, per-trainee status/%, per-task timing, charts, filters, CSV export) | `ComplianceDashboardController`, `ComplianceAuthController`, `EnsureComplianceDashboardAccess` middleware | "Admin login to see users + completion stats" — **direct match** | Re-skin/re-label only. This is the strongest single match in the portfolio. |
| **Analytics funnel dashboard** (visitors→started→completed, completion rate, drop-off per task/step, avg time) | `AnalyticsController`, `EnsureAnalyticsToken` middleware, `/analytics/funnel` | Completion-stats depth beyond the basic ask | Free bonus over what RightSite asked for. |
| **Per-step completion telemetry** (start/complete/duration, tamper-checked against guide config via `hash_equals`) | `TelemetryController`, `TraineeStepEvent`, `route_hits` table | Trackable + integrity-grade completion | Tamper check matters because fire-dept completion records are compliance-grade. Keep it. |
| **Auto-issued PDF certificate + public QR verification** | `CertificateController`, DomPDF, simple-qrcode, `certificate/completion.blade.php`, `/verify/{hash}` | "Certificate / completion on finish" — **direct match** | Verifiable cert maps cleanly to "prove this medic completed RightSite training." Re-skin to RightSite branding. |
| **Persistent vs ephemeral DB separation** (durable `trainees`/telemetry on a `persistent` connection; per-session sandbox is throwaway) | `DatabaseBind`/`SessionLifecycle`, dual SQLite connections | Tracking survives session resets | Architectural pattern, lifts as-is. |
| **Per-session isolation + gate auth** | `baseline.sqlite` copy-per-session, shared-credential gate (prefilled, readonly), register-then-gate identity capture | "Hand Houston FD one URL + one credential; capture identity at register" | Frictionless org-wide access without per-user accounts. **Caveat in §4.** |
| **Pre-rendered MP3 audio narration** (3 voices, per-event, speed/mute prefs, default-muted opt-in) | `guide-audio.js`, OpenAI `tts-1-hd`/`nova`; ~$0.30 to generate full ~50-clip corpus | Voiceover for the module | Static files, zero runtime cost. Lifts as-is; just regenerate clips for RightSite script. |
| **AI "ask a question" chat helper** (page-contextual, cached by route bucket, per-session budget, admin-viewable logs) | `ChatController` (Claude Haiku 4.5, context-stuffed KB, SSE), `ChatLogController` | Optional in-module help; not a stated requirement | Cost-controlled (~$33/mo @ 1K exchanges). Optional add; lifts cleanly if wanted. |
| **Visual-fidelity / clean-room discipline** | Playwright golden-baseline pixel-diff harness (36 PNGs) | The METHOD for faithfully reproducing RightSite's UI | This is the process, not a feature — reuse the discipline to build the illusion (see §3c). |
| **Low-ops hosting model** | AWS Lightsail, static asset stack (AdminLTE/Alpine/jQuery, no Vite/Mix) | "We host it" | Proven deploy target. |

**Net effect:** the "admin login + completion stats + certificate" trio that headlines the RightSite ask is essentially **a re-skin job**. This is the credibility anchor for the proposal.

---

## 2. NEEDS ADAPTATION (the primitive exists; it must be re-pointed or re-shaped)

These are real in-house assets, but they were built for "operate a clickable replica app," not "watch a video / take a graded call." They need rework, not invention.

| Asset | What it is today | Adaptation required for RightSite |
|---|---|---|
| **JSON-driven step engine** (`guide-content.json`: tasks→steps→`auto_complete`) with detectors: `route`, `click`, `dom_exists`, `form_submit`, `scroll`, `input_change`, `route_pattern` | Advances when the learner *performs a real UI action* in the replica. Content is fully swappable per audience (proven: testprep + sales JSON variants). | **Add a time-coded trigger type.** Today there is no `at: 0:42 → pause → show question` trigger. The content model (task/step + trigger + completion message + forward-linking) is the right shape and should be the template for the video content pack — but the trigger vocabulary must gain timeline anchors. This is the bridge between the existing engine and the net-new video player (§3a/§3b). Moderate. |
| **Student quiz/exam engine** (`Frontend\QuizzeController`, `UnitExamController`, `quiz.js`/`quiztest.js`/`quiz_review.js`: create/start/save-answer/submit/score/review/retake) | A working, replicated, standalone quiz + scoring + review machine. | **Repurpose as the question UI + scoring spine** for (a) interleaved video knowledge-checks, (b) the post-test, and (c) scoring the branching sim. It is *standalone pages today* — it must be invokable inline (as a modal/overlay over a paused video, and as the result-recorder under the branch graph). Re-host the component; reuse the scoring/attempt tables. Moderate. |
| **Mode/pain-selection router** (`ChooseModeController`, pain buttons prime chat + emphasis) | Visitor picks "what are you trying to fix?"; selection stored on trainee. | **Re-skin to role selection** (medic / company officer / supervisor / dispatcher) so the module can branch content by role. Light. |
| **`guide-skip.js` + `SeedStepController`** (skip a task; programmatically seed DB into post-task state) | Lets a learner jump ahead in the replica walkthrough. | Pattern is useful for **resuming/skipping video chapters** without breaking later state. Light, optional. |
| **Driver.js spotlight/popover overlay** (`guide-driver.js`, `@floating-ui/dom`) + action-in-tooltip ("Do this for me") research | Highlights/positions tooltips over real elements; researched "do-it-for-me" auto-click. | Reusable for **the clean-room RightSite UI illusion** (§3c) and for the mid-action explainer cue anchoring. The action-tooltip research (~12 hr estimate) is directly applicable. One recovered open question to decide: tooltips can **block outside clicks to force a linear path** — research recommended NO for MedEdPrep's free exploration, but **for RightSite training, likely YES (forced path)**. Moderate. |

---

## 3. GENUINELY NET-NEW (no in-house primitive ships this; design fresh)

These three are exactly the items both demo teardowns flag as **absent in both demos**, and they are precisely what Chip Walls described as the non-negotiable, "not a passive watch-and-click" experience.

### 3a. Chaptered interactive video player with mid-action explainer overlays
- **Why net-new:** Neither `gtc-demo` nor `mededprep-demo` has a video player. The `video.blade.php` / `VideoPlayHistory` artifacts in `gtc-demo` are inert inherited production cruft, NOT this feature. The demos teach by driving a *live replica UI*, not by playing a screencast.
- **What it is:** an HTML5 video player that plays RightSite platform footage, with **timeline-anchored overlay cues** — at a coded timestamp, pause and surface an explainer clip / callout as a "button is clicked" in the footage.
- **Reuse leverage:** model the content pack on `guide-content.json`'s shape; swap `route`/`click` triggers for **time-coded** triggers. The Driver.js overlay + Floating UI tooltip stack (§2) supplies the visual cue layer. The Playwright video-tour research (`research-playwright-video.md`: native `recordVideo`, injected fake SVG cursor + click-ripple, `TourDirector` choreography, ffmpeg WebM→MP4 + Ken Burns + narration merge) is the **ingestion/assembly pipeline** for snipping and reassembling RightSite's raw footage. So the *plumbing references exist*; the synchronized player + timeline-cue engine itself does not.

### 3b. Knowledge-check questions interleaved IN the video timeline
- **Why net-new:** the demos' `auto_complete` gates ("do the action to advance") are NOT quiz items, and the quiz engine is standalone pages — neither pauses a video to ask a graded question.
- **What it is:** at a coded timestamp the video pauses, a question (from the §2 quiz engine, re-hosted inline) is presented, and the learner must answer to continue. Answers feed the existing scoring/attempt tables → existing completion telemetry → existing certificate.
- **Reuse leverage:** question UI + scoring = the adapted §2 quiz engine; the *gating-to-continue* behavior = the existing `auto_complete` "must perform action to advance" philosophy, re-pointed to "must answer to advance." The genuinely new glue is the **timeline↔question binding** and the pause/resume controller.

### 3c. Scripted branching "live-call" simulation + the faithful clean-room HTML illusion of RightSite's platform
This is the largest and riskiest net-new item, and it has two intertwined parts.

- **The branch engine (logic):** a state machine — nodes = call states, edges = trainee choices. **No in-house product ships this**, BUT the closest architectural match anywhere in the portfolio is **Ruby Studio's `story_beats` + `relationship_state` + `check_and_advance_stage()` + fail-closed `_check_lore_conditions()`** machinery. That is literally an authored-node + unlock-gate + completion-trigger + state-gated-content engine — the skeleton of a branching sim. **Reuse the data model and state-machine LOGIC, not Ruby's stack** (Ruby is Python/FastAPI/React/Ollama/NSFW — wrong stack, brand-toxic, single-user, no auth). Re-implement those patterns in the Laravel/demo lineage. For a *gradeable, trackable* sim, use Ruby's **deterministic** parts (authored nodes, explicit completion triggers) and avoid its emergent-LLM mood drift for anything that must be scored/reported. An optional LLM realism layer (Ruby's persona-authoring method + `emotions.py`-style background scoring judge) could sit *on top of* a deterministic branch graph as a later enhancement.
- **The clean-room illusion (UI):** a faithful HTML reproduction of RightSite's platform UX for training only — built from a login walkthrough, never copying RightSite's code. **This is the one pattern MedEdPrep has genuinely proven** (`gtc-demo` is a pixel-perfect replica of MedEdPrep's own admin panel; the Gmelius/Supademo research explicitly concluded "build the faithful working illusion ourselves, don't rent a snapshot tool"). The *method* lifts (Playwright golden-baseline pixel-diff discipline, Driver.js overlays); the *specific RightSite UI* must be built from scratch against their actual screens. Scoring routes through the §2 quiz/result tables so the sim feeds the same completion telemetry → certificate.

---

## 4. HONEST GAPS, RISKS & OPEN DECISIONS

- **Auth is a real decision, not a re-skin.** The demos use a *single shared gate credential* (a speed-bump). RightSite completion records are **compliance-grade for fire departments** — proving "medic X completed training" likely needs **real per-user auth**, not one shared password. Identity is captured at the register step today, which may be enough if completion is keyed to that record — but this must be confirmed against RightSite's expectations. Flag as an open architecture decision.
- **Heavy inherited surface to shed.** ~65–75% of the demo codebase is copied MedEdPrep *application* surface (EMS-exam domain models). The reusable "delivery wrapper" is only ~25–35%. Lifting cleanly for RightSite means **extracting the wrapper** (guide engine + telemetry + certificate + compliance/analytics dashboards + quiz engine) **without dragging the MedEdPrep exam domain**. This extraction is itself non-trivial work that neither demo has done.
- **Supabase / Hugo are roads-not-taken — do not let them re-enter scope.** Verified: gtc-demo uses **SQLite, not Supabase**; "Hugo" was Crisp's support agent (rejected in favor of custom Claude Haiku chat); "Supabase" was evaluated only for the unrelated *Pulse mobile app* and rejected as primary backend. The proven RightSite path is **Laravel + per-session SQLite + DomPDF**. Supabase **cloud** is *only* defensible if RightSite is rescoped as a brand-new greenfield CRUD product wanting managed auth out-of-the-box — flag as open, not settled.
- **"Gemilius"/Gmelius = reference, not asset.** The onboarding the founder admired (`learn.gmelius.com`) is a no-code **Supademo** showcase (frozen rrweb DOM snapshots — no real backend). Its value is *decomposition of the UX he liked* (AI voice narration, clickable sandbox, tooltip+pulse callouts, optional video version, category sidebar). The "digital presenter / talking-head avatar" he may remember is **UNVERIFIED** in our own research (Supademo doesn't natively do avatars). If RightSite wants a talking head, treat it as **net-new and unestimated**, not a recovered/solved pattern.
- **Live behavior of demo.mededprep.com not independently captured** — the site gates anonymous access, so all live-behavior claims rest on source code review, not a rendered page. Low risk (code is authoritative) but noted.
- **`research-demo-expansion.md` is indexed in `.recovery/` but missing on disk** — likely a stale index entry; its likely content is covered by the `gmelius-onboarding/` corpus. Minor.
- **Single-source figures (directional only):** Navattic "48% higher completion for hub-and-spoke," Navattic "$500+/mo," Walnut "$10K+/yr" — each cited once in prior research, not re-verified. Do not put these in a customer-facing proposal without re-sourcing.

---

## 5. ROUGH EFFORT SHAPE (net-new work only; the §1 lift-and-shift is re-skin, days not weeks)

These are **shape, not commitments** — relative sizing to inform scoping, anchored to the only hard datum we have from the research (action-tooltip enhancement was estimated at ~12 hrs).

| Net-new work item | Reuse leverage available | Rough shape | Risk |
|---|---|---|---|
| **(§1) Fork wrapper + re-skin** (gate, sessions, telemetry tables, compliance + analytics dashboards, certificate+QR, audio narration) | ~Complete code exists | **S** — days. Branding, labels, content swap. | Low |
| **Wrapper extraction** (separate the reusable delivery wrapper from MedEdPrep exam-domain surface) | Not yet done in any repo | **M** | Med — touches a lot of inherited code |
| **(§3a) Chaptered video player + mid-action explainer overlays** | Driver.js/Floating UI overlays; Playwright ingestion/assembly pipeline (researched); `guide-content.json` shape as content-model template | **M–L** | Med — the synchronized timeline-cue engine is new; player is a known quantity |
| **(§3b) Interleaved video knowledge-checks** | Quiz UI + scoring engine (adapt §2); existing "must-act-to-advance" gating philosophy | **M** | Med — main new glue is timeline↔question binding + pause/resume controller |
| **(§3c-logic) Branching call-sim state machine** | Ruby Studio beat/stage/gating **logic** to re-implement in Laravel; quiz tables for scoring | **L** | **High** — largest design lift; deterministic-vs-generative decision; grading rigor |
| **(§3c-UI) Clean-room RightSite HTML illusion** | Replica method proven (gtc-demo); Playwright pixel-baseline discipline; Driver.js overlays | **M–L** | Med — bounded by how many RightSite screens the sim touches; depends on their walkthrough |
| **Content ingestion** (snip/reassemble RightSite's live presentation + raw footage into chapter clips + explainer inserts; author `rightsite-content.json`; record TTS narration) | Playwright video + ffmpeg pipeline; TTS pipeline (~$0.30/corpus); content-pack pattern | **M** (recurring per content update) | Med — depends on quality of footage RightSite hands over |
| **Real per-user auth** (IF compliance-grade completion required) | None in demos (shared gate only) | **S–M** | Med — open decision; could be deferred if register-step identity suffices |
| **Talking-head / digital presenter** (IF requested) | None — unverified even in Gmelius | **? unestimated** | High — net-new, no precedent |

**Critical-path read:** the proposal's *credibility* (admin + tracking + certificate) is cheap and done. The proposal's *differentiation* (interactive video + interleaved questions + branching sim) is the real engagement, with the **branching call-sim (logic + RightSite UI illusion) as the dominant cost and risk**, followed by the video player + timeline-question binding. None of the differentiation is greenfield-from-zero — each rides a strong in-house primitive — but the integration glue (timeline↔question, branch-graph↔scoring↔certificate) is where the genuinely new engineering lives.

---

## Sources touched

**Files opened:**
- `/home/jeramey/projects/domination/right-site/10-cap-gtc-demo.md` — verified gtc-demo capability: Laravel 12 + dual SQLite + DomPDF + simple-qrcode; persistent telemetry (tamper-checked via `hash_equals`); compliance dashboard + CSV; auto-cert + QR verify; JSON-driven guide engine w/ 8 auto_complete detector types; replica quiz/exam machinery present; **confirmed NO video player, NO interleaved-question-in-video, NO branching sim**; Supabase/Hugo denied as stack.
- `/home/jeramey/projects/domination/right-site/11-cap-mededprep-demo.md` — verified mededprep-demo deltas over gtc: multi-mode guide (Tour/Sales/Walkthrough), swappable JSON content packs, 3-voice TTS narration, Claude Haiku 4.5 cached/budgeted chat, pain/mode router, analytics funnel + compliance dashboards, QR cert verification, co-browse (Reverb, out of async scope); the feature-delta table marking video player / interleaved questions / branching sim as **NET-NEW**; quiz engine = post-test spine; the explicit §11 reuse plan (fork wrapper, build video engine, branch sim as state-machine content pack).
- `/home/jeramey/projects/domination/right-site/12-cap-ruby-studio.md` — Ruby Studio's reusable core for the branching sim: `story_beats` table + `beats_router.py` + chat.py injection (authored-node engine), `relationship_state` + `check_and_advance_stage()` + fail-closed `_check_lore_conditions()` (state-gated unlock), persona-authoring method, `emotions.py` background-judge pattern; the explicit caveats (re-implement logic in HTML/demo stack not Ruby's; deterministic vs generative; NSFW/brand risk; no auth/single-user).
- `/home/jeramey/projects/domination/right-site/13-research-decisions-gemilius.md` — resolved the Gemilius=Gmelius=Supademo naming confusion; Gmelius Academy = Supademo showcase (frozen rrweb snapshots) → "build the illusion ourselves, don't rent" clean-room precedent; recovered interactive-video research (Playwright recordVideo + fake-cursor + TourDirector + ffmpeg; action-in-tooltip ~12hr est; "block outside clicks for forced linear path" open question flagged YES-for-RightSite); TTS = OpenAI tts-1-hd/nova ~$0.30/corpus; Hugo/Crisp rejected for custom Haiku chat; Supabase = Pulse-only road-not-taken; talking-head avatar UNVERIFIED; single-source pricing figures flagged.

**URLs:** None. This is a pure synthesis of four internal capability/research teardowns; no external corroboration was applicable (the assets are private internal codebases). All external figures inherited from the source docs carry the single-source flags noted in §4.
