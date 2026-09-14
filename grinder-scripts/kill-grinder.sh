#!/usr/bin/env bash
# kill-grinder.sh — Safely stop all grinder processes and tmux sessions
#
# Usage:
#   ./kill-grinder.sh          # Kill all grinder sessions
#   ./kill-grinder.sh morning  # Kill only the morning-rounds session
#   ./kill-grinder.sh --keep-cron  # Kill sessions but leave cron jobs intact

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRINDER_DIR="${GRINDER_DIR:-$SCRIPT_DIR}"
GRINDER_LOG_DIR="${GRINDER_LOG_DIR:-$GRINDER_DIR/logs}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

TARGET="${1:-all}"
KEEP_CRON=false

for arg in "$@"; do
    if [[ "$arg" == "--keep-cron" ]]; then
        KEEP_CRON=true
    fi
done

echo -e "${YELLOW}Stopping grinder processes...${NC}"
echo ""

# ── Kill tmux sessions ──────────────────────────────────────────────
killed=0
if [[ "$TARGET" == "all" ]]; then
    for session in $(tmux list-sessions -F '#{session_name}' 2>/dev/null | grep '^grinder-' || true); do
        echo -e "  Killing tmux session: ${RED}$session${NC}"
        tmux kill-session -t "$session" 2>/dev/null || true
        ((killed++))
    done
else
    session="grinder-${TARGET}"
    if tmux has-session -t "$session" 2>/dev/null; then
        echo -e "  Killing tmux session: ${RED}$session${NC}"
        tmux kill-session -t "$session" 2>/dev/null || true
        ((killed++))
    else
        echo -e "  Session '$session' not found."
    fi
fi

if [[ $killed -eq 0 ]]; then
    echo -e "  ${YELLOW}No grinder tmux sessions were running.${NC}"
else
    echo -e "  ${GREEN}Killed $killed session(s).${NC}"
fi
echo ""

# ── Kill watchdog processes ─────────────────────────────────────────
echo "Cleaning up watchdog processes..."
watchdog_killed=0
for pidfile in "$GRINDER_LOG_DIR"/*.watchdog.pid 2>/dev/null; do
    if [[ -f "$pidfile" ]]; then
        pid=$(cat "$pidfile")
        session_name=$(basename "$pidfile" .watchdog.pid)

        # If targeting specific session, skip others
        if [[ "$TARGET" != "all" && "$session_name" != "grinder-${TARGET}" ]]; then
            continue
        fi

        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid" 2>/dev/null || true
            echo -e "  Killed watchdog PID $pid ($session_name)"
            ((watchdog_killed++))
        fi
        rm -f "$pidfile"
    fi
done

if [[ $watchdog_killed -eq 0 ]]; then
    echo -e "  ${YELLOW}No watchdog processes to clean up.${NC}"
else
    echo -e "  ${GREEN}Killed $watchdog_killed watchdog(s).${NC}"
fi
echo ""

# ── Remove cron jobs ────────────────────────────────────────────────
if [[ "$KEEP_CRON" == false && "$TARGET" == "all" ]]; then
    echo "Removing grinder cron jobs..."
    CRON_MARKER="# === MEDEDPREP GRINDER ==="
    if crontab -l 2>/dev/null | grep -q "$CRON_MARKER"; then
        EXISTING_CRON=$(crontab -l 2>/dev/null || true)
        CLEANED_CRON=$(echo "$EXISTING_CRON" | sed "/${CRON_MARKER}/,/${CRON_MARKER} END/d")
        echo "$CLEANED_CRON" | crontab -
        echo -e "  ${GREEN}Cron jobs removed.${NC}"
    else
        echo -e "  ${YELLOW}No grinder cron jobs found.${NC}"
    fi
else
    echo -e "  ${YELLOW}Cron jobs left intact (--keep-cron or targeted kill).${NC}"
fi
echo ""

# ── Final status ────────────────────────────────────────────────────
remaining=$(tmux list-sessions -F '#{session_name}' 2>/dev/null | grep -c '^grinder-' || echo "0")
if [[ "$remaining" -gt 0 ]]; then
    echo -e "${YELLOW}WARNING: $remaining grinder session(s) still running.${NC}"
else
    echo -e "${GREEN}All grinder processes stopped.${NC}"
fi
