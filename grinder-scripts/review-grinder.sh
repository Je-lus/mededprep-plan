#!/usr/bin/env bash
# review-grinder.sh — Review grinder output from recent runs
#
# Shows logs, results, errors from the most recent grinder sessions.
#
# Usage:
#   ./review-grinder.sh              # Review last run of each type
#   ./review-grinder.sh morning      # Review last morning rounds
#   ./review-grinder.sh competitor   # Review last competitor scan
#   ./review-grinder.sh errors       # Show only errors from all logs
#   ./review-grinder.sh all          # Show all logs from last 24h
#   ./review-grinder.sh --lines 50   # Show last N lines (default: 30)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRINDER_DIR="${GRINDER_DIR:-$SCRIPT_DIR}"
GRINDER_LOG_DIR="${GRINDER_LOG_DIR:-$GRINDER_DIR/logs}"
COMPETITOR_DIR="${GRINDER_DIR}/../competitor-monitoring"

CYAN='\033[0;36m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

FILTER="${1:-summary}"
LINES=30

# Parse --lines flag
while [[ $# -gt 0 ]]; do
    case "$1" in
        --lines) LINES="$2"; shift 2 ;;
        *) shift ;;
    esac
done

show_log() {
    local label="$1"
    local pattern="$2"
    local logfile

    logfile=$(find "$GRINDER_LOG_DIR" -name "${pattern}" -type f 2>/dev/null | sort -r | head -1)
    if [[ -z "$logfile" ]]; then
        echo -e "  ${YELLOW}No logs matching: ${pattern}${NC}"
        return
    fi

    local modified
    modified=$(date -r "$logfile" "+%Y-%m-%d %H:%M:%S" 2>/dev/null)
    local size
    size=$(du -h "$logfile" 2>/dev/null | cut -f1)

    echo -e "${CYAN}── $label ──${NC}"
    echo -e "  File: $(basename "$logfile")  ($size, $modified)"
    echo ""
    tail -n "$LINES" "$logfile" | sed 's/^/  /'
    echo ""
}

case "$FILTER" in
    summary)
        echo -e "${CYAN}╔══════════════════════════════════════════════╗${NC}"
        echo -e "${CYAN}║          Grinder Output Review               ║${NC}"
        echo -e "${CYAN}╚══════════════════════════════════════════════╝${NC}"
        echo ""

        show_log "Last Morning Rounds" "morning-rounds-*.log"
        show_log "Last Competitor Scan" "competitor-*.log"
        show_log "Last Grinder Main Session" "main-*.log"
        show_log "Last Start-All" "start-all-*.log"

        # Show competitor signals summary
        signals="${COMPETITOR_DIR}/competitor-signals.json"
        if [[ -f "$signals" ]]; then
            echo -e "${CYAN}── Competitor Signals ──${NC}"
            modified=$(date -r "$signals" "+%Y-%m-%d %H:%M" 2>/dev/null)
            echo "  Last updated: $modified"
            changes=$(jq '.changes | length' "$signals" 2>/dev/null || echo "0")
            if [[ "$changes" -gt 0 ]]; then
                echo -e "  ${YELLOW}$changes change(s) detected:${NC}"
                jq -r '.changes[] | "  [\(.competitor)] \(.url): \(.summary)"' "$signals" 2>/dev/null | head -10
            else
                echo -e "  ${GREEN}No changes detected.${NC}"
            fi
            echo ""
        fi
        ;;

    morning)
        show_log "Morning Rounds (last run)" "morning-rounds-*.log"
        # Also show briefing generation log if separate
        show_log "Briefing Generation (last run)" "briefing-*.log"
        ;;

    competitor)
        show_log "Competitor Scan (last run)" "competitor-*.log"

        signals="${COMPETITOR_DIR}/competitor-signals.json"
        if [[ -f "$signals" ]]; then
            echo -e "${CYAN}── Full Competitor Signals ──${NC}"
            jq '.' "$signals" 2>/dev/null | head -80
            echo ""
        fi
        ;;

    errors)
        echo -e "${CYAN}── Errors Across All Logs (last 7 days) ──${NC}"
        echo ""
        find "$GRINDER_LOG_DIR" -name "*.log" -mtime -7 -type f 2>/dev/null | sort -r | while read -r logfile; do
            errors=$(grep -c -i "ERROR\|FAIL\|FATAL\|TIMEOUT" "$logfile" 2>/dev/null || echo "0")
            if [[ "$errors" -gt 0 ]]; then
                echo -e "  ${RED}$(basename "$logfile") — $errors error(s):${NC}"
                grep -i "ERROR\|FAIL\|FATAL\|TIMEOUT" "$logfile" 2>/dev/null | tail -5 | sed 's/^/    /'
                echo ""
            fi
        done
        echo -e "  ${GREEN}Scan complete.${NC}"
        ;;

    all)
        echo -e "${CYAN}── All Logs (last 24h) ──${NC}"
        echo ""
        find "$GRINDER_LOG_DIR" -name "*.log" -mtime -1 -type f 2>/dev/null | sort -r | while read -r logfile; do
            show_log "$(basename "$logfile")" "$(basename "$logfile")"
        done
        ;;

    *)
        echo "Usage: $0 [summary|morning|competitor|errors|all] [--lines N]"
        exit 1
        ;;
esac
