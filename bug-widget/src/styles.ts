const PREFIX = 'bw__';

export const CLASS = {
  button: `${PREFIX}btn`,
  buttonMinimized: `${PREFIX}btn--minimized`,
  buttonDragging: `${PREFIX}btn--dragging`,
  modal: `${PREFIX}modal`,
  overlay: `${PREFIX}overlay`,
  content: `${PREFIX}content`,
  header: `${PREFIX}header`,
  textarea: `${PREFIX}textarea`,
  submit: `${PREFIX}submit`,
  close: `${PREFIX}close`,
  status: `${PREFIX}status`,
  spinner: `${PREFIX}spinner`,
} as const;

export function injectStyles(
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
  zIndex: number = 99999
): void {
  if (document.getElementById(`${PREFIX}styles`)) return;

  const isRight = position.includes('right');
  const isBottom = position.includes('bottom');
  const overlayZ = zIndex + 1;

  const css = `
    .${CLASS.button} {
      position: fixed;
      ${isBottom ? 'bottom: 20px' : 'top: 20px'};
      ${isRight ? 'right: 20px' : 'left: 20px'};
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #1a1a2e;
      border: 2px solid #16213e;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${zIndex};
      transition: transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
      padding: 0;
      opacity: 0;
      animation: ${PREFIX}fadeIn 0.4s ease 2s forwards;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      min-width: 44px;
      min-height: 44px;
    }
    @keyframes ${PREFIX}fadeIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .${CLASS.button}:hover,
    .${CLASS.button}:focus {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    .${CLASS.button}.${CLASS.buttonMinimized} {
      width: 12px;
      height: 12px;
      min-width: 12px;
      min-height: 12px;
      opacity: 0.5;
      border-width: 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    .${CLASS.button}.${CLASS.buttonMinimized}:hover,
    .${CLASS.button}.${CLASS.buttonMinimized}:focus {
      width: 48px;
      height: 48px;
      min-width: 44px;
      min-height: 44px;
      opacity: 1;
      border-width: 2px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    .${CLASS.button}.${CLASS.buttonMinimized} svg {
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .${CLASS.button}.${CLASS.buttonMinimized}:hover svg,
    .${CLASS.button}.${CLASS.buttonMinimized}:focus svg {
      opacity: 1;
    }
    .${CLASS.button}.${CLASS.buttonDragging} {
      cursor: grabbing;
      transform: scale(1.15);
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      transition: none;
    }
    .${CLASS.button} svg {
      width: 24px;
      height: 24px;
      fill: #e94560;
      transition: opacity 0.2s ease;
    }
    .${CLASS.overlay} {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: ${overlayZ};
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0.2s ease;
    }
    .${CLASS.overlay}.active {
      opacity: 1;
      visibility: visible;
    }
    .${CLASS.content} {
      background: #ffffff;
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 480px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a1a2e;
    }
    .${CLASS.header} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .${CLASS.header} h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1a1a2e;
    }
    .${CLASS.close} {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      padding: 10px 12px;
      line-height: 1;
      border-radius: 4px;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .${CLASS.close}:hover {
      background: #f0f0f0;
      color: #333;
    }
    .${CLASS.textarea} {
      width: 100%;
      min-height: 120px;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      font-family: inherit;
      resize: vertical;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
    }
    .${CLASS.textarea}:focus {
      border-color: #e94560;
    }
    .${CLASS.textarea}::placeholder {
      color: #999;
    }
    .${CLASS.submit} {
      margin-top: 16px;
      width: 100%;
      padding: 14px 24px;
      background: #e94560;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      min-height: 48px;
    }
    .${CLASS.submit}:hover {
      background: #d63851;
    }
    .${CLASS.submit}:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .${CLASS.status} {
      margin-top: 12px;
      font-size: 13px;
      text-align: center;
      min-height: 20px;
    }
    .${CLASS.spinner} {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #ddd;
      border-top-color: #e94560;
      border-radius: 50%;
      animation: ${PREFIX}spin 0.6s linear infinite;
      vertical-align: middle;
      margin-right: 8px;
    }
    @keyframes ${PREFIX}spin {
      to { transform: rotate(360deg); }
    }

    /* Mobile: smaller icon, full-screen modal */
    @media (max-width: 480px) {
      .${CLASS.button} {
        width: 36px;
        height: 36px;
        ${isBottom ? 'bottom: 16px' : 'top: 16px'};
        ${isRight ? 'right: 16px' : 'left: 16px'};
      }
      .${CLASS.button} svg {
        width: 18px;
        height: 18px;
      }
      .${CLASS.button}.${CLASS.buttonMinimized}:hover,
      .${CLASS.button}.${CLASS.buttonMinimized}:focus {
        width: 36px;
        height: 36px;
      }
      .${CLASS.content} {
        width: 100%;
        max-width: 100%;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
        padding: 16px;
        display: flex;
        flex-direction: column;
      }
      .${CLASS.textarea} {
        flex: 1;
        min-height: 100px;
      }
    }
  `;

  const style = document.createElement('style');
  style.id = `${PREFIX}styles`;
  style.textContent = css;
  document.head.appendChild(style);
}
