import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAnalysis } from '../hooks/useAnalysis'
import { RoadmapColumn } from '../components/roadmap/RoadmapColumn'
import { uploadRoadmapToBox } from '../utils/boxUpload'
import type { Priority, RoadmapItem } from '../types'

const PRIORITIES: Priority[] = ['P1', 'P2', 'P3']

type UploadState = 'idle' | 'uploading' | 'done' | 'error'

export function RoadmapPage() {
  const { result, query } = useAnalysis()
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [boxUrl, setBoxUrl] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const grouped = PRIORITIES.reduce<Record<Priority, RoadmapItem[]>>(
    (acc, p) => ({ ...acc, [p]: [] }),
    {} as Record<Priority, RoadmapItem[]>,
  )

  result?.roadmap.forEach((item) => grouped[item.priority].push(item))

  async function handleUploadToBox() {
    if (!result || uploadState === 'uploading') return
    setUploadState('uploading')
    setUploadError(null)
    try {
      const { url } = await uploadRoadmapToBox(result)
      setBoxUrl(url)
      setUploadState('done')
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed')
      setUploadState('error')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div>
          <Link
            to="/insights"
            className="text-xs no-underline transition-colors mb-2 inline-block"
            style={{ color: 'rgba(255,255,255,0.28)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
          >
            ← Insights
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">Product roadmap</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.36)' }}>
            AI-generated priorities for{' '}
            <span style={{ color: 'rgba(255,255,255,0.6)' }} className="font-medium">
              {query || result?.query}
            </span>{' '}
            — {result?.roadmap.length} opportunities identified
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium"
            style={{
              background: 'rgba(201,140,46,0.1)',
              border: '1px solid rgba(201,140,46,0.22)',
              color: '#c98c2e',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#c98c2e', boxShadow: '0 0 6px rgba(201,140,46,0.8)' }} />
            Prioritized by impact × reach
          </div>

          {/* Box upload button */}
          <div className="flex flex-col items-end gap-1.5">
            <button
              onClick={handleUploadToBox}
              disabled={!result || uploadState === 'uploading'}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: uploadState === 'done' ? 'rgba(61,150,128,0.15)' : 'rgba(0,114,206,0.12)',
                border: `1px solid ${uploadState === 'done' ? 'rgba(61,150,128,0.35)' : 'rgba(0,114,206,0.3)'}`,
                color: uploadState === 'done' ? '#3d9680' : '#4fa3e0',
                cursor: uploadState === 'uploading' ? 'wait' : 'pointer',
              }}
            >
              {uploadState === 'uploading' ? (
                <>
                  <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Uploading to Box…
                </>
              ) : uploadState === 'done' ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Uploaded to Box
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload to Box
                </>
              )}
            </button>

            {uploadState === 'done' && boxUrl && (
              <a
                href={boxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                View in Box →
              </a>
            )}

            {uploadState === 'error' && uploadError && (
              <p className="text-xs max-w-[220px] text-right" style={{ color: '#c25252' }}>
                {uploadError}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.14 }}
        className="flex items-center gap-5 mb-6"
      >
        {[
          { color: '#c25252', label: 'P1 — critical / must build' },
          { color: '#c98c2e', label: 'P2 — high value / should build' },
          { color: '#3d9680', label: 'P3 — opportunistic / nice to have' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-5"
      >
        {PRIORITIES.map((p) => (
          <RoadmapColumn key={p} priority={p} items={grouped[p]} />
        ))}
      </motion.div>
    </div>
  )
}
