import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import type { Sentiment } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { AnimatedCounter } from '../ui/AnimatedCounter'

export function SentimentCard({ sentiment }: { sentiment: Sentiment }) {
  const chartData = [
    { name: 'Negative', value: sentiment.negative, fill: '#ef4444' },
    { name: 'Neutral',  value: sentiment.neutral,  fill: '#eab308' },
    { name: 'Positive', value: sentiment.positive, fill: '#22c55e' },
  ]

  return (
    <GlassCard className="flex flex-col">
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 className="font-semibold text-white text-base">Sentiment Analysis</h2>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80' }}
        >
          {sentiment.positive}% positive
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 py-4 gap-4">
        {/* Radial chart */}
        <div className="w-full h-44">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="30%"
              outerRadius="90%"
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={6}
                background={{ fill: 'rgba(255,255,255,0.04)' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Stat row */}
        <div className="w-full grid grid-cols-3 gap-3">
          {[
            { label: 'Positive', value: sentiment.positive, color: '#4ade80', bg: 'rgba(34,197,94,0.1)' },
            { label: 'Neutral',  value: sentiment.neutral,  color: '#facc15', bg: 'rgba(234,179,8,0.1)' },
            { label: 'Negative', value: sentiment.negative, color: '#f87171', bg: 'rgba(239,68,68,0.1)' },
          ].map(({ label, value, color, bg }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl"
              style={{ background: bg, color }}
            >
              <AnimatedCounter value={value} suffix="%" className="text-xl font-bold" />
              <span className="text-xs text-white/40">{label}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <p className="text-xs text-white/40 text-center leading-relaxed italic">{sentiment.summary}</p>
      </div>
    </GlassCard>
  )
}
