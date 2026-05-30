import type { Severity } from '../../types'

const CONFIG: Record<Severity, { label: string; bg: string; text: string; dot: string }> = {
  critical: { label: 'Critical', bg: 'rgba(194,82,82,0.14)',  text: '#d07878', dot: '#c25252' },
  high:     { label: 'High',     bg: 'rgba(194,120,60,0.14)', text: '#d09060', dot: '#c07040' },
  medium:   { label: 'Medium',   bg: 'rgba(184,144,64,0.14)', text: '#c8a85a', dot: '#b89040' },
  low:      { label: 'Low',      bg: 'rgba(74,148,112,0.14)', text: '#7ac09a', dot: '#4a9470' },
}

export function SeverityPill({ severity }: { severity: Severity }) {
  const { label, bg, text, dot } = CONFIG[severity]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap"
      style={{ background: bg, color: text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
      {label}
    </span>
  )
}
