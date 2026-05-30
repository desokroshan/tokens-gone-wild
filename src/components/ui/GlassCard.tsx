import { clsx } from 'clsx'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function GlassCard({ children, className, style }: GlassCardProps) {
  return (
    <div
      className={clsx('rounded-xl overflow-hidden', className)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.07)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
