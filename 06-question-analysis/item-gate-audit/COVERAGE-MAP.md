# Item-Gate Coverage Map

Maps the canonical Haladyna & Rodriguez (2013) 22-guideline item-writing taxonomy, as published in the *Handbook of Test Development* 2e, against MedEdPrep's existing item-review gate stack in `~/projects/ems-books-rag`. Every guideline is marked ENFORCED / PARTIAL / UNENFORCED with the exact rule and file:line, and every gate rule with no literature anchor is labelled as a house rule.

---

## 1. Sources actually read

| Source | What was read | Pages read |
|---|---|---|
| Lane, S., Raymond, M. R., Haladyna, T. M., & Downing, S. M. (Eds.). (2016). *Handbook of Test Development* (2nd ed.). Routledge. Ch. 13, Rodriguez, M. C., "Selected-Response Item Development," pp. 259-273. | The guideline taxonomy itself, the empirical-evidence paragraph, the three-option evidence, the Standards cross-references, and the seven test-developer recommendations. | **266, 267, 268, 269, 270, 271, 272, 273** (PDF pp. 283-290) |
| Same volume, Ch. 20, Haladyna, T. M., "Item Analysis for Selected-Response Test Items," pp. 392-409. | Chapter opening (relation of construction review to item analysis, Standard 4.7 quotation), purposes of item analysis, Table 20.3 evaluation criteria, distractor analysis, low-frequency distractors, trace lines. | **392, 393, 394, 400, 401, 402, 403, 404** (PDF pp. 409-411, 417-421) |
| Same volume, front matter. | Contents: chapter numbers, authors, printed start pages. | **v-viii** (PDF pp. 5-8) |
| AERA, APA & NCME. (2014). *Standards for Educational and Psychological Testing*. Washington, DC: AERA. Ch. 4, "Test Design and Development." | Standard 4.0-4.2 (Cluster 1), 4.3-4.6, Cluster 2 (Standards 4.7-4.13), Cluster 3 opening (4.15-4.19). | **84, 85, 86, 87, 88, 89, 90, 91** (PDF pp. 94-101) |

The 22-guideline list quoted throughout this document is printed on **Handbook pp. 267-268** under the heading "The item writing guidelines included in Haladyna and Rodriguez (2013) are as follows" (p. 267). Rodriguez states on **p. 268** that empirical evidence exists for only four of them: **12, 13, 18, and 20a**. That fact drives the backlog ranking.

A prior in-repo literature pass exists at `~/projects/ems-books-rag/barton/research/item-writing-flaws.md` (2026-08-27). It works from the **2002** 31-guideline version (Haladyna, Downing & Rodriguez, *AME* 15(3), 309-334) plus the NBME 6e guide and Tarrant et al. (2006). This document works from the **2013** 22-guideline revision as printed in the Handbook, which is the current canonical form and the one a psychometric reviewer will expect. The two do not conflict; 2002's Guideline 28(a-f) is 2013's Guideline 20(a-f).

---

## 2. The gate stack, as inventoried

Six tiers. Tiers 1-3 are deterministic (zero API cost); tiers 4-6 are model judgment or human.

| Tier | Component | File |
|---|---|---|
| 1 | Test-wiseness cue lint v2 (10 per-item cues, 2 bank-level statistics, 2 profiles, waivers, poison self-tests) | `scripts/qa/audit_cues.py` |
| 2 | Generation-time structural gate (`validate_draft`, rejects and re-prompts the author model) | `scripts/qa/author_bank_questions.py:204-252` |
| 3 | Deterministic clinical validator (red flags, scope, absolute language) | `scripts/qgen/validator.py` |
| 4 | Blind re-answer correctness gate (shuffled options, key hidden, independent model) | `scripts/qgen/self_check.py:35-88` |
| 5 | Independent model QC review (4 criteria + always-FAIL list; scenario/pulse/multiselect variants) | `scripts/qgen/qc_reviewer.py:71-117` and variants |
| 6 | Truth/provenance gates + human adjudication | `scripts/qa/counter_evidence_check.py`, `lint_blueprint_absolutes.py`, `originality_check.py`, `build_adjudication_sheet.py`, `apply_adjudication.py` |

Applied-pass repair tooling (`barton/repair_cues.py`, `barton/judge_options.py`, `barton/restructure_long.py`, `barton/advisory_repair.py`, and the JSON siblings `scripts/qa/repair_cues_json.py`, `scripts/qa/restructure_long_json.py`) re-validates mechanically before accepting a rewrite, so those passes are part of the enforcement surface, not just remediation.

---

## 3. Coverage, guideline by guideline

Citation format: `HTD 2e p. NNN` = *Handbook of Test Development* 2nd ed., Rodriguez ch. 13 unless another chapter is named. All guideline text is from **pp. 267-268**.

### Content concerns (guidelines 1-6, HTD 2e p. 267)

**G1. "Base each item on one type of content and cognitive demand."** - **PARTIAL**

- Enforced proxy: stem must contain exactly one question mark - `author_bank_questions.py:209-210`. Prompt rule "One question mark. One decision." at `:145`.
- Each authoring slot pins exactly one Bloom level and exactly one subtopic (`user_prompt`, `author_bank_questions.py:169-199`; `BLOOM_GUIDE` at `:147`), and `tested_objectives` is mechanically required from a closed menu (`:238-239`).
- Paragraph-length keys that bundle a whole management plan are detected and restructured into single-decision items - `barton/restructure_long.py:33` (`KEY_LEN_THRESHOLD`), `scripts/qa/restructure_long_json.py`.
- **Gap:** nothing verifies that the item actually tests one cognitive demand. The `?`-count is a syntactic proxy for a cognitive property.

**G2. "Use new material to elicit higher-level thinking."** - **PARTIAL**

- Originality is measured, not assumed: `scripts/qa/originality_check.py` computes longest shared word n-gram and token-set Jaccard for every authored stem against every question in every other bank in the repo. Prompt rule at `author_bank_questions.py:137` ("existing exam questions are never templates").
- Bloom targets including `analyze` are assigned per slot.
- **Gap:** "new material" in Haladyna's sense (a stimulus not encountered during instruction) is not checkable here - the bank is authored *from* the instructional corpus by design.

**G3. "Keep the content of items independent of one another (unless they are scored as an item set)."** - **PARTIAL**

- `originality_check.py` second measurement: intra-exam duplication, i.e. an authored slot restating a pulled slot elsewhere in the same exam.
- **Gap:** duplication is not cluing. Nothing detects item A's stem or explanation giving away item B's key within an assembled form. See BACKLOG item L5.

**G4. "Test important content. Avoid overly specific and overly general content."** - **PARTIAL**

- Importance is a blueprint decision and is enforced upstream: worklist slots derive from the NHTSA/CCP blueprint (`scripts/qa/build_bank_worklist.py`), `tested_objectives` must come from the closed objectives menu (`author_bank_questions.py:194-195`, validated `:238-239`), taxonomy mapping at `scripts/qa/map_taxonomy_ccp_v1.py`, coverage tracking at `scripts/qa/dco_coverage.py`.
- Slot fidelity is instructed at `author_bank_questions.py:192` ("a knowledgeable instructor filing this question would file it there and nowhere else").
- **Gap:** no mechanical over-specific / over-general detector; no rule prevents a slot from producing a trivia item inside a legitimate objective.

**G5. "Avoid opinions unless qualified."** - **PARTIAL (judgment only)**

- Ground-truth rule: every clinical claim in stem, key and explanation must be supported by the retrieved passages - `author_bank_questions.py:132`; explanation fidelity rule at `:163` ("never convert a typical finding into a universal rule").
- `scripts/qa/counter_evidence_check.py` actively hunts primary-source text that *contradicts* an absolute claim in a keyed answer. `scripts/qa/lint_blueprint_absolutes.py` catches the absolute one step further upstream, in the blueprint rationale, before authoring.
- QC criterion 1 ("Would this answer be accepted by medical directors and educators?") - `qc_reviewer.py:77-81`.
- **Gap:** no rule detects unattributed opinion phrasing as such.

**G6. "Avoid trick items."** - **PARTIAL (judgment only)**

- Generation instruction at `author_bank_questions.py:149`: "DIFFICULTY is felt in distractor closeness and data-interpretation load, NEVER in trick wording or obscure trivia."
- STEM-PREMISE CONSISTENCY rule at `:155`: no option may rely on a resource the stem explicitly rules out; the key must require a decision, not restate stem data.
- **Gap:** no deterministic rule, and **no QC-reviewer criterion asks about trick items or buried findings.** See BACKLOG item D5.

### Format concerns (guideline 7, HTD 2e p. 267)

**G7. "Format each item vertically instead of horizontally."** - **ENFORCED BY CONSTRUCTION (no rule needed)**

Storage is a JSON array of `answer_choices` or one answer per spreadsheet column; the delivery platform renders vertically. No gate required. Recorded here so the coverage map is complete rather than silently skipping it.

### Style concerns (guidelines 8-10, HTD 2e p. 267)

**G8. "Edit and proof items."** - **PARTIAL**

- `period_mismatch` (FLAG) enforces terminal-punctuation consistency across options - `audit_cues.py:329-334`, dispatched from `cues_for_item` at `:293`.
- Em-dash ban and standard-unit / abbreviation conventions - `author_bank_questions.py:142`, `:144`, enforced `:218-220`.
- Residue and length polish passes: `barton/residue_fix.py`, `barton/polish_lengths.py`.
- Human proofing exists as a documented step via `build_adjudication_sheet.py` → `apply_adjudication.py`.
- **Gap:** no spelling or grammar pass at any tier.

**G9. "Keep linguistic complexity appropriate to the group being tested."** - **PARTIAL**

- `option_too_long` (FLAG) bounds option complexity by a profile bar: 150 chars (barton) / 200 chars (ccp) - `audit_cues.py:167-170`, profiles `:100-104`, dispatched `:337`.
- Authoring is level-scoped (`scope_config.py`, `system_prompt` level argument) and `restructure_long*` converts paragraph keys.
- **Gap:** **no readability metric anywhere.** No Flesch-Kincaid, no sentence-length or syllable measure, no per-level band. See BACKLOG item L3.

**G10. "Minimize the amount of reading in each item. Avoid window dressing."** - **UNENFORCED (options only, partially)**

- `option_too_long` caps **option** length only.
- **Gap: there is no stem length cap or stem length statistic anywhere in the stack.** "Avoid window dressing" has no rule at any tier. For an LLM-authored scenario bank this is the largest unmeasured reading-load surface. See BACKLOG item D2.

### Writing the stem (guidelines 11-12, HTD 2e p. 267)

**G11. "State the central idea clearly and concisely in the stem and not in the options."** - **PARTIAL (judgment only)**

- One-question-mark rule (`:209-210`) and STEM-PREMISE CONSISTENCY (`:155`) push in the right direction.
- **Gap:** the cover-the-options test - can a knowledgeable candidate answer from the stem alone? - is tested by nothing. Note that `blind_recheck` (`self_check.py:35-88`) specifically does *not* test it: it shows the model the options. No QC criterion asks it either. See BACKLOG item D5.

**G12. "Word the stem positively, avoid negative phrasing."** - **UNENFORCED**

- **Zero coverage at any tier.** No regex for `EXCEPT` / `NOT` / `LEAST` / `INCORRECT` / "all of the following ... except" exists in `audit_cues.py`, `validate_draft`, or `validator.py`; no QC prompt mentions negative lead-ins.
- This is **one of only four guidelines with empirical evidence behind it** (HTD 2e p. 268), and the repo's own prior research file records negative stems as the most prevalent flaw found in a real health-professions item bank (`barton/research/item-writing-flaws.md`, citing Tarrant et al. 2006).
- **Highest-value gap in the entire map.** See BACKLOG item D1.

### Writing the options (guidelines 13-22, HTD 2e pp. 267-268)

**G13. "Use only options that are plausible and discriminating. Three options are usually sufficient."** - split verdict

*13a, three options sufficient* - **ENFORCED**, and independently arrived at. The CCP bank is 3-option by owner ruling; the option count is a slot field and is mechanically enforced (`author_bank_questions.py:207-208`), and both QC prompts are explicitly told not to penalise it (`qc_reviewer.py:309-315`; `qa_pass_ccp_v1.py:67-71`). This matches Rodriguez (2005), a meta-analysis of 80 years and 56 independent studies concluding three options are optimal (HTD 2e p. 268).

*13b, plausible and discriminating* - **PARTIAL, and cannot be fully mechanized.** See G21.

**G14. "Make sure that only one of these options is the right answer."** - **ENFORCED (strongest coverage in the stack; exceeds the literature's minimum)**

Four independent mechanisms:
1. Structural: exactly one `is_correct`; option count checked at `author_bank_questions.py:207-208`; the JSON loader splits key from distractors by `is_correct`, never by stored position - `audit_cues.py:399-424`.
2. **Blind re-answer.** `self_check.py:35-88`: options shuffled, key hidden, no explanation, an independent model picks one; a text-level mismatch flags the item as a wrong-key/ambiguity candidate. Wired at `qa_pass_ccp_v1.py:131` and `author_bank_questions.py:394`. Seeded per question id for reproducibility (`qa_pass_ccp_v1.py:130`). Deliberately fail-open (`self_check.py:46-47`).
3. QC: "A defensible second-correct answer is a failure" - `qa_pass_ccp_v1.py:62`; multiselect always-FAIL "A distractor that should actually be correct" - `qc_reviewer_multiselect.py:113`.
4. Truth gate: `counter_evidence_check.py` catches keys whose claim is contradicted by primary source - the 2026-08-31 CAMTS weather-turndown incident documented in that file's header is precisely a case the other three would have passed.

**G15. "Vary the location of the right answer according to the number of options."** - **UNENFORCED BY DESIGN (documented, defensible)**

- `audit_cues.py:26-28` states the reason explicitly: the correct answer is always stored first by DB convention, so any check keyed on stored column position would be meaningless. The delivery platform randomises at render (`barton/restructure_long.py:49`: "The delivery platform shuffles - never encode position tricks").
- This is the right call. **But:** the shuffle is asserted in comments, never verified by anything in this repo. For a certification-agency submission, an unverified assertion about key position is a weak spot. See BACKLOG item L6.

**G16. "Place options in logical or numerical order."** - **UNENFORCED**

- `near_dup_pairs` extracts numeric content per option (`audit_cues.py:249`) solely to avoid false duplicate flags on parallel numeric choices. Nothing checks ordering.
- Cheap deterministic win. See BACKLOG item D4.

**G17. "Keep options independent; options should not be overlapping."** - **PARTIAL**

- `near_dup_distractors` (ADVISORY) - `audit_cues.py:237-267`, dispatched `:345`. Token-set Jaccard >= 0.7 or substring containment. ADVISORY tier with a stated reason at `:90-93`: token overlap cannot distinguish "same meaning twice" from a legitimate homogeneous set (burn-depth options).
- **Gap A:** the check runs on distractors only (`near_dup_distractors_check(wrong)`, `:265-267`). A distractor that is a subset of the **key** is never compared.
- **Gap B:** numeric-range overlap is structurally invisible. `audit_cues.py:255-256` short-circuits any pair whose extracted numbers differ, so `"<20%"` vs `"20-30%"` never reaches the similarity test at all.
- See BACKLOG item D3.

**G18. "Avoid using the options none-of-the-above, all-of-the-above and I don't know."** - **ENFORCED (FLAG tier)** - *spot-verified*

- `aota_nota_tf_check` - `audit_cues.py:173-197`, dispatched from `cues_for_item` at `:339`, severity FLAG at `:87`. Components: `AOTA_NOTA` regex `:61-65`; `COMBO_LETTERS` `:72-74`; `COMBO_ROMAN` `:75-77`; exact True/False `:185-187`; prose-"both X and Y" subset test `:188-196` (only fires when the option actually contains the token content of >= 2 other options, which is what makes it exploitable).
- Also blocked at generation: prompt `author_bank_questions.py:143`, regex `AOTA` at `:73` (which additionally covers `A and C` K-type), enforced `:216-217`.
- Verified end to end: `cues_for_item("...", ["All of the above"], [...], 200)` returns `['aota_nota_tf']` with `severity_of == "FLAG"`.
- The stack **exceeds** the guideline by also banning K-type combos and bare True/False, which Rodriguez treats as separate format questions (HTD 2e p. 266).
- **Minor gap:** "I don't know" is named in the guideline and is not in the regex.

**G19. "Word the options positively; avoid negative words, such as NOT."** - **UNENFORCED**

Same family and same fix as G12. No option-level negation check at any tier. See BACKLOG item D1.

**G20. "Avoid giving clues to the right answer" (sub-guidelines a-f, HTD 2e p. 268)** - this is the heart of the lint.

**G20a. "Keep the length of options about equal."** - **ENFORCED, four layers** - *spot-verified*. One of the four empirically supported guidelines (p. 268).

1. Per-item: `correct_longest` (FLAG) - `audit_cues.py:311-313`. Fires when the key is >= 1.4x the longest distractor **and** >= 25 chars longer. Verified: a 90-char key against 13-char distractors returns `['correct_longest']`.
2. Absolute ceiling: `option_too_long` (FLAG) - `audit_cues.py:167-170`, profile bars `:100-104`.
3. Bank-wide slice skew: `compute_skew_stats` - `audit_cues.py:270-287`, WARN at >15% key-vs-distractor mean skew (`:286`), reported per Exam Level / Category (xlsx) or Book / Difficulty (JSON) by `print_skew_table` `:437-452`. Verified: keys `[200,220]` vs distractors `[100,110]` → skew 100.0%, `warn=True`.
4. Bank-wide strictly-longest rate on single-key rows, with a declared acceptance band of 25-30% (chance for four options) - `audit_cues.py:471-476`, printed `:587-591`. `scripts/qa/repair_cues_json.py` repairs a *quota* of strictly-longest items specifically to land the bank inside that band.
5. **Generation-time randomisation (house design, exceeds the guideline):** each slot carries a `key_longest` boolean role, so on some slots the key is *required* to be longest by a modest margin and on others a distractor is *required* to be longer - `author_bank_questions.py:172-176`, mechanically enforced `:221-233`. Rather than aiming at "about equal," this makes option length carry zero information about the key. This is the single best idea in the stack and is worth documenting as a procedure innovation in its own right.

**G20b. "Avoid specific determiners, including always, never, completely and absolutely."** - **ENFORCED** - *spot-verified*

- `ABSOLUTE` regex - `audit_cues.py:52-56`: `always|never|all patients|only|must|guaranteed|completely|immediately in all`.
- `hedge_vs_absolute` (FLAG) - `audit_cues.py:319-325`: key hedges (`HEDGE` regex `:57-59`), no absolute in key, and >= 2 distractors carry an absolute. Verified: returns `['hedge_vs_absolute', 'absolute_anywhere']`.
- `absolute_anywhere` (ADVISORY) - `audit_cues.py:200-209`, dispatched `:341`. Directional on purpose: only distractor-only absolutes leak the key; a key that itself uses an absolute defeats the elimination heuristic. Verified, including the symmetric clean case.
- `validator.py:414-469`: `ABSOLUTE_ALWAYS` / `ABSOLUTE_NEVER` (warning tier) on the key, with a clinically sensible allowlist (`acceptable_always` `:425-429`, `acceptable_never` `:430-435`) so "always assess," "never delay transport" do not generate noise.
- `lint_blueprint_absolutes.py` catches the absolute upstream in the blueprint rationale, before an item exists.
- **Minor gap:** the guideline names "absolutely," which is not in the regex; nor are `entirely`, `exclusively`, `invariably`, `without exception`, `none`.

**G20c. "Avoid clang associations, options identical to or resembling words in the stem."** - **ENFORCED (ADVISORY tier)** - *spot-verified*

- `stem_echo_check` - `audit_cues.py:212-234`, dispatched `:343`. A content word of >= 5 chars, crude-lemmatized (`crude_lemma` `:130-140`) and stopword-stripped (`STOPWORDS` `:108-122`), present in the key and in no distractor, and not in the stem's final 10 words (which often grammatically force it). Verified: the anaphylaxis case returns `stem_echo`; the case where a distractor also carries the word does not.
- ADVISORY, not FLAG, and waivable with a written per-item reason - `barton/cue_waivers.json` records 8 stem-echo waivers, each with a clinical justification (e.g. "'cord injury' is required clinical vocabulary for AEMT/Paramedic scope; introducing it into any distractor would make it accidentally plausible").
- **Gap:** only surface-form repetition. Morphological/etymological clang ("bone" in the stem → "osteo-" in the key) is not caught; `crude_lemma` strips only `s/es/ing/ed`. See BACKLOG item L2.

**G20d. "Avoid pairs or triplets of options that clue the test taker to the correct choice."** - **PARTIAL**

- `near_dup_distractors` catches textual near-duplicate pairs among distractors (see G17).
- **Gap A - convergence.** The literature's classic version of this flaw is the key being the "average" of the option set: it shares more content with the other options than any distractor does, so term-frequency counting converges on it. Nothing computes this. It is a cheap token-overlap calculation.
- **Gap B - antonym/opposite pairs** (hypo-/hyper-) are not detected.
- **Gap C - collectively exhaustive sets** (increase / decrease / no change plus two unrelated options) require semantic relation detection and belong in the judgment tier, not the lint.
- See BACKLOG items D3 and L7.

**G20e. "Avoid blatantly absurd, ridiculous options."** - **UNENFORCED mechanically; CANNOT be mechanized**

- Judgment coverage: authoring DISTRACTOR DISCIPLINE forbids "an obviously unsafe absurdity" (`author_bank_questions.py:154`); `barton/judge_options.py` rewrites options that stopped being answer options; QC criterion 4 asks whether distractors are "plausible (not obviously wrong)" (`qc_reviewer.py:96`).
- Absurdity is a clinical judgment, and the definitive test is empirical: a low-frequency distractor chosen by under ~5% of examinees should be revised or dropped (HTD 2e p. 402, citing Haladyna & Downing 1993). No construction-time rule replaces that.

**G20f. "Keep options homogeneous in content and grammatical structure."** - **PARTIAL**

- Three deterministic parallelism proxies, all of the form "one option carries a marker none of the others do":
  - `paren_only_correct` (FLAG) - `audit_cues.py:305-306`, `PAREN` regex `:50`.
  - `example_only_correct` (FLAG) - `audit_cues.py:316-317`, `EG` regex `:51`.
  - `period_mismatch` (FLAG) - `audit_cues.py:329-334`.
- Real grammatical homogeneity is judged by model: `barton/judge_options.py:50` standard 2 ("IT MUST ANSWER THE STEM IN THE SAME GRAMMATICAL FORM AS THE CORRECT ANSWER"), post-validated at `:157-194`; TEMPLATE PARITY in `barton/repair_cues.py:48`; authoring prompt `author_bank_questions.py:153`.
- **Gap:** no part-of-speech or leading-token check, so the cheap 80% case (a declarative sentence among noun phrases) costs an API call per item today. See BACKLOG item D4.

**G21. "Make all distractors plausible. Use typical errors of test takers to write distractors."** - **PARTIAL; the plausibility half cannot be mechanized**

- Generation: "Each states a real misconception a weak provider at this level holds" (`author_bank_questions.py:153`); DISTRACTOR DISCIPLINE (`:154`) enumerates the permitted distractor sources - a real alternative diagnosis, a real procedural step out of sequence, or a documented common error - and forbids unrelated body systems, invented mechanisms, and two options sharing one misconception.
- Mechanical floor: `barton/judge_options.py:40-45` `SELF_REFUTE` regex rejects distractors that describe their own wrongness ("fails to...", "making X more difficult") - those are commentary, not options; minimum distractor length 20 chars (`:186`); `validator.py:346-408` keeps out-of-scope interventions out of distractors, because an out-of-scope distractor is self-eliminating and makes the item too easy (`qc_reviewer.py:99`).
- QC criterion 4 - `qc_reviewer.py:95-100`.
- **This is where construction review genuinely runs out.** Haladyna is explicit: "Distractor evaluation reveals that many distractors do not work as intended" (HTD 2e p. 401); "many distractors in four- and five-option items fail to attract responses from any examinees" (p. 402). Only response data settles it.

**G22. "Avoid the use of humor."** - **UNENFORCED**

No rule, no criterion. Not a realistic failure mode for an LLM-authored clinical bank; recorded for completeness, not proposed for the backlog.

---

## 4. Summary table

| # | Guideline (HTD 2e pp. 267-268) | Status | Primary enforcement |
|---|---|---|---|
| 1 | One content type / cognitive demand | PARTIAL | `author_bank_questions.py:209-210` (proxy) + slot spec |
| 2 | New material for higher-level thinking | PARTIAL | `originality_check.py` + Bloom slots |
| 3 | Items independent of one another | PARTIAL | `originality_check.py` (duplication, not cluing) |
| 4 | Test important content | PARTIAL | Blueprint + `:238-239` objectives requirement |
| 5 | Avoid unqualified opinions | PARTIAL | `counter_evidence_check.py`, `lint_blueprint_absolutes.py`, QC 1 |
| 6 | Avoid trick items | PARTIAL | Prompt only (`:149`, `:155`); no QC criterion |
| 7 | Format vertically | BY CONSTRUCTION | Storage + platform |
| 8 | Edit and proof | PARTIAL | `period_mismatch`; adjudication sheet |
| 9 | Linguistic complexity | PARTIAL | `option_too_long` only; no readability metric |
| 10 | Minimize reading / no window dressing | **UNENFORCED** (options only) | **no stem cap exists** |
| 11 | Central idea in stem, not options | PARTIAL | Prompt only; cover-the-options untested |
| 12 | **Word the stem positively** (empirical) | **UNENFORCED** | **none** |
| 13a | Three options usually sufficient (empirical) | ENFORCED | Slot `n_options`, `:207-208` |
| 13b | Options plausible and discriminating (empirical) | PARTIAL | QC 4; not mechanizable |
| 14 | Only one right answer | **ENFORCED (4 mechanisms)** | `self_check.py:35-88` + QC + `counter_evidence_check.py` |
| 15 | Vary key location | UNENFORCED BY DESIGN | `audit_cues.py:26-28`; platform shuffles (unverified here) |
| 16 | Logical/numerical option order | UNENFORCED | none |
| 17 | Options independent / non-overlapping | PARTIAL | `near_dup_distractors`; no key compare, no range overlap |
| 18 | **No AOTA/NOTA/I-don't-know** (empirical) | **ENFORCED (FLAG)** | `audit_cues.py:173-197` + `:216-217` |
| 19 | Word options positively | **UNENFORCED** | **none** |
| 20a | **Equal option length** (empirical) | **ENFORCED (4 layers + randomised role)** | `audit_cues.py:311-313`, `:270-287`, `:471-476`, `author:221-233` |
| 20b | No specific determiners | ENFORCED | `audit_cues.py:319-325`, `:200-209`, `validator.py:414-469` |
| 20c | No clang associations | ENFORCED (ADVISORY) | `audit_cues.py:212-234` |
| 20d | No clueing pairs/triplets | PARTIAL | `near_dup_pairs`; no convergence, no antonym pairs |
| 20e | No absurd options | UNENFORCED (not mechanizable) | Prompt + QC 4; empirically, p. 402 |
| 20f | Homogeneous content/grammar | PARTIAL | 3 marker proxies + `judge_options.py:50` |
| 21 | Plausible distractors from typical errors | PARTIAL (not mechanizable) | `SELF_REFUTE` floor + QC 4 |
| 22 | Avoid humor | UNENFORCED | none (accepted) |

Tally over the 27 checkable entries (22 guidelines with 20 expanded into a-f, and 13 split): **8 ENFORCED, 13 PARTIAL, 5 UNENFORCED, 1 by construction.** Of the four guidelines Rodriguez identifies as empirically supported (p. 268), **three are enforced (13a, 18, 20a) and one is entirely absent (12)**.

---

## 5. Gate rules with no literature anchor (house rules)

These are not wrong. They are undocumented-in-the-literature choices, and for a Standards-defensible procedure record they need to be labelled as local rules with stated rationale rather than presented as canonical practice.

| House rule | Where | Status |
|---|---|---|
| **No em-dashes anywhere** | `author_bank_questions.py:142`, `:218-220` | Pure house style. Zero psychometric content. Label as editorial convention. |
| **Exactly one question mark per stem** | `author_bank_questions.py:209-210` | House proxy for G1/G11. Defensible as a proxy; say so. |
| **Option hard character caps (150 / 200)** | `audit_cues.py:100-104`, owner rulings 2026-08-28 / 2026-08-31 recorded at `:21-24` | Serves G9/G10, but the specific numbers are owner rulings, not literature. The per-bank divergence (CCP options carry vitals and vent settings) is well reasoned and already documented in-file. |
| **`period_mismatch` as a FLAG-tier blocking cue** | `audit_cues.py:329-334` | G20f endorses homogeneity; promoting terminal punctuation to *blocking* is a house severity calibration. |
| **Randomised `key_longest` slot role** | `author_bank_questions.py:172-176`, `:221-233` | Exceeds G20a. No literature source proposes it. Strongest house innovation in the stack - document it as a deliberate improvement on "about equal." |
| **Strictly-longest acceptance band 25-30%** | `audit_cues.py:471-476`, `:587-591` | Derived from chance with four options. Sound reasoning, but the specific band is house. Note that a 3-option CCP bank's chance rate is 33%, not 25% - `repair_cues_json.py`'s header already reasons about this; `audit_cues.py`'s printed band text still says 25-30% unconditionally. |
| **FLAG vs ADVISORY severity tiering** | `audit_cues.py:81-96` | No literature source assigns severity to guidelines. The per-cue rationale comments (`:90-93`) are exactly the right documentation form. |
| **Fail-open blind self-check** | `self_check.py:46-47` | Engineering decision with a stated rationale (never drop an item on an infra hiccup). Note it: it means a self-check outage is silently a pass. |
| **Mandatory `Reference:` line + `source_book_id`** | `author_bank_questions.py:161`, `:234-235` | Not an item-writing guideline. Anchors instead to Standard 4.7 documentation and to copyright/provenance control. |
| **Mandatory `tested_objectives` from a closed menu** | `author_bank_questions.py:238-239` | Anchors to Standards 4.1 / 4.12 (blueprint-to-item traceability), not Haladyna. |
| **IBSC 3-option format + closed IBSC domain list** | `author_bank_questions.py:240-241`, `qc_reviewer.py:309-315` | Credential-body convention. Happens to coincide with Rodriguez (2005); say that it coincides, do not claim it derives from it. |
| **Standard units; spell out uncommon abbreviations on first use** | `author_bank_questions.py:144` | Editorial. Adjacent to NBME's "numeric data presented inconsistently," which is not in the Haladyna 22. |
| **Answer-position checks declared out of scope** | `audit_cues.py:26-28` | Correct engineering call against G15; the compensating control (platform shuffle) lives outside this repo and is unverified here. |
| **Written cue waivers** | `barton/cue_waivers.json` | Not in the literature. This is precisely the kind of documented exception record Standard 4.7 asks for. Keep it; cite it as evidence of procedure, not as a gap. |

---

## 6. What the Standards require that no gate addresses

These are documentation and empirical obligations, not item-writing rules. They matter for the certification-agency goal and no code in this repo touches them.

- **Standard 4.9** (2014, p. 88) - when item tryouts are conducted, the procedures used to select the tryout sample and the resulting sample characteristics should be documented, and the sample should be representative of the intended population. Nothing in the gate stack records tryout sample composition.
- **Standard 4.10** (2014, pp. 88-89) - the model used to evaluate item psychometric properties (CTT, IRT, other) should be documented, the screening sample described, and "the process by which items are screened and the data used for screening, such as item difficulty, item discrimination, or differential item functioning (DIF) ... should also be documented." No DIF analysis exists anywhere in the stack.
- **Standard 4.8** (2014, p. 88) - the test review process should include empirical analyses **and/or** expert judges. MedEdPrep has the expert-judge half (`build_adjudication_sheet.py` → `apply_adjudication.py`, with a documented case at that file's header where a clinician correctly overruled a QC rejection). The empirical half lives on the platform and is not joined back to the bank.
- **Standard 4.7** (2014, p. 87) - "The procedures used to develop, review, and try out items and to select items from the item pool should be documented," including the qualifications of item developers and reviewers and how they were trained. The code and its in-file rationale comments are most of that record; what is missing is a single human-readable procedure document. PROVENANCE.md in this directory is the first draft of it.
