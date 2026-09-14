#!/usr/bin/env bash
# start-all.sh — Start all grinder processes: monitoring, briefing cron, bug watcher
#
# This is the master startup script for the openclaw machine.
# Run once after reboot or deployment. Idempotent — safe to re-run.
#
# Usage:
#   ./start-all.sh
#   ./start-all.sh --skip-cron   # Start processes but don't install cron jobs

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRINDER_DIR="${GRINDER_DIR:-$SCRIPT_DIR}"
GRINDER_LOG_DIR="${GRINDER_LOG_DIR:-$GRINDER_DIR/logs}"
COMPETITOR_DIR="${GRINDER_DIR}/../competitor-monitoring"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
LOG_FILE="${GRINDER_LOG_DIR}/start-all-${TIMESTAMP}.log"

SKIP_CRON=false
if [[ "${1:-}" == "--skip-cron" ]]; then
    SKIP_CRON=true
fi

mkdir -p "$GRINDER_LOG_DIR"

log() {
    local msg="[$(date +%Y%m%d-%H%M%S)] $*"
    echo "$msg" | tee -a "$LOG_FILE"
}

# ── Preflight ───────────────────────────────────────────────────────
log "=== Grinder start-all ==="
log "Script dir: $SCRIPT_DIR"
log "Log dir:    $GRINDER_LOG_DIR"

MISSING_DEPS=()
for dep in tmux curl jq claude; do
    if ! command -v "$dep" &>/dev/null; then
        MISSING_DEPS+=("$dep")
    fi
done

if [[ ${#MISSING_DEPS[@]} -gt 0 ]]; then
    log "ERROR: Missing dependencies: ${MISSING_DEPS[*]}"
    log "Run ./install.sh first."
    exit 1
fi

# Check for required env vars (warn, don't fail — some tasks don't need all vars)
WARN_VARS=()
for var in SENDGRID_API_KEY PORTAL_AUTH_TOKEN; do
    if [[ -z "${!var:-}" ]]; then
        WARN_VARS+=("$var")
    fi
done

if [[ ${#WARN_VARS[@]} -gt 0 ]]; then
    log "WARNING: Unset environment variables: ${WARN_VARS[*]}"
    log "  Briefing emails and analytics collection may fail."
    log "  Set them in ~/.bashrc or a .env file."
fi

# ── Kill any existing grinder sessions ──────────────────────────────
log "Cleaning up existing grinder sessions..."
for session in $(tmux list-sessions -F '#{session_name}' 2>/dev/null | grep '^grinder-' || true); do
    log "  Killing existing session: $session"
    tmux kill-session -t "$session" 2>/dev/null || true
done

# Kill orphaned watchdog processes
for pidfile in "$GRINDER_LOG_DIR"/*.watchdog.pid; do
    if [[ -f "$pidfile" ]]; then
        pid=$(cat "$pidfile")
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid" 2>/dev/null || true
            log "  Killed watchdog PID $pid"
        fi
        rm -f "$pidfile"
    fi
done

# ── Install cron jobs ───────────────────────────────────────────────
if [[ "$SKIP_CRON" == false ]]; then
    log "Installing cron jobs..."

    # Build cron entries
    CRON_MARKER="# === MEDEDPREP GRINDER ==="
    CRON_ENTRIES="${CRON_MARKER}
# Competitor monitoring — 5:30 AM ET daily
30 5 * * * cd ${COMPETITOR_DIR} && ${COMPETITOR_DIR}/collect-signals.sh >> ${GRINDER_LOG_DIR}/competitor-\$(date +\\%Y\\%m\\%d).log 2>&1
# Morning rounds — 6:00 AM ET daily
0 6 * * * cd ${SCRIPT_DIR} && ${SCRIPT_DIR}/morning-rounds.sh >> ${GRINDER_LOG_DIR}/morning-rounds-\$(date +\\%Y\\%m\\%d).log 2>&1
${CRON_MARKER} END"

    # Remove old entries, add new ones
    EXISTING_CRON=$(crontab -l 2>/dev/null || true)
    CLEANED_CRON=$(echo "$EXISTING_CRON" | sed "/${CRON_MARKER}/,/${CRON_MARKER} END/d")
    echo "${CLEANED_CRON}
${CRON_ENTRIES}" | crontab -

    log "  Cron jobs installed."
    log "  5:30 AM — competitor signal collection"
    log "  6:00 AM — morning rounds + briefing emails"
else
    log "Skipping cron installation (--skip-cron flag)."
fi

# ── Start persistent grinder session ────────────────────────────────
log "Starting persistent grinder session..."
"$SCRIPT_DIR/start-grinder.sh" main \
    "You are the MedEdPrep grinder — an autonomous overnight work system. Wait for tasks. Available tasks: morning-rounds, bug-investigation, competitor-monitoring, analytics-collection. Respond with READY when initialized." \
    2>&1 | tee -a "$LOG_FILE"

# ── Summary ─────────────────────────────────────────────────────────
log ""
log "=== Grinder startup complete ==="
log "  Active sessions:"
tmux list-sessions -F '  #{session_name} (#{session_windows} windows, created #{session_created_string})' 2>/dev/null | grep grinder | tee -a "$LOG_FILE"
log ""
log "  Next scheduled runs:"
log "    5:30 AM — Competitor signal collection"
log "    6:00 AM — Morning rounds & briefing emails"
log ""
log "  Commands:"
log "    Check status:  ./check-grinder.sh"
log "    Review output: ./review-grinder.sh"
log "    Stop all:      ./kill-grinder.sh"
