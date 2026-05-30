import type { AnalysisResult } from '../types'
import { getDemoByQuery } from '../data/demos'
import { MOCK_RESULT } from './mock'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// POST /api/analyze
export async function postAnalyze(query: string): Promise<{ jobId: string }> {
  await delay(300)
  const demo = getDemoByQuery(query)
  const jobId = demo ? `demo-${demo.slug}` : 'demo-notion'
  return { jobId }
}

// GET /api/results/:jobId
export async function getResults(jobId: string): Promise<AnalysisResult> {
  await delay(20000)
  if (jobId.startsWith('demo-')) {
    const slug = jobId.slice(5)
    const demo = getDemoByQuery(slug)
    if (demo) return demo.data
  }
  return { ...MOCK_RESULT }
}
