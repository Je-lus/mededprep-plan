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
    /** Extra distance in px between the launcher and a viewport edge, on top of
     *  the default margin and safe-area insets. Use `offset.bottom` to lift the
     *  launcher above a fixed bottom tab bar. Participates in the default CSS
     *  position, the drag-snap clamp, the saved-position re-clamp at boot, and
     *  the resize/orientation re-clamp. */
    offset?: {
        bottom?: number;
    };
    /** URL patterns where the widget should NOT appear */
    exclude?: string[];
    /** Headers to strip from error context (in addition to defaults) */
    sanitizeHeaders?: string[];
    /** Headless mode — capture + auto-report without the visible button/modal */
    headless?: boolean;
    /** App-supplied filter for auto-reports — return false to suppress
     *  (e.g. expected 401s on /me, known 410s). Runs after the widget's own
     *  self-endpoint exclusion. */
    shouldAutoReport?: (error: {
        url: string;
        status: number;
        method?: string;
    }) => boolean;
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
export declare function initBugWidget(config: BugWidgetConfig): BugWidgetInstance;
