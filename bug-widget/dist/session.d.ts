export interface SessionEvent {
    type: 'navigation' | 'click' | 'scroll' | 'visibility';
    timestamp: number;
    data: Record<string, string | number>;
}
export declare class SessionTracker {
    private events;
    private maxEvents;
    private startTime;
    private lastUrl;
    private scrollTimeout;
    private maxScrollDepth;
    private active;
    constructor(maxEvents?: number);
    start(): void;
    stop(): void;
    getEvents(): SessionEvent[];
    getTimeOnPage(): number;
    private addEvent;
    private handleClick;
    private handleScroll;
    private handleNavigation;
    private handleVisibility;
    private patchHistory;
    private buildSelector;
    private getSafeText;
}
