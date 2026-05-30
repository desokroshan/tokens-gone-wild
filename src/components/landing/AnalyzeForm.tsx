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

      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="flex-1 relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Company name or product URL..."
              disabled={isLoading}
              className="w-full px-4 py-3.5 rounded-lg text-white placeholder-white/25 text-sm font-medium outline-none transition-all disabled:opacity-40"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,140,46,0.55)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,140,46,0.08)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={!value.trim() || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all disabled:opacity-35 disabled:cursor-not-allowed"
            style={{
              background: '#c98c2e',
              color: '#0c0b09',
              boxShadow: '0 4px 20px rgba(201,140,46,0.3)',
            }}
          >
            Analyze
          </motion.button>
        </div>

        <p className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Try: "Notion", "Linear", "Figma", or any product URL
        </p>
      </form>
    </>
  )
}
