# Multi-App Bug Widget Deployment: Architecture Analysis

**Date:** 2026-05-17  
**Status:** Research / recommendation  
**Scope:** Deploying @mededprep/bug-widget across 6+ apps in the MedEdPrep ecosystem

---

## Current State

**Widget:** `@mededprep/bug-widget` -- 15KB gzipped, framework-agnostic, captures screenshots (~800KB base64), console errors, network errors, session trails. Auto-reports on 4xx/5xx. Already has localStorage retry queue (max 10 pending reports).

**Currently deployed in 2 apps:**

1. **Portal** (`mededprep-portal`) -- Widget POSTs to `/api/bug-reports`, which writes to PostgreSQL via Prisma. Full CRUD admin UI. API key auth for machine access (bug grinder). This is the central hub.

2. **CE** (`mededprep-ce`) -- Widget POSTs to `/api/bug-reports`, which writes JSON files to `storage/bug-reports/`. No admin UI, no forwarding to portal. These reports are **siloed** -- the bug grinder can't see them, and they don't appear in the portal dashboard.

**Expanding to:** CoAssist, Pulse, Clinicals, Demo, and potentially Inst, Flashcards, Scheduler.

**Downstream consumer:** `bug-grinder.sh` fetches open reports from the portal API, maps `project` field to repo path, launches Claude sessions in tmux to investigate and fix. Already has mappings for 6 projects. Relies entirely on the portal's database.

---

## Question 1: How Do Sentry/BugSnag/LogRocket Handle This?

All three use **Pattern A -- direct to central** exclusively.

**Sentry:** Every app gets a DSN (a URL with embedded project key). Client SDK POSTs events directly to Sentry's intake endpoint. No local proxy. No local storage beyond the SDK's internal retry queue (which is exactly what the bug widget already has). Multi-project is handled by different DSN per app, all visible in one org dashboard. There is no concept of "local copy" -- if the central endpoint is down, events are queued in-memory/IndexedDB and retried.

**BugSnag:** Same pattern. Each app gets an API key. Client posts directly to `notify.bugsnag.com`. Projects are separated by API key, unified in a single dashboard.

**LogRocket:** Direct POST to `r.lr-ingest.io`. Sessions are tagged with app ID. No local intermediary.

**Key insight:** None of these products use a local proxy pattern. They all rely on:
- Client-side retry queues for resilience (the widget already has this)
- A single ingestion endpoint that handles all apps
- Project/app identification via a field in the payload (the widget already sends `project`)

The local proxy pattern (Pattern B) is more common in enterprise environments where compliance requires on-premise log retention before forwarding to a cloud service. That's not the situation here -- all apps and the central API are under the same infrastructure.

---

## Question 2: Is Local Logging Actually Valuable?

**The CE app's current local storage approach is a cautionary tale.** It writes JSON files to disk, but:
- Nobody looks at them (no admin UI in CE)
- The bug grinder doesn't read them (it only queries the portal API)
- They don't show up in the unified dashboard
- They're effectively write-only logs

**When local logs would be valuable:**
- If each app had its own ops team that triaged locally first (you don't -- 3-4 person team)
- If compliance required local retention (no such requirement)
- If the central API had significant downtime (the portal runs on the same infra as the apps)
- If reports contained data too sensitive to send cross-origin (they don't -- PII is already stripped)

**When local logs are not valuable (your situation):**
- Small team uses one dashboard
- Bug grinder automation reads from one API
- All apps are on the same network/hosting
- The widget already has localStorage retry, which covers the "central API is briefly down" case

**Verdict:** Local logging adds complexity without benefit for this team size and architecture. The CE app's local files are dead weight -- they should be removed when moving to direct-to-central.

---

## Question 3: Right Level of Infrastructure for 6 Apps / 3-4 Person Team

The answer is: **as little as possible.** You already have the hard parts built.

What you have:
- A battle-tested widget with retry queue, auto-reporting, debouncing
- A full-featured central API with Prisma + PostgreSQL storage
- An admin dashboard for triage
- A bug grinder that autonomously fixes bugs from the API

What you need to add for 6+ apps:
- **CORS on the portal's bug-reports endpoint** (one config change)
- **A known central URL** that all widgets point to
- **Consistent `project` naming** across apps

What you do NOT need:
- A separate ingestion microservice
- A message queue
- Log aggregation infrastructure
- Per-app proxy routes
- An npm middleware package

The portal's `POST /api/bug-reports` is already open (no auth required). It validates `project`, `url`, and `trigger`. It handles 2MB payloads. It's behind a rate limiter. It creates structured records in PostgreSQL. This is already production-grade ingestion.

---

## Question 4: Shared Express Middleware Package vs Inline Code

**Neither.** If going direct-to-central, there is no server-side code to share. The widget is the only thing each app needs, and it's already an npm package (`@mededprep/bug-widget`).

If you *did* want local proxies (which I'm recommending against), then yes, a shared Express middleware package would be clearly better than copying 60 lines of route code into each app. But the middleware package is solving a problem you shouldn't create.

---

## Question 5: Fire-and-Forget with Central-First, Local-Fallback

This is actually what the widget already does, just with `apiUrl` as the target:

1. Widget POSTs to `apiUrl`
2. If POST fails, saves to localStorage
3. On next successful POST, retries localStorage queue

The only change for direct-to-central is making `apiUrl` point to the portal instead of a local route. The retry behavior is identical. The widget doesn't need modification.

If you wanted a belt-and-suspenders approach where the widget tries central first, then writes to a local endpoint as backup, you'd need:
- Modifying the widget to accept two URLs (primary + fallback)
- Maintaining local routes in every app
- A mechanism to sync local reports to central (or accept that some reports live in two places)

This adds complexity for a scenario (portal API down but local app API up) that is unlikely given shared infrastructure and already mitigated by the localStorage retry queue.

---

## Recommendation: Pattern A with One Enhancement

**Go direct-to-central. No local proxies. No middleware package.**

### Concrete steps:

**1. Add CORS to portal's bug-reports endpoint**

The portal currently doesn't need CORS because the widget POSTs to same-origin `/api/bug-reports`. When widgets in other apps POST to `https://team.mededprep.app/api/bug-reports`, CORS headers are required.

Add to the portal's server.js, before the bug-reports route mount:

```js
// CORS for bug widget cross-origin submissions
app.options('/api/bug-reports', cors({
  origin: [
    'https://ce.mededprep.app',
    'https://coassist.mededprep.app', 
    'https://pulse.mededprep.app',
    'https://clinicals.mededprep.app',
    // etc, or use a *.mededprep.app pattern
  ],
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86400,
}));

app.use('/api/bug-reports', 
  cors({ origin: /* same list */ }),
  express.json({ limit: '2mb' }),
  bugReportsRoutes
);
```

Or simpler: since the POST endpoint is already open/unauthenticated and the payload contains no secrets, a wildcard `origin: '*'` is defensible. Bug reports are write-only from the client perspective.

**2. Point all widgets to the central URL**

In each app's widget initialization:

```js
initBugWidget({
  project: 'mededprep-ce',      // unique per app
  apiUrl: 'https://team.mededprep.app/api/bug-reports',
  autoReportErrors: true,
});
```

The portal itself can keep using `/api/bug-reports` (same-origin) or switch to the absolute URL for consistency.

**3. Remove CE's local bug-reports route**

Delete `mededprep-ce/routes/bug-reports.js` and its registration in `app.js`. The JSON files in `storage/bug-reports/` can be archived or deleted -- they're already covered by whatever the portal captured.

**4. No widget code changes needed**

The widget already:
- Sends `project` in every report (maps to repo in bug grinder)
- Has localStorage retry queue (handles brief outages)
- Debounces auto-reports (prevents spam)
- Strips sensitive headers (safe for cross-origin)
- Accepts `apiUrl` as config (just change the value)

**5. For the portal app specifically, keep it same-origin**

The portal widget can continue POSTing to `/api/bug-reports` locally since it's the same server. No CORS needed for same-origin. But switching to the absolute URL would also work fine and be more consistent.

### Tradeoffs

| Factor | Direct-to-Central (recommended) | Local Proxy + Forward |
|--------|------|------|
| Code changes per new app | 0 server-side, just widget config | New route file + registration + JSON limit config |
| Single source of truth | Yes, portal DB | No, reports split across apps until forwarding happens |
| Bug grinder compatibility | Works today, no changes | Would need to query each app's local API or wait for forwarding |
| CORS required | Yes (one-time setup on portal) | No (same-origin POSTs) |
| Resilience to portal downtime | Widget localStorage queue retries automatically | Reports saved locally, eventually forwarded |
| Resilience to *app* downtime | Reports already submitted to portal, unaffected | Local copies lost if app server dies before forwarding |
| Maintenance burden | Near zero (widget is already a package) | Route code in every app, JSON limit config, storage dir management |
| Data consistency | Perfect -- one write, one record | Risk of duplicates, missed forwards, orphaned local files |

### The resilience question

The main argument for local proxies is resilience: "what if the central API is down?" But consider:

1. The widget's localStorage queue already handles this. Reports are saved locally in the browser and retried on next successful submission.

2. If the portal is down, local app APIs are likely also affected (shared infrastructure).

3. The localStorage queue holds 10 reports. At one auto-report per 30 seconds max, that's 5 minutes of coverage -- more than enough for a deployment or restart.

4. The CE app's current local JSON files prove the point: nobody has ever needed to dig through `storage/bug-reports/*.json` to find a report that was lost.

### What "Pattern C" would look like (not recommended, but documented)

If the team grows or the apps move to separate infrastructure, a more sophisticated pattern would be:

- **Ingestion microservice:** A dedicated lightweight service (not the portal) that accepts reports, writes to a shared database or queue, and handles high volume.
- **Event bus:** Reports published to a message queue (Redis Streams, SQS), consumed by the dashboard and the bug grinder independently.
- **CDN-hosted widget:** Widget JS served from a CDN with config baked in per-app via query parameters.

None of this is warranted at 6 apps with a 3-4 person team. It would be premature infrastructure. The portal's existing endpoint is sufficient until you're processing hundreds of reports per day across dozens of apps.

---

## Summary

The widget is already designed for direct-to-central. The CE app's local proxy pattern was a reasonable first implementation but creates a data silo. For 6+ apps:

1. Enable CORS on the portal's bug-reports endpoint
2. Point every widget to `https://team.mededprep.app/api/bug-reports`
3. Delete per-app bug-reports routes
4. Zero widget code changes

Total effort: ~30 minutes of server config. Zero new packages. Zero new patterns to maintain.
