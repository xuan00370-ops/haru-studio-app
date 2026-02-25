#!/usr/bin/env python3
import csv
import re
import sys
from pathlib import Path


ERROR_PATTERNS = [
    (re.compile(r"Failed to resolve import|Cannot find module", re.I), "Missing or incorrect import path/module"),
    (re.compile(r"SyntaxError|Unexpected token", re.I), "Syntax issue or unsupported syntax for current toolchain"),
    (re.compile(r"ReferenceError", re.I), "Variable/function used before definition or wrong load order"),
    (re.compile(r"TypeError: .* is not a function", re.I), "Import shape/API mismatch or null/undefined callable"),
    (re.compile(r"Cannot read (properties|property) of (undefined|null)", re.I), "Missing data guard or async/race condition"),
    (re.compile(r"EADDRINUSE", re.I), "Port conflict (dev server already running)"),
    (re.compile(r"permission-denied|403", re.I), "Permission/auth configuration issue"),
]


def first_interesting_lines(text: str, limit: int = 5):
    lines = [ln.rstrip() for ln in text.splitlines()]
    hits = []
    for line in lines:
      if re.search(r"\b(error|failed|exception|traceback|syntaxerror|typeerror|referenceerror)\b", line, re.I):
            hits.append(line)
      if len(hits) >= limit:
            break
    if hits:
        return hits
    return [ln for ln in lines[:limit] if ln.strip()] or ["(empty log)"]


def infer_causes(text: str):
    causes = []
    for pattern, label in ERROR_PATTERNS:
        if pattern.search(text):
            causes.append(label)
    return causes


def main():
    if len(sys.argv) < 2:
        print("Usage: triage_logs.py <run-output-dir>", file=sys.stderr)
        sys.exit(1)

    run_dir = Path(sys.argv[1]).resolve()
    results_path = run_dir / "results.tsv"
    if not results_path.exists():
        print(f"Missing results file: {results_path}", file=sys.stderr)
        sys.exit(1)

    rows = []
    with results_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="\t")
        for row in reader:
            rows.append(row)

    total = len(rows)
    failed = [r for r in rows if r.get("status") != "PASS"]
    passed = [r for r in rows if r.get("status") == "PASS"]

    md = []
    md.append("# Triage Summary")
    md.append("")
    md.append(f"- Run directory: `{run_dir}`")
    md.append(f"- Checks run: {total}")
    md.append(f"- Passed: {len(passed)}")
    md.append(f"- Failed: {len(failed)}")
    md.append("")

    if failed:
        md.append("## Failures")
        md.append("")
        all_causes = []
        for row in failed:
            log_path = run_dir / row["log_file"]
            text = log_path.read_text(encoding="utf-8", errors="replace") if log_path.exists() else ""
            snippets = first_interesting_lines(text)
            causes = infer_causes(text)
            all_causes.extend(causes)
            md.append(f"### {row['name']}")
            md.append(f"- Command: `{row['command']}`")
            md.append(f"- Exit code: {row['exit_code']}")
            md.append(f"- Log: `{log_path}`")
            if causes:
                md.append(f"- Likely causes: {', '.join(dict.fromkeys(causes))}")
            md.append("- Error lines:")
            for line in snippets:
                md.append(f"  - `{line[:220]}`")
            md.append("")

        uniq_causes = list(dict.fromkeys(all_causes))
        if uniq_causes:
            md.append("## Root Cause Hints")
            md.append("")
            for cause in uniq_causes:
                md.append(f"- {cause}")
            md.append("")

        md.append("## Fix Order")
        md.append("")
        md.append("- Fix the first failing command in pipeline order (lint/test/typecheck/build).")
        md.append("- Re-run only the failed command to confirm root cause, then run the full check set.")
        md.append("- If errors are noisy, isolate the first stack frame in project code (ignore `node_modules` first).")
        md.append("")
    else:
        md.append("## Result")
        md.append("")
        md.append("- No failing commands detected in this run.")
        md.append("- If the bug is runtime-only, reproduce it manually and attach console/network logs.")
        md.append("")

    out_path = run_dir / "triage-summary.md"
    out_path.write_text("\n".join(md), encoding="utf-8")
    print(out_path)


if __name__ == "__main__":
    main()
