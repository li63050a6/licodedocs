<script setup lang="ts">
import { Button, Card, Chip } from 'fuxsto-design'
import { useDocs } from '~/composables/useDocs'
import MarkdownRenderer from '~/components/MarkdownRenderer.vue'

const { changelog } = useDocs()
const latest = changelog[0]!

useHead({
  title: 'licode — AI 编程助手',
})

const rocketIcon = iconify('lucide:rocket')
const githubIcon = iconify('lucide:github')

const features = [
  {
    icon: 'lucide:sparkles',
    title: '多 AI 提供商',
    desc: 'OpenAI / Claude / Ollama / Gemini 一键切换，均用各自原生接口。',
    link: '/docs/config/config-file',
  },
  {
    icon: 'lucide:wrench',
    title: '工具调用',
    desc: '读写文件、代码搜索、Shell 执行，Agent 自主调用并回填。',
    link: '/docs/features/tools',
  },
  {
    icon: 'lucide:git-branch',
    title: '子代理系统',
    desc: 'explorer / builder / planner，DAG 依赖并行调度。',
    link: '/docs/features/subagents',
  },
  {
    icon: 'lucide:messages-square',
    title: '多对话',
    desc: '会话列表、自动标题、分支，实时保存到磁盘。',
    link: '/docs/features/sessions',
  },
  {
    icon: 'lucide:shield-check',
    title: '代码审计',
    desc: '12 类静态规则 + LLM 深度分析，一键修复并备份。',
    link: '/docs/features/audit',
  },
  {
    icon: 'lucide:blocks',
    title: '扩展能力',
    desc: 'MCP、Skills、WASM 插件、外部工具热加载。',
    link: '/docs/extend/mcp',
  },
]

const quickstart = `
\`\`\`bash
# 下载或构建后，一行启动
./licode

# 局域网/手机访问
./licode --host 0.0.0.0 --port 8080

# 设置登录密码（可配 HTTPS）
./licode --password mypassword --https
\`\`\`
`

const providers = ['OpenAI', 'Claude', 'Ollama', 'Gemini']
</script>

<template>
  <div class="overflow-hidden">
    <!-- ================= Hero ================= -->
    <section class="relative">
      <!-- 背景光斑 -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
        <div class="hero-blob absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-[70%] rounded-full bg-primary/12 blur-3xl" />
        <div class="hero-blob absolute -top-10 right-0 h-[420px] w-[420px] translate-x-1/4 rounded-full bg-muted-foreground/8 blur-3xl" style="animation-delay: -6s" />
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div class="mx-auto max-w-6xl px-4 pb-20 pt-20 text-center md:pt-28">
        <div v-reveal class="mb-6 flex justify-center">
          <Chip variant="outline" round :suffix-icon="rocketIcon" class="gap-1.5 !px-3 !py-1">
            v{{ latest.version }} · {{ latest.date }} 已发布
          </Chip>
        </div>

        <h1 v-reveal="80" class="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          <span class="hero-title-gradient">用 Go 编写</span>
          <br />
          的 AI 编程助手
        </h1>

        <p v-reveal="140" class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          单二进制、静态编译、跨平台。无需 Node 环境，自带 Web 界面与全部文档，
          支持多 AI 提供商、工具调用、子代理、代码审计。
        </p>

        <div v-reveal="200" class="mt-9 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink to="/docs/quickstart/install">
            <Button variant="primary" size="lg" round :icon="rocketIcon">
              快速开始
            </Button>
          </NuxtLink>
          <a href="https://github.com/li63050a/licode" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" round :icon="githubIcon">
              GitHub
            </Button>
          </a>
        </div>

        <!-- 快速开始代码 -->
        <div v-reveal="260" class="mx-auto mt-14 max-w-2xl text-left">
          <Card variant="default" shadow="lg" bordered padding="none" class="overflow-hidden">
            <div class="flex items-center justify-between border-b border-border px-4 py-2.5">
              <div class="flex items-center gap-1.5">
                <span class="h-3 w-3 rounded-full bg-red-400/80" />
                <span class="h-3 w-3 rounded-full bg-amber-400/80" />
                <span class="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <span class="font-mono text-xs text-muted-foreground">terminal — licode</span>
            </div>
            <MarkdownRenderer :markdown="quickstart" />
          </Card>
        </div>
      </div>
    </section>

    <!-- ================= 特性 ================= -->
    <section class="mx-auto max-w-6xl px-4 py-16">
      <div v-reveal class="mb-10 text-center">
        <h2 class="text-2xl font-bold tracking-tight md:text-3xl">开箱即用的核心能力</h2>
        <p class="mt-3 text-muted-foreground">面向独立开发者的全栈 AI 编码助手</p>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="(f, i) in features"
          :key="f.title"
          v-reveal="i * 70"
          :to="f.link"
          class="block"
        >
          <Card
            variant="default"
            bordered
            padding="md"
            hover-shadow
            interactive="lift"
            class="feature-card h-full"
          >
            <div class="mb-3 inline-flex rounded-xl bg-primary/10 p-2.5 text-primary">
              <Icon :name="f.icon" class="h-5 w-5" />
            </div>
            <h3 class="text-base font-semibold">{{ f.title }}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">{{ f.desc }}</p>
          </Card>
        </NuxtLink>
      </div>
    </section>

    <!-- ================= 提供商 ================= -->
    <section class="border-y border-border bg-secondary/40 py-14">
      <div class="mx-auto max-w-6xl px-4 text-center">
        <p v-reveal class="text-sm uppercase tracking-widest text-muted-foreground">支持主流 AI 提供商</p>
        <div v-reveal="80" class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Chip v-for="p in providers" :key="p" size="lg" variant="secondary" round class="!px-4 !py-1.5 text-sm font-medium">
            {{ p }}
          </Chip>
        </div>
        <p v-reveal="140" class="mt-5 text-sm text-muted-foreground">
          亦支持任意 OpenAI / Anthropic 兼容接口，配置好地址即可切换
        </p>
      </div>
    </section>

    <!-- ================= 亮点 ================= -->
    <section class="mx-auto max-w-6xl px-4 py-16">
      <div class="grid gap-5 md:grid-cols-3">
        <div v-reveal class="rounded-2xl border border-border bg-background p-6">
          <h3 class="flex items-center gap-2 font-semibold">
            <span class="text-primary">◈</span> 单二进制 · 零依赖
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            前端资源全部内嵌，约 7MB，不依赖 glibc，拷贝即用。
          </p>
        </div>
        <div v-reveal="80" class="rounded-2xl border border-border bg-background p-6">
          <h3 class="flex items-center gap-2 font-semibold">
            <span class="text-primary">◈</span> 数据本地
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            会话、配置、索引全部落在本地磁盘，隐私可控，离线可用。
          </p>
        </div>
        <div v-reveal="140" class="rounded-2xl border border-border bg-background p-6">
          <h3 class="flex items-center gap-2 font-semibold">
            <span class="text-primary">◈</span> 可编程扩展
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            MCP / Skills / WASM / 外部工具热加载，能力边界由你定义。
          </p>
        </div>
      </div>
    </section>

    <!-- ================= CTA ================= -->
    <section class="mx-auto max-w-6xl px-4 pb-20">
      <div v-reveal class="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-foreground/8 via-background to-muted-foreground/8 p-10 text-center md:p-16">
        <div class="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <h2 class="text-2xl font-bold tracking-tight md:text-3xl">准备好开始了吗？</h2>
        <p class="mx-auto mt-3 max-w-md text-muted-foreground">
          从「快速开始」出发，5 分钟跑通你的第一个 AI 编码助手。
        </p>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink to="/docs/quickstart/install">
            <Button variant="primary" size="lg" round :icon="rocketIcon">查看文档</Button>
          </NuxtLink>
          <a href="https://github.com/li63050a/licode" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="lg" round>GitHub · Star</Button>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
