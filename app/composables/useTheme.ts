import { ref } from 'vue'

const THEME_KEY = 'licode_theme'
const theme = ref<'light' | 'dark'>('light')

export const useTheme = () => {
  const apply = (t: 'light' | 'dark') => {
    theme.value = t
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', t === 'dark')
      try {
        localStorage.setItem(THEME_KEY, t)
      } catch { /* ignore */ }
    }
  }

  const init = () => {
    if (!import.meta.client) return
    let saved: string | null = null
    try {
      saved = localStorage.getItem(THEME_KEY)
    } catch { /* ignore */ }
    const t = saved === 'light' || saved === 'dark'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    apply(t)
  }

  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')

  return { theme, init, apply, toggle }
}
