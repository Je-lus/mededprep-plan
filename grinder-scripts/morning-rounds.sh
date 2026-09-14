#!/usr/bin/env bash
# morning-rounds.sh — 6 AM cron job: collect analytics, generate briefings, send emails
#
# This is the daily heartbeat of the grinder system. It:
#   1. Collects analytics from all 6 MedEdPrep app endpoints
#   2. Reads competitor signals (generated at 5:30 AM by collect-signals.sh)
#   3. Generates three role-specific briefings
#   4. Sends emails via SendGrid
#
# Usage:
#   ./morning-rounds.sh              # Full run — collect, generate, send
#   ./morning-rounds.sh --dry-run    # Collect and generate but don't send emails
#   ./morning-rounds.sh --collect-only  # Only collect analytics, skip briefing
#
# Environment:
#   SENDGRID_API_KEY     — Required for sending emails
#   PORTAL_AUTH_TOKEN    — Portal admin API auth
#   CE_AUTH_TOKEN        — CE app API auth
#   CLINICALS_AUTH_TOKEN — Clinicals superadmin auth
#   COASSIST_AUTH_TOKEN  — CoAssist admin auth
#   PULSE_AUTH_TOKEN     — Pulse API auth
#   DEMO_AUTH_TOKEN      — Demo app auth

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRINDER_DIR="${GRINDER_DIR:-$SCRIPT_DIR}"
GRINDER_LOG_DIR="${GRINDER_LOG_DIR:-$GRINDER_DIR/logs}"
DATA_DIR="${GRINDER_DIR}/data"
COMPETITOR_DIR="${GRINDER_DIR}/../competitor-monitoring"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
DATE_DISPLAY="$(date '+%A, %B %-d, %Y')"
LOG_FILE="${GRINDER_LOG_DIR}/morning-rounds-${TIMESTAMP}.log"

DRY_RUN=false
COLLECT_ONLY=false

for arg in "$@"; do
    case "$arg" in
        --dry-run) DRY_RUN=true ;;
        --collect-only) COLLECT_ONLY=true ;;
    esac
done

mkdir -p "$GRINDER_LOG_DIR" "$DATA_DIR"

log() {
    local msg="[$(date +%H:%M:%S)] $*"
    echo "$msg" | tee -a "$LOG_FILE"
}

log_error() {
    log "ERROR: $*"
}

# ── Collect analytics from all apps ────────────────────────────────
log "=== Morning Rounds — $DATE_DISPLAY ==="
log "Mode: $(if $DRY_RUN; then echo 'DRY RUN'; elif $COLLECT_ONLY; then echo 'COLLECT ONLY'; else echo 'FULL RUN'; fi)"
log ""
log "── Phase 1: Analytics Collection ──"

CURL_TIMEOUT=15
ANALYTICS_FILE="${DATA_DIR}/analytics-${TIMESTAMP}.json"

# Initialize the analytics JSON
echo '{}' > "$ANALYTICS_FILE"

collect_endpoint() {
    local app_name="$1"
    local url="$2"
    local auth_token="$3"
    local tmp_file="${DATA_DIR}/.${app_name}-tmp.json"

    log "  Collecting: $app_name ($url)"

    local http_code
    http_code=$(curl -s -o "$tmp_file" -w "%{http_code}" \
        --max-time "$CURL_TIMEOUT" \
        --connect-timeout 5 \
        -H "Authorization: Bearer ${auth_token}" \
        -H "Content-Type: application/json" \
        "$url" 2>/dev/null) || {
        log_error "$app_name — connection failed (timeout or network error)"
        echo '{"error": "connection_failed"}' > "$tmp_file"
        return
    }

    if [[ "$http_code" -ge 200 && "$http_code" -lt 300 ]]; then
        log "    OK ($http_code) — $(wc -c < "$tmp_file") bytes"
    elif [[ "$http_code" -eq 401 || "$http_code" -eq 403 ]]; then
        log_error "$app_name — auth failed ($http_code). Check ${app_name^^}_AUTH_TOKEN."
        echo "{\"error\": \"auth_failed\", \"status\": $http_code}" > "$tmp_file"
    elif [[ "$http_code" -ge 500 ]]; then
        log_error "$app_name — server error ($http_code)"
        echo "{\"error\": \"server_error\", \"status\": $http_code}" > "$tmp_file"
    else
        log_error "$app_name — unexpected status ($http_code)"
        echo "{\"error\": \"unexpected_status\", \"status\": $http_code}" > "$tmp_file"
    fi
}

# Collect from all 6 endpoints
collect_endpoint "portal"    "https://portal.mededprep.com/api/analytics/summary"    "${PORTAL_AUTH_TOKEN:-}"
collect_endpoint "ce"        "https://ce.mededprep.com/api/analytics/summary"        "${CE_AUTH_TOKEN:-}"
collect_endpoint "clinicals" "https://clinicals.mededprep.com/api/analytics/summary"  "${CLINICALS_AUTH_TOKEN:-}"
collect_endpoint "coassist"  "https://coassist.mededprep.com/api/analytics/summary"   "${COASSIST_AUTH_TOKEN:-}"
collect_endpoint "pulse"     "https://pulse.mededprep.com/api/analytics/summary"      "${PULSE_AUTH_TOKEN:-}"
collect_endpoint "demo"      "https://demo.mededprep.com/api/analytics/summary"       "${DEMO_AUTH_TOKEN:-}"

# Merge all app responses into a single analytics JSON
log ""
log "  Merging analytics data..."
jq -n \
    --slurpfile portal    "${DATA_DIR}/.portal-tmp.json" \
    --slurpfile ce        "${DATA_DIR}/.ce-tmp.json" \
    --slurpfile clinicals "${DATA_DIR}/.clinicals-tmp.json" \
    --slurpfile coassist  "${DATA_DIR}/.coassist-tmp.json" \
    --slurpfile pulse     "${DATA_DIR}/.pulse-tmp.json" \
    --slurpfile demo      "${DATA_DIR}/.demo-tmp.json" \
    --arg timestamp "$TIMESTAMP" \
    --arg date "$DATE_DISPLAY" \
    '{
        meta: { collected_at: $timestamp, date: $date },
        portal:    $portal[0],
        ce:        $ce[0],
        clinicals: $clinicals[0],
        coassist:  $coassist[0],
        pulse:     $pulse[0],
        demo:      $demo[0]
    }' > "$ANALYTICS_FILE" 2>/dev/null || {
    log_error "Failed to merge analytics JSON. Individual files may be malformed."
}

# Clean up temp files
rm -f "${DATA_DIR}"/.*-tmp.json

# Also save as "latest" for easy access
cp "$ANALYTICS_FILE" "${DATA_DIR}/analytics-latest.json"
log "  Analytics saved: $ANALYTICS_FILE"
log ""

if $COLLECT_ONLY; then
    log "── Collection complete (--collect-only mode). Exiting. ──"
    exit 0
fi

# ── Phase 2: Generate and send briefings ────────────────────────────
log "── Phase 2: Generate & Send Briefings ──"

"$SCRIPT_DIR/generate-briefing.sh" \
    --analytics "$ANALYTICS_FILE" \
    --signals "${COMPETITOR_DIR}/competitor-signals.json" \
    $(if $DRY_RUN; then echo "--dry-run"; fi) \
    2>&1 | tee -a "$LOG_FILE"

BRIEFING_EXIT=$?

if [[ $BRIEFING_EXIT -eq 0 ]]; then
    log ""
    log "SUCCESS: Morning rounds complete."
else
    log ""
    log_error "Briefing generation exited with code $BRIEFING_EXIT."
fi

# ── Phase 3: Cleanup old data ──────────────────────────────────────
log ""
log "── Phase 3: Cleanup ──"

# Keep 30 days of analytics files
old_analytics=$(find "$DATA_DIR" -name "analytics-*.json" -mtime +30 -not -name "analytics-latest.json" -type f 2>/dev/null | wc -l)
if [[ "$old_analytics" -gt 0 ]]; then
    find "$DATA_DIR" -name "analytics-*.json" -mtime +30 -not -name "analytics-latest.json" -type f -delete 2>/dev/null
    log "  Cleaned $old_analytics analytics files older than 30 days."
fi

# Keep 30 days of log files
old_logs=$(find "$GRINDER_LOG_DIR" -name "*.log" -mtime +30 -type f 2>/dev/null | wc -l)
if [[ "$old_logs" -gt 0 ]]; then
    find "$GRINDER_LOG_DIR" -name "*.log" -mtime +30 -type f -delete 2>/dev/null
    log "  Cleaned $old_logs log files older than 30 days."
fi

log "  Cleanup complete."
log ""
log "=== Morning rounds finished at $(date +%H:%M:%S) ==="
