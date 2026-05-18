import { injectStyles } from './styles';
import { installInterceptors } from './capture';
import { SessionTracker } from './session';
import { createWidget } from './widget';
import { AutoReporter } from './auto-reporter';
import { startPeriodicRetry } from './reporter';

export interface BugWidgetConfig {
  /** Project identifier (e.g., 'mededprep-portal') */
  project: string;
  /** API endpoint to receive bug reports */
  apiUrl: string;
  /** Position of the floating button */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Enable session tracking (clicks, navigations, scroll) */
  captureSession?: boolean;
  /** Maximum session events to retain in circular buffer */
  maxSessionEvents?: number;
  /** Automatically report on 4xx/5xx API errors */
  autoReportErrors?: boolean;
  /** Debounce interval for auto-reports (ms) */
  autoReportDebounceMs?: number;
  /** z-index for the widget (default: 99999) */
  zIndex?: number;
  /** URL patterns where the widget should NOT appear */
  exclude?: string[];
  /** Headers to strip from error context (in addition to defaults) */
  sanitizeHeaders?: string[];
}

export interface BugWidgetInstance {
  destroy: () => void;
}

/**
 * Initialize the bug reporting widget.
 *
 * @example
 * ```js
 * import { initBugWidget } from '@mededprep/bug-widget';
 *
 * initBugWidget({
 *   project: 'my-app',
 *   apiUrl: 'https://api.example.com/bugs',
 *   position: 'bottom-right',
 *   captureSession: true,
 *   autoReportErrors: true,
 * });
 * ```
 */
export function initBugWidget(config: BugWidgetConfig): BugWidgetInstance {
  const {
    project,
    apiUrl,
    position = 'bottom-right',
    captureSession = true,
    maxSessionEvents = 50,
    autoReportErrors = true,
    autoReportDebounceMs = 30000,
    zIndex = 99999,
    exclude = [],
    sanitizeHeaders = [],
  } = config;

  if (!project || !apiUrl) {
    throw new Error('[BugWidget] "project" and "apiUrl" are required config options.');
  }

  // Check exclusion patterns
  const currentUrl = window.location.href;
  for (const pattern of exclude) {
    if (matchUrlPattern(pattern, currentUrl)) {
      return { destroy() {} };
    }
  }

  // Inject scoped styles
  injectStyles(position, zIndex);

  // Install error/network interceptors
  installInterceptors();

  // Start session tracking if enabled
  let sessionTracker: SessionTracker | null = null;
  if (captureSession) {
    sessionTracker = new SessionTracker(maxSessionEvents);
    sessionTracker.start();
  }

  // Create the UI
  const widgetCleanup = createWidget(project, apiUrl, sessionTracker, position, zIndex);

  // Set up auto-reporting
  let autoReporter: AutoReporter | null = null;
  if (autoReportErrors) {
    autoReporter = new AutoReporter(project, apiUrl, sessionTracker, {
      debounceMs: autoReportDebounceMs,
      sanitizeHeaders: [
        'authorization',
        'cookie',
        'x-auth-token',
        'x-api-key',
        'x-csrf-token',
        ...sanitizeHeaders.map((h) => h.toLowerCase()),
      ],
    });
    autoReporter.start();
  }

  // Periodically retry any queued reports sitting in localStorage
  const stopPeriodicRetry = startPeriodicRetry(apiUrl);

  return {
    destroy() {
      stopPeriodicRetry();
      if (sessionTracker) {
        sessionTracker.stop();
      }
      if (autoReporter) {
        autoReporter.stop();
      }
      if (widgetCleanup) {
        widgetCleanup();
      }
      // Remove widget DOM elements
      const btn = document.querySelector('.bw__btn');
      const overlay = document.querySelector('.bw__overlay');
      const styles = document.getElementById('bw__styles');
      btn?.remove();
      overlay?.remove();
      styles?.remove();
    },
  };
}

function matchUrlPattern(pattern: string, url: string): boolean {
  // Support glob-like patterns: * matches any chars, ? matches single char
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.');
  try {
    return new RegExp(`^${escaped}$`).test(url);
  } catch {
    return url.includes(pattern);
  }
}

// Auto-init from script tag data attributes
if (typeof document !== 'undefined') {
  const script = document.currentScript as HTMLScriptElement | null;
  if (script?.dataset.project && script?.dataset.apiUrl) {
    document.addEventListener('DOMContentLoaded', () => {
      initBugWidget({
        project: script.dataset.project!,
        apiUrl: script.dataset.apiUrl!,
        position: (script.dataset.position as BugWidgetConfig['position']) || 'bottom-right',
        captureSession: script.dataset.captureSession !== 'false',
        autoReportErrors: script.dataset.autoReportErrors !== 'false',
      });
    });
  }
}
