#!/usr/bin/env bash
# generate-briefing.sh — Generate and send three role-specific morning briefing emails
#
# Three briefings:
#   1. Command Brief  → Jeramey  (systems, errors, dev activity, decisions)
#   2. Content Brief  → Heather  (calendar, social, outreach)
#   3. Strategy Brief → Richard  (competitor intel, pipeline, revenue)
#
# Each briefing is a standalone HTML email with inline CSS, sent via SendGrid.
#
# Usage:
#   ./generate-briefing.sh --analytics data/analytics-latest.json --signals ../competitor-monitoring/competitor-signals.json
#   ./generate-briefing.sh --dry-run    # Generate HTML files but don't send
#
# Environment:
#   SENDGRID_API_KEY       — Required for sending
#   BRIEFING_TO_JERAMEY    — Jeramey's email (default: jeramey@mededprep.com)
#   BRIEFING_TO_HEATHER    — Heather's email (default: heather@mededprep.com)
#   BRIEFING_TO_RICHARD    — Richard's email (default: richard@mededprep.com)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRINDER_DIR="${GRINDER_DIR:-$SCRIPT_DIR}"
GRINDER_LOG_DIR="${GRINDER_LOG_DIR:-$GRINDER_DIR/logs}"
DATA_DIR="${GRINDER_DIR}/data"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
DATE_DISPLAY="$(date '+%A, %B %-d, %Y')"
DATE_SHORT="$(date '+%m/%d')"

# Recipients
TO_JERAMEY="${BRIEFING_TO_JERAMEY:-jeramey@mededprep.com}"
TO_HEATHER="${BRIEFING_TO_HEATHER:-heather@mededprep.com}"
TO_RICHARD="${BRIEFING_TO_RICHARD:-richard@mededprep.com}"
FROM_EMAIL="no-reply@mededprep.com"
FROM_NAME="MedEdPrep Grinder"

# Parse arguments
ANALYTICS_FILE=""
SIGNALS_FILE=""
DRY_RUN=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        --analytics) ANALYTICS_FILE="$2"; shift 2 ;;
        --signals)   SIGNALS_FILE="$2"; shift 2 ;;
        --dry-run)   DRY_RUN=true; shift ;;
        *) shift ;;
    esac
done

# Default file paths
ANALYTICS_FILE="${ANALYTICS_FILE:-${DATA_DIR}/analytics-latest.json}"
SIGNALS_FILE="${SIGNALS_FILE:-${GRINDER_DIR}/../competitor-monitoring/competitor-signals.json}"

log() {
    echo "[$(date +%H:%M:%S)] $*"
}

log_error() {
    log "ERROR: $*"
}

# ── Load data ───────────────────────────────────────────────────────

# Analytics data
if [[ -f "$ANALYTICS_FILE" ]]; then
    ANALYTICS_JSON=$(cat "$ANALYTICS_FILE")
    log "Loaded analytics: $ANALYTICS_FILE"
else
    ANALYTICS_JSON='{}'
    log "WARNING: Analytics file not found: $ANALYTICS_FILE"
fi

# Competitor signals
if [[ -f "$SIGNALS_FILE" ]]; then
    SIGNALS_JSON=$(cat "$SIGNALS_FILE")
    SIGNALS_DATE=$(date -r "$SIGNALS_FILE" "+%Y-%m-%d %H:%M" 2>/dev/null || echo "unknown")
    log "Loaded competitor signals: $SIGNALS_FILE (${SIGNALS_DATE})"
else
    SIGNALS_JSON='{"changes":[],"scan_date":"none"}'
    log "WARNING: Competitor signals not found: $SIGNALS_FILE"
fi

# Team/pipeline data (optional supplemental files)
PIPELINE_FILE="${DATA_DIR}/pipeline.json"
CALENDAR_FILE="${DATA_DIR}/calendar.json"
SOCIAL_FILE="${DATA_DIR}/social-queue.json"

# ── Helper: extract app metric safely ───────────────────────────────
app_metric() {
    local app="$1"
    local key="$2"
    local default="${3:-N/A}"
    echo "$ANALYTICS_JSON" | jq -r --arg app "$app" --arg key "$key" --arg def "$default" \
        '.[$app][$key] // $def' 2>/dev/null || echo "$default"
}

app_has_error() {
    local app="$1"
    echo "$ANALYTICS_JSON" | jq -r --arg app "$app" \
        'if .[$app].error then "true" else "false" end' 2>/dev/null || echo "true"
}

# ── Inline CSS (shared across all briefings) ────────────────────────
read -r -d '' BASE_CSS << 'CSSEOF' || true
<style>
    body { margin: 0; padding: 0; background: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 640px; margin: 0 auto; background: #ffffff; }
    .header { background: #1a1a2e; color: #ffffff; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.3px; }
    .header .date { color: #8b8fa3; font-size: 13px; margin-top: 4px; }
    .header .tag { display: inline-block; background: rgba(255,255,255,0.1); color: #a5b4fc; font-size: 11px; padding: 2px 8px; border-radius: 10px; margin-top: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .section { padding: 20px 32px; border-bottom: 1px solid #eee; }
    .section h2 { font-size: 14px; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; }
    .metric-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    .metric { background: #f8f9fb; border-radius: 8px; padding: 12px; }
    .metric .label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.3px; }
    .metric .value { font-size: 22px; font-weight: 700; color: #111827; margin-top: 2px; }
    .metric .delta { font-size: 11px; margin-top: 2px; }
    .metric .delta.up { color: #059669; }
    .metric .delta.down { color: #dc2626; }
    .metric .delta.flat { color: #6b7280; }
    .app-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
    .app-row:last-child { border-bottom: none; }
    .app-name { font-weight: 500; color: #374151; font-size: 14px; }
    .app-status { font-size: 12px; padding: 2px 8px; border-radius: 4px; }
    .app-status.ok { background: #d1fae5; color: #065f46; }
    .app-status.error { background: #fee2e2; color: #991b1b; }
    .app-status.unknown { background: #f3f4f6; color: #6b7280; }
    .alert { background: #fef3c7; border-left: 3px solid #f59e0b; padding: 12px 16px; margin: 8px 0; border-radius: 0 6px 6px 0; font-size: 13px; }
    .alert.critical { background: #fee2e2; border-left-color: #ef4444; }
    .alert.info { background: #eff6ff; border-left-color: #3b82f6; }
    .change-item { padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
    .change-item:last-child { border-bottom: none; }
    .change-item .competitor { font-weight: 600; color: #374151; }
    .change-item .detail { color: #6b7280; margin-top: 2px; }
    .footer { padding: 20px 32px; background: #f8f9fb; text-align: center; font-size: 11px; color: #9ca3af; }
    ul { margin: 4px 0; padding-left: 20px; }
    li { font-size: 13px; color: #4b5563; margin: 4px 0; line-height: 1.5; }
    .no-data { color: #9ca3af; font-style: italic; font-size: 13px; }
</style>
CSSEOF

# ── Generate Command Brief (Jeramey) ───────────────────────────────
generate_command_brief() {
    local output_file="${DATA_DIR}/briefing-command-${TIMESTAMP}.html"

    # Build app status rows
    local app_rows=""
    for app in portal ce clinicals coassist pulse demo; do
        local display_name
        case "$app" in
            portal)    display_name="Portal" ;;
            ce)        display_name="CE Platform" ;;
            clinicals) display_name="Clinicals (CCP)" ;;
            coassist)  display_name="CoAssist" ;;
            pulse)     display_name="Pulse" ;;
            demo)      display_name="Demo" ;;
        esac

        local has_err
        has_err=$(app_has_error "$app")
        if [[ "$has_err" == "true" ]]; then
            local err_type
            err_type=$(echo "$ANALYTICS_JSON" | jq -r --arg app "$app" '.[$app].error // "unknown"' 2>/dev/null)
            app_rows+="<div class=\"app-row\"><span class=\"app-name\">${display_name}</span><span class=\"app-status error\">${err_type}</span></div>"
        else
            app_rows+="<div class=\"app-row\"><span class=\"app-name\">${display_name}</span><span class=\"app-status ok\">Healthy</span></div>"
        fi
    done

    # Build error alerts
    local alerts=""
    for app in portal ce clinicals coassist pulse demo; do
        local has_err
        has_err=$(app_has_error "$app")
        if [[ "$has_err" == "true" ]]; then
            local err_detail
            err_detail=$(echo "$ANALYTICS_JSON" | jq -r --arg app "$app" '.[$app].error // "connection failed"' 2>/dev/null)
            alerts+="<div class=\"alert critical\">${app^^}: ${err_detail}</div>"
        fi
    done
    if [[ -z "$alerts" ]]; then
        alerts="<div class=\"alert info\">All systems reporting normally.</div>"
    fi

    # Metrics
    local portal_users
    portal_users=$(app_metric "portal" "active_users" "—")
    local portal_sessions
    portal_sessions=$(app_metric "portal" "sessions_today" "—")
    local pulse_connections
    pulse_connections=$(app_metric "pulse" "peak_connections" "—")
    local ce_enrollments
    ce_enrollments=$(app_metric "ce" "enrollments" "—")
    local bug_count
    bug_count=$(app_metric "portal" "open_bugs" "—")
    local coassist_users
    coassist_users=$(app_metric "coassist" "active_users" "—")

    cat > "$output_file" << HTMLEOF
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Command Brief — ${DATE_SHORT}</title>${BASE_CSS}</head>
<body>
<div class="container">
    <div class="header">
        <h1>Command Brief</h1>
        <div class="date">${DATE_DISPLAY}</div>
        <span class="tag">Systems & Operations</span>
    </div>

    <div class="section">
        <h2>System Status</h2>
        ${app_rows}
    </div>

    <div class="section">
        <h2>Alerts</h2>
        ${alerts}
    </div>

    <div class="section">
        <h2>Key Metrics</h2>
        <div class="metric-grid">
            <div class="metric">
                <div class="label">Portal Users</div>
                <div class="value">${portal_users}</div>
            </div>
            <div class="metric">
                <div class="label">Portal Sessions</div>
                <div class="value">${portal_sessions}</div>
            </div>
            <div class="metric">
                <div class="label">Pulse Peak</div>
                <div class="value">${pulse_connections}</div>
            </div>
            <div class="metric">
                <div class="label">CE Enrollments</div>
                <div class="value">${ce_enrollments}</div>
            </div>
            <div class="metric">
                <div class="label">Open Bugs</div>
                <div class="value">${bug_count}</div>
            </div>
            <div class="metric">
                <div class="label">CoAssist Users</div>
                <div class="value">${coassist_users}</div>
            </div>
        </div>
    </div>

    <div class="footer">
        Generated by MedEdPrep Grinder at $(date '+%H:%M %Z')<br>
        Analytics collected from 6 app endpoints
    </div>
</div>
</body>
</html>
HTMLEOF

    echo "$output_file"
}

# ── Generate Content Brief (Heather) ───────────────────────────────
generate_content_brief() {
    local output_file="${DATA_DIR}/briefing-content-${TIMESTAMP}.html"

    # Calendar items
    local calendar_section=""
    if [[ -f "$CALENDAR_FILE" ]]; then
        calendar_section=$(jq -r '.upcoming[] | "<li><strong>\(.date)</strong> — \(.title)</li>"' "$CALENDAR_FILE" 2>/dev/null | head -10)
    fi
    if [[ -z "$calendar_section" ]]; then
        calendar_section='<li class="no-data">No calendar data available. Add events to data/calendar.json.</li>'
    fi

    # Social queue
    local social_section=""
    if [[ -f "$SOCIAL_FILE" ]]; then
        social_section=$(jq -r '.queue[] | "<li>[\(.platform)] \(.title) — <em>\(.status)</em></li>"' "$SOCIAL_FILE" 2>/dev/null | head -10)
    fi
    if [[ -z "$social_section" ]]; then
        social_section='<li class="no-data">No social queue data. Add posts to data/social-queue.json.</li>'
    fi

    # CE platform metrics
    local ce_completions
    ce_completions=$(app_metric "ce" "completions" "—")
    local ce_enrollments
    ce_enrollments=$(app_metric "ce" "enrollments" "—")
    local ce_avg_score
    ce_avg_score=$(app_metric "ce" "avg_score" "—")

    cat > "$output_file" << HTMLEOF
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Content Brief — ${DATE_SHORT}</title>${BASE_CSS}</head>
<body>
<div class="container">
    <div class="header">
        <h1>Content Brief</h1>
        <div class="date">${DATE_DISPLAY}</div>
        <span class="tag">Calendar & Content</span>
    </div>

    <div class="section">
        <h2>Upcoming Calendar</h2>
        <ul>${calendar_section}</ul>
    </div>

    <div class="section">
        <h2>Social Queue</h2>
        <ul>${social_section}</ul>
    </div>

    <div class="section">
        <h2>CE Platform Activity</h2>
        <div class="metric-grid">
            <div class="metric">
                <div class="label">Enrollments</div>
                <div class="value">${ce_enrollments}</div>
            </div>
            <div class="metric">
                <div class="label">Completions</div>
                <div class="value">${ce_completions}</div>
            </div>
            <div class="metric">
                <div class="label">Avg Score</div>
                <div class="value">${ce_avg_score}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Content Production Notes</h2>
        <ul>
            <li>Review CE course queue for upcoming recordings</li>
            <li>Check social engagement on recent posts</li>
            <li>Verify ACCREDITCON content calendar alignment</li>
        </ul>
    </div>

    <div class="footer">
        Generated by MedEdPrep Grinder at $(date '+%H:%M %Z')
    </div>
</div>
</body>
</html>
HTMLEOF

    echo "$output_file"
}

# ── Generate Strategy Brief (Richard) ──────────────────────────────
generate_strategy_brief() {
    local output_file="${DATA_DIR}/briefing-strategy-${TIMESTAMP}.html"

    # Competitor changes
    local change_count
    change_count=$(echo "$SIGNALS_JSON" | jq '.changes | length' 2>/dev/null || echo "0")
    local competitor_section=""

    if [[ "$change_count" -gt 0 ]]; then
        competitor_section=$(echo "$SIGNALS_JSON" | jq -r '.changes[] | "<div class=\"change-item\"><div class=\"competitor\">\(.competitor)</div><div class=\"detail\">\(.summary) — <a href=\"\(.url)\">\(.url | split("/")[2])</a></div></div>"' 2>/dev/null)
    else
        competitor_section='<p class="no-data">No competitor changes detected in the last 24 hours.</p>'
    fi

    # Pipeline data
    local pipeline_section=""
    if [[ -f "$PIPELINE_FILE" ]]; then
        pipeline_section=$(jq -r '
            "<div class=\"metric-grid\">" +
            "<div class=\"metric\"><div class=\"label\">Active Leads</div><div class=\"value\">\(.active_leads // "—")</div></div>" +
            "<div class=\"metric\"><div class=\"label\">Pipeline Value</div><div class=\"value\">\(.pipeline_value // "—")</div></div>" +
            "<div class=\"metric\"><div class=\"label\">Close Rate</div><div class=\"value\">\(.close_rate // "—")</div></div>" +
            "</div>"
        ' "$PIPELINE_FILE" 2>/dev/null)
    fi
    if [[ -z "$pipeline_section" ]]; then
        pipeline_section='<p class="no-data">Pipeline data not available. Add to data/pipeline.json.</p>'
    fi

    # Revenue metrics from portal
    local mrr
    mrr=$(app_metric "portal" "mrr" "—")
    local total_programs
    total_programs=$(app_metric "portal" "total_programs" "—")
    local active_students
    active_students=$(app_metric "portal" "active_students" "—")

    # Scan date for competitor data
    local scan_date
    scan_date=$(echo "$SIGNALS_JSON" | jq -r '.scan_date // "unknown"' 2>/dev/null)

    cat > "$output_file" << HTMLEOF
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Strategy Brief — ${DATE_SHORT}</title>${BASE_CSS}</head>
<body>
<div class="container">
    <div class="header">
        <h1>Strategy Brief</h1>
        <div class="date">${DATE_DISPLAY}</div>
        <span class="tag">Competitive Intel & Revenue</span>
    </div>

    <div class="section">
        <h2>Competitor Intelligence</h2>
        <p style="font-size:11px;color:#9ca3af;margin:0 0 8px 0;">Last scan: ${scan_date} | Monitoring ${change_count} change(s)</p>
        ${competitor_section}
    </div>

    <div class="section">
        <h2>Revenue Metrics</h2>
        <div class="metric-grid">
            <div class="metric">
                <div class="label">MRR</div>
                <div class="value">${mrr}</div>
            </div>
            <div class="metric">
                <div class="label">Programs</div>
                <div class="value">${total_programs}</div>
            </div>
            <div class="metric">
                <div class="label">Active Students</div>
                <div class="value">${active_students}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Pipeline</h2>
        ${pipeline_section}
    </div>

    <div class="section">
        <h2>Market Notes</h2>
        <ul>
            <li>Monitor NREMT redesign announcements for timing opportunities</li>
            <li>Track CE competitor pricing changes (quarterly review)</li>
            <li>Watch for Fisdap/PSG integration announcements</li>
        </ul>
    </div>

    <div class="footer">
        Generated by MedEdPrep Grinder at $(date '+%H:%M %Z')<br>
        Competitor data from ${change_count} monitored URL(s)
    </div>
</div>
</body>
</html>
HTMLEOF

    echo "$output_file"
}

# ── Send email via SendGrid ─────────────────────────────────────────
send_email() {
    local to_email="$1"
    local to_name="$2"
    local subject="$3"
    local html_file="$4"

    if [[ ! -f "$html_file" ]]; then
        log_error "HTML file not found: $html_file"
        return 1
    fi

    if $DRY_RUN; then
        log "DRY RUN: Would send '$subject' to $to_email"
        log "  HTML: $html_file ($(wc -c < "$html_file") bytes)"
        return 0
    fi

    if [[ -z "${SENDGRID_API_KEY:-}" ]]; then
        log_error "SENDGRID_API_KEY not set. Cannot send email."
        return 1
    fi

    # Read HTML and escape for JSON
    local html_content
    html_content=$(cat "$html_file" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))' 2>/dev/null) || {
        # Fallback: manual escaping if python3 not available
        html_content=$(cat "$html_file" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\t/\\t/g' | tr '\n' ' ')
        html_content="\"${html_content}\""
    }

    local payload
    payload=$(cat << JSONEOF
{
    "personalizations": [{
        "to": [{"email": "${to_email}", "name": "${to_name}"}]
    }],
    "from": {"email": "${FROM_EMAIL}", "name": "${FROM_NAME}"},
    "subject": "${subject}",
    "content": [{
        "type": "text/html",
        "value": ${html_content}
    }]
}
JSONEOF
)

    local http_code
    http_code=$(curl -s -o /dev/null -w "%{http_code}" \
        --max-time 30 \
        --connect-timeout 10 \
        -X POST "https://api.sendgrid.com/v3/mail/send" \
        -H "Authorization: Bearer ${SENDGRID_API_KEY}" \
        -H "Content-Type: application/json" \
        -d "$payload" 2>/dev/null) || {
        log_error "Failed to connect to SendGrid API."
        return 1
    }

    if [[ "$http_code" -ge 200 && "$http_code" -lt 300 ]]; then
        log "SUCCESS: briefing sent to $to_email ($http_code)"
        return 0
    elif [[ "$http_code" == "401" ]]; then
        log_error "SendGrid auth failed (401). Check SENDGRID_API_KEY."
        return 1
    elif [[ "$http_code" == "429" ]]; then
        log_error "SendGrid rate limited (429). Will retry next run."
        return 1
    else
        log_error "SendGrid returned $http_code for $to_email."
        return 1
    fi
}

# ── Main: generate and send all three briefings ────────────────────
log "Generating briefings..."

COMMAND_HTML=$(generate_command_brief)
log "  Command Brief: $COMMAND_HTML"

CONTENT_HTML=$(generate_content_brief)
log "  Content Brief: $CONTENT_HTML"

STRATEGY_HTML=$(generate_strategy_brief)
log "  Strategy Brief: $STRATEGY_HTML"

log ""
log "Sending briefings..."

SEND_ERRORS=0

send_email "$TO_JERAMEY" "Jeramey" "Command Brief — ${DATE_SHORT}" "$COMMAND_HTML" || ((SEND_ERRORS++))
send_email "$TO_HEATHER" "Heather" "Content Brief — ${DATE_SHORT}" "$CONTENT_HTML" || ((SEND_ERRORS++))
send_email "$TO_RICHARD" "Richard" "Strategy Brief — ${DATE_SHORT}" "$STRATEGY_HTML" || ((SEND_ERRORS++))

log ""
if [[ $SEND_ERRORS -eq 0 ]]; then
    log "SUCCESS: All 3 briefings sent successfully."
else
    log "WARNING: $SEND_ERRORS of 3 briefings failed to send."
fi

exit $SEND_ERRORS
