import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAnalysis } from '../../hooks/useAnalysis'
import { AgentProgressModal } from './AgentProgressModal'

export function AnalyzeForm() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const { status, startAnalysis, fetchResults } = useAnalysis()

  const isLoading = status === 'submitting' || status === 'loading'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim() || isLoading) return
    const jobId = await startAnalysis(value.trim())
    fetchResults(jobId)
  }

  useEffect(() => {
    if (status === 'done') {
      navigate('/insights')
    }
  }, [status, navigate])

  return (
    <>
      <AgentProgressModal visible={isLoading} />

      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter company name or product URL..."
              disabled={isLoading}
              className="w-full px-5 py-4 rounded-xl text-white placeholder-white/30 text-base font-medium outline-none transition-all disabled:opacity-50"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.6)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={!value.trim() || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-7 py-4 rounded-xl font-semibold text-white text-base whitespace-nowrap transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              boxShadow: '0 4px 24px rgba(124,58,237,0.4)',
            }}
          >
            Analyze Product
          </motion.button>
        </div>

        <p className="mt-3 text-sm text-white/30 text-center">
          Try: "Notion", "Linear", "Figma", or any product URL
        </p>
      </form>
    </>
  )
}
