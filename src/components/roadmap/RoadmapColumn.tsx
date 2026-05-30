import { motion } from 'framer-motion'
import type { Priority, RoadmapItem as RoadmapItemType } from '../../types'
import { RoadmapItem } from './RoadmapItem'
import { PriorityBadge } from './PriorityBadge'

const COLUMN_META: Record<Priority, { label: string; accent: string; bg: string }> = {
  P1: { label: 'Must Build', accent: '#ef4444', bg: 'rgba(239,68,68,0.04)' },
  P2: { label: 'Should Build', accent: '#f59e0b', bg: 'rgba(245,158,11,0.04)' },
  P3: { label: 'Nice to Have', accent: '#0ea5e9', bg: 'rgba(14,165,233,0.04)' },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

interface RoadmapColumnProps {
  priority: Priority
  items: RoadmapItemType[]
}

export function RoadmapColumn({ priority, items }: RoadmapColumnProps) {
  const { label, accent, bg } = COLUMN_META[priority]

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{ background: bg, border: `1px solid ${accent}20` }}
    >
      {/* Column header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: `1px solid ${accent}20` }}
      >
        <PriorityBadge priority={priority} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-base">{priority}</span>
            <span className="text-sm text-white/40">·</span>
            <span className="text-sm text-white/50">{label}</span>
          </div>
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: `${accent}20`, color: accent }}
        >
          {items.length} items
        </span>
      </div>

      {/* Cards */}
      <motion.div
        className="flex flex-col gap-3 p-4 flex-1"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {items.map((item) => (
          <motion.div key={item.id} variants={cardVariant}>
            <RoadmapItem item={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
