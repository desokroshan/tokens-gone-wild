import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAnalysisStore } from '../../store/analysisStore'

const NAV_LINKS = [
  { to: '/insights', label: 'Insights' },
  { to: '/roadmap', label: 'Roadmap' },
]

export function NavBar() {
  const location = useLocation()
  const status = useAnalysisStore((s) => s.status)
  const isActive = status === 'done'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ background: 'rgba(15,15,26,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <Link to="/" className="flex items-center gap-2 no-underline">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
        >
          AI
        </div>
        <span className="font-semibold text-white text-base tracking-tight">CPO.ai</span>
      </Link>

      <div className="flex items-center gap-1">
        {NAV_LINKS.map(({ to, label }) => {
          const active = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={[
                'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors no-underline',
                isActive ? 'text-white hover:text-white' : 'text-white/30 cursor-not-allowed pointer-events-none',
                active && isActive ? 'text-white' : '',
              ].join(' ')}
            >
              {active && isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(124,58,237,0.4)' }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
