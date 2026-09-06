# licode 文档站维护工作流

本文档定义从**上游仓库**同步更新到**文档站仓库**的标准流程,供人工或 AI 助手照此执行。

- 上游仓库(licode 源码 / Releases):`https://github.com/li63050a6/licode`
- 文档站仓库(本仓库):`https://github.com/li63050a6/licodedocs`

```
拉取最新更新信息 → 修补文档 → 添加更新日志 → 验证测试 → 上传至本仓库
```

---

## 前置准备

- Node.js ≥ 20,依赖已安装(`npm install`),npm 源为 npmmirror。
- 本仓库 remote `origin` 指向 `https://github.com/li63050a6/licodedocs.git`。
- 关键文件:
  - 文档数据:`app/data/docs.ts`(全部站点文档,TS 强类型)
  - 更新日志:`app/data/changelog/`(每版本一个 `.md`,`index.ts` 自动收录)
  - 构建配置:`nuxt.config.ts`(文档路由自动预渲染)

---

## 步骤 1:拉取最新更新信息

1. 抓取上游 Releases 列表:
   ```
   https://github.com/li63050a6/licode/releases
   ```
2. 若第一页未覆盖所有版本,继续翻页:
   ```
   https://github.com/li63050a6/licode/releases?page=2
   https://github.com/li63050a6/licode/releases?page=3
   ...
   ```
3. 与本地已有版本比对,确定**需要新增 / 需要更新 / 需要删除**的版本:
   ```bash
   ls app/data/changelog/
   ```
4. 按需抓取上游 README 获取功能细节:
   ```
   https://raw.githubusercontent.com/li63050a6/licode/main/README.md
   ```

> 注意:releases 页面的版本号不连续(如 0.0.0.34 → 0.0.0.36 → 0.0.0.37 → 0.0.0.38 → 0.0.0.40),以页面实际存在为准;发布日期以 release 页面标注为准。

---

## 步骤 2:修补文档

编辑 `app/data/docs.ts`,根据上游 release 内容执行三类操作:

### 添加(新增功能 / 新文章)

在对应章节的 `children` 数组追加 `DocChild`:

```ts
{
  id: 'cache',                       // 决定路由 /docs/features/cache
  title: '语义缓存',
  content: `
## 语义缓存

...
`,
}
```

若属于全新领域,也可新增整个章节(`DocCategory`,含 `icon`)。

### 修改(功能变化 / 命令变更)

直接编辑对应 `DocChild.content`,更新描述、命令、API 表、配置项等。

### 删除(功能移除 / 文档过时)

移除对应的 `DocChild` 对象(及不再使用的章节)。

### 模板字符串转义(必读)

`content` 是 JS 模板字符串,Markdown 内出现以下字符必须转义,否则会破坏语法或被插值:

| 写的内容 | 在 content 中写 |
|----------|-----------------|
| 反引号 ``` ` ``` | `` \` `` |
| `${}` | `\${}` |

示例:`\`Write\` \`Shell\`` 渲染为 `` `Write` `Shell` ``。

---

## 步骤 3:添加更新日志

在 `app/data/changelog/` 新建 `<版本号>.md`(如 `0.0.0.40.md`):

```markdown
---
version: 0.0.0.40
date: 2026-09-06
---

## 新增

- 功能 A

## 改进

- 改进 B

## 修复

- 修复 C

## 平台

linux/amd64 linux/arm64 linux/386 windows/amd64 windows/386 windows/arm64 darwin/amd64 darwin/arm64 freebsd/amd64
```

规则:

- **frontmatter 必须存在**且 `version` / `date` 齐全。
- `date` 格式 `YYYY-MM-DD`,与 release 页面实际发布日期一致(勿用错误年份)。
- **文件必须是 LF 行尾**。Windows 工具保存为 CRLF 会导致 frontmatter 正则匹配失败、首页版本错乱(见「常见问题」)。
- 正文结构可参考 release notes,建议保留 `## 新增 / 改进 / 修复 / 平台` 分组。
- 无需改动任何代码:`changelog/index.ts` 用 `import.meta.glob` 自动收录,并按「date 倒序、同日期再按 version 倒序」展示;首页自动显示最新版本。

---

## 步骤 4:验证测试

### 4.1 类型检查

```bash
npm run typecheck
```

无输出即通过。

### 4.2 静态导出 + 预渲染

```bash
npm run generate
```

检查:
- 无 `ERROR`;
- 所有文档路由出现在预渲染列表(如 `/docs/features/cache`);
- 末尾 `Prerendered N routes`、`Generated public .output/public`。

### 4.3 产物抽查

首页版本 Chip 应为最新版本:

```bash
node -e "const f=require('fs');const h=f.readFileSync('.output/public/index.html','utf8');console.log(h.match(/v[\d.]+ · [\d-]+/)?.[0])"
# 期望: v0.0.0.40 · 2026-09-06
```

更新日志页版本倒序:

```bash
node -e "const f=require('fs');const b=f.readFileSync('.output/public/blog/index.html','utf8');console.log([...new Set([...b.matchAll(/[\d.]+(?=<\/[a-z]+>|\s*·)/g)].map(m=>m[0]))].join(' '))"
# 期望: 最新版本在最前
```

新路由文件存在:

```bash
if exist ".output\public\docs\features\cache\index.html" echo OK
```

### 4.4 人工预览(可选)

```bash
npm run dev        # 交互检查:搜索 / 主题 / 过渡 / 上下篇
```

---

## 步骤 5:上传至本仓库

```bash
git status                 # 查看改动,确认只包含预期文件
git diff --stat            # 概览
git add app/data/docs.ts app/data/changelog/ README.md ...
git commit -m "docs: 同步上游 v0.0.0.40 更新"   # 按改动内容写
git push origin main
```

Commit 信息建议:

| 场景 | 示例 |
|------|------|
| 同步文档内容 | `docs: 同步上游 v0.0.0.40 功能更新` |
| 新增更新日志 | `chore(changelog): 新增 v0.0.0.38 更新日志` |
| 修复 / 重构 | `fix: changelog 解析兼容 CRLF` |

> 只提交预期文件,勿提交 `node_modules/`、`.output/`、`.nuxt/`(已在 `.gitignore`)。

---

## 完整检查清单

- [ ] 已比对 releases 与 `app/data/changelog/`,无遗漏版本
- [ ] `docs.ts` 新增/修改/删除内容符合上游 release 事实,无臆造
- [ ] `docs.ts` 模板字符串转义正确(反引号 / `${}`)
- [ ] changelog 文件 frontmatter 齐全、日期正确、LF 行尾
- [ ] `npm run typecheck` 通过
- [ ] `npm run generate` 成功,新路由已预渲染
- [ ] 首页显示最新版本、blog 顺序正确
- [ ] 已 `git push origin main` 并确认远端生效

---

## 常见问题与坑

| 现象 | 原因 / 处理 |
|------|-------------|
| 首页版本显示旧版本或空白 | changelog 文件 CRLF 行尾导致 frontmatter 解析失败;转 LF |
| 同一天多版本顺序错乱 | `index.ts` 已按「date + version」双排序;确认未回退该逻辑 |
| `typecheck` 报模板字符串语法错误 | `content` 内未转义的反引号 / `${}`;检查新增段 |
| 文档页面 404 | 路由由 `docsData` 自动生成;确认 id 在 children 内且无重名 |
| 生成路由数无变化 | `nuxt.config.ts` 构建期读取 `docsData`,需重新运行 `generate`(热更新不重建路由) |
