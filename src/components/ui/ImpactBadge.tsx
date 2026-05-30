import type { ImpactEffort, ThreatLevel } from '../../types'

const IMPACT_CONFIG: Record<ImpactEffort, { bg: string; text: string }> = {
  High:   { bg: 'rgba(124,58,237,0.2)',  text: '#a78bfa' },
  Medium: { bg: 'rgba(37,99,235,0.2)',   text: '#60a5fa' },
  Low:    { bg: 'rgba(100,116,139,0.2)', text: '#94a3b8' },
}

const THREAT_CONFIG: Record<ThreatLevel, { bg: string; text: string }> = {
  high:   { bg: 'rgba(239,68,68,0.15)',  text: '#f87171' },
  medium: { bg: 'rgba(234,179,8,0.15)',  text: '#facc15' },
  low:    { bg: 'rgba(34,197,94,0.15)',  text: '#4ade80' },
}

interface ImpactBadgeProps {
  type: 'impact' | 'effort'
  value: ImpactEffort
}

interface ThreatBadgeProps {
  level: ThreatLevel
}

export function ImpactBadge({ type, value }: ImpactBadgeProps) {
  const { bg, text } = IMPACT_CONFIG[value]
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
      style={{ background: bg, color: text }}
    >
      {type === 'impact' ? '↑' : '⚙'} {type === 'impact' ? 'Impact' : 'Effort'}: {value}
    </span>
  )
}

export function ThreatBadge({ level }: ThreatBadgeProps) {
  const { bg, text } = THREAT_CONFIG[level]
  const label = level.charAt(0).toUpperCase() + level.slice(1)
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ background: bg, color: text }}
    >
      {label} Threat
    </span>
  )
}
