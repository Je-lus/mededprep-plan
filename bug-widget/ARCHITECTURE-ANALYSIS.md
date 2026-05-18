# Bug Widget Architecture: Central vs. Local-Proxy

**Date:** 2026-05-17
**Status:** Research / Recommendation
**Author:** Analysis for MedEdPrep engineering

---

## Current State

The `@mededprep/bug-widget` NPM package is deployed in two apps today:

| App | `apiUrl` config | Server-side handling | Forwarding to central |
|-----|----------------|---------------------|-----------------------|
| **Portal** | `/api/bug-reports` | PostgreSQL via Prisma (canonical store) | N/A -- this IS central |
| **CE** | `/api/bug-reports` | JSON files to `storage/bug-reports/` | **None** -- reports are siloed |

The bug grinder (autonomous AI pipeline) reads exclusively from the portal's PostgreSQL database. This means CE bug reports are currently invisible to the grinder. This is the immediate problem that prompted this research.

Six apps are planned: portal, CE, CoAssist, Pulse, Clinicals, Demo.

---

## 1. Industry Patterns: How SaaS Error Monitoring Tools Handle Client-to-Server Flow

### Direct-to-SaaS (dominant pattern)

**Sentry, Datadog RUM, LogRocket, Bugsnag, Rollbar** all use the same architecture: the client SDK sends events directly to the SaaS backend. There is no proxy through the app's own server.

- **Sentry SDK:** The browser SDK (`@sentry/browser`) sends error envelopes directly to `https://<key>@o<org>.ingest.sentry.io/<project>` via the Fetch API. The DSN (Data Source Name) is a URL baked into the client. There is no server-side intermediary unless the user explicitly configures a tunnel (see below).
- **Datadog RUM:** The `@datadog/browser-rum` SDK sends to `https://browser-intake-datadoghq.com` directly. Configuration is a client token + application ID, injected at init time.
- **LogRocket:** Direct to `https://r.lr-ingest.io`. Client initializes with `LogRocket.init('org/app-id')`.
- **Bugsnag:** Direct to `https://notify.bugsnag.com`. API key in client config.
- **Rollbar:** Direct to `https://api.rollbar.com/api/1/item/`. Client-side access token.

### Why direct-to-SaaS works for them

1. **The SaaS endpoint is purpose-built for ingestion** -- high availability, rate limiting, buffering. It is a write-only endpoint from the client's perspective.
2. **No sensitive data flows through it that the app server needs to gate.** Error reports are observability data, not business transactions.
3. **Decoupling from the app server means errors get reported even when the app server is down** -- which is precisely when you most need error reporting.

### The "tunnel" exception

Sentry documents a "tunnel" pattern where the app server proxies Sentry payloads to avoid ad-blockers (some blockers reject requests to `*.ingest.sentry.io`). This is a lightweight pass-through -- no local storage, no processing. It exists purely to solve a network filtering problem, not an architectural one.

### Relevance to MedEdPrep

The MedEdPrep setup is analogous: the portal API is the "SaaS backend." The widget is the "SDK." The question is whether each app should go direct to portal, or proxy through its own backend.

---

## 2. Local Copies: Is Keeping Bug Reports on Each App Server Worth the Complexity?

### Arguments for local copies

| Argument | Realistic value for MedEdPrep | Verdict |
|----------|-------------------------------|---------|
| **Disaster recovery** -- if portal goes down, reports aren't lost | The widget already has localStorage retry (up to 10 pending reports). Client-side resilience handles this. | Low value |
| **Debugging without central access** -- a dev SSH'd into the CE server can look at local reports | In practice, the admin dashboard and grinder are the actual debugging tools. Nobody is SSH'ing into servers to `cat` JSON files. | Low value |
| **Audit trail** -- regulatory/compliance need for local records | Bug reports are internal dev tooling, not subject to audit requirements. | Not applicable |
| **Network partition** -- CE server can't reach portal | All apps share the same hosting environment (likely same VPS or cluster). If CE can't reach portal, something is severely wrong. The client retry queue handles transient failures. | Low value |
| **Local processing / enrichment** -- app server adds server-side context before forwarding | This would be valuable IF there's server-side context to add (e.g., request logs, server-side state). Currently the widget captures everything client-side. | Theoretically interesting, not needed today |
| **Rate limiting / deduplication before central** -- prevent flood of reports from one app | The widget already debounces auto-reports (30s). The portal POST endpoint is open/lightweight. | Already handled client-side |

### Arguments against local copies

1. **Maintenance burden of 6 different storage implementations.** CE currently writes JSON files. Portal uses Prisma/PostgreSQL. If you proxy through each app, each app needs a route, storage, and eventually cleanup/rotation logic. That is 6x the surface area for a 3-4 person team.
2. **Data fragmentation.** The CE app's JSON files are already a dead end -- invisible to the grinder, invisible to the admin dashboard. Local copies create information silos by default.
3. **Forwarding complexity.** A "store locally then forward" pattern requires: reliable forwarding logic, retry on failure, deduplication at the central end (or idempotency keys), and monitoring of the forwarder itself. This is a distributed systems problem -- overkill for internal bug reporting.
4. **The widget already has resilience.** `reporter.ts` saves failed submissions to `localStorage` and retries on the next successful submission. This is client-side store-and-forward, and it works without any server-side complexity.

### Verdict

**Local copies are not worth the complexity.** The operational value is theoretical, and the implementation cost is real. The widget's built-in localStorage retry already provides the resilience you need.

---

## 3. Architecture Recommendation for a Small Team (3-4 Devs, 6 Apps)

### Recommended: Direct-to-Central

```
Browser (any app)
  |
  |  POST /api/bug-reports
  |
  v
Portal API (PostgreSQL)
  |
  v
Admin Dashboard + Bug Grinder
```

Every app's widget POSTs directly to the portal's `/api/bug-reports` endpoint. No proxy, no local storage, no middleware.

### What "directly" means in practice

There are two sub-patterns, depending on deployment topology:

#### Option A: Absolute URL to portal (simplest)

```ts
initBugWidget({
  project: 'mededprep-ce',
  apiUrl: 'https://team.mededprep.app/api/bug-reports',
  // ...
});
```

The widget sends a cross-origin POST. The portal needs CORS headers for the bug-reports endpoint (it may already have this; the endpoint is unauthenticated).

**Pros:** Zero server-side work on CE/CoAssist/Pulse/etc. Completely decoupled from app backends.
**Cons:** Requires CORS config on portal. Subject to ad-blockers (unlikely for your own domain, but possible). Fails if portal is unreachable (mitigated by localStorage retry).

#### Option B: Reverse proxy path on each app (current pattern, improved)

Each app keeps `/api/bug-reports` as a route, but instead of storing locally, it proxies to portal:

```js
// In each Express app — 5 lines
router.post('/', async (req, res) => {
  const response = await fetch('https://team.mededprep.app/api/bug-reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.status(response.status).json(data);
});
```

**Pros:** No CORS needed. Widget config stays as relative path `/api/bug-reports` (same-origin). Apps can add server-side context if desired later.
**Cons:** Slight coupling (each app's proxy depends on portal being up, but the same failure mode exists with direct-to-central). Small amount of duplicated code across apps.

### Recommendation: Option A (absolute URL) with env-var configuration

For a 3-4 person team, Option A is strictly simpler:
- Zero server-side code in 5 of your 6 apps
- No proxy routes to maintain
- Widget localStorage retry covers portal downtime
- One fewer network hop

The CORS concern is minimal because you control both domains and the endpoint is unauthenticated. Add a single CORS header to the portal's bug-reports route:

```js
// portal/routes/bug-reports.js — add at top of router
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');  // or specific app domains
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
```

If you later need server-side enrichment (adding server request IDs, user session context from the backend), you can switch individual apps to Option B on a case-by-case basis without changing the widget or the central API.

---

## 4. Middleware Package: Should You Build @mededprep/bug-reports-middleware?

**No. Not now, and probably not ever.**

If you go with Option A (direct-to-central), there is no server-side code to share -- the question is moot.

If you go with Option B (reverse proxy), the proxy handler is 5-10 lines of Express. Extracting this into a shared NPM package adds:
- A package to version, publish, and install
- A dependency to keep updated across 6 apps
- Abstraction over code that is trivially simple

The threshold for a shared middleware package is: "Would I be upset if an engineer copy-pasted a slightly different version into each app?" For a 5-line proxy, the answer is no. Copy-paste is fine. The implementations are identical today and will likely remain identical because the forwarding logic has no reason to diverge.

If server-side handling grows to include rate limiting, deduplication, server-context enrichment, and local fallback storage, then a shared package starts making sense. But that is the "local-proxy" architecture you should avoid in the first place.

### What about the widget package itself?

`@mededprep/bug-widget` as a shared package is correct and should remain so. It contains real complexity (screenshot capture, DOM interception, session tracking, auto-reporting). That is exactly the kind of code that benefits from centralization.

---

## 5. Widget Configuration: Cleanest Pattern for N Apps

### Current state

Both apps use a relative path:
```ts
apiUrl: '/api/bug-reports'
```

This works because each app has its own server-side route. If switching to direct-to-central (Option A), this needs to become an absolute URL.

### Recommended: Build-time environment variable

```ts
// In each app's main.tsx
initBugWidget({
  project: import.meta.env.VITE_APP_NAME || 'unknown',
  apiUrl: import.meta.env.VITE_BUG_REPORT_URL || 'https://team.mededprep.app/api/bug-reports',
  // ...
});
```

With `.env` defaults:
```env
VITE_APP_NAME=mededprep-ce
VITE_BUG_REPORT_URL=https://team.mededprep.app/api/bug-reports
```

**Why build-time env var:**
- Standard Vite pattern (`import.meta.env.VITE_*`)
- Already used across the codebase for Sentry DSN, API base URLs, etc.
- Hardcoded default means it works even if the env var is missing
- Different values per environment (dev/staging/prod) without code changes
- No runtime config fetch needed (one fewer network request at startup)

**Why not runtime config:**
- Runtime config (fetching a `config.json` at startup) adds latency and a failure mode for no benefit. The bug report URL is static across an environment.

**Why not hardcoded with env override:**
- This is functionally the same as the env var pattern with a default. The env var IS the override mechanism.

### Project identifier

Hardcode the `project` field per app. It never changes per-environment. Using an env var for it adds indirection with no benefit:

```ts
// Hardcode this -- it's the identity of the app
project: 'mededprep-ce',
```

---

## Summary: Recommended Architecture

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| Direct vs. proxy | **Direct-to-central** (Option A) | Eliminates server-side code in 5 apps; widget retry handles resilience |
| Local copies | **No** | localStorage retry is sufficient; local copies create silos and maintenance burden |
| Shared middleware package | **No** | Not needed if going direct; trivial if going proxy |
| Widget `apiUrl` config | **Build-time env var** with hardcoded default | Standard Vite pattern, zero-config in most cases |
| CORS | **Add to portal bug-reports route** | One-time, 5-line change |

### Immediate action items

1. Add CORS headers to `portal/routes/bug-reports.js` for the POST endpoint
2. Update CE app's widget config to use the absolute portal URL (or env var)
3. Delete `mededprep-ce/routes/bug-reports.js` and its JSON file storage
4. For each new app (CoAssist, Pulse, Clinicals, Demo): configure the widget with the portal URL, no server-side route needed
5. Verify the grinder already sees reports from all apps (it will, since they all land in the same PostgreSQL table with different `project` values)

### What you avoid by doing this

- 6 different server-side bug report handlers (currently 2, heading toward 6)
- A forwarding/retry system between apps and portal
- A shared middleware NPM package to maintain
- Deduplication logic at the central end
- Orphaned bug reports in local JSON files that no tool reads

The simplest architecture is the one with the fewest moving parts. For internal bug reporting across 6 apps owned by one team, that is direct-to-central with client-side retry.
