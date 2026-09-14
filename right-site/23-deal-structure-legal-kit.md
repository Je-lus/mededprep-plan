# RightSite Health — Deal-Structure & Legal Kit

**Engagement type:** MedEdPrep builds and *hosts* a custom, trackable, interactive e-learning module for RightSite Health (converting their live Zoom platform demo into an async course with interleaved knowledge checks, a branching "live call" simulation, admin dashboard, and certificate-on-completion).
**Core legal tension:** We will be shown a login walkthrough of RightSite's proprietary platform, then build a faithful HTML *illusion* of its UX for training only (clean-room). We must (a) be allowed to see their platform, (b) keep our reusable engine, (c) hand them a custom deliverable they can rely on, and (d) handle a small amount of trainee completion data without dragging a heavy HIPAA/PII regime into a simple training contract.

This document specifies the four-document contract stack, the IP-ownership clause pattern that is the crux of the deal, the light data terms that actually matter, and the attorney archetype to retain.

---

## 1. The contract stack (signing order matters)

Sign these in sequence. Each one gates the next event in the deal.

| # | Document | Signed before… | Purpose in this deal |
|---|----------|----------------|----------------------|
| 1 | **Mutual NDA** | RightSite shares any platform login, screen-share, or raw demo footage | Lets them show us their proprietary UI; lets us discuss our engine without leaking either side |
| 2 | **MSA (Master Services Agreement)** | Any production work begins | The durable "rules of engagement" — IP, liability caps, data terms, warranties, term/termination. Signed once; reusable for future modules |
| 3 | **SOW #1 (Statement of Work)** | We start the first module build | The specific, time-boxed deliverable: what we build, milestones, price, acceptance criteria, hosting term |
| 4 | **Order/renewal terms (hosting)** | Hosting year 1 ends | Annual hosting + admin-access subscription; renews independently of the build |

**Why MSA + SOW instead of one fat contract:** RightSite has expanded into Houston (~4,000 personnel) and Dallas is next; they will very likely want a *second* module, updates, or per-department rollouts. The MSA holds the negotiated legal terms steady (you fight over IP and liability *once*); each new piece of work is a lightweight SOW that just references the MSA. This is the standard SaaS-plus-professional-services structure and it is what a tech-transactions attorney will reach for by default (Gouchev Law; Faison Law Group — see Sources).

---

## 2. Mutual NDA — the gate before the login

This is the single most time-sensitive document. **Nothing — no login, no screen-share, no raw footage — moves until it is signed**, and it should be *mutual* (bilateral), because each side is exposing something:

- **RightSite exposes:** their live platform UI, account credentials/login walkthrough, internal call-flow scripts, and raw demo footage.
- **MedEdPrep exposes:** our interactive-video engine pattern, our admin/tracking architecture, our authoring approach (the `gtc-demo` → `mededprep-demo` lineage).

NDA clauses that carry weight for *this* engagement:

1. **Definition of Confidential Information** broad enough to cover "the visual appearance, screens, and workflow of the Disclosing Party's platform observed during a demonstration or screen-share," not just documents marked CONFIDENTIAL. A login walkthrough is the asset here.
2. **Permitted purpose** narrowly stated: "solely to evaluate and produce training materials for the Recipient's platform." This is what lets us legally build the clean-room illusion.
3. **No reverse-engineering / no decompilation** language is standard in mutual NDAs (Databricks, Common Paper templates). *Important nuance:* this restricts copying their *code*, which we never touch — it does **not** prohibit producing a training depiction of the *user-facing UX* from an authorized demo. Our clean-room build reproduces the look-and-feel for instruction; it does not disassemble their software. Have counsel confirm the permitted-purpose clause explicitly blesses "creating training depictions of the observed interface."
4. **Residuals / general skills** carve-out (protects *us*): unaided memory, general know-how, and our pre-existing engine are not "their" confidential information.
5. **Term & survival:** confidentiality survives 2–5 years past termination; trade-secret protection survives indefinitely.

A free, well-regarded mutual NDA template (Common Paper, used by 2,000+ companies) is a fine starting draft; have the retained attorney tune the permitted-purpose and reverse-engineering language for the demo-observation scenario before signing.

---

## 3. The IP-ownership clause — the crux of the deal

This is where the money and the moat live. The whole engagement turns on cleanly separating **three buckets of IP**, a structure every source converges on (Genie AI; Gouchev Law; Faison Law Group):

### Bucket A — MedEdPrep Background / Pre-Existing IP (we keep, full stop)
Our reusable **engine**: the interactive-video player, the interleaved-question framework, the branching-simulation logic, the admin/tracking dashboard, certificate generation, the authoring tooling, and any code/templates that pre-date or are developed independently of this SOW (the `gtc-demo`/`mededprep-demo`/`demo.mededprep.com` lineage).

- Define it explicitly and, ideally, **list it in a schedule/exhibit** to the MSA. Vague "each party keeps its pre-existing IP" language is the single most common failure point (Gouchev Law).
- **Enhancements to our engine made while doing RightSite's work remain ours.** State this in writing — improvements to background IP defaulting to the client is the classic trap (Gouchev Law).
- RightSite receives **no ownership** of the engine — only the use rights described in Bucket B.

### Bucket B — The Custom Deliverable (RightSite gets rights to *this instance*)
The specific RightSite training module: their branded UI illusion, their snipped/reassembled footage, their explainer videos, their question content, their call-flow simulation, their certificate.

Two viable structures — **pick the license model, not assignment**, for the *engine-bound* deliverable:

- **Recommended — perpetual license to the assembled module.** RightSite gets a perpetual, paid-up, worldwide right to *use* the hosted module (and to have us host it). They do **not** get the source/engine. Because the module only runs on our engine, "assigning" it to them is largely illusory anyway — assignment would force a source-code handoff or escrow we do not want.
- **Alternative — assignment of the truly-custom layer only** (their footage edits, their branded screen assets, their question text), with a **license-back to MedEdPrep** of anything that touches our engine. This satisfies a client who insists they "own what they paid for" while we still own the machine that runs it.

Most clean way to say it: **RightSite owns/controls its own content and brand assets it provides; MedEdPrep owns the engine and the integration; RightSite gets a perpetual license to use the combined hosted module.**

### Bucket C — Client Materials (RightSite already owns; they license *to us*)
Their logo, brand, raw footage, existing presentation, and platform appearance. They grant MedEdPrep a license to use these solely to build and host the module. This is the inbound mirror of the NDA's permitted purpose.

### The clause mechanics to insist on
- **Work-made-for-hire + assignment backstop** *only for Bucket B's custom layer* — WMFH has narrow statutory categories and does not reliably cover software, so a written assignment clause is the standard belt-and-suspenders backup (Genie AI). Do **not** let a blanket "all work product is work-made-for-hire and assigned to Client" clause sweep in our engine — that is the dangerous default in many client-side software templates (Faison Law Group).
- **Reservation of rights**: explicit sentence that MedEdPrep reserves all rights in its platform, tools, and pre-existing materials not expressly granted.
- **Tie any client rights to payment**: ownership/license of the deliverable vests on **full payment**, not on creation.
- **Portfolio/reference right** (small, worth asking): MedEdPrep may reference the engagement as a case study, subject to NDA limits on disclosing RightSite confidential specifics.

---

## 4. The SOW — where the real promises live

The MSA holds the legal terms; the SOW holds the *deliverable*. For module #1:

- **Scope:** convert the live RightSite demo into an async module — embedded platform-walkthrough video; explainer videos appearing mid-action as buttons are clicked; knowledge checks interleaved *throughout*; post-test; **scripted branching simulation** of the live call; certificate on completion; admin login with user list + completion stats.
- **Inputs from RightSite (dependencies):** existing presentation with embedded videos, raw demo footage, brand assets, login walkthrough, SME review of clinical/operational accuracy. *Flag these as client obligations — our timeline depends on them.*
- **Footage handling:** snipping/reassembly of their footage is a deliverable; assets they hand us are Bucket C (client materials).
- **Acceptance criteria & milestones:** storyboard sign-off → interactive prototype → content integration → UAT → launch. Payment tranches tied to milestones.
- **Hosting term & admin access:** year 1 hosting + admin dashboard included or priced; renewal in the order terms.
- **Out of scope:** anything not listed (additional departments, future updates, content authoring beyond the agreed modules) — explicitly routed to a future SOW.

---

## 5. Data terms — keep them *light*; this is NOT HIPAA territory

This is the part to actively keep small. The data involved is **trainee completion records**: name, basic role/department demographics, and time/completion status. That is it.

**Why this is not a heavy regime:**
- **No PHI.** RightSite is a telehealth/EMS-care company, but *this product trains fire/EMS personnel on how to use a platform.* It does not store patient data, clinical encounters, or health information. No HIPAA Business Associate Agreement (BAA) is warranted — a BAA only belongs where PHI is processed (HIPAA University; HIPAA Exams). Pulling a BAA into a training contract imports breach-notification timelines, audit rights, and security obligations that do not fit the actual data.
- **No FERPA.** FERPA attaches to education records at institutions receiving U.S. Dept. of Education Title IV funding. Fire-department employee training is workforce training, not a Title-IV education record. (MedEdPrep's own internal legal notes already flag FERPA as a *future, conditional* concern only if selling into Title-IV community colleges — not applicable here.)
- It is ordinary **employee training-completion data**, the same category an LMS holds.

**What the data clause SHOULD say (proportionate):**
1. **Who owns it:** RightSite owns the completion records about its personnel; MedEdPrep is a processor/host.
2. **Who can access it:** RightSite gets the admin login to view users + completion stats (they have no LMS of their own — this dashboard *is* their LMS for this purpose). MedEdPrep accesses only to operate, support, and report.
3. **Permitted use:** MedEdPrep uses the data only to deliver the service (tracking, certificates, reporting) — not for marketing or resale. May use **aggregated/de-identified** usage data to improve the platform.
4. **Security:** commercially reasonable safeguards (the standard, not a SOC 2 / ISO mandate — those are negotiable up only if RightSite demands them).
5. **Return/deletion on termination:** export RightSite's completion records on request; delete within a defined window after wind-down.
6. **Breach notice:** prompt notice of a security incident affecting their data — a single proportionate clause, not a full DPA.

A short data-handling section *inside the MSA* covers this. Only escalate to a standalone DPA if a state privacy law (e.g., a Texas resident-data threshold) is triggered by volume — unlikely at this scale, but worth a one-line check with counsel given Houston/Dallas footprint.

---

## 6. The attorney archetype — who to hire (and who NOT to)

**Hire:** a **technology-transactions / SaaS + professional-services attorney** — boutique or small-firm, flat-fee-friendly, who drafts MSAs/SOWs/NDAs and IP-licensing clauses as their bread and butter (Faison Law Group; Gouchev Law both describe exactly this practice: "software and IP licensing," "technology outsourcing, professional services," "develop repeatable contract templates and negotiation playbooks").

What this attorney must do well:
- Cleanly separate **background IP vs. deliverable IP vs. client materials**, and resist a client-side "everything is work-for-hire, assign it all to us" sweep.
- Structure an **MSA template + reusable SOW** so the next module is a one-page order, not a renegotiation.
- Write a **proportionate data clause**, and have the judgment to say "you do **not** need a BAA or a heavy DPA here" — the green-flag behavior MedEdPrep's own lawyer notes prize ("gives you honest 'you don't need that yet' advice").
- Tune the **mutual NDA's permitted-purpose / reverse-engineering** language for the clean-room demo-observation scenario.

**Do NOT default to:**
- A **healthcare-regulatory / HIPAA specialist.** RightSite *is* a health company, which tempts this choice — but this product handles no PHI. A healthcare-regulatory lawyer will reflexively bolt on a BAA and a HIPAA security regime that inflate cost and slow the deal for data that does not warrant it.
- A **generalist / traditional business lawyer** (real-estate, banking, local litigation). They think in big-company or non-tech terms and will mis-handle the IP-licensing-vs-assignment distinction that *is the deal*. MedEdPrep's own search notes flag the established local firm as "more comfortable with traditional business law… than SaaS/startup work."
- A **litigator** or **big firm** — you want someone who prevents disputes with clean drafting, at flat fees, async-friendly.

**Engagement model:** flat-fee template package is ideal. MedEdPrep has already scoped this — the internal plan earmarks the **Andrew S. Bosin LLC SaaS package (~$4,500: ToS, Privacy Policy, MSA/Subscription Agreement, NDA)** and notes MSA template drafting runs **$1,000–$2,500** one-time. A SaaS-focused remote specialist (the internal notes name Bosin specifically, plus Founders Legal / ContractsCounsel for discrete tasks) fits the archetype precisely. Reuse that MSA/NDA template for RightSite; have the attorney add the IP-bucket schedule and the clean-room NDA language as a small incremental task rather than a fresh draft.

---

## 7. One-page action sequence

1. **Send mutual NDA** (Common Paper / Bosin template, permitted-purpose tuned for demo observation) → get it signed **before** the RightSite login walkthrough.
2. **Stand up the MSA** off the existing SaaS template; add the three-bucket IP schedule (engine = ours; deliverable = licensed; their materials = theirs) and the light data section (no BAA, no FERPA).
3. **Draft SOW #1** for the module build: scope, client-input dependencies, milestones, acceptance, hosting year 1, admin access.
4. **Retain the tech-transactions/SaaS attorney** for a flat-fee template tune-up — *not* a healthcare-regulatory or generalist lawyer.
5. Keep hosting renewal on its **own annual order** so the recurring revenue is clean and independent of the one-time build.

---

## Sources touched

**Internal files**
- `/home/jeramey/projects/lawyer/FINDING-A-LAWYER.md` — MedEdPrep's own attorney-archetype thinking (small-business/startup + SaaS; avoid big-firm/litigator; flat-fee green flags; "you don't need that yet" honesty).
- `/home/jeramey/projects/lawyer/LAWYER-SEARCH.md` — task-by-task local-vs-remote matrix; names Bosin (ToS package), Founders Legal/ContractsCounsel; flags local firm as traditional-business-law, not SaaS.
- `/home/jeramey/projects/lawyer/PRIORITIES.md` — confirms the Bosin SaaS bundle (~$4,500) decision, MSA cost range ($1,000–$2,500), MSA clause checklist (liability caps, IP-license-not-sale, data/breach, termination/portability), and that FERPA is a *future/conditional* concern only.
- `/home/jeramey/projects/heather-contract.md` — real MedEdPrep contract template (entity name "MedEdPrep, LLC," Dallas/Carrollton GA address, payment/term/tax structure) used as the house drafting style and entity reference.
- `/home/jeramey/projects/gtc-demo/` and `/home/jeramey/projects/mededprep-demo/` — confirmed the demo lineage exists as deployed apps (Laravel-based, Lightsail-hosted); establishes the reusable "engine" that is Bucket-A background IP. (READMEs were Laravel boilerplate; asset value is the existence of the prior builds.)
- `/home/jeramey/projects/SOW26/` — existing MedEdPrep SOW PDFs (GTC FY2026), confirming MedEdPrep already operates an MSA/SOW-style document practice to mirror.

**External sources**
- https://www.genieai.co/blog/essential-ip-and-ownership-clauses-in-software-development-and-services-agreements — work-made-for-hire vs. assignment (WMFH narrow for software → assignment backstop); background-IP carve-out + perpetual license-back; tie ownership to payment; reservation of rights.
- https://gouchevlaw.com/pre-existing-intellectual-property-rights/ — defines background/pre-existing IP; warns against vague "each party keeps its IP"; enhancements-to-background-IP trap; license-vs-transfer-vs-reserve framing; MSA+SOW with an IP schedule; corroborates IP-clause structure (2nd independent source).
- https://faisonlawgroup.com/blog/technology-transactions-lawyer/ — the technology-transactions/SaaS attorney archetype, scope (SaaS + professional/managed services + IP licensing + light data terms), and the "reusable template/playbook" engagement model; corroborates attorney archetype and MSA structure.
- https://commonpaper.com/standards/mutual-nda/ — free mutual-NDA template (2,000+ companies) as a clean starting draft for the gate-NDA.
- https://www.databricks.com/legal/mutual-non-disclosure-agreement — confirms standard no-reverse-engineer/no-decompile language in mutual NDAs (used to scope the clean-room nuance).
- https://hipaauniversity.com/blog/data-processing-agreements/ and https://www.hipaaexams.com/blog/data-processing-agreements — a BAA/DPA belongs where PHI/personal data is processed; basis for the "no BAA needed for training-completion data" conclusion (2 independent sources).

**Single-source flags**
- The specific **$4,500 Bosin SaaS-bundle** figure and the **$1,000–$2,500 MSA** range appear in MedEdPrep's internal notes only (`PRIORITIES.md`) — treat as MedEdPrep's own prior research/estimate, not an externally verified market quote. The external MSA-drafting cost range ($1,000–$2,500) is corroborated by the founder's prior lawyer-search work but was not re-verified against a live attorney quote in this pass.
