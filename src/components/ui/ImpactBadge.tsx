import type { ImpactEffort, ThreatLevel } from '../../types'

const IMPACT_CONFIG: Record<ImpactEffort, { bg: string; text: string }> = {
  High:   { bg: 'rgba(201,140,46,0.15)', text: '#e3b264' },
  Medium: { bg: 'rgba(180,160,110,0.12)', text: 'rgba(255,255,255,0.55)' },
  Low:    { bg: 'rgba(120,120,120,0.12)', text: 'rgba(255,255,255,0.35)' },
}

const THREAT_CONFIG: Record<ThreatLevel, { bg: string; text: string }> = {
  high:   { bg: 'rgba(194,82,82,0.12)',  text: '#d07878' },
  medium: { bg: 'rgba(184,144,64,0.12)', text: '#c8a85a' },
  low:    { bg: 'rgba(74,148,112,0.12)', text: '#7ac09a' },
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
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
      style={{ background: bg, color: text }}
    >
      {label} threat
    </span>
  )
}
