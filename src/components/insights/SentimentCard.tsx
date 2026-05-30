import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import type { Sentiment } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { AnimatedCounter } from '../ui/AnimatedCounter'

export function SentimentCard({ sentiment }: { sentiment: Sentiment }) {
  const chartData = [
    { name: 'Negative', value: sentiment.negative, fill: '#c25252' },
    { name: 'Neutral',  value: sentiment.neutral,  fill: '#b89040' },
    { name: 'Positive', value: sentiment.positive, fill: '#4a9470' },
  ]

  return (
    <GlassCard className="flex flex-col">
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <h2 className="font-semibold text-white text-sm tracking-tight">Sentiment analysis</h2>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md"
          style={{ background: 'rgba(74,148,112,0.14)', color: '#7ac09a' }}
        >
          {sentiment.positive}% positive
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 py-4 gap-4">
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
                cornerRadius={5}
                background={{ fill: 'rgba(255,255,255,0.03)' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full grid grid-cols-3 gap-2.5">
          {[
            { label: 'Positive', value: sentiment.positive, color: '#7ac09a', bg: 'rgba(74,148,112,0.1)' },
            { label: 'Neutral',  value: sentiment.neutral,  color: '#c8a85a', bg: 'rgba(184,144,64,0.1)' },
            { label: 'Negative', value: sentiment.negative, color: '#d07878', bg: 'rgba(194,82,82,0.1)' },
          ].map(({ label, value, color, bg }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 py-2.5 px-3 rounded-lg"
              style={{ background: bg, color }}
            >
              <AnimatedCounter value={value} suffix="%" className="text-xl font-bold tabular-nums" />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-center leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {sentiment.summary}
        </p>
      </div>
    </GlassCard>
  )
}
