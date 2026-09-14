# Portal Testing Overhaul

**Priority:** P1
**Touches:** mededprep-portal / team.mededprep.com
**Date:** 2026-06-01

## Context

The portal has 715 E2E tests, 53 backend unit tests, 17 backend integration tests, and ~87 frontend unit tests. The infrastructure is solid (Vitest, Playwright, MSW), but ~275 of the E2E tests are either screenshot automation (no assertions), shallow render checks ("heading visible"), or brittle text-matching tests that break on copy changes and don't verify data outcomes.

Meanwhile, the tests that would have caught the bugs Heather hit (cache invalidation, silent failures, cross-view data staleness) don't exist.

### Guiding Principle

> A good e2e suite is not measured by raw number of tests. It is measured by whether the suite protects the highest-risk user journeys, runs reliably, catches regressions before users do, and does not become so slow/flaky that developers ignore it.

Good E2E tests read like real user stories: "A rep logs a call, schedules a follow-up, and sees it on My Day." Bad E2E tests: "Click button, check text, click tab, check icon."

---

## Current State

| Layer | Count | Quality |
|-------|-------|---------|
| Backend unit (lib/__tests__) | 36 | Solid — scoring, permissions, scheduling, pricing |
| Backend integration (routes/__tests__) | 17 | Good core, but 150+ routes untested |
| Frontend unit (hooks/utils/components) | ~87 | Strong on hooks and data layer |
| E2E (Playwright) | 715 tests, 79 files | ~440 real, ~275 junk/brittle |

### A-Tier Tests (Keep As-Is)
- `crm-call-session.spec.ts` — real outcomes: disposition -> stage change, attempt tracking resets
- `prospect-to-customer.spec.ts` — full pipeline lifecycle, verifies milestones + health scores
- `crm-pipeline-progression.spec.ts` — stage transitions with data verification
- `crm-lifecycle.spec.ts`, `crm-pipeline-flow.spec.ts`, `crm-renewal-health.spec.ts`
- Auth tests (login, invalid creds, logout, protected routes)

---

## Phase 1: Clean House

### Delete (61 tests, 3 files)

Screenshot automation — zero assertions, not tests:

| File | Tests | Action |
|------|-------|--------|
| `app/e2e/guides/capture-crm.spec.ts` | 28 | Delete |
| `app/e2e/guides/capture-daily-workflow.spec.ts` | 14 | Delete |
| `app/e2e/guides/capture-manager.spec.ts` | 19 | Delete |

### Reclassify or Gut (~120 tests across 6 files)

These only verify pages render with a heading. Collapse into 1 real smoke test.

| File | Tests | Problem |
|------|-------|---------|
| `smoke.spec.ts` | 32 | All 32 are shallow page-load checks |
| `core/dashboard.spec.ts` | 14 | 13/14 are heading visibility only |
| `core/responsive.spec.ts` | 17 | All 17 are viewport render checks |
| `radials/radials-navigation.spec.ts` | 9 | All 9 are heading checks |
| `core/error-handling.spec.ts` | 17 | All 17 check alert visibility only |

**Replace with:** One real smoke test that logs in, navigates to schools, sees actual data, navigates to pipeline, sees cards. 1 test, 2 minutes, proves the app works.

### Fix or Remove Skipped Tests (14 tests, 4 files)

| File | Skips | Issue |
|------|-------|-------|
| `schools-platform.spec.ts` | 5 | Conditional: "MedEdPrep API not configured" |
| `email-sending.spec.ts` | 6 | Conditional: "SendGrid API key not configured" |
| `pipeline-follow-ups.spec.ts` | 2 | "Not implemented" |
| `quick-call-log.spec.ts` | 1 | Conditional: "schoolId not set" |

---

## Phase 2: Rewrite Brittle Tests (~80 tests)

These test real features but rely on fragile `.getByText()` for UI labels. They break on copy changes and don't verify data outcomes.

| File | Tests | Issue |
|------|-------|-------|
| `crm-daily-workflow.spec.ts` | 9 | "heading and controls visible" — no data flow |
| `crm-customer-management.spec.ts` | 8 | Customer name getByText, no persistence check |
| `crm-manager-view.spec.ts` | 21 | Brittle "NASEMSO Region Legend" text matching |
| `crm-renewals-interactions.spec.ts` | 10 | Filter tests with getByText('All Risk Levels') |
| `crm-schools-list-interactions.spec.ts` | 13 | Sorting doesn't verify actual order |
| `crm-today-view.spec.ts` | 17 | Disposition tests use fragile getByText |
| `schools-hub.spec.ts` | 19 | "Primary Contact" text check, no contact data verified |
| `pipeline-kanban.spec.ts` | 7 | Sorting doesn't verify order |
| `quick-call-log.spec.ts` | 2 | Checks toast "Call logged" but not persistence |

**Pattern to fix:** Replace "check text exists" with "verify via API that data persisted, then verify UI reflects it."

---

## Phase 3: Add High-Value E2E Tests (12 new tests)

### P0 — Would Have Caught Known Production Bugs

**1. Call Logging Invalidates School Hub Cache**
> A rep logs a call with "follow_up" outcome, then navigates to School Hub and sees the updated nextActionDate and activity immediately — no refresh needed.

- Catches: Cache invalidation bugs (useQuickCallLog missing schoolHubKeys, dealKeys, myDayKeys invalidations)
- Spans: CallSession -> School Hub -> Pipeline cards

**2. FAB Follow-up Actually Creates Task**
> A rep clicks the FAB "Schedule Follow-up" on School Hub, picks a date, and sees the task appear on My Day.

- Catches: FAB `open-schedule-followup` event fires but no handler exists
- Spans: School Hub (FAB) -> Task Dialog -> My Day

**3. Call Task Creation Never Silently Fails**
> A rep logs a call with `callback_requested` outcome, and the task is created and queryable via API within 2 seconds.

- Catches: Silent try-catch in `quick-call-logs.js:164-179` swallows task creation errors
- Spans: CallSession -> Tasks API

**4. Follow-ups After Non-Connect Outcomes**
> A rep logs "No Answer", gets prompted to schedule a follow-up, sets "try again Thursday", and it appears in the queue.

- Catches: Wrap-up phase skipped for non-connect outcomes
- Spans: CallSession -> Follow-up Queue -> My Day

**5. Activity Timeline Shows All Event Types**
> A rep logs a call, adds a note, creates a task, and sees all three on the activity timeline in chronological order.

- Catches: Activity timeline misses tasks, note edits, doc exports
- Spans: School Hub -> Activity Tab

### P1 — Critical Workflows

**6. My Day Stats Update After Calls**
> A rep logs 3 calls, returns to My Day, and sees stat bar show "3 calls logged today" and follow-up count increment.

- Catches: myDayKeys.stats not invalidated after call logging
- Spans: CallSession -> My Day Stats Bar

**7. Schools List Reflects Call Outcome**
> A rep logs a `follow_up` call for School A, goes to schools list, and sees updated "Last Activity" without refresh.

- Catches: `['schools']` query key not invalidated after call
- Spans: CallSession -> Schools List

**8. Conference Lead Lifecycle**
> Admin captures a lead at AccreditCon, promotes it to prospect (with dedup detection for existing records), and it appears in the prospect pipeline.

- Catches: Conference lead promote flow gaps, duplicate creation
- Spans: Public form -> Admin Conference Leads -> Promote -> Prospects

**9. Disposition Auto-Schedules Correct Dates**
> A rep logs `no_answer` — system sets nextActionDate to +2 days. Logs `voicemail` — +3 days. Logs `follow_up` — uses the date the rep picked.

- Catches: Disposition rules not applied correctly
- Spans: CallSession -> School detail -> Follow-up Queue

**10. Contact-Level Call Tracking**
> School has 2 contacts. Rep logs call targeting Contact A. Contact A's attempt count increments. Contact B's doesn't.

- Catches: Contact-level tracking attributed to school instead of specific contact
- Spans: School Hub Contacts -> CallSession -> Contact detail

**11. Prospect-to-Customer Triggers Onboarding**
> Convert a prospect through full pipeline to "won" — 8 onboarding milestones auto-created on the School Hub Onboarding tab.

- Catches: Milestone creation missing after stage transition
- Spans: Pipeline -> School Hub Onboarding tab

### P2 — Good to Have

**12. Concurrent Dispositions Don't Conflict**
> Two reps call the same school simultaneously with different outcomes. Both calls recorded, no data loss.

- Catches: Race condition on concurrent school updates
- Spans: Multi-user CallSession

---

## Phase 4: Backend Integration Tests (10 highest-value gaps)

150+ route files have zero integration tests. Prioritized by risk:

| # | Route | Risk | Why |
|---|-------|------|-----|
| 1 | `stripe/webhooks.js` + handlers | Critical | Payment processing, signature verification, idempotency |
| 2 | `schools/follow-up.js` | High | Core CRM scheduling engine, urgency calculation |
| 3 | `calls.js` | High | Call session start/end/disposition, concurrent calls |
| 4 | `conference-lead.js` | High | Lead capture, smart promote with dedup, bulk promote |
| 5 | `manager/schools.js` | High | Rep assignment, nudge notifications |
| 6 | `auth.js` | High | Login, signup, password reset, invitation, brute force |
| 7 | `checkouts.js` | Medium-High | Asset inventory, bulk operations, concurrency |
| 8 | `schools/core-crud.js` | Medium-High | Deal creation on school create, soft delete cascades |
| 9 | `stripe/subscriptions.js` | Medium-High | MRR reporting, subscription queries |
| 10 | `manager/prospects.js` | Medium | Prospect stats, CSV export, aggregation |

### Existing Test Pattern

All 17 existing tests use a consistent pattern:
- Vitest + Supertest
- Mock `env.js` and `prisma.js` before server import
- `createAuthHeader()` with configurable roles/permissions
- `upsertTestUser()`, `upsertTestSchool()` helpers
- Coverage: 401 (no auth), 403 (wrong permission), 400 (validation), happy path
- Cleanup: `afterAll()` with dependency-aware ordering

---

## Cross-AI Audit Comparison

Three independent audits were run against the E2E suite (Opus, Gemini, Codex — saved in `e2e-philosophy/mededprep-portal/`). Key findings:

### Universal Agreement (all three + this plan)

- **3 workflow tests are the gold standard** — `prospect-to-customer`, `project-lifecycle`, `compliance-submission` are untouchable
- **Screenshot/capture tests must be deleted** — 3 files, 61 tests, zero assertions
- **Most `modules/` tests are brittle UI-checking** — "click tab, check heading" pattern dominates
- **CRM module has worst signal-to-noise** — 18 files, massive redundancy
- **Smoke tests too granular** — 30+ page-load checks should collapse to 1-2 real tests

### Where They Diverge — Aggressiveness

| Audit | Keep | Rewrite | Downgrade | Delete | Target E2E |
|-------|------|---------|-----------|--------|------------|
| **Opus** | ~85 | ~250 | ~350 | ~130 | 20-25 |
| **Gemini** | 3 | 8 | 400+ | 50+ | 8-10 |
| **Codex** | 32 | 18 | 180 | ~588 | 12-15 |
| **This plan** | ~440 | ~80 | ~120 | ~75 | ~25-30 after consolidation |

### Key Disagreements

**`crm-call-session.spec.ts`:**
- Opus: Keep (has real outcome verification)
- Gemini: Delete (lumps with "page-load" tests)
- Codex: Delete (same)
- **This plan: Keep.** Gemini/Codex are wrong here — this file tests real outcomes (disposition -> stage change, attempt tracking resets, DNC status). It's not a page-load test.

**`cadence-settings.spec.ts`:**
- Opus: Keep (test 8 verifies cadence rules actually affect follow-up scheduling via API)
- Gemini: Downgrade
- Codex: Downgrade
- **This plan: Keep.** The API-level verification in test 8 is exactly the kind of test we want more of.

**`token-refresh.spec.ts`:**
- Opus: Keep (valuable infrastructure — expired token triggers silent refresh)
- Gemini: Downgrade
- Codex: Downgrade
- **This plan: Keep.** Silent token refresh is invisible to users when it works, catastrophic when it doesn't.

**`auth.spec.ts`:**
- Opus: Keep
- Gemini: Downgrade (covered by smoke)
- Codex: Keep
- **This plan: Keep.** 4 focused tests, each a real scenario.

### Critical Gap in All Three External Audits

None of them identify what's **missing**. They are purely pruning exercises. None call out:
- Cross-view cache invalidation tests (would have caught the investigation-report bugs)
- FAB follow-up handler test
- Silent task creation failure detection
- Conference lead lifecycle
- Data freshness across views ("log call here, see update there")

Phase 3 of this plan is the most important part and is unique to this analysis — 12 new tests that protect real user journeys and would have caught known production bugs.

### Recommended Approach (Blend)

1. **Phase 1** — matches all four audits. Universal agreement on what to delete.
2. **Phase 2** — follow Opus's rewrite list (most nuanced about which tests have real value vs. brittle wrappers). Don't go as aggressive as Codex/Gemini — some tests they want to delete genuinely verify real outcomes.
3. **Phase 3** — unique to this plan. The 12 new high-value tests are the highest-ROI work. Prioritize P0 tests (cache invalidation, FAB follow-up, silent failures) over pruning.
4. **Phase 4** — backend integration gaps. Start with conference-lead.js (just changed), calls.js, and schools/follow-up.js.
5. **Target 25-30 E2E tests** after consolidation (Opus's range). 8-10 (Gemini) is too few to cover the portal's breadth across CRM, finance, compliance, email, and partner modules.

---

## Expected Outcome

| Metric | Before | After |
|--------|--------|-------|
| E2E tests (total) | 715 | ~450 |
| E2E tests (real, high-value) | ~440 | ~460 (+ 12 new workflow tests) |
| E2E tests (junk/brittle) | ~275 | 0 |
| Backend integration tests | 17 | 27 |
| User journeys protected | Partial | All critical paths covered |
| Known bugs caught by tests | 0 of 8 investigation-report bugs | 5+ of 8 |

## Status

Not started.
