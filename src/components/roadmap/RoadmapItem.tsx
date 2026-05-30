import { motion } from 'framer-motion'
import type { RoadmapItem as RoadmapItemType } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { ImpactBadge } from '../ui/ImpactBadge'

export function RoadmapItem({ item }: { item: RoadmapItemType }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{ cursor: 'default' }}
    >
      <GlassCard
        className="p-5 flex flex-col gap-3"
        style={{
          transition: 'box-shadow 0.2s',
        }}
      >
        {/* Title */}
        <h3 className="text-sm font-semibold text-white leading-snug">{item.title}</h3>

        {/* Reason */}
        <p className="text-xs text-white/40 leading-relaxed">{item.reason}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <ImpactBadge type="impact" value={item.impact} />
          <ImpactBadge type="effort" value={item.effort} />
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-white/25">Discussion share</span>
            <span className="text-xs font-medium text-white/50">{item.percentage}%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
              initial={{ width: 0 }}
              animate={{ width: `${item.percentage}%` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
