import type { AnalysisResult } from '../types'

function formatRoadmapMarkdown(result: AnalysisResult): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const sections = [
    { priority: 'P1' as const, label: 'Must Build — Critical' },
    { priority: 'P2' as const, label: 'Should Build — High Value' },
    { priority: 'P3' as const, label: 'Nice to Have — Opportunistic' },
  ]

  const body = sections.map(({ priority, label }) => {
    const items = result.roadmap.filter((r) => r.priority === priority)
    if (!items.length) return ''

    const rows = items.map((item) =>
      [
        `### ${item.title}`,
        `**Impact:** ${item.impact} | **Effort:** ${item.effort} | **Discussion share:** ${item.percentage}%`,
        '',
        item.reason,
      ].join('\n')
    )

    return [`## ${priority} — ${label}`, '', ...rows].join('\n\n')
  })

  return [
    `# Product Roadmap: ${result.query}`,
    `_Generated ${date} by CPO.ai_`,
    '',
    '---',
    '',
    ...body.filter(Boolean),
  ].join('\n\n')
}

export interface BoxUploadResult {
  fileId: string
  fileName: string
  url: string
}

export async function uploadRoadmapToBox(result: AnalysisResult): Promise<BoxUploadResult> {
  const productSlug = result.query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 40)
  const filename = `${productSlug}-roadmap.md`
  const content = formatRoadmapMarkdown(result)

  const res = await fetch('/api/box-upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, filename }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? `Upload failed (${res.status})`)

  return data as BoxUploadResult
}
