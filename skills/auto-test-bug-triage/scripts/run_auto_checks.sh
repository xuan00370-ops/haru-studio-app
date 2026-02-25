#!/usr/bin/env bash
set -u

# Run common project checks, continue on failure, and write logs for triage.

ROOT_DIR="${1:-.}"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT_DIR="${2:-$ROOT_DIR/.codex-artifacts/auto-test/$STAMP}"
LOG_DIR="$OUT_DIR/logs"
RESULTS_TSV="$OUT_DIR/results.tsv"
SUMMARY_TXT="$OUT_DIR/summary.txt"

mkdir -p "$LOG_DIR"

PM=""
if [ -f "$ROOT_DIR/pnpm-lock.yaml" ]; then
  PM="pnpm"
elif [ -f "$ROOT_DIR/yarn.lock" ]; then
  PM="yarn"
elif [ -f "$ROOT_DIR/bun.lockb" ] || [ -f "$ROOT_DIR/bun.lock" ]; then
  PM="bun"
elif [ -f "$ROOT_DIR/package.json" ]; then
  PM="npm"
fi

has_cmd() {
  command -v "$1" >/dev/null 2>&1
}

has_pkg_script() {
  local script_name="$1"
  [ -f "$ROOT_DIR/package.json" ] || return 1
  has_cmd node || return 1
  SCRIPT_NAME="$script_name" ROOT_DIR="$ROOT_DIR" node <<'NODE' >/dev/null 2>&1
const fs = require('fs');
const path = require('path');
const pkg = JSON.parse(fs.readFileSync(path.join(process.env.ROOT_DIR, 'package.json'), 'utf8'));
const scripts = pkg && pkg.scripts ? pkg.scripts : {};
process.exit(Object.prototype.hasOwnProperty.call(scripts, process.env.SCRIPT_NAME) ? 0 : 1);
NODE
}

run_and_capture() {
  local name="$1"
  shift
  local log_file="$LOG_DIR/$name.log"
  local cmd_str="$*"
  printf "==> %s\n" "$cmd_str" | tee -a "$SUMMARY_TXT" >/dev/null

  (
    cd "$ROOT_DIR" || exit 1
    CI=1 "$@"
  ) >"$log_file" 2>&1
  local code=$?

  local status="PASS"
  if [ $code -ne 0 ]; then
    status="FAIL"
  fi

  printf "%s\t%s\t%s\t%s\t%s\n" "$name" "$status" "$code" "logs/$name.log" "$cmd_str" >>"$RESULTS_TSV"
  printf "%s (%s) -> %s\n" "$name" "$status" "$log_file" | tee -a "$SUMMARY_TXT" >/dev/null
}

printf "name\tstatus\texit_code\tlog_file\tcommand\n" >"$RESULTS_TSV"
printf "auto-test-bug-triage run\nroot=%s\nout=%s\n\n" "$ROOT_DIR" "$OUT_DIR" >"$SUMMARY_TXT"

if [ -f "$ROOT_DIR/package.json" ] && has_cmd node; then
  {
    echo "package.json scripts:"
    ROOT_DIR="$ROOT_DIR" node <<'NODE'
const fs = require('fs');
const path = require('path');
const pkg = JSON.parse(fs.readFileSync(path.join(process.env.ROOT_DIR, 'package.json'), 'utf8'));
for (const [k, v] of Object.entries(pkg.scripts || {})) {
  console.log(`- ${k}: ${v}`);
}
NODE
    echo
  } >>"$SUMMARY_TXT"
fi

ran_any=0
if [ -n "$PM" ]; then
  case "$PM" in
    npm)
      if has_pkg_script lint; then run_and_capture "01-lint" npm run lint; ran_any=1; fi
      if has_pkg_script test; then run_and_capture "02-test" npm test; ran_any=1; fi
      if has_pkg_script test:unit; then run_and_capture "03-test-unit" npm run test:unit; ran_any=1; fi
      if has_pkg_script typecheck; then run_and_capture "04-typecheck" npm run typecheck; ran_any=1; fi
      if has_pkg_script build; then run_and_capture "05-build" npm run build; ran_any=1; fi
      ;;
    pnpm)
      if has_pkg_script lint; then run_and_capture "01-lint" pnpm lint; ran_any=1; fi
      if has_pkg_script test; then run_and_capture "02-test" pnpm test; ran_any=1; fi
      if has_pkg_script test:unit; then run_and_capture "03-test-unit" pnpm test:unit; ran_any=1; fi
      if has_pkg_script typecheck; then run_and_capture "04-typecheck" pnpm typecheck; ran_any=1; fi
      if has_pkg_script build; then run_and_capture "05-build" pnpm build; ran_any=1; fi
      ;;
    yarn)
      if has_pkg_script lint; then run_and_capture "01-lint" yarn lint; ran_any=1; fi
      if has_pkg_script test; then run_and_capture "02-test" yarn test; ran_any=1; fi
      if has_pkg_script test:unit; then run_and_capture "03-test-unit" yarn test:unit; ran_any=1; fi
      if has_pkg_script typecheck; then run_and_capture "04-typecheck" yarn typecheck; ran_any=1; fi
      if has_pkg_script build; then run_and_capture "05-build" yarn build; ran_any=1; fi
      ;;
    bun)
      if has_pkg_script lint; then run_and_capture "01-lint" bun run lint; ran_any=1; fi
      if has_pkg_script test; then run_and_capture "02-test" bun test; ran_any=1; fi
      if has_pkg_script test:unit; then run_and_capture "03-test-unit" bun run test:unit; ran_any=1; fi
      if has_pkg_script typecheck; then run_and_capture "04-typecheck" bun run typecheck; ran_any=1; fi
      if has_pkg_script build; then run_and_capture "05-build" bun run build; ran_any=1; fi
      ;;
  esac
fi

if [ "$ran_any" -eq 0 ]; then
  if [ -f "$ROOT_DIR/package.json" ] && [ "$PM" = "npm" ]; then
    run_and_capture "01-npm-run" npm run
  elif [ -f "$ROOT_DIR/package.json" ]; then
    case "$PM" in
      pnpm) run_and_capture "01-pnpm-run" pnpm run ;;
      yarn) run_and_capture "01-yarn-run" yarn run ;;
      bun) run_and_capture "01-bun-run" bun run ;;
    esac
  else
    printf "No package manager project detected. Add project-specific checks manually.\n" >>"$SUMMARY_TXT"
  fi
fi

echo "$OUT_DIR"
