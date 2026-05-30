export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type Priority = 'P1' | 'P2' | 'P3'
export type ImpactEffort = 'High' | 'Medium' | 'Low'
export type ThreatLevel = 'high' | 'medium' | 'low'

export interface PainPoint {
  id: string
  title: string
  description: string
  severity: Severity
  frequency: number
}

export interface FeatureRequest {
  id: string
  title: string
  description: string
  votes: number
  category: string
}

export interface Sentiment {
  positive: number
  neutral: number
  negative: number
  summary: string
}

export interface Competitor {
  id: string
  name: string
  description: string
  threat_level: ThreatLevel
  comparison: string
}

export interface RoadmapItem {
  id: string
  title: string
  priority: Priority
  impact: ImpactEffort
  effort: ImpactEffort
  reason: string
  percentage: number
}

export interface AnalysisResult {
  query: string
  painPoints: PainPoint[]
  featureRequests: FeatureRequest[]
  sentiment: Sentiment
  competitors: Competitor[]
  roadmap: RoadmapItem[]
}
