#!/usr/bin/env bash
# check-grinder.sh — Health check for the grinder system
#
# Shows: tmux session status, recent log activity, cron job status,
#        disk usage, last briefing sent, last competitor scan.
#
# Usage:
#   ./check-grinder.sh          # Full health check
#   ./check-grinder.sh --brief  # One-line status

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRINDER_DIR="${GRINDER_DIR:-$SCRIPT_DIR}"
GRINDER_LOG_DIR="${GRINDER_LOG_DIR:-$GRINDER_DIR/logs}"
COMPETITOR_DIR="${GRINDER_DIR}/../competitor-monitoring"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

brief_mode=false
if [[ "${1:-}" == "--brief" ]]; then
    brief_mode=true
fi

# ── Brief mode ──────────────────────────────────────────────────────
if $brief_mode; then
    sessions=$(tmux list-sessions -F '#{session_name}' 2>/dev/null | grep -c '^grinder-' || echo "0")
    if [[ "$sessions" -gt 0 ]]; then
        echo "GRINDER: ${sessions} session(s) active"
    else
        echo "GRINDER: NOT RUNNING"
    fi
    exit 0
fi

# ── Full health check ──────────────────────────────────────────────
echo -e "${CYAN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║        MedEdPrep Grinder Health Check        ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════╝${NC}"
echo ""

# ── tmux Sessions ───────────────────────────────────────────────────
echo -e "${CYAN}── tmux Sessions ──${NC}"
if tmux list-sessions 2>/dev/null | grep -q 'grinder-'; then
    tmux list-sessions -F "  #{session_name}  #{?session_attached,${GREEN}ATTACHED${NC},${YELLOW}DETACHED${NC}}  (#{session_windows} win, created #{session_created_string})" 2>/dev/null | grep grinder-
    echo ""
else
    echo -e "  ${RED}No grinder sessions running.${NC}"
    echo ""
fi

# ── Watchdog Processes ──────────────────────────────────────────────
echo -e "${CYAN}── Watchdog Processes ──${NC}"
watchdog_count=0
for pidfile in "$GRINDER_LOG_DIR"/*.watchdog.pid 2>/dev/null; do
    if [[ -f "$pidfile" ]]; then
        pid=$(cat "$pidfile")
        session=$(basename "$pidfile" .watchdog.pid)
        if kill -0 "$pid" 2>/dev/null; then
            echo -e "  ${GREEN}ALIVE${NC}  PID $pid  ($session)"
            ((watchdog_count++))
        else
            echo -e "  ${RED}DEAD${NC}   PID $pid  ($session) — stale pidfile"
        fi
    fi
done
if [[ $watchdog_count -eq 0 ]]; then
    echo -e "  ${YELLOW}No active watchdog processes.${NC}"
fi
echo ""

# ── Cron Jobs ───────────────────────────────────────────────────────
echo -e "${CYAN}── Cron Jobs ──${NC}"
if crontab -l 2>/dev/null | grep -q "MEDEDPREP GRINDER"; then
    crontab -l 2>/dev/null | grep -A1 "MEDEDPREP GRINDER" | grep -v "^#" | grep -v "^$" | while read -r line; do
        echo "  $line"
    done
    echo ""
else
    echo -e "  ${RED}No grinder cron jobs installed.${NC}"
    echo "  Run ./install.sh or ./start-all.sh to install."
    echo ""
fi

# ── Recent Logs ─────────────────────────────────────────────────────
echo -e "${CYAN}── Recent Logs (last 24h) ──${NC}"
if [[ -d "$GRINDER_LOG_DIR" ]]; then
    recent_logs=$(find "$GRINDER_LOG_DIR" -name "*.log" -mtime -1 -type f 2>/dev/null | sort -r | head -10)
    if [[ -n "$recent_logs" ]]; then
        while IFS= read -r logfile; do
            size=$(du -h "$logfile" 2>/dev/null | cut -f1)
            modified=$(date -r "$logfile" "+%Y-%m-%d %H:%M" 2>/dev/null)
            basename_log=$(basename "$logfile")
            echo "  $modified  $size  $basename_log"
        done <<< "$recent_logs"
    else
        echo -e "  ${YELLOW}No logs in the last 24 hours.${NC}"
    fi
else
    echo -e "  ${RED}Log directory does not exist: $GRINDER_LOG_DIR${NC}"
fi
echo ""

# ── Last Briefing ───────────────────────────────────────────────────
echo -e "${CYAN}── Last Morning Briefing ──${NC}"
last_briefing=$(find "$GRINDER_LOG_DIR" -name "morning-rounds-*.log" -type f 2>/dev/null | sort -r | head -1)
if [[ -n "$last_briefing" ]]; then
    modified=$(date -r "$last_briefing" "+%Y-%m-%d %H:%M" 2>/dev/null)
    echo "  Last run: $modified"
    # Check for success/failure markers in the log
    if grep -q "SUCCESS.*briefing.*sent" "$last_briefing" 2>/dev/null; then
        echo -e "  Status: ${GREEN}Briefings sent successfully${NC}"
    elif grep -q "ERROR" "$last_briefing" 2>/dev/null; then
        echo -e "  Status: ${RED}Errors detected${NC}"
        grep "ERROR" "$last_briefing" 2>/dev/null | tail -3 | while read -r line; do
            echo "    $line"
        done
    else
        echo -e "  Status: ${YELLOW}Unknown (check log)${NC}"
    fi
else
    echo -e "  ${YELLOW}No morning briefing logs found.${NC}"
fi
echo ""

# ── Last Competitor Scan ────────────────────────────────────────────
echo -e "${CYAN}── Last Competitor Scan ──${NC}"
signals_file="${COMPETITOR_DIR}/competitor-signals.json"
if [[ -f "$signals_file" ]]; then
    modified=$(date -r "$signals_file" "+%Y-%m-%d %H:%M" 2>/dev/null)
    changes=$(jq '.changes | length' "$signals_file" 2>/dev/null || echo "?")
    echo "  Last scan: $modified"
    echo "  Changes detected: $changes"
else
    echo -e "  ${YELLOW}No competitor-signals.json found.${NC}"
fi
echo ""

# ── Disk Usage ──────────────────────────────────────────────────────
echo -e "${CYAN}── Disk Usage ──${NC}"
if [[ -d "$GRINDER_LOG_DIR" ]]; then
    log_size=$(du -sh "$GRINDER_LOG_DIR" 2>/dev/null | cut -f1)
    log_count=$(find "$GRINDER_LOG_DIR" -name "*.log" -type f 2>/dev/null | wc -l)
    echo "  Logs: $log_size ($log_count files)"
fi
if [[ -d "${COMPETITOR_DIR}/snapshots" ]]; then
    snap_size=$(du -sh "${COMPETITOR_DIR}/snapshots" 2>/dev/null | cut -f1)
    snap_count=$(find "${COMPETITOR_DIR}/snapshots" -type f 2>/dev/null | wc -l)
    echo "  Snapshots: $snap_size ($snap_count files)"
fi
echo ""

# ── Environment ─────────────────────────────────────────────────────
echo -e "${CYAN}── Environment ──${NC}"
for var in SENDGRID_API_KEY PORTAL_AUTH_TOKEN CE_AUTH_TOKEN CLINICALS_AUTH_TOKEN COASSIST_AUTH_TOKEN PULSE_AUTH_TOKEN DEMO_AUTH_TOKEN; do
    if [[ -n "${!var:-}" ]]; then
        # Show first 4 and last 4 chars only
        val="${!var}"
        if [[ ${#val} -gt 12 ]]; then
            echo -e "  ${GREEN}SET${NC}    $var  (${val:0:4}...${val: -4})"
        else
            echo -e "  ${GREEN}SET${NC}    $var"
        fi
    else
        echo -e "  ${RED}UNSET${NC}  $var"
    fi
done
echo ""
