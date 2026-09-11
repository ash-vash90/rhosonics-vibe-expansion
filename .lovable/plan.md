# Audit the last two Codex merges

## Goal
Produce an evidence-based change ledger for the two latest merge commits, separating improvements from regressions and ambiguous editorial choices.

## Confirmed scope

### Merge `39ba3e8` — “Update plan”
Compare against first parent `90936e9`.

- Review the exact three-file change: `package.json`, `bun.lock`, and generated backend types.
- Verify whether pinning the Lovable TanStack configuration from `^2.13.0` to `2.13.1` improves deployment stability or creates version risk.
- Confirm the backend type update is generator-only and does not alter application behavior.
- Check this merge against the previously fixed TanStack package alignment and SSR production compatibility.

### Merge `90936e9` — brand-guidelines consistency
Compare against first parent `dde776f`.

- Review all 52 changed files, grouped by outcome rather than file order:
  - shared colour-token source and generated CSS
  - accessibility and contrast changes
  - logo, font, and downloadable asset exports
  - homepage and shared layout changes
  - Color, Imagery, Proof, Resources, Typography, Voice, Applications, and Tools content changes
  - added consistency tests and release metadata
- Identify where the merge genuinely standardized duplicated values or corrected accessibility.
- Identify where it removed useful guidance, examples, visual depth, motion, or established page content.
- Flag changes that conflict with the approved brand rules, including restrained green usage, no decorative effects, typography roles, 4px geometry, evidence requirements, and reduced-motion support.
- Distinguish objective regressions from subjective simplifications that need a product decision.

## Validation

- Use commit diffs and current source references for every verdict.
- Check current build/runtime diagnostics and the existing SSR, hydration, route-health, and brand-consistency safeguards.
- Verify representative pages in the running preview at desktop and mobile sizes, focusing on the heavily rewritten Color, Imagery, Proof, Resources, and home pages.
- Confirm that redirects, crawler-visible HTML, health endpoints, and client navigation were not damaged by either merge.

## Deliverable

Provide a concise report containing:

1. An executive verdict for each merge: better, worse, mixed, or neutral.
2. A table of every meaningful change group with commit, affected files, classification, evidence, and user-visible impact.
3. A separate list of confirmed regressions versus intentional-but-debatable changes.
4. A keep / revert / revise recommendation for each change group.
5. A prioritized cleanup list, without changing the site until the audit is reviewed.
