#!/usr/bin/env bash
# install.sh — Set up the grinder system on the openclaw machine
#
# Verifies dependencies, creates directories, installs cron jobs,
# and validates environment variables.
#
# Usage:
#   ./install.sh             # Full installation
#   ./install.sh --check     # Dependency check only (no changes)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRINDER_DIR="${GRINDER_DIR:-$SCRIPT_DIR}"
GRINDER_LOG_DIR="${GRINDER_LOG_DIR:-$GRINDER_DIR/logs}"
COMPETITOR_DIR="${GRINDER_DIR}/../competitor-monitoring"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

CHECK_ONLY=false
if [[ "${1:-}" == "--check" ]]; then
    CHECK_ONLY=true
fi

echo -e "${CYAN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║        MedEdPrep Grinder — Installer         ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════╝${NC}"
echo ""

ERRORS=0
WARNINGS=0

check_dep() {
    local name="$1"
    local required="${2:-true}"

    if command -v "$name" &>/dev/null; then
        local version
        version=$("$name" --version 2>/dev/null | head -1 || echo "installed")
        echo -e "  ${GREEN}OK${NC}     $name  ($version)"
    elif [[ "$required" == "true" ]]; then
        echo -e "  ${RED}MISSING${NC}  $name  (REQUIRED)"
        ((ERRORS++))
    else
        echo -e "  ${YELLOW}MISSING${NC}  $name  (optional)"
        ((WARNINGS++))
    fi
}

# ── Check dependencies ──────────────────────────────────────────────
echo -e "${CYAN}── Dependencies ──${NC}"
check_dep "bash"
check_dep "tmux"
check_dep "curl"
check_dep "jq"
check_dep "claude"
check_dep "diff" true
check_dep "crontab" true
check_dep "mail" false
echo ""

# ── Check environment variables ─────────────────────────────────────
echo -e "${CYAN}── Environment Variables ──${NC}"

check_env() {
    local var="$1"
    local required="${2:-true}"

    if [[ -n "${!var:-}" ]]; then
        local val="${!var}"
        if [[ ${#val} -gt 12 ]]; then
            echo -e "  ${GREEN}SET${NC}    $var  (${val:0:4}...${val: -4})"
        else
            echo -e "  ${GREEN}SET${NC}    $var"
        fi
    elif [[ "$required" == "true" ]]; then
        echo -e "  ${RED}UNSET${NC}  $var  (REQUIRED)"
        ((ERRORS++))
    else
        echo -e "  ${YELLOW}UNSET${NC}  $var  (optional — some features will be skipped)"
        ((WARNINGS++))
    fi
}

check_env "SENDGRID_API_KEY" true
check_env "PORTAL_AUTH_TOKEN" true
check_env "CE_AUTH_TOKEN" false
check_env "CLINICALS_AUTH_TOKEN" false
check_env "COASSIST_AUTH_TOKEN" false
check_env "PULSE_AUTH_TOKEN" false
check_env "DEMO_AUTH_TOKEN" false
echo ""

if $CHECK_ONLY; then
    echo -e "${CYAN}── Summary (check mode) ──${NC}"
    echo -e "  Errors:   $ERRORS"
    echo -e "  Warnings: $WARNINGS"
    if [[ $ERRORS -gt 0 ]]; then
        echo -e "  ${RED}Fix errors before running ./install.sh${NC}"
        exit 1
    else
        echo -e "  ${GREEN}Ready to install.${NC}"
    fi
    exit 0
fi

# ── Create directories ──────────────────────────────────────────────
echo -e "${CYAN}── Creating Directories ──${NC}"

create_dir() {
    local dir="$1"
    if [[ -d "$dir" ]]; then
        echo -e "  ${GREEN}EXISTS${NC}  $dir"
    else
        mkdir -p "$dir"
        echo -e "  ${GREEN}CREATED${NC} $dir"
    fi
}

create_dir "$GRINDER_LOG_DIR"
create_dir "$GRINDER_DIR/data"
create_dir "$COMPETITOR_DIR/snapshots"
echo ""

# ── Make scripts executable ─────────────────────────────────────────
echo -e "${CYAN}── Setting Permissions ──${NC}"
for script in "$SCRIPT_DIR"/*.sh; do
    if [[ -f "$script" ]]; then
        chmod +x "$script"
        echo -e "  ${GREEN}+x${NC}  $(basename "$script")"
    fi
done
for script in "$COMPETITOR_DIR"/*.sh; do
    if [[ -f "$script" ]]; then
        chmod +x "$script"
        echo -e "  ${GREEN}+x${NC}  competitor-monitoring/$(basename "$script")"
    fi
done
echo ""

# ── Install cron jobs ───────────────────────────────────────────────
echo -e "${CYAN}── Cron Jobs ──${NC}"

CRON_MARKER="# === MEDEDPREP GRINDER ==="
CRON_ENTRIES="${CRON_MARKER}
# Competitor monitoring — 5:30 AM ET daily
30 5 * * * cd ${COMPETITOR_DIR} && ${COMPETITOR_DIR}/collect-signals.sh >> ${GRINDER_LOG_DIR}/competitor-\$(date +\\%Y\\%m\\%d).log 2>&1
# Morning rounds — 6:00 AM ET daily
0 6 * * * cd ${SCRIPT_DIR} && ${SCRIPT_DIR}/morning-rounds.sh >> ${GRINDER_LOG_DIR}/morning-rounds-\$(date +\\%Y\\%m\\%d).log 2>&1
${CRON_MARKER} END"

# Remove old entries if present, then add new
EXISTING_CRON=$(crontab -l 2>/dev/null || true)
CLEANED_CRON=$(echo "$EXISTING_CRON" | sed "/${CRON_MARKER}/,/${CRON_MARKER} END/d")
echo "${CLEANED_CRON}
${CRON_ENTRIES}" | crontab -

echo -e "  ${GREEN}INSTALLED${NC}  5:30 AM — competitor signal collection"
echo -e "  ${GREEN}INSTALLED${NC}  6:00 AM — morning rounds + briefing emails"
echo ""

# ── Validate SendGrid ──────────────────────────────────────────────
echo -e "${CYAN}── SendGrid Validation ──${NC}"
if [[ -n "${SENDGRID_API_KEY:-}" ]]; then
    sg_status=$(curl -s -o /dev/null -w "%{http_code}" \
        --max-time 10 \
        -H "Authorization: Bearer ${SENDGRID_API_KEY}" \
        "https://api.sendgrid.com/v3/user/profile" 2>/dev/null) || sg_status="000"

    if [[ "$sg_status" == "200" ]]; then
        echo -e "  ${GREEN}OK${NC}  SendGrid API key is valid."
    elif [[ "$sg_status" == "401" ]]; then
        echo -e "  ${RED}FAIL${NC}  SendGrid API key is invalid (401)."
        ((ERRORS++))
    elif [[ "$sg_status" == "000" ]]; then
        echo -e "  ${YELLOW}SKIP${NC}  Could not reach SendGrid API (network issue?)."
        ((WARNINGS++))
    else
        echo -e "  ${YELLOW}WARN${NC}  Unexpected response from SendGrid ($sg_status)."
        ((WARNINGS++))
    fi
else
    echo -e "  ${RED}SKIP${NC}  SENDGRID_API_KEY not set."
fi
echo ""

# ── Summary ─────────────────────────────────────────────────────────
echo -e "${CYAN}══════════════════════════════════════════════${NC}"
echo -e "  Errors:   $ERRORS"
echo -e "  Warnings: $WARNINGS"
echo ""

if [[ $ERRORS -gt 0 ]]; then
    echo -e "  ${RED}Installation completed with errors.${NC}"
    echo "  Fix the issues above and re-run ./install.sh"
    echo ""
    echo "  To set environment variables, add to ~/.bashrc:"
    echo "    export SENDGRID_API_KEY='SG.your-key-here'"
    echo "    export PORTAL_AUTH_TOKEN='your-token-here'"
    exit 1
else
    echo -e "  ${GREEN}Installation complete.${NC}"
    echo ""
    echo "  Next steps:"
    echo "    1. Verify:  ./check-grinder.sh"
    echo "    2. Test:    ./morning-rounds.sh --dry-run"
    echo "    3. Start:   ./start-all.sh"
fi
