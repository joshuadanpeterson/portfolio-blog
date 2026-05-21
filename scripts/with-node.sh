#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NVM_SH="${NVM_DIR:-$HOME/.nvm}/nvm.sh"

if [ -s "$NVM_SH" ]; then
  # Keep npm scripts stable even when the parent shell still points at an old
  # Node binary. Vercel does not need nvm, so missing nvm is not fatal.
  unset npm_config_prefix
  unset NPM_CONFIG_PREFIX

  ORIGINAL_ARGS=("$@")
  set --

  # shellcheck source=/dev/null
  . "$NVM_SH"

  set -- "${ORIGINAL_ARGS[@]}"
  NODE_VERSION="$(tr -d "[:space:]" < "$ROOT_DIR/.nvmrc")"
  nvm use --silent "$NODE_VERSION" >/dev/null
fi

exec "$@"
