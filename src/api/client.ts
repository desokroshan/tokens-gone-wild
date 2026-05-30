import type { AnalysisResult } from '../types'
import { getDemoByQuery } from '../data/demos'
import { MOCK_RESULT } from './mock'

// Set VITE_USE_REAL_API=true in .env to call the live backend instead of demo data
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// ── Mock ───────────────────────────────────────────────────────────────────────

async function postAnalyzeMock(query: string): Promise<{ jobId: string }> {
  await delay(300)
  const demo = getDemoByQuery(query)
  return { jobId: demo ? `demo-${demo.slug}` : 'demo-notion' }
}

async function getResultsMock(jobId: string): Promise<AnalysisResult> {
  await delay(20000)
  if (jobId.startsWith('demo-')) {
    const slug = jobId.slice(5)
    const demo = getDemoByQuery(slug)
    if (demo) return demo.data
  }
  return { ...MOCK_RESULT }
}

// ── Real API ───────────────────────────────────────────────────────────────────

async function postAnalyzeReal(query: string): Promise<{ jobId: string }> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) throw new Error('Failed to start analysis')
  return res.json()
}

async function getResultsReal(jobId: string): Promise<AnalysisResult> {
  const res = await fetch(`/api/results/${jobId}`)
  if (!res.ok) throw new Error(`Analysis failed: ${res.statusText}`)
  return res.json()
}

// ── Exports ────────────────────────────────────────────────────────────────────

export const postAnalyze = USE_REAL_API ? postAnalyzeReal : postAnalyzeMock
export const getResults  = USE_REAL_API ? getResultsReal  : getResultsMock
