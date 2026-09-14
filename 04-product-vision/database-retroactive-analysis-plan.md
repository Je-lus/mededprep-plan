# Database Retroactive Analysis Plan

## Psychometric Validation of the MedEdPrep Item Bank

**Objective:** Empirically validate that MedEdPrep's 10,629 items can serve both certification (pass/fail) and diagnostic (content-domain profiling) purposes using a bifactor measurement model. Establish the trait ontology and calibration pipeline that feeds Company C certification exams, Company A adaptive testing, and Company E population analytics.

**Production Database:** `mededprep_db_06_03_2026.zip`
**Principal Analyst:** Brad Yang (UIUC PhD student, R/mirt/rstan), June 15 -- August 21, 2026
**Oversight:** Jeramey Lazarus (psychometric architecture), Heather (SME coordination)

---

## Item Bank Summary

| Pool | Items | Responses | Notes |
|------|------:|----------:|-------|
| Standard | 2,521 | ~504K | Skews easy (65% > 0.60 difficulty) |
| Unit Exam | 3,912 | ~998K | Heavily easy (55% very easy, p > 0.80) |
| Exit Exam | 1,580 | ~6K | Lower response volume; calibration may require pooling |
| Adaptive | 2,616 | ~42.5K | Best difficulty distribution; IRT starting point |
| **Total** | **10,629** | **1,550,942** | |

**Existing Metadata per Item:**
- Content domain: categories (M2M) and subcategories (up to 4+)
- Learning objectives: up to 10 per item, already tagged
- Bloom's taxonomy level (legacy tagging -- coverage and accuracy TBD)
- Difficulty (legacy static field, not IRT-calibrated)
- Exam level (EMT / AEMT / Paramedic)
- Confidence data: 1M+ unit exam responses tagged High/Medium/Low
- Time spent: tracked on adaptive exam responses (correct mean 45.3s, incorrect mean 54.6s)

---

## Phase 0: Bank-Wide Analysis -- COMPLETED

**Completed:** April 2026
**Full Report:** `06-question-analysis/QUESTION-ANALYSIS-REPORT.md`

### What Was Done

Extracted and analyzed the full production database to establish an empirical baseline for the item bank. First comprehensive analysis in the platform's history.

### Key Findings

1. **Scale confirmation.** 10,629 items, 1,550,942 responses. Peak month (March 2026) had 203K responses. Volume substantially exceeds IRT calibration thresholds across all pools except Exit Exam.

2. **HTML entity encoding bug (BLOCKER).** 243 items store HTML entities in option text (e.g., `&#039;` for apostrophe) but `selected_option` stores the decoded character (`'`). Difficulty index calculations score these students as incorrect even when they selected the right answer. Some of the 112 "very hard" flagged items are false positives from this bug. Must be resolved before any calibration work.

3. **Difficulty distribution skew.** Unit exam pool: 55% of items at p > 0.80, only 13% in the diagnostically rich 0.41--0.60 band. Standard pool similar but less severe. Adaptive pool has the healthiest distribution (16.4% hard/very-hard vs 6.8% for unit exam). Implication: the unit exam and standard pools will have restricted range on the general factor, limiting discrimination.

4. **Confidence data is a rare asset.** 1M+ unit exam responses with High/Medium/Low confidence tags. Clean correctness gradient (73.1% correct at Low confidence, 86.5% at High). This is a metacognitive signal that almost no competitor has at scale. Feeds the UIUC metacognition study and eventually the diagnostic reporting system.

5. **Adaptive pool time data.** 254 users, 42.5K responses since November 2025 launch, 69.2% overall correct rate. Time-on-task data enables response-time modeling as a supplemental indicator of item engagement and cognitive load.

6. **IRT readiness.** Data volume is sufficient to begin calibration on the adaptive pool immediately (after encoding fix). Full bank calibration is feasible but requires the encoding fix and a discrimination index pass first.

---

## Phase 1: Data Cleanup

**Timeline:** Weeks 1--3 of internship (June 15 -- July 4)
**Owner:** Brad Yang (analysis), Jeramey/Kaushtuv (production fix deployment)
**Deliverables:** Clean response matrix, item flagging report, encoding fix PR

### 1.1 HTML Entity Encoding Resolution

**Problem:** 243 items have mismatched encoding between `question_options` (HTML entities) and `selected_option` (decoded text). This corrupts all downstream scoring.

**Steps:**

1. **Identify affected items.** Query all questions where any option text contains HTML entities (`&#039;`, `&amp;`, `&quot;`, `&lt;`, `&gt;`, `&#39;`, `&apos;`). Cross-reference against the 243 items identified in Phase 0. Confirm the full set -- there may be additional encoding variants not caught in the first pass.

2. **Quantify impact.** For each affected item, compute:
   - Number of responses where `selected_option` fails to match any option due to encoding
   - Estimated correct count before vs after fix (use decoded comparison)
   - Change in classical difficulty index (p-value) after correction
   - List of items whose difficulty classification changes (e.g., "very hard" to "medium")

3. **Production fix.** Two options (decide with Kaushtuv):
   - **Option A (preferred):** Normalize all `question_options` to decoded text at the database level. Backfill `selected_option` matching. This is a one-time migration.
   - **Option B:** Add encoding-aware comparison logic to all scoring paths. More defensive but creates ongoing complexity.

4. **Validation.** After fix: recompute difficulty indices for all 243 items. Confirm no remaining mismatches. Produce before/after comparison table.

**Output:** `phase-1/encoding-fix-report.md` with before/after difficulty indices, affected item IDs, and production fix verification.

### 1.2 Bank-Wide Discrimination Index Pass

**Purpose:** Identify items that fail to discriminate between high-performing and low-performing examinees. These items contribute noise, not signal, to any measurement model.

**Method:**

1. **Corrected point-biserial correlation (rpb).** For each item, compute the correlation between item score (0/1) and total score on the parent pool (excluding that item). Use the corrected form to avoid part-whole contamination.

   ```r
   # Pseudocode -- Brad will implement in R
   for each item i in pool:
     total_minus_i = total_score - item_score_i
     rpb_i = cor(item_score_i, total_minus_i)
   ```

2. **Flag items by rpb threshold:**
   - rpb < 0.10: **Retire** -- item does not discriminate; likely ambiguous, miskeyed, or trivially easy/hard
   - rpb 0.10--0.19: **Review** -- marginal discrimination; SME review before including in calibration
   - rpb >= 0.20: **Retain** -- adequate or better discrimination for classical analysis

3. **Conditional flags.** Items with very high p-values (> 0.95) or very low p-values (< 0.05) will naturally have compressed rpb due to restricted variance. Flag these separately as "extreme difficulty" rather than "poor discrimination." They may serve pedagogical purposes even if they don't contribute to measurement precision.

4. **Pool-specific analysis.** Run discrimination analysis within each pool (Standard, Unit Exam, Exit Exam, Adaptive) separately. Cross-pool aggregation introduces confounds from different examinee populations and testing conditions.

**Expected yield:** Based on the difficulty distribution from Phase 0, estimate 300--600 items flagged for review/retirement (primarily from the unit exam pool's easy-item concentration).

**Output:** `phase-1/discrimination-report.md` with per-pool rpb distributions, flagged item lists, and retirement recommendations. CSV export of all item-level statistics for downstream phases.

### 1.3 Response Matrix Construction

**Purpose:** Build the clean, analysis-ready response matrices that all subsequent phases depend on.

**For each pool, produce:**
- Binary response matrix (examinees x items, 0/1 scored)
- Response metadata matrix (examinee ID, timestamp, confidence tag where available, time_spent where available)
- Examinee summary statistics (total score, number of items attempted, date range)
- Item summary statistics (n responses, p-value, rpb, proportion missing)

**Exclusion criteria:**
- Items flagged for retirement in 1.2
- Examinees with fewer than 10 responses in the pool (insufficient data for theta estimation)
- Responses on the 243 encoding-affected items prior to the production fix (use post-fix recalculated scores only)

**Data format:** R-native (.rds) for analysis, CSV exports for archival and cross-platform use.

**Output:** `phase-1/response-matrices/` directory with per-pool matrices and documentation of all exclusion decisions.

### 1.4 Phase 1 Checkpoint (End of Week 3)

Brad and Jeramey review:
- [ ] Encoding fix deployed and validated
- [ ] Discrimination report reviewed -- retirement decisions finalized
- [ ] Clean response matrices built and spot-checked
- [ ] Any items where scoring logic is ambiguous (partial credit, multiple-select) identified and documented
- [ ] Phase 2 analysis plan confirmed based on actual data properties

---

## Phase 2: IRT Calibration

**Timeline:** Weeks 3--8 (July 1 -- August 8), overlapping with Phase 1 completion
**Owner:** Brad Yang
**Deliverables:** Calibrated item parameters for all pools, model fit documentation, CAT simulation results

### 2.1 Adaptive Pool Calibration (Primary Target)

**Why start here:** The adaptive pool (2,616 items, 42.5K responses, 254 examinees) has the best difficulty distribution and was designed for measurement. It is the natural proving ground for the IRT pipeline before extending to the full bank.

**Model selection rationale:**

- **2PL (two-parameter logistic) as the primary model.** Estimates difficulty (b) and discrimination (a) per item. The 2PL is the workhorse of educational measurement and the most defensible starting point.

- **3PL (three-parameter logistic) as a comparison.** Adds a lower asymptote (c) parameter to account for guessing on multiple-choice items. With 4-option MCQ, the theoretical guessing floor is 0.25. However, the 3PL requires substantially more data per item to estimate the c parameter reliably (rule of thumb: 1,000+ responses per item). The adaptive pool's 42.5K responses across 2,616 items averages ~16 responses per item -- **insufficient for 3PL estimation on most items.** The 3PL will be fit for comparison but is unlikely to be the operational model for this pool.

- **Decision rule:** If 2PL fits adequately (see fit criteria below), use 2PL. If systematic misfit appears at low ability levels (suggesting guessing), consider constrained 3PL (fixed c = 0.20 or c = 0.25 for 4-option MCQ) or a mixture model. Brad has the methodological depth to make this call.

**Implementation in R (mirt package):**

```r
library(mirt)

# Fit 2PL to adaptive pool response matrix
mod_2pl <- mirt(response_matrix, model = 1, itemtype = "2PL",
                SE = TRUE, verbose = TRUE)

# Fit 3PL for comparison (may not converge on all items)
mod_3pl <- mirt(response_matrix, model = 1, itemtype = "3PL",
                SE = TRUE, verbose = TRUE)

# Compare models
anova(mod_2pl, mod_3pl)

# Extract item parameters
item_params <- coef(mod_2pl, IRTpars = TRUE, simplify = TRUE)$items

# Model fit
M2(mod_2pl)  # M2 statistic (limited-information goodness of fit)
itemfit(mod_2pl, fit_stats = "S_X2")  # Item-level fit (Orlando & Thissen S-X2)
```

**Model fit criteria:**
- **Global fit:** RMSEA < 0.05 (good), < 0.08 (acceptable). CFI > 0.95. SRMSR < 0.05.
- **Item fit:** S-X2 statistic with Benjamini-Hochberg correction for multiple comparisons. Items with significant misfit (adjusted p < 0.05) flagged for review -- inspect ICCs visually before deciding to remove.
- **Residual analysis:** Check Q3 statistics (Yen's Q3) for local dependence between item pairs. Pairs with |Q3| > 0.20 above the average Q3 suggest local dependence (items measuring something beyond the latent trait, or items that are too similar).

**Expected item parameter ranges (EMS-specific priors):**
- Discrimination (a): 0.5 -- 2.5 (most items 0.8 -- 1.5 for well-written MCQ)
- Difficulty (b): -3.0 to +3.0 (centered at 0 by convention)
- Items with a < 0.3 are functionally non-discriminating and should be reviewed
- Items with |b| > 3.0 are extreme and contribute little information for typical examinees

### 2.2 Theta Estimation for Examinees

Once the item parameters are calibrated, estimate person ability (theta) for all examinees in the adaptive pool.

```r
# EAP (Expected a Posteriori) estimation -- most stable for short tests
theta_eap <- fscores(mod_2pl, method = "EAP")

# MAP (Maximum a Posteriori) for comparison
theta_map <- fscores(mod_2pl, method = "MAP")

# Standard errors of theta estimates
theta_se <- fscores(mod_2pl, method = "EAP", full.scores.SE = TRUE)
```

**Validation:**
- Correlate IRT theta estimates with raw total scores -- should be monotonically related but not perfectly linear (IRT accounts for item difficulty)
- Plot theta distributions -- should approximate normal (or mildly skewed) for a general-population student sample
- Examine conditional standard error of measurement (CSEM) across the theta continuum -- identifies ranges where the bank provides more vs less measurement precision
- Cross-validate: split examinees into calibration (70%) and validation (30%) sets. Estimate parameters on calibration, predict responses on validation, evaluate prediction accuracy

### 2.3 Full Bank Extension

After the adaptive pool validates the pipeline, extend to the remaining pools.

**Pool-specific considerations:**

| Pool | Challenge | Mitigation |
|------|-----------|------------|
| Standard (2,521 items, ~504K responses) | Easy skew limits discrimination range | Anchor items from adaptive pool for linking; accept that many easy items will have low information |
| Unit Exam (3,912 items, ~998K responses) | 55% very easy; different testing context (formative vs summative) | Calibrate separately; do NOT assume same latent trait as adaptive pool without empirical test of invariance |
| Exit Exam (1,580 items, ~6K responses) | Low response volume (~4 responses/item average) | May need to pool with standard/unit data for linking; sparse-data IRT methods (Bayesian priors on item parameters via rstan) |

**Linking strategy:** If pools measure the same construct (EMS competency), item parameters should be comparable after equating. Test this empirically:
1. Identify items that appear in multiple pools (if any exist as anchor items)
2. If no shared items: use examinee linking (students who took exams in multiple pools)
3. If neither: treat pools as separate scales until the bifactor model (Phase 3) provides a common framework

**Exit Exam sparse data approach (Brad's rstan skills are critical here):**

```r
library(rstan)

# Bayesian 2PL with informative priors for sparse data
# Prior on discrimination: lognormal(0, 0.5) -- weakly informative, keeps a > 0
# Prior on difficulty: normal(0, 1.5) -- centered, moderate spread
# This regularizes estimates when response counts are low

stan_model <- "
data {
  int<lower=1> N;  // number of responses
  int<lower=1> I;  // number of items
  int<lower=1> J;  // number of examinees
  int<lower=1,upper=I> item[N];
  int<lower=1,upper=J> person[N];
  int<lower=0,upper=1> y[N];
}
parameters {
  vector[J] theta;
  vector<lower=0>[I] a;
  vector[I] b;
}
model {
  theta ~ normal(0, 1);
  a ~ lognormal(0, 0.5);
  b ~ normal(0, 1.5);
  for (n in 1:N)
    y[n] ~ bernoulli_logit(a[item[n]] * (theta[person[n]] - b[item[n]]));
}
"
```

### 2.4 CAT Simulation (Computerized Adaptive Testing)

**Purpose:** Using the calibrated item parameters, simulate adaptive test administrations to determine:
- How many items are needed for a reliable pass/fail decision
- Which items the CAT algorithm selects most frequently (high-information items)
- Where the item bank has coverage gaps (theta ranges with low information)

**Simulation design:**

```r
library(mirtCAT)

# Define the item bank from calibrated parameters
bank <- generate.mirt_object(item_params, itemtype = "2PL")

# Simulate CAT for a range of true theta values
theta_grid <- seq(-3, 3, by = 0.5)

for (true_theta in theta_grid) {
  sim <- mirtCAT(
    mo = bank,
    criteria = "MI",        # Maximum Information selection
    start_item = "MI",      # Start with max info item at prior mean
    method = "EAP",         # Theta estimation during CAT
    design = list(
      min_items = 15,       # Minimum test length
      max_items = 50,       # Maximum test length
      classify_CI = c(-1, 1)  # Classification boundaries (adjust to pass/fail cut)
    ),
    true_theta = true_theta
  )
}
```

**Key outputs:**
- Test information function (TIF) -- where does the bank provide the most precision?
- Average test length for classification decisions at different ability levels
- Item exposure rates -- identify overexposed items (security risk) and underexposed items (wasted inventory)
- Classification accuracy: sensitivity and specificity for pass/fail at the operational cut score
- Conditional standard error of measurement at the cut score (this is the number that matters most for certification)

### 2.5 Phase 2 Checkpoint (End of Week 8)

Brad and Jeramey review:
- [ ] 2PL (and optionally 3PL) models fit to adaptive pool with acceptable fit statistics
- [ ] Item parameters estimated with reasonable standard errors
- [ ] Theta estimates validated against external criteria (if available)
- [ ] At least one additional pool calibrated (Standard or Unit Exam)
- [ ] CAT simulation results informing minimum test length for certification
- [ ] Local dependence analysis complete -- item pairs flagged
- [ ] Exit Exam calibration strategy decided (frequentist vs Bayesian)
- [ ] All code documented and reproducible (R scripts with comments, not notebooks)

---

## Phase 3: Bifactor Model

**Timeline:** Weeks 6--10 (late July -- mid-August), overlapping with Phase 2
**Owner:** Brad Yang (modeling), Jeramey (domain structure decisions)
**Deliverables:** Bifactor model fit, item loading matrix, dual-purpose item classification

### 3.1 Theoretical Foundation

The bifactor model posits that item responses are explained by:
- **One general factor (G):** Overall EMS competency. This is the factor that feeds certification pass/fail decisions. Every item loads on G.
- **Multiple specific factors (S1, S2, ... Sk):** Content-domain competencies (e.g., Airway Management, Cardiology, Trauma). These feed diagnostic reporting. Each item loads on exactly one specific factor (in addition to G).

This is the structural hypothesis that must be tested: **items simultaneously measure both a general EMS competency dimension (certification-relevant) and a specific content-domain dimension (diagnostic-relevant).**

**Why bifactor and not simple multidimensional IRT:** The bifactor structure is both theoretically motivated (EMS competency has a general component AND domain-specific components) and practically required (we need a single score for pass/fail AND domain scores for diagnosis). A correlated-factors model would confound general and specific variance.

### 3.2 Content Domain Structure Definition

Before fitting the model, we must define the specific factors. These come from the item bank's existing content tagging.

**Step 1: Map existing categories to bifactor domains.**
- Extract all category and subcategory tags from the item bank
- Crosswalk against the NHTSA taxonomy (4 foundational -> 10 domains -> 45 subtopics -> 259 objectives, from `ems-books-rag/configs/nhtsa_taxonomy.json`)
- Determine the grain size for specific factors. Too many factors (45 subtopics) = estimation problems. Too few (4 foundational) = loss of diagnostic specificity.
- **Target: 8--12 specific factors** -- enough for meaningful diagnostic profiles, few enough for stable estimation

**Step 2: Verify item-to-factor assignment.**
- Each item must map to exactly one specific factor (bifactor constraint)
- Items tagged with multiple categories need a primary assignment rule
- Document any items that genuinely cross domains (these may load weakly on their assigned specific factor -- that's informative, not a problem)

### 3.3 Model Specification and Estimation

```r
library(mirt)

# Define bifactor model specification
# Example with 10 content domains:
spec <- '
  G = 1-2616          # General factor: all items
  S1 = 1-312           # Airway/Ventilation items
  S2 = 313-580         # Cardiology items
  S3 = 581-820         # Trauma items
  S4 = 821-1050        # Medical items
  S5 = 1051-1290       # OB/Pediatrics items
  S6 = 1291-1510       # EMS Operations items
  S7 = 1511-1720       # Pharmacology items
  S8 = 1721-1950       # Assessment items
  S9 = 1951-2200       # Pathophysiology items
  S10 = 2201-2616      # Patient Care items
'

# Item numbers above are illustrative -- actual assignment from Step 2

# Fit bifactor model (exploratory then confirmatory)
mod_bifactor <- bfactor(response_matrix, model = spec, itemtype = "2PL",
                        SE = TRUE)

# Alternative: start with exploratory bifactor
mod_explore <- bfactor(response_matrix, nclusters = 10, itemtype = "2PL")
```

**Estimation considerations:**
- The bifactor model is computationally expensive. With 2,616 items, full-information estimation may not converge. Use limited-information methods (MHRM or EM with dimensional reduction) as needed.
- Start with the adaptive pool. If the full pool is intractable, fit the bifactor to each domain's items + a random sample of other-domain items (to anchor the general factor).
- Brad's rstan skills provide a fallback: Bayesian bifactor estimation via Stan handles convergence issues that MML can't.

### 3.4 Evaluating the Bifactor Structure

**Model comparison:**
- Compare bifactor model to: (1) unidimensional model, (2) correlated factors model, (3) second-order factor model
- Use AIC, BIC, SABIC for relative fit; M2/RMSEA/CFI for absolute fit
- Bifactor should fit substantially better than unidimensional (if not, the bank is essentially unidimensional and specific factors don't add diagnostic value -- this is a possible outcome)

**Item-level bifactor analysis:**

For each item, extract:

| Metric | Definition | Interpretation |
|--------|-----------|----------------|
| General factor loading (lambda_G) | Loading on G | Item's contribution to overall competency measurement |
| Specific factor loading (lambda_S) | Loading on its assigned S factor | Item's contribution to domain-specific measurement |
| Explained Common Variance -- General (ECV-G) | lambda_G^2 / (lambda_G^2 + lambda_S^2) | Proportion of item's common variance explained by G |
| Item H index | Ratio of item's contribution to composite reliability on each factor | How much the item contributes to score reliability |
| Omega hierarchical (omega_H) | General factor's contribution to total composite reliability | Scale-level unidimensionality |
| Omega hierarchical subscale (omega_HS) | Specific factor's contribution after removing G | Subscale reliability after accounting for G |

### 3.5 Item Classification for Dual-Purpose Use

Based on the bifactor loadings, classify each item:

| Classification | Criteria | Use |
|---------------|----------|-----|
| **Dual-purpose** | lambda_G >= 0.30 AND lambda_S >= 0.30 | Both certification CAT and diagnostic reporting |
| **Certification-only** | lambda_G >= 0.30 AND lambda_S < 0.30 | Certification CAT; weak diagnostic signal |
| **Diagnostic-only** | lambda_G < 0.30 AND lambda_S >= 0.30 | Diagnostic supplement; don't use in pass/fail CAT |
| **Neither** | lambda_G < 0.30 AND lambda_S < 0.30 | Candidate for retirement or revision |

**Loading thresholds (0.30) are starting points.** The operational thresholds will be determined empirically by examining the distribution of loadings and their relationship to item content. Brad should produce loading distributions and recommend thresholds based on the data.

**Expected outcomes:**
- Most well-written MCQ items should be dual-purpose (meaningful general factor loading + content specificity)
- Very easy items (p > 0.90) will likely have low loadings on both factors (floor effect compresses variance)
- Items with high general factor loading but low specific factor loading are often "general knowledge" items that don't tap domain-specific expertise
- Items with high specific factor loading but low general factor loading are domain-specific details that don't predict overall competency

### 3.6 Reliability and Score Reporting Implications

**For certification (Company C):**
- omega_H (general factor reliability) determines whether a single pass/fail score is defensible
- Target: omega_H >= 0.80 for the adaptive pool
- If omega_H is too low, the bank is too multidimensional for a single cut score -- would need domain-level pass/fail (which the current system already does at 70% per domain)

**For diagnostic reporting (Company A / Company E):**
- omega_HS (subscale reliabilities after removing G) determines whether domain scores add diagnostic information beyond the total score
- Target: omega_HS >= 0.30 for each subscale (lower threshold than certification because diagnostic is advisory, not high-stakes)
- Subscales with omega_HS < 0.10 should not be reported separately -- they don't contain enough unique information

### 3.7 Phase 3 Checkpoint (End of Week 10)

Brad and Jeramey review:
- [ ] Content domain structure defined and items assigned to specific factors
- [ ] Bifactor model fit compared to alternative structures
- [ ] Item loading matrix produced with dual-purpose classifications
- [ ] omega_H and omega_HS computed for all factors
- [ ] Distribution of dual-purpose vs single-purpose vs neither items quantified
- [ ] Implications for certification cut-score defensibility documented
- [ ] Implications for diagnostic subscale reporting documented
- [ ] Any domains where the specific factor is too weak for diagnostic use identified

---

## Phase 4: Cognitive Process Taxonomy

**Timeline:** Parallel track, starting Week 1 (June 15) for framework formalization; SME tagging runs June through September
**Owner:** Jeramey (framework design), Heather (SME coordination), SME team (tagging)
**Deliverables:** Formalized taxonomy, tagging rubric, `cognitive_process` field in production, 500--1000 tagged items

### 4.1 The Six-Level EMS Cognitive Process Framework

This is a domain-specific adaptation of Bloom's Taxonomy, calibrated to the cognitive demands of emergency medical practice. The existing Bloom's field in the database is a legacy tag with unknown reliability -- this replaces it with a framework built for EMS measurement.

| Level | Label | Definition | EMS Example |
|-------|-------|-----------|-------------|
| 1 | **Recognition/Recall** | Retrieve factual information from memory | "What is the normal respiratory rate for an adult?" |
| 2 | **Comprehension** | Demonstrate understanding of concepts, mechanisms, or procedures | "Explain why high-flow oxygen is indicated for carbon monoxide poisoning." |
| 3 | **Application** | Apply knowledge to a specific clinical scenario | "A 45-year-old male presents with chest pain radiating to the left arm. What is the appropriate initial medication?" |
| 4 | **Analysis/Differentiation** | Distinguish between similar presentations, identify critical differences | "Differentiate between tension pneumothorax and cardiac tamponade based on the following assessment findings." |
| 5 | **Synthesis/Integration** | Combine information from multiple sources to form a treatment plan | "Given these vitals, history, and physical findings, develop a comprehensive treatment plan for this multi-system trauma patient." |
| 6 | **Judgment Under Uncertainty** | Make decisions with incomplete, conflicting, or ambiguous information | "You arrive at an MCI with 12 patients. Triage information is incomplete. Determine treatment priorities and justify resource allocation." |

**Why Level 6 exists (and Bloom's doesn't have it):** EMS practice routinely requires decisions under genuine uncertainty -- incomplete patient histories, chaotic scenes, conflicting clinical indicators. This is qualitatively different from synthesis (Level 5), which assumes the information is available and complete. Level 6 items are the hardest to write, the most discriminating, and the most predictive of real-world clinical performance.

### 4.2 Tagging Rubric Development

**Produce a rubric document (`phase-4/cognitive-process-rubric.md`) containing:**

1. **Decision tree.** A flowchart SMEs follow for each item:
   - Does the item require only retrieving a fact? -> Level 1
   - Does it require explaining why or how? -> Level 2
   - Does it present a scenario requiring knowledge application? -> Level 3
   - Does it require distinguishing between two or more similar options based on subtle differences? -> Level 4
   - Does it require integrating multiple data sources into a judgment? -> Level 5
   - Does it include ambiguity, missing information, or conflicting indicators as a deliberate feature? -> Level 6

2. **Anchor items.** 5 example items per level (30 total) with detailed justification for classification. These serve as calibration references for taggers.

3. **Edge case guidance.** Common ambiguities (e.g., an item that looks like Level 3 but has a Level 4 distractor structure) with resolution rules.

4. **Inter-rater reliability protocol.** Each item tagged by 2 SMEs independently. Disagreements resolved by a third rater (Jeramey or Heather). Target: Cohen's kappa >= 0.70 on pilot set before proceeding to full tagging.

### 4.3 Production Schema Change

Add `cognitive_process` field to the question model in `mededprep-c`.

```
Field: cognitive_process
Type: TINYINT UNSIGNED, NULLABLE
Values: 1-6 (mapping to taxonomy levels)
Default: NULL (untagged)
Migration: Add column, no backfill — populated through SME tagging
```

Also add `cognitive_process_tagged_by` (VARCHAR, nullable) and `cognitive_process_tagged_at` (TIMESTAMP, nullable) for audit trail.

### 4.4 SME Tagging Campaign

**Scope:** 500--1000 items in the initial round. Prioritize:
1. Adaptive pool items (these will have IRT parameters from Phase 2 -- cognitive process level can be correlated with difficulty and discrimination)
2. Items spanning all 6 levels (oversample harder items to ensure Level 5--6 representation)
3. Items from content domains represented in the bifactor model

**Logistics:**
- 5--6 SMEs available (existing team, plus Heather coordinating)
- SMEs at agencies = built-in B2B relationships (secondary benefit)
- Estimated pace: 20--30 items/hour per SME after rubric training
- 500 items at 25 items/hour = 20 SME-hours = 1 week of distributed work
- 1,000 items = 40 SME-hours = 2 weeks distributed
- **End-to-end timeline: 10--12 weeks** including rubric development (2 weeks), SME recruitment and training (2--3 weeks), pilot tagging + inter-rater calibration (2 weeks), production tagging (3--4 weeks)

**Quality gates:**
- Pilot round: 50 items tagged by all SMEs. Compute pairwise Cohen's kappa. If kappa < 0.70 for any pair, retrain on disagreement patterns before proceeding.
- Production round: Each item tagged by 2 SMEs. Third rater for disagreements. Final kappa reported.

### 4.5 Analysis Integration

Once cognitive process tags exist for 500+ items:

1. **Cross-tabulate cognitive process level with IRT difficulty (b).** Expected: strong positive correlation (higher cognitive levels = harder items), but not perfect (some Level 1 items are hard because they test obscure facts, some Level 5 items are easier because the scenario is prototypical).

2. **Cross-tabulate cognitive process level with IRT discrimination (a).** Expected: items at Levels 4--6 tend to discriminate better (they separate competent from merely knowledgeable practitioners).

3. **Cross-tabulate cognitive process level with bifactor loadings.** Hypothesis: higher cognitive process levels load more strongly on the general factor (they require integrated competency rather than domain-specific recall). This would validate the cognitive process taxonomy as a meaningful third axis.

4. **Examine cognitive process distribution across content domains.** Identify domains that are overrepresented at Level 1--2 (need harder items) or underrepresented at Levels 5--6 (need more complex items).

---

## Phase 5: Dual-Validation Confirmation

**Timeline:** Weeks 8--10 (August, final weeks of internship) + ongoing post-internship
**Owner:** Brad Yang (initial analysis), Jeramey (operational decisions)
**Deliverables:** Validated item selection algorithms, calibration pipeline specification, Company C exam design document

### 5.1 Confirm Dual-Purpose Viability

Synthesize findings from Phases 2--4 to answer the core question: **Can this item bank serve both certification and diagnostic purposes?**

**Decision matrix:**

| Outcome | Meaning | Action |
|---------|---------|--------|
| omega_H >= 0.80 AND at least 6 domains with omega_HS >= 0.30 | Strong bifactor structure. Items measure both general and specific. | Proceed with dual-purpose design. |
| omega_H >= 0.80 AND fewer than 6 domains with omega_HS >= 0.30 | General factor dominates. Some domains lack diagnostic specificity. | Proceed with certification. Diagnostic reporting limited to domains with adequate omega_HS. Weak domains need purpose-built diagnostic items. |
| omega_H < 0.80 AND multiple domains with omega_HS >= 0.30 | Bank is more multidimensional than unidimensional. | Domain-level pass/fail may be more defensible than a single cut score. Diagnostic reporting is strong. |
| omega_H < 0.80 AND most domains with omega_HS < 0.30 | Neither general nor specific factors are strong. | Fundamental item bank quality problem. Major revision needed before certification. |

### 5.2 Company C Certification CAT Design

**Phase 1 of a Company C exam: Certification (pass/fail)**

Based on CAT simulation results from Phase 2.4, define:

- **Item pool:** Dual-purpose and certification-only items from the bifactor classification (Phase 3.5)
- **Minimum items:** Set by simulation -- expected 25--40 for reliable classification
- **Maximum items:** 50 (hard cap for examinee fatigue)
- **Item selection:** Maximum Fisher Information at current theta estimate, with content balancing constraints (each content domain must be represented proportionally)
- **Stopping rule:** Sequential Probability Ratio Test (SPRT) for classification, OR maximum items reached
  - SPRT parameters: Type I error (alpha) = 0.05, Type II error (beta) = 0.05
  - Indifference region around the cut score: +/- 0.20 logits (examinees within this band get the full 50 items)
- **Cut score:** To be determined via standard-setting study (Angoff or bookmark method) with SME panel. This is a post-internship activity.
- **Content balancing:** Modified Sympson-Hetter method to control item exposure rates. No item should be administered to more than 25% of examinees (security constraint).

**Phase 2 of a Company C exam: Diagnostic Supplement**

After the pass/fail decision is made, administer 5--15 additional items targeting constructs where:
- The examinee's diagnostic profile is uncertain (high standard error on specific factor scores)
- The certification CAT did not adequately sample that content domain
- The item is classified as diagnostic-only or dual-purpose with high specific factor loading

**Purpose:** This is NOT additional gatekeeping. The pass/fail decision is final from Phase 1. The diagnostic supplement produces a learner profile for remediation guidance, instructor reporting, and program-level analytics (Company E).

### 5.3 Ongoing Calibration Pipeline

New items enter the bank continuously (from SME authoring and the AI question generation pipeline at `ems-books-rag`). Each new item needs calibration before it enters the operational pool.

**Online calibration protocol:**

1. **Field testing.** New items are embedded in operational exams as unscored "pilot" items. Each new item is administered to 200--500 examinees before calibration.

2. **Parameter estimation.** After sufficient responses accumulate, fit the new item's parameters while fixing the existing bank's parameters (fixed-item calibration / online calibration in mirt).

   ```r
   # Fix all existing item parameters, estimate only new items
   mod_online <- mirt(response_matrix_with_new,
                      model = 1, itemtype = "2PL",
                      pars = "values")
   # Fix existing item parameters
   # (modify the pars data frame to fix est = FALSE for all existing items)
   mod_online <- mirt(response_matrix_with_new,
                      model = 1, itemtype = "2PL",
                      pars = fixed_pars)
   ```

3. **Fit check.** New item must meet the same S-X2 fit criteria as existing items. Items that misfit are returned for SME review.

4. **Bifactor assignment.** New item assigned to a specific factor based on content domain tag. Bifactor loading estimated (can use restricted bifactor with existing factor structure fixed).

5. **Cognitive process tagging.** New item tagged by SME using the rubric from Phase 4.

6. **Promotion to operational pool.** Once calibrated, fit-checked, bifactor-assigned, and cognitive-process-tagged, the item enters the operational pool.

**Cadence:** Quarterly calibration runs (batch all field-tested items with sufficient responses). Brad can set up the pipeline and Jeramey/team maintains it.

### 5.4 Trait Ontology Summary

The validated trait ontology has three axes, each tagging every item in the bank:

```
ITEM
 |
 +-- Axis 1: Content Domain
 |     Categories and subcategories (already tagged in item bank)
 |     Maps to NHTSA taxonomy via crosswalk
 |     Defines the specific factors in the bifactor model
 |
 +-- Axis 2: Cognitive Process Level (1-6)
 |     New field, SME-tagged per rubric (Phase 4)
 |     Correlates with difficulty and discrimination
 |     Enables targeted assessment at specific cognitive levels
 |
 +-- Axis 3: Learning Objectives
       Already tagged, up to 10 per item
       Fine-grained curriculum alignment
       Enables item selection by instructional objective
```

**Ownership:** The Vault owns the validated trait taxonomy as intellectual property. This includes the bifactor factor structure, the cognitive process rubric, and the crosswalk between content domains and NHTSA taxonomy. The taxonomy is licensed to Company A (adaptive testing) and Company C (certification).

### 5.5 Data Governance and Entity Boundaries

| Data Flow | What Moves | Direction | Constraint |
|-----------|-----------|-----------|------------|
| Company A -> Company C | Item parameters, trait ontology | Shared via The Vault | Both entities use the same calibrated bank |
| Company A -> Company E | Pre-aggregated diagnostic profiles | One-way | Individual-level data only. No Company C data co-mingled at individual level. |
| Company C -> Company E | Pre-aggregated certification outcomes | One-way | Population-level only (program pass rates, regional trends). |
| Company E cross-referencing | Population-level patterns | Internal | Company E may cross-reference A and C data at POPULATION level (e.g., "programs with high diagnostic scores have higher pass rates"). NEVER at individual level (firewall). |

### 5.6 Company C Certification Timeline

| Milestone | Target | Dependencies |
|-----------|--------|-------------|
| EMT certification exam | Year 2 (2027) | Phases 1-3 complete, cut-score standard setting, pre-NCCA |
| Paramedic certification exam | Year 3 (2028) | Paramedic item calibration, separate standard setting |
| NCCA accreditation (EMT) | Years 3-4 | Job Task Analysis (6-12 months), validity studies, standard setting documentation |
| Full 5-level NCCA accreditation | 8-9 years total | EMT -> AEMT -> Paramedic -> Advanced -> Critical Care, sequential |

---

## Brad Yang Summer Internship: Week-by-Week Schedule

| Week | Dates | Phase | Primary Deliverables |
|------|-------|-------|---------------------|
| 1 | Jun 15-19 | 1 | Environment setup. Database access. Encoding bug analysis. Begin discrimination index computation. |
| 2 | Jun 22-26 | 1 | Complete discrimination analysis for all 4 pools. Flag items. Begin response matrix construction. |
| 3 | Jun 29-Jul 3 | 1/2 | Finalize response matrices. Begin 2PL calibration on adaptive pool. Phase 1 checkpoint. |
| 4 | Jul 7-11 | 2 | Complete adaptive pool calibration. Model fit evaluation. Item parameter review. |
| 5 | Jul 14-18 | 2 | Theta estimation. CAT simulation (mirtCAT). Standard pool calibration begins. |
| 6 | Jul 21-25 | 2/3 | CAT simulation complete. Begin bifactor domain mapping. Unit exam calibration. |
| 7 | Jul 28-Aug 1 | 3 | Bifactor model estimation on adaptive pool. Model comparison. |
| 8 | Aug 4-8 | 3 | Bifactor loading matrix. Dual-purpose item classification. Phase 2 checkpoint. |
| 9 | Aug 11-15 | 3/5 | omega_H / omega_HS computation. Dual-validation synthesis. |
| 10 | Aug 18-21 | 5 | Final report. Pipeline documentation. Calibration scripts packaged. Phase 3 checkpoint. |

**Brad's working style (confirmed):** Prefers clear direction with checkpoints. This schedule provides both. Weekly 30-minute check-ins with Jeramey. Checkpoint reviews at Weeks 3, 8, and 10.

**Tools:** R (primary), mirt package (IRT), rstan (Bayesian models), mirtCAT (CAT simulation). All confirmed as Brad's existing skill set.

---

## Key Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Bifactor model doesn't converge (too many items, sparse cells) | Medium | High | Start with adaptive pool only. Reduce to 6-8 specific factors. Fall back to rstan Bayesian estimation. |
| Exit Exam pool has insufficient data for stable calibration | High | Medium | Use Bayesian priors (rstan). Accept wider credible intervals. Pool with other exams for linking if necessary. |
| omega_HS too low for meaningful diagnostic subscales | Medium | High | Invest in domain-specific item writing for weak domains. Diagnostic reporting uses only validated subscales. |
| SME tagging inter-rater reliability below threshold | Medium | Medium | Invest in rubric training. Reduce to 4 cognitive levels if 6 is too fine-grained for reliable human tagging. |
| Brad's 10-week timeline is too aggressive for Phases 1-3 | Medium | Medium | Prioritize depth over breadth. Phase 1 + adaptive pool IRT + bifactor on adaptive pool is the minimum viable output. Full bank extension can continue post-internship. |
| Encoding fix reveals more data quality issues | Low | Medium | Budget Week 1 for data exploration. Document additional issues for post-internship cleanup. |

---

## Appendix A: Key Decisions Log

| Decision | Rationale | Date |
|----------|----------|------|
| Bifactor model (not correlated factors) | Need both a general score (certification) and specific scores (diagnosis) from the same items. Bifactor cleanly separates general and specific variance. | 2026-04-06 |
| Start with adaptive pool | Best difficulty distribution, purpose-built for measurement, sufficient response volume. | 2026-04-06 |
| 2PL as primary model (not 3PL) | Response-per-item ratios insufficient for 3PL c-parameter estimation on most items. 2PL with constrained guessing as fallback. | 2026-04-06 |
| 6-level cognitive process taxonomy | Bloom's is generic. Level 6 (Judgment Under Uncertainty) captures the distinctive cognitive demand of emergency medicine. | 2026-04-06 |
| The Vault owns the trait ontology | Trait taxonomy is core IP. Licensed to operating entities (A, C), not owned by them. | 2026-04-06 |
| Company E firewall: population-level cross-referencing only | Individual-level cross-referencing between A and C creates privacy and ethical risks that outweigh analytical benefits. | 2026-04-06 |

## Appendix B: Software and Packages

| Tool | Version | Purpose |
|------|---------|---------|
| R | >= 4.3 | Statistical computing environment |
| mirt | >= 1.40 | IRT model estimation (2PL, 3PL, bifactor, multidimensional) |
| rstan | >= 2.32 | Bayesian IRT models for sparse data (Exit Exam pool) |
| mirtCAT | >= 1.13 | CAT simulation and adaptive test assembly |
| psych | >= 2.3 | Classical test theory (rpb, alpha, omega), bifactor analysis (omega_H, omega_HS) |
| lavaan | >= 0.6 | Confirmatory factor analysis (model comparison) |
| tidyverse | latest | Data wrangling and visualization |
| DBI + RMySQL | latest | Direct database connection to production MySQL |

## Appendix C: References

- Reise, S. P., Bonifay, W. E., & Haviland, M. G. (2013). Scoring and modeling psychological measures in the presence of multidimensionality. *Journal of Personality Assessment, 95*(2), 129-140. [Bifactor model interpretation]
- Chalmers, R. P. (2012). mirt: A multidimensional item response theory package for the R environment. *Journal of Statistical Software, 48*(6), 1-29. [mirt package]
- Rodriguez, A., Reise, S. P., & Haviland, M. G. (2016). Evaluating bifactor models: Calculating and interpreting statistical indices. *Psychological Methods, 21*(2), 137-150. [omega_H, omega_HS, ECV interpretation]
- van der Linden, W. J., & Glas, C. A. W. (Eds.). (2010). *Elements of Adaptive Testing*. Springer. [CAT design and simulation]
- Embretson, S. E., & Reise, S. P. (2000). *Item Response Theory for Psychologists*. Lawrence Erlbaum Associates. [IRT foundations]
