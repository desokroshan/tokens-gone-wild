import { motion } from 'framer-motion'
import type { FeatureRequest } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { AnimatedCounter } from '../ui/AnimatedCounter'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
}

export function FeatureRequestsCard({ featureRequests }: { featureRequests: FeatureRequest[] }) {
  return (
    <GlassCard className="flex flex-col">
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <h2 className="font-semibold text-white text-sm tracking-tight">Feature requests</h2>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md"
          style={{ background: 'rgba(201,140,46,0.12)', color: '#e3b264' }}
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
          <motion.li
            key={f.id}
            variants={item}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/[0.025] transition-colors"
          >
            <div
              className="flex-shrink-0 w-11 text-right tabular-nums"
              style={{
                color: i === 0 ? '#e3b264' : i < 3 ? 'rgba(227,178,100,0.65)' : 'rgba(255,255,255,0.25)',
              }}
            >
              <AnimatedCounter value={f.votes} className="text-sm font-semibold" duration={900} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{f.title}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="h-0.5 rounded-full flex-1 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'rgba(201,140,46,0.7)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(f.votes / featureRequests[0].votes) * 100}%` }}
                    transition={{ duration: 0.85, delay: 0.08 * i, ease: 'easeOut' }}
                  />
                </div>
                <span
                  className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)' }}
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
