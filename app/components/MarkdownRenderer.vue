<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useDocs } from '~/composables/useDocs'

const props = defineProps<{ markdown: string }>()

const { renderMarkdown } = useDocs()
const html = computed(() => renderMarkdown(props.markdown))
const root = ref<HTMLElement | null>(null)

const COPY_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`
const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`

const enhance = () => {
  if (!root.value) return
  root.value.querySelectorAll<HTMLPreElement>('pre').forEach((pre) => {
    if (pre.dataset.enhanced) return
    pre.dataset.enhanced = 'true'

    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'copy-btn'
    btn.setAttribute('aria-label', '复制代码')
    btn.innerHTML = COPY_ICON

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.innerText ?? ''
      try {
        await navigator.clipboard.writeText(code)
      } catch { /* ignore */ }
      btn.innerHTML = CHECK_ICON
      btn.classList.add('copy-done')
      window.setTimeout(() => {
        btn.classList.remove('copy-done')
        btn.innerHTML = COPY_ICON
      }, 1500)
    })

    pre.appendChild(btn)
  })
}

onMounted(enhance)
watch(html, () => nextTick(enhance))
</script>

<template>
  <div ref="root" class="md max-w-none" v-html="html" />
</template>
