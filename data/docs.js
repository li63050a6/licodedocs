// docs.js - 所有文档内容
const docsData = [
  {
    id: 'quickstart',
    title: '快速开始',
    icon: '🚀',
    children: [
      {
        id: 'install',
        title: '下载安装',
        content: `
## 下载安装

### 方式一：直接下载二进制

从 [GitHub Releases](https://github.com/li63050a/licode/releases) 下载对应平台的二进制文件。

\`\`\`bash
# Linux
wget https://github.com/li63050a/licode/releases/latest/download/licode-linux-amd64
chmod +x licode-linux-amd64
mv licode-linux-amd64 licode

# macOS
wget https://github.com/li63050a/licode/releases/latest/download/licode-darwin-amd64
chmod +x licode-darwin-amd64
mv licode-darwin-amd64 licode

# Windows
# 下载 licode-windows-amd64.exe
\`\`\`

### 方式二：自行构建

\`\`\`bash
git clone https://github.com/li63050a/licode.git
cd licode
./build.sh
\`\`\`

### 方式三：go install

\`\`\`bash
go install github.com/li63050a/licode@latest
\`\`\`
`
      },
      {
        id: 'start',
        title: '启动服务',
        content: `
## 启动服务

\`\`\`bash
# 默认启动（仅本机访问）
./licode

# 局域网/手机访问
./licode --host 0.0.0.0 --port 8080

# 设置登录密码
./licode --password mypassword

# 启用 HTTPS（自动生成自签名证书）
./licode --https
\`\`\`

启动后浏览器打开 <http://127.0.0.1:8080> 即可使用。

### 环境变量

| 变量 | 说明 |
|------|------|
| \`LICODE_USERNAME\` | 登录用户名 |
| \`LICODE_PASSWORD\` | 登录密码 |
| \`LICODE_HOME\` | 数据目录（默认 \`~/.licode\`） |
| \`LICODE_JSON_LOG\` | 置 \`1\` 启用结构化 JSON 日志 |

### SIGHUP 热重载

\`\`\`bash
# 修改配置后发送 SIGHUP 信号，无需重启
kill -HUP $(pgrep licode)
\`\`\`
`
      },
      {
        id: 'provider',
        title: '配置 AI 提供商',
        content: `
## 配置 AI 提供商

首次使用需在 Web 界面「设置」中配置 AI 提供商。

### 支持的提供商

| 提供商 | 默认地址 | 默认模型 |
|--------|----------|----------|
| OpenAI | \`https://api.openai.com/v1\` | \`gpt-4o-mini\` |
| Claude | \`https://api.anthropic.com\` | \`claude-sonnet-4-20250514\` |
| Ollama | \`http://localhost:11434\` | \`llama3.1:8b\` |
| Gemini | \`https://generativelanguage.googleapis.com\` | \`gemini-2.0-flash\` |

### Ollama 本地部署

\`\`\`bash
# 安装 Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# 拉取模型
ollama pull llama3.1:8b

# 启动 licode（自动识别本地 Ollama）
./licode
\`\`\`

### 多提供商切换

在「设置」→「提供商」下拉框中已配置的提供商之间一键切换。
`
      }
    ]
  },
  {
    id: 'features',
    title: '功能详解',
    icon: '✨',
    children: [
      {
        id: 'sessions',
        title: '多对话与会话分支',
        content: `
## 多对话与会话分支

### 基本操作

- **新建对话**：点击侧边栏「+ 新对话」
- **切换对话**：点击侧边栏中的对话条目
- **重命名**：双击对话标题
- **删除**：悬停显示删除按钮

### 对话分支

点击输入框旁的「分支」按钮，会从当前对话复制所有消息创建新分支。分支对话独立演进，不影响原对话。

### 自动标题

首次发送消息时，系统自动以前 18 个字作为对话标题。
`
      },
      {
        id: 'tools',
        title: '工具与权限',
        content: `
## 工具与权限

### 内置工具

| 工具 | 说明 | 默认权限 |
|------|------|----------|
| \`Read\` | 读取文件 | 允许 |
| \`Write\` | 写入/替换文件 | 需审批 |
| \`Edit\` | 查找替换编辑 | 允许 |
| \`ListDirectory\` | 列出目录 | 允许 |
| \`Grep\` | 正则搜索代码 | 允许 |
| \`Glob\` | 按通配符查找文件 | 允许 |
| \`Shell\` | 执行 shell 命令 | 需审批 |
| \`Delete\` | 删除文件 | 需审批 |
| \`Move\` | 移动/重命名 | 允许 |
| \`Dispatch\` | 调度子代理 | 允许 |
| \`WebSearch\` | 联网搜索 | 允许 |
| \`WebFetch\` | 抓取网页 | 允许 |

### 权限模式

- **allow**：直接执行，不询问
- **ask**：弹出确认框（可「始终允许」当前对话）
- **deny**：禁止执行

### 配置方式

在「设置」→「工具规则」中配置，如 \`Write:ask, Shell:deny\`。
`
      },
      {
        id: 'subagents',
        title: '子代理系统',
        content: `
## 子代理系统

复杂任务可拆分为多个子任务，由不同子代理并行执行。

### 内置子代理

| 代理 | 职责 | 可用工具 |
|------|------|----------|
| \`explorer\` | 代码探索、定位关键函数 | Read, ListDirectory, Glob, Grep |
| \`builder\` | 代码实现与构建验证 | Read, Write, Edit, Shell 等全量工具 |
| \`planner\` | 制定实现计划 | 无（纯思考） |

### DAG 依赖调度

\`\`\`
任务A（探索） ──┐
                ├──→ 任务C（实现）
任务B（规划） ──┘
\`\`\`

\`Dispatch\` 工具支持 \`depends_on\` 参数声明依赖关系，独立任务自动并行执行。

### 硬超时

每个子代理有独立超时，防止单个任务卡死。
`
      },
      {
        id: 'compact',
        title: '上下文压缩',
        content: `
## 上下文压缩

当对话过长超出 token 预算时，自动将旧对话压缩为摘要。

### 工作机制

1. 保留最近 40% 的消息作为直接上下文
2. 将前 60% 的消息发送给 LLM 生成摘要
3. 摘要作为「之前对话的压缩摘要」前置到上下文

### 配置

在「设置」中开启「上下文压缩」，可设置「上下文保护(tokens)」阈值。
`
      },
      {
        id: 'audit',
        title: '代码审计',
        content: `
## 代码审计

「审计」面板提供静态规则 + LLM 双重扫描。

### 静态规则（12 类）

- 硬编码密钥、SQL 拼接、eval、命令注入
- 弱哈希、777 权限、HTTP 明文
- DOM 注入、unsafe 调用、忽略错误
- TODO/FIXME 标记、yaml.load 等

### LLM 深度分析

对 ≤64KB 的小文件（最多 8 个、3 并发）交由模型分析，给出修复建议与代码补丁。

### 修复流程

1. 勾选问题 → 「生成修复预览」
2. 查看 unified diff 高亮
3. 「确认修复」→ 自动生成 \`.bak\` 备份 → 写入

### API

\`\`\`bash
GET  /api/audit/status
POST /api/audit/start
GET  /api/audit/result?task_id=…
POST /api/audit/fix?confirm=true
\`\`\`
`
      },
      {
        id: 'search',
        title: '联网搜索',
        content: `
## 联网搜索

「搜索」面板同时检索多个引擎与本地已收录库。

### 搜索引擎

- **必应**（cn 国际版）
- **百度**
- **DuckDuckGo**（HTML 版）

### 本地收录库

- 倒排索引持久化到 \`~/.licode/search/index.json\`
- 中文 bigram 分词 + BM25 排序
- 支持增删、站内检索

### Agent 对话中搜索

\`WebSearch\`（多引擎合成检索）与 \`WebFetch\`（抓单页并收录）工具可在对话中直接调用。

### API

\`\`\`bash
GET  /api/search?q=…&engines=bing,baidu&local=1
POST /api/search/fetch      # 抓取预览
POST /api/search/save       # 收藏收录
GET  /api/search/catalog    # 已收录列表
\`\`\`
`
      },
      {
        id: 'rag',
        title: '项目 RAG',
        content: `
## 项目 RAG

对当前项目源码建立轻量索引，回答代码相关问题时自动注入相关片段。

### 工作机制

- 遍历工作目录源码文件
- 建立标识符级别的倒排索引
- 查询时按词重叠度匹配最相关文件与行
- 命中片段注入系统提示词

### 配置

在「设置」中开启「项目RAG索引」，可指定索引目录。

### 优势

- 零依赖（无向量数据库）
- 内存开销小
- 支持主流编程语言
`
      }
    ]
  },
  {
    id: 'config',
    title: '配置指南',
    icon: '⚙️',
    children: [
      {
        id: 'config-file',
        title: '配置文件说明',
        content: `
## 配置文件

### config.toml（服务器配置）

\`\`\`toml
[server]
host = "127.0.0.1"
port = 8080
username = "licode"
password = ""
https = false
tls_cert = ""
tls_key = ""
\`\`\`

### config.json（Web 设置）

\`~/.licode/config.json\` 由 Web 界面「设置」实时写入，包含：

- AI 提供商配置
- 工具权限规则
- MCP 服务器
- 界面偏好

### 优先级

命令行参数 > 配置文件 > 环境变量 > 默认值
`
      },
      {
        id: 'env',
        title: '环境变量',
        content: `
## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| \`LICODE_PROVIDER\` | AI 提供商 | \`openai\` |
| \`LICODE_BASE_URL\` | API 地址 | 提供商默认 |
| \`LICODE_API_KEY\` | API 密钥 | - |
| \`LICODE_MODEL\` | 模型名称 | 提供商默认 |
| \`LICODE_USERNAME\` | 登录用户名 | \`licode\` |
| \`LICODE_PASSWORD\` | 登录密码 | - |
| \`LICODE_HOME\` | 数据目录 | \`~/.licode\` |
| \`LICODE_JSON_LOG\` | JSON 日志模式 | 关闭 |
`
      },
      {
        id: 'dns',
        title: 'DNS 自定义',
        content: `
## DNS 自定义解析

解决 API 端点域名解析失败或 DNS 污染问题。

### 模式

| 模式 | 说明 | 服务器格式 |
|------|------|------------|
| \`system\` | 系统默认 | - |
| \`plain\` | 普通 DNS | \`8.8.8.8:53\` |
| \`dot\` | DNS over TLS | \`1.1.1.1:853\` |
| \`doh\` | DNS over HTTPS | \`https://1.1.1.1/dns-query\` |

### 配置

在「设置」→「DNS」中选择模式并填写服务器地址。
`
      }
    ]
  },
  {
    id: 'security',
    title: '安全',
    icon: '🛡️',
    children: [
      {
        id: 'auth',
        title: '登录认证',
        content: `
## 登录认证

### 启用方式

\`\`\`bash
./licode --password your_password
# 或环境变量
LICODE_PASSWORD=your_password ./licode
\`\`\`

### 机制

- 会话 Cookie（HMAC-SHA256 签名）
- 密钥持久化在 \`~/.licode/session.key\`
- 重启后已登录会话仍有效
- Cookie 有效期 7 天

### CSRF 防护

登录页内置 CSRF Token（Cookie + Header 双提交）。
`
      },
      {
        id: 'sandbox',
        title: 'Docker 沙箱',
        content: `
## Docker 沙箱

启用后 Shell 工具在 Docker 容器内执行，隔离主机环境。

### 启用方式

\`\`\`bash
./licode --sandbox --sandbox-image alpine:latest
\`\`\`

### 工作方式

- 工作区以只读方式挂载到容器的 \`/work\`
- 命令在容器内执行
- 容器用完即删（\`--rm\`）

### 要求

主机需安装 Docker 且当前用户有权限访问 \`/var/run/docker.sock\`。
`
      },
      {
        id: 'redact',
        title: '敏感信息脱敏',
        content: `
## 敏感信息脱敏

工具输出在发送给模型前自动脱敏。

### 覆盖的格式

- \`sk-...\` 类 API Key
- \`AKIA...\` AWS 密钥
- \`AIza...\` Google API Key
- \`token/secret/password=...\` 格式

### 脱敏结果

所有匹配项替换为 \`[REDACTED]\`。
`
      }
    ]
  },
  {
    id: 'extend',
    title: '扩展开发',
    icon: '🔧',
    children: [
      {
        id: 'skills',
        title: 'Skills 技能',
        content: `
## Skills 技能

将 \`*.md\` 文件放入技能目录即可自动加载为工具。

### 技能目录

- 项目级：\`.licode/skills/\`
- 用户级：\`~/.licode/skills/\`

### 文件格式

\`\`\`markdown
---
name: code-review
description: 代码审查技能
---
你是一个代码审查专家。请按以下步骤审查代码：
1. 先读取文件整体结构
2. 检查潜在的安全问题
3. 给出改进建议
\`\`\`

### 使用

技能自动注册为 \`skill_<name>\` 工具，Agent 可自主调用。

### 热更新

修改技能文件后自动重新加载，无需重启服务。
`
      },
      {
        id: 'mcp',
        title: 'MCP 接入',
        content: `
## MCP 接入

支持 Model Context Protocol 服务器，扩展 Agent 能力。

### MCP 目录

- 项目级：\`.licode/mcp/\`
- 用户级：\`~/.licode/mcp/\`

### 配置格式

\`\`\`json
{
  "name": "my-server",
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "my-mcp-server"]
}
\`\`\`

### HTTP 类型

\`\`\`json
{
  "name": "remote-server",
  "type": "http",
  "url": "https://mcp.example.com/api"
}
\`\`\`

### 工具注册

MCP 工具自动注册为 \`mcp__<服务器名>__<工具名>\`。
`
      },
      {
        id: 'watchers',
        title: '外部工具热加载',
        content: `
## 外部工具热加载

将 \`*.json\` 文件放入 \`~/.licode/tools/\` 目录，自动注册为 Agent 工具。

### 文件格式

\`\`\`json
{
  "name": "deploy",
  "description": "部署到生产环境",
  "schema": {
    "type": "object",
    "properties": {
      "env": { "type": "string", "description": "部署环境" }
    },
    "required": ["env"]
  },
  "command": "/usr/local/bin/deploy.sh",
  "timeout_sec": 120,
  "env": ["DEPLOY_KEY=xxx"],
  "args_mode": "stdin"
}
\`\`\`

### 字段说明

- \`name\`: 工具名称
- \`description\`: 工具描述
- \`schema\`: JSON Schema 参数定义
- \`command\`: 执行命令
- \`timeout_sec\`: 超时（默认 60s）
- \`env\`: 额外环境变量
- \`args_mode\`: \`stdin\`（默认）或 \`env\`

### 热更新

- 新增/修改文件 → 自动注册
- 删除文件 → 自动卸载
`
      },
      {
        id: 'wasm',
        title: 'WASM 插件',
        content: `
## WASM 插件

基于 WebAssembly（wazero）的插件系统，支持运行时热加载。

### 插件目录

- 项目级：\`.licode/plugins/\`
- 用户级：\`~/.licode/plugins/\`

### 插件格式

将 \`.wasm\` 文件放入目录，可附带同名 \`.json\` 清单：

\`\`\`json
{
  "name": "my-plugin",
  "description": "我的自定义插件",
  "schema": {
    "type": "object",
    "properties": {
      "input": { "type": "string" }
    }
  }
}
\`\`\`

### 开发方式

**方式一：CLI 模式（标准 Go）**

\`\`\`go
// GOOS=wasip1 GOARCH=wasm go build -o plugin.wasm
func main() {
    // os.Args[1] 为 JSON 参数
    // stdout 输出 JSON 结果
}
\`\`\`

**方式二：Reactor 模式（TinyGo）**

导出 \`allocate\` / \`execute\` 函数，宿主内存共享通信。

### 宿主能力

插件可调用宿主函数：
- \`env.log(ptr, size)\` - 日志输出
- \`env.http_get(urlPtr, bufPtr)\` - HTTP 请求
- \`env.file_read(pathPtr, bufPtr)\` - 文件读取
`
      }
    ]
  },
  {
    id: 'faq',
    title: '常见问题',
    icon: '❓',
    children: [
      {
        id: 'faq-common',
        title: '常见问题',
        content: `
## 常见问题

### Q: 忘记密码怎么办？

删除 \`~/.licode/session.key\` 和 \`~/.licode/config.json\` 中相关设置，重启后重新配置。

### Q: 如何备份数据？

点击右侧面板「信息」→「备份」→「导出」，会下载包含配置、会话、技能的 zip 文件。

### Q: 支持哪些编程语言？

工具层面不限语言，Agent 可使用 Shell 执行任意命令。代码审计支持：Go, Python, JavaScript/TypeScript, Java, C/C++, Rust, Ruby, PHP, Swift, Kotlin, Shell, SQL。

### Q: Ollama 连接失败？

确认 Ollama 已启动且监听 \`11434\` 端口：
\`\`\`bash
ollama serve
curl http://localhost:11434/api/tags
\`\`\`

### Q: 如何离线使用？

前端资源全部打包在二进制中，无任何 CDN 依赖。AI 推理需联网（除非使用本地 Ollama）。
`
      }
    ]
  },
  {
    id: 'deploy',
    title: '构建与部署',
    icon: '📦',
    children: [
      {
        id: 'build',
        title: '构建',
        content: `
## 构建

### 单平台构建

\`\`\`bash
go build -ldflags="-s -w" -o licode .
\`\`\`

### 多平台交叉编译

\`\`\`bash
./build.sh
\`\`\`

产物在 \`build/\` 目录，支持：linux/amd64, linux/arm64, windows/amd64, darwin/amd64, darwin/arm64 等。

### 静态编译

\`\`\`bash
CGO_ENABLED=0 go build -ldflags="-s -w" -o licode .
\`\`\`

单二进制约 7MB，不依赖 glibc。
`
      },
      {
        id: 'deploy-service',
        title: '部署为系统服务',
        content: `
## 部署为系统服务

### systemd（Linux）

\`\`\`ini
# /etc/systemd/system/licode.service
[Unit]
Description=licode AI Coding Assistant
After=network.target

[Service]
Type=simple
User=licode
WorkingDirectory=/opt/licode
ExecStart=/opt/licode/licode --host 0.0.0.0 --port 8080
Restart=always
RestartSec=5
Environment=LICODE_HOME=/home/licode/.licode

[Install]
WantedBy=multi-user.target
\`\`\`

### Docker

\`\`\`dockerfile
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY licode .
EXPOSE 8080
ENTRYPOINT ["./licode", "--host", "0.0.0.0"]
\`\`\`

\`\`\`bash
docker build -t licode .
docker run -d -p 8080:8080 -v licode-data:/root/.licode licode
\`\`\`
`
      }
    ]
  }
];
