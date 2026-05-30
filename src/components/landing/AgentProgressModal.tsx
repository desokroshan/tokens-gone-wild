import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AGENT_STEPS } from '../../api/mock'

interface AgentProgressModalProps {
  visible: boolean
  onComplete?: () => void
}

export function AgentProgressModal({ visible, onComplete }: AgentProgressModalProps) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!visible) {
      setStep(0)
      setDone(false)
      return
    }

    const STEP_DURATION = 650
    let current = 0

    const interval = setInterval(() => {
      current++
      if (current >= AGENT_STEPS.length) {
        clearInterval(interval)
        setStep(AGENT_STEPS.length - 1)
        setDone(true)
        onComplete?.()
      } else {
        setStep(current)
      }
    }, STEP_DURATION)

    return () => clearInterval(interval)
  }, [visible, onComplete])

  if (!visible) return null

  const progress = ((step + 1) / AGENT_STEPS.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(15,15,26,0.92)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex flex-col items-center gap-8 max-w-lg w-full px-8">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '3px solid rgba(124,58,237,0.2)' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '3px solid transparent',
              borderTopColor: '#7c3aed',
              borderRightColor: '#2563eb',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
          <div
            className="absolute inset-2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent)' }}
          />
        </div>

        {/* Step text */}
        <div className="text-center min-h-[3rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-xl font-semibold"
                style={{ color: '#4ade80' }}
              >
                ✓ Analysis complete
              </motion.p>
            ) : (
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-lg font-medium text-white/90 text-center"
              >
                {AGENT_STEPS[step]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb, #06b6d4)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-white/30">Running AI agents...</span>
            <span className="text-xs text-white/30">
              {step + 1} / {AGENT_STEPS.length}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
