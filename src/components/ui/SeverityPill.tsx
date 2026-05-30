import type { Severity } from '../../types'

const CONFIG: Record<Severity, { label: string; bg: string; text: string; dot: string }> = {
  critical: { label: 'Critical', bg: 'rgba(239,68,68,0.15)', text: '#f87171', dot: '#ef4444' },
  high:     { label: 'High',     bg: 'rgba(249,115,22,0.15)', text: '#fb923c', dot: '#f97316' },
  medium:   { label: 'Medium',   bg: 'rgba(234,179,8,0.15)',  text: '#facc15', dot: '#eab308' },
  low:      { label: 'Low',      bg: 'rgba(34,197,94,0.15)',  text: '#4ade80', dot: '#22c55e' },
}

export function SeverityPill({ severity }: { severity: Severity }) {
  const { label, bg, text, dot } = CONFIG[severity]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
      style={{ background: bg, color: text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
      {label}
    </span>
  )
}
