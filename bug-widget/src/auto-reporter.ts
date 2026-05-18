import {
  captureScreenshot,
  captureConsoleErrors,
  captureNetworkErrors,
  captureEnvironment,
  onApiError,
  type ApiErrorDetail,
} from './capture';
import type { SessionTracker } from './session';
import { submitReport, type BugReport } from './reporter';

export interface AutoReporterOptions {
  debounceMs: number;
  sanitizeHeaders: string[];
}

export class AutoReporter {
  private project: string;
  private apiUrl: string;
  private sessionTracker: SessionTracker | null;
  private options: AutoReporterOptions;
  private lastReportTime = 0;
  private unsubscribe: (() => void) | null = null;

  constructor(
    project: string,
    apiUrl: string,
    sessionTracker: SessionTracker | null,
    options: AutoReporterOptions
  ) {
    this.project = project;
    this.apiUrl = apiUrl;
    this.sessionTracker = sessionTracker;
    this.options = options;
  }

  start(): void {
    this.unsubscribe = onApiError((detail) => {
      this.handleApiError(detail);
    });
  }

  stop(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  private async handleApiError(detail: ApiErrorDetail): Promise<void> {
    const now = Date.now();
    if (now - this.lastReportTime < this.options.debounceMs) {
      return; // Debounced
    }
    this.lastReportTime = now;

    try {
      const screenshot = await captureScreenshot();
      const sanitizedHeaders = this.sanitize(detail.requestHeaders);

      const report: BugReport = {
        project: this.project,
        url: window.location.href,
        trigger: 'auto-api-error',
        description: `Auto-reported: ${detail.method} ${detail.url} returned ${detail.status} ${detail.statusText}`,
        screenshot,
        consoleErrors: captureConsoleErrors(),
        networkErrors: captureNetworkErrors(),
        sessionEvents: this.sessionTracker ? this.sessionTracker.getEvents() : [],
        environment: captureEnvironment(),
        timeOnPage: this.sessionTracker ? this.sessionTracker.getTimeOnPage() : 0,
        timestamp: new Date().toISOString(),
        apiErrorContext: {
          url: detail.url,
          method: detail.method,
          status: detail.status,
          statusText: detail.statusText,
          responseBody: detail.responseBody,
          requestHeaders: sanitizedHeaders,
        },
      };

      await submitReport(this.apiUrl, report);
    } catch (err) {
      // Silent fail for auto-reports — don't disrupt the user
      console.warn('[BugWidget] Auto-report failed:', err);
    }
  }

  private sanitize(headers: Record<string, string>): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
      if (this.options.sanitizeHeaders.includes(key.toLowerCase())) {
        result[key] = '[REDACTED]';
      } else {
        result[key] = value;
      }
    }
    return result;
  }
}
