import { clsx } from 'clsx'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function GlassCard({ children, className, style }: GlassCardProps) {
  return (
    <div
      className={clsx('rounded-2xl overflow-hidden', className)}
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
