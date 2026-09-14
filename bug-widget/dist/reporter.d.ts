import { ConsoleError, NetworkError, Environment } from './capture';
import { SessionEvent, SessionTracker } from './session';
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
    userIdentity?: Record<string, unknown>;
}
declare global {
    interface Window {
        /** Optional identity blob the host app maintains (see mededprep-ce's
         *  syncBugWidgetIdentity) — attached to every report when present. */
        __bw_user_identity?: Record<string, unknown>;
    }
}
export declare function captureUserIdentity(): Partial<Pick<BugReport, 'userIdentity'>>;
export declare function assembleReport(project: string, description: string, sessionTracker: SessionTracker | null): Promise<BugReport>;
export declare function submitReport(apiUrl: string, report: BugReport): Promise<boolean>;
export declare function startPeriodicRetry(apiUrl: string, intervalMs?: number): () => void;
