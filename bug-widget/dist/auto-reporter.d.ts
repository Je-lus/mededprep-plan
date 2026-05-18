import { SessionTracker } from './session';
export interface AutoReporterOptions {
    debounceMs: number;
    sanitizeHeaders: string[];
}
export declare class AutoReporter {
    private project;
    private apiUrl;
    private sessionTracker;
    private options;
    private lastReportTime;
    private unsubscribe;
    constructor(project: string, apiUrl: string, sessionTracker: SessionTracker | null, options: AutoReporterOptions);
    start(): void;
    stop(): void;
    private handleApiError;
    private sanitize;
}
