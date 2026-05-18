import { toPng } from 'html-to-image';

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
  viewport: { width: number; height: number };
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

const consoleErrors: ConsoleError[] = [];
const networkErrors: NetworkError[] = [];
const MAX_BUFFER = 50;

let interceptsInstalled = false;
const apiErrorCallbacks: ApiErrorCallback[] = [];

export function onApiError(callback: ApiErrorCallback): () => void {
  apiErrorCallbacks.push(callback);
  return () => {
    const idx = apiErrorCallbacks.indexOf(callback);
    if (idx >= 0) apiErrorCallbacks.splice(idx, 1);
  };
}

function notifyApiError(detail: ApiErrorDetail): void {
  for (const cb of apiErrorCallbacks) {
    try {
      cb(detail);
    } catch {
      // Don't let callback errors break the interceptor
    }
  }
}

function sanitizeHeadersForCapture(
  headers: Headers | Record<string, string> | [string, string][] | undefined
): Record<string, string> {
  const result: Record<string, string> = {};
  if (!headers) return result;

  const iterate = (key: string, value: string) => {
    result[key.toLowerCase()] = value;
  };

  if (headers instanceof Headers) {
    headers.forEach((value, key) => iterate(key, value));
  } else if (Array.isArray(headers)) {
    for (const [key, value] of headers) {
      iterate(key, value);
    }
  } else {
    for (const [key, value] of Object.entries(headers)) {
      iterate(key, value);
    }
  }

  return result;
}

export function installInterceptors(): void {
  if (interceptsInstalled) return;
  interceptsInstalled = true;

  // Intercept console.error
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const message = args
      .map((a) => {
        if (a instanceof Error) return a.message;
        if (typeof a === 'string') return a;
        try { return JSON.stringify(a); } catch { return String(a); }
      })
      .join(' ');

    const entry: ConsoleError = {
      message,
      timestamp: Date.now(),
    };

    if (args[0] instanceof Error) {
      entry.stack = (args[0] as Error).stack;
    }

    consoleErrors.push(entry);
    if (consoleErrors.length > MAX_BUFFER) consoleErrors.shift();

    originalError.apply(console, args);
  };

  // Intercept window errors
  window.addEventListener('error', (event) => {
    consoleErrors.push({
      message: event.message || 'Unknown error',
      timestamp: Date.now(),
      stack: event.error?.stack,
    });
    if (consoleErrors.length > MAX_BUFFER) consoleErrors.shift();
  });

  // Intercept unhandled rejections
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason instanceof Error
      ? event.reason.message
      : String(event.reason);
    consoleErrors.push({
      message: `Unhandled Promise: ${message}`,
      timestamp: Date.now(),
      stack: event.reason?.stack,
    });
    if (consoleErrors.length > MAX_BUFFER) consoleErrors.shift();
  });

  // Intercept fetch
  const originalFetch = window.fetch;
  window.fetch = async (...args: Parameters<typeof fetch>) => {
    const request = new Request(...args);
    const method = request.method;
    const url = request.url;
    const requestHeaders = sanitizeHeadersForCapture(
      args[0] instanceof Request
        ? (args[0] as Request).headers
        : (args[1] as RequestInit | undefined)?.headers as HeadersInit | undefined
    );

    try {
      const response = await originalFetch(...args);
      if (!response.ok) {
        let responseBody = '';
        try {
          const cloned = response.clone();
          const text = await cloned.text();
          responseBody = text.slice(0, 500);
        } catch {
          responseBody = '[Could not read response body]';
        }

        const errorDetail: ApiErrorDetail = {
          url,
          method,
          status: response.status,
          statusText: response.statusText,
          responseBody,
          requestHeaders,
          timestamp: Date.now(),
        };

        networkErrors.push({
          url,
          method,
          status: response.status,
          statusText: response.statusText,
          timestamp: Date.now(),
          responseBody,
          requestHeaders,
        });
        if (networkErrors.length > MAX_BUFFER) networkErrors.shift();

        // Notify auto-reporter for 4xx/5xx
        if (response.status >= 400) {
          notifyApiError(errorDetail);
        }
      }
      return response;
    } catch (err) {
      networkErrors.push({
        url,
        method,
        status: 0,
        statusText: err instanceof Error ? err.message : 'Network Error',
        timestamp: Date.now(),
      });
      if (networkErrors.length > MAX_BUFFER) networkErrors.shift();
      throw err;
    }
  };

  // Intercept XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;
  const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

  XMLHttpRequest.prototype.open = function (
    method: string,
    url: string | URL,
    ...rest: unknown[]
  ) {
    const self = this as XMLHttpRequest & {
      _bw_method: string;
      _bw_url: string;
      _bw_headers: Record<string, string>;
    };
    self._bw_method = method;
    self._bw_url = String(url);
    self._bw_headers = {};
    return (originalOpen as Function).call(this, method, url, ...rest);
  };

  XMLHttpRequest.prototype.setRequestHeader = function (name: string, value: string) {
    const self = this as XMLHttpRequest & { _bw_headers: Record<string, string> };
    if (self._bw_headers) {
      self._bw_headers[name.toLowerCase()] = value;
    }
    return originalSetRequestHeader.call(this, name, value);
  };

  XMLHttpRequest.prototype.send = function (...args: unknown[]) {
    this.addEventListener('loadend', () => {
      if (this.status >= 400 || this.status === 0) {
        const meta = this as XMLHttpRequest & {
          _bw_method: string;
          _bw_url: string;
          _bw_headers: Record<string, string>;
        };

        let responseBody = '';
        try {
          responseBody = (this.responseText || '').slice(0, 500);
        } catch {
          responseBody = '[Could not read response body]';
        }

        const errorEntry: NetworkError = {
          url: meta._bw_url || '',
          method: meta._bw_method || 'GET',
          status: this.status,
          statusText: this.statusText || 'Error',
          timestamp: Date.now(),
          responseBody,
          requestHeaders: meta._bw_headers || {},
        };

        networkErrors.push(errorEntry);
        if (networkErrors.length > MAX_BUFFER) networkErrors.shift();

        // Notify auto-reporter for 4xx/5xx
        if (this.status >= 400) {
          notifyApiError({
            url: meta._bw_url || '',
            method: meta._bw_method || 'GET',
            status: this.status,
            statusText: this.statusText || 'Error',
            responseBody,
            requestHeaders: meta._bw_headers || {},
            timestamp: Date.now(),
          });
        }
      }
    });
    return (originalSend as Function).apply(this, args);
  };
}

export async function captureScreenshot(): Promise<string | null> {
  try {
    const dataUrl = await toPng(document.body, {
      quality: 0.7,
      pixelRatio: 1,
      filter: (node) => {
        // Exclude the bug widget itself from the screenshot
        if (node instanceof HTMLElement) {
          return !node.className?.toString().includes('bw__');
        }
        return true;
      },
    });
    return dataUrl;
  } catch (err) {
    console.warn('[BugWidget] Screenshot capture failed:', err);
    return null;
  }
}

export function captureConsoleErrors(): ConsoleError[] {
  return [...consoleErrors];
}

export function captureNetworkErrors(): NetworkError[] {
  return [...networkErrors];
}

export function captureEnvironment(): Environment {
  const env: Environment = {
    url: window.location.href,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    language: navigator.language,
    platform: navigator.platform || 'unknown',
    colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  };

  const nav = navigator as Navigator & { connection?: { effectiveType?: string } };
  if (nav.connection?.effectiveType) {
    env.connection = nav.connection.effectiveType;
  }

  return env;
}
