# Brad Yang Hire — Status & Next Steps
*Snapshot: June 5, 2026. This is a standalone handoff so you don't have to resume a long chat.*

---

## WHERE WE ARE RIGHT NOW
- ✅ **Signed W-2 offer letter SENT to Brad today** (Gmail, in the "internship details and follow up" thread, cc Heather + Sam, signed PDF attached).
- ⏳ **Waiting on Brad** to reply with: (1) confirm he'll work primarily from **Illinois**, and (2) **start the CPT process** with his school's DSO.
- 💳 **QuickBooks Payroll = paid for, not yet configured.** You have **Workforce Elite** (the top payroll tier) + QuickBooks Online Essentials (accounting).
- 🔎 **A background agent is researching** whether Workforce Elite can do the Illinois state registration *for you* and whether it can be handled over **email/chat** (you prefer a written record). Findings will be added to the bottom of this doc and to `quickbooks-elite-research.md`.

---

## THE DEAL (key facts)
- **Brad Yang** — F-1 international grad student (Univ. of Illinois, psychometrics).
- Role: **W-2 Psychometrics Research Intern**, summer 2026 (**June 15 – Aug 21**), ~20 hrs/wk (flex to 40 by mutual agreement), **$50/hr**, **remote from Illinois**, on **CPT** work authorization.
- **Why W-2, not 1099:** his CPT work authorization requires *employee* status (I-9, payroll). A contractor setup wouldn't satisfy CPT. **This is MedEdPrep's first W-2 employee.**

---

## FILES (all in `domination/brad-yang/`)
- `brad-yang-employment-letter.html` / `.pdf` — the W-2 offer (signed copy is in your Downloads; already sent)
- `brad-yang-w2-onboarding-checklist.md` — detailed click-level onboarding/payroll steps
- `quickbooks-elite-research.md` — QuickBooks tier research
- `kickoff-brief.md` — **one-page summer direction for Brad** (data on hand, 4 tracks, Week 1 plan)
- `distractor-data-investigation.md` — dev-ready findings on extracting selected-option data from `mededprep-c` (written by the investigation agent)
- `archive-1099-dead/` — ⚠️ OLD 1099 versions (engagement letter + wargame), **dead, ignore**
- Related: psychometrics onboarding page source at `domination/pscyhometrician/brad-onboarding.html`; anonymized data exports at `confidence-data/anonymous/`

---

## WHAT'S NEXT — IN ORDER

### 1. ⏳ (Brad) Confirm Illinois + start CPT — *waiting on him*
He needed the signed letter (done) to get CPT authorized. Watch for his reply.

### 2. 🟡 (You) Register as an employer in Illinois — *has lead time, but CHECK QB FIRST*
Because Brad works in Illinois, payroll tax follows him there (not Georgia). You'd need:
- **IL income tax withholding account** → mytax.illinois.gov (Illinois Dept of Revenue)
- **IL unemployment insurance (SUI) account** → IDES (Illinois Dept of Employment Security)

**⚠️ Before doing this by hand:** the background agent is checking whether **Workforce Elite registers you in new states automatically**. If it does, you may not need to do the above manually. **Read `quickbooks-elite-research.md` first.**

### 3. 🟡 (You) Configure QuickBooks Payroll
- Enter company info (EIN, GA address, owner), connect the bank account that funds payroll, set **biweekly** pay schedule.
- **Add Brad — CRITICAL: set his work location to ILLINOIS, not your Georgia address.** This one setting drives all his tax setup; wrong = everything downstream is wrong.
- **Mark Brad FICA-EXEMPT** (Social Security + Medicare) — he's an F-1 nonresident-alien student. This is **not** a default; set it manually and confirm with QB's Elite expert.
- Enter the IL account numbers once issued.
- **Don't run payroll until Brad has actually worked** (after 6/15) — no rush on that final step.
- Workforce Elite includes **expert setup + Tax Penalty Protection** — lean on the expert help.

### 4. 🔵 (You + Brad) I-9 and tax forms — *after he's set up*
- **Form I-9** (work eligibility): Brad does Section 1 by day 1; you do Section 2 within 3 business days. Remote option: an authorized rep inspects his original docs. His CPT docs = **passport + I-94 + CPT-endorsed I-20**.
- **Form W-4** (federal) + **IL-W-4** (Illinois withholding).

### 5. 🔵 (Sam) NDA — *before ANY data access*
Brad signs the NDA before touching any data. **Make sure the NDA covers identifiable student data** — the CAT/response data often can't be de-identified, so he'll handle real identifiable info. Sam is handling the NDA.

---

## TWO THINGS THAT COULD THREATEN THE 6/15 START
1. **Brad's CPT approval** (his school's timeline)
2. **Brad's SSN** — needed for payroll. If he doesn't already have one, applying takes a few weeks. You opted to capture it at the I-9 and assume he has one (reasonable — he likely does).

---

## WORTH DOING ONCE
A 30-minute review by an **employment attorney** *or* the **QuickBooks Elite setup expert** — this is a first W-2 hire, F-1/CPT, across two states (GA company / IL worker). Cheap insurance.

---

## QUICKBOOKS RESEARCH FINDINGS
*(Full report with source links: `quickbooks-elite-research.md`)*

### ⚠️ NEW URGENT ITEM the research surfaced: Workers' Comp
**Illinois requires workers' comp insurance for employees — mandatory before June 15, no grace period.** This wasn't on our radar before. Get a quote through QuickBooks' partner **Next** (quickbooks.intuit.com/payroll/workers-compensation, or 866-344-4779). Do this early.

### Your two headline questions — answered

**1. Does Workforce Elite register you in Illinois automatically?**
**No — but there's a built-in assist.** In QB payroll setup, when you hit the Illinois tax section, there's a **"Get an account number"** button that hands off to QB's partner **CorpNet** (1-888-449-2638), who files the Illinois withholding (IDOR) and unemployment (IDES) registrations *for* you. Fees apply (~$75–150/state, not published by QB).
- **Or do it yourself, free:** both registrations are online at **mytax.illinois.gov** — REG-1 (withholding) and REG-UI-1 (unemployment).
- **The state account numbers are the bottleneck.** Deadlines: **new-hire report by ~July 5** (within 20 days), **IDES registration by ~July 15** (within 30 days of first hire).

**2. Can you do it all over email/chat instead of a call?**
**Closest is CHAT, not email — there's no async email channel.** Elite support is phone + chat. Use the in-product **? (help) icon → live chat**, and **manually copy/save the transcript** (QB doesn't auto-email it). If you use "Request a call," you can ask the rep to follow up in writing.

### What to do this week (priority order)
1. **TODAY:** Get **workers' comp** with Illinois coverage (mandatory before 6/15). QB partner *Next*.
2. **This week:** Click **"Start onboarding"** in QB. At the Illinois tax section, use the **CorpNet** button (or register yourself at mytax.illinois.gov) to get your **IDOR withholding** + **IDES SUI** account numbers.
3. **When adding Brad:** set work location = **Illinois**, and manually set tax exemptions → check **Social Security, Medicare, FUTA, and Illinois SUI exempt** (F-1 NRA student). **Do NOT exempt federal or IL income tax withholding.** He needs a valid **SSN (not ITIN)**.
4. **Use Elite chat** to have an expert review the Illinois setup + the nonresident-alien exemption config. Save the transcript.
5. **By ~July 5:** file the **Illinois new-hire report** with IDES.

> Note: the research expanded the FICA-exempt point — it's actually **Social Security + Medicare + FUTA + IL SUI** all exempt for an F-1 student, but **income tax withholding still applies**. Confirm with the QB expert when you set it.

---

## ⛔ BLOCKER HIT (June 5, 2026) — REG-1 wants an Illinois Secretary of State number

While doing the IL withholding registration (REG-1 on mytax.illinois.gov), the form asked for an **Illinois Secretary of State file/ID number** — which a Georgia LLC doesn't have. The form assumes you're an Illinois-registered entity.

**The real question underneath it:** Does a GA LLC with **one remote IL employee for ~10 weeks** have to **foreign-qualify** (register as a foreign LLC with the IL Secretary of State, Form LLC-45.5) before it can register for payroll?

**Honest state of the answer (researched):**
- Every IL practitioner guide says an employee regularly working in IL *typically* triggers foreign qualification — it's **not** on Illinois's safe-harbor list of activities that don't count.
- BUT Illinois also has a dedicated **"out-of-state withholding agent"** registration path with the Dept. of Revenue, so the state explicitly contemplates out-of-state employers registering for withholding directly.
- The **10-week temporary** nature of this role is a legitimate thumb on the scale — standing up a foreign qualification + ongoing **registered agent** for a summer intern may be overkill. This is a genuine judgment call → put it to **CorpNet** or an attorney, don't guess at the web form.

### Two paths
- **Path A — Foreign-qualify (fully clean):** File LLC-45.5 + a GA Certificate of Good Standing (dated within 60 days) + appoint an IL registered agent. Gets you the SOS number → REG-1 goes through. Downside: filing fee + ongoing registered-agent cost.
- **Path B — Out-of-state withholding agent only (skip foreign qual):** Faster/cheaper, no registered agent. Leaves the "are we transacting business in IL" question formally open; low practical risk for one short-term remote worker, but not belt-and-suspenders.

### ✅ The two-desk plan for getting this sorted

**Important:** the QuickBooks *payroll* chat is NOT the right desk for the SOS/foreign-qual question — they don't give registration/legal advice and will punt. Use the right desk for each conversation:

**Desk 1 — CorpNet (this unblocks you). Phone: 1-888-449-2638.**
Reach them via QB: Payroll → Overview → **Start onboarding** → add an **Illinois work location** → at the IL tax step click **"Get an account number."** Or just call. Script:
> "I have a Georgia LLC — MedEdPrep, LLC — with one remote W-2 employee working from Illinois ~10 weeks this summer. REG-1 is asking for an Illinois Secretary of State file number I don't have. (1) Given just one short-term remote employee, do I actually need to foreign-qualify with the IL Secretary of State, or can I register as an out-of-state withholding agent without it? (2) Whichever is correct, can you file it — fee and timeline? I also need the IDES unemployment registration."
> *Ask the fee up front before committing.*

**Desk 2 — QB Elite payroll chat (for the setup itself; gives a written record).**
In QB, click **? (Help) → Chat** (not "Request a call"), and **save the transcript yourself**. Script:
> "First W-2 employee. Georgia LLC; employee works remotely from Illinois on F-1 with CPT. Confirm: (1) work location = **Illinois**, not our Georgia address; (2) mark exempt from **Social Security, Medicare, FUTA, and Illinois SUI** as an F-1 NRA student, but **still withhold federal and Illinois income tax**. Can an expert review this exemption config before first payroll? Does Tax Penalty Protection cover Illinois state penalties or only federal?"

### Do-next checklist
1. **Stop hand-filling REG-1 on mytax.illinois.gov** — back out; you were doing CorpNet's job by hand and hitting the wall by design.
2. **Call/route to CorpNet** with the Desk-1 script → get the foreign-qual decision + let them file the right registration(s).
3. **Fire off the QB Elite chat** (Desk-2 script) in parallel — no account numbers needed for this.
4. **Workers' comp quote from Next (866-344-4779) before 6/15** — independent of all the above, hard date.

> Caveat captured: CorpNet has a fee (~$75–150/registration + state filing fees if foreign-qualifying), plus a registered-agent cost *if* Path A. Worth it to have them make the call correctly — just confirm pricing first.

---

## 💵 COST ESTIMATE (June 5, 2026)

Separating the **compliance/setup overhead** (new costs this hire triggers) from **Brad's wages** (the real money).

### Setup / compliance overhead

| Item | Path B (no foreign qual) | Path A (foreign-qualify) |
|---|---|---|
| CorpNet — IL withholding + IDES registrations | $150–300 (or **$0** DIY) | same |
| IL foreign LLC filing (LLC-45.5 state fee) | — | ~$150 |
| CorpNet service to file the foreign qual | — | ~$100–200 |
| GA Certificate of Good Standing | — | ~$10–25 |
| IL registered agent | — | ~$100–150/yr |
| Workers' comp (Next, pay-as-you-go) | ~$150–500* | ~$150–500* |
| **One-time-ish subtotal** | **~$300–800** | **~$700–1,300** + agent ongoing |

\*Workers' comp for a remote clerical worker is a tiny *rate* (office class ~$0.15–0.30 per $100 payroll → ~$15–60 on Brad's wages), but policies carry an **annual minimum premium** of a few hundred dollars — that minimum drives the number, not the actual exposure.

**Plus QuickBooks subscriptions:** ~$116/mo while running this (Elite $67 + Essentials $37.50 + $12/employee) — but largely **already-sunk** (you pay it regardless; accounting piece stays). Marginal cost of *this hire* ≈ CorpNet + workers' comp (+ foreign qual if Path A).

**Realistic setup overhead: ~$300–800 (Path B) / ~$700–1,300 (Path A).** Get CorpNet's price + recommendation first; if one short-term remote employee doesn't require foreign qualification, you land near the bottom.

### The real money — Brad's wages
$50/hr, ~10 weeks (6/15–8/21):
- At **~20 hrs/wk**: ~**$10,000**
- At **up to 40 hrs/wk**: ~**$20,000**

**Employer-side payroll tax is unusually low here:** F-1 NRA → you're exempt from your share of Social Security, Medicare, and FUTA, and he's exempt from IL SUI. Almost no employer tax add-on — a nice quirk of this hire.

### All-in for the summer
**~$10.5K–21K**, of which only **~$300–1,300 is compliance/setup overhead** — the rest is Brad's pay.

---

## ⏱️ TIMELINE — Can we hit 6/15? (June 5, 2026)

**Short answer: yes.** The key insight: **start date ≠ "everything registered."** Almost none of the tax/registration work has to be done by 6/15 — the law gives a 2–4 week runway *after* he starts. First biweekly payday won't land until ~7/3.

### What truly gates 6/15 (the only real gates)
1. **CPT approval** — his school/DSO. The long pole, and *Brad handles this directly* (he's a student in the program). Jeramey only gets involved if they have questions. The signed letter is what unblocks it. **This is the only real risk to the date, and it's his side.**
2. **Workers' comp with IL coverage** — must be in force before he works (no grace period). Fast: Next can bind **same-day** (866-344-4779). One-afternoon item.
3. **I-9 Section 1** — Brad does it day 1; you do Section 2 within 3 business days.

### What can trail *after* 6/15
| Item | Legal deadline | Realistic timing |
|---|---|---|
| QB payroll config + expert review | Before first payroll run (~early July) | A few hours + 1–5 business days for QB sign-off |
| IL withholding reg (REG-1) | Before first payroll run | Online near-immediate; CorpNet ~1–2 wks |
| IDES (unemployment) reg | Within **30 days** → ~7/15 | Number can take 2–3 wks |
| New-hire report | Within **20 days** → ~7/5 | ~10 minutes |
| Foreign qualification (*if* Path A) | **60-day** grace from IL SOS | Not a 6/15 concern |

**Verdict:** It fits. Your portion is a few hours of active work + phone calls others do the legwork on. Binding constraint is entirely CPT (Brad's side). Reframe: not "10 days to do everything" — it's "2 things by 6/15 (one of them Brad's) + a 2–4 week tail." Normal first-hire runway.

---

## ⚠️ EASY-TO-MISS ITEMS (tailored, June 5, 2026)

1. **CPT start-date wall — *Brad's responsibility, just confirm.*** He cannot legally work even one day before the CPT start date on his I-20 (status violation). Brad handles the CPT process with his DSO; Jeramey only steps in if they have questions. Worth a one-line confirmation from Brad that (a) the CPT **start date is on/before 6/15**, and (b) the authorized **hours match the letter** — if his DSO authorizes part-time (≤20 hrs), the "flex to 40" can't happen until authorization says full-time.

2. **Name the in-person I-9 Section 2 verifier in Illinois.** A real person must be physically with Brad in IL within 3 business days of 6/15 to inspect his original docs (passport + I-94 + CPT-endorsed I-20). Line up who (notary, trusted contact near him, or Brad's arrangement) this week.

3. **NRA federal W-4 + China tax treaty — flag in the QB Elite chat.**
   - NRAs follow special W-4 rules (IRS **Notice 1392**): generally file **Single**, no standard deduction, often an extra amount. QB won't auto-apply this from visa type — set it per NRA rules or federal withholding comes out wrong.
   - **China-specific bonus:** the **US–China tax treaty, Article 20** lets a student exempt up to **$5,000/year of personal-services (wage) income** from federal income tax — claimed via **Form 8233** filed with the employer (needs his SSN). Notably the US–China treaty preserves this even if he's a tax resident. Real money in Brad's favor — confirm application with the QB expert or a tax pro.

4. **Payroll funding bank account — ✅ DONE** (already attached in QB).
