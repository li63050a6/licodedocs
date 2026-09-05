# licode 官网 + 文档站

## 技术选型

| 项 | 选择 | 理由 |
|---|---|---|
| 框架 | Vue 3（CDN 本地化） | 无需构建、无需 `npm install`，纯静态文件即可运行 |
| 路由 | 哈希路由（`#/path`） | 纯前端路由，无需服务器配置，直接打开 `index.html` 即可 |
| 文档格式 | Markdown → HTML 内联 | 文档直接写在 JS 对象里，零依赖渲染 |
| CSS | 原生 CSS + CSS 变量 | 跟随 licode 现有的 `style.css` 设计 token（蓝紫主色、暗色主题） |
| 图标 | 内联 SVG | 无外部图标库依赖 |
| 全文搜索 | 纯前端 JS 实现 | 遍历文档内容做关键词匹配，无需后端 |

## 站点结构

```
licodeweb/
├── index.html              # 首页（Vue 应用入口）
├── views/
│   ├── Home.js             # 首页内容（Hero、功能特性、架构图、快速开始）
│   ├── Docs.js             # 文档中心（侧边栏目录 + 内容区）
│   ├── Blog.js             # 更新日志/博客
│   └── Community.js        # 交流群、GitHub、联系方式
├── data/
│   ├── docs.js             # 所有文档内容（按章节组织）
│   └── versions.js         # 版本更新记录
├── assets/
│   ├── vue.global.js       # Vue 3 CDN 本地化（从 unpkg 下载）
│   ├── style.css           # 全局样式
│   └── logo.svg            # licode logo
└── components/
    ├── NavBar.js           # 顶部导航栏
    ├── SideBar.js          # 文档侧边栏目录
    ├── CodeBlock.js        # 代码高亮块
    └── SearchModal.js      # 全文搜索弹窗
```

## 页面规划

| 页面 | 内容 |
|---|---|
| **首页 `/`** | Hero 区（标题 + 简介 + CTA 按钮）、核心功能卡片（6-8个）、架构图、快速开始代码块、多提供商支持、安全特性、联系信息 |
| **文档 `/docs`** | 左侧目录树（可折叠）、右侧内容区、搜索框、版本选择器、上一页/下一页导航 |
| **更新日志 `/blog`** | 版本时间线、功能列表、修复列表 |
| **社区 `/community`** | GitHub/Gitee/B站/QQ群/邮箱 |

## 文档目录（`docs.js`）

```
1. 快速开始
   - 下载安装
   - 启动服务
   - 配置 AI 提供商
2. 功能详解
   - 多对话与会话分支
   - 工具与权限
   - 子代理系统
   - 上下文压缩
   - 代码审计
   - 联网搜索
   - 项目 RAG
3. 配置指南
   - 配置文件说明
   - 环境变量
   - 提供商默认值
   - DNS 自定义
4. 安全
   - 登录认证
   - 工具权限
   - 敏感信息脱敏
   - Docker 沙箱
5. 扩展开发
   - Skills 技能
   - MCP 接入
   - 外部工具热加载
   - WASM 插件
6. 常见问题
7. 构建与部署
```

## 关键实现细节

- **Vue 路由**: 用 `window.location.hash` 监听实现简易路由，4 个 view 对象切换显示
- **文档渲染**: Markdown 用正则实现轻量解析（标题/代码块/列表/加粗/链接），预编译为 HTML 字符串
- **搜索**: 遍历 `docs.js` 所有章节，对标题和内容做 `includes` 匹配，结果高亮跳转
- **主题跟随**: 读取 `localStorage`，跟随系统 `prefers-color-scheme`，手动切换持久化
- **响应式**: CSS Grid + Flexbox，移动端汉堡菜单

## 与现有 licode 的关系

- 独立目录 `licodeweb/`，不干扰现有 Go 项目代码
- 未来可直接由 licode 的 Web 服务器 serve 此目录（`http.FileServer`）
- 也可单独部署到 GitHub Pages / 任意静态托管

## 联系与交流

- **GitHub**：https://github.com/li63050a/licode
- **Gitee**：https://gitee.com/li63050a/licode
- **开发者 B 站**：[小帅5656](https://b23.tv/nDqj0DT) — 关注获取最新动态、教程、演示
- **QQ 技术交流群**：[点击加入](https://qun.qq.com/universal-share/share?ac=1&authKey=zq9BYcTtBQm6GbvWiEWiBvDWNWbqhw2%2F%2BRnGM21c0jcL%2FofGqBFeXLr%2BtYT3SkO6&busi_data=eyJncm91cENvZGUiOiIxMDI2OTM5NzQxIiwidG9rZW4iOiJxNkNWUTUxYXVxSmRHZXRvdWtkZnhaN25INzJrMmNaNFpVTjJ5ZTVLYmRvWTFuOEZTd093UXBtQi8vQWk2T1JyIiwidWluIjoiMzYzNTczNjE4MCJ9&data=073ZrPEFZXFvoEDWatbWTidAitiN4OIbiaVDWoR7hVIwJurEPC7Swm6OREVpn6omzobXLn3SRErNKxKbYDTZQA&svctype=4&tempid=h5_group_info)（群号：1026939741）— 提问、反馈 bug、讨论功能
- **开发者邮箱**：li63050@qq.com
