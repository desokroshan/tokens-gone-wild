import { motion } from 'framer-motion'
import { AnalyzeForm } from '../components/landing/AnalyzeForm'

export function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Ambient background blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, #7c3aed, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.15,
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #2563eb, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.12,
          borderRadius: '50%',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-3xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
          style={{
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.3)',
            color: '#a78bfa',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Powered by Strands Agents + Claude
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight"
        >
          Your AI{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Chief Product Officer
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed"
        >
          Analyzes millions of customer conversations to uncover unmet needs, competitive threats, and
          feature opportunities — then turns them into a prioritized roadmap with business impact estimates.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="flex items-center gap-8 text-center"
        >
          {[
            { value: '10M+', label: 'Reviews analyzed' },
            { value: '< 30s', label: 'Time to insights' },
            { value: '95%', label: 'Accuracy rate' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-white/40 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <AnalyzeForm />
        </motion.div>

        {/* Trust signals */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-white/20"
        >
          Scans Reddit · Twitter · G2 · Trustpilot · App Store · Hacker News
        </motion.p>
      </div>
    </div>
  )
}
