/* eslint-disable */
(function(D,h){typeof exports=="object"&&typeof module<"u"?h(exports):typeof define=="function"&&define.amd?define(["exports"],h):(D=typeof globalThis<"u"?globalThis:D||self,h(D.BugWidget={}))})(this,function(D){"use strict";const h="bw__",c={button:`${h}btn`,buttonMinimized:`${h}btn--minimized`,buttonDragging:`${h}btn--dragging`,overlay:`${h}overlay`,content:`${h}content`,header:`${h}header`,textarea:`${h}textarea`,submit:`${h}submit`,close:`${h}close`,status:`${h}status`,spinner:`${h}spinner`};function Ft(t,e=99999,n=0){if(document.getElementById(`${h}styles`))return;const r=t.includes("right"),o=t.includes("bottom"),i=e+1,s=`
    .${c.button} {
      position: fixed;
      ${o?`bottom: calc(${20+n}px + env(safe-area-inset-bottom, 0px))`:"top: calc(20px + env(safe-area-inset-top, 0px))"};
      ${r?"right: 20px":"left: 20px"};
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
    @keyframes ${h}fadeIn {
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
    @keyframes ${h}spin {
      to { transform: rotate(360deg); }
    }

    /* Motion is opt-in: fade/size transitions and the spinner only animate
       when the user has not asked for reduced motion. Without this block the
       button is simply visible (opacity 1) and state changes are instant. */
    @media (prefers-reduced-motion: no-preference) {
      .${c.button} {
        transition: transform 0.3s ease, box-shadow 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
        opacity: 0;
        animation: ${h}fadeIn 0.4s ease 2s forwards;
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
        animation: ${h}spin 0.6s linear infinite;
      }
    }

    /* Mobile: tighter edge margin, smaller icon, full-screen modal.
       The button stays at its effective 44px minimum (the old width/height
       36px declarations were dead: the base min-width/min-height 44px always
       won, so they are gone rather than pretending to shrink the button). */
    @media (max-width: 480px) {
      .${c.button} {
        ${o?`bottom: calc(${16+n}px + env(safe-area-inset-bottom, 0px))`:"top: calc(16px + env(safe-area-inset-top, 0px))"};
        ${r?"right: 16px":"left: 16px"};
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
  `,a=document.createElement("style");a.id=`${h}styles`,a.textContent=s,document.head.appendChild(a)}function qt(t,e){if(t.match(/^[a-z]+:\/\//i))return t;if(t.match(/^\/\//))return window.location.protocol+t;if(t.match(/^[a-z]+:/i))return t;const n=document.implementation.createHTMLDocument(),r=n.createElement("base"),o=n.createElement("a");return n.head.appendChild(r),n.body.appendChild(o),e&&(r.href=e),o.href=t,o.href}const Bt=(()=>{let t=0;const e=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(t+=1,`u${e()}${t}`)})();function C(t){const e=[];for(let n=0,r=t.length;n<r;n++)e.push(t[n]);return e}let P=null;function it(t={}){return P||(t.includeStyleProperties?(P=t.includeStyleProperties,P):(P=C(window.getComputedStyle(document.documentElement)),P))}function W(t,e){const r=(t.ownerDocument.defaultView||window).getComputedStyle(t).getPropertyValue(e);return r?parseFloat(r.replace("px","")):0}function Wt(t){const e=W(t,"border-left-width"),n=W(t,"border-right-width");return t.clientWidth+e+n}function jt(t){const e=W(t,"border-top-width"),n=W(t,"border-bottom-width");return t.clientHeight+e+n}function st(t,e={}){const n=e.width||Wt(t),r=e.height||jt(t);return{width:n,height:r}}function Vt(){let t,e;try{e=process}catch{}const n=e&&e.env?e.env.devicePixelRatio:null;return n&&(t=parseInt(n,10),Number.isNaN(t)&&(t=1)),t||window.devicePixelRatio||1}const y=16384;function Xt(t){(t.width>y||t.height>y)&&(t.width>y&&t.height>y?t.width>t.height?(t.height*=y/t.width,t.width=y):(t.width*=y/t.height,t.height=y):t.width>y?(t.height*=y/t.width,t.width=y):(t.width*=y/t.height,t.height=y))}function j(t){return new Promise((e,n)=>{const r=new Image;r.onload=()=>{r.decode().then(()=>{requestAnimationFrame(()=>e(r))})},r.onerror=n,r.crossOrigin="anonymous",r.decoding="async",r.src=t})}async function Gt(t){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then(e=>`data:image/svg+xml;charset=utf-8,${e}`)}async function Yt(t,e,n){const r="http://www.w3.org/2000/svg",o=document.createElementNS(r,"svg"),i=document.createElementNS(r,"foreignObject");return o.setAttribute("width",`${e}`),o.setAttribute("height",`${n}`),o.setAttribute("viewBox",`0 0 ${e} ${n}`),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.setAttribute("x","0"),i.setAttribute("y","0"),i.setAttribute("externalResourcesRequired","true"),o.appendChild(i),i.appendChild(t),Gt(o)}const w=(t,e)=>{if(t instanceof e)return!0;const n=Object.getPrototypeOf(t);return n===null?!1:n.constructor.name===e.name||w(n,e)};function Jt(t){const e=t.getPropertyValue("content");return`${t.cssText} content: '${e.replace(/'|"/g,"")}';`}function Kt(t,e){return it(e).map(n=>{const r=t.getPropertyValue(n),o=t.getPropertyPriority(n);return`${n}: ${r}${o?" !important":""};`}).join(" ")}function Zt(t,e,n,r){const o=`.${t}:${e}`,i=n.cssText?Jt(n):Kt(n,r);return document.createTextNode(`${o}{${i}}`)}function ot(t,e,n,r){const o=window.getComputedStyle(t,n),i=o.getPropertyValue("content");if(i===""||i==="none")return;const s=Bt();try{e.className=`${e.className} ${s}`}catch{return}const a=document.createElement("style");a.appendChild(Zt(s,n,o,r)),e.appendChild(a)}function Qt(t,e,n){ot(t,e,":before",n),ot(t,e,":after",n)}const at="application/font-woff",ct="image/jpeg",Nt={woff:at,woff2:at,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:ct,jpeg:ct,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function te(t){const e=/\.([^./]*?)$/g.exec(t);return e?e[1]:""}function Q(t){const e=te(t).toLowerCase();return Nt[e]||""}function ee(t){return t.split(/,/)[1]}function N(t){return t.search(/^(data:)/)!==-1}function ne(t,e){return`data:${e};base64,${t}`}async function lt(t,e,n){const r=await fetch(t,e);if(r.status===404)throw new Error(`Resource "${r.url}" not found`);const o=await r.blob();return new Promise((i,s)=>{const a=new FileReader;a.onerror=s,a.onloadend=()=>{try{i(n({res:r,result:a.result}))}catch(l){s(l)}},a.readAsDataURL(o)})}const tt={};function re(t,e,n){let r=t.replace(/\?.*/,"");return n&&(r=t),/ttf|otf|eot|woff2?/i.test(r)&&(r=r.replace(/.*\//,"")),e?`[${e}]${r}`:r}async function et(t,e,n){const r=re(t,e,n.includeQueryParams);if(tt[r]!=null)return tt[r];n.cacheBust&&(t+=(/\?/.test(t)?"&":"?")+new Date().getTime());let o;try{const i=await lt(t,n.fetchRequestInit,({res:s,result:a})=>(e||(e=s.headers.get("Content-Type")||""),ee(a)));o=ne(i,e)}catch(i){o=n.imagePlaceholder||"";let s=`Failed to fetch resource: ${t}`;i&&(s=typeof i=="string"?i:i.message),s&&console.warn(s)}return tt[r]=o,o}async function ie(t){const e=t.toDataURL();return e==="data:,"?t.cloneNode(!1):j(e)}async function se(t,e){if(t.currentSrc){const i=document.createElement("canvas"),s=i.getContext("2d");i.width=t.clientWidth,i.height=t.clientHeight,s==null||s.drawImage(t,0,0,i.width,i.height);const a=i.toDataURL();return j(a)}const n=t.poster,r=Q(n),o=await et(n,r,e);return j(o)}async function oe(t,e){var n;try{if(!((n=t==null?void 0:t.contentDocument)===null||n===void 0)&&n.body)return await V(t.contentDocument.body,e,!0)}catch{}return t.cloneNode(!1)}async function ae(t,e){return w(t,HTMLCanvasElement)?ie(t):w(t,HTMLVideoElement)?se(t,e):w(t,HTMLIFrameElement)?oe(t,e):t.cloneNode(ut(t))}const ce=t=>t.tagName!=null&&t.tagName.toUpperCase()==="SLOT",ut=t=>t.tagName!=null&&t.tagName.toUpperCase()==="SVG";async function le(t,e,n){var r,o;if(ut(e))return e;let i=[];return ce(t)&&t.assignedNodes?i=C(t.assignedNodes()):w(t,HTMLIFrameElement)&&(!((r=t.contentDocument)===null||r===void 0)&&r.body)?i=C(t.contentDocument.body.childNodes):i=C(((o=t.shadowRoot)!==null&&o!==void 0?o:t).childNodes),i.length===0||w(t,HTMLVideoElement)||await i.reduce((s,a)=>s.then(()=>V(a,n)).then(l=>{l&&e.appendChild(l)}),Promise.resolve()),e}function ue(t,e,n){const r=e.style;if(!r)return;const o=window.getComputedStyle(t);o.cssText?(r.cssText=o.cssText,r.transformOrigin=o.transformOrigin):it(n).forEach(i=>{let s=o.getPropertyValue(i);i==="font-size"&&s.endsWith("px")&&(s=`${Math.floor(parseFloat(s.substring(0,s.length-2)))-.1}px`),w(t,HTMLIFrameElement)&&i==="display"&&s==="inline"&&(s="block"),i==="d"&&e.getAttribute("d")&&(s=`path(${e.getAttribute("d")})`),r.setProperty(i,s,o.getPropertyPriority(i))})}function de(t,e){w(t,HTMLTextAreaElement)&&(e.innerHTML=t.value),w(t,HTMLInputElement)&&e.setAttribute("value",t.value)}function he(t,e){if(w(t,HTMLSelectElement)){const n=e,r=Array.from(n.children).find(o=>t.value===o.getAttribute("value"));r&&r.setAttribute("selected","")}}function fe(t,e,n){return w(e,Element)&&(ue(t,e,n),Qt(t,e,n),de(t,e),he(t,e)),e}async function me(t,e){const n=t.querySelectorAll?t.querySelectorAll("use"):[];if(n.length===0)return t;const r={};for(let i=0;i<n.length;i++){const a=n[i].getAttribute("xlink:href");if(a){const l=t.querySelector(a),p=document.querySelector(a);!l&&p&&!r[a]&&(r[a]=await V(p,e,!0))}}const o=Object.values(r);if(o.length){const i="http://www.w3.org/1999/xhtml",s=document.createElementNS(i,"svg");s.setAttribute("xmlns",i),s.style.position="absolute",s.style.width="0",s.style.height="0",s.style.overflow="hidden",s.style.display="none";const a=document.createElementNS(i,"defs");s.appendChild(a);for(let l=0;l<o.length;l++)a.appendChild(o[l]);t.appendChild(s)}return t}async function V(t,e,n){return!n&&e.filter&&!e.filter(t)?null:Promise.resolve(t).then(r=>ae(r,e)).then(r=>le(t,r,e)).then(r=>fe(t,r,e)).then(r=>me(r,e))}const dt=/url\((['"]?)([^'"]+?)\1\)/g,pe=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,ge=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function we(t){const e=t.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`,"g")}function ye(t){const e=[];return t.replace(dt,(n,r,o)=>(e.push(o),n)),e.filter(n=>!N(n))}async function be(t,e,n,r,o){try{const i=n?qt(e,n):e,s=Q(e);let a;return o||(a=await et(i,s,r)),t.replace(we(e),`$1${a}$3`)}catch{}return t}function xe(t,{preferredFontFormat:e}){return e?t.replace(ge,n=>{for(;;){const[r,,o]=pe.exec(n)||[];if(!o)return"";if(o===e)return`src: ${r};`}}):t}function ht(t){return t.search(dt)!==-1}async function ft(t,e,n){if(!ht(t))return t;const r=xe(t,n);return ye(r).reduce((i,s)=>i.then(a=>be(a,s,e,n)),Promise.resolve(r))}async function H(t,e,n){var r;const o=(r=e.style)===null||r===void 0?void 0:r.getPropertyValue(t);if(o){const i=await ft(o,null,n);return e.style.setProperty(t,i,e.style.getPropertyPriority(t)),!0}return!1}async function ve(t,e){await H("background",t,e)||await H("background-image",t,e),await H("mask",t,e)||await H("-webkit-mask",t,e)||await H("mask-image",t,e)||await H("-webkit-mask-image",t,e)}async function Ee(t,e){const n=w(t,HTMLImageElement);if(!(n&&!N(t.src))&&!(w(t,SVGImageElement)&&!N(t.href.baseVal)))return;const r=n?t.src:t.href.baseVal,o=await et(r,Q(r),e);await new Promise((i,s)=>{t.onload=i,t.onerror=e.onImageErrorHandler?(...l)=>{try{i(e.onImageErrorHandler(...l))}catch(p){s(p)}}:s;const a=t;a.decode&&(a.decode=i),a.loading==="lazy"&&(a.loading="eager"),n?(t.srcset="",t.src=o):t.href.baseVal=o})}async function Se(t,e){const r=C(t.childNodes).map(o=>mt(o,e));await Promise.all(r).then(()=>t)}async function mt(t,e){w(t,Element)&&(await ve(t,e),await Ee(t,e),await Se(t,e))}function $e(t,e){const{style:n}=t;e.backgroundColor&&(n.backgroundColor=e.backgroundColor),e.width&&(n.width=`${e.width}px`),e.height&&(n.height=`${e.height}px`);const r=e.style;return r!=null&&Object.keys(r).forEach(o=>{n[o]=r[o]}),t}const pt={};async function gt(t){let e=pt[t];if(e!=null)return e;const r=await(await fetch(t)).text();return e={url:t,cssText:r},pt[t]=e,e}async function wt(t,e){let n=t.cssText;const r=/url\(["']?([^"')]+)["']?\)/g,i=(n.match(/url\([^)]+\)/g)||[]).map(async s=>{let a=s.replace(r,"$1");return a.startsWith("https://")||(a=new URL(a,t.url).href),lt(a,e.fetchRequestInit,({result:l})=>(n=n.replace(s,`url(${l})`),[s,l]))});return Promise.all(i).then(()=>n)}function yt(t){if(t==null)return[];const e=[],n=/(\/\*[\s\S]*?\*\/)/gi;let r=t.replace(n,"");const o=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const l=o.exec(r);if(l===null)break;e.push(l[0])}r=r.replace(o,"");const i=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,s="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",a=new RegExp(s,"gi");for(;;){let l=i.exec(r);if(l===null){if(l=a.exec(r),l===null)break;i.lastIndex=a.lastIndex}else a.lastIndex=i.lastIndex;e.push(l[0])}return e}async function Re(t,e){const n=[],r=[];return t.forEach(o=>{if("cssRules"in o)try{C(o.cssRules||[]).forEach((i,s)=>{if(i.type===CSSRule.IMPORT_RULE){let a=s+1;const l=i.href,p=gt(l).then(g=>wt(g,e)).then(g=>yt(g).forEach(f=>{try{o.insertRule(f,f.startsWith("@import")?a+=1:o.cssRules.length)}catch(m){console.error("Error inserting rule from remote css",{rule:f,error:m})}})).catch(g=>{console.error("Error loading remote css",g.toString())});r.push(p)}})}catch(i){const s=t.find(a=>a.href==null)||document.styleSheets[0];o.href!=null&&r.push(gt(o.href).then(a=>wt(a,e)).then(a=>yt(a).forEach(l=>{s.insertRule(l,s.cssRules.length)})).catch(a=>{console.error("Error loading remote stylesheet",a)})),console.error("Error inlining remote css file",i)}}),Promise.all(r).then(()=>(t.forEach(o=>{if("cssRules"in o)try{C(o.cssRules||[]).forEach(i=>{n.push(i)})}catch(i){console.error(`Error while reading CSS rules from ${o.href}`,i)}}),n))}function Te(t){return t.filter(e=>e.type===CSSRule.FONT_FACE_RULE).filter(e=>ht(e.style.getPropertyValue("src")))}async function Le(t,e){if(t.ownerDocument==null)throw new Error("Provided element is not within a Document");const n=C(t.ownerDocument.styleSheets),r=await Re(n,e);return Te(r)}function bt(t){return t.trim().replace(/["']/g,"")}function Ce(t){const e=new Set;function n(r){(r.style.fontFamily||getComputedStyle(r).fontFamily).split(",").forEach(i=>{e.add(bt(i))}),Array.from(r.children).forEach(i=>{i instanceof HTMLElement&&n(i)})}return n(t),e}async function ke(t,e){const n=await Le(t,e),r=Ce(t);return(await Promise.all(n.filter(i=>r.has(bt(i.style.fontFamily))).map(i=>{const s=i.parentStyleSheet?i.parentStyleSheet.href:null;return ft(i.cssText,s,e)}))).join(`
`)}async function Me(t,e){const n=e.fontEmbedCSS!=null?e.fontEmbedCSS:e.skipFonts?null:await ke(t,e);if(n){const r=document.createElement("style"),o=document.createTextNode(n);r.appendChild(o),t.firstChild?t.insertBefore(r,t.firstChild):t.appendChild(r)}}async function _e(t,e={}){const{width:n,height:r}=st(t,e),o=await V(t,e,!0);return await Me(o,e),await mt(o,e),$e(o,e),await Yt(o,n,r)}async function De(t,e={}){const{width:n,height:r}=st(t,e),o=await _e(t,e),i=await j(o),s=document.createElement("canvas"),a=s.getContext("2d"),l=e.pixelRatio||Vt(),p=e.canvasWidth||n,g=e.canvasHeight||r;return s.width=p*l,s.height=g*l,e.skipAutoScale||Xt(s),s.style.width=`${p}`,s.style.height=`${g}`,e.backgroundColor&&(a.fillStyle=e.backgroundColor,a.fillRect(0,0,s.width,s.height)),a.drawImage(i,0,0,s.width,s.height),s}async function xt(t,e={}){return(await De(t,e)).toDataURL("image/jpeg",e.quality||1)}const S=[],$=[],I=50;let vt=!1;const X=[];function Pe(t){return X.push(t),()=>{const e=X.indexOf(t);e>=0&&X.splice(e,1)}}function Et(t){for(const e of X)try{e(t)}catch{}}function He(t){const e={};if(!t)return e;const n=(r,o)=>{e[r.toLowerCase()]=o};if(t instanceof Headers)t.forEach((r,o)=>n(o,r));else if(Array.isArray(t))for(const[r,o]of t)n(r,o);else for(const[r,o]of Object.entries(t))n(r,o);return e}function Ie(){if(vt)return;vt=!0;const t=console.error;console.error=(...i)=>{const a={message:i.map(l=>{if(l instanceof Error)return l.message;if(typeof l=="string")return l;try{return JSON.stringify(l)}catch{return String(l)}}).join(" "),timestamp:Date.now()};i[0]instanceof Error&&(a.stack=i[0].stack),S.push(a),S.length>I&&S.shift(),t.apply(console,i)},window.addEventListener("error",i=>{var s;S.push({message:i.message||"Unknown error",timestamp:Date.now(),stack:(s=i.error)==null?void 0:s.stack}),S.length>I&&S.shift()}),window.addEventListener("unhandledrejection",i=>{var a;const s=i.reason instanceof Error?i.reason.message:String(i.reason);S.push({message:`Unhandled Promise: ${s}`,timestamp:Date.now(),stack:(a=i.reason)==null?void 0:a.stack}),S.length>I&&S.shift()});const e=window.fetch;window.fetch=async(...i)=>{var g;const s=new Request(...i),a=s.method,l=s.url,p=He(i[0]instanceof Request?i[0].headers:(g=i[1])==null?void 0:g.headers);try{const f=await e(...i);if(!f.ok){let m="";try{m=(await f.clone().text()).slice(0,500)}catch{m="[Could not read response body]"}const E={url:l,method:a,status:f.status,statusText:f.statusText,responseBody:m,requestHeaders:p,timestamp:Date.now()};$.push({url:l,method:a,status:f.status,statusText:f.statusText,timestamp:Date.now(),responseBody:m,requestHeaders:p}),$.length>I&&$.shift(),f.status>=400&&f.status!==401&&Et(E)}return f}catch(f){throw $.push({url:l,method:a,status:0,statusText:f instanceof Error?f.message:"Network Error",timestamp:Date.now()}),$.length>I&&$.shift(),f}};const n=XMLHttpRequest.prototype.open,r=XMLHttpRequest.prototype.send,o=XMLHttpRequest.prototype.setRequestHeader;XMLHttpRequest.prototype.open=function(i,s,...a){const l=this;return l._bw_method=i,l._bw_url=String(s),l._bw_headers={},n.call(this,i,s,...a)},XMLHttpRequest.prototype.setRequestHeader=function(i,s){const a=this;return a._bw_headers&&(a._bw_headers[i.toLowerCase()]=s),o.call(this,i,s)},XMLHttpRequest.prototype.send=function(...i){return this.addEventListener("loadend",()=>{if(this.status>=400||this.status===0){const s=this;let a="";try{a=(this.responseText||"").slice(0,500)}catch{a="[Could not read response body]"}const l={url:s._bw_url||"",method:s._bw_method||"GET",status:this.status,statusText:this.statusText||"Error",timestamp:Date.now(),responseBody:a,requestHeaders:s._bw_headers||{}};$.push(l),$.length>I&&$.shift(),this.status>=400&&this.status!==401&&Et({url:s._bw_url||"",method:s._bw_method||"GET",status:this.status,statusText:this.statusText||"Error",responseBody:a,requestHeaders:s._bw_headers||{},timestamp:Date.now()})}}),r.apply(this,i)}}const St=45e4;async function $t(){var n;if((n=navigator.connection)!=null&&n.saveData)return null;const e=r=>{var o;return r instanceof HTMLElement?!((o=r.className)!=null&&o.toString().includes("bw__")):!0};try{let r=await xt(document.body,{quality:window.innerWidth<=480?.5:.7,pixelRatio:1,backgroundColor:"#ffffff",filter:e});return r.length>St&&(r=await xt(document.body,{quality:.4,pixelRatio:.75,backgroundColor:"#ffffff",filter:e})),r.length>St?null:r}catch(r){return console.warn("[BugWidget] Screenshot capture failed:",r),null}}function Rt(){return[...S]}function Tt(){return[...$]}function Lt(){var n;const t={url:window.location.href,viewport:{width:window.innerWidth,height:window.innerHeight},userAgent:navigator.userAgent,timestamp:new Date().toISOString(),language:navigator.language,platform:navigator.platform||"unknown",colorScheme:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"},e=navigator;return(n=e.connection)!=null&&n.effectiveType&&(t.connection=e.connection.effectiveType),t}class Ae{constructor(e=50){this.events=[],this.scrollTimeout=null,this.maxScrollDepth=0,this.active=!1,this.handleClick=n=>{const r=n.target;if(!r)return;const o=this.buildSelector(r),i=this.getSafeText(r);this.addEvent({type:"click",timestamp:Date.now(),data:{selector:o,text:i}})},this.handleScroll=()=>{this.scrollTimeout||(this.scrollTimeout=setTimeout(()=>{this.scrollTimeout=null;const n=window.scrollY||document.documentElement.scrollTop,r=document.documentElement.scrollHeight-window.innerHeight,o=r>0?Math.round(n/r*100):0;o>this.maxScrollDepth&&(this.maxScrollDepth=o,this.addEvent({type:"scroll",timestamp:Date.now(),data:{depth:o,maxDepth:this.maxScrollDepth}}))},500))},this.handleNavigation=()=>{const n=window.location.href;n!==this.lastUrl&&(this.lastUrl=n,this.maxScrollDepth=0,this.addEvent({type:"navigation",timestamp:Date.now(),data:{url:n,action:"navigate"}}))},this.handleVisibility=()=>{this.addEvent({type:"visibility",timestamp:Date.now(),data:{state:document.visibilityState}})},this.maxEvents=e,this.startTime=Date.now(),this.lastUrl=window.location.href}start(){this.active||(this.active=!0,this.addEvent({type:"navigation",timestamp:Date.now(),data:{url:window.location.href,action:"pageload"}}),document.addEventListener("click",this.handleClick,{capture:!0,passive:!0}),window.addEventListener("scroll",this.handleScroll,{passive:!0}),window.addEventListener("popstate",this.handleNavigation),document.addEventListener("visibilitychange",this.handleVisibility),this.patchHistory("pushState"),this.patchHistory("replaceState"))}stop(){this.active&&(this.active=!1,document.removeEventListener("click",this.handleClick,{capture:!0}),window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("popstate",this.handleNavigation),document.removeEventListener("visibilitychange",this.handleVisibility))}getEvents(){return[...this.events]}getTimeOnPage(){return Date.now()-this.startTime}addEvent(e){this.events.push(e),this.events.length>this.maxEvents&&this.events.shift()}patchHistory(e){const n=history[e].bind(history);history[e]=(...r)=>{n(...r),this.handleNavigation()}}buildSelector(e){const n=[];let r=e,o=0;for(;r&&o<3;){let i=r.tagName.toLowerCase();if(r.id){i+=`#${r.id}`,n.unshift(i);break}if(r.className&&typeof r.className=="string"){const s=r.className.split(/\s+/).filter(a=>a&&!a.startsWith("bw__")).slice(0,2).join(".");s&&(i+=`.${s}`)}n.unshift(i),r=r.parentElement,o++}return n.join(" > ")}getSafeText(e){const n=e.tagName.toLowerCase();if(["input","textarea","select"].includes(n))return`[${n}]`;const r=(e.textContent||"").trim();return r.length>50?r.slice(0,50)+"...":r}}function Ct(){return window.__bw_user_identity?{userIdentity:window.__bw_user_identity}:{}}const F="bw__pending_reports";async function ze(t,e,n){const r=await $t();return{project:t,url:window.location.href,trigger:"user-click",description:e,screenshot:r,consoleErrors:Rt(),networkErrors:Tt(),sessionEvents:n?n.getEvents():[],environment:Lt(),timeOnPage:n?n.getTimeOnPage():0,timestamp:new Date().toISOString(),...Ct()}}function kt(t){return t===429||t>=500}async function Mt(t,e){try{const n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});return n.ok?(Pt(t),!0):(kt(n.status)?(console.warn(`[BugWidget] Report submission failed (${n.status}), saving to localStorage`),_t(e)):console.warn(`[BugWidget] Report rejected by server (${n.status}), dropping`),!1)}catch(n){return console.warn("[BugWidget] Report submission failed, saving to localStorage:",n),_t(e),!1}}function _t(t){try{const e=Dt();e.push(t);const n=e.slice(-10);localStorage.setItem(F,JSON.stringify(n))}catch{}}function Dt(){try{const t=localStorage.getItem(F);return t?JSON.parse(t):[]}catch{return[]}}function Oe(t,e=3e5){const n=setInterval(()=>{const r=localStorage.getItem(F);r&&r!=="[]"&&Pt(t)},e);return()=>clearInterval(n)}async function Pt(t){const e=Dt();if(e.length===0)return;const n=[];for(const r of e)try{const o=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});!o.ok&&kt(o.status)&&n.push(r)}catch{n.push(r)}n.length>0?localStorage.setItem(F,JSON.stringify(n)):localStorage.removeItem(F)}const Ue='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/></svg>',Ht="bw__position",Fe=1e4;function qe(t,e,n,r,o,i=0){const s=document.createElement("button");s.className=c.button,s.innerHTML=Ue,s.setAttribute("aria-label","Report a bug"),s.setAttribute("title","Report a bug");const a=document.createElement("div");a.className=c.overlay,a.innerHTML=`
    <div class="${c.content}" role="dialog" aria-modal="true" aria-labelledby="bw__dialog-title">
      <div class="${c.header}">
        <h3 id="bw__dialog-title">Report a Bug</h3>
        <button class="${c.close}" aria-label="Close">&times;</button>
      </div>
      <textarea class="${c.textarea}" placeholder="What went wrong? Describe what you were doing and what happened..."></textarea>
      <button class="${c.submit}">Submit Report</button>
      <div class="${c.status}"></div>
    </div>
  `,document.body.appendChild(s),document.body.appendChild(a);const l=a.querySelector(`.${c.content}`),p=a.querySelector(`.${c.textarea}`),g=a.querySelector(`.${c.submit}`),f=a.querySelector(`.${c.close}`),m=a.querySelector(`.${c.status}`);let E=null;function _(){E&&clearTimeout(E),s.classList.remove(c.buttonMinimized),E=setTimeout(()=>{a.classList.contains("active")||s.classList.add(c.buttonMinimized)},Fe)}setTimeout(_,2400),s.addEventListener("mouseenter",_);let v=!1,R=!1,A=5,k=!1,G=0,T=0,z=0,O=0,At=0,q;const nt=Ve();if(nt){const u=Ot(nt.x,nt.y);rt(u.x,u.y)}function zt(u){return"touches"in u?{x:u.touches[0].clientX,y:u.touches[0].clientY}:{x:u.clientX,y:u.clientY}}function Y(u){if(a.classList.contains("active"))return;const d="touches"in u;if(d)G=Date.now();else if(Date.now()-G<800)return;const b=s.classList.contains(c.buttonMinimized);_(),q=s.getBoundingClientRect();const x=zt(u);T=x.x,z=x.y,O=q.left,At=q.top,v=!0,R=!1,A=d?12:5,k=d&&b,d||u.preventDefault()}function J(u){if(!v)return;const d=zt(u),b=d.x-T,x=d.y-z;if(!R&&Math.abs(b)<A&&Math.abs(x)<A)return;R=!0,s.classList.add(c.buttonDragging);const L=O+b,M=At+x,U=window.innerWidth-q.width,Ge=window.innerHeight-q.height-i,Ye=Math.max(0,Math.min(L,U)),Je=Math.max(0,Math.min(M,Ge));s.style.left=`${Ye}px`,s.style.top=`${Je}px`,s.style.right="auto",s.style.bottom="auto"}function K(u){if(!v||(v=!1,s.classList.remove(c.buttonDragging),!R))return;const d=s.getBoundingClientRect(),b=d.left+d.width/2,x=window.innerWidth,L=window.innerHeight;let M,U=Math.max(8,Math.min(d.top,L-d.height-8-i));b<x/2?M=16:M=x-d.width-16,rt(M,U),je(M,U),u.preventDefault()}function rt(u,d){s.style.left=`${u}px`,s.style.top=`${d}px`,s.style.right="auto",s.style.bottom="auto"}function Ot(u,d){const b=s.getBoundingClientRect(),x=b.width||48,L=b.height||48,M=window.innerWidth-x-8,U=window.innerHeight-L-8-i;return{x:Math.max(8,Math.min(u,M)),y:Math.max(8,Math.min(d,U))}}function Z(){if(!s.style.left&&!s.style.top)return;const u=s.getBoundingClientRect(),d=Ot(u.left,u.top);(d.x!==u.left||d.y!==u.top)&&rt(d.x,d.y)}function je(u,d){try{localStorage.setItem(Ht,JSON.stringify({x:u,y:d}))}catch{}}function Ve(){try{const u=localStorage.getItem(Ht);if(!u)return null;const d=JSON.parse(u);return d.x>=0&&d.x<window.innerWidth-20&&d.y>=0&&d.y<window.innerHeight-20?d:null}catch{return null}}s.addEventListener("mousedown",Y),document.addEventListener("mousemove",J),document.addEventListener("mouseup",K),s.addEventListener("touchstart",Y,{passive:!1}),document.addEventListener("touchmove",J,{passive:!0}),document.addEventListener("touchend",K),window.addEventListener("resize",Z),window.addEventListener("orientationchange",Z);function Xe(){a.classList.add("active"),p.value="",m.textContent="",g.disabled=!1,E&&clearTimeout(E),s.classList.remove(c.buttonMinimized),setTimeout(()=>p.focus(),100)}function B(){a.classList.remove("active"),_(),s.focus()}function Ut(u){if(u.key!=="Tab"||!a.classList.contains("active"))return;const d=Array.from(l.querySelectorAll('button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));if(d.length===0)return;const b=d[0],x=d[d.length-1],L=document.activeElement;u.shiftKey?(L===b||!l.contains(L))&&(u.preventDefault(),x.focus()):(L===x||!l.contains(L))&&(u.preventDefault(),b.focus())}return document.addEventListener("keydown",Ut),s.addEventListener("click",()=>{if(R){R=!1;return}if(k){k=!1;return}Xe()}),f.addEventListener("click",B),a.addEventListener("click",u=>{u.target===a&&B()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&a.classList.contains("active")&&B()}),g.addEventListener("click",async()=>{const u=p.value.trim();if(!u){m.textContent="Please describe the issue.",m.style.color="#e94560";return}g.disabled=!0,m.innerHTML=`<span class="${c.spinner}"></span> Capturing context & submitting...`,m.style.color="#666";try{const d=await ze(t,u,n);await Mt(e,d)?(m.textContent="Bug report submitted. Thank you!",m.style.color="#27ae60",setTimeout(B,2e3)):(m.textContent="Saved locally. Will retry when connection is available.",m.style.color="#f39c12",setTimeout(B,3e3))}catch{m.textContent="Failed to submit. Report saved locally for retry.",m.style.color="#e94560",g.disabled=!1}}),()=>{E&&clearTimeout(E),s.removeEventListener("mousedown",Y),document.removeEventListener("mousemove",J),document.removeEventListener("mouseup",K),s.removeEventListener("touchstart",Y),document.removeEventListener("touchmove",J),document.removeEventListener("touchend",K),window.removeEventListener("resize",Z),window.removeEventListener("orientationchange",Z),document.removeEventListener("keydown",Ut),s.remove(),a.remove()}}class Be{constructor(e,n,r,o){this.lastReportTime=0,this.unsubscribe=null,this.project=e,this.apiUrl=n,this.sessionTracker=r,this.options=o}start(){this.unsubscribe=Pe(e=>{this.handleApiError(e)})}stop(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)}async handleApiError(e){if(this.isOwnEndpoint(e.url)||this.options.shouldAutoReport&&!this.options.shouldAutoReport({url:e.url,status:e.status,method:e.method}))return;const n=Date.now();if(!(n-this.lastReportTime<this.options.debounceMs)){this.lastReportTime=n;try{const r=await $t(),o=this.sanitize(e.requestHeaders),i={project:this.project,url:window.location.href,trigger:"auto-api-error",description:`Auto-reported: ${e.method} ${e.url} returned ${e.status} ${e.statusText}`,screenshot:r,consoleErrors:Rt(),networkErrors:Tt(),sessionEvents:this.sessionTracker?this.sessionTracker.getEvents():[],environment:Lt(),timeOnPage:this.sessionTracker?this.sessionTracker.getTimeOnPage():0,timestamp:new Date().toISOString(),...Ct(),apiErrorContext:{url:e.url,method:e.method,status:e.status,statusText:e.statusText,responseBody:e.responseBody,requestHeaders:o}};await Mt(this.apiUrl,i)}catch(r){console.warn("[BugWidget] Auto-report failed:",r)}}}isOwnEndpoint(e){try{const n=new URL(e,window.location.origin),r=new URL(this.apiUrl,window.location.origin);return n.pathname===r.pathname}catch{return e.includes(this.apiUrl)}}sanitize(e){const n={};for(const[r,o]of Object.entries(e))this.options.sanitizeHeaders.includes(r.toLowerCase())?n[r]="[REDACTED]":n[r]=o;return n}}function It(t){const{project:e,apiUrl:n,position:r="bottom-right",captureSession:o=!0,maxSessionEvents:i=50,autoReportErrors:s=!0,autoReportDebounceMs:a=3e4,zIndex:l=99999,offset:p={},exclude:g=[],sanitizeHeaders:f=[],headless:m=!1,shouldAutoReport:E}=t;if(!e||!n)throw new Error('[BugWidget] "project" and "apiUrl" are required config options.');const _=window.location.href;for(const T of g)if(We(T,_))return{destroy(){}};Ie();let v=null;o&&(v=new Ae(i),v.start());let R=null;const A=Math.max(0,p.bottom??0);m||(Ft(r,l,A),R=qe(e,n,v,r,l,A));let k=null;s&&(k=new Be(e,n,v,{debounceMs:a,shouldAutoReport:E,sanitizeHeaders:["authorization","cookie","x-auth-token","x-api-key","x-csrf-token",...f.map(T=>T.toLowerCase())]}),k.start());const G=Oe(n);return{destroy(){if(G(),v&&v.stop(),k&&k.stop(),R&&R(),!m){const T=document.querySelector(".bw__btn"),z=document.querySelector(".bw__overlay"),O=document.getElementById("bw__styles");T==null||T.remove(),z==null||z.remove(),O==null||O.remove()}}}}function We(t,e){const n=t.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");try{return new RegExp(`^${n}$`).test(e)}catch{return e.includes(t)}}if(typeof document<"u"){const t=document.currentScript;t!=null&&t.dataset.project&&(t!=null&&t.dataset.apiUrl)&&document.addEventListener("DOMContentLoaded",()=>{It({project:t.dataset.project,apiUrl:t.dataset.apiUrl,position:t.dataset.position||"bottom-right",captureSession:t.dataset.captureSession!=="false",autoReportErrors:t.dataset.autoReportErrors!=="false"})})}D.initBugWidget=It,Object.defineProperty(D,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=bug-widget.js.map
