<script setup lang="ts">
import { Github, Menu, Moon, Sun, X } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { theme, toggle } = useTheme()
const mobileOpen = ref(false)
const route = useRoute()

const links = [
  { to: '/', label: '首页' },
  { to: '/docs/quickstart/install', label: '文档' },
  { to: '/blog', label: '日志' },
  { to: '/community', label: '社区' },
]

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-md">
    <div class="mx-auto flex h-full max-w-6xl items-center gap-2 px-4">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-2 font-bold tracking-tight">
        <LogoIcon :size="22" class="text-primary" />
        <span class="text-foreground">licode</span>
      </NuxtLink>

      <nav class="ml-6 hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="nav-link relative px-3 py-1.5 text-sm transition-colors"
          :class="isActive(l.to)
            ? 'font-medium text-primary'
            : 'text-muted-foreground hover:text-foreground'"
        >
          {{ l.label }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-1.5">
        <button
          class="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
          aria-label="切换主题"
          @click="toggle"
        >
          <Transition name="fade" mode="out-in">
            <Moon v-if="theme === 'dark'" key="moon" class="h-4 w-4" />
            <Sun v-else key="sun" class="h-4 w-4" />
          </Transition>
        </button>

        <a
          href="https://github.com/li63050a/licode"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
          aria-label="GitHub"
        >
          <Github class="h-4 w-4" />
        </a>

        <button
          class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
          aria-label="菜单"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <Transition name="mobnav">
      <nav v-if="mobileOpen" class="border-t border-border bg-background px-4 py-2 md:hidden">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="block rounded-md px-3 py-2.5 text-sm transition-colors"
          :class="isActive(l.to)
            ? 'bg-primary/10 font-medium text-primary'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
          @click="mobileOpen = false"
        >
          {{ l.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.nav-link::after {
  content: "";
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.1rem;
  height: 2px;
  border-radius: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
}
.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}
</style>
