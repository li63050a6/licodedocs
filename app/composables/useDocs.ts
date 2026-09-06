import { marked } from 'marked'
import { docsData } from '~/data/docs'
import type { DocCategory, DocChild } from '~/data/docs'
import { changelog } from '~/data/changelog'

marked.setOptions({ gfm: true, breaks: true })

export interface DocRef {
  cat: DocCategory
  doc: DocChild
}

export interface SearchResult extends DocRef {
  snippet: string
}

export const useDocs = () => {
  const findDoc = (catId: string, docId: string): DocRef | null => {
    const cat = docsData.find(c => c.id === catId)
    if (!cat) return null
    const doc = cat.children.find(d => d.id === docId)
    return doc ? { cat, doc } : null
  }

  const firstDoc = (): DocRef => ({ cat: docsData[0]!, doc: docsData[0]!.children[0]! })

  const flatDocs = (): DocRef[] => docsData.flatMap(cat => cat.children.map(doc => ({ cat, doc })))

  const renderMarkdown = (md: string): string =>
    marked.parse(md, { async: false }) as string

  const stripMd = (md: string): string =>
    md
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[#>*\-\[\]()|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

  const searchDocs = (q: string): SearchResult[] => {
    const query = q.trim().toLowerCase()
    if (!query) return []
    const results: SearchResult[] = []
    for (const ref of flatDocs()) {
      const title = ref.doc.title.toLowerCase()
      const text = stripMd(ref.doc.content).toLowerCase()
      if (!title.includes(query) && !text.includes(query)) continue
      let snippet = ''
      const idx = text.indexOf(query)
      if (idx >= 0) {
        const start = Math.max(0, idx - 24)
        snippet = (start > 0 ? '…' : '') + text.slice(start, idx + query.length + 42) + '…'
      }
      results.push({ ...ref, snippet })
    }
    return results
  }

  const prevNext = (catId: string, docId: string) => {
    const flat = flatDocs()
    const idx = flat.findIndex(f => f.cat.id === catId && f.doc.id === docId)
    return {
      prev: idx > 0 ? flat[idx - 1]! : null,
      next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1]! : null,
    }
  }

  return { docsData, changelog, findDoc, firstDoc, flatDocs, renderMarkdown, searchDocs, prevNext }
}
