# Portal CRM Investigation Report
**Date:** 2026-06-01
**Trigger:** Heather reporting "follow-ups not saving", "data not persisting", "pieces not connecting"

## Executive Summary

The portal isn't broken in the traditional sense — the APIs work, data saves to the DB. The problem is a **death by a thousand cuts**: silent failures, cache bugs that make saved data invisible, missing UI affordances, and a follow-up system that only works if you approach it through a specific (non-obvious) path.

Heather's experience: she does work, the system doesn't reflect it. She tries to schedule follow-ups, the button does nothing. She logs calls, the School Hub doesn't update. She sees "All caught up!" on My Day when she hasn't done anything — because nothing is assigned to her queue.

---

## The Big Three Problems

### 1. "Follow-ups Not Saving" — Multiple Root Causes

| What's happening | Why | Severity |
|---|---|---|
| FAB "Schedule Follow-up" button does nothing | Event `open-schedule-followup` fires but no handler exists | **P0** |
| Auto-created follow-up tasks fail silently | `quick-call-logs.js:164-179` catches errors as non-fatal warnings | **P0** |
| Can't set follow-up after "No Answer" / "Voicemail" | Wrap-up phase skipped for non-connect outcomes | **P1** |
| Two competing systems: Task vs. School.nextActionDate | Users don't know which one "counts" for My Day | **P1** |
| No standalone "Schedule Follow-up" on School Hub | Must go through call disposition to create one | **P1** |

### 2. "Data Not Persisting" — Cache Invalidation Bugs

| Mutation | What's NOT refreshed | Impact |
|---|---|---|
| Log a call (useQuickCallLog) | School Hub composite data (`schoolHubKeys.hub`) | User stays on hub, sees stale timeline |
| Log a call (useQuickCallLog) | Deal pipeline cards (`dealKeys.all`) | Pipeline shows old nextActionDate |
| Log a call (useQuickCallLog) | My Day stats (`myDayKeys.stats`) | Call count doesn't increment |
| Log a call (useQuickCallLog) | Schools list (`['schools']`) | "Last Activity" column stale |
| Update school (useUpdateSchool) | School Hub composite (`schoolHubKeys.hub`) | Changes don't appear on hub |
| Contact activity logged | Contact detail sheet (`['contact-activity']`) | Must close/reopen to see new activity |

### 3. "Pieces Not Connecting" — Data Silos

| Action | Where it's recorded | Where it's NOT shown |
|---|---|---|
| Create a task | Task table | School Hub activity timeline |
| Save notes | School record | Activity timeline (no "notes updated" entry) |
| Update contact | Contact table | Activity timeline |
| Export documents | Nowhere persistent | Activity timeline |
| Config changes | Config history (separate) | Main activity timeline |

---

## Bugs to Fix (Code-level)

### P0 — Broken functionality

1. **SMS threads 500 error** — `routes/schools/hub.js:569`
   - Wrong: `school: { schoolId }` (relation filter)
   - Fix: `schoolId: schoolId` (direct field filter)
   - Also: `canAccessSchool` used as middleware on line 566 but it's a utility function, not middleware

2. **FAB "Schedule Follow-up" fires into void** — `app/src/components/ui/quick-actions-fab.tsx:79`
   - Event `open-schedule-followup` dispatched but no handler in SchoolHub
   - Need: Add event listener in SchoolHub that opens a follow-up scheduling dialog

3. **Silent task creation failures** — `routes/quick-call-logs.js:164-179`
   - Task creation wrapped in try-catch with `log.warn` only
   - User sees "Logged!" but follow-up task wasn't created
   - Need: Surface the error to the response, or at minimum retry

### P1 — Cache invalidation (the "not persisting" bugs)

4. **useQuickCallLog missing invalidations** — `app/src/hooks/useQuickCallLog.ts:70-92`
   - Add: `schoolHubKeys.hub(schoolId)`, `dealKeys.all`, `myDayKeys.stats`, `['schools']`

5. **useUpdateSchool missing hub invalidation** — `app/src/hooks/schools/useSchoolMutations.ts:98-108`
   - Add: `schoolHubKeys.hub(schoolId)`

6. **No error toast on mutation failures** — `useQuickCallLog.ts`
   - Add `onError` callback with toast notification

### P2 — Logic issues

7. **Bulk assign doesn't dual-write to Deal** — School gets assignedToId but Deal doesn't
   - Today-view queries Deal, so bulk-assigned schools stay invisible

8. **Today-view skips unassigned schools in team view too** — `routes/schools/follow-up.js:352-355`
   - `if (!deal.assignedToId) continue` runs even when no assignedToId filter is passed

---

## Features That Don't Exist But Should

### Must-have (Heather's workflow depends on these)

1. **"Schedule Follow-up" button on School Hub header** — alongside Send Email / Send SMS
   - Opens date picker + optional note → creates Task linked to school
   - One click, done

2. **Standalone follow-up creation from Contact Detail** — when viewing a contact, "Set Reminder" button
   - Creates task linked to school + contact

3. **Follow-up date prompt after ALL call outcomes** — not just "connected" outcomes
   - "No Answer" should still let you say "try again Thursday"

4. **Activity timeline should include tasks, notes edits, and doc exports**
   - When a task is created linked to a school, log it to SchoolActivityLog
   - When notes are saved, create an activity entry
   - When docs are exported, create an activity entry

### Nice-to-have (would significantly reduce friction)

5. **"Assign to Me" button** on School Hub and school list rows
6. **Recently viewed schools** — quick-access list without searching
7. **Auto-assign schools to creator** — `assignedToId: assignedToId || req.user.id` in POST /schools
8. **Better empty state on My Day** — distinguish "all caught up" from "nothing assigned to you"
9. **Post-creation wizard** — after creating a school: "Add a contact? Set pipeline stage? Schedule first call?"

---

## Heather's Actual Workflow (from the data)

What she does: Login → Schools list → Open school → Edit config → Export docs → Update contacts → Repeat

What she's NOT doing (because the system doesn't support it for her):
- Using My Day (empty — nothing assigned)
- Creating follow-ups (button doesn't work, no obvious path)
- Using call session flow (requires populated queue)
- Seeing her work reflected in activity timelines

She's essentially using the portal as a **document generation tool** (configs + exports) rather than a CRM, because the CRM workflows don't work for her.

---

## Recommended Fix Order

**Week 1 — Make it not lie to users:**
- Fix SMS 500 bug
- Fix cache invalidation (4 hooks)
- Add error toasts on mutation failures
- Wire up FAB follow-up handler
- Make silent task creation failures visible

**Week 2 — Make follow-ups actually work:**
- Add "Schedule Follow-up" to School Hub header
- Allow follow-up setting after non-connect call outcomes
- Surface tasks in school activity timeline
- Log note edits and doc exports to activity timeline

**Week 3 — Make the system work without setup overhead:**
- Fix today-view to not skip unassigned schools in team view
- Fix bulk assign to dual-write deals
- Add "Assign to Me" button
- Improve My Day empty state messaging
- Post-school-creation guidance
