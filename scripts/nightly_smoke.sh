#!/usr/bin/env bash
# nightly_smoke.sh — 每日 smoke 验证（lint + typecheck + build）
# 用法：bash scripts/nightly_smoke.sh
# 成功时 exit 0，失败时 exit 1 并输出诊断信息

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
LOG_DIR="${PROJECT_ROOT}/tmp/smoke-logs"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
LOG_FILE="${LOG_DIR}/${TIMESTAMP}.log"

mkdir -p "${LOG_DIR}"

echo "=== VocalMax Nightly Smoke ${TIMESTAMP} ===" | tee "${LOG_FILE}"
echo "Project: ${PROJECT_ROOT}" | tee -a "${LOG_FILE}"
echo "" | tee -a "${LOG_FILE}"

cd "${PROJECT_ROOT}"

# 步骤 1: lint
echo "[1/3] npm run lint ..." | tee -a "${LOG_FILE}"
if npm run lint >> "${LOG_FILE}" 2>&1; then
  echo "  ✓ lint passed" | tee -a "${LOG_FILE}"
else
  echo "  ✗ lint FAILED" | tee -a "${LOG_FILE}"
  echo "See ${LOG_FILE} for details" >&2
  exit 1
fi

# 步骤 2: typecheck
echo "[2/3] npm run typecheck ..." | tee -a "${LOG_FILE}"
if npm run typecheck >> "${LOG_FILE}" 2>&1; then
  echo "  ✓ typecheck passed" | tee -a "${LOG_FILE}"
else
  echo "  ✗ typecheck FAILED" | tee -a "${LOG_FILE}"
  echo "See ${LOG_FILE} for details" >&2
  exit 1
fi

# 步骤 3: build
echo "[3/3] npm run build ..." | tee -a "${LOG_FILE}"
if npm run build >> "${LOG_FILE}" 2>&1; then
  echo "  ✓ build passed" | tee -a "${LOG_FILE}"
else
  echo "  ✗ build FAILED" | tee -a "${LOG_FILE}"
  echo "See ${LOG_FILE} for details" >&2
  exit 1
fi

echo "" | tee -a "${LOG_FILE}"
echo "=== All checks passed ✓ ===" | tee -a "${LOG_FILE}"
echo "Log saved to: ${LOG_FILE}"
