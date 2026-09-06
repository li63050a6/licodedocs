<script setup lang="ts">
import { Timeline, TimelineItem } from 'fuxsto-design'
import { useDocs } from '~/composables/useDocs'
import MarkdownRenderer from '~/components/MarkdownRenderer.vue'

const { changelog } = useDocs()

useHead({
  title: '更新日志 · licode',
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-14">
    <header v-reveal class="mb-12 text-center">
      <h1 class="text-3xl font-bold tracking-tight">更新日志</h1>
      <p class="mt-3 text-muted-foreground">licode 的每一次演进，都在这里</p>
    </header>

    <Timeline animate :delay="60">
      <TimelineItem
        v-for="v in changelog"
        :key="v.version"
        :title="`v${v.version}`"
        :timestamp="v.date"
        status="primary"
      >
        <MarkdownRenderer :markdown="v.content" />
      </TimelineItem>
    </Timeline>
  </div>
</template>
