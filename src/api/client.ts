import type { AnalysisResult } from '../types'
import { MOCK_RESULT } from './mock'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// POST /api/analyze
export async function postAnalyze(query: string): Promise<{ jobId: string }> {
  await delay(300)
  // Production: return fetch('/api/analyze', { method: 'POST', body: JSON.stringify({ query }) }).then(r => r.json())
  return { jobId: 'mock-job-123' }
}

// GET /api/results/:jobId
// Production: poll until status === 'complete', or consume SSE stream from Strands backend
export async function getResults(_jobId: string): Promise<AnalysisResult> {
  await delay(4200)
  return { ...MOCK_RESULT }
}
