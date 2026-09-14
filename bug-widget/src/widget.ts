import { CLASS } from './styles';
import { assembleReport, submitReport } from './reporter';
import type { SessionTracker } from './session';

const BUG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/></svg>`;

const POSITION_STORAGE_KEY = 'bw__position';
const MINIMIZE_DELAY = 10000; // 10 seconds of inactivity before minimizing

interface StoredPosition {
  x: number;
  y: number;
}

export function createWidget(
  project: string,
  apiUrl: string,
  sessionTracker: SessionTracker | null,
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
  zIndex: number,
  bottomOffset: number = 0
): () => void {
  // Create floating button
  const button = document.createElement('button');
  button.className = CLASS.button;
  button.innerHTML = BUG_SVG;
  button.setAttribute('aria-label', 'Report a bug');
  button.setAttribute('title', 'Report a bug');

  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.className = CLASS.overlay;
  overlay.innerHTML = `
    <div class="${CLASS.content}" role="dialog" aria-modal="true" aria-labelledby="bw__dialog-title">
      <div class="${CLASS.header}">
        <h3 id="bw__dialog-title">Report a Bug</h3>
        <button class="${CLASS.close}" aria-label="Close">&times;</button>
      </div>
      <textarea class="${CLASS.textarea}" placeholder="What went wrong? Describe what you were doing and what happened..."></textarea>
      <button class="${CLASS.submit}">Submit Report</button>
      <div class="${CLASS.status}"></div>
    </div>
  `;

  document.body.appendChild(button);
  document.body.appendChild(overlay);

  const content = overlay.querySelector(`.${CLASS.content}`) as HTMLDivElement;
  const textarea = overlay.querySelector(`.${CLASS.textarea}`) as HTMLTextAreaElement;
  const submitBtn = overlay.querySelector(`.${CLASS.submit}`) as HTMLButtonElement;
  const closeBtn = overlay.querySelector(`.${CLASS.close}`) as HTMLButtonElement;
  const statusDiv = overlay.querySelector(`.${CLASS.status}`) as HTMLDivElement;

  // --- Minimize behavior ---
  let minimizeTimer: ReturnType<typeof setTimeout> | null = null;

  function resetMinimizeTimer(): void {
    if (minimizeTimer) clearTimeout(minimizeTimer);
    button.classList.remove(CLASS.buttonMinimized);
    minimizeTimer = setTimeout(() => {
      if (!overlay.classList.contains('active')) {
        button.classList.add(CLASS.buttonMinimized);
      }
    }, MINIMIZE_DELAY);
  }

  // Start the minimize timer after the entrance animation completes
  setTimeout(resetMinimizeTimer, 2400);

  // Reset on hover. Touch interaction is handled inside onDragStart so the
  // minimized state can be read before it is cleared.
  button.addEventListener('mouseenter', resetMinimizeTimer);

  // --- Draggable behavior ---
  let isDragging = false;
  let dragStarted = false;
  let dragThreshold = 5;
  let suppressClickOpen = false;
  let lastTouchTime = 0;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let buttonRect: DOMRect;

  // Restore saved position, re-clamped so it is on-screen and clear of the
  // configured bottom offset even if the viewport changed since it was saved
  const savedPos = loadPosition();
  if (savedPos) {
    const clamped = clampToViewport(savedPos.x, savedPos.y);
    applyPosition(clamped.x, clamped.y);
  }

  function getPointerPos(e: MouseEvent | TouchEvent): { x: number; y: number } {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function onDragStart(e: MouseEvent | TouchEvent): void {
    if (overlay.classList.contains('active')) return;

    const isTouch = 'touches' in e;
    if (isTouch) {
      lastTouchTime = Date.now();
    } else if (Date.now() - lastTouchTime < 800) {
      // Compatibility mouse events fired right after a touch (mousedown after
      // touchend) must not restart the gesture or clear the tap state.
      return;
    }
    const wasMinimized = button.classList.contains(CLASS.buttonMinimized);

    // Un-minimize when user interacts
    resetMinimizeTimer();

    buttonRect = button.getBoundingClientRect();
    const pos = getPointerPos(e);
    startX = pos.x;
    startY = pos.y;
    currentX = buttonRect.left;
    currentY = buttonRect.top;
    isDragging = true;
    dragStarted = false;

    // Touch jitter routinely exceeds 5px; require more deliberate movement
    // before a touch gesture is treated as a drag.
    dragThreshold = isTouch ? 12 : 5;

    // A tap on the minimized dot should only expand the button (and restart
    // the idle timer). The next tap, on the expanded button, opens the form.
    suppressClickOpen = isTouch && wasMinimized;

    // Only prevent default for mouse (text selection, native drag). Calling
    // preventDefault on touchstart would suppress the synthetic click that
    // opens the form; scrolling during a drag is already blocked by the
    // button's touch-action: none.
    if (!isTouch) {
      e.preventDefault();
    }
  }

  function onDragMove(e: MouseEvent | TouchEvent): void {
    if (!isDragging) return;

    const pos = getPointerPos(e);
    const dx = pos.x - startX;
    const dy = pos.y - startY;

    // Only start dragging past the movement threshold (distinguish from click/tap)
    if (!dragStarted && Math.abs(dx) < dragThreshold && Math.abs(dy) < dragThreshold) return;

    dragStarted = true;
    button.classList.add(CLASS.buttonDragging);

    const newX = currentX + dx;
    const newY = currentY + dy;

    // Constrain to viewport (keep clear of the configured bottom offset)
    const maxX = window.innerWidth - buttonRect.width;
    const maxY = window.innerHeight - buttonRect.height - bottomOffset;
    const clampedX = Math.max(0, Math.min(newX, maxX));
    const clampedY = Math.max(0, Math.min(newY, maxY));

    button.style.left = `${clampedX}px`;
    button.style.top = `${clampedY}px`;
    button.style.right = 'auto';
    button.style.bottom = 'auto';
  }

  function onDragEnd(e: MouseEvent | TouchEvent): void {
    if (!isDragging) return;
    isDragging = false;
    button.classList.remove(CLASS.buttonDragging);

    if (!dragStarted) {
      // It was a click, not a drag
      return;
    }

    // Snap to nearest edge (vertical clamp respects the bottom offset)
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;

    let finalX: number;
    let finalY = Math.max(8, Math.min(rect.top, viewH - rect.height - 8 - bottomOffset));

    // Snap to left or right edge
    if (centerX < viewW / 2) {
      finalX = 16; // snap left
    } else {
      finalX = viewW - rect.width - 16; // snap right
    }

    applyPosition(finalX, finalY);
    savePosition(finalX, finalY);

    // Prevent the click event that follows touchend/mouseup
    e.preventDefault();
  }

  function applyPosition(x: number, y: number): void {
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.right = 'auto';
    button.style.bottom = 'auto';
  }

  function clampToViewport(x: number, y: number): { x: number; y: number } {
    const rect = button.getBoundingClientRect();
    const w = rect.width || 48;
    const h = rect.height || 48;
    const maxX = window.innerWidth - w - 8;
    const maxY = window.innerHeight - h - 8 - bottomOffset;
    return {
      x: Math.max(8, Math.min(x, maxX)),
      y: Math.max(8, Math.min(y, maxY)),
    };
  }

  // Keep a dragged/saved inline position on-screen through viewport resizes
  // and orientation changes (same clamp as the boot-time restore). The
  // default CSS position needs no help; it is anchored to the viewport edge.
  function onViewportChange(): void {
    if (!button.style.left && !button.style.top) return;
    const rect = button.getBoundingClientRect();
    const clamped = clampToViewport(rect.left, rect.top);
    if (clamped.x !== rect.left || clamped.y !== rect.top) {
      applyPosition(clamped.x, clamped.y);
    }
  }

  function savePosition(x: number, y: number): void {
    try {
      localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify({ x, y }));
    } catch {
      // Silent fail
    }
  }

  function loadPosition(): StoredPosition | null {
    try {
      const raw = localStorage.getItem(POSITION_STORAGE_KEY);
      if (!raw) return null;
      const pos = JSON.parse(raw) as StoredPosition;
      // Validate the position is still within viewport
      if (
        pos.x >= 0 &&
        pos.x < window.innerWidth - 20 &&
        pos.y >= 0 &&
        pos.y < window.innerHeight - 20
      ) {
        return pos;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Mouse drag
  button.addEventListener('mousedown', onDragStart);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);

  // Touch drag
  button.addEventListener('touchstart', onDragStart, { passive: false });
  document.addEventListener('touchmove', onDragMove, { passive: true });
  document.addEventListener('touchend', onDragEnd);

  // Re-clamp on viewport changes
  window.addEventListener('resize', onViewportChange);
  window.addEventListener('orientationchange', onViewportChange);

  // --- Modal behavior ---
  function openModal(): void {
    overlay.classList.add('active');
    textarea.value = '';
    statusDiv.textContent = '';
    submitBtn.disabled = false;
    if (minimizeTimer) clearTimeout(minimizeTimer);
    button.classList.remove(CLASS.buttonMinimized);
    setTimeout(() => textarea.focus(), 100);
  }

  function closeModal(): void {
    overlay.classList.remove('active');
    resetMinimizeTimer();
    // Return focus to the launcher so keyboard users are not dropped at the
    // top of the document (dialog pattern)
    button.focus();
  }

  // Focus trap: while the form dialog is open, Tab and Shift+Tab cycle
  // through the dialog's controls instead of escaping into the page.
  function trapFocus(e: KeyboardEvent): void {
    if (e.key !== 'Tab' || !overlay.classList.contains('active')) return;
    const focusables = Array.from(
      content.querySelectorAll<HTMLElement>(
        'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !content.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || !content.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }

  document.addEventListener('keydown', trapFocus);

  button.addEventListener('click', () => {
    if (dragStarted) {
      // It was a drag, not a click
      dragStarted = false;
      return;
    }
    if (suppressClickOpen) {
      // Tap on the minimized dot: expand only, do not open the form
      suppressClickOpen = false;
      return;
    }
    openModal();
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });

  submitBtn.addEventListener('click', async () => {
    const description = textarea.value.trim();
    if (!description) {
      statusDiv.textContent = 'Please describe the issue.';
      statusDiv.style.color = '#e94560';
      return;
    }

    submitBtn.disabled = true;
    statusDiv.innerHTML = `<span class="${CLASS.spinner}"></span> Capturing context & submitting...`;
    statusDiv.style.color = '#666';

    try {
      const report = await assembleReport(project, description, sessionTracker);
      const success = await submitReport(apiUrl, report);

      if (success) {
        statusDiv.textContent = 'Bug report submitted. Thank you!';
        statusDiv.style.color = '#27ae60';
        setTimeout(closeModal, 2000);
      } else {
        statusDiv.textContent = 'Saved locally. Will retry when connection is available.';
        statusDiv.style.color = '#f39c12';
        setTimeout(closeModal, 3000);
      }
    } catch (err) {
      statusDiv.textContent = 'Failed to submit. Report saved locally for retry.';
      statusDiv.style.color = '#e94560';
      submitBtn.disabled = false;
    }
  });

  // Return cleanup function
  return () => {
    if (minimizeTimer) clearTimeout(minimizeTimer);
    button.removeEventListener('mousedown', onDragStart);
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    button.removeEventListener('touchstart', onDragStart);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);
    window.removeEventListener('resize', onViewportChange);
    window.removeEventListener('orientationchange', onViewportChange);
    document.removeEventListener('keydown', trapFocus);
    button.remove();
    overlay.remove();
  };
}
