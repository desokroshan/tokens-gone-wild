import { motion } from 'framer-motion'
import { AnalyzeForm } from '../components/landing/AnalyzeForm'

export function LandingPage() {
  return (
    <div className="relative min-h-[calc(100dvh-4rem)] flex items-center px-6 py-20 overflow-hidden">
      {/* Warm ambient glow — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-5%',
          right: '-5%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, #c98c2e, transparent 65%)',
          filter: 'blur(140px)',
          opacity: 0.08,
        }}
      />
      {/* Secondary warm glow — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '0%',
          left: '-8%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #9a7535, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.07,
        }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 mb-7"
        >
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em' }}
          >
            Strands Agents × Claude
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: '#c98c2e' }}
          />
          <span className="text-xs font-medium" style={{ color: '#c98c2e' }}>
            Live
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.07 }}
          className="font-extrabold leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', textWrap: 'balance' }}
        >
          Your AI{' '}
          <span style={{ color: '#e3b264' }}>Chief Product</span>
          <br />
          Officer
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-lg leading-relaxed mb-8 max-w-xl"
          style={{ color: 'rgba(255,255,255,0.46)', textWrap: 'pretty' }}
        >
          Analyzes customer conversations to surface unmet needs, competitive
          threats, and feature opportunities — then generates a prioritized
          roadmap with business impact estimates.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-10 mb-10"
        >
          {[
            { value: '12.4M+', label: 'Reviews scanned' },
            { value: '~28s', label: 'Time to insights' },
            { value: '94.3%', label: 'Accuracy rate' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div
                className="text-2xl font-bold tabular-nums"
                style={{ color: 'rgba(255,255,255,0.92)', fontVariantNumeric: 'tabular-nums' }}
              >
                {value}
              </div>
              <div className="text-xs mt-0.5 font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.27 }}
        >
          <AnalyzeForm />
        </motion.div>

        {/* Trust signal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 text-xs"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          Scans Reddit · Twitter · G2 · Trustpilot · App Store · Hacker News
        </motion.p>
      </div>
    </div>
  )
}
