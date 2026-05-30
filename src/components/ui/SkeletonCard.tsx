import { GlassCard } from './GlassCard'

export function SkeletonCard({ lines = 4 }: { lines?: number }) {
  return (
    <GlassCard className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-5 rounded-lg w-2/5" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 rounded w-16 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div
                className="h-3 rounded flex-1"
                style={{ background: 'rgba(255,255,255,0.06)', width: `${60 + (i % 3) * 15}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
