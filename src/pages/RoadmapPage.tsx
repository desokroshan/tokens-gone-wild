import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAnalysis } from '../hooks/useAnalysis'
import { RoadmapColumn } from '../components/roadmap/RoadmapColumn'
import type { Priority, RoadmapItem } from '../types'

const PRIORITIES: Priority[] = ['P1', 'P2', 'P3']

export function RoadmapPage() {
  const { result, query } = useAnalysis()

  const grouped = PRIORITIES.reduce<Record<Priority, RoadmapItem[]>>(
    (acc, p) => ({ ...acc, [p]: [] }),
    {} as Record<Priority, RoadmapItem[]>,
  )

  result?.roadmap.forEach((item) => grouped[item.priority].push(item))

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link to="/insights" className="text-xs text-white/30 hover:text-white/60 transition-colors no-underline">
              ← Insights
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white">Product Roadmap</h1>
          <p className="text-sm text-white/40 mt-1">
            AI-generated priorities for{' '}
            <span className="text-white/60 font-medium">{query || result?.query}</span> based on{' '}
            {result?.roadmap.length} opportunities identified
          </p>
        </div>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium"
          style={{
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.25)',
            color: '#a78bfa',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Prioritized by impact × reach
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-6 mb-6"
      >
        {[
          { color: '#ef4444', label: 'P1 — Critical / Must Build' },
          { color: '#f59e0b', label: 'P2 — High Value / Should Build' },
          { color: '#0ea5e9', label: 'P3 — Opportunistic / Nice to Have' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-xs text-white/40">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Kanban columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {PRIORITIES.map((p) => (
          <RoadmapColumn key={p} priority={p} items={grouped[p]} />
        ))}
      </motion.div>
    </div>
  )
}
