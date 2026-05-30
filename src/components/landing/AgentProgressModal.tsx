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
      style={{ background: 'rgba(12,11,9,0.94)', backdropFilter: 'blur(10px)' }}
    >
      <div className="flex flex-col items-center gap-8 max-w-sm w-full px-8">
        {/* Pulsing dot cluster */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <motion.div
            className="absolute w-16 h-16 rounded-full"
            style={{ background: 'rgba(201,140,46,0.06)', border: '1px solid rgba(201,140,46,0.15)' }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-10 h-10 rounded-full"
            style={{ background: 'rgba(201,140,46,0.1)', border: '1px solid rgba(201,140,46,0.25)' }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <div
            className="w-3.5 h-3.5 rounded-full"
            style={{ background: '#c98c2e', boxShadow: '0 0 14px rgba(201,140,46,0.7)' }}
          />
        </div>

        {/* Step text */}
        <div className="text-center h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.p
                key="done"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-base font-semibold"
                style={{ color: '#c98c2e' }}
              >
                Analysis complete
              </motion.p>
            ) : (
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="text-base font-medium text-center"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                {AGENT_STEPS[step]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#c98c2e' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2.5">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Running agents</span>
            <span className="text-xs tabular-nums" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {step + 1}/{AGENT_STEPS.length}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
