import { defineComponent, h, resolveComponent } from 'vue'
import type { Component } from 'vue'

export function iconify(name: string): Component {
  return defineComponent({
    name: `Icon_${name.replace(/[^a-z0-9]+/gi, '_')}`,
    inheritAttrs: false,
    setup(_, { attrs }) {
      const Icon = resolveComponent('Icon') as Component
      return () => h(Icon, { name, ...attrs })
    },
  })
}
