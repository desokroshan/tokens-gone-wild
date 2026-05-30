import { GlassCard } from './GlassCard'

export function SkeletonCard({ lines = 4 }: { lines?: number }) {
  return (
    <GlassCard className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 rounded-md w-2/5" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-2.5 rounded w-14 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.05)' }} />
              <div
                className="h-2.5 rounded flex-1"
                style={{ background: 'rgba(255,255,255,0.05)', width: `${60 + (i % 3) * 15}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
