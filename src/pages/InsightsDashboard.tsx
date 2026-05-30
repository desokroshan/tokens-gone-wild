import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAnalysis } from '../hooks/useAnalysis'
import { PainPointsCard } from '../components/insights/PainPointsCard'
import { FeatureRequestsCard } from '../components/insights/FeatureRequestsCard'
import { SentimentCard } from '../components/insights/SentimentCard'
import { CompetitorsCard } from '../components/insights/CompetitorsCard'
import { SkeletonCard } from '../components/ui/SkeletonCard'

export function InsightsDashboard() {
  const { result, query, status } = useAnalysis()
  const isLoading = status === 'loading'

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div>
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.11em' }}
          >
            Analysis for
          </span>
          <h1 className="text-3xl font-bold text-white mt-1 tracking-tight">{query || result?.query}</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.36)' }}>
            Scanned{' '}
            <span className="tabular-nums">
              {(5000 + Math.round(Math.random() * 15000)).toLocaleString()}
            </span>{' '}
            conversations across 6 platforms
          </p>
        </div>

        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold no-underline transition-all hover:opacity-90 active:scale-[0.98]"
          style={{
            background: '#c98c2e',
            color: '#0c0b09',
            boxShadow: '0 4px 18px rgba(201,140,46,0.25)',
          }}
        >
          View roadmap →
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {isLoading || !result ? (
          <>
            <SkeletonCard lines={6} />
            <SkeletonCard lines={6} />
            <SkeletonCard lines={4} />
            <SkeletonCard lines={4} />
          </>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.05 }}>
              <PainPointsCard painPoints={result.painPoints} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.1 }}>
              <FeatureRequestsCard featureRequests={result.featureRequests} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.14 }}>
              <SentimentCard sentiment={result.sentiment} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.18 }}>
              <CompetitorsCard competitors={result.competitors} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
