import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { LandingPage } from './pages/LandingPage'
import { InsightsDashboard } from './pages/InsightsDashboard'
import { RoadmapPage } from './pages/RoadmapPage'
import { useAnalysisStore } from './store/analysisStore'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const result = useAnalysisStore((s) => s.result)
  if (!result) return <Navigate to="/" replace />
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: '/insights',
        element: (
          <ProtectedRoute>
            <InsightsDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/roadmap',
        element: (
          <ProtectedRoute>
            <RoadmapPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
