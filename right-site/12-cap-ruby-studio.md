# Capability Inventory: /ruby-studio/ — Branching Simulation Reuse Assessment

**Task scope:** Inventory `/home/jeramey/projects/ruby-studio/`, focused on the "personality training" / conversational / branching pieces, and assess what could be reused to build a **scripted BRANCHING SIMULATION of RightSite's "live call."**

**Bottom line up front:** Ruby Studio is *not* a packaged "branching simulation" engine, and its primary purpose (a local NSFW companion-character image/video generator) is irrelevant and unusable for a B2B EMS training product. **However**, buried inside it is a genuinely valuable, already-built **stateful conversational engine** with the exact architectural primitives a branching call simulation needs: authored "story beats" (scripted scenario milestones with unlock/completion gating), a relationship/stage state machine, conditional content injection, persona-driven LLM responses, SSE streaming chat, and a React chat UI. These are reusable as *patterns and code* — not as a drop-in product. The most directly liftable concept is the **`story_beats` + conditional-injection model**, which is a working "if state X, present content Y, advance on trigger Z" engine — the skeleton of a branching simulation.

---

## 1. What Ruby Studio Actually Is

A local, single-user creative generation assistant (explicitly NSFW per `CLAUDE.md`). Two halves:

1. **Image/video generation** (the bulk of the repo): ComfyUI workflows, LoRA training, character sheets, prompt translators, storyboard runners, coherence evaluators, a 1.4 GB IP-Adapter model. **Entirely irrelevant to RightSite** — ignore for this task.
2. **A conversational chat system** (`backend/chat.py`, `backend/emotions.py`, `backend/routers/`, `frontend/src/`): an Ollama-backed persistent-character chat pipeline with memory (Mem0/Qdrant), mood tracking, relationship progression, and authored story beats. **This is the relevant half.**

Stack (chat half): FastAPI + Ollama SDK + Mem0 (Qdrant) + SQLite backend (port 7701); React 19 + Vite + Tailwind + Zustand frontend (port 7700); **SSE for streaming** (WebSockets explicitly rejected). All local, no auth.

---

## 2. The Personality / Conversational / Branching Pieces (the reusable core)

### 2a. Persona / "personality training" layer — `identity/`
- `identity/ruby.md` — the system prompt that gives the LLM its persona. Notable design decision (locked, per `CLAUDE.md`): it uses **"You are a skilled author giving voice to Ruby"** framing rather than "You are Ruby" — deliberate "author framing, not character possession." This is a transferable prompt-engineering technique: for a RightSite call sim you'd write the equivalent persona for a **simulated 911 caller / patient / dispatcher** ("You are a skilled author voicing a patient calling for help…").
- `identity/ruby-traits.md`, `ruby-first-message.md`, `ruby-examples.md` — trait sheet, opening message, and few-shot example exchanges. The pattern (traits + first message + few-shot examples per character) is exactly how you'd script a believable EMS caller/patient persona.
- `identity/characters/characters.json` — a **character registry** separate from the image-gen "canon." Multiple personas can be registered and selected by `character_id`. Directly reusable structure for multiple call-scenario personas.

### 2b. Story Beats — the scripted-scenario engine (CLOSEST MATCH to a branching sim)
This is the single most relevant asset. It is a working "authored narrative milestone" system.

- **Schema** — `backend/database.py` `story_beats` table (line ~199): `id, character_id, name, scenario_override (TEXT), stage, unlocked (bool), completed (bool), completion_triggers_json, sort_order`. Indexed on `character_id` and `unlocked`.
- **API** — `backend/routers/beats_router.py`: full CRUD (`GET /api/beats`, `GET /api/beats/active/{character_id}`, `POST`, `PATCH`, `DELETE`). A beat carries a `scenario_override` (extra instructions injected into the system prompt while active), a `stage` gate, `unlocked`/`completed` flags, and `completion_triggers` (a dict).
- **Runtime injection** — `backend/chat.py`: `get_active_beat(character_id)` is fetched each turn (line ~825, wrapped so a DB hiccup never blocks the turn); the active beat's `scenario_override` is appended to the system prompt under a `## Current Story Beat` header (line ~210-212).
- **Frontend** — `frontend/src/components/BeatIndicator.tsx` (pill showing the active beat name), `frontend/src/stores/beatStore.ts`, `frontend/src/api/beatsApi.ts`.

**Why this matters for RightSite:** A branching call simulation is, structurally, *a sequence of beats that unlock based on what the trainee does, each beat changing what the simulated caller says/does, advancing when a completion trigger fires.* Ruby's story-beats system already implements: ordered authored milestones, per-milestone scenario overrides, unlock gating, completion triggers, and live injection into the model's behavior. The naming is "story beat" but the machinery is a **scenario state machine**.

### 2c. Relationship / stage state machine — the progression + gating engine
- **Schema** — `backend/database.py` `relationship_state` table (line ~182): `stage, trust_level, intimacy_level, message_count, session_count, vulnerability_moments, conflict_resolved, intimacy_milestones_json`.
- **Stage ladder** — `_STAGE_ORDER = ["early","developing","established","deep","bonded"]` with `_STAGE_THRESHOLDS` (per-stage numeric gates: trust/intimacy/sessions/vulnerability/conflict minimums).
- **Advancement** — `check_and_advance_stage()` (`database.py` ~line 2464): advances exactly one stage iff ALL next-stage thresholds are simultaneously met; terminal stage never regresses. Called per turn from `chat.py` (~line 715).
- **Conditional gating** — `_check_lore_conditions()` in `chat.py` (line 60): a pure, side-effect-free, **fail-closed** predicate evaluating conditions like `relationship_stage_min`, `trust_level_min`, `character_id` against current state. Used to decide whether a piece of "lore" (extra context) is injected this turn (chat.py ~line 494-540).

**Why this matters for RightSite:** This is a generic **state-gated content-unlock engine**. Rename `trust_level` → "rapport with patient," `stage` → "phase of the call," and the same code decides which scenario branch/content unlocks. The *fail-closed* design and "advance only when all thresholds met" logic are exactly the rigor a graded training sim needs. Note: in Ruby these deltas are extracted heuristically by an LLM (see 2d); for a *scripted* (deterministic) sim you'd replace the LLM-driven delta extraction with explicit choice-driven transitions — but the state-machine + gating substrate transfers directly.

### 2d. Emotional / relationship extraction — `backend/emotions.py`
A set of lightweight, background LLM calls (small model, `qwen3:4b` default, temp 0.1, JSON-only output, never raises into the stream):
- `extract_emotional_context()` — user mood, conversation energy, unresolved threads.
- `extract_character_mood()` — the *character's* own mood with intensity (1-10) and trajectory (improving/worsening/stable) — i.e., the simulated person has their own evolving emotional state.
- `extract_relationship_indicators()` — clamped trust/intimacy deltas, vulnerability/conflict-resolved booleans that drive stage advancement.
- `generate_session_recap()` / `format_emotional_context_for_prompt()` — "last time" recap + natural-language injection of state into the prompt.

**Why this matters for RightSite:** This is the "the patient gets more agitated if you fumble the assessment / calms down if you reassure them" dynamic. For a *training* product the most valuable reuse is the **pattern** (a cheap background LLM judge that scores each trainee turn against rubric dimensions and adjusts the simulated caller's state) — which is also the seed of automated scoring/feedback for the post-test.

### 2e. Streaming chat plumbing — reusable transport/UI
- `backend/chat.py` `ChatService.stream_chat()` (1,183 lines) — full turn pipeline: history mgmt, rolling summarization (`SUMMARY_THRESHOLD_RATIO`, chunked), per-mode token caps, Mem0 store/retrieve, tool-calling fallback for models without native tools, beat injection, post-turn state updates.
- `backend/routers/chat_router.py`, `backend/main.py` `/api/chat` — SSE (`EventSourceResponse`) streaming endpoint with the project's `{ success, data } / { success, error: {code,message} }` envelope.
- Frontend: `frontend/src/hooks/useChat.ts` (SSE consumer), `ChatView.tsx`, `ChatInput.tsx`, `MessageBubble.tsx`, `stores/chatStore.ts`.

**Why this matters for RightSite:** If the branching simulation is *conversational* (free-text or choice-driven dialogue with a simulated caller during the "live call" phase), this is a complete, battle-tested SSE chat stack to clone. If the sim is purely *menu/choice-driven branching* (more likely the v1 for trainable, gradeable EMS content), this stack is heavier than needed — but `chat_router.py`'s SSE + envelope conventions and the React store pattern are still good references.

### NOT relevant (despite the name)
- `tools/madlibs/` — **not** dialogue mad-libs; it is ComfyUI inpainting / regional-prompt / LoRA-weight *image* testing. Ignore.
- `canon/`, `lora-training/`, `workflows/`, `character-sheets/`, `outputs/`, `backend/generator.py`, `prompt_translator.py`, `scenes.json`, `docs/archive/DYNAMIC-STORYTELLING-PLAN.md` — all image/video generation. `DYNAMIC-STORYTELLING-PLAN.md` describes LLM-generated *image storyboards*, not dialogue branching; not reusable here.

---

## 3. Reuse Assessment for the RightSite Branching Call Simulation

| Ruby asset | Reuse value for RightSite call sim | How |
|---|---|---|
| `story_beats` table + `beats_router.py` + chat.py injection | **HIGH (concept) / MEDIUM (code)** | This *is* a scenario-state-machine. Re-skin beats as "call phases / branch nodes": each node has prompt/scenario text, an unlock gate, and a completion trigger. The CRUD API + active-node fetch + live injection are directly portable. |
| `relationship_state` + `check_and_advance_stage()` + `_check_lore_conditions()` | **HIGH (concept) / MEDIUM (code)** | Generic state-gated unlock engine. Rename dimensions (rapport, scene-safety, assessment-completeness). Fail-closed, all-thresholds-met advancement = good rigor for graded training. Swap LLM-driven deltas for deterministic choice-driven transitions in a scripted sim. |
| `identity/` persona pattern (traits + first message + few-shot + "author framing") | **HIGH (pattern)** | Author the simulated caller/patient/dispatcher persona the same way. Multiple personas via `characters.json` registry. The content (Ruby herself) is unusable; the *method* is exactly right. |
| `emotions.py` background LLM judges | **MEDIUM-HIGH (pattern)** | Reuse as (a) dynamic caller-state ("patient agitation") and (b) the seed of automated per-turn scoring / branching decisions and post-test feedback. Cheap-model + JSON-only + never-raise design is sound. |
| SSE chat stack (`chat.py` stream, `chat_router.py`, `useChat.ts`, chat UI) | **MEDIUM** | Clone if the sim has free-text conversational turns. Overkill for pure menu-branching v1. Good reference for streaming + error-envelope + React store patterns regardless. |
| Mem0/Qdrant long-term memory | **LOW** | Not needed for a single-session training module; adds infra weight. Skip. |
| Everything image/video (most of repo) | **NONE** | Ignore entirely. |

### Caveats / fit problems
- **Tech mismatch with the rest of the RightSite plan.** The KEY ASSET for this deal is the `/gtc-demo/` → `/mededprep-demo/` → `demo.mededprep.com` interactive-video pattern (per deal context), which is HTML-centric and already does interleaved questions + certificates + admin tracking. Ruby Studio is Python/FastAPI + React + a local 96 GB-GPU LLM. **Lifting Ruby's stack wholesale would fight that direction.** The right move is to lift Ruby's **data model and state-machine logic** (beats + gated stages + completion triggers) and re-implement it in whatever stack the RightSite module uses (almost certainly the HTML/demo lineage), not to deploy Ruby's server.
- **Scripted vs. generative.** RightSite wants a *scripted, trackable, gradeable* branching sim. Ruby's branching is LLM-emergent (mood/relationship drift), which is great for "alive" feel but bad for deterministic grading and admin reporting. Use Ruby's **structure** (authored nodes + explicit completion triggers — the deterministic parts) and avoid leaning on the emergent-LLM parts for anything that must be graded or reported. An optional LLM layer could add realism *on top of* a deterministic branch graph.
- **NSFW / brand risk.** Ruby Studio is explicitly an adult-content project. Treat it strictly as an internal reference for architecture; no asset, persona, prompt, or string from it ships anywhere near a RightSite/EMS product.
- **No auth, single-user.** Ruby has "no authentication — local network, single user." RightSite needs admin login + multi-user completion tracking; none of that exists here and must be built fresh (look to the `demo.mededprep.com` admin/tracking side, not Ruby).

### Recommended takeaways for the build
1. **Adopt the beat/scenario data model** (authored node: scenario text + unlock conditions + completion trigger + sort order) as the schema for the branching call sim — it is proven and minimal.
2. **Adopt the gated-stage advancement + fail-closed condition checker** as the branch-routing logic.
3. **Adopt the persona-authoring method** (traits + opening line + few-shot + author framing) to script the simulated caller — if any LLM realism is layered on.
4. **Re-implement in the HTML/demo stack**, not Ruby's FastAPI/React/Ollama stack, to stay aligned with the `/gtc-demo/`→`demo.mededprep.com` interactive-video + tracking + certificate lineage that is the deal's actual foundation.

---

## Sources touched
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
