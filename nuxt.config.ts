import tailwindcss from '@tailwindcss/vite'
import { docsData } from './app/data/docs'

const docRoutes = docsData.flatMap(cat => cat.children.map(d => `/docs/${cat.id}/${d.id}`))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-30',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: 'licode — AI 编程助手',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '用 Go 编写的 AI 编程助手，单二进制、静态编译、跨平台。支持多 AI 提供商、工具调用、子代理系统、代码审计等能力。' },
        { name: 'theme-color', content: '#18181b' },
        { property: 'og:title', content: 'licode — AI 编程助手' },
        { property: 'og:description', content: '用 Go 编写的 AI 编程助手，单二进制、静态编译、跨平台。' },
        { property: 'og:type', content: 'website' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('licode_theme');var d=t?t==='dark':(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',!!d)}catch(e){}})()`,
          tagPosition: 'head',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog', '/community', '/docs', ...docRoutes],
    },
  },
})
