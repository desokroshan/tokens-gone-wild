import type { Priority } from '../../types'

const CONFIG: Record<Priority, { ring: string; text: string; glow: string }> = {
  P1: { ring: '#c25252', text: '#d07878', glow: 'rgba(194,82,82,0.2)' },
  P2: { ring: '#c98c2e', text: '#e3b264', glow: 'rgba(201,140,46,0.2)' },
  P3: { ring: '#3d9680', text: '#6abba0', glow: 'rgba(61,150,128,0.2)' },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { ring, text, glow } = CONFIG[priority]
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
      style={{
        border: `1.5px solid ${ring}`,
        color: text,
        boxShadow: `0 0 10px ${glow}`,
        background: 'rgba(0,0,0,0.25)',
      }}
    >
      {priority}
    </div>
  )
}
