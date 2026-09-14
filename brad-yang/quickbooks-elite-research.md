# QuickBooks Workforce Elite — Research Report for MedEdPrep, LLC
**Prepared:** June 5, 2026  
**Situation:** First W-2 employee, Georgia company, employee works remotely in Illinois on F-1/CPT visa

---

## What You Have (Subscription Confirmation)

Based on the billing screenshots:

- **QuickBooks Online Essentials** — accounting subscription, currently $37.50/mo (50% promo, regular $75/mo), next charge 07/02/2026
- **Workforce Elite** — payroll subscription, currently $67/mo (50% promo, regular $134/mo) + $12/employee/month, next charge 07/02/2026

The Payroll Overview screen confirms "Welcome to Workforce Elite" with advertised features: full-service payroll with taxes done for you, Auto Payroll, Tax Penalty Protection, and "Expert setup — just request a call." The "Start onboarding" and "Request a call" buttons are the two main entry points shown.

This reading is accurate. Note: Workforce Elite is QuickBooks' top-tier payroll product (the name changed from "Payroll Elite" when the product line was rebranded to "QuickBooks Workforce"). Both names refer to the same tier.

---

## Question 1: Tier Confirmation — What Workforce Elite Includes in 2026

**Current tier lineup** (as of June 2026, per quickbooks.intuit.com/payroll/pricing/ and /payroll/elite/):

| Feature | Workforce Payroll (base) | Workforce Premium | **Workforce Elite** |
|---|---|---|---|
| Full-service payroll (QB calculates, files, pays taxes) | Yes | Yes | Yes |
| Auto Payroll | Yes | Yes | Yes |
| Expert product support (phone + chat) | Yes | Yes | Yes |
| Next-day direct deposit | Yes | Yes | — |
| **Same-day direct deposit** | No | No | **Yes** |
| **Expert setup (they complete it for you)** | No | Review only | **Full setup** |
| **Tax Penalty Protection ($25K/yr)** | No | No | **Yes** |
| Time tracking (QuickBooks Time) | No | Yes | Yes |
| HR Advisor (Mineral) | No | No | Yes |
| Hiring & onboarding workflows | No | Yes (NEW) | Yes |
| Company documents / e-signatures | No | Yes (NEW) | Yes |
| Benefits administration | No | Yes (limited avail.) | Yes |
| Local tax setup support | No | Yes | Yes |
| Multi-state payroll | Yes (all tiers) | Yes | Yes |
| Workers' comp add-on (Next) | Optional add-on | Optional add-on | Optional add-on |

**Pricing as listed:** $134/mo + $12/employee/month (you're on 50% promo at $67/mo + $12/employee)

**Key Elite differentiators relevant to your situation:**
- They complete the payroll setup for you (not just review it)
- Tax Penalty Protection: up to $25,000/year in IRS penalties and interest, any reason, with their Tax Resolution team dealing directly with the IRS
- Same-day direct deposit (run by 7:00 AM)
- HR Advisor via Mineral

**Sources:** [quickbooks.intuit.com/payroll/elite/](https://quickbooks.intuit.com/payroll/elite/) | [quickbooks.intuit.com/payroll/pricing/](https://quickbooks.intuit.com/payroll/pricing/) | [quickbooks.intuit.com/payroll/tax-penalty-protection/](https://quickbooks.intuit.com/payroll/tax-penalty-protection/)

---

## Question 2: THE KEY QUESTION — State Registration (Illinois)

### Bottom Line: QuickBooks does NOT register you with Illinois automatically, but it has a partner service (CorpNet) that does it for you from within QB — for a fee.

Here is the exact sequence, per the official Intuit help article "Register for your payroll state account numbers" (updated May 26, 2026):

> *"Every state requires you to have account numbers to pay and file your state payroll taxes. Additionally, you may also need local tax account numbers. If you're new to doing payroll, or setting up an employee in a new state, you can apply for your state and local tax account numbers in Intuit QuickBooks Workforce. **We partner with CorpNet. Fees apply.**"*

**The CorpNet flow (within QB):**

1. Go to All Apps → Payroll → Overview → "Enter your tax info"
2. Click through until you reach the state tax window (Illinois will appear when you add the Illinois work location)
3. Select **"Get an account number"**
4. Follow on-screen instructions; QB sends you to CorpNet to complete the application
5. If you have questions during this process: call CorpNet at **1-888-449-2638**
6. Repeat for each account number needed (withholding account + IDES/SUI account)

**What this means in practice:**
- QB does not silently register you — you must initiate the process and provide information
- CorpNet files the registration paperwork on your behalf (you do not go to MyTax Illinois or IDES.illinois.gov yourself, unless you prefer to skip the CorpNet fee and do it directly)
- "Fees apply" means CorpNet charges a service fee (not published on QB's site; typically $75–$150 per state registration service, but confirm with CorpNet)
- Once you have the account numbers, you enter them back into QB so QB can e-file and e-pay on your behalf
- **You can proceed without account numbers** temporarily ("You can set up state taxes without your account numbers. You'll need to pay the taxes and file the forms manually until you add the account numbers.")

**What Illinois actually requires (two separate registrations):**

| Registration | Agency | Method | Deadline |
|---|---|---|---|
| IL Income Tax Withholding account | Illinois Dept. of Revenue (IDOR) — MyTax Illinois | Online at mytax.illinois.gov or via CorpNet | Before first payroll |
| IL Unemployment Insurance (SUI) account | IDES (IL Dept. of Employment Security) | Online at mytax.illinois.gov (REG-UI-1 form) or via CorpNet | **Within 30 days of hiring** |

**Sources:**  
- [quickbooks.intuit.com — Register for your payroll state account numbers](https://quickbooks.intuit.com/learn-support/en-us/help-article/state-taxes/register-payroll-state-account-numbers-quickbooks/L2aWPrAUO_US_en_US) (updated May 26, 2026)  
- [quickbooks.intuit.com — Set up employees and payroll taxes in a new state](https://quickbooks.intuit.com/learn-support/en-us/help-article/state-taxes/set-employees-payroll-taxes-new-state/L7IvuV1bC_US_en_US) (updated June 1, 2026)  
- [ides.illinois.gov — Are You a New Employer?](https://ides.illinois.gov/employer-resources/taxes-reporting/are-you-a-new-employer-register.html)  
- [tax.illinois.gov — Withholding Income Tax](https://tax.illinois.gov/research/taxinformation/withholdingincometax.html)

**Uncertainty flag:** The CorpNet flow is available for all Workforce tiers (Core, Premium, Elite). It is not clear from public documentation whether Elite's "expert setup" automatically initiates the CorpNet registration on your behalf or whether you still click "Get an account number" yourself. Safest assumption: you initiate it, and the Elite expert can guide you through it during setup.

---

## Question 3: Multi-State Setup (Georgia HQ, Illinois Employee)

**How QB handles this:**

When you add the Illinois employee, QB will prompt you to set a **Work Location** for that employee. For a remote worker physically in Illinois, the work location is Illinois — even though MedEdPrep is based in Georgia.

Per the official QB new-state guide:

> *"If you have remote employees, the work location may be different than where your employee physically works."*
> *"State unemployment will only be paid to one state per employee. That state should be set as the Work Location."*

**For your situation:**
- **Illinois** = work location (where the employee physically works) → triggers Illinois SUI and Illinois income tax withholding obligations
- **Georgia** = company's home state → Georgia payroll taxes apply to Georgia-based employees; you likely have no Georgia-based W-2 employees yet
- QB's online payroll (Workforce) handles multi-state on a single account — this is explicitly supported and is one reason QB Online Payroll is preferable to Desktop Payroll for multi-state situations

**What QB will ask you to enter for Illinois:**
- Illinois income tax withholding account number (from IDOR/MyTax Illinois)
- Illinois SUI account number and rate (from IDES)
- How often you're required to deposit (new employers default to monthly for withholding)

**Source:** [quickbooks.intuit.com — Set up employees and payroll taxes in a new state](https://quickbooks.intuit.com/learn-support/en-us/help-article/state-taxes/set-employees-payroll-taxes-new-state/L7IvuV1bC_US_en_US)

---

## Question 4: F-1 / FICA Exemption

### Good news: QB Online Payroll explicitly supports this. Here's where the setting lives.

**The IRS rule:** F-1 students on CPT are nonresident aliens (NRA) and are exempt from FICA (Social Security and Medicare) for the duration of their F-1 status, per IRC §3121(b)(19) and IRS Publication 515. They are also exempt from FUTA (federal unemployment) for the same reason. However, they are subject to federal income tax withholding (at a higher NRA rate) and to state income tax withholding (Illinois does not exempt NRAs from state income tax).

**How to configure this in QB Workforce (QBO Online Payroll):**

Per the official article "Set up your employee that isn't a U.S. citizen" (updated May 26, 2026):

1. Go to All Apps → Payroll → Employees
2. Select the employee → Job & Pay → Tax Withholding → **Edit**
3. Fill in Federal Withholding info; NRAs are subject to federal income tax withholding — do NOT mark federal income tax as exempt
4. Under **Tax Exemptions**, check the boxes to exempt:
   - Social Security (employee portion)
   - Medicare (employee portion)
   - FUTA (federal unemployment)
   - Illinois SUI (state unemployment) — F-1 students are also exempt from SUI
5. Save

**Critical requirement:** The employee must have a valid Social Security Number (SSN) to be added to QB payroll. An ITIN (starts with 9) will not work. Most F-1 CPT students have an SSN; confirm with the employee before onboarding.

**QB's explicit note on this:**
> *"If you need help understanding which payroll taxes your employee is exempt from, contact a tax professional, see IRS Publication 515, or contact your state agencies for state tax exemptions."*

**Does Elite's expert setup help here?** Yes — the expert setup includes a review of your payroll configuration. You should explicitly flag the employee's F-1/CPT status during the expert setup call or chat so they configure the exemptions correctly. Do not assume it will happen automatically.

**Uncertainty flag:** QB's article says you must determine which exemptions apply and then select them yourself. The software does not auto-detect based on visa type. You are responsible for knowing the correct exemptions (F-1 CPT = exempt from FICA + FUTA + SUI; not exempt from federal or Illinois income tax withholding). If the expert completes the setup, make sure they flag and apply these exemptions.

**Sources:**  
- [quickbooks.intuit.com — Set up your employee that isn't a U.S. citizen](https://quickbooks.intuit.com/learn-support/en-us/help-article/payroll-setup/set-nonresident-alien-nra-tax-withholding-foreign/L0eigbOht_US_en_US) (updated May 26, 2026)  
- [IRS Publication 515](https://www.irs.gov/publications/p515)

---

## Question 5: Written/Email vs. Call — THE OTHER KEY QUESTION

### Bottom Line: Chat is available as an alternative to phone. There is no pure email/async option, but chat creates a written record.

**What the product pages say:**

From the Elite features page:
> *"Expert setup: A payroll expert will complete your setup, once you provide necessary information."*  
> *"Expert support: We're here to help. Give our friendly support team a call or **chat with us online**."*  
> *"HR Advisor: Consult with certified HR advisors by phone **or online**, powered by Mineral, Inc."*

The pricing page FAQ states:
> *"We'll set up your payroll for you with QuickBooks Workforce Elite. With QuickBooks Workforce Premium, we'll review your setup."*

**Two entry points shown in your screenshot:**
- **"Start onboarding"** — begins the self-guided setup flow; you can contact support during this process
- **"Request a call"** — schedules a call with an expert; the note on screen says *"If you start onboarding, you can always contact us for assistance"*

**The chat option:** QB explicitly offers **phone and chat** for expert support. Chat creates a written record of the conversation. This is the recommended path if you want documentation.

**How to access chat for Elite:**  
Once inside QBO, the support/help icon (?) in the upper right opens the help panel, which has a chat option. Elite subscribers get priority access. The general QB support number is also listed (1-888-857-3710 for sales; general support through the in-product help).

**Practical recommendations for getting a written record:**
1. Start onboarding yourself (click "Start onboarding"), which walks you through the setup steps online
2. When you reach a question or need expert input, open chat (in-product help → Chat)
3. Screenshot or save the chat transcript — QB's chat does not automatically email you a copy, but the chat window is copyable
4. Alternatively: start onboarding, and when the "Request a call" option comes up, explain at the start of the call that you'll be following up in writing and ask them to send a summary email — some agents will do this

**What you cannot do:** There is no async email support path for Intuit's payroll team (as of 2026). Chat is the closest thing to a written channel. The HR Advisor (Mineral) is available "by phone or online" which may include a written consultation option — worth asking.

**Source:** [quickbooks.intuit.com/payroll/elite/](https://quickbooks.intuit.com/payroll/elite/)

---

## Question 6: Workers' Compensation (Illinois)

### Illinois requires workers' comp even for a single employee — including remote workers for out-of-state companies.

Per the Illinois Workers' Compensation Commission (IWCC):

> *"If you have one employee, even a part-time employee, you must obtain workers' compensation insurance."*

> *"If an out-of-state company conducts business with its employees in Illinois, i.e., does any work at all in Illinois, even if all the workers reside in the same state as the company, that company must provide a workers' compensation insurance policy that includes Illinois coverage for those workers."*

**Penalties for non-compliance:** Up to $500/day with a minimum fine of $10,000. Corporate officers can be personally liable.

**QuickBooks workers' comp add-on:**  
QB offers a pay-as-you-go workers' comp add-on through their partner **Next Insurance** (formerly and currently marketed as "Next"). From the QB workers' comp page:

> *"Pay as you go rather than one lump sum with QuickBooks Workforce... simplify annual audits, get automatic calculations, and manage it all in one place."*

- Get a free quote: [app.nextinsurance.com](https://app.nextinsurance.com/quote/get-started?payg=payg_direct_customer&affiliate_id=7100&serial=992855961&partner_source=marketing_page_smb) (links from QB's site)
- Or call Next: **866-344-4779**
- Premium is calculated based on actual payroll each period (pay-as-you-go), synced with QB payroll data
- This satisfies the Illinois requirement if the policy explicitly includes Illinois coverage — confirm this when getting the quote

**Source:**  
- [iwcc.illinois.gov/about/insurance.html](https://iwcc.illinois.gov/about/insurance.html) (IWCC — official)  
- [quickbooks.intuit.com/payroll/workers-compensation/](https://quickbooks.intuit.com/payroll/workers-compensation/)

---

## Question 7: Timing — What Has Lead Time?

**Summary of lead times and hard deadlines:**

| Task | Who Does It | Deadline / Lead Time |
|---|---|---|
| Register with IDES (Illinois SUI) | You or CorpNet | **Within 30 days of first hire date (June 15)** → by July 15 |
| Register for Illinois income tax withholding | You or CorpNet | Before first payroll run |
| Illinois new hire report | You (via IDES) | **Within 20 days of first day on payroll** → by July 5 |
| Get workers' comp policy (Illinois coverage) | You via Next | **Before June 15** — no waiting period; liability begins on day one |
| QB Elite expert setup / onboarding | QB expert | Allow 1–5 business days for setup review and sign-off |
| Illinois account numbers (via CorpNet) | CorpNet | Typically 1–2 weeks to receive from state agencies; can vary |
| IL withholding account number processing (IDOR) | IDOR (MyTax Illinois) | Online registration often provides immediate confirmation; paper takes longer |
| IDES account number | IDES | Online registration often immediate; processing for account number can take 2–3 weeks |
| QB Tax Penalty Protection activation | QB | Activates after expert reviews and signs off on your setup |

**Critical path item:** The state account numbers (IDES + IDOR) are the rate-limiting step. If you initiate the CorpNet process or direct registration immediately, you may have account numbers in hand by June 15. If not, QB will let you run payroll and file manually until you have the numbers — but you are accruing tax liability without a mechanism to e-file/e-pay.

**Start immediately:**
1. Workers' comp quote from Next (before June 15 — no grace period)
2. Click "Start onboarding" in QB and get to the Illinois state registration step
3. Either use CorpNet (within QB) or register directly with IDOR and IDES

---

## What to Do This Week — Prioritized Action List

### What QuickBooks Does For You (once set up):
- Calculates, files, and pays federal payroll taxes (941, 944, FUTA/940)
- Files and pays Illinois income tax withholding (IL-941)
- Files and pays Illinois SUI contributions (UI-3/40 quarterly reports)
- Issues W-2 at year-end
- Provides Tax Penalty Protection ($25K/yr cap) once setup is reviewed and approved

### What You Must Do Yourself (or via CorpNet):

**This week (before June 15):**

1. **Get workers' comp insurance with Illinois coverage — TODAY**  
   Go to [quickbooks.intuit.com/payroll/workers-compensation](https://quickbooks.intuit.com/payroll/workers-compensation/) → "Get a free quote" via Next, or call 866-344-4779. Confirm the policy explicitly covers Illinois. This cannot wait.

2. **Start QB payroll onboarding — click "Start onboarding" in QB**  
   Work through the setup flow. When you reach the Illinois state tax section, select "Get an account number" to initiate the CorpNet flow — OR skip CorpNet and register directly (see steps 3 and 4 below). Note: CorpNet charges a fee; direct registration is free but requires more legwork.

3. **Register for Illinois income tax withholding (IDOR)**  
   - Direct option: Go to [mytax.illinois.gov](https://mytax.illinois.gov) → "Register a New Business" (REG-1 form)
   - CorpNet option: Initiate through QB's "Get an account number" flow
   - Once you have the account number, enter it in QB Payroll Settings → Illinois tax → Edit

4. **Register for Illinois unemployment insurance (IDES)**  
   - Direct option: Go to [mytax.illinois.gov](https://mytax.illinois.gov) → register using the REG-UI-1 form, or visit [ides.illinois.gov](https://ides.illinois.gov/employer-resources/taxes-reporting/are-you-a-new-employer-register.html)  
   - IDES Employer Hotline: 1-800-247-4984  
   - Deadline: within 30 days of June 15 = by July 15

5. **Set up the employee in QB with correct F-1/CPT tax exemptions**  
   When adding the employee in QB: Employee → Tax Withholding → Edit → Tax Exemptions → check: Social Security, Medicare, FUTA, and Illinois SUI. Do NOT exempt from federal or Illinois income tax withholding. Ensure the employee has a valid SSN (not ITIN).

6. **Contact QB via chat (not phone if you prefer written record)**  
   During or after onboarding, open in-product chat and ask the expert to review your Illinois setup and the NRA/F-1 tax exemption configuration specifically. Save the chat transcript.

7. **Report new hire to Illinois IDES within 20 days of June 15 (by July 5)**  
   [Online via IDES](https://ides.illinois.gov/employer-resources/taxes-reporting/new-hires/new-hire-obligations.html) or using IDES New Hire Form

**Ongoing:**
- Keep copies of the employee's visa and I-9 form
- When you receive any payroll tax notice or penalty: send QB a copy within the notice deadline to invoke Tax Penalty Protection

---

## Uncertainty Flags — Where to Verify

| Issue | Uncertainty | Safest Action |
|---|---|---|
| CorpNet fee amount | Not published; estimated $75–$150/state | Call CorpNet (1-888-449-2638) or skip and register directly |
| Whether Elite expert proactively initiates CorpNet | Not documented; probably requires your action | Start onboarding and look for the "Get an account number" button |
| Whether chat creates a saveable transcript | Not documented; you must copy manually | Copy/paste the chat session when done |
| Illinois SUI exemption for F-1 students | IDES does not explicitly state F-1 = SUI exempt on their site; this is an IRS/SSA rule | Mark exempt in QB but confirm with IDES or a tax professional if challenged |
| IDOR registration timeline | Online registration says immediate; mailed confirmation may take days | Register online; note the confirmation number |
| Tax Penalty Protection: state vs. federal | QB's page says "IRS penalty" — protection appears focused on IRS (federal) penalties | Confirm with QB chat whether state tax penalties are also covered |

---

## Key Sources

- QB Workforce Elite product page: https://quickbooks.intuit.com/payroll/elite/
- QB pricing/tier comparison: https://quickbooks.intuit.com/payroll/pricing/
- QB state tax registration with CorpNet: https://quickbooks.intuit.com/learn-support/en-us/help-article/state-taxes/register-payroll-state-account-numbers-quickbooks/L2aWPrAUO_US_en_US
- QB new state payroll setup guide: https://quickbooks.intuit.com/learn-support/en-us/help-article/state-taxes/set-employees-payroll-taxes-new-state/L7IvuV1bC_US_en_US
- QB NRA/non-citizen employee setup: https://quickbooks.intuit.com/learn-support/en-us/help-article/payroll-setup/set-nonresident-alien-nra-tax-withholding-foreign/L0eigbOht_US_en_US
- QB Tax Penalty Protection: https://quickbooks.intuit.com/payroll/tax-penalty-protection/
- QB Workers' Comp (Next): https://quickbooks.intuit.com/payroll/workers-compensation/
- IDES — New Employer Registration: https://ides.illinois.gov/employer-resources/taxes-reporting/are-you-a-new-employer-register.html
- IDES — Employer Tax Information: https://ides.illinois.gov/employer-resources/tax-employer-information.html
- IDOR — Illinois Withholding Income Tax: https://tax.illinois.gov/research/taxinformation/withholdingincometax.html
- IWCC — Workers' Comp Insurance: https://iwcc.illinois.gov/about/insurance.html
- IRS Publication 515 (NRA withholding): https://www.irs.gov/publications/p515
