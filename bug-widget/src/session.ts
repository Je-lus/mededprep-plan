export interface SessionEvent {
  type: 'navigation' | 'click' | 'scroll' | 'visibility';
  timestamp: number;
  data: Record<string, string | number>;
}

export class SessionTracker {
  private events: SessionEvent[] = [];
  private maxEvents: number;
  private startTime: number;
  private lastUrl: string;
  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  private maxScrollDepth = 0;
  private active = false;

  constructor(maxEvents = 50) {
    this.maxEvents = maxEvents;
    this.startTime = Date.now();
    this.lastUrl = window.location.href;
  }

  start(): void {
    if (this.active) return;
    this.active = true;

    this.addEvent({
      type: 'navigation',
      timestamp: Date.now(),
      data: { url: window.location.href, action: 'pageload' },
    });

    document.addEventListener('click', this.handleClick, { capture: true, passive: true });
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('popstate', this.handleNavigation);
    document.addEventListener('visibilitychange', this.handleVisibility);

    // Patch pushState/replaceState to detect SPA navigations
    this.patchHistory('pushState');
    this.patchHistory('replaceState');
  }

  stop(): void {
    if (!this.active) return;
    this.active = false;

    document.removeEventListener('click', this.handleClick, { capture: true } as EventListenerOptions);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('popstate', this.handleNavigation);
    document.removeEventListener('visibilitychange', this.handleVisibility);
  }

  getEvents(): SessionEvent[] {
    return [...this.events];
  }

  getTimeOnPage(): number {
    return Date.now() - this.startTime;
  }

  private addEvent(event: SessionEvent): void {
    this.events.push(event);
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }
  }

  private handleClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (!target) return;

    // Build a selector without capturing PII
    const selector = this.buildSelector(target);
    const text = this.getSafeText(target);

    this.addEvent({
      type: 'click',
      timestamp: Date.now(),
      data: { selector, text },
    });
  };

  private handleScroll = (): void => {
    if (this.scrollTimeout) return;

    this.scrollTimeout = setTimeout(() => {
      this.scrollTimeout = null;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      if (depth > this.maxScrollDepth) {
        this.maxScrollDepth = depth;
        this.addEvent({
          type: 'scroll',
          timestamp: Date.now(),
          data: { depth, maxDepth: this.maxScrollDepth },
        });
      }
    }, 500);
  };

  private handleNavigation = (): void => {
    const newUrl = window.location.href;
    if (newUrl !== this.lastUrl) {
      this.lastUrl = newUrl;
      this.maxScrollDepth = 0;
      this.addEvent({
        type: 'navigation',
        timestamp: Date.now(),
        data: { url: newUrl, action: 'navigate' },
      });
    }
  };

  private handleVisibility = (): void => {
    this.addEvent({
      type: 'visibility',
      timestamp: Date.now(),
      data: { state: document.visibilityState },
    });
  };

  private patchHistory(method: 'pushState' | 'replaceState'): void {
    const original = history[method].bind(history);
    history[method] = (...args: Parameters<typeof history.pushState>) => {
      original(...args);
      this.handleNavigation();
    };
  }

  private buildSelector(el: HTMLElement): string {
    const parts: string[] = [];
    let current: HTMLElement | null = el;
    let depth = 0;

    while (current && depth < 3) {
      let part = current.tagName.toLowerCase();
      if (current.id) {
        part += `#${current.id}`;
        parts.unshift(part);
        break;
      }
      if (current.className && typeof current.className === 'string') {
        const classes = current.className
          .split(/\s+/)
          .filter((c) => c && !c.startsWith('bw__'))
          .slice(0, 2)
          .join('.');
        if (classes) part += `.${classes}`;
      }
      parts.unshift(part);
      current = current.parentElement;
      depth++;
    }

    return parts.join(' > ');
  }

  private getSafeText(el: HTMLElement): string {
    // Only capture visible text from buttons, links, labels — no inputs
    const tag = el.tagName.toLowerCase();
    if (['input', 'textarea', 'select'].includes(tag)) {
      return `[${tag}]`;
    }
    const text = (el.textContent || '').trim();
    return text.length > 50 ? text.slice(0, 50) + '...' : text;
  }
}
