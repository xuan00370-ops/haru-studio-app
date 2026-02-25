---
name: auto-test-bug-triage
description: Automatically test local apps, run available checks (lint/test/typecheck/build), capture logs, summarize failures, and drive bug fixing. Use when a user asks to test an app automatically, find/report errors, reproduce failing checks, triage build/test failures, or generate a fix-focused bug report before implementing fixes.
---

# Auto Test Bug Triage

Use this skill to run project checks quickly, collect logs in a stable location, and produce a repair-oriented bug report before editing code.

## Quick Start

1. Run the bundled check runner:

```bash
bash skills/auto-test-bug-triage/scripts/run_auto_checks.sh .
```

2. Run the triage summarizer on the printed output directory:

```bash
python3 skills/auto-test-bug-triage/scripts/triage_logs.py .codex-artifacts/auto-test/<timestamp>
```

3. (Optional UI smoke) Run Playwright smoke test + screenshot:

```bash
bash skills/auto-test-bug-triage/scripts/run_playwright_smoke.sh .
```

4. Read `triage-summary.md` and/or `playwright-smoke-summary.md`, open the referenced logs/screenshots, fix highest-impact failures first, then re-run checks.

## Workflow

1. Identify project type and available scripts from `package.json`.
2. Run checks in this order when available: `lint` -> `test` -> `test:unit` -> `typecheck` -> `build`.
3. Continue after failures to capture the full failure surface.
4. For UI/runtime bugs, run a Playwright smoke test and capture screenshot + console/page errors.
5. Summarize failures with command, exit code, first relevant error lines, and likely root causes.
6. Fix the earliest failing command first (upstream failures often cause downstream noise).
7. Re-run only the failed check or smoke test to validate the fix, then run the full check set again.

## Bundled Scripts

- `scripts/run_auto_checks.sh`
  - Detect `npm`, `pnpm`, `yarn`, or `bun`.
  - Run common scripts if present.
  - Write logs and `results.tsv` to `.codex-artifacts/auto-test/<timestamp>/`.
  - Keep running even when one command fails.

- `scripts/triage_logs.py`
  - Read `results.tsv` and log files.
  - Extract error snippets.
  - Infer common root-cause categories.
  - Write `triage-summary.md`.

- `scripts/run_playwright_smoke.sh`
  - Start a local server (`preview` or `dev`) if needed.
  - Wait for the app URL to be reachable.
  - Run Playwright smoke test and screenshot capture.
  - Store artifacts under `.codex-artifacts/ui-smoke/<timestamp>/`.

- `scripts/playwright_smoke_capture.mjs`
  - Open the app in a headless browser.
  - Capture screenshot.
  - Record console errors/warnings, page errors, and failed requests.
  - Write `playwright-smoke-summary.md` and `playwright-smoke.json`.

## Triage Rules

- Prefer the first meaningful project-code error over long tool stack traces.
- Ignore downstream build errors until syntax/import/type errors are fixed.
- Treat environment/auth/API permission failures as configuration bugs unless the user confirms credentials are intentionally missing.
- If no automated checks fail but the bug is UI/runtime behavior, reproduce manually and capture browser console/network logs.
- Prefer `preview` for smoke tests after a successful build; use `dev` only when preview is unavailable.

## Reporting Format

When responding to the user after running this skill, include:

1. What commands ran and which failed.
2. The first actionable error per failed command.
3. Probable root cause (inference, not certainty).
4. Fix plan ordered by impact.
5. What was re-tested after the fix.

## Optional Reference

Read `references/common-error-patterns.md` only when logs are noisy and you need quick cause mapping.
