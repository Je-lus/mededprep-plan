# Gene Hoover Hiring Packet - Session Work Doc (09-21-2026)

Finalized and delivered the Gene Hoover employment packet: offer letter and job description rewritten from program-specific drafts to a company-wide Director of Education role, a new employee NDA created from the Heather Reddick template, all three rendered to print-ready PDFs, and the whole packet validated by two 3-engine agent review rounds. Jeramey printed the packet and is hand-delivering it to Gene.

## What happened, in order

1. Pulled up the Sep 13 drafts (`gene-hoover-offer-letter.html`, `gene-hoover-job-description.html`). Jeramey's core complaint: too focused on one program (the Critical Care Academy / OEMS&T designation paperwork had hijacked the employment docs).
2. Rewrote both docs: title = **Director of Education** (company-wide), removed the "dual role confirmed acceptable with OEMS&T" line, the Tanner Health System name-drop, the 60-hour allocation table, and the Success Measures section. Regulatory compliance scoped to "programs under this position's direction" (Richard owns CAPCE; neither named). Comp filled: $40.00/hr, part-time hourly W-2, non-exempt with overtime language, flexible hours by mutual agreement, no hours range (owner decision). Qualifications: Bachelor's, NRP, CCP-C or FP-C, instructor credentials, education-delivery experience, clinical field experience.
3. **Review round 1** (codex/kimi/agy, memos in `reviews/*-review.md`): all three SHIP-WITH-TWEAKS. Applied the consensus set with owner modifications: prior-works IP carve-out + license-back, timekeeping language (off-the-clock sentence later removed at owner request), NDA-enclosed language, "other duties" bounded by educational mission, dated Sep 21 + "mutually agreed start date, confirmed in writing", addressee "Delivered by hand".
4. Owner travel ruling: NO drive-time pay; one-way mileage at IRS rate only when one-way distance exceeds 50 miles. Letter deliberately stays SILENT on travel-time compensability (see Watch item in HIRING-CHECKLIST.md - never write "travel time is unpaid").
5. Built **`gene-hoover-nda.html`** from `~/Downloads/NDA-Heather-Rocket Lawyer App.pdf`, adapted contractor->employee: purpose = Director of Education duties; term = employment duration + 24-month tail (indefinite for trade secrets/exam items and legally protected student records); duty-scoped permissions; three explicit cross-references deferring to the offer letter's IP carve-out; at-will preserved. **Heather's 12-month post-employment NON-COMPETE was deliberately dropped** (conflicts with offer §9; GA RCA scrutiny); non-circumvention kept. Owner decision still open on re-adding it.
6. Owner wording pass: removed "off-the-clock work is not permitted", "remotely by arrangement" -> "remotely where applicable", "return or permanently destroy" -> "return ... and remove any copies from applicable devices and accounts".
7. Rendered all three to PDF (headless Chrome, print-template recipe: @page margins + break-inside rules added). Visually verified all 9 pages via pdftoppm - margins on every page, no sliced clauses, sig blocks intact.
8. **Review round 2** - cold-read comprehension check (memos in `reviews/round2-*.md`): all three engines reconstructed the deal correctly, zero contradictions found, misreading risk MEDIUM. Owner reviewed the findings and shipped as printed.

## Still open

- **GA employer registration** (BLOCKING before Gene's first paycheck): GTC withholding + GDOL accounts, then into QBO Payroll. Gene = first GA W-2 hire. See HIRING-CHECKLIST.md.
- **Non-compete decision**: currently omitted from Gene's NDA; re-add only deliberately and reconcile with offer §9.
- **Two optional one-line tightenings** (declined for this printing, available if docs are ever revised): offer §9 add "teaching" to the permitted outside activities (the NDA carve-out references it but §9 doesn't say the word); NDA §VI(iii) add "outside the scope of employment" after "independently created by the Recipient".
- **Start date**: letter says "mutually agreed, confirmed in writing" - send that confirmation once picked.
- **Gene's home address**: blank line on the printed NDA, to be filled by pen.
- **Talking points if Gene asks**: perpetual non-exclusive license on incorporated prior works (deliberate trade); one-way mileage is literal and measured-from point is unstated; NDA indemnification/arbitration/fee-shifting inherited from the Heather template; exam items confidential indefinitely.
- Unrelated: 1 ungraded dispatch on the dc-grade board (14:48, pedi-onboarding topic) belongs to a different session - left for its owner.

## Verified vs. not

- VERIFIED: all 9 PDF pages visually inspected; 6/6 agent dispatches artifact-verified and graded green; round-2 quotes machine-checked verbatim against source HTML (codex).
- NOT verified by a lawyer: the whole packet. Attorney items flagged for the Stephen conversation: PD-designation indemnification, integration clause (round-1 memos have detail).

## Exact pickup commands

- Reprint after any edit: `cd ~/projects/domination/gene-hoover && google-chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf=<name>.pdf <name>.html`
- Review memos: `ls ~/projects/domination/gene-hoover/reviews/`

## Deploy checklist

None - this is the nondeploy mededprep-plan notes repo; push is backup only, no webhooks, no server.
