export interface ConsoleError {
    message: string;
    timestamp: number;
    stack?: string;
}
export interface NetworkError {
    url: string;
    method: string;
    status: number;
    statusText: string;
    timestamp: number;
    responseBody?: string;
    requestHeaders?: Record<string, string>;
}
export interface Environment {
    url: string;
    viewport: {
        width: number;
        height: number;
    };
    userAgent: string;
    timestamp: string;
    language: string;
    platform: string;
    colorScheme: string;
    connection?: string;
}
export interface ApiErrorDetail {
    url: string;
    method: string;
    status: number;
    statusText: string;
    responseBody: string;
    requestHeaders: Record<string, string>;
    timestamp: number;
}
export type ApiErrorCallback = (detail: ApiErrorDetail) => void;
export declare function onApiError(callback: ApiErrorCallback): () => void;
export declare function installInterceptors(): void;
export declare function captureScreenshot(): Promise<string | null>;
export declare function captureConsoleErrors(): ConsoleError[];
export declare function captureNetworkErrors(): NetworkError[];
export declare function captureEnvironment(): Environment;
