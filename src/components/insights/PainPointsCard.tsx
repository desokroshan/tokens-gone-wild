import { motion } from 'framer-motion'
import type { PainPoint } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { SeverityPill } from '../ui/SeverityPill'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
}

export function PainPointsCard({ painPoints }: { painPoints: PainPoint[] }) {
  return (
    <GlassCard className="flex flex-col">
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <h2 className="font-semibold text-white text-sm tracking-tight">Top pain points</h2>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md"
          style={{ background: 'rgba(220,60,60,0.12)', color: '#e07070' }}
        >
          {painPoints.length} issues
        </span>
      </div>

      <motion.ul
        className="px-2 py-2 overflow-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {painPoints.map((p) => (
          <motion.li
            key={p.id}
            variants={item}
            className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-white/[0.025] transition-colors"
          >
            <SeverityPill severity={p.severity} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white leading-snug">{p.title}</p>
              <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {p.description}
              </p>
            </div>
            <span
              className="text-xs whitespace-nowrap flex-shrink-0 mt-0.5 tabular-nums"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {p.frequency.toLocaleString()}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </GlassCard>
  )
}
