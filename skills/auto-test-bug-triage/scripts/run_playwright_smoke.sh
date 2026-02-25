#!/usr/bin/env bash
set -u

# Start local app server (preview/dev) and run Playwright smoke screenshot capture.

ROOT_DIR="${1:-.}"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT_DIR="${2:-$ROOT_DIR/.codex-artifacts/ui-smoke/$STAMP}"
LOG_DIR="$OUT_DIR/logs"
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
process.exit(pkg?.scripts && Object.prototype.hasOwnProperty.call(pkg.scripts, process.env.SCRIPT_NAME) ? 0 : 1);
NODE
}

PORT="${PORT:-4173}"
HOST="${HOST:-127.0.0.1}"
URL="${URL:-http://$HOST:$PORT}"

SERVER_PID=""
SERVER_MODE="none"

cleanup() {
  if [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT INT TERM

run_bg() {
  local log_file="$1"
  shift
  (
    cd "$ROOT_DIR" || exit 1
    CI=1 "$@"
  ) >"$log_file" 2>&1 &
  SERVER_PID=$!
}

wait_http() {
  local tries="${1:-60}"
  local i
  for i in $(seq 1 "$tries"); do
    if curl -sf "$URL" >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done
  return 1
}

if [ -z "$PM" ]; then
  echo "No package manager project detected in $ROOT_DIR" >&2
  exit 1
fi

# Prefer preview after build when available.
if has_pkg_script build; then
  case "$PM" in
    npm) (cd "$ROOT_DIR" && CI=1 npm run build) >"$LOG_DIR/build.log" 2>&1 || true ;;
    pnpm) (cd "$ROOT_DIR" && CI=1 pnpm build) >"$LOG_DIR/build.log" 2>&1 || true ;;
    yarn) (cd "$ROOT_DIR" && CI=1 yarn build) >"$LOG_DIR/build.log" 2>&1 || true ;;
    bun) (cd "$ROOT_DIR" && CI=1 bun run build) >"$LOG_DIR/build.log" 2>&1 || true ;;
  esac
fi

if has_pkg_script preview; then
  SERVER_MODE="preview"
  case "$PM" in
    npm) run_bg "$LOG_DIR/server.log" npm run preview -- --host "$HOST" --port "$PORT" ;;
    pnpm) run_bg "$LOG_DIR/server.log" pnpm preview --host "$HOST" --port "$PORT" ;;
    yarn) run_bg "$LOG_DIR/server.log" yarn preview --host "$HOST" --port "$PORT" ;;
    bun) run_bg "$LOG_DIR/server.log" bun run preview --host "$HOST" --port "$PORT" ;;
  esac
elif has_pkg_script dev; then
  SERVER_MODE="dev"
  case "$PM" in
    npm) run_bg "$LOG_DIR/server.log" npm run dev -- --host "$HOST" --port "$PORT" ;;
    pnpm) run_bg "$LOG_DIR/server.log" pnpm dev --host "$HOST" --port "$PORT" ;;
    yarn) run_bg "$LOG_DIR/server.log" yarn dev --host "$HOST" --port "$PORT" ;;
    bun) run_bg "$LOG_DIR/server.log" bun run dev --host "$HOST" --port "$PORT" ;;
  esac
else
  echo "No preview/dev script found in package.json" >&2
  exit 1
fi

if ! wait_http 75; then
  echo "Server did not become ready at $URL" >&2
  echo "See $LOG_DIR/server.log" >&2
  exit 1
fi

SMOKE_LOG="$LOG_DIR/playwright-smoke.log"
(
  cd "$ROOT_DIR" || exit 1
  node skills/auto-test-bug-triage/scripts/playwright_smoke_capture.mjs "$URL" "$OUT_DIR"
) >"$SMOKE_LOG" 2>&1
SMOKE_CODE=$?

{
  echo "ui-smoke run"
  echo "root=$ROOT_DIR"
  echo "mode=$SERVER_MODE"
  echo "url=$URL"
  echo "out=$OUT_DIR"
  echo "server_log=$LOG_DIR/server.log"
  echo "smoke_log=$SMOKE_LOG"
  echo "exit_code=$SMOKE_CODE"
} >"$OUT_DIR/summary.txt"

echo "$OUT_DIR"
exit "$SMOKE_CODE"
