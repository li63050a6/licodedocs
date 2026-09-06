<script setup lang="ts">
import { Empty, Input } from 'fuxsto-design'
import { useDocs } from '~/composables/useDocs'

const route = useRoute()
const { docsData, searchDocs } = useDocs()

const q = ref('')
const openCats = ref<string[]>([])

const current = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  return { cat: parts[1], doc: parts[2] }
})

const searching = computed(() => q.value.trim().length > 0)
const results = computed(() => searchDocs(q.value))

watch(
  () => current.value.cat,
  (cat) => {
    if (cat && !openCats.value.includes(cat)) {
      openCats.value.push(cat)
    }
  },
  { immediate: true },
)

if (openCats.value.length === 0) {
  openCats.value.push(docsData[0]!.id)
}

const toggle = (id: string) => {
  openCats.value = openCats.value.includes(id)
    ? openCats.value.filter(x => x !== id)
    : [...openCats.value, id]
}
</script>

<template>
  <div class="flex flex-col gap-3 px-3 py-4">
    <div class="px-1">
      <Input
        v-model="q"
        size="sm"
        clearable
        placeholder="搜索文档…"
        :prefix-icon="iconify('lucide:search')"
        class="w-full"
      />
    </div>

    <Transition name="fade" mode="out-in">
      <!-- 搜索结果 -->
      <div v-if="searching" class="px-1">
        <Empty
          v-if="results.length === 0"
          title="未找到相关文档"
          description="换个关键词试试"
          :size="'sm'"
        />
        <ul v-else class="space-y-1">
          <li v-for="r in results" :key="`${r.cat.id}/${r.doc.id}`">
            <NuxtLink
              :to="`/docs/${r.cat.id}/${r.doc.id}`"
              class="block rounded-lg px-3 py-2 transition-colors"
              :class="current.doc === r.doc.id
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
            >
              <div class="truncate text-sm font-medium">{{ r.doc.title }}</div>
              <div class="mt-0.5 line-clamp-1 text-xs opacity-70">{{ r.snippet }}</div>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 目录 -->
      <div v-else class="mt-1 space-y-0.5">
        <div v-for="cat in docsData" :key="cat.id">
          <button
            class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
            :class="current.cat === cat.id ? 'text-primary' : 'text-foreground'"
            @click="toggle(cat.id)"
          >
            <span class="flex items-center gap-2">
              <span class="text-base leading-none">{{ cat.icon }}</span>
              {{ cat.title }}
            </span>
            <Icon
              name="lucide:chevron-down"
              class="h-4 w-4 transition-transform duration-300"
              :class="openCats.includes(cat.id) ? 'rotate-180' : ''"
            />
          </button>

          <div
            class="grid transition-all duration-300 ease-out"
            :class="openCats.includes(cat.id)
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'"
          >
            <div class="min-h-0 overflow-hidden">
              <div class="space-y-0.5 px-2 py-1">
                <NuxtLink
                  v-for="d in cat.children"
                  :key="d.id"
                  :to="`/docs/${cat.id}/${d.id}`"
                  class="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors"
                  :class="current.doc === d.id
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
                >
                  <Icon name="lucide:file-text" class="h-3.5 w-3.5 shrink-0 opacity-60" />
                  <span class="truncate">{{ d.title }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
