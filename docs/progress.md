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

## Commit 4 — GitHub Actions CI (2026-02-20)

**变更：**
- `.github/workflows/ci.yml`：
  - Job `check`：ubuntu-latest，Node 22，npm ci → lint → typecheck → build
  - Job `e2e`：仅在 PR 且存在 `e2e/` 目录时运行，上传 Playwright report artifact
  - `concurrency`：同 ref 取消上一次 CI 节省额度

**验收：**
- 本地语法检查通过（yml 格式正确）
- push 到 GitHub 后将自动触发 CI

---

## Commit 5 — 本机 Playwright 安装 + E2E 可运行 (2026-02-20)

### 网络/DNS 自检结果

```
getent hosts registry.npmjs.org → 2606:4700::6810:... (IPv6，link-local only)
curl -I https://registry.npmjs.org/ --ipv4 → HTTP/2 200 (IPv4 正常)
```

**结论**：无需修改 /etc/resolv.conf，无需 .npmrc registry 兜底。npm install 正常（2s）。

### 执行命令与结果

```bash
# 1. 加入 @playwright/test 至 devDependencies
npm install → @playwright/test@1.58.2 安装成功

# 2. 安装 Chromium
npx playwright install --with-deps chromium → chromium-1208 安装成功

# 3. 发现 Bug：port 3000 被 Gitea/socat 占用
#    playwright.config.mjs reuseExistingServer:true → 接到 Gitea 首页 → 测试超时
#    修复：webServer port 3000 → 3002，baseURL 同步更新
#    reuseExistingServer: !process.env.CI（本机复用，CI 强制新起）

# 4. 运行测试
npm run test:e2e → 1 passed (11.8s) ✓
```

### 变更文件

- `package.json`：devDependencies 新增 `@playwright/test: ^1.50.1`
- `playwright.config.mjs`：端口 3000 → 3002，reuseExistingServer 改为环境变量感知
- `README.md`：新增"本机首次安装 Playwright"章节
- `docs/progress.md`：本条记录

---
