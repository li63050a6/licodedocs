# licode 官网 + 文档站

licode（Go 编写的 AI 编程助手）的官网与文档站，基于 **Nuxt 4 + fuxsto-design + Tailwind CSS v4** 构建，纯静态输出，可部署到 GitHub Pages / 任意静态托管。

## 技术选型

| 项 | 选择 | 理由 |
|---|---|---|
| 框架 | Nuxt 4（Vue 3） | SSR / 预渲染 / 文件式路由 / SEO 友好 |
| UI 组件库 | fuxsto-design v0.1.1 | 基于 Tailwind v4 的 Vue 3 组件库，内置主题令牌与暗色模式 |
| 样式 | Tailwind CSS v4 | 零配置、CSS 优先，`@theme` 直接桥接设计令牌 |
| 图标 | lucide-vue-next | 按需引入、tree-shaking |
| 文档渲染 | marked | 标准 Markdown → HTML，支持 GFM 表格与代码块 |
| 主题 | CSS 变量 + `.dark` 类 | zinc 黑白工业风，跟随系统 + 手动切换（持久化） |
| 动画 | Vue Transition + IntersectionObserver | 页面切换、文档切换、滚动揭示、悬停动效 |
| 部署 | `nuxt generate` | 纯静态输出，`public/` 内含 `CNAME` / `.nojekyll`，适配 GitHub Pages |

## 站点结构

```
.
├── nuxt.config.ts               # Nuxt 配置（预渲染路由、页面过渡、主题防闪烁脚本）
├── app/
│   ├── app.vue                  # 根组件（NuxtLayout + NuxtPage）
│   ├── assets/css/main.css      # Tailwind 入口 + 主题令牌 + 过渡动画 + Markdown 样式
│   ├── components/
│   │   ├── NavBar.vue           # 顶部导航（响应式 + 移动端菜单 + 主题切换）
│   │   ├── SiteFooter.vue       # 页脚
│   │   ├── DocsSidebar.vue      # 文档侧边栏（可折叠分组 + 全文搜索）
│   │   ├── MarkdownRenderer.vue # Markdown 渲染（含代码块复制按钮）
│   │   └── LogoIcon.vue         # licode logo
│   ├── composables/
│   │   ├── useDocs.ts           # 文档查找 / 搜索 / Markdown 渲染 / 上下篇
│   │   └── useTheme.ts          # 亮暗主题状态 + 持久化
│   ├── data/
│   │   ├── docs.ts              # 全部文档内容（7 章节 28 篇）
│   │   └── changelog/           # 更新日志（每版本一个 Markdown 文件，自动收录）
│   ├── layouts/default.vue      # 全局布局（NavBar / Footer / 回到顶部）
│   ├── pages/
│   │   ├── index.vue            # 首页（Hero、特性卡片、提供商、CTA）
│   │   ├── docs/[...slug].vue   # 文档中心（侧边栏 + 内容 + 上下篇）
│   │   ├── blog.vue             # 更新日志（时间轴 + Markdown 渲染）
│   │   └── community.vue        # 社区（GitHub / Gitee / B 站 / QQ 群 / 邮箱）
│   └── plugins/
│       ├── reveal.ts            # v-reveal 滚动揭示指令
│       └── scroll.client.ts     # 路由切换回到顶部
└── public/                      # favicon.svg / CNAME / .nojekyll
```

## 文档目录（`app/data/docs.ts`）

```
1. 快速开始       下载安装 · 启动服务 · 配置 AI 提供商（含模型管理）
2. 功能详解       多对话与会话分支 · 终端界面(TUI) · 工具与权限 · 子代理系统 · 上下文压缩
                  · 代码审计 · 联网搜索 · 项目 RAG · 语义缓存 · 对话附件上传 · 文件管理器
3. 配置指南       配置文件 · 环境变量 · DNS 自定义（多服务器容灾）
4. 安全           登录认证 · Docker 沙箱 · 敏感信息脱敏
5. 扩展开发       Skills 技能 · MCP 接入（预设 + 管理界面） · 外部工具热加载 · WASM 插件
6. 常见问题
7. 构建与部署     构建 · 部署为系统服务 · 健康检查与优雅关停
```

## 使用教程

### 环境要求

- Node.js ≥ 20（开发环境 v24.19.0），npm 包源使用 npmmirror
- 关键依赖：nuxt ^4.5.2、tailwindcss 4.3.3、fuxsto-design 0.1.1、marked ^16

### 安装与启动

```bash
npm install       # 安装依赖
npm run dev       # 本地开发，打开 http://localhost:3000
```

### 常用命令

```bash
npm run build     # 生产构建 + 预渲染（所有文档路由自动收录）
npm run generate  # 纯静态导出（输出 .output/public）
npm run typecheck # vue-tsc 类型检查
npm run preview   # 本地预览静态产物
```

### 修改文档内容

- 文档集中在 `app/data/docs.ts`，按 `DocCategory`（章节）/ `DocChild`（文章）结构组织，每篇 `content` 用模板字符串写 Markdown，支持 GFM 表格与代码块。
- 新增章节或文章：按现有结构在 `docsData` 数组中添加即可，`nuxt.config.ts` 会自动为新路由生成预渲染，无需额外配置。
- 侧边栏提供全文搜索，命中后展示上下文摘要。

### 添加更新日志

一个版本一个 Markdown 文件，无需改任何代码：

```bash
# 在 app/data/changelog/ 新建 <版本号>.md
---
version: 1.0.0
date: 2026-09-06
---

## 新增

- 第一项
- 第二项

## 修复

- 某问题
```

`changelog/index.ts` 通过 `import.meta.glob` 自动收录目录内所有 `.md`，解析 frontmatter 后按日期倒序展示在「更新日志」页；首页会自动显示最新版本号。

### 主题定制

- 亮 / 暗两套 CSS 变量集中定义在 `app/assets/css/main.css`，默认采用 fuxsto-design 出厂 zinc 黑白工业风（纯黑主色、冷灰层级、8px 圆角）。
- 修改 `:root`（亮色）与 `html.dark`（暗色）中的令牌即可换肤；Tailwind 的 `bg-primary` / `text-muted-foreground` 等工具类由 `@theme` 桥接，无需改动组件。
- 暗色模式由 `<html class="dark">` 控制，首屏由 `nuxt.config.ts` 内联脚本恢复 `localStorage` 或系统偏好，避免闪烁。

### 部署

```bash
npm run generate   # 产物在 .output/public，可直接上传任意静态托管
```

- GitHub Pages：`public/` 目录内置 `CNAME` 与 `.nojekyll`，把 `.output/public` 内容推送到 Pages 分支即可。
- 本地预览 SSR 版：`node .output/server/index.mjs`（build 模式）。

## 内容维护工作流

从上游 [licode](https://github.com/li63050a6/licode) 同步最新发布到本站的标准流程(拉取 releases → 修补 `docs.ts` → 添加更新日志 → 验证测试 → 上传至本仓库),详见 **[docs/maintenance-workflow.md](docs/maintenance-workflow.md)**。

## 开发文档总结

### 架构总览

- **渲染模式**：Nuxt 4（`app/` 目录结构），SSR + 全量预渲染。`nitro.prerender` 从 `docsData` 动态生成全部 `/docs/{cat}/{doc}` 路由，`crawlLinks: true` 兜底链接抓取。
- **数据层**：`app/data/docs.ts`（文档，TS 强类型）+ `app/data/changelog/*.md`（更新日志，Markdown 自动收录）。
- **组合式函数**：`useDocs`（文档查找 / 渲染 / 搜索 / 上下篇）、`useTheme`（主题状态与持久化），均为模块级单例，SSR 与客户端通用。
- **组件分层**：布局（default）→ 导航 / 页脚 → 侧边栏 / 内容渲染器；`MarkdownRenderer` 在客户端为代码块注入复制按钮。

### 数据层详解

#### `app/data/docs.ts`

- 导出类型 `DocChild { id, title, content }` 与 `DocCategory { id, title, icon, children }`，以及 `docsData: DocCategory[]`。
- `id` 决定路由路径：`/docs/{cat.id}/{doc.id}`；`icon` 显示在侧边栏章节标题前（Emoji）。
- `content` 为模板字符串 Markdown，支持 GFM 表格、代码块；模板字符串内反引号需转义为 `` \` ``（详见各字段写法）。
- 新增章节 = 在 `docsData` 数组追加一个 `DocCategory`；新增文章 = 在对应 `children` 追加 `DocChild`。无需触碰 `nuxt.config.ts`，路由自动生成。

#### `app/data/changelog/index.ts`

- `import.meta.glob('./*.md', { eager: true, query: '?raw', import: 'default' })` 构建期静态收集目录内全部 `.md`，产物打进 bundle。
- frontmatter 用正则解析：`/^---\r?\n([\s\S]*?)\r?\n---/`（**兼容 CRLF**，见「关键约定与坑」），再取 `version:` / `date:` 字段，`content` 为 frontmatter 之后的正文。
- 排序规则：先按 `date` 字符串倒序；**同日期再按 `version` 倒序**（保证同一天发布的多个版本，首页取到最新）。若缺 `version`，回退为文件名；缺 `date` 为空串。
- `changelog` 供 `index.vue`（首页取 `changelog[0]` 显示最新版本）与 `blog.vue`（时间轴）消费。

### 组合式函数

#### `useDocs`（`app/composables/useDocs.ts`）

`marked.setOptions({ gfm: true, breaks: true })` 在模块顶部全局设置。

| 成员 | 类型 | 说明 |
|------|------|------|
| `docsData` | `DocCategory[]` | 原始数据透传 |
| `changelog` | `ChangelogEntry[]` | 已排序的更新日志 |
| `findDoc(catId, docId)` | `DocRef \| null` | 按分类 + 文章 id 定位文档 |
| `firstDoc()` | `DocRef` | 第一篇文档（快速开始/下载安装），用于默认跳转 |
| `flatDocs()` | `DocRef[]` | 展平为全量数组，供搜索 / 上下篇 |
| `renderMarkdown(md)` | `string` | marked 同步渲染为 HTML |
| `stripMd(md)` | `string` | 去代码块 / 行内码 / 链接 / 标题符号，归一为纯文本（搜索用） |
| `searchDocs(q)` | `SearchResult[]` | 标题或正文子串匹配，附上下文摘要（命中位置前 24 / 后 42 字符） |
| `prevNext(catId, docId)` | `{ prev, next }` | 全量展平顺序中的上一篇 / 下一篇 |

#### `useTheme`（`app/composables/useTheme.ts`）

- 模块级 `ref<'light'|'dark'>('light')` 单例，避免多实例状态分裂。
- `apply(t)`：写 ref、切 `<html class="dark">`、写 `localStorage['licode_theme']`。
- `init()`：优先读 localStorage，缺失时跟随 `prefers-color-scheme`；在 `default.vue` 的 `onMounted` 调用（首屏由 nuxt.config 内联脚本兜底）。
- `toggle()`：翻转当前值。

### 组件详解

| 组件 | 关键点 |
|------|--------|
| `NavBar.vue` | 固定 `h-14` 顶栏 + `backdrop-blur`；`isActive()` 首页精确匹配、其余 `startsWith`；`links` 数组驱动桌面/移动两套菜单（`Transition mobnav`）；主题切换按钮 Moon/Sun 图标 `Transition fade`；`.nav-link::after` 下划线生长（scoped style） |
| `DocsSidebar.vue` | 顶部搜索框（`Input` + 防抖由 v-model 天然分帧）；`searching` 时渲染 `searchDocs` 结果（`Empty` / 列表 + `line-clamp` 摘要），否则渲染折叠目录；`openCats` 用 `grid-rows-[1fr]↔[0fr]` 实现高度动画；`watch current.cat` 自动展开所在章节，初始展开第一章 |
| `MarkdownRenderer.vue` | `v-html` 渲染 `renderMarkdown(props.markdown)`；`onMounted` 与 `watch(html)` 后 `enhance()`：遍历 `pre` 注入复制按钮（`data-enhanced` 去重），点击用 `navigator.clipboard.writeText`，成功切对勾图标 1.5s 还原 |
| `SiteFooter.vue` | 版权 + 文档/日志/社区/GitHub 链接，`new Date().getFullYear()` 动态年份 |
| `LogoIcon.vue` | SVG logo，`:size` prop 控制像素 |

### 页面详解

| 页面 | 要点 |
|------|------|
| `index.vue` | `useDocs().changelog[0]` 显示最新版本 Chip；`features` 数组渲染特性卡片；`providers` 渲染提供商 Chip；快速开始代码块走 `MarkdownRenderer`；多处 `v-reveal="延迟"` 错峰显现；hero 光斑用 `.hero-blob` / `.hero-title-gradient` |
| `docs/[...slug].vue` | 捕获全部层级：`slug[0]=分类`、`slug[1]=文章`；`current` 不存在时渲染 `Empty` 404；`onMounted` 空路径 `navigateTo(firstDoc, { replace: true })`；`useHead` 动态 title；内容区 `Transition name="doc"`；底部上下篇导航卡（`prevNext`） |
| `blog.vue` | fuxsto `Timeline` / `TimelineItem`，`:title="v${version}"`、`:timestamp="date"`，正文走 `MarkdownRenderer` |
| `community.vue` | `items` 数组 → 链接卡片网格，`v-reveal` 错峰 |

### 路由与预渲染机制（`nuxt.config.ts`）

- `docRoutes = docsData.flatMap(cat => cat.children.map(d => /docs/${cat.id}/${d.id}))`：构建期同步生成全部文档路由。
- `nitro.prerender.routes = ['/', '/blog', '/community', '/docs', ...docRoutes]`，`crawlLinks: true` 兜底抓取页面内链接。
- `app.head.script` 内联 IIFE：读 `localStorage['licode_theme']`，无则用 `prefers-color-scheme`，立即挂 `<html class="dark">`，**首屏不闪变**。
- `pageTransition` / `layoutTransition` 均 `out-in`，配合 main.css 的 `.page-*` / `.layout-*` 类。

### 主题系统

- 全部颜色令牌定义在 `main.css`：`:root`（亮）与 `html.dark`（暗），数值与 fuxsto-design 出厂 zinc 一致，并显式 `color-scheme`。
- `@theme` 桥接 `--font-sans` / `--font-mono`；`bg-primary`、`text-muted-foreground` 等工具类由 fuxsto `@import "fuxsto-design/styles"` 提供。
- 主题切换双份实现：`useTheme`（运行时）+ nuxt.config 内联脚本（首屏），持久化键统一 `licode_theme`。

### Markdown 渲染管线

- marked 16 同步渲染（`gfm + breaks`）→ `MarkdownRenderer` 的 `v-html`。
- 样式集中在 `main.css` 的 `.md` 作用域：标题（h2 前渐变竖条）、表格（hover 行、圆角边框）、代码块（`.copy-btn` 渐显、`@media (hover: none)` 常显）、引用块、marker 自定义。
- 复制按钮为纯 DOM 注入，不做 hydration 开销。

### 全文搜索实现

`searchDocs`：`stripMd` 先剥离代码块 / 行内码 / 链接、剔除 Markdown 符号 → 全小写 → 对标题与正文做 `includes` 子串匹配 → 命中取上下文片段（前后补省略号）。无索引、无外部依赖，数据量（28 篇）下毫秒级。

### 动画系统

| 动画 | 实现 |
|------|------|
| 页面 / 布局切换 | `.page-*` / `.layout-*`：淡入 + 位移 + 模糊，`out-in` |
| 文档切换 | `.doc-*`：淡入 + 位移，`:key="current.doc.id"` 触发 |
| 移动端菜单 | `.mobnav-*`：位移 + 缩放，`transform-origin: top` |
| 滚动揭示 | `v-reveal`（plugins/reveal.ts）+ `.reveal` / `.reveal-visible`，IntersectionObserver（threshold 0.12，底部 -32px 视口收缩），`v-reveal="n"` 用 `transitionDelay` 错峰 |
| 悬停 | 特性卡片上浮 + 阴影、导航下划线生长、复制按钮渐显 |
| 降级 | `prefers-reduced-motion` 下全部过渡置 `none`，`.reveal` 直接可见 |

### 插件

- `plugins/reveal.ts`：注册 `v-reveal` 指令。**必须是非 `.client` 插件**，`mounted` 内用 `import.meta.client` 守卫浏览器 API；`unmounted` 断开 observer（避免 SSR 报错）。
- `plugins/scroll.client.ts`：`nuxtApp.hook('page:finish')` → `window.scrollTo(0, 0)`，客户端专属。

### 依赖锁定与兼容性

- `typescript` **锁定 5.9.3**：`typescript@7` 与 `vue-tsc` 不兼容（`./lib/tsc` 导出报错）。
- npm 源为 **npmmirror**；fuxsto-design 0.1.1 的 peer 依赖 `lucide-vue-next ^0.577.0`。
- 关键依赖：`nuxt ^4.5.2`、`tailwindcss 4.3.3`、`marked ^16`、`@tailwindcss/vite`。

### 关键约定与坑

- **v-reveal 指令必须注册在非 `.client` 插件**（`app/plugins/reveal.ts`），否则 SSR 报 `Cannot read properties of undefined (reading 'getSSRProps')`；`mounted` 内用 `import.meta.client` 守卫浏览器 API。
- **fuxsto `BackTop` 的 `setup` 直接访问 `window`** → 必须包 `<ClientOnly>`（见 `layouts/default.vue`）。
- **changelog frontmatter 正则需兼容 CRLF**：Windows 保存的 `.md` 若为 CRLF 行尾，`/^---\n/` 会匹配失败导致 version/date 解析为空、首页版本错乱。正则统一用 `/^---\r?\n([\s\S]*?)\r?\n---/`；新增文件建议保持 LF。
- **同日发布的多个 changelog 需二次排序**：仅按 `date` 排序不稳定（依赖 glob 字母序），必须「同日期再按 version 倒序」，否则首页会显示旧版本。
- **typescript 锁定 5.9.3**：同「依赖锁定」。
- 主题切换在 `useTheme` 与 nuxt.config 内联脚本中双份实现，保证首屏不闪变；两者读取的持久化键必须一致（`licode_theme`）。
- 文档 `content` 是模板字符串：代码块内的反引号要写成 `` \` ``，`${}` 需转义为 `\${}`，否则被插值或破坏语法。

### 开发工作流

1. **加文档**：在 `docs.ts` 对应 `children` 追加 `DocChild`（或新增 `DocCategory`），跑 `npm run typecheck` 后 `npm run generate` 验证新路由已预渲染。
2. **加更新日志**：`changelog/` 下新建 `<版本>.md`，frontmatter 写 `version` / `date`，无需改代码；注意 LF 行尾与正确的发布日期。
3. **加页面**：`app/pages/` 新建 `.vue`，文件式路由自动生效；涉及 SEO 用 `useHead` 设标题与 meta。
4. **换肤**：只改 `main.css` 两套令牌；新增颜色先确认 `@theme` 或库中已有对应语义类。
5. **本地验证**：`npm run dev` 预览交互（过渡/搜索/主题），提交前 `npm run typecheck`，发布前 `npm run generate`。

## 技术栈与依赖

- Nuxt 4 / Vue 3.5 / Nitro 2
- Tailwind CSS 4.3 + @tailwindcss/vite
- fuxsto-design 0.1.1（peer：vue、tailwindcss、lucide-vue-next）
- marked 16（Markdown 渲染）

## 联系与交流

- **GitHub**：https://github.com/li63050a/licode
- **Gitee**：https://gitee.com/li63050a/licode
- **开发者 B 站**：[小帅5656](https://b23.tv/nDqj0DT)
- **QQ 技术交流群**：1026939741
- **开发者邮箱**：li63050@qq.com
