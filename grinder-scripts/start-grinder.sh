#!/usr/bin/env bash
# start-grinder.sh — Start a grinder tmux session for autonomous Claude Code work
# Runs on the openclaw machine with --dangerously-skip-permissions for unattended operation.
#
# Usage:
#   ./start-grinder.sh [task-name] [prompt]
#   ./start-grinder.sh morning-rounds "Run morning rounds for all MedEdPrep apps"
#   ./start-grinder.sh bug-investigation "Investigate open bug reports"
#
# Environment:
#   GRINDER_DIR      — Base directory (default: script's parent)
#   GRINDER_LOG_DIR  — Log directory (default: $GRINDER_DIR/logs)
#   GRINDER_TIMEOUT  — Max session duration in seconds (default: 3600 = 1 hour)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRINDER_DIR="${GRINDER_DIR:-$SCRIPT_DIR}"
GRINDER_LOG_DIR="${GRINDER_LOG_DIR:-$GRINDER_DIR/logs}"
GRINDER_TIMEOUT="${GRINDER_TIMEOUT:-3600}"

TASK_NAME="${1:-grinder}"
PROMPT="${2:-}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
SESSION_NAME="grinder-${TASK_NAME}"
LOG_FILE="${GRINDER_LOG_DIR}/${TASK_NAME}-${TIMESTAMP}.log"

mkdir -p "$GRINDER_LOG_DIR"

# ── Preflight checks ───────────────────────────────────────────────
if ! command -v tmux &>/dev/null; then
    echo "ERROR: tmux is not installed" >&2
    exit 1
fi

if ! command -v claude &>/dev/null; then
    echo "ERROR: claude CLI is not found in PATH" >&2
    exit 1
fi

# Kill existing session with same name if it exists
if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "WARNING: Session '$SESSION_NAME' already exists. Killing it."
    tmux kill-session -t "$SESSION_NAME"
fi

# ── Build the claude command ────────────────────────────────────────
# Post-June-15 rule: interactive sessions (tmux) stay on subscription.
# Avoid `claude -p` flag — use interactive tmux sessions instead.
CLAUDE_CMD="claude --dangerously-skip-permissions"

if [[ -n "$PROMPT" ]]; then
    # Start with an initial prompt fed via tmux send-keys
    INITIAL_PROMPT="$PROMPT"
else
    INITIAL_PROMPT=""
fi

# ── Start tmux session ─────────────────────────────────────────────
echo "[$TIMESTAMP] Starting grinder session: $SESSION_NAME"
echo "  Task:    $TASK_NAME"
echo "  Log:     $LOG_FILE"
echo "  Timeout: ${GRINDER_TIMEOUT}s"

# Create session in detached mode, start logging
tmux new-session -d -s "$SESSION_NAME" -x 200 -y 50

# Enable tmux logging to file
tmux pipe-pane -t "$SESSION_NAME" "cat >> '$LOG_FILE'"

# Start claude in the session
tmux send-keys -t "$SESSION_NAME" "$CLAUDE_CMD" Enter

# Wait for claude to initialize
sleep 3

# Send the initial prompt if provided
if [[ -n "$INITIAL_PROMPT" ]]; then
    sleep 2
    tmux send-keys -t "$SESSION_NAME" "$INITIAL_PROMPT" Enter
fi

# ── Timeout watchdog (background) ──────────────────────────────────
(
    sleep "$GRINDER_TIMEOUT"
    if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
        echo "[$( date +%Y%m%d-%H%M%S )] TIMEOUT: Killing session $SESSION_NAME after ${GRINDER_TIMEOUT}s" >> "$LOG_FILE"
        tmux kill-session -t "$SESSION_NAME" 2>/dev/null || true
    fi
) &
WATCHDOG_PID=$!

# Write PID file for cleanup
echo "$WATCHDOG_PID" > "${GRINDER_LOG_DIR}/${SESSION_NAME}.watchdog.pid"

echo "[$TIMESTAMP] Grinder session started successfully."
echo "  Attach:  tmux attach -t $SESSION_NAME"
echo "  Monitor: tail -f $LOG_FILE"
echo "  Stop:    ./kill-grinder.sh $TASK_NAME"
