#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR/frontend"
if [ -f package.json ]; then
  npm install
  npm run build
fi

cd "$ROOT_DIR/backend"
if [ -f package.json ]; then
  npm install
  npm run build
fi

PORT=5009
EXISTING_PID=$(lsof -ti tcp:${PORT} || true)
if [ -n "$EXISTING_PID" ]; then
  kill -9 $EXISTING_PID
fi

echo "Starting server on http://localhost:${PORT}"
node "$ROOT_DIR/backend/dist/index.js"
