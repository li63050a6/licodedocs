export interface ChangelogEntry {
  version: string
  date: string
  content: string
}

const modules = import.meta.glob('./*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

// 新增版本：在 changelog 目录新建 <版本号>.md（frontmatter 写 version/date，正文为更新日志 Markdown），
// 无需改动任何代码，构建时自动收录并按日期倒序展示。
export const changelog: ChangelogEntry[] = Object.entries(modules)
  .map(([file, raw]) => {
    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
    const meta = fm?.[1] ?? ''
    const version = /^version:\s*(.+)$/m.exec(meta)?.[1]?.trim() ?? file.match(/([^/\\]+)\.md$/)?.[1] ?? ''
    const date = /^date:\s*(.+)$/m.exec(meta)?.[1]?.trim() ?? ''
    const content = fm ? raw.slice(fm[0].length).trim() : raw.trim()
    return { version, date, content }
  })
  .sort((a, b) => {
    const byDate = b.date.localeCompare(a.date)
    if (byDate !== 0) return byDate
    return b.version.localeCompare(a.version)
  })
