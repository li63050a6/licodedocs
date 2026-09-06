<script setup lang="ts">
import { BackTop } from 'fuxsto-design'
import { ArrowUp } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { init } = useTheme()
onMounted(init)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground antialiased">
    <NavBar />
    <main class="flex-1 pt-14">
      <slot />
    </main>
    <SiteFooter />
    <ClientOnly>
      <BackTop :right="24" :bottom="72" round shadow="md" :icon="ArrowUp" />
    </ClientOnly>
  </div>
</template>
