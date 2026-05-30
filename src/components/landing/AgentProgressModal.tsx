import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnalysis } from '../../hooks/useAnalysis'

const ITEM_INTERVAL = 2200
const COLUMN_STAGGER = 3000

const COLUMNS = [
  {
    title: 'Sentiment Analysis',
    accent: '#6366f1',
    accentBg: 'rgba(99,102,241,0.08)',
    accentBorder: 'rgba(99,102,241,0.3)',
    items: [
      'Scanning Reddit, Twitter & G2 reviews',
      'Extracting emotional signals with NLP',
      'Classifying positive / neutral / negative tones',
      'Detecting trending pain points',
      'Generating sentiment summary',
    ],
  },
  {
    title: 'Product Positioning',
    accent: '#c98c2e',
    accentBg: 'rgba(201,140,46,0.08)',
    accentBorder: 'rgba(201,140,46,0.3)',
    items: [
      'Identifying competitor landscape',
      'Mapping feature differentiators',
      'Scoring market positioning gaps',
      'Analyzing pricing & value perception',
      'Building competitive matrix',
    ],
  },
  {
    title: 'Potential Opportunities',
    accent: '#10b981',
    accentBg: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.3)',
    items: [
      'Clustering user feature requests',
      'Calculating business impact scores',
      'Estimating development effort',
      'Prioritizing by ROI potential',
      'Generating opportunity roadmap',
    ],
  },
]

const TOTAL_ITEMS = COLUMNS.reduce((s, c) => s + c.items.length, 0)

interface AgentProgressModalProps {
  visible: boolean
  onComplete?: () => void
}

function Spinner({ color }: { color: string }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
      style={{ flexShrink: 0 }}
    >
      <circle cx="7" cy="7" r="5.5" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.18" />
      <path d="M 7 1.5 A 5.5 5.5 0 0 1 12.5 7" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  )
}

function Checkmark({ color }: { color: string }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      style={{ flexShrink: 0 }}
    >
      <circle cx="7" cy="7" r="6" fill={color} fillOpacity="0.14" />
      <path d="M 3.5 7 L 5.8 9.5 L 10.5 4.5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

function AgentColumn({
  col,
  step,
  started,
}: {
  col: (typeof COLUMNS)[0]
  step: number
  started: boolean
}) {
  const isDone = step >= col.items.length

  return (
    <div
      className="flex-1 flex flex-col rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderTop: `2px solid ${col.accent}`,
      }}
    >
      {/* Column header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2.5">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: col.accent }}
            animate={isDone ? { boxShadow: [`0 0 0px ${col.accent}`, `0 0 10px ${col.accent}`, `0 0 4px ${col.accent}`] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.82)' }}>
            {col.title}
          </span>
        </div>
        <AnimatePresence>
          {isDone && (
            <motion.span
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                background: col.accentBg,
                border: `1px solid ${col.accentBorder}`,
                color: col.accent,
              }}
            >
              Complete
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Items */}
      <div className="px-5 py-4 flex flex-col gap-3.5">
        {col.items.map((item, i) => {
          // step = number of completed items; item[step] is currently processing
          const isActive = started && !isDone && i === step
          const isDoneItem = i < step

          return (
            <AnimatePresence key={item} mode="wait">
              {isActive ? (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5"
                >
                  <Spinner color={col.accent} />
                  <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.88)' }}>
                    {item}
                  </span>
                </motion.div>
              ) : isDoneItem ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2.5"
                >
                  <Checkmark color={col.accent} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {item}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="pending"
                  className="flex items-center gap-2.5"
                  style={{ opacity: 0.18 }}
                >
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{ width: 14, height: 14, border: '1px solid rgba(255,255,255,0.18)' }}
                  />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {item}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          )
        })}
      </div>
    </div>
  )
}

export function AgentProgressModal({ visible, onComplete }: AgentProgressModalProps) {
  const [steps, setSteps] = useState([0, 0, 0])
  const [started, setStarted] = useState([false, false, false])
  const { query } = useAnalysis()
  const completedRef = useRef(false)

  useEffect(() => {
    if (!visible) {
      setSteps([0, 0, 0])
      setStarted([false, false, false])
      completedRef.current = false
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    COLUMNS.forEach((col, colIdx) => {
      const colStart = colIdx * COLUMN_STAGGER

      timers.push(
        setTimeout(() => {
          setStarted((prev) => {
            const next = [...prev]
            next[colIdx] = true
            return next
          })
        }, colStart)
      )

      col.items.forEach((_, itemIdx) => {
        // Each item takes ITEM_INTERVAL to "complete"; fire after the interval
        timers.push(
          setTimeout(() => {
            setSteps((prev) => {
              const next = [...prev]
              next[colIdx] = itemIdx + 1
              return next
            })
          }, colStart + (itemIdx + 1) * ITEM_INTERVAL)
        )
      })
    })

    return () => timers.forEach(clearTimeout)
  }, [visible])

  useEffect(() => {
    if (!visible || completedRef.current) return
    const allDone = steps.every((s, i) => s >= COLUMNS[i].items.length)
    if (allDone) {
      completedRef.current = true
      onComplete?.()
    }
  }, [steps, visible, onComplete])

  if (!visible) return null

  const completedItems = steps.reduce((s, n) => s + n, 0)
  const progress = (completedItems / TOTAL_ITEMS) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'rgba(12,11,9,0.96)', backdropFilter: 'blur(12px)' }}
    >
      <div className="w-full max-w-5xl flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-widest font-medium mb-2"
            style={{ color: 'rgba(255,255,255,0.28)' }}
          >
            Running agents
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-xl font-semibold"
            style={{ color: 'rgba(255,255,255,0.82)' }}
          >
            {query ? `Analyzing "${query}"` : 'Analyzing…'}
          </motion.h2>
        </div>

        {/* Three columns */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex gap-4"
        >
          {COLUMNS.map((col, i) => (
            <AgentColumn key={col.title} col={col} step={steps[i]} started={started[i]} />
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div
            className="h-px rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #6366f1 0%, #c98c2e 50%, #10b981 100%)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Processing
            </span>
            <span className="text-xs tabular-nums" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {completedItems} / {TOTAL_ITEMS}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
