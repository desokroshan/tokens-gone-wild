import type { AnalysisResult } from '../types'

export const AGENT_STEPS = [
  'Scanning Reddit, Twitter, and G2 reviews...',
  'Extracting pain points with NLP...',
  'Clustering feature requests by theme...',
  'Analyzing competitor positioning...',
  'Scoring business impact and effort...',
  'Generating prioritized roadmap...',
]

export const MOCK_RESULT: AnalysisResult = {
  query: 'Notion',
  painPoints: [
    {
      id: 'pp1',
      title: 'Slow sync across devices',
      description: 'Users report 30–60s sync delays when switching between mobile and desktop, often causing lost edits.',
      severity: 'critical',
      frequency: 847,
    },
    {
      id: 'pp2',
      title: 'Mobile app crashes on large databases',
      description: 'Crash on opening databases with 500+ rows on iOS 17. Reproducible and widely reported since Nov 2024.',
      severity: 'critical',
      frequency: 721,
    },
    {
      id: 'pp3',
      title: 'No offline mode',
      description: 'Complete loss of functionality without WiFi. Competitors like Obsidian and Apple Notes work fully offline.',
      severity: 'high',
      frequency: 612,
    },
    {
      id: 'pp4',
      title: 'PDF export cuts off content',
      description: 'Long pages truncate at ~30 pages when exported to PDF. Workaround is to split into sub-pages.',
      severity: 'high',
      frequency: 445,
    },
    {
      id: 'pp5',
      title: 'Cluttered sidebar navigation',
      description: 'Too many nested items in the left sidebar cause confusion. Power users report spending >10s finding pages.',
      severity: 'medium',
      frequency: 388,
    },
    {
      id: 'pp6',
      title: 'No native calendar view',
      description: 'Users want a calendar timeline for date-property databases, currently requiring third-party embeds.',
      severity: 'low',
      frequency: 203,
    },
  ],
  featureRequests: [
    { id: 'fr1', title: 'AI writing assistant', description: 'In-line AI for drafting, summarizing, and editing blocks.', votes: 1240, category: 'AI' },
    { id: 'fr2', title: 'Two-way Google Calendar sync', description: 'Bi-directional sync so Notion dates appear on Google Calendar and vice versa.', votes: 987, category: 'Integrations' },
    { id: 'fr3', title: 'Version history (90+ days)', description: 'Extend version history beyond the current 30-day limit on free plans.', votes: 834, category: 'Core' },
    { id: 'fr4', title: 'Table formula engine', description: 'Excel-style formula support within database table views.', votes: 756, category: 'Core' },
    { id: 'fr5', title: 'Custom domain for published pages', description: 'Publish Notion pages under your own domain (e.g., wiki.yourcompany.com).', votes: 612, category: 'Publishing' },
    { id: 'fr6', title: 'Kanban sub-items', description: 'Nested cards inside Kanban cards for multi-level task tracking.', votes: 445, category: 'Project Mgmt' },
    { id: 'fr7', title: 'API webhooks', description: 'Push notifications to external services when database items change.', votes: 389, category: 'Developer' },
    { id: 'fr8', title: 'Snooze notifications', description: 'Delay notification reminders for a set period without marking them as read.', votes: 201, category: 'UX' },
  ],
  sentiment: {
    positive: 54,
    neutral: 28,
    negative: 18,
    summary:
      'Community is broadly positive about Notion\'s flexibility and all-in-one vision, but increasingly vocal about reliability gaps — especially sync and mobile performance — with mentions of competitor alternatives accelerating.',
  },
  competitors: [
    {
      id: 'c1',
      name: 'Coda',
      description: 'Formula-first collaborative doc.',
      threat_level: 'high',
      comparison: 'Rapidly gaining on formula power and team automation. Coda Packs ecosystem is drawing dev-forward teams away from Notion databases.',
    },
    {
      id: 'c2',
      name: 'Obsidian',
      description: 'Local-first knowledge base.',
      threat_level: 'medium',
      comparison: 'Capturing power users who want local-first, no-cloud, and Markdown purity. Plugin ecosystem is unmatched for customization.',
    },
    {
      id: 'c3',
      name: 'Linear',
      description: 'Modern issue tracker.',
      threat_level: 'medium',
      comparison: 'Winning engineering teams away from Notion Projects with superior roadmap and sprint tooling. Speed is a frequent contrast.',
    },
    {
      id: 'c4',
      name: 'Craft',
      description: 'Native Mac/iOS doc editor.',
      threat_level: 'low',
      comparison: 'Strong on iOS/macOS aesthetics and performance, but limited web presence and no database features keep it niche.',
    },
  ],
  roadmap: [
    { id: 'r1', title: 'Fix device sync engine', priority: 'P1', impact: 'High', effort: 'High', reason: 'Mentioned in 42% of negative discussions', percentage: 42 },
    { id: 'r2', title: 'Mobile crash fix (iOS 17)', priority: 'P1', impact: 'High', effort: 'Medium', reason: 'Mentioned in 36% of negative discussions', percentage: 36 },
    { id: 'r3', title: 'Offline mode (PWA)', priority: 'P1', impact: 'High', effort: 'High', reason: 'Mentioned in 31% of negative discussions', percentage: 31 },
    { id: 'r4', title: 'AI writing assistant v1', priority: 'P2', impact: 'High', effort: 'High', reason: 'Appears in 62% of feature requests', percentage: 62 },
    { id: 'r5', title: 'Google Calendar 2-way sync', priority: 'P2', impact: 'Medium', effort: 'Medium', reason: 'Appears in 49% of feature requests', percentage: 49 },
    { id: 'r6', title: 'Table formula engine', priority: 'P2', impact: 'Medium', effort: 'High', reason: 'Appears in 38% of feature requests', percentage: 38 },
    { id: 'r7', title: 'Custom domain for pages', priority: 'P3', impact: 'Medium', effort: 'Low', reason: 'Appears in 30% of feature requests', percentage: 30 },
    { id: 'r8', title: 'API webhooks', priority: 'P3', impact: 'Low', effort: 'Low', reason: 'Appears in 19% of developer discussions', percentage: 19 },
    { id: 'r9', title: 'Sidebar UX redesign', priority: 'P3', impact: 'Medium', effort: 'Medium', reason: 'Mentioned in 19% of pain discussions', percentage: 19 },
  ],
}
