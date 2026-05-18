# @mededprep/bug-widget

Lightweight, framework-agnostic bug reporting widget. Drop it into any web app to capture context-rich bug reports with a single click — or automatically on API errors.

## Features

- Floating bug icon that stays out of the way
- **Auto-reports on API errors** — fires a full report (screenshot + session trail) on any 4xx/5xx response
- Captures screenshots (via html-to-image)
- Buffers console errors and network failures
- Tracks session activity: page navigations, clicks, scroll depth
- **Draggable** — user can reposition the icon; position persists in localStorage
- **Mobile-friendly** — responsive sizing, full-screen modal, touch drag support
- **Non-intrusive** — entrance animation, auto-minimizes to a dot after inactivity
- Offline-resilient: stores reports in localStorage when API is unreachable
- Zero PII capture (no form values, no input text)
- < 15KB gzipped

## Installation

### Script Tag (CDN / self-hosted)

```html
<script
  src="path/to/bug-widget.js"
  data-project="my-app"
  data-api-url="https://api.example.com/bugs"
  data-position="bottom-right"
  data-auto-report-errors="true"
></script>
```

The widget auto-initializes when it detects `data-project` and `data-api-url` on its script tag.

### NPM

```bash
npm install @mededprep/bug-widget
```

```js
import { initBugWidget } from '@mededprep/bug-widget';

const widget = initBugWidget({
  project: 'my-app',
  apiUrl: 'https://api.example.com/bugs',
  position: 'bottom-right',
  captureSession: true,
  maxSessionEvents: 50,
  autoReportErrors: true,
  autoReportDebounceMs: 30000,
  zIndex: 99999,
  exclude: ['*/admin*', '*/login*'],
  sanitizeHeaders: ['x-custom-token'],
});

// Later, to remove the widget:
widget.destroy();
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `project` | `string` | (required) | Project identifier included in reports |
| `apiUrl` | `string` | (required) | Endpoint that receives POST requests with bug reports |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Initial floating button position |
| `captureSession` | `boolean` | `true` | Enable click/navigation/scroll tracking |
| `maxSessionEvents` | `number` | `50` | Max events in circular buffer |
| `autoReportErrors` | `boolean` | `true` | Auto-fire a full report on 4xx/5xx API responses |
| `autoReportDebounceMs` | `number` | `30000` | Minimum time between auto-reports (prevents spam during outages) |
| `zIndex` | `number` | `99999` | z-index of the widget button |
| `exclude` | `string[]` | `[]` | URL patterns where the widget should NOT appear (glob-like: `*` matches any chars) |
| `sanitizeHeaders` | `string[]` | `[]` | Additional headers to strip from error context (Authorization, Cookie, and common token headers are always stripped) |

## Report Schema

Reports are POSTed as JSON to your `apiUrl`:

```json
{
  "project": "my-app",
  "url": "https://app.example.com/dashboard",
  "trigger": "user-click",
  "description": "User's description of the bug",
  "screenshot": "data:image/png;base64,...",
  "consoleErrors": [
    { "message": "TypeError: x is not a function", "timestamp": 1700000000000, "stack": "..." }
  ],
  "networkErrors": [
    { "url": "/api/data", "method": "GET", "status": 500, "statusText": "Internal Server Error", "timestamp": 1700000000000, "responseBody": "{\"error\":\"...\"}", "requestHeaders": {"content-type": "application/json"} }
  ],
  "sessionEvents": [
    { "type": "click", "timestamp": 1700000000000, "data": { "selector": "button.submit", "text": "Save" } },
    { "type": "navigation", "timestamp": 1700000000000, "data": { "url": "/dashboard", "action": "navigate" } }
  ],
  "environment": {
    "url": "https://app.example.com/dashboard",
    "viewport": { "width": 1920, "height": 1080 },
    "userAgent": "Mozilla/5.0...",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "language": "en-US",
    "platform": "MacIntel",
    "colorScheme": "dark",
    "connection": "4g"
  },
  "timeOnPage": 45000,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Auto-report schema (trigger: 'auto-api-error')

When auto-fired, the report includes an additional `apiErrorContext` field:

```json
{
  "trigger": "auto-api-error",
  "description": "Auto-reported: GET /api/users returned 500 Internal Server Error",
  "apiErrorContext": {
    "url": "https://app.example.com/api/users",
    "method": "GET",
    "status": 500,
    "statusText": "Internal Server Error",
    "responseBody": "{\"error\":\"database connection failed\"}",
    "requestHeaders": {
      "content-type": "application/json",
      "authorization": "[REDACTED]"
    }
  }
}
```

## Deployment Notes

Reports with screenshots are typically **500KB–1MB** due to base64-encoded PNGs. Ensure your receiving endpoint accepts payloads of at least 2MB:

- **Express:** `express.json({ limit: '2mb' })` — and mount the bug-reports route **before** any global JSON parser with a smaller limit, or the global parser will reject the body first.
- **nginx:** `client_max_body_size 2m;`
- **Cloudflare Workers:** 100MB default (no change needed).

## Behavior Details

### Auto-reporting
- Fires on any fetch/XHR response with status >= 400
- Debounced: max 1 auto-report per 30 seconds (configurable)
- Captures full screenshot and session trail, same as manual reports
- Sensitive headers (Authorization, Cookie, x-auth-token, x-api-key, x-csrf-token) are automatically redacted

### Draggable icon
- Click and drag (mouse or touch) to reposition
- Snaps to left/right edge on release
- Position persists in localStorage across sessions
- Distinguished from click by 5px movement threshold

### Minimize behavior
- Icon fades in with animation after 2 seconds (avoids layout shift)
- After 10 seconds of no interaction, minimizes to a subtle 12px dot
- Expands on hover or tap

### Mobile (< 480px viewport)
- Icon is 36px (vs 48px on desktop), with 44px minimum touch target
- Modal becomes full-screen
- Touch drag supported
- All interactive elements meet 44px minimum tap target

### URL exclusions
- Use glob patterns: `*` matches any characters
- Example: `['*/admin*', 'https://staging.*']`
- Widget returns a no-op instance when excluded

## How It Works

1. Widget loads and installs lightweight interceptors for `console.error`, `fetch`, and `XMLHttpRequest`
2. Session tracker records page navigations, clicks (selector + visible text only), and scroll depth
3. When the user clicks the bug icon, a modal opens for a text description
4. On submit, the widget captures a screenshot, assembles all buffered context, and POSTs the report
5. If the API is unreachable, the report is saved to localStorage and retried on the next successful submission
6. When auto-report is enabled, API errors (4xx/5xx) trigger an automatic full report with debouncing

## Building

```bash
npm install
npm run build
```

Outputs:
- `dist/bug-widget.js` (UMD, ~12KB gzipped)
- `dist/bug-widget.es.js` (ESM, ~13KB gzipped)

## Future: Auto-Fix Pipeline

This widget is designed to feed into an automated bug-fix workflow:

1. Reports POST to a lightweight API that creates GitHub Issues
2. Claude Code picks up the issue, analyzes the report context, and proposes a fix
3. Fix is submitted as a PR for review

The widget itself requires no changes to support this pipeline — only the receiving API endpoint needs to be configured.
