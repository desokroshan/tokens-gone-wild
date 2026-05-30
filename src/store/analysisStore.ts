import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AnalysisResult } from '../types'
import { postAnalyze, getResults } from '../api/client'

type Status = 'idle' | 'submitting' | 'loading' | 'done' | 'error'

interface AnalysisState {
  query: string
  jobId: string | null
  status: Status
  result: AnalysisResult | null
  error: string | null
  setQuery: (q: string) => void
  startAnalysis: (query: string) => Promise<string>
  fetchResults: (jobId: string) => Promise<void>
  reset: () => void
}

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set) => ({
      query: '',
      jobId: null,
      status: 'idle',
      result: null,
      error: null,

      setQuery: (q) => set({ query: q }),

      startAnalysis: async (query) => {
        set({ status: 'submitting', query, error: null })
        const { jobId } = await postAnalyze(query)
        set({ jobId, status: 'loading' })
        return jobId
      },

      fetchResults: async (jobId) => {
        try {
          const result = await getResults(jobId)
          set({ result: { ...result, query: useAnalysisStore.getState().query }, status: 'done' })
        } catch (e) {
          set({ status: 'error', error: e instanceof Error ? e.message : 'Unknown error' })
        }
      },

      reset: () => set({ query: '', jobId: null, status: 'idle', result: null, error: null }),
    }),
    {
      name: 'cpo-ai-analysis',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ query: s.query, result: s.result }),
    },
  ),
)
