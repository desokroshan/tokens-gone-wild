import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Competitor } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { ThreatBadge } from '../ui/ImpactBadge'

function CompetitorRow({ competitor }: { competitor: Competitor }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-white/[0.03] transition-colors"
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(37,99,235,0.4))', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {competitor.name[0]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">{competitor.name}</span>
            <ThreatBadge level={competitor.threat_level} />
          </div>
          <p className="text-xs text-white/40 truncate mt-0.5">{competitor.description}</p>
        </div>

        <motion.span
          className="text-white/30 text-xs flex-shrink-0"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-white/50 leading-relaxed px-4 pt-1 pb-3 ml-11">
              {competitor.comparison}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CompetitorsCard({ competitors }: { competitors: Competitor[] }) {
  return (
    <GlassCard className="flex flex-col">
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 className="font-semibold text-white text-base">Competitive Threats</h2>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171' }}
        >
          {competitors.filter((c) => c.threat_level === 'high').length} high risk
        </span>
      </div>

      <div className="px-2 py-2 space-y-0.5">
        {competitors.map((c) => (
          <CompetitorRow key={c.id} competitor={c} />
        ))}
      </div>
    </GlassCard>
  )
}
