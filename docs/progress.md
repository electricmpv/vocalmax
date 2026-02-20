# VocalMax 工程进度日志

## Commit 1 — Tooling 对齐 (2026-02-20)

**变更：**
- `package.json`：新增 `lint` / `typecheck` / `smoke` scripts
- `package.json`：新增 `engines: { "node": ">=22" }`
- `package.json`：新增 devDependencies `eslint` + `eslint-config-next`
- `eslint.config.mjs`：最小 ESLint flat config（`next/core-web-vitals` + `next/typescript`，忽略 `.next/`）
- `.eslintignore`：辅助排除（ESLint v9 backup）

**验收：**
- `npm run smoke` → lint(0 errors) + typecheck(pass) + build(pass) ✓

---
