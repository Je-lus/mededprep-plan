const m = "bw__", c = {
  button: `${m}btn`,
  buttonMinimized: `${m}btn--minimized`,
  buttonDragging: `${m}btn--dragging`,
  overlay: `${m}overlay`,
  content: `${m}content`,
  header: `${m}header`,
  textarea: `${m}textarea`,
  submit: `${m}submit`,
  close: `${m}close`,
  status: `${m}status`,
  spinner: `${m}spinner`
};
function Dt(t, e = 99999) {
  if (document.getElementById(`${m}styles`)) return;
  const n = t.includes("right"), r = t.includes("bottom"), i = e + 1, s = `
    .${c.button} {
      position: fixed;
      ${r ? "bottom: 20px" : "top: 20px"};
      ${n ? "right: 20px" : "left: 20px"};
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
      transition: transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
      padding: 0;
      opacity: 0;
      animation: ${m}fadeIn 0.4s ease 2s forwards;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      min-width: 44px;
      min-height: 44px;
    }
    @keyframes ${m}fadeIn {
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
      opacity: 0.5;
      border-width: 0;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
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
      transition: opacity 0.2s ease;
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
      transition: opacity 0.2s ease;
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
      transition: opacity 0.2s ease, visibility 0.2s ease;
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
      transition: border-color 0.2s;
    }
    .${c.textarea}:focus {
      border-color: #e94560;
    }
    .${c.textarea}::placeholder {
      color: #999;
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
      transition: background 0.2s;
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
      animation: ${m}spin 0.6s linear infinite;
      vertical-align: middle;
      margin-right: 8px;
    }
    @keyframes ${m}spin {
      to { transform: rotate(360deg); }
    }

    /* Mobile: smaller icon, full-screen modal */
    @media (max-width: 480px) {
      .${c.button} {
        width: 36px;
        height: 36px;
        ${r ? "bottom: 16px" : "top: 16px"};
        ${n ? "right: 16px" : "left: 16px"};
      }
      .${c.button} svg {
        width: 18px;
        height: 18px;
      }
      .${c.button}.${c.buttonMinimized}:hover,
      .${c.button}.${c.buttonMinimized}:focus {
        width: 36px;
        height: 36px;
      }
      .${c.content} {
        width: 100%;
        max-width: 100%;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
        padding: 16px;
        display: flex;
        flex-direction: column;
      }
      .${c.textarea} {
        flex: 1;
        min-height: 100px;
      }
    }
  `, o = document.createElement("style");
  o.id = `${m}styles`, o.textContent = s, document.head.appendChild(o);
}
function Mt(t, e) {
  if (t.match(/^[a-z]+:\/\//i))
    return t;
  if (t.match(/^\/\//))
    return window.location.protocol + t;
  if (t.match(/^[a-z]+:/i))
    return t;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), i = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(i), e && (r.href = e), i.href = t, i.href;
}
const Ht = /* @__PURE__ */ (() => {
  let t = 0;
  const e = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (t += 1, `u${e()}${t}`);
})();
function T(t) {
  const e = [];
  for (let n = 0, r = t.length; n < r; n++)
    e.push(t[n]);
  return e;
}
let k = null;
function lt(t = {}) {
  return k || (t.includeStyleProperties ? (k = t.includeStyleProperties, k) : (k = T(window.getComputedStyle(document.documentElement)), k));
}
function j(t, e) {
  const r = (t.ownerDocument.defaultView || window).getComputedStyle(t).getPropertyValue(e);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function _t(t) {
  const e = j(t, "border-left-width"), n = j(t, "border-right-width");
  return t.clientWidth + e + n;
}
function It(t) {
  const e = j(t, "border-top-width"), n = j(t, "border-bottom-width");
  return t.clientHeight + e + n;
}
function ut(t, e = {}) {
  const n = e.width || _t(t), r = e.height || It(t);
  return { width: n, height: r };
}
function At() {
  let t, e;
  try {
    e = process;
  } catch {
  }
  const n = e && e.env ? e.env.devicePixelRatio : null;
  return n && (t = parseInt(n, 10), Number.isNaN(t) && (t = 1)), t || window.devicePixelRatio || 1;
}
const b = 16384;
function Ot(t) {
  (t.width > b || t.height > b) && (t.width > b && t.height > b ? t.width > t.height ? (t.height *= b / t.width, t.width = b) : (t.width *= b / t.height, t.height = b) : t.width > b ? (t.height *= b / t.width, t.width = b) : (t.width *= b / t.height, t.height = b));
}
function B(t) {
  return new Promise((e, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => e(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = t;
  });
}
async function zt(t) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then((e) => `data:image/svg+xml;charset=utf-8,${e}`);
}
async function Ft(t, e, n) {
  const r = "http://www.w3.org/2000/svg", i = document.createElementNS(r, "svg"), s = document.createElementNS(r, "foreignObject");
  return i.setAttribute("width", `${e}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${e} ${n}`), s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("x", "0"), s.setAttribute("y", "0"), s.setAttribute("externalResourcesRequired", "true"), i.appendChild(s), s.appendChild(t), zt(i);
}
const w = (t, e) => {
  if (t instanceof e)
    return !0;
  const n = Object.getPrototypeOf(t);
  return n === null ? !1 : n.constructor.name === e.name || w(n, e);
};
function Ut(t) {
  const e = t.getPropertyValue("content");
  return `${t.cssText} content: '${e.replace(/'|"/g, "")}';`;
}
function qt(t, e) {
  return lt(e).map((n) => {
    const r = t.getPropertyValue(n), i = t.getPropertyPriority(n);
    return `${n}: ${r}${i ? " !important" : ""};`;
  }).join(" ");
}
function jt(t, e, n, r) {
  const i = `.${t}:${e}`, s = n.cssText ? Ut(n) : qt(n, r);
  return document.createTextNode(`${i}{${s}}`);
}
function N(t, e, n, r) {
  const i = window.getComputedStyle(t, n), s = i.getPropertyValue("content");
  if (s === "" || s === "none")
    return;
  const o = Ht();
  try {
    e.className = `${e.className} ${o}`;
  } catch {
    return;
  }
  const a = document.createElement("style");
  a.appendChild(jt(o, n, i, r)), e.appendChild(a);
}
function Bt(t, e, n) {
  N(t, e, ":before", n), N(t, e, ":after", n);
}
const tt = "application/font-woff", et = "image/jpeg", Wt = {
  woff: tt,
  woff2: tt,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: et,
  jpeg: et,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Vt(t) {
  const e = /\.([^./]*?)$/g.exec(t);
  return e ? e[1] : "";
}
function J(t) {
  const e = Vt(t).toLowerCase();
  return Wt[e] || "";
}
function Xt(t) {
  return t.split(/,/)[1];
}
function Y(t) {
  return t.search(/^(data:)/) !== -1;
}
function Gt(t, e) {
  return `data:${e};base64,${t}`;
}
async function ht(t, e, n) {
  const r = await fetch(t, e);
  if (r.status === 404)
    throw new Error(`Resource "${r.url}" not found`);
  const i = await r.blob();
  return new Promise((s, o) => {
    const a = new FileReader();
    a.onerror = o, a.onloadend = () => {
      try {
        s(n({ res: r, result: a.result }));
      } catch (l) {
        o(l);
      }
    }, a.readAsDataURL(i);
  });
}
const G = {};
function Yt(t, e, n) {
  let r = t.replace(/\?.*/, "");
  return n && (r = t), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), e ? `[${e}]${r}` : r;
}
async function K(t, e, n) {
  const r = Yt(t, e, n.includeQueryParams);
  if (G[r] != null)
    return G[r];
  n.cacheBust && (t += (/\?/.test(t) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let i;
  try {
    const s = await ht(t, n.fetchRequestInit, ({ res: o, result: a }) => (e || (e = o.headers.get("Content-Type") || ""), Xt(a)));
    i = Gt(s, e);
  } catch (s) {
    i = n.imagePlaceholder || "";
    let o = `Failed to fetch resource: ${t}`;
    s && (o = typeof s == "string" ? s : s.message), o && console.warn(o);
  }
  return G[r] = i, i;
}
async function Jt(t) {
  const e = t.toDataURL();
  return e === "data:," ? t.cloneNode(!1) : B(e);
}
async function Kt(t, e) {
  if (t.currentSrc) {
    const s = document.createElement("canvas"), o = s.getContext("2d");
    s.width = t.clientWidth, s.height = t.clientHeight, o == null || o.drawImage(t, 0, 0, s.width, s.height);
    const a = s.toDataURL();
    return B(a);
  }
  const n = t.poster, r = J(n), i = await K(n, r, e);
  return B(i);
}
async function Zt(t, e) {
  var n;
  try {
    if (!((n = t == null ? void 0 : t.contentDocument) === null || n === void 0) && n.body)
      return await W(t.contentDocument.body, e, !0);
  } catch {
  }
  return t.cloneNode(!1);
}
async function Qt(t, e) {
  return w(t, HTMLCanvasElement) ? Jt(t) : w(t, HTMLVideoElement) ? Kt(t, e) : w(t, HTMLIFrameElement) ? Zt(t, e) : t.cloneNode(dt(t));
}
const Nt = (t) => t.tagName != null && t.tagName.toUpperCase() === "SLOT", dt = (t) => t.tagName != null && t.tagName.toUpperCase() === "SVG";
async function te(t, e, n) {
  var r, i;
  if (dt(e))
    return e;
  let s = [];
  return Nt(t) && t.assignedNodes ? s = T(t.assignedNodes()) : w(t, HTMLIFrameElement) && (!((r = t.contentDocument) === null || r === void 0) && r.body) ? s = T(t.contentDocument.body.childNodes) : s = T(((i = t.shadowRoot) !== null && i !== void 0 ? i : t).childNodes), s.length === 0 || w(t, HTMLVideoElement) || await s.reduce((o, a) => o.then(() => W(a, n)).then((l) => {
    l && e.appendChild(l);
  }), Promise.resolve()), e;
}
function ee(t, e, n) {
  const r = e.style;
  if (!r)
    return;
  const i = window.getComputedStyle(t);
  i.cssText ? (r.cssText = i.cssText, r.transformOrigin = i.transformOrigin) : lt(n).forEach((s) => {
    let o = i.getPropertyValue(s);
    s === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), w(t, HTMLIFrameElement) && s === "display" && o === "inline" && (o = "block"), s === "d" && e.getAttribute("d") && (o = `path(${e.getAttribute("d")})`), r.setProperty(s, o, i.getPropertyPriority(s));
  });
}
function ne(t, e) {
  w(t, HTMLTextAreaElement) && (e.innerHTML = t.value), w(t, HTMLInputElement) && e.setAttribute("value", t.value);
}
function re(t, e) {
  if (w(t, HTMLSelectElement)) {
    const n = e, r = Array.from(n.children).find((i) => t.value === i.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function se(t, e, n) {
  return w(e, Element) && (ee(t, e, n), Bt(t, e, n), ne(t, e), re(t, e)), e;
}
async function ie(t, e) {
  const n = t.querySelectorAll ? t.querySelectorAll("use") : [];
  if (n.length === 0)
    return t;
  const r = {};
  for (let s = 0; s < n.length; s++) {
    const a = n[s].getAttribute("xlink:href");
    if (a) {
      const l = t.querySelector(a), p = document.querySelector(a);
      !l && p && !r[a] && (r[a] = await W(p, e, !0));
    }
  }
  const i = Object.values(r);
  if (i.length) {
    const s = "http://www.w3.org/1999/xhtml", o = document.createElementNS(s, "svg");
    o.setAttribute("xmlns", s), o.style.position = "absolute", o.style.width = "0", o.style.height = "0", o.style.overflow = "hidden", o.style.display = "none";
    const a = document.createElementNS(s, "defs");
    o.appendChild(a);
    for (let l = 0; l < i.length; l++)
      a.appendChild(i[l]);
    t.appendChild(o);
  }
  return t;
}
async function W(t, e, n) {
  return !n && e.filter && !e.filter(t) ? null : Promise.resolve(t).then((r) => Qt(r, e)).then((r) => te(t, r, e)).then((r) => se(t, r, e)).then((r) => ie(r, e));
}
const ft = /url\((['"]?)([^'"]+?)\1\)/g, oe = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, ae = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function ce(t) {
  const e = t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`, "g");
}
function le(t) {
  const e = [];
  return t.replace(ft, (n, r, i) => (e.push(i), n)), e.filter((n) => !Y(n));
}
async function ue(t, e, n, r, i) {
  try {
    const s = n ? Mt(e, n) : e, o = J(e);
    let a;
    return i || (a = await K(s, o, r)), t.replace(ce(e), `$1${a}$3`);
  } catch {
  }
  return t;
}
function he(t, { preferredFontFormat: e }) {
  return e ? t.replace(ae, (n) => {
    for (; ; ) {
      const [r, , i] = oe.exec(n) || [];
      if (!i)
        return "";
      if (i === e)
        return `src: ${r};`;
    }
  }) : t;
}
function mt(t) {
  return t.search(ft) !== -1;
}
async function pt(t, e, n) {
  if (!mt(t))
    return t;
  const r = he(t, n);
  return le(r).reduce((s, o) => s.then((a) => ue(a, o, e, n)), Promise.resolve(r));
}
async function P(t, e, n) {
  var r;
  const i = (r = e.style) === null || r === void 0 ? void 0 : r.getPropertyValue(t);
  if (i) {
    const s = await pt(i, null, n);
    return e.style.setProperty(t, s, e.style.getPropertyPriority(t)), !0;
  }
  return !1;
}
async function de(t, e) {
  await P("background", t, e) || await P("background-image", t, e), await P("mask", t, e) || await P("-webkit-mask", t, e) || await P("mask-image", t, e) || await P("-webkit-mask-image", t, e);
}
async function fe(t, e) {
  const n = w(t, HTMLImageElement);
  if (!(n && !Y(t.src)) && !(w(t, SVGImageElement) && !Y(t.href.baseVal)))
    return;
  const r = n ? t.src : t.href.baseVal, i = await K(r, J(r), e);
  await new Promise((s, o) => {
    t.onload = s, t.onerror = e.onImageErrorHandler ? (...l) => {
      try {
        s(e.onImageErrorHandler(...l));
      } catch (p) {
        o(p);
      }
    } : o;
    const a = t;
    a.decode && (a.decode = s), a.loading === "lazy" && (a.loading = "eager"), n ? (t.srcset = "", t.src = i) : t.href.baseVal = i;
  });
}
async function me(t, e) {
  const r = T(t.childNodes).map((i) => gt(i, e));
  await Promise.all(r).then(() => t);
}
async function gt(t, e) {
  w(t, Element) && (await de(t, e), await fe(t, e), await me(t, e));
}
function pe(t, e) {
  const { style: n } = t;
  e.backgroundColor && (n.backgroundColor = e.backgroundColor), e.width && (n.width = `${e.width}px`), e.height && (n.height = `${e.height}px`);
  const r = e.style;
  return r != null && Object.keys(r).forEach((i) => {
    n[i] = r[i];
  }), t;
}
const nt = {};
async function rt(t) {
  let e = nt[t];
  if (e != null)
    return e;
  const r = await (await fetch(t)).text();
  return e = { url: t, cssText: r }, nt[t] = e, e;
}
async function st(t, e) {
  let n = t.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, s = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let a = o.replace(r, "$1");
    return a.startsWith("https://") || (a = new URL(a, t.url).href), ht(a, e.fetchRequestInit, ({ result: l }) => (n = n.replace(o, `url(${l})`), [o, l]));
  });
  return Promise.all(s).then(() => n);
}
function it(t) {
  if (t == null)
    return [];
  const e = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let r = t.replace(n, "");
  const i = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const l = i.exec(r);
    if (l === null)
      break;
    e.push(l[0]);
  }
  r = r.replace(i, "");
  const s = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, o = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", a = new RegExp(o, "gi");
  for (; ; ) {
    let l = s.exec(r);
    if (l === null) {
      if (l = a.exec(r), l === null)
        break;
      s.lastIndex = a.lastIndex;
    } else
      a.lastIndex = s.lastIndex;
    e.push(l[0]);
  }
  return e;
}
async function ge(t, e) {
  const n = [], r = [];
  return t.forEach((i) => {
    if ("cssRules" in i)
      try {
        T(i.cssRules || []).forEach((s, o) => {
          if (s.type === CSSRule.IMPORT_RULE) {
            let a = o + 1;
            const l = s.href, p = rt(l).then((d) => st(d, e)).then((d) => it(d).forEach((u) => {
              try {
                i.insertRule(u, u.startsWith("@import") ? a += 1 : i.cssRules.length);
              } catch (g) {
                console.error("Error inserting rule from remote css", {
                  rule: u,
                  error: g
                });
              }
            })).catch((d) => {
              console.error("Error loading remote css", d.toString());
            });
            r.push(p);
          }
        });
      } catch (s) {
        const o = t.find((a) => a.href == null) || document.styleSheets[0];
        i.href != null && r.push(rt(i.href).then((a) => st(a, e)).then((a) => it(a).forEach((l) => {
          o.insertRule(l, o.cssRules.length);
        })).catch((a) => {
          console.error("Error loading remote stylesheet", a);
        })), console.error("Error inlining remote css file", s);
      }
  }), Promise.all(r).then(() => (t.forEach((i) => {
    if ("cssRules" in i)
      try {
        T(i.cssRules || []).forEach((s) => {
          n.push(s);
        });
      } catch (s) {
        console.error(`Error while reading CSS rules from ${i.href}`, s);
      }
  }), n));
}
function we(t) {
  return t.filter((e) => e.type === CSSRule.FONT_FACE_RULE).filter((e) => mt(e.style.getPropertyValue("src")));
}
async function ye(t, e) {
  if (t.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = T(t.ownerDocument.styleSheets), r = await ge(n, e);
  return we(r);
}
function wt(t) {
  return t.trim().replace(/["']/g, "");
}
function be(t) {
  const e = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((s) => {
      e.add(wt(s));
    }), Array.from(r.children).forEach((s) => {
      s instanceof HTMLElement && n(s);
    });
  }
  return n(t), e;
}
async function xe(t, e) {
  const n = await ye(t, e), r = be(t);
  return (await Promise.all(n.filter((s) => r.has(wt(s.style.fontFamily))).map((s) => {
    const o = s.parentStyleSheet ? s.parentStyleSheet.href : null;
    return pt(s.cssText, o, e);
  }))).join(`
`);
}
async function ve(t, e) {
  const n = e.fontEmbedCSS != null ? e.fontEmbedCSS : e.skipFonts ? null : await xe(t, e);
  if (n) {
    const r = document.createElement("style"), i = document.createTextNode(n);
    r.appendChild(i), t.firstChild ? t.insertBefore(r, t.firstChild) : t.appendChild(r);
  }
}
async function Ee(t, e = {}) {
  const { width: n, height: r } = ut(t, e), i = await W(t, e, !0);
  return await ve(i, e), await gt(i, e), pe(i, e), await Ft(i, n, r);
}
async function Se(t, e = {}) {
  const { width: n, height: r } = ut(t, e), i = await Ee(t, e), s = await B(i), o = document.createElement("canvas"), a = o.getContext("2d"), l = e.pixelRatio || At(), p = e.canvasWidth || n, d = e.canvasHeight || r;
  return o.width = p * l, o.height = d * l, e.skipAutoScale || Ot(o), o.style.width = `${p}`, o.style.height = `${d}`, e.backgroundColor && (a.fillStyle = e.backgroundColor, a.fillRect(0, 0, o.width, o.height)), a.drawImage(s, 0, 0, o.width, o.height), o;
}
async function $e(t, e = {}) {
  return (await Se(t, e)).toDataURL();
}
const E = [], S = [], D = 50;
let ot = !1;
const q = [];
function Re(t) {
  return q.push(t), () => {
    const e = q.indexOf(t);
    e >= 0 && q.splice(e, 1);
  };
}
function at(t) {
  for (const e of q)
    try {
      e(t);
    } catch {
    }
}
function Te(t) {
  const e = {};
  if (!t) return e;
  const n = (r, i) => {
    e[r.toLowerCase()] = i;
  };
  if (t instanceof Headers)
    t.forEach((r, i) => n(i, r));
  else if (Array.isArray(t))
    for (const [r, i] of t)
      n(r, i);
  else
    for (const [r, i] of Object.entries(t))
      n(r, i);
  return e;
}
function Le() {
  if (ot) return;
  ot = !0;
  const t = console.error;
  console.error = (...s) => {
    const a = {
      message: s.map((l) => {
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
    s[0] instanceof Error && (a.stack = s[0].stack), E.push(a), E.length > D && E.shift(), t.apply(console, s);
  }, window.addEventListener("error", (s) => {
    var o;
    E.push({
      message: s.message || "Unknown error",
      timestamp: Date.now(),
      stack: (o = s.error) == null ? void 0 : o.stack
    }), E.length > D && E.shift();
  }), window.addEventListener("unhandledrejection", (s) => {
    var a;
    const o = s.reason instanceof Error ? s.reason.message : String(s.reason);
    E.push({
      message: `Unhandled Promise: ${o}`,
      timestamp: Date.now(),
      stack: (a = s.reason) == null ? void 0 : a.stack
    }), E.length > D && E.shift();
  });
  const e = window.fetch;
  window.fetch = async (...s) => {
    var d;
    const o = new Request(...s), a = o.method, l = o.url, p = Te(
      s[0] instanceof Request ? s[0].headers : (d = s[1]) == null ? void 0 : d.headers
    );
    try {
      const u = await e(...s);
      if (!u.ok) {
        let g = "";
        try {
          g = (await u.clone().text()).slice(0, 500);
        } catch {
          g = "[Could not read response body]";
        }
        const y = {
          url: l,
          method: a,
          status: u.status,
          statusText: u.statusText,
          responseBody: g,
          requestHeaders: p,
          timestamp: Date.now()
        };
        S.push({
          url: l,
          method: a,
          status: u.status,
          statusText: u.statusText,
          timestamp: Date.now(),
          responseBody: g,
          requestHeaders: p
        }), S.length > D && S.shift(), u.status >= 400 && at(y);
      }
      return u;
    } catch (u) {
      throw S.push({
        url: l,
        method: a,
        status: 0,
        statusText: u instanceof Error ? u.message : "Network Error",
        timestamp: Date.now()
      }), S.length > D && S.shift(), u;
    }
  };
  const n = XMLHttpRequest.prototype.open, r = XMLHttpRequest.prototype.send, i = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.open = function(s, o, ...a) {
    const l = this;
    return l._bw_method = s, l._bw_url = String(o), l._bw_headers = {}, n.call(this, s, o, ...a);
  }, XMLHttpRequest.prototype.setRequestHeader = function(s, o) {
    const a = this;
    return a._bw_headers && (a._bw_headers[s.toLowerCase()] = o), i.call(this, s, o);
  }, XMLHttpRequest.prototype.send = function(...s) {
    return this.addEventListener("loadend", () => {
      if (this.status >= 400 || this.status === 0) {
        const o = this;
        let a = "";
        try {
          a = (this.responseText || "").slice(0, 500);
        } catch {
          a = "[Could not read response body]";
        }
        const l = {
          url: o._bw_url || "",
          method: o._bw_method || "GET",
          status: this.status,
          statusText: this.statusText || "Error",
          timestamp: Date.now(),
          responseBody: a,
          requestHeaders: o._bw_headers || {}
        };
        S.push(l), S.length > D && S.shift(), this.status >= 400 && at({
          url: o._bw_url || "",
          method: o._bw_method || "GET",
          status: this.status,
          statusText: this.statusText || "Error",
          responseBody: a,
          requestHeaders: o._bw_headers || {},
          timestamp: Date.now()
        });
      }
    }), r.apply(this, s);
  };
}
async function yt() {
  try {
    return await $e(document.body, {
      quality: 0.7,
      pixelRatio: 1,
      filter: (e) => {
        var n;
        return e instanceof HTMLElement ? !((n = e.className) != null && n.toString().includes("bw__")) : !0;
      }
    });
  } catch (t) {
    return console.warn("[BugWidget] Screenshot capture failed:", t), null;
  }
}
function bt() {
  return [...E];
}
function xt() {
  return [...S];
}
function vt() {
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
class Ce {
  constructor(e = 50) {
    this.events = [], this.scrollTimeout = null, this.maxScrollDepth = 0, this.active = !1, this.handleClick = (n) => {
      const r = n.target;
      if (!r) return;
      const i = this.buildSelector(r), s = this.getSafeText(r);
      this.addEvent({
        type: "click",
        timestamp: Date.now(),
        data: { selector: i, text: s }
      });
    }, this.handleScroll = () => {
      this.scrollTimeout || (this.scrollTimeout = setTimeout(() => {
        this.scrollTimeout = null;
        const n = window.scrollY || document.documentElement.scrollTop, r = document.documentElement.scrollHeight - window.innerHeight, i = r > 0 ? Math.round(n / r * 100) : 0;
        i > this.maxScrollDepth && (this.maxScrollDepth = i, this.addEvent({
          type: "scroll",
          timestamp: Date.now(),
          data: { depth: i, maxDepth: this.maxScrollDepth }
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
    let r = e, i = 0;
    for (; r && i < 3; ) {
      let s = r.tagName.toLowerCase();
      if (r.id) {
        s += `#${r.id}`, n.unshift(s);
        break;
      }
      if (r.className && typeof r.className == "string") {
        const o = r.className.split(/\s+/).filter((a) => a && !a.startsWith("bw__")).slice(0, 2).join(".");
        o && (s += `.${o}`);
      }
      n.unshift(s), r = r.parentElement, i++;
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
const I = "bw__pending_reports";
async function ke(t, e, n) {
  const r = await yt();
  return {
    project: t,
    url: window.location.href,
    trigger: "user-click",
    description: e,
    screenshot: r,
    consoleErrors: bt(),
    networkErrors: xt(),
    sessionEvents: n ? n.getEvents() : [],
    environment: vt(),
    timeOnPage: n ? n.getTimeOnPage() : 0,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function Et(t, e) {
  try {
    const n = await fetch(t, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e)
    });
    if (!n.ok)
      throw new Error(`Server responded with ${n.status}`);
    return $t(t), !0;
  } catch (n) {
    return console.warn("[BugWidget] Report submission failed, saving to localStorage:", n), Pe(e), !1;
  }
}
function Pe(t) {
  try {
    const e = St();
    e.push(t);
    const n = e.slice(-10);
    localStorage.setItem(I, JSON.stringify(n));
  } catch {
  }
}
function St() {
  try {
    const t = localStorage.getItem(I);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function De(t, e = 3e5) {
  const n = setInterval(() => {
    const r = localStorage.getItem(I);
    r && r !== "[]" && $t(t);
  }, e);
  return () => clearInterval(n);
}
async function $t(t) {
  const e = St();
  if (e.length === 0) return;
  const n = [];
  for (const r of e)
    try {
      (await fetch(t, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(r)
      })).ok || n.push(r);
    } catch {
      n.push(r);
    }
  n.length > 0 ? localStorage.setItem(I, JSON.stringify(n)) : localStorage.removeItem(I);
}
const Me = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/></svg>', ct = "bw__position", He = 1e4;
function _e(t, e, n, r, i) {
  const s = document.createElement("button");
  s.className = c.button, s.innerHTML = Me, s.setAttribute("aria-label", "Report a bug"), s.setAttribute("title", "Report a bug");
  const o = document.createElement("div");
  o.className = c.overlay, o.innerHTML = `
    <div class="${c.content}">
      <div class="${c.header}">
        <h3>Report a Bug</h3>
        <button class="${c.close}" aria-label="Close">&times;</button>
      </div>
      <textarea class="${c.textarea}" placeholder="What went wrong? Describe what you were doing and what happened..."></textarea>
      <button class="${c.submit}">Submit Report</button>
      <div class="${c.status}"></div>
    </div>
  `, document.body.appendChild(s), document.body.appendChild(o);
  const a = o.querySelector(`.${c.textarea}`), l = o.querySelector(`.${c.submit}`), p = o.querySelector(`.${c.close}`), d = o.querySelector(`.${c.status}`);
  let u = null;
  function g() {
    u && clearTimeout(u), s.classList.remove(c.buttonMinimized), u = setTimeout(() => {
      o.classList.contains("active") || s.classList.add(c.buttonMinimized);
    }, He);
  }
  setTimeout(g, 2400), s.addEventListener("mouseenter", g), s.addEventListener("touchstart", g, { passive: !0 });
  let y = !1, x = !1, R = 0, A = 0, v = 0, L = 0, $;
  const V = Tt();
  V && Q(V.x, V.y);
  function Z(h) {
    return "touches" in h ? { x: h.touches[0].clientX, y: h.touches[0].clientY } : { x: h.clientX, y: h.clientY };
  }
  function O(h) {
    if (o.classList.contains("active")) return;
    g(), $ = s.getBoundingClientRect();
    const f = Z(h);
    R = f.x, A = f.y, v = $.left, L = $.top, y = !0, x = !1, h.preventDefault();
  }
  function z(h) {
    if (!y) return;
    const f = Z(h), H = f.x - R, _ = f.y - A;
    if (!x && Math.abs(H) < 5 && Math.abs(_) < 5) return;
    x = !0, s.classList.add(c.buttonDragging);
    const X = v + H, C = L + _, U = window.innerWidth - $.width, Ct = window.innerHeight - $.height, kt = Math.max(0, Math.min(X, U)), Pt = Math.max(0, Math.min(C, Ct));
    s.style.left = `${kt}px`, s.style.top = `${Pt}px`, s.style.right = "auto", s.style.bottom = "auto";
  }
  function F(h) {
    if (!y || (y = !1, s.classList.remove(c.buttonDragging), !x))
      return;
    const f = s.getBoundingClientRect(), H = f.left + f.width / 2, _ = window.innerWidth, X = window.innerHeight;
    let C, U = Math.max(8, Math.min(f.top, X - f.height - 8));
    H < _ / 2 ? C = 16 : C = _ - f.width - 16, Q(C, U), Rt(C, U), h.preventDefault();
  }
  function Q(h, f) {
    s.style.left = `${h}px`, s.style.top = `${f}px`, s.style.right = "auto", s.style.bottom = "auto";
  }
  function Rt(h, f) {
    try {
      localStorage.setItem(ct, JSON.stringify({ x: h, y: f }));
    } catch {
    }
  }
  function Tt() {
    try {
      const h = localStorage.getItem(ct);
      if (!h) return null;
      const f = JSON.parse(h);
      return f.x >= 0 && f.x < window.innerWidth - 20 && f.y >= 0 && f.y < window.innerHeight - 20 ? f : null;
    } catch {
      return null;
    }
  }
  s.addEventListener("mousedown", O), document.addEventListener("mousemove", z), document.addEventListener("mouseup", F), s.addEventListener("touchstart", O, { passive: !1 }), document.addEventListener("touchmove", z, { passive: !0 }), document.addEventListener("touchend", F);
  function Lt() {
    o.classList.add("active"), a.value = "", d.textContent = "", l.disabled = !1, u && clearTimeout(u), s.classList.remove(c.buttonMinimized), setTimeout(() => a.focus(), 100);
  }
  function M() {
    o.classList.remove("active"), g();
  }
  return s.addEventListener("click", (h) => {
    x || Lt(), x = !1;
  }), p.addEventListener("click", M), o.addEventListener("click", (h) => {
    h.target === o && M();
  }), document.addEventListener("keydown", (h) => {
    h.key === "Escape" && o.classList.contains("active") && M();
  }), l.addEventListener("click", async () => {
    const h = a.value.trim();
    if (!h) {
      d.textContent = "Please describe the issue.", d.style.color = "#e94560";
      return;
    }
    l.disabled = !0, d.innerHTML = `<span class="${c.spinner}"></span> Capturing context & submitting...`, d.style.color = "#666";
    try {
      const f = await ke(t, h, n);
      await Et(e, f) ? (d.textContent = "Bug report submitted. Thank you!", d.style.color = "#27ae60", setTimeout(M, 2e3)) : (d.textContent = "Saved locally. Will retry when connection is available.", d.style.color = "#f39c12", setTimeout(M, 3e3));
    } catch {
      d.textContent = "Failed to submit. Report saved locally for retry.", d.style.color = "#e94560", l.disabled = !1;
    }
  }), () => {
    u && clearTimeout(u), s.removeEventListener("mousedown", O), document.removeEventListener("mousemove", z), document.removeEventListener("mouseup", F), s.removeEventListener("touchstart", O), document.removeEventListener("touchmove", z), document.removeEventListener("touchend", F), s.remove(), o.remove();
  };
}
class Ie {
  constructor(e, n, r, i) {
    this.lastReportTime = 0, this.unsubscribe = null, this.project = e, this.apiUrl = n, this.sessionTracker = r, this.options = i;
  }
  start() {
    this.unsubscribe = Re((e) => {
      this.handleApiError(e);
    });
  }
  stop() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null);
  }
  async handleApiError(e) {
    const n = Date.now();
    if (!(n - this.lastReportTime < this.options.debounceMs)) {
      this.lastReportTime = n;
      try {
        const r = await yt(), i = this.sanitize(e.requestHeaders), s = {
          project: this.project,
          url: window.location.href,
          trigger: "auto-api-error",
          description: `Auto-reported: ${e.method} ${e.url} returned ${e.status} ${e.statusText}`,
          screenshot: r,
          consoleErrors: bt(),
          networkErrors: xt(),
          sessionEvents: this.sessionTracker ? this.sessionTracker.getEvents() : [],
          environment: vt(),
          timeOnPage: this.sessionTracker ? this.sessionTracker.getTimeOnPage() : 0,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          apiErrorContext: {
            url: e.url,
            method: e.method,
            status: e.status,
            statusText: e.statusText,
            responseBody: e.responseBody,
            requestHeaders: i
          }
        };
        await Et(this.apiUrl, s);
      } catch (r) {
        console.warn("[BugWidget] Auto-report failed:", r);
      }
    }
  }
  sanitize(e) {
    const n = {};
    for (const [r, i] of Object.entries(e))
      this.options.sanitizeHeaders.includes(r.toLowerCase()) ? n[r] = "[REDACTED]" : n[r] = i;
    return n;
  }
}
function Ae(t) {
  const {
    project: e,
    apiUrl: n,
    position: r = "bottom-right",
    captureSession: i = !0,
    maxSessionEvents: s = 50,
    autoReportErrors: o = !0,
    autoReportDebounceMs: a = 3e4,
    zIndex: l = 99999,
    exclude: p = [],
    sanitizeHeaders: d = [],
    headless: u = !1
  } = t;
  if (!e || !n)
    throw new Error('[BugWidget] "project" and "apiUrl" are required config options.');
  const g = window.location.href;
  for (const v of p)
    if (Oe(v, g))
      return { destroy() {
      } };
  Le();
  let y = null;
  i && (y = new Ce(s), y.start());
  let x = null;
  u || (Dt(r, l), x = _e(e, n, y));
  let R = null;
  o && (R = new Ie(e, n, y, {
    debounceMs: a,
    sanitizeHeaders: [
      "authorization",
      "cookie",
      "x-auth-token",
      "x-api-key",
      "x-csrf-token",
      ...d.map((v) => v.toLowerCase())
    ]
  }), R.start());
  const A = De(n);
  return {
    destroy() {
      if (A(), y && y.stop(), R && R.stop(), x && x(), !u) {
        const v = document.querySelector(".bw__btn"), L = document.querySelector(".bw__overlay"), $ = document.getElementById("bw__styles");
        v == null || v.remove(), L == null || L.remove(), $ == null || $.remove();
      }
    }
  };
}
function Oe(t, e) {
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
    Ae({
      project: t.dataset.project,
      apiUrl: t.dataset.apiUrl,
      position: t.dataset.position || "bottom-right",
      captureSession: t.dataset.captureSession !== "false",
      autoReportErrors: t.dataset.autoReportErrors !== "false"
    });
  });
}
export {
  Ae as initBugWidget
};
//# sourceMappingURL=bug-widget.es.js.map
