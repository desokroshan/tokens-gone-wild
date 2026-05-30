import type { AnalysisResult } from '../types'

export async function postAnalyze(query: string): Promise<{ jobId: string }> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
  if (!res.ok) throw new Error('Failed to start analysis')
  return res.json()
}

export async function getResults(jobId: string): Promise<AnalysisResult> {
  const res = await fetch(`/api/results/${jobId}`)
  if (!res.ok) throw new Error(`Analysis failed: ${res.statusText}`)
  return res.json()
}
