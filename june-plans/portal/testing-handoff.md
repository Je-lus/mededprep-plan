# Testing Overhaul — Handoff

**Date:** 2026-06-01
**Status:** Phase 1, 3, 4 complete. Phase 2 ongoing (incremental).

## What Was Done This Session

### Conference Leads Improvement
- Smart promote with dedup detection (links to existing prospects/schools instead of duplicating)
- Bulk promote endpoint and UI (checkbox select + "Promote N selected")
- Match info on admin list (shows "In Prospects" / "In Schools" badges for leads already in the system)
- Deployed to production

### Testing Overhaul
- **3,700 lines of junk tests removed** — screenshot automation, shallow render checks, dead skipped tests
- **Smoke tests rewritten** — 32 page-load checks collapsed to 2 real smoke tests
- **5 P0 E2E tests** — regression guards for the investigation report fixes
- **4 P1 E2E tests** — critical workflow coverage
- **10 backend integration test files** — 204 new tests across critical routes

### Bug Surfaced
The schools core-crud tests revealed: **Deal.stage doesn't sync when school.dealStage is updated via PUT.** The school updates correctly but the Deal record stays at its original stage. This is a pre-existing issue in `routes/schools/core-crud.js` (the `$transaction` block around lines 862-924).

---

## What's Left: Phase 2 — Rewrite Brittle E2E Tests

**Policy: touch it, fix it.** When you're working in one of these areas for a feature or fix, rewrite the test at the same time. Don't do this as a dedicated sprint.

### Files to Rewrite (~80 tests across 9 files)

All in `app/e2e/modules/crm/` or `app/e2e/modules/`:

| File | Tests | Problem | How to Fix |
|------|-------|---------|------------|
| `crm-daily-workflow.spec.ts` | 9 | "heading and controls visible" — no data flow | Verify actual queue data, not heading text |
| `crm-customer-management.spec.ts` | 8 | Customer name getByText, no persistence check | Verify via API that customer persists |
| `crm-manager-view.spec.ts` | 21 | Brittle "NASEMSO Region Legend" text matching | Use data-testid or verify actual data |
| `crm-renewals-interactions.spec.ts` | 10 | Filter tests with getByText('All Risk Levels') | Verify filter results change, not label text |
| `crm-schools-list-interactions.spec.ts` | 13 | Sorting doesn't verify actual order | Assert row order after sort click |
| `crm-today-view.spec.ts` | 17 | Disposition tests use fragile getByText | Verify outcomes via API + UI reflection |
| `schools-hub.spec.ts` | 19 | "Primary Contact" text check, no contact data | Verify contact data renders, not label |
| `pipeline-kanban.spec.ts` | 7 | Sorting doesn't verify order | Assert card positions after sort |
| `quick-call-log.spec.ts` | 2 | Checks toast "Call logged" but not persistence | Add API check after toast |

### The Pattern to Apply

**Before (bad):**
```typescript
await expect(page.getByText('Follow-Up Queue')).toBeVisible();
await expect(page.getByText('Overdue')).toBeVisible();
```

**After (good):**
```typescript
// Verify via API that data exists
const queue = await request.get(`${BACKEND_URL}/api/schools/follow-up-queue`, { headers });
expect(queue.data.length).toBeGreaterThan(0);
// Then verify UI reflects it
await expect(page.getByRole('row').filter({ hasText: schoolName })).toBeVisible();
```

---

## Reference Documents

| Document | Location | What It Contains |
|----------|----------|------------------|
| Full testing plan | `domination/june-plans/portal/testing-overhaul.md` | 4-phase plan, cross-AI audit comparison, all test specs |
| Investigation report | `domination/june-plans/portal/investigation-report.md` | CRM bugs (all fixed), Heather's workflow pain points |
| Portal bugs | `domination/june-plans/portal/portal-bugs.md` | Heather's specific issues (server investigation) |
| AccreditCon leads | `domination/june-plans/portal/accreditcon-leads.md` | Original lead acquisition brief |
| Cross-AI E2E audits | `e2e-philosophy/mededprep-portal/opus.md` | Opus perspective — most nuanced, recommended for rewrite guidance |
| | `e2e-philosophy/mededprep-portal/gemini.md` | Gemini perspective — most aggressive |
| | `e2e-philosophy/mededprep-portal/codex.md` | Codex perspective — moderate |
| Bug report index | `.bugs/portal/INDEX.md` | 127 bug reports, triaged by severity |

## New Test Files Created This Session

### E2E Tests (`app/e2e/modules/crm/`)
| File | Priority | What It Tests |
|------|----------|---------------|
| `crm-cache-invalidation.spec.ts` | P0 | Call logging reflects in Hub, schools list, My Day without refresh |
| `crm-fab-followup.spec.ts` | P0 | FAB Schedule Follow-up creates task visible on My Day |
| `crm-task-creation.spec.ts` | P0 | callback_requested/follow_up outcomes always create tasks |
| `crm-nonconnect-followup.spec.ts` | P0 | no_answer/voicemail support follow-up scheduling |
| `crm-activity-timeline.spec.ts` | P0 | Calls, tasks, note updates all appear in timeline |
| `crm-myday-stats.spec.ts` | P1 | Stat bar updates after call logging |
| `crm-conference-lead-lifecycle.spec.ts` | P1 | Full promote flow + dedup detection |
| `crm-disposition-and-contacts.spec.ts` | P1 | Disposition date rules + contact-level tracking |
| `crm-schools-list-and-onboarding.spec.ts` | P1 | Schools list freshness + onboarding milestones |

### Backend Integration Tests (`routes/__tests__/`)
| File | Tests | What It Covers |
|------|-------|----------------|
| `conference-lead.integration.test.ts` | 25 | Public capture, smart promote, bulk promote, dedup |
| `calls.integration.test.ts` | 16 | Call lifecycle, dispositions, contact tracking |
| `follow-up.integration.test.ts` | 11 | Today view, follow-up queue, assignment filtering |
| `auth.integration.test.ts` | 13 | Login, logout, refresh, me, permission guards |
| `manager-schools.integration.test.ts` | 15 | School assignment, rep activity, pipeline by rep |
| `manager-prospects.integration.test.ts` | 17 | Stats aggregation, CSV export, filtering |
| `stripe-webhooks.integration.test.ts` | 19 | Signature verification, event processing, idempotency |
| `stripe-subscriptions.integration.test.ts` | 22 | Listing, MRR, status filtering, customer linking |
| `checkouts.integration.test.ts` | 31 | Checkout/checkin lifecycle, bulk ops, overdue |
| `schools-core.integration.test.ts` | +21 | Deal creation, stage transitions, soft delete, milestones |

## Running Tests

```bash
# Backend integration tests
npm run test:backend

# Specific backend test
npx vitest run routes/__tests__/conference-lead.integration.test.ts

# Frontend unit tests
cd app && npm test

# All E2E
cd app && npm run e2e

# Specific E2E module
cd app && npx playwright test modules/crm/crm-cache-invalidation.spec.ts

# Smoke only
cd app && npm run e2e:smoke
```
