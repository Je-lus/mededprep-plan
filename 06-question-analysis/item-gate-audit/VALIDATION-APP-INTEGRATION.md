# Validation App Integration Brief - Item-Gate Stack, Provenance, and the Psychometrics RAG

How the 2026-09-11 item-gate audit artifacts and the new psychometrics RAG service plug into the MedEdPrep Validation App (`~/projects/mededprep-ecosystem/validation/`). Five integrations, ranked; the first three are incremental and buildable now, the last two are data- or writing-gated.

## What exists on each side

**Validation app** (read its CLAUDE.md before touching anything - it mandates this): invite-only async expert panel; gate engine produces item-level content-validity evidence via CVR, weighted I-CVI, Aiken's V, Gwet's AC1/AC2 (Krippendorff α diagnostic only). Hard claim boundary: the app establishes *item-level content validity* only - never exam-form/score/cut-score defensibility - and `guard:claim-boundary` enforces the language across the codebase. Leak-sensitive: item text is trade secret. 8-guard suite; 1,241 tests as of the 2026-06-10 milestone. NOTE: the local copy has no `.git` (history is machine-local on the other box; do NOT `git init` here) and `tools/map/*.json` is a frozen July snapshot that cannot be regenerated locally (see the 2026-08-05 warning in its CLAUDE.md).

**Item-gate stack** (`~/projects/ems-books-rag/scripts/qa/`, `scripts/qgen/`): deterministic lint (`audit_cues.py`, FLAG/ADVISORY tiers, profiles, waivers, poison self-tests) + independent-model QC reviewer + per-type validators. Audited 2026-09-11 against Haladyna/Rodriguez 2013 (22 guidelines): 8 enforced / 13 partial / 5 unenforced; headline gap = G12 negative stems. D1–D5 fixes in flight on branch `item-gate-d1-d5` (worktree; unmerged as of this writing). Companion docs in this folder: COVERAGE-MAP.md, PROVENANCE.md, BACKLOG.md.

**Psychometrics RAG** (`~/projects/psychometrics`): 5-reference corpus (2014 Standards, Educational Measurement 5e, HTD 2e, Testing in the Professions, Raymond 2005), 3,215 chunks, all 249 Standards captured with per-standard lookup. Service: systemd user unit `psychometrics-rag`, 127.0.0.1:8421. Key endpoints: `GET /v2/standard/{id}` (exact standard text + comment), `POST /v2/search`. 43 NCME ITEMS modules being added as increment 2.

## Integration 1 - Lint as the intake gate (highest value)

An item enters the expert-review queue only lint-clean or explicitly waived. Rationale: reviewer attention is the app's scarcest resource; mechanical construction flaws (AOTA/NOTA, cueing, length skew, negative stems once D1 merges) should never consume a panel review. Evidence framing: a documented two-stage process - construction screen, then SME content panel - matches Haladyna's "complementary activities" (HTD 2e p. 392) and reads stronger to an accreditor than panel-only.

Design sketch: run `scripts/qa/audit_cues.py` rules at ingestion (import the rule primitives, or call the lint as a subprocess against the incoming item batch); FLAG blocks queue entry pending fix/waiver, ADVISORY annotates the reviewer view. Waivers remain owner decisions, recorded, and shown to reviewers.

Claim-boundary caution: construction screening is **not** content-validity evidence. Label the stage "construction screen" / "item-writing-guideline screen," never "validation." The two evidence types must stay distinguishable in every export.

## Integration 2 - PROVENANCE.md citations into the rubric

The app promises review "under a defined rubric + decision rule." PROVENANCE.md maps every lint rule and QC criterion to its guideline number and HTD 2e page, plus a Standards 4.0–4.13 compliance table. Fold those citations into: (a) the rubric definition itself, (b) reviewer-facing "why we ask this" microcopy, (c) the evidence exports (each documented procedure cites its authority). Upgrades "our rubric" to "a rubric traceable to the published guidelines and the 2014 Standards."

## Integration 3 - RAG standard-lookup as a citation service

Anywhere the app's documentation or evidence output cites a standard, pull the authoritative clause text from `GET http://127.0.0.1:8421/v2/standard/{id}` instead of hand-maintained snippets. Leak-safety: requests carry only a standard ID - no item text ever leaves the app boundary. Degrade gracefully if the unit is down (cache clause text at build/generation time; the RAG is a local convenience, not a runtime dependency).

## Integration 4 - Panel-vs-empirics calibration (LATER; gated on outcomes-drive data)

The app records SME verdicts; the platform will hold NR-outcome discrimination per item. Cross-tabulate "panel approved" vs. "item discriminated empirically" to validate the panel itself - reviewer calibration feeding the app's existing staged-review/trust design. This is the study the psychometrician will want regardless. Do not start until the pass/fail data layer exists.

## Integration 5 - ITEMS Modules 24/44 as QC-procedure sources (LATER; writing task)

NCME Modules 24 and 44 (Quality Control in Testing I & II) are the citable literature for the workflow the app implements; use them when writing the app's documented QC procedures. Both are in the ITEMS archive being indexed as RAG increment 2.

## Standing constraints for any agent working these

1. Read the validation app's CLAUDE.md first, in full - it is the operating contract for that repo.
2. `npm run guard:all` (8 guards) must stay green; new user-facing language must pass `guard:claim-boundary`.
3. No `git init`, no map regeneration, no GitHub setup in the local validation copy - history and publishing decisions live with the owner on the other machine.
4. Item text never leaves the app boundary (no item content in RAG queries, logs, or external calls).
