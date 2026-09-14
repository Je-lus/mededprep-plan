# Item-Gate Incremental Backlog

Ranked upgrades to MedEdPrep's item-review gate stack, sized in minutes and hours and scoped as small additions to existing files - no redesign, no new framework. Five "do now" items, nine "later" items, each tied to the item-writing guideline it enforces and honest about which flaws cannot be mechanized at all.

---

## Ground rules this list follows

1. **Every item is an addition to a file that already exists.** No new subsystems. The lint has a poison-test harness (`audit_cues.py:616-818`); every new rule ships with a fire-case and a clean-case assertion in it, or it does not ship.
2. **Tier honesty.** Each item names whether it belongs in the deterministic lint or the model-judgment tier. Several guidelines - distractor plausibility above all - cannot be mechanized at any effort level, and nothing below pretends otherwise.
3. **Construction quality never substitutes for empirical item statistics.** See the closing section. The platform's discrimination data is the final judge and always outranks anything on this list.
4. Sizes assume the person doing the work already knows the file. Add a poison-test cycle to each.

Guideline numbers are the Haladyna & Rodriguez (2013) 22-guideline set as printed in *Handbook of Test Development* 2e (Rodriguez ch. 13, pp. 267-268), hereafter **HTD 2e**. Standards citations are AERA/APA/NCME (2014) chapter 4.

---

## DO NOW (5)

### D1. Negative-stem and negative-option lint

- **Add:** two new cues in `scripts/qa/audit_cues.py` - `negative_stem` (FLAG) and `negative_option` (ADVISORY) - dispatched from `cues_for_item` alongside the existing ten, with severities registered in `CUE_SEVERITY` (`:81-96`). Mirror the prompt rule into `author_bank_questions.py` `system_prompt` so the author model stops producing them, and add the check to `validate_draft` (`:204-252`).
- **Guideline:** **G12** "Word the stem positively, avoid negative phrasing" and **G19** "Word the options positively; avoid negative words, such as NOT" (HTD 2e p. 267).
- **Why first:** G12 is one of only **four** guidelines in the taxonomy with empirical evidence behind it (HTD 2e p. 268, which names 12, 13, 18 and 20a). The stack already enforces the other three. G12 currently has **zero coverage at any tier** - no regex, no prompt rule, no QC criterion. The repo's own prior research file records negative stems as the most prevalent flaw found in a real health-professions item bank (`barton/research/item-writing-flaws.md`, citing Tarrant et al. 2006, 2,770 nursing MCQs). Highest payoff on the list and among the cheapest.
- **Tier:** deterministic lint. This is pure surface form.
- **Sketch:**
  ```python
  # Deliberate all-caps negation: the conventional bank formatting for a
  # negative lead-in. Unambiguous, so FLAG.
  NEG_STEM_HARD = re.compile(r"\b(EXCEPT|NOT|LEAST|INCORRECT|FALSE|AVOID)\b")
  # Prose negation. Clinical writing legitimately says "not indicated", so this
  # tier reports rather than blocks.
  NEG_STEM_SOFT = re.compile(
      r"\b(is not|are not|should not|would not|does not|cannot|"
      r"least likely|not true|not indicated|not appropriate|"
      r"all of the following)\b", re.I)

  def negative_stem_check(stem):
      """G12. Hard tier = all-caps negation (a deliberate negative lead-in)."""
      return bool(NEG_STEM_HARD.search(stem or ""))

  def negative_option_check(correct, wrong):
      """G19. A negation in distractors that the key does not share is both a
      negative-option flaw and a homogeneity break (G20f)."""
      neg = lambda o: bool(NEG_STEM_HARD.search(o) or NEG_STEM_SOFT.search(o))
      return not any(neg(a) for a in correct) and any(neg(a) for a in wrong)
  ```
  Run it over the Barton REVIEWED workbook and the CCP banks before choosing severities - if the soft pattern fires on more than a few percent, demote it to ADVISORY-only and keep FLAG for the all-caps form. Note `audit_cues.py:73` already establishes the case-sensitive-on-purpose precedent (`COMBO_LETTERS`).
- **Size:** 45-60 min including poison tests and a baseline run on both banks.
- **Payoff:** closes the largest empirically supported gap in the map. Also the easiest item on this list to describe in an accreditation submission.

### D2. Stem length cap and bank-wide stem-length distribution

- **Add:** `stem_too_long` (FLAG) in `audit_cues.py`, with per-profile bars in the existing `PROFILES` dict (`:100-104`), plus a stem-length distribution table alongside the two existing skew tables in `print_skew_table` / the `audit()` summary (`:437-452`, `:506-517`).
- **Guideline:** **G10** "Minimize the amount of reading in each item. Avoid window dressing," and **G9** linguistic complexity (HTD 2e p. 267).
- **Why:** `option_too_long` bounds options at 150/200 chars, but **there is no stem cap or stem statistic anywhere in the stack.** For an LLM-authored scenario bank this is the largest unmeasured reading-load surface, and reading load is construct-irrelevant variance under Standard 4.13 (2014, p. 90). Rodriguez lists accessibility item-development practices including "economical use of text" and "elimination of redundancy" (HTD 2e p. 269, quoting Beddow 2012).
- **Tier:** deterministic lint for the cap; the "window dressing" judgment (is this detail clinically relevant?) is genuinely un-mechanizable and belongs in D5.
- **Sketch:** two bars per profile, because a CCP scenario stem carrying vitals and vent settings legitimately runs long where a recall stem does not:
  ```python
  PROFILES = {
      "barton": {"option_max_chars": 150, "stem_max_chars": 600},
      "ccp":    {"option_max_chars": 200, "stem_max_chars": 900},
  }

  def stem_too_long_check(stem, max_chars):
      return len(stem or "") > max_chars
  ```
  Derive the actual numbers empirically first: compute the p50/p95/max stem length per bank and per difficulty, set the bar at roughly p95 of the currently-approved set, and record the owner ruling in the file header the same way the option bars are recorded at `:21-24`. Report the distribution table every run whether or not anything trips, so drift is visible before it becomes a flag.
- **Size:** 30-45 min for the rule and the table, plus ~15 min measuring the existing banks to pick bars.
- **Payoff:** turns an entirely unmeasured dimension into a measured one, and the measurement itself is the deliverable even before the cap bites.

### D3. Key-vs-distractor overlap, numeric-range overlap, and convergence

- **Add:** three changes inside `near_dup_pairs` / `near_dup_distractors_check` (`audit_cues.py:237-267`) plus one new cue.
- **Guidelines:** **G17** "Keep options independent; options should not be overlapping" and **G20d** "Avoid pairs or triplets of options that clue the test taker to the correct choice" (HTD 2e pp. 267, 268).
- **Why:** three concrete holes, all in one function:
  1. **The key is never compared.** `near_dup_distractors_check(wrong)` (`:265-267`) only pairs distractors against each other. A distractor that is a substring or near-subset of the key is a direct giveaway and is currently invisible.
  2. **Numeric-range overlap is structurally unreachable.** `:255-256` short-circuits any pair whose extracted numbers differ, so `"<20%"` vs `"20-30%"` never reaches the similarity test. The guard was added for a good reason (parallel numeric choices are good design, not duplicates), but it also blocks the one numeric flaw worth catching.
  3. **Convergence is absent.** The classic form of G20d is the key being the "average" of the option set - sharing more content with the other options than any distractor does, so term-frequency counting converges on it.
- **Tier:** deterministic lint, all three.
- **Sketch:**
  ```python
  def key_overlap_check(correct, wrong):
      """G17: a distractor contained in, or near-identical to, the key."""
      return any(near_dup_pairs([k, d]) for k in correct for d in wrong)

  def parse_ranges(opt):
      """('<', 20), ('range', 20, 30), ('>', 50) ... unit-agnostic."""
      ...

  def numeric_overlap_check(options):
      """G17: numeric option sets whose ranges overlap or mix formats.
      Runs BEFORE the nums[i] != nums[j] short-circuit, not after it."""
      ...

  def convergence_check(correct, wrong):
      """G20d: the key shares more content with the option set than any
      distractor does. Token-set overlap against the union of the others."""
      opts = correct + wrong
      def score(i):
          others = set().union(*(token_set(o) for j, o in enumerate(opts) if j != i))
          return len(token_set(opts[i]) & others)
      key_score = max(score(i) for i in range(len(correct)))
      distractor_max = max(score(i) for i in range(len(correct), len(opts)))
      return key_score > distractor_max * 1.5 and key_score - distractor_max >= 2
  ```
  Ship `key_overlap` and `numeric_overlap` at FLAG; ship `convergence` at ADVISORY until a run over both banks shows the 1.5x/2-token margin is not noisy - the same calibration discipline `near_dup_distractors` already documents at `:90-93`.
- **Size:** 60-90 min, most of it in `parse_ranges` and in calibrating the convergence margin against real banks.
- **Payoff:** G17 and G20d are the thinnest-covered clue families in the map, and all three fixes land inside one function that already has test coverage.

### D4. Option-set homogeneity proxies: leading-form consistency and numeric ordering

- **Add:** `option_form_mismatch` (ADVISORY) and `numeric_order` (ADVISORY) in `audit_cues.py`.
- **Guidelines:** **G20f** "Keep options homogeneous in content and grammatical structure" and **G16** "Place options in logical or numerical order" (HTD 2e pp. 267, 268).
- **Why:** G20f is currently carried by three marker proxies (`paren_only_correct`, `example_only_correct`, `period_mismatch`) and otherwise by an API call per item - `barton/judge_options.py:50` spends a model call judging grammatical form-fit. The cheap 80% case (a declarative essay sentence sitting among noun phrases) is detectable from the first token with no NLP dependency, which is consistent with the file's standing rule of staying dependency-free. G16 has zero coverage and is trivial for numeric sets.
- **Tier:** deterministic lint for the cheap cases. Full "same content dimension" judgment stays with `judge_options.py` - do not try to mechanize that.
- **Sketch:**
  ```python
  GERUND = lambda w: w.endswith("ing")
  # crude verb-initial test without a POS tagger: an imperative clinical
  # option starts with a bare verb, which crude_lemma leaves unchanged and
  # which is not a determiner/preposition
  def leading_form(opt):
      w = (tokenize(opt) or [""])[0]
      if w in STOPWORDS:            return "det"
      if GERUND(w):                 return "gerund"
      if w in CLINICAL_VERBS:       return "verb"      # small seed list
      return "noun"

  def option_form_mismatch_check(options):
      """G20f: options do not share a leading grammatical form."""
      forms = {leading_form(o) for o in options if o}
      return len(forms) > 1

  def numeric_order_check(options):
      """G16: an all-numeric option set that is not monotonically ordered."""
      vals = [first_number(o) for o in options if o]
      if any(v is None for v in vals) or len(vals) < 3:
          return False
      return vals != sorted(vals) and vals != sorted(vals, reverse=True)
  ```
  `CLINICAL_VERBS` needs about 40 entries (administer, apply, assess, begin, check, defibrillate, establish, give, immobilize, initiate, obtain, perform, place, prepare, reassess, suction, transport, ventilate, withhold...) - seed it from the existing banks' actual option-initial word frequencies rather than from imagination. Note `numeric_order` must skip the key-first storage convention: order the options as the platform renders them, or restrict the check to banks where option order is meaningful.
- **Size:** 60 min, plus ~20 min mining the verb seed list from the banks.
- **Payoff:** converts a per-item API cost into a free check for the common case, and closes G16 outright.

### D5. Two new QC-reviewer criteria: cover-the-options, and trick items / window dressing

- **Add:** two criteria to `QC_SYSTEM_PROMPT` in `scripts/qgen/qc_reviewer.py` (`:71-117`) and the corresponding fields to `QCReviewResult` (`validation_models.py:93-155`), then mirror into `qc_reviewer_pulse.py` and `qc_reviewer_multiselect.py`.
- **Guidelines:** **G11** "State the central idea clearly and concisely in the stem and not in the options," **G6** "Avoid trick items," **G10** "avoid window dressing" (HTD 2e p. 267).
- **Why:** these three guidelines currently have **no coverage in any tier** - not a rule, not a prompt constraint the reviewer checks, not a QC criterion. They are also genuinely un-mechanizable: whether a stem is answerable without its options, and whether a detail is clinically relevant or decorative, are content judgments. That makes the model-judgment tier the *correct* home, not a fallback. Note that the blind self-check (`self_check.py:35-88`) specifically does not test G11 - it shows the model the options.
- **Tier:** model judgment, unambiguously.
- **Sketch:** insert after criterion 4 in `QC_SYSTEM_PROMPT`:
  ```
  ### 5. STEM FOCUS (cover-the-options test)
  - Cover the answer choices. Could a knowledgeable provider at this level
    answer the question from the stem alone?
  - If the stem is only answerable by reading and comparing the options, the
    central idea is in the options instead of the stem. Mark stem_focus false.
  - The key must require a decision, never merely restate data already in
    the stem.

  ### 6. IRRELEVANT DIFFICULTY (trick items and window dressing)
  - Does the stem carry clinically irrelevant detail that lengthens the read
    without changing the answer?
  - Does it bury a decisive negative finding inside unrelated history, so the
    item tests careful reading rather than clinical knowledge?
  - Is any option deliberately misleading rather than a genuine misconception?
  - Difficulty must come from distractor closeness and data interpretation,
    never from trick wording. Mark irrelevant_difficulty true if it does.
  ```
  Add `stem_focus: bool` / `stem_focus_notes` and `irrelevant_difficulty: bool` / `irrelevant_difficulty_notes` to `QCReviewResult`, and to the JSON schema in `_build_review_prompt` (`:356-371`). Keep both out of the always-FAIL list at first - route them to UNCERTAIN so they land on the adjudication sheet (`build_adjudication_sheet.py`) rather than silently rejecting good items. That file's header documents exactly why QC verdicts get adjudicated rather than applied.
- **Size:** 20 min prompt and model edit, plus one regression run of ~50 known-good items to confirm the new criteria do not spike the UNCERTAIN rate. Call it 60-75 min all in.
- **Payoff:** three guidelines from zero coverage to judgment coverage, at prompt cost, in the only tier that can hold them.

---

## LATER (9)

### L1. Complete the two existing regexes
Add `I don't know` to `AOTA_NOTA` (`audit_cues.py:61-65`, closing the last third of **G18**, which names it explicitly on HTD 2e p. 267), and add `absolutely`, `entirely`, `exclusively`, `invariably`, `without exception`, `none` to `ABSOLUTE` (`:52-56`) - the guideline text itself names "absolutely," which the current regex misses (**G20b**, HTD 2e p. 268). **10-15 min.** Low absolute payoff, near-zero cost, and it removes two easy criticisms from an accreditation read. Re-run both banks afterward: widening `ABSOLUTE` also widens `hedge_vs_absolute` and `absolute_anywhere`, so expect new flags.

### L2. Morphological clang detection
**G20c** (HTD 2e p. 268) covers options "identical to or resembling words in the stem." `stem_echo_check` catches identity; it does not catch resemblance, because `crude_lemma` (`:130-140`) strips only `s/es/ing/ed`. The literature's canonical example is stem "bone" → key "osteo-". Needs a curated medical root table (oste-/bone, nephr-/ren-/kidney, cardi-/heart, pneum-/lung, hepat-/liver, hem-/blood...) of maybe 80 entries, checked as a second pass inside `stem_echo_check`. **2-4 h**, most of it building and validating the table against the corpus. Moderate payoff; genuinely EMS-specific work that cannot be borrowed.

### L3. Readability metric per certification level
**G9** (HTD 2e p. 267) and the accessibility practices Rodriguez cites on p. 269. Add a Flesch-Kincaid grade or a dependency-free syllable/word-length proxy over stem plus options, reported as a per-level distribution with a band - **not** a hard gate, because a grade-level number is a poor blocking criterion on clinical text. Pairs naturally with D2; build the reporting table once and put both measures in it. **1-2 h.** Payoff is diagnostic: it tells you whether an AEMT bank is drifting toward paramedic-level prose, which nothing currently measures.

### L4. Embedding-based near-duplicate detection (the planned v3)
Already designed in-code: `audit_cues.py:239-242` says v3 should embed options with the repo's existing BGE model (`retrieval/embeddings.py`) and threshold on cosine similarity instead of token overlap. That would let `near_dup_distractors` graduate from ADVISORY to FLAG, because cosine similarity can separate "same meaning twice" from a legitimate homogeneous set ("Superficial" / "Superficial partial thickness") in a way token Jaccard cannot - which is the exact reason `:90-93` gives for the advisory tier today. **2-3 h.** Caveat: it adds a model dependency to a file whose stated design value is being dependency-free; keep it behind a flag so the pure-Python path stays the default.

### L5. Cross-item cluing scan within an assembled form
**G3** "Keep the content of items independent of one another" (HTD 2e p. 267). `originality_check.py` already computes longest-shared-n-gram between items; extend it from *duplication* to *key leak* - flag pairs where item A's stem or explanation contains item B's key text, or where the n-gram overlap between A's explanation and B's key exceeds a threshold, within one assembled exam (`assemble_exam_bank.py`, `resolve_exam_slots.py`). **2-3 h.** Payoff scales with form assembly: irrelevant for a practice pool, material for a fixed-form certification exam.

### L6. Verify the platform's option shuffle is uniform
**G15** "Vary the location of the right answer" (HTD 2e p. 267). The repo correctly declares answer-position checks out of scope (`audit_cues.py:26-28`) because the key is stored first by DB convention and the platform randomises at render. That reasoning is sound, but the compensating control is asserted in comments and verified by nothing in this repo. For a certification submission, sample render logs or response data and show the key-position distribution is uniform across the option count. **1-2 h plus platform access.** Zero code change to the gate stack; it produces a one-page evidence artifact, which is the point.

### L7. Collectively-exhaustive and antonym-pair option sets
The remaining two thirds of **G20d** (HTD 2e p. 268): a subset of options covering all logical possibilities on one axis (increase / decrease / no change), and antonym pairs (hypo-/hyper-) that tell a test-wise reader the answer lives inside the pair. Antonym pairs are partly mechanizable with a medical prefix table (shares L2's table). Collective exhaustiveness requires semantic relation detection and **should not be attempted in the lint** - add it as a bullet under D5's new QC criterion 6 instead. **30 min** as prompt text; the antonym half is **1-2 h** once L2 exists.

### L8. Join platform item statistics back to the bank
The highest-importance item on this entire list and deliberately last in the ordering only because of size and its dependency on a platform data export. Ingest per-item p-value and point-biserial (and, where group sizes allow, DIF) and auto-flag against Haladyna's Table 20.3 (HTD 2e p. 400): type 2 (p 0.60-0.90, discrimination < 0.15 - poor discrimination, avoid), type 5 (p < 0.60, discrimination < 0.15 - difficult and nondiscriminating, retire or revise), type 6 (discrimination < 0.00 with a distractor patterning like the key - **an outright key error**). Separately flag low-frequency distractors below ~5% choice rate, which "should be revised or dropped from the item" (HTD 2e p. 402, citing Haladyna & Downing 1993). Honour the counterweight in the same chapter: an easy item above p 0.90 may still be retained if SMEs judge the content important, because "psychometric item data does not trump the judgment of SMEs" (HTD 2e p. 400). **A day or more**, gated on the export. It is also the only route to Standard 4.10 compliance (2014, pp. 88-89), which explicitly names item difficulty, item discrimination and DIF as the screening data that must be documented.

### L9. Emit the procedure record as a shipped artifact
Rodriguez, recommendation 4 to test developers: *"Closely follow item writing guidelines and document how they were employed in training, supervising and monitoring item writers"* (HTD 2e p. 272); recommendation 1: begin documenting each step, decision rule, evidence and outcome from the start of the project. Standard 4.7 (2014, p. 87) requires the same. Make `audit_cues.py` emit a per-bank machine-readable procedure record - rule set version, profile, every cue with its severity and its guideline citation, counts by cue, waivers with reasons, the two bank-level statistics with their bands, and the self-test result - as a JSON sidecar next to the CSV, plus a rendered HTML page. **1-2 h.** Pure defensibility payoff, and it makes PROVENANCE.md regenerable rather than hand-maintained. For the certification-agency goal, this is the artifact a reviewer actually asks for.

---

## Ranking rationale

Ranked by payoff per effort, where payoff is weighted by (a) whether the guideline has empirical support in the literature, (b) current coverage level, and (c) whether the fix is deterministic and therefore permanent.

| Rank | Item | Guideline(s) | Tier | Size | Current coverage |
|---|---|---|---|---|---|
| 1 | D1 negative stem/options | G12 (empirical), G19 | lint | 45-60 min | none |
| 2 | D2 stem length cap + distribution | G10, G9 | lint | 45-60 min | none for stems |
| 3 | D3 key overlap, numeric ranges, convergence | G17, G20d | lint | 60-90 min | partial |
| 4 | D4 leading-form + numeric order | G20f, G16 | lint | 60-80 min | partial / none |
| 5 | D5 cover-the-options + trick items | G11, G6, G10 | judgment | 60-75 min | none |
| 6 | L1 regex completions | G18, G20b | lint | 10-15 min | near-complete |
| 7 | L9 procedure record artifact | Std 4.7 | tooling | 1-2 h | partial |
| 8 | L3 readability per level | G9 | lint (report) | 1-2 h | none |
| 9 | L6 verify platform shuffle | G15 | evidence | 1-2 h + access | asserted only |
| 10 | L7 exhaustive/antonym sets | G20d | judgment + lint | 30 min / 1-2 h | none |
| 11 | L2 morphological clang | G20c | lint | 2-4 h | partial |
| 12 | L4 embedding near-dup v3 | G17, G20d | lint | 2-3 h | partial |
| 13 | L5 cross-item cluing | G3 | lint | 2-3 h | partial |
| 14 | **L8 item statistics join** | G13b, G20e, G21, Std 4.10 | **empirical** | 1+ day | **none** |

L8 ranks last on payoff-per-effort and first on importance. That is not a contradiction; it is the shape of the problem. See below.

---

## What cannot be mechanized, at any effort level

Stated plainly so that no future reader mistakes a gap in this backlog for an oversight.

- **G21, distractor plausibility.** Whether a distractor represents a real misconception a real student holds is a clinical judgment that becomes an empirical fact only after students answer it. `judge_options.py`'s `SELF_REFUTE` regex (`:40-45`) catches the mechanical floor - a distractor that states its own wrongness is commentary, not an option - and QC criterion 4 carries the judgment. Neither is a measurement.
- **G20e, blatantly absurd options.** Same reason. Absurdity is the extreme end of implausibility.
- **G13b, options plausible and discriminating.** "Discriminating" is literally a statistic. No rule can compute it from text.
- **G20d collective exhaustiveness**, **G11 cover-the-options**, and **G6 trick items** need semantic understanding of what the question asks, not of how it is spelled. D5 and L7 route them to the model-judgment tier, which is where they belong, and even there they produce UNCERTAIN verdicts for human adjudication rather than rejections.

---

## The standing caveat: construction quality never substitutes for item statistics

Everything above improves how items are *built*. None of it establishes how items *perform*, and the literature is explicit that the two are complementary rather than substitutable.

Haladyna opens the item-analysis chapter (HTD 2e p. 392) by listing the construction reviews - "content classification, cognitive demand, adherence to item-writing guidelines, fairness, linguistic complexity and correctness of the key" - and then: *"All these item development activities involve judgments of subject-matter experts (SMEs) and other specialists. Another important complementary step is item analysis."*

And on what construction review reliably fails to see:

- *"Distractor evaluation reveals that many distractors do not work as intended."* (HTD 2e p. 401)
- *"many distractors in four- and five-option items fail to attract responses from any examinees. Such distractors seem to be implausible even to those with low true scores."* (HTD 2e p. 402)
- A distractor chosen by under roughly 5% of examinees *"should be revised or dropped from the item."* (HTD 2e p. 402)
- A negative distractor discrimination on an otherwise well-patterned item *"signifies a key error"* (Table 20.3, type 6, HTD 2e p. 400) - an error the blind self-check and QC review can both miss, and which only response data surfaces.

MedEdPrep's position here is strong and under-used: roughly 1.55 million student responses and a live adaptive pool with its own response history already exist. **The platform's discrimination data is the final judge of every rule in this backlog.** A perfectly lint-clean item with a point-biserial of 0.04 is a bad item, and no amount of guideline conformance argues otherwise. Conversely - and this cuts the other way, which matters for how the data gets used - an item at p > 0.90 that SMEs judge to cover important content is legitimately retained despite its statistics, because *"psychometric item data does not trump the judgment of SMEs"* (HTD 2e p. 400).

Build D1 through D5 because they are cheap, permanent and empirically grounded. Build L8 because it is the only thing on this list that can tell you whether any of the rest of it worked.
