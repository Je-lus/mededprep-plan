/* eslint-disable */
const g = "bw__", c = {
  button: `${g}btn`,
  buttonMinimized: `${g}btn--minimized`,
  buttonDragging: `${g}btn--dragging`,
  overlay: `${g}overlay`,
  content: `${g}content`,
  header: `${g}header`,
  textarea: `${g}textarea`,
  submit: `${g}submit`,
  close: `${g}close`,
  status: `${g}status`,
  spinner: `${g}spinner`
};
function jt(t, e = 99999, n = 0) {
  if (document.getElementById(`${g}styles`)) return;
  const r = t.includes("right"), o = t.includes("bottom"), i = e + 1, s = `
    .${c.button} {
      position: fixed;
      ${o ? `bottom: calc(${20 + n}px + env(safe-area-inset-bottom, 0px))` : "top: calc(20px + env(safe-area-inset-top, 0px))"};
      ${r ? "right: 20px" : "left: 20px"};
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
      z-index: ${e};
      padding: 0;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      min-width: 44px;
      min-height: 44px;
    }
    @keyframes ${g}fadeIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .${c.button}:hover,
    .${c.button}:focus {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    .${c.button}.${c.buttonMinimized} {
      width: 12px;
      height: 12px;
      min-width: 12px;
      min-height: 12px;
      opacity: 0.9;
      border-width: 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    .${c.button}.${c.buttonMinimized}::before {
      /* Invisible enlarged hit target: the dot stays 12px visually but keeps
         a 44x44 minimum touch target (WCAG 2.5.5 / Apple HIG) */
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 44px;
      height: 44px;
      transform: translate(-50%, -50%);
    }
    .${c.button}.${c.buttonMinimized}:hover,
    .${c.button}.${c.buttonMinimized}:focus {
      width: 48px;
      height: 48px;
      min-width: 44px;
      min-height: 44px;
      opacity: 1;
      border-width: 2px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    .${c.button}.${c.buttonMinimized} svg {
      opacity: 0;
    }
    .${c.button}.${c.buttonMinimized}:hover svg,
    .${c.button}.${c.buttonMinimized}:focus svg {
      opacity: 1;
    }
    .${c.button}.${c.buttonDragging} {
      cursor: grabbing;
      transform: scale(1.15);
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      transition: none;
    }
    .${c.button} svg {
      width: 24px;
      height: 24px;
      fill: #e94560;
    }
    .${c.overlay} {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: ${i};
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
    }
    .${c.overlay}.active {
      opacity: 1;
      visibility: visible;
    }
    .${c.content} {
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
    .${c.header} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .${c.header} h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1a1a2e;
    }
    .${c.close} {
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
    .${c.close}:hover {
      background: #f0f0f0;
      color: #333;
    }
    .${c.textarea} {
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
    }
    .${c.textarea}:focus {
      border-color: #e94560;
    }
    .${c.textarea}::placeholder {
      color: #6b7280;
    }
    .${c.submit} {
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
      min-height: 48px;
    }
    .${c.submit}:hover {
      background: #d63851;
    }
    .${c.submit}:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    .${c.status} {
      margin-top: 12px;
      font-size: 13px;
      text-align: center;
      min-height: 20px;
    }
    .${c.spinner} {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #ddd;
      border-top-color: #e94560;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 8px;
    }
    @keyframes ${g}spin {
      to { transform: rotate(360deg); }
    }

    /* Motion is opt-in: fade/size transitions and the spinner only animate
       when the user has not asked for reduced motion. Without this block the
       button is simply visible (opacity 1) and state changes are instant. */
    @media (prefers-reduced-motion: no-preference) {
      .${c.button} {
        transition: transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
        opacity: 0;
        animation: ${g}fadeIn 0.4s ease 2s forwards;
      }
      .${c.button} svg {
        transition: opacity 0.2s ease;
      }
      .${c.overlay} {
        transition: opacity 0.2s ease, visibility 0.2s ease;
      }
      .${c.textarea} {
        transition: border-color 0.2s;
      }
      .${c.submit} {
        transition: background 0.2s;
      }
      .${c.spinner} {
        animation: ${g}spin 0.6s linear infinite;
      }
    }

    /* Mobile: tighter edge margin, smaller icon, full-screen modal.
       The button stays at its effective 44px minimum (the old width/height
       36px declarations were dead: the base min-width/min-height 44px always
       won, so they are gone rather than pretending to shrink the button). */
    @media (max-width: 480px) {
      .${c.button} {
        ${o ? `bottom: calc(${16 + n}px + env(safe-area-inset-bottom, 0px))` : "top: calc(16px + env(safe-area-inset-top, 0px))"};
        ${r ? "right: 16px" : "left: 16px"};
      }
      .${c.button} svg {
        width: 18px;
        height: 18px;
      }
      .${c.content} {
        width: 100%;
        max-width: 100%;
        height: 100vh;
        height: 100dvh;
        max-height: 100vh;
        max-height: 100dvh;
        border-radius: 0;
        padding: 16px;
        padding-top: calc(16px + env(safe-area-inset-top, 0px));
        padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
        display: flex;
        flex-direction: column;
      }
      .${c.textarea} {
        flex: 1;
        min-height: 100px;
      }
    }
  `, a = document.createElement("style");
  a.id = `${g}styles`, a.textContent = s, document.head.appendChild(a);
}
function Vt(t, e) {
  if (t.match(/^[a-z]+:\/\//i))
    return t;
  if (t.match(/^\/\//))
    return window.location.protocol + t;
  if (t.match(/^[a-z]+:/i))
    return t;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), o = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(o), e && (r.href = e), o.href = t, o.href;
}
const Xt = /* @__PURE__ */ (() => {
  let t = 0;
  const e = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (t += 1, `u${e()}${t}`);
})();
function _(t) {
  const e = [];
  for (let n = 0, r = t.length; n < r; n++)
    e.push(t[n]);
  return e;
}
let A = null;
function xt(t = {}) {
  return A || (t.includeStyleProperties ? (A = t.includeStyleProperties, A) : (A = _(window.getComputedStyle(document.documentElement)), A));
}
function Y(t, e) {
  const r = (t.ownerDocument.defaultView || window).getComputedStyle(t).getPropertyValue(e);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Gt(t) {
  const e = Y(t, "border-left-width"), n = Y(t, "border-right-width");
  return t.clientWidth + e + n;
}
function Yt(t) {
  const e = Y(t, "border-top-width"), n = Y(t, "border-bottom-width");
  return t.clientHeight + e + n;
}
function vt(t, e = {}) {
  const n = e.width || Gt(t), r = e.height || Yt(t);
  return { width: n, height: r };
}
function Jt() {
  let t, e;
  try {
    e = process;
  } catch {
  }
  const n = e && e.env ? e.env.devicePixelRatio : null;
  return n && (t = parseInt(n, 10), Number.isNaN(t) && (t = 1)), t || window.devicePixelRatio || 1;
}
const x = 16384;
function Kt(t) {
  (t.width > x || t.height > x) && (t.width > x && t.height > x ? t.width > t.height ? (t.height *= x / t.width, t.width = x) : (t.width *= x / t.height, t.height = x) : t.width > x ? (t.height *= x / t.width, t.width = x) : (t.width *= x / t.height, t.height = x));
}
function J(t) {
  return new Promise((e, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => e(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = t;
  });
}
async function Zt(t) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
}
async function Qt(t, e, n) {
  const r = "http://www.w3.org/2000/svg", o = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return o.setAttribute("width", `${e}`), o.setAttribute("height", `${n}`), o.setAttribute("viewBox", `0 0 ${e} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), o.appendChild(i), i.appendChild(t), Zt(o);
}
const w = (t, e) => {
  if (t instanceof e)
    return !0;
  const n = Object.getPrototypeOf(t);
  return n === null ? !1 : n.constructor.name === e.name || w(n, e);
};
function Nt(t) {
  const e = t.getPropertyValue("content");
  return `${t.cssText} content: '${e.replace(/'|"/g, "")}';`;
}
function te(t, e) {
  return xt(e).map((n) => {
    const r = t.getPropertyValue(n), o = t.getPropertyPriority(n);
    return `${n}: ${r}${o ? " !important" : ""};`;
  }).join(" ");
}
function ee(t, e, n, r) {
  const o = `.${t}:${e}`, i = n.cssText ? Nt(n) : te(n, r);
  return document.createTextNode(`${o}{${i}}`);
}
function at(t, e, n, r) {
  const o = window.getComputedStyle(t, n), i = o.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const s = Xt();
  try {
    e.className = `${e.className} ${s}`;
  } catch {
    return;
  }
  const a = document.createElement("style");
  a.appendChild(ee(s, n, o, r)), e.appendChild(a);
}
function ne(t, e, n) {
  at(t, e, ":before", n), at(t, e, ":after", n);
}
const ct = "application/font-woff", lt = "image/jpeg", re = {
  woff: ct,
  woff2: ct,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: lt,
  jpeg: lt,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function ie(t) {
  const e = /\.([^./]*?)$/g.exec(t);
  return e ? e[1] : "";
}
function et(t) {
  const e = ie(t).toLowerCase();
  return re[e] || "";
}
function se(t) {
  return t.split(/,/)[1];
}
function tt(t) {
  return t.search(/^(data:)/) !== -1;
}
function oe(t, e) {
  return `data:${e};base64,${t}`;
}
async function Et(t, e, n) {
  const r = await fetch(t, e);
  if (r.status === 404)
    throw new Error(`Resource "${r.url}" not found`);
  const o = await r.blob();
  return new Promise((i, s) => {
    const a = new FileReader();
    a.onerror = s, a.onloadend = () => {
      try {
        i(n({ res: r, result: a.result }));
      } catch (l) {
        s(l);
      }
    }, a.readAsDataURL(o);
  });
}
const N = {};
function ae(t, e, n) {
  let r = t.replace(/\?.*/, "");
  return n && (r = t), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), e ? `[${e}]${r}` : r;
}
async function nt(t, e, n) {
  const r = ae(t, e, n.includeQueryParams);
  if (N[r] != null)
    return N[r];
  n.cacheBust && (t += (/\?/.test(t) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let o;
  try {
    const i = await Et(t, n.fetchRequestInit, ({ res: s, result: a }) => (e || (e = s.headers.get("Content-Type") || ""), se(a)));
    o = oe(i, e);
  } catch (i) {
    o = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${t}`;
    i && (s = typeof i == "string" ? i : i.message), s && console.warn(s);
  }
  return N[r] = o, o;
}
async function ce(t) {
  const e = t.toDataURL();
  return e === "data:," ? t.cloneNode(!1) : J(e);
}
async function le(t, e) {
  if (t.currentSrc) {
    const i = document.createElement("canvas"), s = i.getContext("2d");
    i.width = t.clientWidth, i.height = t.clientHeight, s == null || s.drawImage(t, 0, 0, i.width, i.height);
    const a = i.toDataURL();
    return J(a);
  }
  const n = t.poster, r = et(n), o = await nt(n, r, e);
  return J(o);
}
async function ue(t, e) {
  var n;
  try {
    if (!((n = t == null ? void 0 : t.contentDocument) === null || n === void 0) && n.body)
      return await K(t.contentDocument.body, e, !0);
  } catch {
  }
  return t.cloneNode(!1);
}
async function he(t, e) {
  return w(t, HTMLCanvasElement) ? ce(t) : w(t, HTMLVideoElement) ? le(t, e) : w(t, HTMLIFrameElement) ? ue(t, e) : t.cloneNode(St(t));
}
const de = (t) => t.tagName != null && t.tagName.toUpperCase() === "SLOT", St = (t) => t.tagName != null && t.tagName.toUpperCase() === "SVG";
async function fe(t, e, n) {
  var r, o;
  if (St(e))
    return e;
  let i = [];
  return de(t) && t.assignedNodes ? i = _(t.assignedNodes()) : w(t, HTMLIFrameElement) && (!((r = t.contentDocument) === null || r === void 0) && r.body) ? i = _(t.contentDocument.body.childNodes) : i = _(((o = t.shadowRoot) !== null && o !== void 0 ? o : t).childNodes), i.length === 0 || w(t, HTMLVideoElement) || await i.reduce((s, a) => s.then(() => K(a, n)).then((l) => {
    l && e.appendChild(l);
  }), Promise.resolve()), e;
}
function me(t, e, n) {
  const r = e.style;
  if (!r)
    return;
  const o = window.getComputedStyle(t);
  o.cssText ? (r.cssText = o.cssText, r.transformOrigin = o.transformOrigin) : xt(n).forEach((i) => {
    let s = o.getPropertyValue(i);
    i === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), w(t, HTMLIFrameElement) && i === "display" && s === "inline" && (s = "block"), i === "d" && e.getAttribute("d") && (s = `path(${e.getAttribute("d")})`), r.setProperty(i, s, o.getPropertyPriority(i));
  });
}
function pe(t, e) {
  w(t, HTMLTextAreaElement) && (e.innerHTML = t.value), w(t, HTMLInputElement) && e.setAttribute("value", t.value);
}
function ge(t, e) {
  if (w(t, HTMLSelectElement)) {
    const n = e, r = Array.from(n.children).find((o) => t.value === o.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function we(t, e, n) {
  return w(e, Element) && (me(t, e, n), ne(t, e, n), pe(t, e), ge(t, e)), e;
}
async function ye(t, e) {
  const n = t.querySelectorAll ? t.querySelectorAll("use") : [];
  if (n.length === 0)
    return t;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const a = n[i].getAttribute("xlink:href");
    if (a) {
      const l = t.querySelector(a), m = document.querySelector(a);
      !l && m && !r[a] && (r[a] = await K(m, e, !0));
    }
  }
  const o = Object.values(r);
  if (o.length) {
    const i = "http://www.w3.org/1999/xhtml", s = document.createElementNS(i, "svg");
    s.setAttribute("xmlns", i), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const a = document.createElementNS(i, "defs");
    s.appendChild(a);
    for (let l = 0; l < o.length; l++)
      a.appendChild(o[l]);
    t.appendChild(s);
  }
  return t;
}
async function K(t, e, n) {
  return !n && e.filter && !e.filter(t) ? null : Promise.resolve(t).then((r) => he(r, e)).then((r) => fe(t, r, e)).then((r) => we(t, r, e)).then((r) => ye(r, e));
}
const $t = /url\((['"]?)([^'"]+?)\1\)/g, be = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, xe = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function ve(t) {
  const e = t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`, "g");
}
function Ee(t) {
  const e = [];
  return t.replace($t, (n, r, o) => (e.push(o), n)), e.filter((n) => !tt(n));
}
async function Se(t, e, n, r, o) {
  try {
    const i = n ? Vt(e, n) : e, s = et(e);
    let a;
    return o || (a = await nt(i, s, r)), t.replace(ve(e), `$1${a}$3`);
  } catch {
  }
  return t;
}
function $e(t, { preferredFontFormat: e }) {
  return e ? t.replace(xe, (n) => {
    for (; ; ) {
      const [r, , o] = be.exec(n) || [];
      if (!o)
        return "";
      if (o === e)
        return `src: ${r};`;
    }
  }) : t;
}
function Rt(t) {
  return t.search($t) !== -1;
}
async function Tt(t, e, n) {
  if (!Rt(t))
    return t;
  const r = $e(t, n);
  return Ee(r).reduce((i, s) => i.then((a) => Se(a, s, e, n)), Promise.resolve(r));
}
async function z(t, e, n) {
  var r;
  const o = (r = e.style) === null || r === void 0 ? void 0 : r.getPropertyValue(t);
  if (o) {
    const i = await Tt(o, null, n);
    return e.style.setProperty(t, i, e.style.getPropertyPriority(t)), !0;
  }
  return !1;
}
async function Re(t, e) {
  await z("background", t, e) || await z("background-image", t, e), await z("mask", t, e) || await z("-webkit-mask", t, e) || await z("mask-image", t, e) || await z("-webkit-mask-image", t, e);
}
async function Te(t, e) {
  const n = w(t, HTMLImageElement);
  if (!(n && !tt(t.src)) && !(w(t, SVGImageElement) && !tt(t.href.baseVal)))
    return;
  const r = n ? t.src : t.href.baseVal, o = await nt(r, et(r), e);
  await new Promise((i, s) => {
    t.onload = i, t.onerror = e.onImageErrorHandler ? (...l) => {
      try {
        i(e.onImageErrorHandler(...l));
      } catch (m) {
        s(m);
      }
    } : s;
    const a = t;
    a.decode && (a.decode = i), a.loading === "lazy" && (a.loading = "eager"), n ? (t.srcset = "", t.src = o) : t.href.baseVal = o;
  });
}
async function Le(t, e) {
  const r = _(t.childNodes).map((o) => Lt(o, e));
  await Promise.all(r).then(() => t);
}
async function Lt(t, e) {
  w(t, Element) && (await Re(t, e), await Te(t, e), await Le(t, e));
}
function Ce(t, e) {
  const { style: n } = t;
  e.backgroundColor && (n.backgroundColor = e.backgroundColor), e.width && (n.width = `${e.width}px`), e.height && (n.height = `${e.height}px`);
  const r = e.style;
  return r != null && Object.keys(r).forEach((o) => {
    n[o] = r[o];
  }), t;
}
const ut = {};
async function ht(t) {
  let e = ut[t];
  if (e != null)
    return e;
  const r = await (await fetch(t)).text();
  return e = { url: t, cssText: r }, ut[t] = e, e;
}
async function dt(t, e) {
  let n = t.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let a = s.replace(r, "$1");
    return a.startsWith("https://") || (a = new URL(a, t.url).href), Et(a, e.fetchRequestInit, ({ result: l }) => (n = n.replace(s, `url(${l})`), [s, l]));
  });
  return Promise.all(i).then(() => n);
}
function ft(t) {
  if (t == null)
    return [];
  const e = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let r = t.replace(n, "");
  const o = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const l = o.exec(r);
    if (l === null)
      break;
    e.push(l[0]);
  }
  r = r.replace(o, "");
  const i = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", a = new RegExp(s, "gi");
  for (; ; ) {
    let l = i.exec(r);
    if (l === null) {
      if (l = a.exec(r), l === null)
        break;
      i.lastIndex = a.lastIndex;
    } else
      a.lastIndex = i.lastIndex;
    e.push(l[0]);
  }
  return e;
}
async function ke(t, e) {
  const n = [], r = [];
  return t.forEach((o) => {
    if ("cssRules" in o)
      try {
        _(o.cssRules || []).forEach((i, s) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let a = s + 1;
            const l = i.href, m = ht(l).then((p) => dt(p, e)).then((p) => ft(p).forEach((d) => {
              try {
                o.insertRule(d, d.startsWith("@import") ? a += 1 : o.cssRules.length);
              } catch (f) {
                console.error("Error inserting rule from remote css", {
                  rule: d,
                  error: f
                });
              }
            })).catch((p) => {
              console.error("Error loading remote css", p.toString());
            });
            r.push(m);
          }
        });
      } catch (i) {
        const s = t.find((a) => a.href == null) || document.styleSheets[0];
        o.href != null && r.push(ht(o.href).then((a) => dt(a, e)).then((a) => ft(a).forEach((l) => {
          s.insertRule(l, s.cssRules.length);
        })).catch((a) => {
          console.error("Error loading remote stylesheet", a);
        })), console.error("Error inlining remote css file", i);
      }
  }), Promise.all(r).then(() => (t.forEach((o) => {
    if ("cssRules" in o)
      try {
        _(o.cssRules || []).forEach((i) => {
          n.push(i);
        });
      } catch (i) {
        console.error(`Error while reading CSS rules from ${o.href}`, i);
      }
  }), n));
}
function _e(t) {
  return t.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => Rt(e.style.getPropertyValue("src")));
}
async function Me(t, e) {
  if (t.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = _(t.ownerDocument.styleSheets), r = await ke(n, e);
  return _e(r);
}
function Ct(t) {
  return t.trim().replace(/["']/g, "");
}
function De(t) {
  const e = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      e.add(Ct(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(t), e;
}
async function Pe(t, e) {
  const n = await Me(t, e), r = De(t);
  return (await Promise.all(n.filter((i) => r.has(Ct(i.style.fontFamily))).map((i) => {
    const s = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Tt(i.cssText, s, e);
  }))).join(`
`);
}
async function He(t, e) {
  const n = e.fontEmbedCSS != null ? e.fontEmbedCSS : e.skipFonts ? null : await Pe(t, e);
  if (n) {
    const r = document.createElement("style"), o = document.createTextNode(n);
    r.appendChild(o), t.firstChild ? t.insertBefore(r, t.firstChild) : t.appendChild(r);
  }
}
async function Ie(t, e = {}) {
  const { width: n, height: r } = vt(t, e), o = await K(t, e, !0);
  return await He(o, e), await Lt(o, e), Ce(o, e), await Qt(o, n, r);
}
async function Ae(t, e = {}) {
  const { width: n, height: r } = vt(t, e), o = await Ie(t, e), i = await J(o), s = document.createElement("canvas"), a = s.getContext("2d"), l = e.pixelRatio || Jt(), m = e.canvasWidth || n, p = e.canvasHeight || r;
  return s.width = m * l, s.height = p * l, e.skipAutoScale || Kt(s), s.style.width = `${m}`, s.style.height = `${p}`, e.backgroundColor && (a.fillStyle = e.backgroundColor, a.fillRect(0, 0, s.width, s.height)), a.drawImage(i, 0, 0, s.width, s.height), s;
}
async function mt(t, e = {}) {
  return (await Ae(t, e)).toDataURL("image/jpeg", e.quality || 1);
}
const T = [], L = [], O = 50;
let pt = !1;
const G = [];
function ze(t) {
  return G.push(t), () => {
    const e = G.indexOf(t);
    e >= 0 && G.splice(e, 1);
  };
}
function gt(t) {
  for (const e of G)
    try {
      e(t);
    } catch {
    }
}
function Oe(t) {
  const e = {};
  if (!t) return e;
  const n = (r, o) => {
    e[r.toLowerCase()] = o;
  };
  if (t instanceof Headers)
    t.forEach((r, o) => n(o, r));
  else if (Array.isArray(t))
    for (const [r, o] of t)
      n(r, o);
  else
    for (const [r, o] of Object.entries(t))
      n(r, o);
  return e;
}
function Ue() {
  if (pt) return;
  pt = !0;
  const t = console.error;
  console.error = (...i) => {
    const a = {
      message: i.map((l) => {
        if (l instanceof Error) return l.message;
        if (typeof l == "string") return l;
        try {
          return JSON.stringify(l);
        } catch {
          return String(l);
        }
      }).join(" "),
      timestamp: Date.now()
    };
    i[0] instanceof Error && (a.stack = i[0].stack), T.push(a), T.length > O && T.shift(), t.apply(console, i);
  }, window.addEventListener("error", (i) => {
    var s;
    T.push({
      message: i.message || "Unknown error",
      timestamp: Date.now(),
      stack: (s = i.error) == null ? void 0 : s.stack
    }), T.length > O && T.shift();
  }), window.addEventListener("unhandledrejection", (i) => {
    var a;
    const s = i.reason instanceof Error ? i.reason.message : String(i.reason);
    T.push({
      message: `Unhandled Promise: ${s}`,
      timestamp: Date.now(),
      stack: (a = i.reason) == null ? void 0 : a.stack
    }), T.length > O && T.shift();
  });
  const e = window.fetch;
  window.fetch = async (...i) => {
    var p;
    const s = new Request(...i), a = s.method, l = s.url, m = Oe(
      i[0] instanceof Request ? i[0].headers : (p = i[1]) == null ? void 0 : p.headers
    );
    try {
      const d = await e(...i);
      if (!d.ok) {
        let f = "";
        try {
          f = (await d.clone().text()).slice(0, 500);
        } catch {
          f = "[Could not read response body]";
        }
        const E = {
          url: l,
          method: a,
          status: d.status,
          statusText: d.statusText,
          responseBody: f,
          requestHeaders: m,
          timestamp: Date.now()
        };
        L.push({
          url: l,
          method: a,
          status: d.status,
          statusText: d.statusText,
          timestamp: Date.now(),
          responseBody: f,
          requestHeaders: m
        }), L.length > O && L.shift(), d.status >= 400 && d.status !== 401 && gt(E);
      }
      return d;
    } catch (d) {
      throw L.push({
        url: l,
        method: a,
        status: 0,
        statusText: d instanceof Error ? d.message : "Network Error",
        timestamp: Date.now()
      }), L.length > O && L.shift(), d;
    }
  };
  const n = XMLHttpRequest.prototype.open, r = XMLHttpRequest.prototype.send, o = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.open = function(i, s, ...a) {
    const l = this;
    return l._bw_method = i, l._bw_url = String(s), l._bw_headers = {}, n.call(this, i, s, ...a);
  }, XMLHttpRequest.prototype.setRequestHeader = function(i, s) {
    const a = this;
    return a._bw_headers && (a._bw_headers[i.toLowerCase()] = s), o.call(this, i, s);
  }, XMLHttpRequest.prototype.send = function(...i) {
    return this.addEventListener("loadend", () => {
      if (this.status >= 400 || this.status === 0) {
        const s = this;
        let a = "";
        try {
          a = (this.responseText || "").slice(0, 500);
        } catch {
          a = "[Could not read response body]";
        }
        const l = {
          url: s._bw_url || "",
          method: s._bw_method || "GET",
          status: this.status,
          statusText: this.statusText || "Error",
          timestamp: Date.now(),
          responseBody: a,
          requestHeaders: s._bw_headers || {}
        };
        L.push(l), L.length > O && L.shift(), this.status >= 400 && this.status !== 401 && gt({
          url: s._bw_url || "",
          method: s._bw_method || "GET",
          status: this.status,
          statusText: this.statusText || "Error",
          responseBody: a,
          requestHeaders: s._bw_headers || {},
          timestamp: Date.now()
        });
      }
    }), r.apply(this, i);
  };
}
const wt = 45e4;
async function kt() {
  var n;
  if ((n = navigator.connection) != null && n.saveData) return null;
  const e = (r) => {
    var o;
    return r instanceof HTMLElement ? !((o = r.className) != null && o.toString().includes("bw__")) : !0;
  };
  try {
    let r = await mt(document.body, {
      quality: window.innerWidth <= 480 ? 0.5 : 0.7,
      pixelRatio: 1,
      backgroundColor: "#ffffff",
      filter: e
    });
    return r.length > wt && (r = await mt(document.body, {
      quality: 0.4,
      pixelRatio: 0.75,
      backgroundColor: "#ffffff",
      filter: e
    })), r.length > wt ? null : r;
  } catch (r) {
    return console.warn("[BugWidget] Screenshot capture failed:", r), null;
  }
}
function _t() {
  return [...T];
}
function Mt() {
  return [...L];
}
function Dt() {
  var n;
  const t = {
    url: window.location.href,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    userAgent: navigator.userAgent,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    language: navigator.language,
    platform: navigator.platform || "unknown",
    colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }, e = navigator;
  return (n = e.connection) != null && n.effectiveType && (t.connection = e.connection.effectiveType), t;
}
class Fe {
  constructor(e = 50) {
    this.events = [], this.scrollTimeout = null, this.maxScrollDepth = 0, this.active = !1, this.handleClick = (n) => {
      const r = n.target;
      if (!r) return;
      const o = this.buildSelector(r), i = this.getSafeText(r);
      this.addEvent({
        type: "click",
        timestamp: Date.now(),
        data: { selector: o, text: i }
      });
    }, this.handleScroll = () => {
      this.scrollTimeout || (this.scrollTimeout = setTimeout(() => {
        this.scrollTimeout = null;
        const n = window.scrollY || document.documentElement.scrollTop, r = document.documentElement.scrollHeight - window.innerHeight, o = r > 0 ? Math.round(n / r * 100) : 0;
        o > this.maxScrollDepth && (this.maxScrollDepth = o, this.addEvent({
          type: "scroll",
          timestamp: Date.now(),
          data: { depth: o, maxDepth: this.maxScrollDepth }
        }));
      }, 500));
    }, this.handleNavigation = () => {
      const n = window.location.href;
      n !== this.lastUrl && (this.lastUrl = n, this.maxScrollDepth = 0, this.addEvent({
        type: "navigation",
        timestamp: Date.now(),
        data: { url: n, action: "navigate" }
      }));
    }, this.handleVisibility = () => {
      this.addEvent({
        type: "visibility",
        timestamp: Date.now(),
        data: { state: document.visibilityState }
      });
    }, this.maxEvents = e, this.startTime = Date.now(), this.lastUrl = window.location.href;
  }
  start() {
    this.active || (this.active = !0, this.addEvent({
      type: "navigation",
      timestamp: Date.now(),
      data: { url: window.location.href, action: "pageload" }
    }), document.addEventListener("click", this.handleClick, { capture: !0, passive: !0 }), window.addEventListener("scroll", this.handleScroll, { passive: !0 }), window.addEventListener("popstate", this.handleNavigation), document.addEventListener("visibilitychange", this.handleVisibility), this.patchHistory("pushState"), this.patchHistory("replaceState"));
  }
  stop() {
    this.active && (this.active = !1, document.removeEventListener("click", this.handleClick, { capture: !0 }), window.removeEventListener("scroll", this.handleScroll), window.removeEventListener("popstate", this.handleNavigation), document.removeEventListener("visibilitychange", this.handleVisibility));
  }
  getEvents() {
    return [...this.events];
  }
  getTimeOnPage() {
    return Date.now() - this.startTime;
  }
  addEvent(e) {
    this.events.push(e), this.events.length > this.maxEvents && this.events.shift();
  }
  patchHistory(e) {
    const n = history[e].bind(history);
    history[e] = (...r) => {
      n(...r), this.handleNavigation();
    };
  }
  buildSelector(e) {
    const n = [];
    let r = e, o = 0;
    for (; r && o < 3; ) {
      let i = r.tagName.toLowerCase();
      if (r.id) {
        i += `#${r.id}`, n.unshift(i);
        break;
      }
      if (r.className && typeof r.className == "string") {
        const s = r.className.split(/\s+/).filter((a) => a && !a.startsWith("bw__")).slice(0, 2).join(".");
        s && (i += `.${s}`);
      }
      n.unshift(i), r = r.parentElement, o++;
    }
    return n.join(" > ");
  }
  getSafeText(e) {
    const n = e.tagName.toLowerCase();
    if (["input", "textarea", "select"].includes(n))
      return `[${n}]`;
    const r = (e.textContent || "").trim();
    return r.length > 50 ? r.slice(0, 50) + "..." : r;
  }
}
function Pt() {
  return window.__bw_user_identity ? { userIdentity: window.__bw_user_identity } : {};
}
const q = "bw__pending_reports";
async function qe(t, e, n) {
  const r = await kt();
  return {
    project: t,
    url: window.location.href,
    trigger: "user-click",
    description: e,
    screenshot: r,
    consoleErrors: _t(),
    networkErrors: Mt(),
    sessionEvents: n ? n.getEvents() : [],
    environment: Dt(),
    timeOnPage: n ? n.getTimeOnPage() : 0,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    ...Pt()
  };
}
function Ht(t) {
  return t === 429 || t >= 500;
}
async function It(t, e) {
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e)
    });
    return n.ok ? (zt(t), !0) : (Ht(n.status) ? (console.warn(`[BugWidget] Report submission failed (${n.status}), saving to localStorage`), yt(e)) : console.warn(`[BugWidget] Report rejected by server (${n.status}), dropping`), !1);
  } catch (n) {
    return console.warn("[BugWidget] Report submission failed, saving to localStorage:", n), yt(e), !1;
  }
}
function yt(t) {
  try {
    const e = At();
    e.push(t);
    const n = e.slice(-10);
    localStorage.setItem(q, JSON.stringify(n));
  } catch {
  }
}
function At() {
  try {
    const t = localStorage.getItem(q);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Be(t, e = 3e5) {
  const n = setInterval(() => {
    const r = localStorage.getItem(q);
    r && r !== "[]" && zt(t);
  }, e);
  return () => clearInterval(n);
}
async function zt(t) {
  const e = At();
  if (e.length === 0) return;
  const n = [];
  for (const r of e)
    try {
      const o = await fetch(t, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(r)
      });
      !o.ok && Ht(o.status) && n.push(r);
    } catch {
      n.push(r);
    }
  n.length > 0 ? localStorage.setItem(q, JSON.stringify(n)) : localStorage.removeItem(q);
}
const We = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/></svg>', bt = "bw__position", je = 1e4;
function Ve(t, e, n, r, o, i = 0) {
  const s = document.createElement("button");
  s.className = c.button, s.innerHTML = We, s.setAttribute("aria-label", "Report a bug"), s.setAttribute("title", "Report a bug");
  const a = document.createElement("div");
  a.className = c.overlay, a.innerHTML = `
    <div class="${c.content}" role="dialog" aria-modal="true" aria-labelledby="bw__dialog-title">
      <div class="${c.header}">
        <h3 id="bw__dialog-title">Report a Bug</h3>
        <button class="${c.close}" aria-label="Close">&times;</button>
      </div>
      <textarea class="${c.textarea}" placeholder="What went wrong? Describe what you were doing and what happened..."></textarea>
      <button class="${c.submit}">Submit Report</button>
      <div class="${c.status}"></div>
    </div>
  `, document.body.appendChild(s), document.body.appendChild(a);
  const l = a.querySelector(`.${c.content}`), m = a.querySelector(`.${c.textarea}`), p = a.querySelector(`.${c.submit}`), d = a.querySelector(`.${c.close}`), f = a.querySelector(`.${c.status}`);
  let E = null;
  function M() {
    E && clearTimeout(E), s.classList.remove(c.buttonMinimized), E = setTimeout(() => {
      a.classList.contains("active") || s.classList.add(c.buttonMinimized);
    }, je);
  }
  setTimeout(M, 2400), s.addEventListener("mouseenter", M);
  let v = !1, S = !1, D = 5, C = !1, B = 0, $ = 0, P = 0, H = 0, rt = 0, U;
  const Z = Ut();
  if (Z) {
    const u = st(Z.x, Z.y);
    Q(u.x, u.y);
  }
  function it(u) {
    return "touches" in u ? { x: u.touches[0].clientX, y: u.touches[0].clientY } : { x: u.clientX, y: u.clientY };
  }
  function W(u) {
    if (a.classList.contains("active")) return;
    const h = "touches" in u;
    if (h)
      B = Date.now();
    else if (Date.now() - B < 800)
      return;
    const y = s.classList.contains(c.buttonMinimized);
    M(), U = s.getBoundingClientRect();
    const b = it(u);
    $ = b.x, P = b.y, H = U.left, rt = U.top, v = !0, S = !1, D = h ? 12 : 5, C = h && y, h || u.preventDefault();
  }
  function j(u) {
    if (!v) return;
    const h = it(u), y = h.x - $, b = h.y - P;
    if (!S && Math.abs(y) < D && Math.abs(b) < D) return;
    S = !0, s.classList.add(c.buttonDragging);
    const R = H + y, k = rt + b, I = window.innerWidth - U.width, qt = window.innerHeight - U.height - i, Bt = Math.max(0, Math.min(R, I)), Wt = Math.max(0, Math.min(k, qt));
    s.style.left = `${Bt}px`, s.style.top = `${Wt}px`, s.style.right = "auto", s.style.bottom = "auto";
  }
  function V(u) {
    if (!v || (v = !1, s.classList.remove(c.buttonDragging), !S))
      return;
    const h = s.getBoundingClientRect(), y = h.left + h.width / 2, b = window.innerWidth, R = window.innerHeight;
    let k, I = Math.max(8, Math.min(h.top, R - h.height - 8 - i));
    y < b / 2 ? k = 16 : k = b - h.width - 16, Q(k, I), Ot(k, I), u.preventDefault();
  }
  function Q(u, h) {
    s.style.left = `${u}px`, s.style.top = `${h}px`, s.style.right = "auto", s.style.bottom = "auto";
  }
  function st(u, h) {
    const y = s.getBoundingClientRect(), b = y.width || 48, R = y.height || 48, k = window.innerWidth - b - 8, I = window.innerHeight - R - 8 - i;
    return {
      x: Math.max(8, Math.min(u, k)),
      y: Math.max(8, Math.min(h, I))
    };
  }
  function X() {
    if (!s.style.left && !s.style.top) return;
    const u = s.getBoundingClientRect(), h = st(u.left, u.top);
    (h.x !== u.left || h.y !== u.top) && Q(h.x, h.y);
  }
  function Ot(u, h) {
    try {
      localStorage.setItem(bt, JSON.stringify({ x: u, y: h }));
    } catch {
    }
  }
  function Ut() {
    try {
      const u = localStorage.getItem(bt);
      if (!u) return null;
      const h = JSON.parse(u);
      return h.x >= 0 && h.x < window.innerWidth - 20 && h.y >= 0 && h.y < window.innerHeight - 20 ? h : null;
    } catch {
      return null;
    }
  }
  s.addEventListener("mousedown", W), document.addEventListener("mousemove", j), document.addEventListener("mouseup", V), s.addEventListener("touchstart", W, { passive: !1 }), document.addEventListener("touchmove", j, { passive: !0 }), document.addEventListener("touchend", V), window.addEventListener("resize", X), window.addEventListener("orientationchange", X);
  function Ft() {
    a.classList.add("active"), m.value = "", f.textContent = "", p.disabled = !1, E && clearTimeout(E), s.classList.remove(c.buttonMinimized), setTimeout(() => m.focus(), 100);
  }
  function F() {
    a.classList.remove("active"), M(), s.focus();
  }
  function ot(u) {
    if (u.key !== "Tab" || !a.classList.contains("active")) return;
    const h = Array.from(
      l.querySelectorAll(
        'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )
    );
    if (h.length === 0) return;
    const y = h[0], b = h[h.length - 1], R = document.activeElement;
    u.shiftKey ? (R === y || !l.contains(R)) && (u.preventDefault(), b.focus()) : (R === b || !l.contains(R)) && (u.preventDefault(), y.focus());
  }
  return document.addEventListener("keydown", ot), s.addEventListener("click", () => {
    if (S) {
      S = !1;
      return;
    }
    if (C) {
      C = !1;
      return;
    }
    Ft();
  }), d.addEventListener("click", F), a.addEventListener("click", (u) => {
    u.target === a && F();
  }), document.addEventListener("keydown", (u) => {
    u.key === "Escape" && a.classList.contains("active") && F();
  }), p.addEventListener("click", async () => {
    const u = m.value.trim();
    if (!u) {
      f.textContent = "Please describe the issue.", f.style.color = "#e94560";
      return;
    }
    p.disabled = !0, f.innerHTML = `<span class="${c.spinner}"></span> Capturing context & submitting...`, f.style.color = "#666";
    try {
      const h = await qe(t, u, n);
      await It(e, h) ? (f.textContent = "Bug report submitted. Thank you!", f.style.color = "#27ae60", setTimeout(F, 2e3)) : (f.textContent = "Saved locally. Will retry when connection is available.", f.style.color = "#f39c12", setTimeout(F, 3e3));
    } catch {
      f.textContent = "Failed to submit. Report saved locally for retry.", f.style.color = "#e94560", p.disabled = !1;
    }
  }), () => {
    E && clearTimeout(E), s.removeEventListener("mousedown", W), document.removeEventListener("mousemove", j), document.removeEventListener("mouseup", V), s.removeEventListener("touchstart", W), document.removeEventListener("touchmove", j), document.removeEventListener("touchend", V), window.removeEventListener("resize", X), window.removeEventListener("orientationchange", X), document.removeEventListener("keydown", ot), s.remove(), a.remove();
  };
}
class Xe {
  constructor(e, n, r, o) {
    this.lastReportTime = 0, this.unsubscribe = null, this.project = e, this.apiUrl = n, this.sessionTracker = r, this.options = o;
  }
  start() {
    this.unsubscribe = ze((e) => {
      this.handleApiError(e);
    });
  }
  stop() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null);
  }
  async handleApiError(e) {
    if (this.isOwnEndpoint(e.url) || this.options.shouldAutoReport && !this.options.shouldAutoReport({
      url: e.url,
      status: e.status,
      method: e.method
    }))
      return;
    const n = Date.now();
    if (!(n - this.lastReportTime < this.options.debounceMs)) {
      this.lastReportTime = n;
      try {
        const r = await kt(), o = this.sanitize(e.requestHeaders), i = {
          project: this.project,
          url: window.location.href,
          trigger: "auto-api-error",
          description: `Auto-reported: ${e.method} ${e.url} returned ${e.status} ${e.statusText}`,
          screenshot: r,
          consoleErrors: _t(),
          networkErrors: Mt(),
          sessionEvents: this.sessionTracker ? this.sessionTracker.getEvents() : [],
          environment: Dt(),
          timeOnPage: this.sessionTracker ? this.sessionTracker.getTimeOnPage() : 0,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          ...Pt(),
          apiErrorContext: {
            url: e.url,
            method: e.method,
            status: e.status,
            statusText: e.statusText,
            responseBody: e.responseBody,
            requestHeaders: o
          }
        };
        await It(this.apiUrl, i);
      } catch (r) {
        console.warn("[BugWidget] Auto-report failed:", r);
      }
    }
  }
  isOwnEndpoint(e) {
    try {
      const n = new URL(e, window.location.origin), r = new URL(this.apiUrl, window.location.origin);
      return n.pathname === r.pathname;
    } catch {
      return e.includes(this.apiUrl);
    }
  }
  sanitize(e) {
    const n = {};
    for (const [r, o] of Object.entries(e))
      this.options.sanitizeHeaders.includes(r.toLowerCase()) ? n[r] = "[REDACTED]" : n[r] = o;
    return n;
  }
}
function Ge(t) {
  const {
    project: e,
    apiUrl: n,
    position: r = "bottom-right",
    captureSession: o = !0,
    maxSessionEvents: i = 50,
    autoReportErrors: s = !0,
    autoReportDebounceMs: a = 3e4,
    zIndex: l = 99999,
    offset: m = {},
    exclude: p = [],
    sanitizeHeaders: d = [],
    headless: f = !1,
    shouldAutoReport: E
  } = t;
  if (!e || !n)
    throw new Error('[BugWidget] "project" and "apiUrl" are required config options.');
  const M = window.location.href;
  for (const $ of p)
    if (Ye($, M))
      return { destroy() {
      } };
  Ue();
  let v = null;
  o && (v = new Fe(i), v.start());
  let S = null;
  const D = Math.max(0, m.bottom ?? 0);
  f || (jt(r, l, D), S = Ve(e, n, v, r, l, D));
  let C = null;
  s && (C = new Xe(e, n, v, {
    debounceMs: a,
    shouldAutoReport: E,
    sanitizeHeaders: [
      "authorization",
      "cookie",
      "x-auth-token",
      "x-api-key",
      "x-csrf-token",
      ...d.map(($) => $.toLowerCase())
    ]
  }), C.start());
  const B = Be(n);
  return {
    destroy() {
      if (B(), v && v.stop(), C && C.stop(), S && S(), !f) {
        const $ = document.querySelector(".bw__btn"), P = document.querySelector(".bw__overlay"), H = document.getElementById("bw__styles");
        $ == null || $.remove(), P == null || P.remove(), H == null || H.remove();
      }
    }
  };
}
function Ye(t, e) {
  const n = t.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
  try {
    return new RegExp(`^${n}$`).test(e);
  } catch {
    return e.includes(t);
  }
}
if (typeof document < "u") {
  const t = document.currentScript;
  t != null && t.dataset.project && (t != null && t.dataset.apiUrl) && document.addEventListener("DOMContentLoaded", () => {
    Ge({
      project: t.dataset.project,
      apiUrl: t.dataset.apiUrl,
      position: t.dataset.position || "bottom-right",
      captureSession: t.dataset.captureSession !== "false",
      autoReportErrors: t.dataset.autoReportErrors !== "false"
    });
  });
}
export {
  Ge as initBugWidget
};
//# sourceMappingURL=bug-widget.es.js.map
