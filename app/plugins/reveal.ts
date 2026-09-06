export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding: { value?: number }) {
      if (!import.meta.client) return
      el.classList.add('reveal')
      if (binding.value) {
        el.style.transitionDelay = `${binding.value}ms`
      }
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            io.disconnect()
          }
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })
      io.observe(el)
      ;(el as HTMLElement & { __revealIO?: IntersectionObserver }).__revealIO = io
    },
    unmounted(el: HTMLElement) {
      ;(el as HTMLElement & { __revealIO?: IntersectionObserver }).__revealIO?.disconnect()
    },
  })
})
