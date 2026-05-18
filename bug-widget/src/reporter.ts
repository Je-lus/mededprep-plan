import {
  captureScreenshot,
  captureConsoleErrors,
  captureNetworkErrors,
  captureEnvironment,
  type ConsoleError,
  type NetworkError,
  type Environment,
} from './capture';
import type { SessionEvent } from './session';
import type { SessionTracker } from './session';

export interface ApiErrorContext {
  url: string;
  method: string;
  status: number;
  statusText: string;
  responseBody: string;
  requestHeaders: Record<string, string>;
}

export interface BugReport {
  project: string;
  url: string;
  trigger: 'user-click' | 'auto-api-error';
  description: string;
  screenshot: string | null;
  consoleErrors: ConsoleError[];
  networkErrors: NetworkError[];
  sessionEvents: SessionEvent[];
  environment: Environment;
  timeOnPage: number;
  timestamp: string;
  apiErrorContext?: ApiErrorContext;
}

const STORAGE_KEY = 'bw__pending_reports';

export async function assembleReport(
  project: string,
  description: string,
  sessionTracker: SessionTracker | null
): Promise<BugReport> {
  const screenshot = await captureScreenshot();

  return {
    project,
    url: window.location.href,
    trigger: 'user-click',
    description,
    screenshot,
    consoleErrors: captureConsoleErrors(),
    networkErrors: captureNetworkErrors(),
    sessionEvents: sessionTracker ? sessionTracker.getEvents() : [],
    environment: captureEnvironment(),
    timeOnPage: sessionTracker ? sessionTracker.getTimeOnPage() : 0,
    timestamp: new Date().toISOString(),
  };
}

export async function submitReport(apiUrl: string, report: BugReport): Promise<boolean> {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    // On success, try to send any queued reports
    retrySavedReports(apiUrl);
    return true;
  } catch (err) {
    console.warn('[BugWidget] Report submission failed, saving to localStorage:', err);
    saveReportToStorage(report);
    return false;
  }
}

function saveReportToStorage(report: BugReport): void {
  try {
    const existing = getSavedReports();
    existing.push(report);
    // Keep max 10 pending reports to avoid filling localStorage
    const trimmed = existing.slice(-10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // localStorage might be full or unavailable — silently fail
  }
}

function getSavedReports(): BugReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BugReport[];
  } catch {
    return [];
  }
}

export function startPeriodicRetry(
  apiUrl: string,
  intervalMs: number = 300_000
): () => void {
  const id = setInterval(() => {
    // Only attempt network calls if there are actually pending reports
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && raw !== '[]') {
      retrySavedReports(apiUrl);
    }
  }, intervalMs);

  return () => clearInterval(id);
}

async function retrySavedReports(apiUrl: string): Promise<void> {
  const reports = getSavedReports();
  if (reports.length === 0) return;

  const remaining: BugReport[] = [];

  for (const report of reports) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });
      if (!response.ok) {
        remaining.push(report);
      }
    } catch {
      remaining.push(report);
    }
  }

  if (remaining.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}
