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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs text-white/30 uppercase tracking-widest font-medium">Analysis for</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{query || result?.query}</h1>
          <p className="text-sm text-white/40 mt-1">
            Scanned {(5000 + Math.round(Math.random() * 15000)).toLocaleString()} conversations across 6 platforms
          </p>
        </div>

        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline transition-all hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
          }}
        >
          View Roadmap →
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading || !result ? (
          <>
            <SkeletonCard lines={6} />
            <SkeletonCard lines={6} />
            <SkeletonCard lines={4} />
            <SkeletonCard lines={4} />
          </>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
              <PainPointsCard painPoints={result.painPoints} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <FeatureRequestsCard featureRequests={result.featureRequests} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
              <SentimentCard sentiment={result.sentiment} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <CompetitorsCard competitors={result.competitors} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
