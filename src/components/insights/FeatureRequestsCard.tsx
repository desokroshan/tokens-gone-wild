import { motion } from 'framer-motion'
import type { FeatureRequest } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { AnimatedCounter } from '../ui/AnimatedCounter'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export function FeatureRequestsCard({ featureRequests }: { featureRequests: FeatureRequest[] }) {
  return (
    <GlassCard className="flex flex-col">
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 className="font-semibold text-white text-base">Feature Requests</h2>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}
        >
          {featureRequests.reduce((s, r) => s + r.votes, 0).toLocaleString()} votes
        </span>
      </div>

      <motion.ul
        className="px-2 py-2 overflow-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {featureRequests.map((f, i) => (
          <motion.li key={f.id} variants={item} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors">
            {/* Vote count */}
            <div
              className="flex-shrink-0 w-12 text-right"
              style={{ color: i === 0 ? '#a78bfa' : i < 3 ? '#60a5fa' : 'rgba(255,255,255,0.3)' }}
            >
              <AnimatedCounter
                value={f.votes}
                className="text-sm font-bold tabular-nums"
                duration={900}
              />
            </div>

            {/* Bar */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{f.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1 rounded-full flex-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(f.votes / featureRequests[0].votes) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
                  />
                </div>
                <span
                  className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
                >
                  {f.category}
                </span>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </GlassCard>
  )
}
