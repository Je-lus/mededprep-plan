# Item-Gate Provenance Record

The inverse of COVERAGE-MAP.md: every rule in MedEdPrep's item-review gate stack traced forward to the item-writing guideline or testing standard it implements, with citations. Written so the gate stack can be cited as a documented item-development procedure under Standard 4.7 (AERA/APA/NCME 2014, p. 87).

---

## 1. Why this document exists

Standard 4.7 (2014, p. 87): *"The procedures used to develop, review, and try out items and to select items from the item pool should be documented."* Its comment adds that the qualifications of the people developing and reviewing items, and the processes used to train and guide them, are important parts of test development documentation.

Rodriguez makes the same point as a direct instruction to test developers (*Handbook of Test Development* 2e, p. 272, recommendation 4): *"Closely follow item writing guidelines and document how they were employed in training, supervising and monitoring item writers."* Recommendation 1 on the same page: *"Begin the documentation of each step, decision rules, evidence and outcomes, when the test development project begins."*

MedEdPrep's item writers are models, supervised by code. The gate stack **is** the training, supervision and monitoring. This document is the record of how the guidelines were employed. It is written at the level of specificity an accreditation reviewer would need: rule, location, guideline, citation.

---

## 2. Citation keys

- **HTD 2e** - Lane, S., Raymond, M. R., Haladyna, T. M., & Downing, S. M. (Eds.). (2016). *Handbook of Test Development* (2nd ed.). New York: Routledge.
  - **Ch. 13** - Rodriguez, M. C., "Selected-Response Item Development," pp. 259-273. The 22-guideline list (Haladyna & Rodriguez, 2013) is printed on **pp. 267-268**; the empirical-evidence statement is on **p. 268**; the developer recommendations are on **p. 272**.
  - **Ch. 20** - Haladyna, T. M., "Item Analysis for Selected-Response Test Items," pp. 392-409.
- **Standards 2014** - American Educational Research Association, American Psychological Association & National Council on Measurement in Education. (2014). *Standards for Educational and Psychological Testing*. Washington, DC: AERA. Chapter 4, "Test Design and Development," pp. 85-95.
- **H&R 2013** - Haladyna, T. M., & Rodriguez, M. C. (2013). *Developing and Validating Test Items*. New York: Routledge. (The primary source of the 22 guidelines; cited here through HTD 2e ch. 13, which is what was read.)
- **HDR 2002** - Haladyna, T. M., Downing, S. M., & Rodriguez, M. C. (2002). A review of multiple-choice item-writing guidelines for classroom assessment. *Applied Measurement in Education, 15*(3), 309-334. (The 31-guideline predecessor; Guideline 28(a-f) = 2013's Guideline 20(a-f). Cited in HTD 2e ch. 13 references, p. 272.)

Guideline numbers below are the **2013 / HTD 2e numbering**.

---

## 3. Tier 1 - deterministic cue lint (`scripts/qa/audit_cues.py`)

Promoted out of `barton/audit_cues.py` on 2026-08-31 so one rule set gates every bank; `barton/audit_cues.py` is now a shim over it and was verified byte-identical on the reviewed Barton workbook (1954 scanned / 0 flagged / 10 waived / 29.6% strictly longest). Poison self-tests: `audit_cues.py:616-818`, run via `--self-test`.

### FLAG tier (block-worthy)

| Rule | Location | Implements | Citation |
|---|---|---|---|
| `paren_only_correct` - parenthetical in every key, in no distractor | `:305-306`, regex `PAREN` `:50` | G20f (homogeneous options); G20a in its "correct option stands out by added detail" form | HTD 2e p. 268 |
| `correct_longest` - key >= 1.4x longest distractor **and** >= 25 chars longer | `:311-313` | **G20a** "Keep the length of options about equal" | HTD 2e p. 268; one of the four guidelines with empirical support, p. 268 |
| `example_only_correct` - e.g./i.e./such-as clause only in the key | `:316-317`, regex `EG` `:51` | G20f; G20a (detail cue) | HTD 2e p. 268 |
| `hedge_vs_absolute` - key hedges, no absolute in key, >= 2 distractors absolute | `:319-325`, regexes `ABSOLUTE` `:52-56`, `HEDGE` `:57-59` | **G20b** "Avoid specific determiners, including always, never, completely and absolutely" | HTD 2e p. 268 |
| `period_mismatch` - terminal punctuation splits key from distractors | `:329-334` | G20f (homogeneous structure). **Severity is a house calibration**, not a literature assignment. | HTD 2e p. 268 |
| `option_too_long` - any option over the profile bar (150 barton / 200 ccp) | `:167-170`, profiles `:100-104` | **G10** "Minimize the amount of reading in each item"; **G9** linguistic complexity. Specific bars are owner rulings (recorded `:21-24`). | HTD 2e p. 267 |
| `aota_nota_tf` - AOTA/NOTA variants, K-type letter and roman combos, bare True/False, prose "both X and Y" composed of other options | `:173-197`, regexes `:61-77` | **G18** "Avoid using the options none-of-the-above, all-of-the-above and I don't know." Exceeds the guideline by also banning K-type and TF (Rodriguez treats TF separately, p. 266). | HTD 2e pp. 266, 267; one of four with empirical support, p. 268 |

### ADVISORY tier (report, do not block)

| Rule | Location | Implements | Citation |
|---|---|---|---|
| `absolute_anywhere` - absolutes in distractors while no key carries one | `:200-209` | **G20b**. Directional by design: only distractor-only absolutes leak the key. | HTD 2e p. 268 |
| `stem_echo` - distinctive content word (>= 5 chars, lemmatized, stopword-stripped, not in the stem's final 10 words) in the key and in no distractor | `:212-234`, helpers `:130-161` | **G20c** "Avoid clang associations, options identical to or resembling words in the stem" | HTD 2e p. 268 |
| `near_dup_distractors` - token-set Jaccard >= 0.7 or substring containment between two distractors | `:237-267` | **G17** "Keep options independent; options should not be overlapping"; **G20d** "Avoid pairs or triplets of options that clue the test taker" | HTD 2e pp. 267, 268 |

The ADVISORY tier exists because these three rules cannot separate a real flaw from a legitimate homogeneous option set; `:90-93` records that reasoning in-file. Documenting *why* a rule is advisory rather than blocking is itself the kind of decision record recommendation 1 (HTD 2e p. 272) asks for.

### Bank-level statistics

| Statistic | Location | Implements | Citation |
|---|---|---|---|
| Key-vs-distractor mean length skew per slice, WARN at >15% | `compute_skew_stats` `:270-287`, threshold `:286`, reporting `print_skew_table` `:437-452` | **G20a** at the bank level, which the per-item rule cannot see: a systemic 10-15% skew below the per-item threshold is invisible item by item | HTD 2e p. 268 |
| Strictly-longest-key rate on single-key rows, acceptance band 25-30% | `:471-476`, printed `:587-591` | **G20a**. Band derived from chance with four options; the band value itself is a house calibration. | HTD 2e p. 268 |

### Infrastructure

| Mechanism | Location | Standards anchor |
|---|---|---|
| Two profiles with per-bank option bars, so divergence is a config change rather than a fork | `:98-104` | Standard 4.1/4.2 - test specifications define item formats and properties (2014, p. 85) |
| Written per-item waivers with reasons | `--waivers`, `:488-490`; `barton/cue_waivers.json` | **Standard 4.7** (2014, p. 87). Rodriguez, p. 268: "When nontraditional guidelines are included, provide a brief defense for each." A waiver file with clinical reasons is exactly that defense. |
| Poison self-tests (28 assertions, both fire-cases and clean-cases) | `:616-818` | Standard 4.7 - evidence that the review procedure does what it is documented to do |
| `--fail-on-flag` exit-1 generation gate | `:601-603` | Standard 4.7 - the review is enforcing, not advisory |
| Loader parity: xlsx and JSON banks funnel through one `cues_for_item` | `:293-348`, parity test `:786-788` | Standard 4.7 - one documented procedure across all item pools |

---

## 4. Tier 2 - generation-time structural gate (`scripts/qa/author_bank_questions.py`)

`validate_draft` (`:204-252`) rejects a draft and re-prompts the author model with the specific failure. This is the "training, supervising and monitoring item writers" surface of HTD 2e p. 272 rec. 4, implemented as a loop.

| Rule | Location | Implements | Citation |
|---|---|---|---|
| Exactly `n_options` non-empty answers, exactly one correct, key stored first | `:207-208`, prompt `:140` | **G14** "Make sure that only one of these options is the right answer"; **G13** three options usually sufficient | HTD 2e p. 267; Rodriguez (2005) 80-year meta-analysis summarised p. 268 |
| Exactly one question mark | `:209-210`, prompt `:145` | House proxy for **G1** (one content type and cognitive demand) and **G11** (central idea in the stem) | HTD 2e p. 267 |
| Option character cap | `:212-215` | **G10**, **G9** | HTD 2e p. 267 |
| AOTA / NOTA / `A and C` regex | `:73`, enforced `:216-217`, prompt `:143` | **G18** | HTD 2e p. 267 |
| Em-dash ban | `:218-220`, prompt `:142` | **House editorial rule. No literature anchor.** | - |
| `key_longest` slot role - key required longest by 10-30 chars on some slots, required *not* longest on others | role assigned `:172-176`, enforced `:221-233` | **G20a**, exceeded. Randomising the length signal removes the information rather than merely equalising it. House innovation. | HTD 2e p. 268 |
| `source_book_id` required | `:234-235`, prompt `:161-162` | **Standard 4.7** documentation; copyright/provenance control. Not a Haladyna guideline. | Standards 2014, p. 87 |
| Explanation required | `:236-237`, register rule `:126-128` | Not an item-writing guideline; supports score-report and remediation use | Standards 2014, Standard 4.18 scoring-criteria clarity, p. 91 |
| `tested_objectives` required from a closed menu | `:238-239`, menu `:194-195` | **Standard 4.1** (test specifications define the domain) and **Standard 4.12** (document the extent to which the content domain of a test represents the domain defined in the specifications) | Standards 2014, pp. 85, 89 |
| `ibsc_domain` from a closed list (Critical Care) | `:240-241` | Credential-body blueprint convention | Standards 2014, Standard 4.1, p. 85 |
| Residual cue re-lint against `cues_for_item` before acceptance | `:242-250`, import `:44` | Every FLAG-tier rule in Tier 1, applied at birth rather than after the fact | HTD 2e pp. 267-268 |

### Prompt-level rules enforced by re-prompting rather than by regex

| Prompt rule | Location | Implements | Citation |
|---|---|---|---|
| Ground-truth rule: every clinical claim supported by retrieved passages; return `unsourced` rather than invent | `:131-133` | **G5** avoid opinions unless qualified; validity of content-related evidence | HTD 2e p. 267; Standards 2014, Standard 4.12, p. 89 |
| Scope of practice by certification level | `:135`, `scope_config.py` | **G4** test important content; construct relevance | HTD 2e p. 267; Standards 2014, Standard 4.13 (eliminate construct-irrelevant variance), p. 90 |
| Originality: textbook facts are sources, exam questions are never templates | `:137` | **G2** use new material | HTD 2e p. 267 |
| Difficulty comes from distractor closeness and interpretation load, never trick wording | `:149` | **G6** avoid trick items | HTD 2e p. 267 |
| DISTRACTOR DISCIPLINE: distractors must be a real alternative diagnosis, a real out-of-sequence step, or a documented common error; never an unrelated system, an invented mechanism, an obvious absurdity, a self-explaining option, or two options sharing one misconception | `:154` | **G21** "Make all distractors plausible. Use typical errors of test takers to write distractors"; **G20e** avoid absurd options | HTD 2e pp. 267, 268 |
| STEM-PREMISE CONSISTENCY: no option may rely on something the stem rules out; the key must require a decision, not restate stem data | `:155` | **G11** central idea in the stem, not the options; **G6** avoid trick items | HTD 2e p. 267 |
| Parenthetical / example-clause parity; terminal punctuation parity | `:156` | **G20f**, **G20a** | HTD 2e p. 268 |
| No hedged key against absolute distractors; safest is no absolutes in any option | `:157` | **G20b** | HTD 2e p. 268 |
| STEM ECHO: after drafting, list the content words the key shares with the stem and work each into a distractor or reword the key | `:158` | **G20c** clang associations | HTD 2e p. 268 |
| No two distractors saying the same thing | `:159` | **G17**, **G20d** | HTD 2e pp. 267, 268 |
| EXPLANATION FIDELITY: never add a threshold or rule not in the passages; never convert a typical finding into a universal rule | `:163` | **G5** avoid unqualified opinions | HTD 2e p. 267 |

---

## 5. Tier 3 - deterministic clinical validator (`scripts/qgen/validator.py`)

Zero API calls. Result model `ValidationResult` with critical (auto-fail) and warning (flag) severities - `scripts/qgen/validation_models.py:27-86`.

| Rule family | Location | Implements | Citation |
|---|---|---|---|
| Red-flag clinical safety rules from `configs/validation_rules/red_flags.json`: an intervention pattern in the key plus a contraindication pattern in context, minus exclusions | `:185-278` | Not an item-writing guideline. **Content accuracy** - a keyed answer that would harm a patient is a validity failure before it is a construction failure. | Standards 2014, Standard 4.8 (expert review of items), p. 88 |
| Scope violations in the key (procedures, IV/IO medication for EMT) - critical | `:284-338` | **G4** test important content, at the right level; construct relevance | Standards 2014, Standard 4.13, p. 90 |
| Scope violations in distractors - warning | `:346-408` | **G21** distractor plausibility. An out-of-scope distractor is self-eliminating, which shrinks the effective option count. QC states the reason at `qc_reviewer.py:99`. | HTD 2e p. 267; on effective option count, p. 269 |
| `ABSOLUTE_ALWAYS` / `ABSOLUTE_NEVER` in the key, with clinically sensible allowlists ("always assess", "never delay transport") | `:414-469`, allowlists `:425-435` | **G20b** specific determiners. The allowlist is the domain adaptation the guideline needs in clinical content. | HTD 2e p. 268 |

---

## 6. Tier 4 - blind re-answer correctness gate (`scripts/qgen/self_check.py`)

| Mechanism | Location | Implements | Citation |
|---|---|---|---|
| Options shuffled, key hidden, no explanation shown; an independent model picks one answer; comparison is on answer **text**, so it is position-independent | `:35-88` | **G14** "Make sure that only one of these options is the right answer." This is the strongest single control in the stack and has no direct analogue in the 2013 guideline list - it is a mechanised second-rater. | HTD 2e p. 267 |
| Per-question-id RNG seed so a re-run shuffles identically | `qa_pass_ccp_v1.py:130` | Standard 4.7 - a review procedure that reproduces | Standards 2014, p. 87 |
| Fail-open on any error | `:46-47` | **House engineering decision** with a stated rationale. Implication worth recording: a self-check outage reads as a pass. | - |

Mapped to the Standards, this is an **empirical analysis substitute standing in for expert judges** under Standard 4.8 (2014, p. 88), which permits "empirical analyses and/or the use of expert judges to review items and scoring criteria." It is not a substitute for examinee response data - see §9.

---

## 7. Tier 5 - independent model QC review (`scripts/qgen/qc_reviewer.py` and variants)

A different model from the author reviews each item, one question per call. Result model `QCReviewResult` - `validation_models.py:93-155`. Combined disposition logic (`approved` / `flagged` / `rejected`) - `validation_models.py:162-221`.

| QC criterion | Location | Implements | Citation |
|---|---|---|---|
| 1. Clinical accuracy - is the key accurate by current EMS standards; would medical directors and educators accept it; any dangerous recommendations | `qc_reviewer.py:77-81` | **G5** avoid unqualified opinions; content validity | HTD 2e p. 267; Standards 2014, Standard 4.8, p. 88 |
| 2. Scope appropriateness - key and all distractors within the level's scope | `:83-87` | **G4**; **G21** (out-of-scope distractors are implausible); construct relevance | HTD 2e p. 267; Standards 2014, Standard 4.13, p. 90 |
| 3. Explanation quality - teaches *why* the key is right, why each distractor is wrong, and boundary conditions | `:89-93` | Not an item-writing guideline. Supports formative score use. | Standards 2014, Standard 4.18, p. 91 |
| 4. Distractor quality - plausible, representing common misconceptions or errors, in scope, clearly wrong to someone with proper knowledge | `:95-100` | **G21** "Make all distractors plausible. Use typical errors of test takers to write distractors"; **G13b**; **G20e** | HTD 2e pp. 267, 268 |
| Always-FAIL list: harm, out-of-scope key, out-of-scope distractors, factual error, contraindicated medication, dangerous procedure, clinically incorrect never/always claims | `:108-117` | **G5**, **G20b**, content validity | HTD 2e pp. 267, 268 |
| "Be CONSERVATIVE. When in doubt, mark as UNCERTAIN rather than PASS" | `:117` | Standard 4.8 - review that routes ambiguity to human judgment rather than resolving it silently | Standards 2014, p. 88 |
| IBSC format note - do not penalise 3 options or a concise rationale | `:309-315`; `qa_pass_ccp_v1.py:67-71` | Prevents a false negative against **G13a**, which the format actually satisfies | HTD 2e p. 268 |
| CCP QC: "A defensible second-correct answer is a failure" | `qa_pass_ccp_v1.py:62` | **G14** | HTD 2e p. 267 |

Variants carry format-specific criteria on the same four-dimension skeleton: `qc_reviewer_scenario.py:61-102` (clinical realism, vitals consistency, choice quality, recovery paths, educational value, narrative quality), `qc_reviewer_pulse.py:67-85` plus per-item-type criteria at `:94+` (MSQ, true/false, ordering), `qc_reviewer_multiselect.py:90-127`.

---

## 8. Tier 6 - truth, provenance and human adjudication

| Component | Location | Implements | Citation |
|---|---|---|---|
| **Counter-evidence gate** - searches primary sources for text that contradicts an absolute claim in a keyed answer | `scripts/qa/counter_evidence_check.py` | **G5** avoid unqualified opinions. Exists because of a documented 2026-08-31 failure (a keyed CAMTS weather-turndown absolute) that the cue lint, the blind self-check and QC all passed, each for a stated structural reason recorded in that file's header. | HTD 2e p. 267; Standards 2014, Standard 4.8, p. 88 |
| **Blueprint absolute lint** - runs *before* authoring, on the blueprint rationale itself | `scripts/qa/lint_blueprint_absolutes.py` | **G5**; **Standard 4.1** (specifications must support the intended interpretations). Catches the defect one step upstream of the item. | Standards 2014, p. 85 |
| **Originality + intra-exam duplication check** - longest shared word n-gram and token Jaccard against every other bank; plus authored-vs-pulled duplication inside one exam | `scripts/qa/originality_check.py` | **G2** new material; **G3** item independence | HTD 2e p. 267 |
| **SME adjudication sheet** - every QC verdict is adjudicated by a clinician rather than applied, pre-sorted into clinical-judgment vs structural defect | `scripts/qa/build_adjudication_sheet.py`, `apply_adjudication.py` | **Standard 4.8** - "the test review process should include empirical analyses and/or the use of expert judges... their qualifications, relevant experiences, and demographic characteristics should be documented, along with the instructions and training the judges receive." The file header documents a case where the clinician correctly overruled a QC rejection that would have destroyed a correct question. | Standards 2014, p. 88 |
| **Repair passes with mechanical re-validation** - a rewrite is rejected until the cue is provably dead; keys and stems frozen | `barton/repair_cues.py:38-64`, `barton/judge_options.py:157-194`, `barton/restructure_long.py:45-60`, `scripts/qa/repair_cues_json.py`, `scripts/qa/restructure_long_json.py` | The Tier 1 rule set, applied as a closed loop. `judge_options.py:40-45` `SELF_REFUTE` additionally implements **G21** (a distractor that states its own wrongness is commentary, not an option). | HTD 2e pp. 267-268 |
| **Written waivers** | `barton/cue_waivers.json` | **Standard 4.7**; Rodriguez p. 268 on defending nontraditional guideline departures | Standards 2014, p. 87; HTD 2e p. 268 |

---

## 9. Standards clauses on item-development documentation

Quoted or paraphrased from pages actually read. These are the clauses a certification-agency submission will be judged against.

| Standard | Text (2014) | Page | How the gate stack currently answers it |
|---|---|---|---|
| **4.0** | Tests should be designed and developed in a way that supports the validity of interpretations for intended uses. "Test developers and publishers should document steps taken during the design and development process to provide evidence of fairness, reliability, and validity for intended uses for individuals in the intended examinee population." | 85 | Partly. Code plus in-file rationale comments plus `.handoff/` notes constitute the record; there is no single procedure document. COVERAGE-MAP.md and this file are the first draft of one. |
| **4.1** | Test specifications should describe the purpose, the construct or domain, the intended examinee population, and the intended interpretations, and should include a rationale supporting those interpretations. | 85 | Yes - NHTSA/CCP blueprint, closed objectives menus, `map_taxonomy_ccp_v1.py`, `dco_coverage.py`, IBSC domain lists. |
| **4.2** | Specifications should define content, proposed test length, item formats, desired psychometric properties of items and test, and item/section ordering. | 85 | Partly. Content, length, format and ordering are specified. **"Desired psychometric properties of the test items" are not specified anywhere** - no target p-value band, no target discrimination floor. This is the single biggest documentation gap for accreditation. |
| **4.6** | Where appropriate, relevant external experts should review the test specifications; the purpose, process and results of the review should be documented, along with the judges' qualifications. | 87 | No. No external review of the blueprint is documented. |
| **4.7** | "The procedures used to develop, review, and try out items and to select items from the item pool should be documented." Comment: the qualifications of the people developing and reviewing items, and the processes used to train and guide them, are important aspects of the documentation. | 87 | Develop and review: strongly, by code. **Try out and select from the pool: not documented in this repo.** Reviewer "qualifications" here means named model versions and prompt texts, which are recorded (`qc_reviewer.py:58-64`, `self_check.py:19`, `qa_pass_ccp_v1.py:56-57`) - state that framing explicitly rather than leaving a reviewer to guess. |
| **4.8** | The test review process should include empirical analyses and/or expert judges. When expert judges are used, their qualifications, relevant experiences and demographic characteristics should be documented, along with the instructions and training the judges receive. | 88 | Expert-judge half: yes (adjudication sheet + clinician sign-off); the judges' documented qualifications are not recorded in the repo. Empirical half: no. |
| **4.9** | When item or test form tryouts are conducted, the procedures used to select the tryout sample and the resulting sample characteristics should be documented; the sample should be representative of the intended population. | 88 | No. No tryout procedure is documented. |
| **4.10** | When a test developer evaluates the psychometric properties of items, the model used should be documented, the screening sample described, and "the process by which items are screened and the data used for screening, such as item difficulty, item discrimination, or differential item functioning (DIF), for major examinee groups, should also be documented." | 88-89 | No. Item statistics live on the delivery platform and are not joined back to the bank; no DIF analysis exists. |
| **4.12** | Test developers should document the extent to which the content domain of a test represents the domain defined in the test specifications. | 89 | Partly - `dco_coverage.py` and the blueprint worklist give coverage counts; there is no written representativeness argument. |
| **4.13** | Where credible evidence indicates irrelevant variance could affect scores, the developer should investigate and, where possible, remove or reduce those sources. | 90 | **This is the clause the entire cue lint answers.** Test-wiseness cues are construct-irrelevant variance by definition: they let a student pick the key without knowing the material. Rodriguez cites 4.13 for exactly this purpose at HTD 2e p. 269. Cite 4.13 as the primary authority for `audit_cues.py` in any submission. |

**The single strongest defensibility sentence available:** the cue lint is a documented, poison-tested, version-controlled procedure for investigating and removing a named source of construct-irrelevant variance from every item in every bank, wired as a blocking gate at item birth - Standard 4.13 (2014, p. 90), operationalised through the Haladyna & Rodriguez (2013) Guideline 20 clue taxonomy (HTD 2e p. 268).

---

## 10. Honest statement of scope - construction review is not item analysis

This must appear in any accreditation submission that cites the gate stack, or the submission overstates what the stack proves.

Haladyna opens HTD 2e ch. 20 (p. 392) by listing the construction reviews an item undergoes - "content classification, cognitive demand, adherence to item-writing guidelines, fairness, linguistic complexity and correctness of the key" - and then says: *"All these item development activities involve judgments of subject-matter experts (SMEs) and other specialists. Another important complementary step is item analysis."* Complementary. Not replaced.

Everything documented above is the construction-review half. The empirical half is unaddressed in this repo, and the literature is blunt about what that costs:

- *"Distractor evaluation reveals that many distractors do not work as intended. Thus, the item developer has the opportunity to eliminate or replace nondiscriminating distractors."* (HTD 2e p. 401)
- *"many distractors in four- and five-option items fail to attract responses from any examinees. Such distractors seem to be implausible even to those with low true scores."* (HTD 2e p. 402)
- Low-frequency distractors - Haladyna and Downing (1993) suggest a 5% threshold - *"should be revised or dropped from the item."* (HTD 2e p. 402)
- Table 20.3 (HTD 2e p. 400) gives the operational decision rule: difficulty 0.60-0.90 with discrimination > 0.15 is the ideal item; discrimination < 0.15 is poor and should be avoided; a negative discrimination (< 0.00) on a distractor pattern resembling a good item "signifies a key error."
- And the counterweight in the other direction (HTD 2e p. 400, criterion-referenced evaluation): an easy item with a p-value above 0.90 may still be retained if SMEs judge that it measures important content - *"psychometric item data does not trump the judgment of SMEs."*

MedEdPrep is unusually well placed here: roughly 1.55 million student responses and a live adaptive pool already exist. The discrimination data is the final judge of every guideline this document maps, and it is the only thing that can settle G13b, G20e and G21, none of which any amount of construction rule-writing can close. BACKLOG.md item L8 is the join.
