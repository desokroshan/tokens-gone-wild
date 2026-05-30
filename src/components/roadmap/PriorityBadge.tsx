import type { Priority } from '../../types'

const CONFIG: Record<Priority, { label: string; ring: string; text: string; glow: string }> = {
  P1: { label: 'P1', ring: '#ef4444', text: '#f87171', glow: 'rgba(239,68,68,0.25)' },
  P2: { label: 'P2', ring: '#f59e0b', text: '#fbbf24', glow: 'rgba(245,158,11,0.25)' },
  P3: { label: 'P3', ring: '#0ea5e9', text: '#38bdf8', glow: 'rgba(14,165,233,0.25)' },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, ring, text, glow } = CONFIG[priority]
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
      style={{
        border: `2px solid ${ring}`,
        color: text,
        boxShadow: `0 0 12px ${glow}`,
        background: `rgba(0,0,0,0.3)`,
      }}
    >
      {label}
    </div>
  )
}
