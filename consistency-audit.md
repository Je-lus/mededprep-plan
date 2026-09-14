# Research Corpus Consistency Audit

**Audit date:** 2026-04-07
**Scope:** 40+ documents across 00-overview, 01-corporate-structure, 02-ip-strategy, 03-market-landscape, 04-product-vision, 05-gaps-and-questions, 06-question-analysis

---

## Summary

The corpus is remarkably well-integrated for a set of documents produced across multiple sessions. The entity map, governance model, and psychometric strategy are consistently described. Most issues are MINOR terminological or cross-referencing gaps rather than genuine factual contradictions. Three CRITICAL and eight MODERATE issues were identified.

| Severity | Count |
|----------|-------|
| CRITICAL | 3 |
| MODERATE | 8 |
| MINOR | 14 |

---

## CRITICAL Issues

### C-1: Item Bank Size Discrepancy — Question Analysis vs. Product Vision Documents

**Files:**
- `06-question-analysis/QUESTION-ANALYSIS-REPORT.md`
- `04-product-vision/database-retroactive-analysis-plan.md`
- `00-overview/PROJECT-BRIEF.md`

**The contradiction:** The Question Analysis Report (produced from a live database query) found **10,629 total items** (9,303 published) across four pools (Standard: 2,521; Unit Exam: 3,912; Exit Exam: 1,580; Adaptive: 2,616). However, the database-retroactive-analysis-plan.md and PROJECT-BRIEF.md both describe the database as containing "hundreds of thousands of item responses" (correct -- 1.55M responses) but also refer to "hundreds of thousands of MCQ items" in ce-to-certification-item-pipeline.md (Source A description: "Hundreds of thousands of MCQ items across EMT, AEMT, and Paramedic levels").

**The actual number is ~10,600 items with ~1.55 million responses.** The phrase "hundreds of thousands" applies to responses, not items.

**Severity:** CRITICAL -- if this error propagates into psychometric planning documents, it could lead to overestimating the item bank's coverage or diversity. Item bank sizing for Company C (300-500 items per level at launch) is correctly stated elsewhere, but the false impression of a massive existing item pool could cause misallocation of item development resources.

**Suggested resolution:** Correct ce-to-certification-item-pipeline.md Source A description from "Hundreds of thousands of MCQ items" to "~10,600 items with ~1.55 million responses." Add a cross-reference to QUESTION-ANALYSIS-REPORT.md as the authoritative count.

---

### C-2: IBSC NCCA Accreditation Status — Residual Inconsistency in item-security-and-bank-separation.md

**Files:**
- `03-market-landscape/ncca-accreditation-path.md` (corrected)
- `03-market-landscape/advanced-practice-paramedic.md` (correct)
- `03-market-landscape/pp-credential-strategy.md` (corrected, with explicit note)
- `03-market-landscape/item-security-and-bank-separation.md` (STILL AMBIGUOUS)

**The contradiction:** The corpus went through a correction cycle on IBSC's NCCA status. The ncca-accreditation-path.md was corrected on 2026-04-06 with a note: "CORRECTED 2026-04-06 -- original research incorrectly stated IBSC was not accredited. Verified via NAEMT announcement and IBSC website." The pp-credential-strategy.md similarly notes the correction. However, item-security-and-bank-separation.md still contains hedging language in its IBSC section (Section 1.4): "IBSC is NCCA-accredited (correction from earlier research that suggested otherwise -- this should be verified; some sources confirm accreditation while the NCCA accreditation path document noted IBSC was NOT NCCA-accredited. The discrepancy may reflect recent changes or confusion between IBSC and BCCTPC accreditation status)."

This reads as if the author is still uncertain about the correction. The parenthetical note references the NCCA accreditation path document as still saying IBSC was NOT accredited, when that document has already been corrected.

**Severity:** CRITICAL -- IBSC's accreditation status is foundational to Company C's competitive positioning strategy. The entire PP credential strategy pivots from "accreditation gap" to "scope integration gap" based on this correction. Leaving a note in a key document that questions the correction undermines confidence in the entire competitive analysis.

**Suggested resolution:** Update item-security-and-bank-separation.md Section 1.4 to state definitively that IBSC is NCCA-accredited (CP-C, CCP-C, FP-C, TP-C), remove the hedging parenthetical, and add a source citation (NAEMT August 2018 announcement).

---

### C-3: Royalty Rate Range Inconsistency Between PROJECT-BRIEF and transfer-pricing-implementation.md

**Files:**
- `00-overview/PROJECT-BRIEF.md`
- `02-ip-strategy/transfer-pricing-implementation.md`

**The contradiction:** PROJECT-BRIEF.md states in the Intercompany Relationships table: "Royalty agreements (8-15% of revenue, Section 482 compliant)." However, transfer-pricing-implementation.md specifies a three-phase ramp:
- Phase 1 (pre-revenue / minimal): 0% or cost-recovery only
- Phase 2 ($50K-$500K revenue): 5-8%
- Phase 3 ($500K+ revenue): 10-15%

The Phase 2 rate of 5-8% falls BELOW the PROJECT-BRIEF's stated 8-15% range. Additionally, the mature-state rates vary by operating company (Company A: 12-15%, Company B: 10-12%, Company C: 10-13%, Company D: 10-12%, Company E: 8-10%), meaning Company E's mature rate of 8-10% overlaps with Phase 2 rates and the lower bound matches the PROJECT-BRIEF, but Company A's upper bound of 15% matches the PROJECT-BRIEF upper bound.

**Severity:** CRITICAL -- the PROJECT-BRIEF is the master reference document. Its royalty rate range (8-15%) does not account for the phase-in ramp or the Company E lower rate. If someone reads only the PROJECT-BRIEF, they will not know that initial rates can be 0-8%, and that the stated range only applies to mature operations. This could create problems with intercompany agreements drafted without consulting the implementation document.

**Suggested resolution:** Update PROJECT-BRIEF.md Intercompany Relationships table to read: "Royalty agreements (0-15% of revenue, phased by maturity stage, Section 482 compliant -- see transfer-pricing-implementation.md for rate schedule)" or expand the footnote.

---

## MODERATE Issues

### M-1: Board Size — 501(c)(3) Formation Design vs. Dual-Entity Framework

**Files:**
- `01-corporate-structure/501c3-formation-design.md`
- `01-corporate-structure/dual-entity-framework.md`

**The issue:** 501c3-formation-design.md recommends a **5-seat board with 80% independence** (1 founder + 4 independent). The dual-entity-framework.md, which is more of a general primer, recommends "at least 2/3 independent" and references best practices of "at least two-thirds." The PROJECT-BRIEF.md states "80%+ independent directors." These are consistent but the dual-entity-framework references a California-specific 49% familial limit rule that is presented as if it applies to Georgia. The Georgia formation design does not mention this California-specific rule.

**Severity:** MODERATE -- no contradiction, but the California law reference in the general primer could confuse someone into thinking it's a Georgia requirement.

**Suggested resolution:** Add a note to the dual-entity-framework.md table where the California 49% rule is mentioned: "California-specific; Georgia does not codify this ratio but the IRS preference applies."

---

### M-2: SME Count Discrepancies Across Documents

**Files:**
- `03-market-landscape/item-security-and-bank-separation.md`: "25-40 SMEs for initial development"
- `04-product-vision/certification-hierarchy-strategy.md`: "35-45 SMEs at maturity"
- `03-market-landscape/pp-credential-strategy.md`: "15-20 SMEs" for JTA in Immediate (Next 90 Days) recommendations

**The issue:** The SME counts refer to different activities (item development vs. full maturity across all 5 levels vs. JTA specifically) but this is not clearly distinguished when reading across documents. A reader might wonder whether 15-20 SMEs or 25-40 SMEs are needed at launch.

**Severity:** MODERATE -- the numbers are not actually contradictory (JTA panel is smaller than full item development panel, which is smaller than mature-state across all levels), but the lack of cross-referencing makes it easy to misinterpret.

**Suggested resolution:** Add a summary table in certification-hierarchy-strategy.md or item-security-and-bank-separation.md showing SME needs by phase: JTA (15-20), initial item development per level (8-12), initial development total (25-40), maturity across all levels (35-45).

---

### M-3: Item Bank Sizing — Competency Frameworks vs. Certification Hierarchy Strategy

**Files:**
- `04-product-vision/emr-competency-framework.md`: "Item bank: 250-400 launch"
- `04-product-vision/certification-hierarchy-strategy.md`: "Item bank target (launch): 200-300" for EMR

**The issue:** The EMR competency framework specifies a launch item bank of 250-400, while the certification hierarchy strategy specifies 200-300 for the same level. Similar discrepancies exist for other levels:

| Level | Competency Framework (launch) | Hierarchy Strategy (launch) |
|-------|-------------------------------|---------------------------|
| EMR | 250-400 | 200-300 |
| EMT | 350-500 | 300-450 |
| AEMT | (not explicitly stated in reviewed portion) | 300-450 |
| Paramedic | (not explicitly stated in reviewed portion) | 400-550 |
| PP | (not explicitly stated in reviewed portion) | 300-500 |

The ranges overlap but don't match. The competency frameworks generally specify higher ranges.

**Severity:** MODERATE -- the competency frameworks were likely written after the hierarchy strategy and represent refined estimates, but neither document references the other or explains the discrepancy.

**Suggested resolution:** Reconcile the numbers. Either update the hierarchy strategy to match the competency framework estimates, or add a note explaining that the competency frameworks supersede the hierarchy strategy estimates for per-level item bank sizing.

---

### M-4: Exam Size (Scored Items) — Competency Frameworks vs. Certification Hierarchy Strategy

**Files:**
- `04-product-vision/emr-competency-framework.md`: "85 scored + 5-10 diagnostic"
- `04-product-vision/certification-hierarchy-strategy.md`: "70-80" scored items for EMR
- `05-gaps-and-questions/RESEARCH-QUEUE.md`: "85 scored items" for EMR

**The issue:** The EMR competency framework and RESEARCH-QUEUE both say 85 scored items for EMR, but the certification hierarchy strategy says 70-80 scored items. Similarly for EMT:

| Level | Competency Framework | Hierarchy Strategy | RESEARCH-QUEUE |
|-------|---------------------|-------------------|----------------|
| EMR | 85 scored | 70-80 | 85 scored |
| EMT | 110 scored | 100-110 | 110 scored |
| AEMT | 115 scored | 100-110 | 115 scored |
| Paramedic | 130 scored | 120-130 | 130 scored |
| PP | 125 scored | 125 | 125 scored |

The competency frameworks and RESEARCH-QUEUE consistently report higher numbers than the hierarchy strategy. PP is the only level where they agree.

**Severity:** MODERATE -- the competency frameworks appear to be the more detailed and later documents, suggesting the hierarchy strategy numbers are earlier estimates. The RESEARCH-QUEUE matches the competency frameworks, suggesting it was updated after the frameworks were written. However, the hierarchy strategy was not updated.

**Suggested resolution:** Update certification-hierarchy-strategy.md Section 1.2 table to match the competency framework scored item counts, or add a note that the competency frameworks contain the authoritative exam specifications.

---

### M-5: Timeline to EMT Launch — Conflicting Estimates

**Files:**
- `04-product-vision/ce-to-certification-item-pipeline.md`: "EMT launch-ready: 3-4 years"
- `00-overview/PROJECT-BRIEF.md`: Phase 3 (Year 2-4) includes "EMT certification exam launches"
- `03-market-landscape/ncca-accreditation-path.md`: "~2.5 - 3 years" from zero to NCCA-accredited
- `04-product-vision/certification-hierarchy-strategy.md`: "8-9 years full accreditation" across all 5 levels

**The issue:** The CE pipeline document says EMT launch requires 3-4 years, but the PROJECT-BRIEF places it in Phase 3 starting at Year 2. The NCCA path says 2.5-3 years. These ranges overlap but suggest different assumptions:
- If "launch" means operational exam (pre-NCCA): Year 2 is plausible
- If "launch" means NCCA-accredited: 2.5-3 years minimum, meaning the PROJECT-BRIEF's "Year 2-4" is accurate for the range
- The CE pipeline's "3-4 years" for EMT launch-ready appears to be measuring from CE pipeline establishment, not from project start

The 3-4 year estimate from ce-to-certification-item-pipeline.md is specifically about building a calibrated item bank via the CE pipeline, which is a different bottleneck than NCCA accreditation.

**Severity:** MODERATE -- the estimates are not contradictory when their different scopes are understood, but the lack of cross-referencing makes it easy to read them as conflicting. Someone reading only the CE pipeline document would think EMT launch is 3-4 years out; someone reading only the PROJECT-BRIEF would think it could be as early as Year 2.

**Suggested resolution:** Add a note to the CE pipeline document clarifying that its 3-4 year estimate is for CE-pipeline-calibrated items specifically, and that the certification exam can launch with items from Source C (new item writing) before the CE pipeline is fully operational. Cross-reference the PROJECT-BRIEF timeline.

---

### M-6: NREMT Certified Provider Count — Inconsistency

**Files:**
- `00-overview/PROJECT-BRIEF.md`: "620,000+ nationally certified clinicians" (in context of CAPCE CE volume)
- `03-market-landscape/competitive-positioning-analysis.md`: "551,693 nationally certified EMS providers (NREMT 2025 data)"
- `04-product-vision/company-e-data-product-design.md`: "EMR: ~16,225; EMT: ~364,542; AEMT: ~28,294; Paramedic: ~142,632" (total: ~551,693)
- `03-market-landscape/capce-recert-by-exam-research.md`: "620,000+ nationally certified clinicians"

**The issue:** Two different total numbers are used: ~551,693 and 620,000+. The 551,693 figure comes from NREMT 2025 data and appears in the competitive positioning analysis and Company E design. The 620,000 figure appears in CAPCE-related contexts and the PROJECT-BRIEF. The likely explanation: the 551,693 is nationally REGISTERED (NREMT-only) while the 620,000 includes state-only certifications (some providers are state-certified without NREMT). Alternatively, the 620,000 figure may be from a different year or data source.

**Severity:** MODERATE -- both numbers are used in strategic planning. The CE volume math (0.5% penetration = 5.2M item responses/yr) uses the 620K figure. If the actual NREMT-certified base is 552K, the CE math is approximately 12% overstated. This doesn't change the strategic conclusion but introduces imprecision.

**Suggested resolution:** Add a footnote to capce-recert-by-exam-research.md and PROJECT-BRIEF.md explaining the source and scope of the 620K figure versus the 552K figure. If the 620K includes state-only certifications, document this. If it's from a different year, note the year.

---

### M-7: Pre-NCCA Cost Estimates — Range Mismatch

**Files:**
- `03-market-landscape/ncca-accreditation-path.md`: "Rough total to reach NCCA application readiness: $150,000 - $350,000+"
- `03-market-landscape/certification-testing-infrastructure.md`: mentions "$150K-$350K in pre-NCCA costs"

**The issue:** These are consistent with each other, but the certification-hierarchy-strategy.md mentions revenue projections starting at Year 2 ($95K-$285K) for Company C, while the pre-NCCA costs are $150K-$350K. This means Company C is projected to be cash-negative through at least Year 2, but this is never explicitly stated or analyzed. The pre-NCCA cost range was developed in the NCCA path document but is not carried forward into the hierarchy strategy's financial projections as a startup cost.

**Severity:** MODERATE -- the financial model implicitly assumes the pre-NCCA costs are absorbed before the revenue projections begin, but this is not made explicit. Someone reading only the hierarchy strategy might think Company C generates positive returns from Year 2 without understanding the $150K-$350K sunk cost.

**Suggested resolution:** Add a "Startup Investment" section to certification-hierarchy-strategy.md that carries forward the pre-NCCA cost estimate from ncca-accreditation-path.md and shows the cumulative cash position including startup costs.

---

### M-8: CoAssist Revenue Projections — Year 1 Range vs. Market Size

**Files:**
- `03-market-landscape/coassist-market-strategy.md`: "Revenue projections ($42K-$126K Year 1 -> $1M-$3.3M Year 5)"
- `00-overview/PROJECT-BRIEF.md`: references CoAssist but does not include Company B revenue projections

**The issue:** The coassist-market-strategy.md provides detailed Year 1 projections ($42K-$126K) based on 3-tier pricing ($0/$1,500/$2,500), but the total addressable market (750+ Paramedic programs + 500-1,500 AEMT programs) at the stated pricing would yield a maximum theoretical market of ~$5.6M/yr (2,250 programs x $2,500). The Year 5 high estimate of $3.3M implies ~59% market penetration at Enterprise tier, or near-total penetration at Professional tier. This is aggressive but not explicitly flagged as such.

**Severity:** MODERATE -- the projections are internally consistent but the penetration assumptions underlying the Year 5 high scenario are not documented. This matters for grant applications and investor presentations where revenue projections must be defensible.

**Suggested resolution:** Add penetration rate assumptions to the Year 5 projections in coassist-market-strategy.md.

---

## MINOR Issues

### m-1: Terminology Drift — "Trait Ontology" vs. "Cognitive Process Taxonomy"

**Files:** database-retroactive-analysis-plan.md, cognitive-process-tagging-rubric.md, validation-implementation-plan.md, PROJECT-BRIEF.md

**The issue:** The same concept is called "trait ontology" in some documents (database-retroactive-analysis-plan.md title, PROJECT-BRIEF.md) and "cognitive process taxonomy" in others (cognitive-process-tagging-rubric.md, validation-implementation-plan.md). These refer to the same 6-level framework, but "ontology" and "taxonomy" have distinct meanings in information science (ontology implies relationships between concepts; taxonomy implies hierarchical classification).

**Suggested resolution:** Standardize on one term. "Cognitive process taxonomy" is more precise for what this actually is (a hierarchical classification scheme). Reserve "trait ontology" for the broader construct of the measurement framework including content domains + cognitive levels + their relationships.

---

### m-2: 501(c)(3) Board Size — "80%" in PROJECT-BRIEF vs. "75%+" in 501c3-formation-design Firewall Checklist

**Files:** PROJECT-BRIEF.md, 501c3-formation-design.md

**The issue:** PROJECT-BRIEF.md says "80%+ independent directors." The 501c3-formation-design.md Firewall Checklist says "75%+ independent directors." The recommended board structure in the same document is 4 independent out of 5 (80%). The 75% figure in the firewall checklist appears to be a minimum threshold (3 out of 4 if starting with fewer directors), while 80% is the target. Both are correct in context but could confuse.

**Suggested resolution:** Update the firewall checklist in 501c3-formation-design.md from "75%+" to "80% target (75% minimum during initial formation period)."

---

### m-3: Stale TBD — Company C Brand Name

**Files:** Multiple documents reference Company C as "[TBD Brand] Certification"

**The issue:** The Company C brand name is listed as a Founder Decision Needed (#3 in RESEARCH-QUEUE.md). This is correctly tracked but dozens of documents reference "[TBD Brand]" or "Company C." This is not an inconsistency per se, but a pervasive placeholder that should be resolved before any external-facing documents are produced.

**Suggested resolution:** Track this as a blocker for any documents that will be shown to external stakeholders.

---

### m-4: 501(c)(3) Name — TBD

**Files:** PROJECT-BRIEF.md, 501c3-formation-design.md, RESEARCH-QUEUE.md

**The issue:** Same as m-3 but for the nonprofit. Tracked as Founder Decision #1 in RESEARCH-QUEUE.md. Not an inconsistency, but a known gap.

**Suggested resolution:** No action beyond what's already tracked.

---

### m-5: Database Retroactive Analysis — Timeline Discrepancy

**Files:**
- `04-product-vision/database-retroactive-analysis-plan.md`: "12-17 week timeline" (stated in PROJECT-BRIEF index)
- `04-product-vision/validation-implementation-plan.md`: "16-week timeline"

**The issue:** The analysis plan says 12-17 weeks. The implementation plan says 16 weeks. These cover the same work but the ranges don't precisely align (16 weeks falls within 12-17, so technically consistent, but the implementation plan's precision suggests it's a refined estimate).

**Suggested resolution:** Update the database-retroactive-analysis-plan.md or its PROJECT-BRIEF description to reference the validation-implementation-plan's 16-week timeline as the operational estimate.

---

### m-6: "Question Bank" vs. "Item Bank" Terminology

**Files:** Multiple documents use both terms interchangeably.

**The issue:** Psychometric convention uses "item bank." Education convention uses "question bank." The corpus uses both: QUESTION-ANALYSIS-REPORT.md uses "question bank" in its title, while certification-hierarchy-strategy.md and ce-to-certification-item-pipeline.md consistently use "item bank." The database tables use "questions" (the education-side model).

**Suggested resolution:** Adopt "item bank" for all certification-related documents and "question bank" for Company A education-related documents. This actually reinforces the A/C firewall conceptually.

---

### m-7: Competency Framework Domain Count — PP vs. Other Levels

**Files:** Competency frameworks across all 5 levels

**The issue:** EMR/EMT/AEMT/Paramedic all use 5 domains. PP uses 7 domains. The certification-hierarchy-strategy.md shared domain taxonomy (Section 2.1) lists 9 base domains + 2 expanded (Paramedic+) + 2 PP-only = 13 possible domains. The competency frameworks' 5-domain structure does not directly map to the 13-domain taxonomy in the hierarchy strategy. The hierarchy strategy appears to represent a finer-grained domain structure for analytics purposes (Company E), while the competency frameworks group these into broader assessment domains.

**Suggested resolution:** Add a mapping table to certification-hierarchy-strategy.md showing how the 5 competency framework domains for each level map to the 13-domain analytics taxonomy.

---

### m-8: RESEARCH-QUEUE Item Numbering

**File:** RESEARCH-QUEUE.md

**The issue:** Section numbering jumps from 3.5 to 4.1 with no items 3.6 or beyond listed as open or pending. The numbering gaps suggest items may have been merged or removed without renumbering.

**Suggested resolution:** Verify no research items were lost in editing. If the numbering gaps are intentional (completed items removed), add a note.

---

### m-9: Stale "Phase 1" Timing

**Files:** PROJECT-BRIEF.md, entity-domicile-analysis.md, transfer-pricing-implementation.md

**The issue:** PROJECT-BRIEF.md labels Phase 1 as "(Now)" and entity-domicile-analysis.md Implementation Sequence Phase 1 says "Now through Month 6." The transfer-pricing-implementation.md Phase 1 says "Now through Month 6." All documents are dated 2026-04-06. "Now" will become stale as time passes. Additionally, the 501c3-30-day-action-plan.md starts its day-by-day checklist from 2026-04-06.

**Suggested resolution:** Consider adding an explicit start date (e.g., "Phase 1: Q2 2026 - Q4 2026") rather than "Now."

---

### m-10: Company A EOPA Price

**Files:** PROJECT-BRIEF.md mentions "$30/student/attempt" for EOPA. No other document references this specific price.

**The issue:** Not a contradiction but a single source for a specific pricing claim. If EOPA pricing changes, only the PROJECT-BRIEF would need updating, but there's no document tracking pricing changes.

**Suggested resolution:** Consider adding EOPA pricing to the competitive-positioning-analysis.md or coassist-market-strategy.md for cross-reference.

---

### m-11: Entity Domicile — "The Vault" Formation Timing

**Files:**
- `01-corporate-structure/entity-domicile-analysis.md`: Implementation Sequence Phase 1 says "Form The Vault as a Wyoming LLC" as the first action
- `02-ip-strategy/transfer-pricing-implementation.md`: Phase 1 trust section says "No action required" for trust, but recommends forming The Vault "as a founder-owned LLC"
- `00-overview/PROJECT-BRIEF.md`: Phase 1 includes "Formalize IP ownership (what lives in The Vault)"
- `01-corporate-structure/entity-domicile-analysis.md`: Phase 1, Step 6 says "Do NOT form Companies B, C, D, or E yet"

**The issue:** These are all consistent but scattered. The entity-domicile-analysis says to form The Vault in Phase 1, while the transfer-pricing doc says to form it "as a founder-owned LLC" (implicitly now), and the PROJECT-BRIEF says to "formalize IP ownership." No single checklist consolidates these.

**Suggested resolution:** The 501c3-30-day-action-plan.md provides a detailed checklist for the nonprofit but no equivalent exists for The Vault formation. Consider creating one.

---

### m-12: Wyoming DAPT Statute of Limitations

**Files:**
- `01-corporate-structure/entity-domicile-analysis.md`: "2-year statute of limitations for creditor challenges (shortest in the country alongside Nevada)"
- `01-corporate-structure/trust-ownership.md`: References "Nevada's 2-year windows" and "Delaware's 4-year window" but presents Wyoming's DAPT provisions more generally without specifying the exact statute of limitations period

**The issue:** The entity-domicile-analysis is more specific about Wyoming's 2-year period than the trust-ownership document, which covers Wyoming in less detail than Delaware and Nevada. A reader of only the trust-ownership document might not understand Wyoming's competitive advantage on this specific point.

**Suggested resolution:** Add Wyoming's 2-year statute of limitations explicitly to the trust-ownership.md comparison, or cross-reference the entity-domicile-analysis.

---

### m-13: Adaptive Exam Response Volume — Freshness of Data

**Files:**
- `06-question-analysis/QUESTION-ANALYSIS-REPORT.md`: "42,555 adaptive responses, 254 unique users, since Nov 2025"
- `04-product-vision/database-retroactive-analysis-plan.md`: refers to adaptive exam data as a source but does not mention the small sample size

**The issue:** The adaptive exam pool only has 254 users and 42,555 responses as of the report date. The database analysis plan does not flag this as a limitation for IRT calibration (which typically needs 200+ examinees per item for stable 2PL parameters, and the adaptive pool has items with as few as 5 attempts). The plan should note that the adaptive pool may need significantly more data before IRT calibration is reliable for those items.

**Suggested resolution:** Add a note to database-retroactive-analysis-plan.md acknowledging that the adaptive pool's sample sizes (as of the question analysis report) are borderline for IRT and that the standard and unit exam pools should be the primary calibration source.

---

### m-14: Missing Cross-Reference — Question Analysis Encoding Bug

**Files:**
- `06-question-analysis/QUESTION-ANALYSIS-REPORT.md`: Documents HTML entity encoding bug affecting 243 items
- `04-product-vision/validation-implementation-plan.md`: Does not reference this bug
- `04-product-vision/database-retroactive-analysis-plan.md`: Does not reference this bug

**The issue:** The Question Analysis Report identifies a critical data quality issue (HTML encoding mismatch in 243 items causing incorrect scoring). The psychometric validation plans do not reference this finding. Since the validation plans were likely written before the analysis report, they could not have known about it -- but now that the finding exists, the plans should reference it as a prerequisite data cleaning step.

**Suggested resolution:** Add a Phase 0 prerequisite to both validation-implementation-plan.md and database-retroactive-analysis-plan.md: "Fix HTML entity encoding mismatch in 243 items per QUESTION-ANALYSIS-REPORT.md before extracting response matrix. Failure to fix this will corrupt difficulty estimates for affected items."

---

## Orphaned Questions / Unaddressed Decisions

The following questions were raised in documents but do not appear in the RESEARCH-QUEUE.md as tracked items:

1. **Form 1023 vs. 1023-EZ decision** — 501c3-formation-design.md recommends Form 1023 (full form). This is framed as a recommendation, not a confirmed decision. It does not appear in the RESEARCH-QUEUE Founder Decisions list.

2. **S-Corp elections for operating entities** — entity-domicile-analysis.md discusses when S-Corp elections make sense ($80K-$100K+ net income) but no document tracks when this decision should be revisited. It's mentioned as a Phase 4 action in the implementation sequence.

3. **Psychometrician hire/engagement timing** — Multiple documents reference the need for a psychometrician (validation-implementation-plan.md, psychometric-literature-review.md mentions "6 key papers for psychometrician"), but no document tracks this as a specific hiring decision with a timeline.

4. **CAPCE application timing** — Listed as Founder Decision #11 in RESEARCH-QUEUE.md. The capce-recert-by-exam-research.md provides extensive analysis but does not make a recommendation on timing relative to Company C formation.

---

## Documents That Need No Corrections

The following documents were reviewed and found to be internally consistent with all other documents, with no issues identified:

- `01-corporate-structure/dual-entity-framework.md` (minor California note, addressed above)
- `01-corporate-structure/trust-ownership.md`
- `02-ip-strategy/ip-restructure.md`
- `02-ip-strategy/intercompany-licensing.md`
- `03-market-landscape/accreditation-landscape.md`
- `03-market-landscape/certification-standards.md`
- `04-product-vision/cognitive-process-tagging-rubric.md`
- `04-product-vision/psychometric-literature-review.md`
- `04-product-vision/pulse-item-types-psychometric-analysis.md`
- `04-product-vision/company-e-data-product-design.md`
- `04-product-vision/company-e-technical-architecture.md`

---

*Audit completed: 2026-04-07*
