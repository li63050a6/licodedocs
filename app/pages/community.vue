<script setup lang="ts">
import { Github, Globe, Mail, MessageCircle, Tv } from 'lucide-vue-next'
import { Card } from 'fuxsto-design'

useHead({
  title: '社区 · licode',
})

const items = [
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/li63050a/licode',
    href: 'https://github.com/li63050a/licode',
    accent: 'bg-foreground/8 text-foreground',
  },
  {
    icon: Globe,
    label: 'Gitee',
    value: 'gitee.com/li63050a/licode',
    href: 'https://gitee.com/li63050a/licode',
    accent: 'bg-foreground/8 text-foreground',
  },
  {
    icon: Tv,
    label: 'B 站',
    value: '小帅5656 — 关注获取最新动态、教程、演示',
    href: 'https://b23.tv/nDqj0DT',
    accent: 'bg-foreground/8 text-foreground',
  },
  {
    icon: MessageCircle,
    label: 'QQ 技术交流群',
    value: '群号：1026939741 — 提问、反馈 bug、讨论功能',
    href: 'https://qun.qq.com/universal-share/share?ac=1&authKey=zq9BYcTtBQm6GbvWiEWiBvDWNWbqhw2%2F%2BRnGM21c0jcL%2FofGqBFeXLr%2BtYT3SkO6&busi_data=eyJncm91cENvZGUiOiIxMDI2OTM5NzQxIiwidG9rZW4iOiJxNkNWUTUxYXVxSmRHZXRvdWtkZnhaN25INzJrMmNaNFpVTjJ5ZTVLYmRvWTFuOEZTd093UXBtQi8vQWk2T1JyIiwidWluIjoiMzYzNTczNjE4MCJ9&data=073ZrPEFZXFvoEDWatbWTidAitiN4OIbiaVDWoR7hVIwJurEPC7Swm6OREVpn6omzobXLn3SRErNKxKbYDTZQA&svctype=4&tempid=h5_group_info',
    accent: 'bg-foreground/8 text-foreground',
  },
  {
    icon: Mail,
    label: '开发者邮箱',
    value: 'li63050@qq.com',
    href: 'mailto:li63050@qq.com',
    accent: 'bg-foreground/8 text-foreground',
  },
]
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-14">
    <header v-reveal class="mb-12 text-center">
      <h1 class="text-3xl font-bold tracking-tight">联系与交流</h1>
      <p class="mt-3 text-muted-foreground">反馈问题、参与讨论、获取最新动态</p>
    </header>

    <div class="grid gap-4 sm:grid-cols-2">
      <a
        v-for="(item, i) in items"
        :key="item.label"
        v-reveal="i * 60"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        class="block"
      >
        <Card
          variant="default"
          bordered
          padding="md"
          hover-shadow
          interactive="lift"
          class="group flex h-full items-center gap-4 transition-colors"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
            :class="item.accent"
          >
            <component :is="item.icon" class="h-5 w-5" />
          </div>
          <div class="min-w-0">
            <div class="font-semibold">{{ item.label }}</div>
            <div class="mt-0.5 truncate text-sm text-muted-foreground">{{ item.value }}</div>
          </div>
        </Card>
      </a>
    </div>
  </div>
</template>
