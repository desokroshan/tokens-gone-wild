import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAnalysis } from '../../hooks/useAnalysis'
import { AgentProgressModal } from './AgentProgressModal'
import { DEMO_LIST } from '../../data/demos'

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

  const handleDemoClick = async (slug: string) => {
    if (isLoading) return
    setValue(slug)
    const jobId = await startAnalysis(slug)
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

        {/* Demo quick-select pills */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Try a demo:
          </span>
          {DEMO_LIST.map((demo) => (
            <motion.button
              key={demo.slug}
              type="button"
              disabled={isLoading}
              onClick={() => handleDemoClick(demo.slug)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(201,140,46,0.1)',
                border: '1px solid rgba(201,140,46,0.25)',
                color: '#e3b264',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,140,46,0.18)'
                e.currentTarget.style.borderColor = 'rgba(201,140,46,0.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(201,140,46,0.1)'
                e.currentTarget.style.borderColor = 'rgba(201,140,46,0.25)'
              }}
            >
              {demo.label}
            </motion.button>
          ))}
        </div>
      </form>
    </>
  )
}
