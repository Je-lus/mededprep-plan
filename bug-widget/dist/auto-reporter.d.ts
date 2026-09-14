import { SessionTracker } from './session';
export interface AutoReporterOptions {
    debounceMs: number;
    sanitizeHeaders: string[];
    /** App-supplied filter — return false to suppress an auto-report */
    shouldAutoReport?: (error: {
        url: string;
        status: number;
        method?: string;
    }) => boolean;
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
    private isOwnEndpoint;
    private sanitize;
}
