#!/usr/bin/env bash
set -euo pipefail

PORT=5009
EXISTING_PID=$(lsof -ti tcp:${PORT} || true)
if [ -n "$EXISTING_PID" ]; then
  kill -9 $EXISTING_PID
  echo "Stopped server on port ${PORT}"
else
  echo "No server running on port ${PORT}"
fi
