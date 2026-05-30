import { useShallow } from 'zustand/react/shallow'
import { useAnalysisStore } from '../store/analysisStore'

export function useAnalysis() {
  return useAnalysisStore(
    useShallow((s) => ({
      query: s.query,
      status: s.status,
      result: s.result,
      error: s.error,
      startAnalysis: s.startAnalysis,
      fetchResults: s.fetchResults,
      reset: s.reset,
    })),
  )
}
