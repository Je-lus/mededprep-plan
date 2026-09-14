# Entity Domicile and Formation Analysis

*Research date: 2026-04-06*

## Summary Recommendation Table

| Entity | Recommended State | Entity Type | Reasoning |
|---|---|---|---|
| **The Vault (IPCo)** | **Wyoming** | LLC (multi-member via trust) | Strongest charging order protection (exclusive remedy, even for single-member). No state income tax. No franchise tax. $100 formation + $60/year. Privacy protections. Avoids Georgia's addback statute problem. |
| **Company A — MedEdPrep Education** | **Georgia** | LLC (existing) | Already operating. Georgia Trauma Commission vendor. No reason to move. Foreign qualification of The Vault into Georgia not required if The Vault only licenses IP and takes no operational role in-state. |
| **Company B — MedEdPrep Accreditation** | **Georgia** | LLC | Operates in Georgia. Simplicity. Same reasoning as Company A. |
| **Company C — Certification Body** | **Georgia** (separate LLC, separate brand) | LLC | NCCA does NOT require different-state formation. Firewall is about governance, staff separation, and data separation — not jurisdiction. Separate Georgia LLC with independent board, separate EIN, and separate brand is sufficient and avoids unnecessary complexity. |
| **Company D — Hospice Software** | **Georgia** | LLC | Not yet operational. Form in Georgia when ready. Simplicity. |
| **Company E — Data Analytics** | **Georgia** | LLC | Operates in Georgia alongside the other entities. Simplicity. |
| **501(c)(3) Foundation** | **Georgia** | Nonprofit Corporation | Formation design already complete. Georgia automatic state tax exemption for 501(c)(3)s. No reason to reconsider. |
| **Trust** | **Wyoming** | Irrevocable Trust (DAPT) | Wyoming has the strongest DAPT statute. Pairs naturally with a Wyoming-domiciled Vault. 2-year statute of limitations for creditor challenges (shortest in the country alongside Nevada). No state income tax on trust income. |

---

## The Critical Threshold Question: Georgia's Addback Statute

Before analyzing individual entities, the single most important finding in this analysis must be addressed, because it shapes every recommendation that follows.

### Georgia Has an Intangible Expense Addback Statute

**O.C.G.A. Section 48-7-28.3** (effective January 1, 2006) requires Georgia taxpayers to **add back** otherwise deductible intangible expenses and costs — including royalties, licensing fees, patent fees, copyright fees, and similar payments — that are paid to related members.

This means: **If Company A (Georgia) pays a royalty to The Vault (related entity) for IP licensing, Georgia will disallow the deduction on Company A's Georgia income tax return.**

The statute defines "related member" broadly — any entity where 50% or more ownership exists directly or indirectly. Since The Vault owns the operating companies, every intercompany royalty payment falls squarely within this definition.

### Exceptions to the Addback

The statute provides limited exceptions under subsections (d) and (f):

1. **Subsection (d) — Taxed Elsewhere Exception:** The addback is reduced to the extent the corresponding royalty income is "allocated or apportioned to and taxed by Georgia or another state that imposes a tax on or measured by the income of the related member." This means if The Vault is domiciled in a state that taxes its royalty income, the operating company can reduce the addback by the amount taxed elsewhere.

2. **Subsection (f) — Conduit/Pass-Through Exception:** The addback does not apply to the extent the related member "directly or indirectly paid, accrued, or incurred such portion to a person that is not a related member" AND the transaction has a valid business purpose.

### What This Means for The Vault's Domicile

If The Vault is domiciled in **Wyoming** (no state income tax), then:
- The royalty income received by The Vault is NOT taxed by any state
- The subsection (d) exception does NOT apply
- Georgia will fully disallow the royalty deduction on the operating companies' returns
- **The IP licensing model produces zero Georgia tax benefit for the operating companies**

If The Vault is domiciled in **Georgia**, then:
- The royalty income IS taxed by Georgia (at 5.49% flat rate for 2026)
- The subsection (d) exception DOES apply
- But the net tax effect is approximately zero — you deduct on one entity and pay on the other within the same state
- The structure still provides **asset protection** (IP separated from operations) but offers **no state tax savings**

If The Vault is domiciled in **Delaware**, then:
- Delaware exempts intangible holding company income from state tax under 30 Del. C. Section 1902(b)(8) — this is the famous "Delaware IP loophole"
- Royalty income received by a Delaware IPCo from out-of-state licensees is generally exempt from Delaware income tax
- The Vault would not be taxed on royalty income in Delaware
- Georgia's subsection (d) exception would NOT apply (income not taxed elsewhere)
- Georgia will fully disallow the royalty deduction
- **Same result as Wyoming — no Georgia tax benefit**

### The Bottom Line on Tax Strategy

**Georgia's addback statute neutralizes the state income tax benefit of the IP holding company structure when the operating companies are in Georgia.** This is by design — Georgia enacted O.C.G.A. Section 48-7-28.3 specifically to prevent the "Delaware IP holding company" strategy that was widely used in the early 2000s.

This does NOT make The Vault pointless. The IP holding company still provides:
- **Asset protection** — IP is legally separated from operational liability
- **Centralized IP management** — clean licensing to multiple operating companies
- **Federal tax structure** — intercompany royalties still affect federal taxable income allocation (relevant if entities have different federal tax treatments)
- **Transactional agility** — clean IP portfolio for fundraising, M&A, or licensing to unrelated third parties
- **Future flexibility** — if operating companies expand to states without addback statutes, the royalty deductions become valuable

But the founder should not expect the IP licensing structure to reduce Georgia state income taxes for the operating companies. The primary value of The Vault is asset protection and organizational architecture, not Georgia tax arbitrage.

### States With and Without Addback Statutes

This matters if operating companies ever expand beyond Georgia:

**States WITH addback statutes (royalty deductions to related entities disallowed or restricted):**
Alabama, Arkansas, Connecticut, Georgia, Indiana, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Mississippi, Missouri, New Jersey, New York, North Carolina, Ohio, Oregon, Pennsylvania, Rhode Island, South Carolina, Tennessee, Virginia, West Virginia, Wisconsin

**States WITHOUT addback statutes and without combined reporting that would capture related-party income:**
Delaware (for the IPCo side — Delaware exempts IP holding income), Nevada (no income tax), Wyoming (no income tax), Florida (no addback statute as of 2026), Texas (no income tax, but has franchise/margin tax)

**States with no income tax (royalty deductions irrelevant):**
Alaska (no individual, has corporate), Florida (no individual, has corporate), Nevada, New Hampshire (limited), South Dakota, Tennessee (no individual, has corporate), Texas (franchise tax instead), Washington (no income tax, has B&O tax), Wyoming

---

## The Vault (IPCo / Holding Company) — Detailed State Comparison

### Option 1: Wyoming (Recommended)

**Formation:**
- Filing fee: $100 (online)
- Annual report fee: $60 minimum (for LLCs with $300,000 or less in Wyoming assets)
- Registered agent: ~$100-$200/year (third-party)
- No state income tax (individual or corporate)
- No franchise tax
- No inventory tax
- No gross receipts tax

**Asset Protection:**
- **Charging order protection is the exclusive remedy** under Wyo. Stat. Section 17-29-503 — even for single-member LLCs
- This is the strongest protection in the country. Wyoming was the first state to create the LLC structure (1977) and its charging order protections have been tested and upheld
- A creditor with a judgment against the LLC member can only obtain a charging order entitling them to distributions — they cannot force distributions, cannot seize LLC assets, and cannot gain management rights
- Wyoming courts cannot compel an LLC to make payments to satisfy a creditor's claim
- Unlike Florida and some other states, Wyoming does NOT have a foreclosure exception for single-member LLCs

**Privacy:**
- Wyoming does not require public disclosure of LLC members or managers in formation documents
- Annual reports do not require member/manager disclosure
- Only the registered agent is public record

**Series LLC:**
- Wyoming adopted Series LLC legislation. However, Series LLCs add complexity and are less well-tested than traditional separate LLCs. For The Vault's purpose (a single IP holding entity), a standard LLC is simpler and more appropriate.

**Foreign Qualification in Georgia:**
- If The Vault only holds IP and licenses it to operating companies — but does not have employees in Georgia, does not maintain an office in Georgia, and does not directly transact with Georgia customers — it likely does NOT need to register as a foreign LLC in Georgia
- Georgia requires foreign qualification when an entity "transacts business" in the state. Passive receipt of royalty income from a Georgia entity is generally not considered "transacting business" under most states' interpretations
- **However, this is a gray area** and should be confirmed with Georgia counsel. If foreign qualification is required: $225 filing fee + $50/year annual registration

**Tax Treatment:**
- No Wyoming state tax on royalty income received by The Vault
- As a single-member LLC (owned by the trust), The Vault is a disregarded entity for federal tax purposes — income flows through to the trust, then to the grantor (Jeramey) on his personal federal return
- If structured as multi-member (e.g., trust + founder), it files as a partnership (Form 1065)
- Wyoming has no state-level tax implications regardless of structure

**Why Wyoming Over Delaware:**
- Wyoming's charging order protection is stronger (exclusive remedy even for single-member LLCs; Delaware is similar but Wyoming's case law is more favorable)
- Wyoming is dramatically cheaper ($100 + $60/year vs. $90 + $300/year for Delaware)
- Delaware's famous Chancery Court is irrelevant for an IPCo that is not litigating corporate governance disputes
- Delaware's IP tax exemption (30 Del. C. Section 1902(b)(8)) is irrelevant because Georgia's addback statute blocks the tax benefit regardless
- Wyoming offers equivalent privacy protections

**Why Wyoming Over Nevada:**
- Wyoming is significantly cheaper ($100 + $60/year vs. $225 + $350/year for Nevada)
- Wyoming has no commerce tax (Nevada imposes a Commerce Tax on businesses with $4M+ in gross revenue — not immediately relevant but could matter at scale)
- Charging order protections are comparable
- Both have no state income tax

**Why Wyoming Over Georgia:**
- Wyoming provides dramatically stronger charging order protection (Georgia's protections are weaker, especially for single-member LLCs)
- Wyoming provides privacy (Georgia's annual registrations are public)
- The tax result is the same either way — Georgia's addback statute means no net tax benefit from Georgia-to-Georgia royalties, and no tax benefit from Georgia-to-Wyoming royalties. But Wyoming adds the asset protection layer.
- Forming The Vault in Wyoming signals to any future creditors, litigants, or due diligence reviewers that the IP is structurally separated and protected — this has deterrent value even before litigation

### Option 2: Delaware

**Formation:**
- Filing fee: $90 (Certificate of Formation)
- Annual franchise tax: $300/year (flat fee for LLCs)
- Registered agent: ~$100-$300/year (third-party; required, cannot use a PO Box)
- Total first year: ~$490-$690
- Total annual: ~$400-$600

**Asset Protection:**
- Charging order is the exclusive remedy under Delaware LLC Act (6 Del. C. Section 18-703)
- Delaware Chancery Court has sophisticated, well-developed LLC case law
- Strong protection, but the practical difference from Wyoming for a small IPCo is minimal

**Tax Treatment:**
- Delaware does NOT tax intangible holding company income (30 Del. C. Section 1902(b)(8)) — this is the famous "Delaware loophole" that attracted thousands of IP holding companies
- However, Georgia's addback statute (O.C.G.A. Section 48-7-28.3) blocks the operating companies from deducting the royalties, so the Delaware tax exemption provides no net benefit in this structure
- If The Vault ever licenses IP to entities in states WITHOUT addback statutes, the Delaware exemption becomes valuable

**Why Delaware Is Not Recommended:**
- More expensive than Wyoming with no incremental benefit for this structure
- The Chancery Court advantage is irrelevant for a passive IPCo
- The IP tax exemption is neutralized by Georgia's addback statute
- The "prestige" of Delaware formation is meaningful for venture-backed startups and large corporations but provides no practical advantage for a founder-controlled holding company

### Option 3: Nevada

**Formation:**
- Filing fee: $75 (Articles of Organization)
- Initial business license fee: $150
- Annual list: $150/year
- Annual business license renewal: $200/year
- Registered agent: ~$100-$200/year
- Total first year: ~$475-$575
- Total annual: ~$450-$550

**Asset Protection:**
- Strong charging order protection
- No state income tax
- Commerce Tax applies to businesses with gross revenue over $4M (1.17% rate) — not immediately relevant

**Why Nevada Is Not Recommended:**
- Significantly more expensive than Wyoming ($450+/year vs. $160/year)
- Nevada's asset protection reputation has been partially tarnished by aggressive marketing from formation mills
- Comparable protections to Wyoming at higher cost
- The Commerce Tax creates a potential future liability that Wyoming does not have

### Option 4: Georgia (Home State)

**Formation:**
- Filing fee: $100 (Articles of Organization, online)
- Annual registration: $50/year
- Publication requirement: ~$40 (one-time, newspaper notice for LLCs)
- No separate registered agent needed if founder is agent
- State income tax: 5.49% flat rate (2026) on pass-through income apportioned to Georgia

**Asset Protection:**
- Georgia's charging order protections are moderate
- Georgia follows the general rule that charging orders are the exclusive remedy for multi-member LLCs
- For single-member LLCs, Georgia's protections are less clear and potentially weaker — courts may allow creditors broader remedies
- No specific privacy protections for LLC members (annual registrations are public)

**Why Georgia Is Not Recommended for The Vault:**
- Weakest asset protection of the four options
- The entire point of The Vault is to protect the "crown jewel" IP assets — Georgia's weaker protections undermine this purpose
- No tax advantage (addback statute means Georgia-to-Georgia royalties wash out)
- Georgia formation for The Vault adds nothing that Wyoming doesn't provide better

### Formation Cost Comparison

| | Wyoming | Delaware | Nevada | Georgia |
|---|---|---|---|---|
| **Formation fee** | $100 | $90 | $225 | $100 |
| **Annual fees** | $60 | $300 | $350 | $50 |
| **Registered agent** | ~$150/yr | ~$200/yr | ~$150/yr | $0 (self) |
| **Foreign qual in GA** | $225 + $50/yr (if needed) | $225 + $50/yr (if needed) | $225 + $50/yr (if needed) | N/A |
| **State income tax** | None | None (on IP income) | None | 5.49% |
| **Year 1 total** | ~$250-$525 | ~$515-$740 | ~$600-$800 | ~$190 |
| **Annual ongoing** | ~$210-$260 | ~$500-$550 | ~$500-$550 | ~$50 |

---

## Company A — MedEdPrep Education (For-Profit)

**Recommendation: Stay in Georgia as existing LLC.**

There is no reason to redomicile Company A:
- Already operating as MedEdPrep LLC in Georgia
- Already a Georgia Trauma Commission vendor — this relationship is valuable and state-specific
- Customers (Georgia schools, EMS programs) are in Georgia
- Redomiciling would create unnecessary administrative burden, potential vendor re-registration, and confusion with existing customers and state agencies
- Entity type (LLC) is appropriate — pass-through taxation, liability protection, operational flexibility

**Georgia LLC costs:**
- Annual registration: $50/year
- State income tax: 5.49% on Georgia-apportioned income
- No franchise tax

**Note on entity type:** The question of LLC vs. S-Corp vs. C-Corp is primarily a federal tax question, not a state domicile question. As a single-member LLC, Company A is currently a disregarded entity. If/when payroll and self-employment tax optimization becomes relevant (typically when net income exceeds ~$80,000-$100,000 and the founder is paying significant self-employment tax), an S-Corp election (Form 2553) can be filed without changing the state formation. This converts the LLC to S-Corp tax treatment while maintaining LLC legal protections. This decision should be driven by the founder's CPA based on actual income levels, not by entity formation planning.

---

## Company B — MedEdPrep Accreditation (For-Profit)

**Recommendation: Georgia LLC.**

Same reasoning as Company A:
- Will operate in Georgia alongside the other entities
- Customers (EMS programs, accreditation bodies) are primarily in-state or interact with Georgia programs
- Simplicity for a solo founder managing multiple entities
- No asset protection concern that would justify out-of-state formation (IP is held by The Vault, not by Company B)

---

## Company C — Certification Body (For-Profit)

**Recommendation: Georgia LLC with separate brand, separate governance board, separate EIN.**

This is the entity where different-state formation has been most discussed, due to the NCCA/ISO 17024 firewall requirement between education (Company A) and certification (Company C). The question is whether forming Company C in a different state materially strengthens the firewall argument.

### What NCCA Actually Requires

Based on the NCCA Standards for the Accreditation of Certification Programs and published guidance from ICE (Institute for Credentialing Excellence):

**NCCA Standard 3 (Education, Training and Certification):** "Appropriate separation must exist between certification and any education or training functions to avoid conflicts of interest and to protect the integrity of the certification program."

**What constitutes "appropriate separation" per NCCA guidance:**
1. Certification staff and education staff must be separate — no shared personnel working on both exam development and education/test prep content
2. Subject matter experts (SMEs) who develop exam items cannot be involved in creating test preparation materials, and vice versa
3. The certification program must have an independent governance board
4. The certification program must NOT state or imply that its organization's education programs are the only or preferred route to certification
5. Confidentiality and conflict of interest agreements must be signed and enforced
6. A public member must sit on the certification governance board

**What NCCA does NOT require:**
- Different state of formation
- Different physical location (though separate facilities or access controls are needed for item security)
- Complete corporate independence (NCCA accredits programs within larger organizations — e.g., ACE offers both education and NCCA-accredited certification from within one organization, using internal firewalls)

### Real-World Examples of How Organizations Handle This

**DANB (Dental Assisting National Board):** Created a separately incorporated entity — the DALE Foundation — for education. This is the most aggressive separation approach. DANB holds NCCA accreditation and ISO 17024 accreditation.

**ACE (American Council on Exercise):** Offers BOTH education and NCCA-accredited certification from within a single organization. Maintains the firewall through separate departments with different senior leaders, no shared staff between certification and education, and SME restrictions. Has held NCCA accreditation for 20+ years and recently attained dual ISO 17024 accreditation.

**ICE itself:** Offers the ICE-CCP certification AND educational programs. Maintains the firewall through policies, separate staff assignments, and documented impartiality procedures. Developed the program in accordance with NCCA Standards.

### Does Different-State Formation Strengthen the Firewall?

**Short answer: Marginally, and not in the way that matters to NCCA.**

NCCA evaluates the firewall based on:
- Governance independence (separate board with public member)
- Staff separation (no shared personnel on exam + education)
- SME separation (no shared item writers between exam and test prep)
- Data separation (exam content not accessible to education staff)
- Policy documentation (confidentiality agreements, COI policies)

None of these factors are state-of-formation dependent. A Georgia LLC with proper governance is evaluated identically to a Delaware LLC.

**Where different-state formation COULD help:**
- **Optics with state licensing boards.** When Company C approaches state EMS boards seeking recognition of the Paramedic Practitioner credential, having a different state of formation might signal independence from MedEdPrep Education at a glance. However, state boards will review the actual governance structure, not just the state of formation.
- **Litigation defense.** If a creditor or regulator ever challenges the separation between Company A and Company C, different jurisdictions add one more piece of evidence of genuine separateness. But this is a marginal factor — the substance of the separation (separate EINs, separate bank accounts, separate boards, separate data systems) matters far more.

**Where different-state formation hurts:**
- **Administrative burden.** The founder is a solo operator. Every out-of-state entity adds a registered agent fee, a foreign qualification filing (if operating in Georgia), and a separate compliance calendar. For a certification body that will take 2.5-3 years to reach NCCA accreditation and has $150K-$350K in pre-NCCA costs, adding unnecessary state complexity is counterproductive.
- **Cost.** Wyoming or Delaware formation + Georgia foreign qualification = $300-$800/year in extra fees for no substantive benefit.

### Recommendation

Form Company C as a **separate Georgia LLC** with:
- A completely different brand name (NOT "MedEdPrep" anything)
- Its own EIN
- Its own bank account
- Its own independent governance board with a public member
- Its own operating agreement with explicit certification-independence provisions
- Documented staff separation policies (no person works on both Company A test prep and Company C exam development)
- Separate data systems with access controls (Company A databases inaccessible to Company C personnel and vice versa)
- Formal confidentiality and COI agreements for all SMEs

This mirrors the ACE model (single organization, internal firewalls, 20+ years of NCCA accreditation) adapted for the MedEdPrep multi-entity structure where the entities are already legally separate LLCs. The separate LLC structure is actually stronger than the ACE model because the entities are genuinely separate legal persons — not just separate departments.

If the founder later decides the optics of different-state formation are worth the cost (e.g., when approaching state licensing boards for credential recognition), Company C can be redomiciled or a new entity formed at that time. There is no urgency to make this decision now, and doing it prematurely adds cost and complexity during the most capital-constrained phase of the certification body's development.

---

## Company D — Hospice Software (For-Profit)

**Recommendation: Georgia LLC when ready to form.**

- Not yet operational
- No reason to pre-form the entity
- When development begins, form as a Georgia LLC for simplicity
- IP will be held by The Vault; Company D licenses what it needs
- If the hospice software serves customers in states without addback statutes, the royalty deduction could have real value — but this is a future consideration

---

## Company E — Data Analytics (For-Profit)

**Recommendation: Georgia LLC.**

- Operates alongside the other entities in Georgia
- Aggregates data from Companies A, B, C, D
- No special asset protection concerns (it processes data, it doesn't hold IP — The Vault holds the algorithms and software)
- Simplicity

---

## 501(c)(3) Foundation

**Recommendation: Georgia nonprofit corporation. No reason to reconsider.**

The formation design is already complete (see `501c3-formation-design.md`). Georgia is the right choice for the following reasons:

- **Automatic state tax exemption.** Georgia provides automatic state income tax exemption for organizations with a federal 501(c)(3) determination letter. No separate state application needed.
- **Low formation cost.** $100 filing fee + ~$40 newspaper publication.
- **The founder and board are in Georgia.** The programs serve Georgia students and Georgia EMS programs (initially). The relationships with Georgia Trauma Commission, Georgia CTAE, and Georgia school districts are state-specific.
- **Grant eligibility.** Many grants (Perkins V passthrough, GTC education contracts, GFPE Workforce for Georgia) are state-specific. A Georgia nonprofit is better positioned.
- **Simplicity.** The nonprofit's operations, board meetings, and programs all occur in Georgia.

**Is there any reason to reconsider?**

Only one edge case: if the nonprofit were expected to hold significant assets AND the founder wanted enhanced asset protection for the nonprofit's endowment, Delaware nonprofit corporation law offers some governance advantages. But the 501(c)(3) is designed to be lean (grant-funded, purchasing services at FMV), not an asset-heavy endowment vehicle. Georgia is correct.

---

## Trust (Future)

**Recommendation: Wyoming irrevocable trust (DAPT) when the time comes.**

The trust sits above The Vault and provides the top layer of asset protection. This is a Phase 4 (Optimization) decision, not an immediate action item. The analysis here is for future reference.

### Why Wyoming for the Trust

**Wyoming's DAPT (Domestic Asset Protection Trust) statute** is among the strongest in the country:

- **Self-settled trust permitted.** The founder can be both the settlor (creator) and a discretionary beneficiary — and creditors still cannot reach trust assets if the trust is properly structured.
- **Shortest statute of limitations.** Creditors have only 2 years to challenge a transfer to the trust (tied with Nevada for shortest in the country). Compare: Delaware is 4 years.
- **No state income tax.** Trust income is not taxed at the state level in Wyoming, regardless of whether the trust is grantor or non-grantor for federal purposes.
- **Strong spendthrift protection.** Wyoming's spendthrift trust provisions prevent creditors from reaching trust assets even if the beneficiary has a right to distributions.
- **Natural pairing with Wyoming Vault.** If both the trust and The Vault are Wyoming entities, the ownership chain (Trust -> Vault -> Operating Companies) stays within a single, favorable jurisdiction for the asset protection layer.

**Cost considerations:**
- Legal drafting: $7,500-$25,000+ (irrevocable trust with DAPT features is complex)
- Wyoming requires a "qualified trustee" — a trust company or individual resident in Wyoming. This adds annual trustee fees (~$2,000-$10,000+/year depending on complexity and assets).
- If structured as a grantor trust, no separate state or federal tax return is needed (founder reports income as if trust doesn't exist). If non-grantor, Form 1041 is required.

**Timing:** The trust should be funded well before any creditor claims arise. Wyoming's 2-year statute of limitations starts from the date of transfer. The federal Bankruptcy Code has a 10-year lookback for self-settled trust transfers made with actual intent to hinder, delay, or defraud (11 U.S.C. Section 548(e)). This means the trust should be established early in the company's growth, when there are no existing or foreseeable claims.

**This is a Phase 4 decision.** The trust adds significant legal and administrative complexity. The Vault's Wyoming LLC charging order protection provides meaningful standalone protection during Phases 1-3. The trust adds the final layer when the founder's net worth and the IP portfolio justify the cost.

---

## Entity Type Analysis: LLC vs. Corporation

For all operating entities, LLC is the recommended entity type. Here is the reasoning:

### Why LLC for Every Entity

| Factor | LLC | C-Corporation | S-Corporation |
|---|---|---|---|
| **Pass-through taxation** | Yes (default) | No (double taxation) | Yes (but with restrictions) |
| **Flexibility of allocation** | Members can allocate income/loss flexibly | N/A | Must be pro-rata to ownership |
| **Self-employment tax** | Subject to SE tax on all income (unless S-Corp election) | N/A | Only on "reasonable salary" |
| **Charging order protection** | Available (varies by state) | No (shares can be seized) | No (shares can be seized) |
| **Section 351 transfers** | Compatible (if elects corporate tax treatment) | Yes | Yes (with shareholder restrictions) |
| **Eligible S-Corp shareholders** | N/A | N/A | Only individuals, certain trusts, estates — no LLCs, no partnerships, no C-corps |
| **Intercompany royalties** | Pass-through to owner | Taxed at corporate level + again on distribution | Pass-through to owner |
| **Number of owners** | Unlimited | Unlimited | Max 100 |
| **Simplicity** | High | Moderate | Moderate (payroll required) |

**The key insight:** An LLC can elect to be taxed as an S-Corporation by filing Form 2553, getting the payroll/SE tax benefits of an S-Corp while retaining the legal protections and flexibility of an LLC. This means the founder never needs to actually form a corporation — LLCs with S-Corp elections provide the best of both worlds.

**When to make the S-Corp election:** When an entity's net income is high enough that the self-employment tax savings from paying a "reasonable salary" (and avoiding SE tax on distributions above salary) exceed the cost of running payroll (~$500-$2,000/year for payroll processing). This typically makes sense at $80,000-$100,000+ in net income.

**For The Vault specifically:** The Vault receives royalty income and has minimal expenses. If structured as a single-member LLC (owned by the trust), it is a disregarded entity. If the trust is a grantor trust, the income flows to the founder's personal return. An S-Corp election for The Vault is generally unnecessary because royalty income received by an IPCo that is not an active trade or business may not be subject to self-employment tax anyway (this requires CPA analysis based on the specific facts).

---

## Intercompany Royalties and the Addback Problem — Strategic Options

Given that Georgia's addback statute neutralizes the state tax deduction for intercompany royalties, the founder has several strategic options:

### Option 1: Accept the Addback (Recommended for Now)

Structure the royalties at arm's length rates per Section 482, document them properly with the 10 Principal Documents, and accept that Georgia will disallow the deduction. The royalties still serve their asset protection and organizational purposes. The federal tax treatment is unaffected by Georgia's addback statute.

**Advantages:** Simple, compliant, no risk of aggressive tax position scrutiny.
**Disadvantages:** No Georgia state tax savings from the IP licensing structure.

### Option 2: Subsection (d) Exception — Domicile The Vault in a Taxing State

If The Vault were domiciled in a state that taxes the royalty income, the operating companies could reduce the Georgia addback. But this defeats the purpose — paying state income tax in one state to get a deduction in another state is a wash (or worse, if the taxing state's rate is higher than Georgia's 5.49%).

**Verdict:** Not recommended. The math does not work in the founder's favor.

### Option 3: Subsection (f) Exception — Conduit Payments

If The Vault pays a portion of the royalty income to an unrelated third party (e.g., a third-party licensor whose technology is embedded in MedEdPrep's platform), that portion may be exempt from the addback. This requires genuine arm's length transactions with unrelated parties and a valid business purpose.

**Verdict:** Only applicable if genuine third-party licensing costs exist. Cannot be manufactured.

### Option 4: Future Expansion to Non-Addback States

As operating companies expand into states without addback statutes (e.g., Florida, Texas, or states with no income tax), the royalty deductions become valuable in those jurisdictions. The IP licensing structure is being built for the long-term multi-state operation, not just for Georgia.

**Verdict:** This is the real long-term value of the IP licensing structure. Building it correctly now means it is ready when expansion happens.

### Option 5: Georgia Consolidated Return

Georgia enacted consolidated return legislation (effective 2023-2024). Under a consolidated return, intercompany transactions between group members are eliminated. This could potentially eliminate the addback issue — but it also eliminates the royalty deduction itself, since the transactions wash out in consolidation. The net effect depends on the specific apportionment factors.

**Verdict:** Consult with a Georgia tax CPA when multiple entities are generating meaningful revenue. The consolidated return may or may not be advantageous depending on the apportionment picture.

---

## Implementation Sequence

Given the phased approach outlined in PROJECT-BRIEF.md:

### Phase 1 — Foundation (Now)

1. **Form The Vault as a Wyoming LLC.** File Articles of Organization ($100). Appoint a Wyoming registered agent (~$150/year). Draft operating agreement.
2. **Keep MedEdPrep LLC (Company A) in Georgia.** No changes needed.
3. **Form the 501(c)(3) in Georgia.** Already designed. Follow the 12-week timeline in `501c3-formation-design.md`.
4. **Execute IP transfer from MedEdPrep LLC to The Vault** using Section 351 mechanics documented in `ip-restructure.md`.
5. **Execute IP licensing agreement** from The Vault to Company A per `intercompany-licensing.md`.
6. **Do NOT form Companies B, C, D, or E yet.** Avoid entity proliferation before revenue justifies it.

### Phase 2 — Entity Separation

7. **Form Company B (Georgia LLC)** when CoAssist is ready to operate as a separate product line.
8. **Form Company C (Georgia LLC, separate brand)** when the certification program development begins. Establish independent governance board immediately.
9. **Form Company E (Georgia LLC)** when data aggregation becomes a distinct operation (not just internal analytics).

### Phase 3 — Certification Launch

10. **Company C pursues NCCA accreditation** (2.5-3 year process). The Georgia LLC structure with proper governance will satisfy NCCA Standard 3.

### Phase 4 — Optimization

11. **Establish Wyoming DAPT trust** above The Vault. Transfer The Vault membership interest into the trust.
12. **Implement full transfer pricing documentation** (10 Principal Documents).
13. **Evaluate S-Corp elections** for entities with net income exceeding ~$100,000.
14. **Form Company D (Georgia LLC)** when hospice software development begins.

---

## Total Annual Compliance Cost Estimate (All Entities at Full Build-Out)

| Entity | State | Formation (One-Time) | Annual Compliance | Notes |
|---|---|---|---|---|
| The Vault | Wyoming | $100 | ~$210 | $60 annual + ~$150 registered agent |
| Company A | Georgia | Already formed | ~$50 | Annual registration |
| Company B | Georgia | $100 | ~$50 | Annual registration |
| Company C | Georgia | $100 | ~$50 | Annual registration |
| Company D | Georgia | $100 | ~$50 | Annual registration |
| Company E | Georgia | $100 | ~$50 | Annual registration |
| 501(c)(3) | Georgia | $100 | ~$85 | $50 annual registration + $35 charitable solicitation |
| Trust | Wyoming | $0 (trust, not LLC) | ~$2,000-$5,000 | Qualified trustee fees |
| **Totals** | | **~$700** | **~$2,545-$5,545/year** | |

This does not include:
- Tax return preparation costs (each entity with income needs its own return)
- Legal fees for operating agreements, licensing agreements, trust drafting
- CPA fees for transfer pricing documentation
- NCCA application and annual fees for Company C

---

## Sources

### State Statutes and Official Sources

- **O.C.G.A. Section 48-7-28.3** — Georgia intangible expense addback statute (effective 1/1/2006). Requires addback of royalties, licensing fees, and similar intangible expenses paid to related members.
- **Georgia Department of Revenue Form IT-Addback** — Required form for related member intangible expenses and interest expense addback reporting.
- **Wyo. Stat. Section 17-29-503** — Wyoming LLC charging order protection; charging order as exclusive remedy.
- **6 Del. C. Section 18-703** — Delaware LLC charging order provision.
- **30 Del. C. Section 1902(b)(8)** — Delaware corporate income tax exemption for intangible holding company income.
- **Delaware Division of Corporations** — LLC franchise tax: $300/year flat fee.
- **Wyoming Secretary of State** — LLC formation: $100; annual report: $60 minimum.
- **Nevada Secretary of State** — LLC formation: $75 + $150 business license; annual: $150 list + $200 business license renewal.
- **Georgia Secretary of State** — LLC formation: $100 (online); annual registration: $50; foreign LLC registration: $225 + $50/year.

### NCCA/ICE Standards and Guidance

- **NCCA Standards for the Accreditation of Certification Programs (2021 revision)** — Standard 3 (Education, Training and Certification): "Appropriate separation must exist between certification and any education or training functions."
- **Shannon Carter & Ron Hanchar, "The Separation of Certification and Education," ICE Digest Q4 2016** — Confirms education and certification can coexist within a single organization with proper firewalls. Cites ACE (20+ years NCCA accreditation with internal firewalls) and DANB/DALE Foundation (separately incorporated education entity).
- **Linda K. Anguish, "Establishing a Firewall Between an Exam and Its Preparation Materials," Credentialing Insights, March 2023** — Details how ICE itself, DANB, and ACE maintain NCCA-compliant firewalls. Confirms separate incorporation is one option but NOT required.
- **ISO/IEC 17024:2012 Section 4.3** — Management of Impartiality. Requires documented impartiality policies, threat identification, and structural safeguards. Does not mandate separate jurisdiction.

### Tax and Formation Guidance

- **Jones Day, "Georgia Gets A Grasp on Passive Investment Companies: New Addback Statute Reaches Intangible And Interest Income Flowing From The State," December 2005** — Analysis of Georgia's addback statute at enactment.
- **Pillsbury Winthrop, "New Tax Legislation Shifts Consolidated Return Landscape in Georgia," May 2022** — Georgia consolidated return changes.
- **The Tax Adviser, "Continued Trend Toward State Related-Party Expense Addback," December 2008** — Survey of states with addback statutes.
- **Reed Smith, "PA Intangible Expense Add-back Law-change Creates Opportunities and Challenges for 2023 Returns," August 2024** — Example of addback statute mechanics in another state (Pennsylvania).
- **StateBusiness Compliance, "Wyoming LLC Costs 2026"** — Formation: $100, annual: $60 minimum.
- **StateBusiness Compliance, "Nevada LLC Costs 2026"** — Formation: $225, annual: $350.
- **LLC University, "Delaware LLC Costs 2026"** — Formation: $90, annual franchise tax: $300.
- **LegalClarity, "Wyoming LLC Charging Order Protection Explained," February 2025** — Detailed analysis of Wyo. Stat. Section 17-29-503 exclusive remedy provisions.

---

*This document addresses Research Queue item 1.1 (Entity Selection and State Domicile Analysis).*
