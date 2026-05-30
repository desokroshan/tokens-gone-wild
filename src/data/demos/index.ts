import type { AnalysisResult } from '../../types'
import notionData from './notion.json'
import kiroData from './kiro.json'
import siriData from './siri.json'

export interface DemoMeta {
  slug: string
  label: string
  description: string
}

const DEMOS: Record<string, AnalysisResult & DemoMeta> = {
  notion: notionData as unknown as AnalysisResult & DemoMeta,
  kiro: kiroData as unknown as AnalysisResult & DemoMeta,
  siri: siriData as unknown as AnalysisResult & DemoMeta,
}

export const DEMO_LIST: DemoMeta[] = [
  { slug: 'kiro', label: 'Kiro', description: 'Amazon\'s AI-native IDE' },
  { slug: 'notion', label: 'Notion', description: 'All-in-one workspace & docs' },
  { slug: 'siri', label: 'Siri', description: 'Apple\'s voice assistant' },
]

export function getDemoByQuery(query: string): { slug: string; data: AnalysisResult } | null {
  const normalized = query.trim().toLowerCase()
  const match = Object.entries(DEMOS).find(([slug, demo]) =>
    slug === normalized || demo.label.toLowerCase() === normalized
  )
  if (!match) return null
  const [slug, data] = match
  return { slug, data: { ...data, query: data.label } }
}
