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

## Commit 2 — Docker 优化 (2026-02-20)

**变更：**
- `.dockerignore`：排除 `node_modules/`、`.next/`、`.git/`、tests、docs、日志等
- `README.md`：Docker 部分增加构建上下文说明

**验收：**
- `docker build` 成功，构建上下文 ~300KB（vs 之前无 .dockerignore 时的大体积）
- 最终镜像正常生成 ✓

---

## Commit 3 — 最小 Smoke 脚本 (2026-02-20)

**变更：**
- `scripts/nightly_smoke.sh`：可独立运行的三步检查（lint → typecheck → build）
- 日志保存到 `tmp/smoke-logs/<timestamp>.log`
- `.gitignore`：新增 `tmp/` 排除
- `docs/progress.md`：本文件

**验收：**
- `bash scripts/nightly_smoke.sh` → All checks passed ✓

---
