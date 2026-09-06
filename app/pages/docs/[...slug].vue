<script setup lang="ts">
import { Button, Empty } from 'fuxsto-design'
import { useDocs } from '~/composables/useDocs'
import MarkdownRenderer from '~/components/MarkdownRenderer.vue'

const route = useRoute()
const { findDoc, firstDoc, prevNext } = useDocs()

const slug = computed(() => (route.params.slug ?? []) as string[])

const current = computed(() => {
  const [catId, docId] = slug.value
  if (catId && docId) {
    return findDoc(catId, docId)
  }
  return null
})

const nav = computed(() =>
  current.value ? prevNext(current.value.cat.id, current.value.doc.id) : { prev: null, next: null },
)

useHead(() => ({
  title: current.value ? `${current.value.doc.title} · licode 文档` : '文档 · licode',
}))

onMounted(() => {
  if (slug.value.length === 0) {
    const first = firstDoc()
    navigateTo(`/docs/${first.cat.id}/${first.doc.id}`, { replace: true })
  }
})
</script>

<template>
  <div class="mx-auto flex w-full max-w-6xl flex-col md:flex-row">
    <!-- 侧边栏 -->
    <aside class="w-full shrink-0 border-b border-border bg-background md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-64 md:overflow-y-auto md:border-b-0 md:border-r">
      <DocsSidebar />
    </aside>

    <!-- 内容区 -->
    <article class="min-w-0 flex-1 px-4 py-8 md:px-10">
      <Transition name="doc" mode="out-in">
        <div v-if="current" :key="current.doc.id" class="mx-auto max-w-3xl">
          <MarkdownRenderer :markdown="current.doc.content" />

          <nav class="mt-14 flex items-stretch justify-between gap-4 border-t border-border pt-6">
            <NuxtLink
              v-if="nav.prev"
              :to="`/docs/${nav.prev.cat.id}/${nav.prev.doc.id}`"
              class="group flex max-w-[48%] flex-col gap-1 rounded-xl border border-border p-3.5 transition-all hover:border-primary hover:shadow-sm"
            >
              <span class="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="lucide:arrow-left" class="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                上一篇
              </span>
              <span class="truncate text-sm font-medium">{{ nav.prev.doc.title }}</span>
            </NuxtLink>
            <span v-else />

            <NuxtLink
              v-if="nav.next"
              :to="`/docs/${nav.next.cat.id}/${nav.next.doc.id}`"
              class="group flex max-w-[48%] flex-col items-end gap-1 rounded-xl border border-border p-3.5 text-right transition-all hover:border-primary hover:shadow-sm"
            >
              <span class="flex items-center gap-1 text-xs text-muted-foreground">
                下一篇
                <Icon name="lucide:arrow-right" class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span class="truncate text-sm font-medium">{{ nav.next.doc.title }}</span>
            </NuxtLink>
            <span v-else />
          </nav>
        </div>

        <div v-else class="flex items-center justify-center py-24">
          <Empty title="文档不存在" description="该页面可能已被移除，请从左侧选择文档">
            <template #extra>
              <Button
                variant="outline"
                :icon="iconify('lucide:arrow-left')"
                @click="navigateTo(`/docs/${firstDoc().cat.id}/${firstDoc().doc.id}`)"
              >
                返回文档首页
              </Button>
            </template>
          </Empty>
        </div>
      </Transition>
    </article>
  </div>
</template>
