import { motion } from 'framer-motion'
import type { RoadmapItem as RoadmapItemType } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { ImpactBadge } from '../ui/ImpactBadge'

export function RoadmapItem({ item }: { item: RoadmapItemType }) {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      style={{ cursor: 'default' }}
    >
      <GlassCard
        className="p-4 flex flex-col gap-3"
        style={{ transition: 'box-shadow 0.18s' }}
      >
        <h3 className="text-sm font-semibold text-white leading-snug">{item.title}</h3>

        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
          {item.reason}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <ImpactBadge type="impact" value={item.impact} />
          <ImpactBadge type="effort" value={item.effort} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>Discussion share</span>
            <span className="text-xs font-medium tabular-nums" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {item.percentage}%
            </span>
          </div>
          <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'rgba(201,140,46,0.65)' }}
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
