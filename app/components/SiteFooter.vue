<script setup lang="ts">
import { Github } from 'lucide-vue-next'
</script>

<template>
  <footer class="border-t border-border bg-background">
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <LogoIcon :size="18" class="text-primary" />
        <span>© {{ new Date().getFullYear() }} licode · 用 Go 编写的 AI 编程助手</span>
      </div>
      <div class="flex items-center gap-5 text-sm">
        <NuxtLink to="/docs/quickstart/install" class="text-muted-foreground transition-colors hover:text-primary">文档</NuxtLink>
        <NuxtLink to="/blog" class="text-muted-foreground transition-colors hover:text-primary">更新日志</NuxtLink>
        <NuxtLink to="/community" class="text-muted-foreground transition-colors hover:text-primary">社区</NuxtLink>
        <a
          href="https://github.com/li63050a/licode"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
        >
          <Github class="h-4 w-4" />
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>
