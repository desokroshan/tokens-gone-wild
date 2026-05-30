import { motion } from 'framer-motion'
import type { Priority, RoadmapItem as RoadmapItemType } from '../../types'
import { RoadmapItem } from './RoadmapItem'
import { PriorityBadge } from './PriorityBadge'

const COLUMN_META: Record<Priority, { label: string; accent: string; bg: string }> = {
  P1: { label: 'Must build',    accent: '#c25252', bg: 'rgba(194,82,82,0.03)' },
  P2: { label: 'Should build',  accent: '#c98c2e', bg: 'rgba(201,140,46,0.03)' },
  P3: { label: 'Nice to have',  accent: '#3d9680', bg: 'rgba(61,150,128,0.03)' },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32 } },
}

interface RoadmapColumnProps {
  priority: Priority
  items: RoadmapItemType[]
}

export function RoadmapColumn({ priority, items }: RoadmapColumnProps) {
  const { label, accent, bg } = COLUMN_META[priority]

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{ background: bg, border: `1px solid ${accent}18` }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3.5"
        style={{ borderBottom: `1px solid ${accent}18` }}
      >
        <PriorityBadge priority={priority} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">{priority}</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</span>
          </div>
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md"
          style={{ background: `${accent}18`, color: accent }}
        >
          {items.length}
        </span>
      </div>

      <motion.div
        className="flex flex-col gap-3 p-3 flex-1"
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
