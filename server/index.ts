import 'dotenv/config'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(express.json())

const APIFY_TOKEN = process.env.APIFY_TOKEN!
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// jobId → original query, so GET /results/:jobId doesn't need the query in the URL
const jobQueries = new Map<string, string>()

app.post('/api/analyze', async (req, res) => {
  const { query } = req.body as { query: string }

  const r = await fetch(
    `https://api.apify.com/v2/acts/harshmaur~reddit-scraper/runs?token=${APIFY_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchTerms: [query],
        searchPosts: true,
        searchComments: false,
        crawlCommentsPerPost: true,
        searchSort: 'relevance',
        searchTime: 'year',
        maxPostsCount: 25,
        maxCommentsPerPost: 15,
        proxy: { useApifyProxy: true, apifyProxyGroups: ['RESIDENTIAL'] },
      }),
    },
  )

  const json = await r.json()
  const jobId: string = json.data.id
  jobQueries.set(jobId, query)
  res.json({ jobId })
})

app.get('/api/results/:jobId', async (req, res) => {
  const { jobId } = req.params
  const query = jobQueries.get(jobId) ?? ''

  // Long-poll Apify until the run reaches a terminal state
  let datasetId = ''
  while (true) {
    const r = await fetch(`https://api.apify.com/v2/actor-runs/${jobId}?token=${APIFY_TOKEN}`)
    const run = await r.json()
    const status: string = run.data.status

    if (status === 'SUCCEEDED') {
      datasetId = run.data.defaultDatasetId
      break
    }
    if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(status)) {
      res.status(500).json({ error: `Apify run ${status}` })
      return
    }

    await new Promise((r) => setTimeout(r, 4000))
  }

  // Fetch raw scraped items
  const itemsRes = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&limit=200&clean=true`,
  )
  const items: ApifyItem[] = await itemsRes.json()

  const result = await synthesize(query, items)
  res.json({ ...result, query })
})

// ── Types ──────────────────────────────────────────────────────────────────────

interface ApifyItem {
  dataType: 'post' | 'comment'
  title?: string
  body?: string
  upVotes?: number
  commentUpVotes?: number
  subredditName?: string
}

// ── Synthesis ──────────────────────────────────────────────────────────────────

async function synthesize(query: string, items: ApifyItem[]) {
  const posts = items
    .filter((i) => i.dataType === 'post')
    .sort((a, b) => (b.upVotes ?? 0) - (a.upVotes ?? 0))
    .slice(0, 25)

  const comments = items
    .filter((i) => i.dataType === 'comment')
    .sort((a, b) => (b.commentUpVotes ?? 0) - (a.commentUpVotes ?? 0))
    .slice(0, 75)

  const corpus = [
    ...posts.map(
      (p) =>
        `[POST r/${p.subredditName} ↑${p.upVotes ?? 0}] ${p.title ?? ''}: ${(p.body ?? '').slice(0, 300)}`,
    ),
    ...comments.map(
      (c) => `[COMMENT r/${c.subredditName} ↑${c.commentUpVotes ?? 0}] ${(c.body ?? '').slice(0, 200)}`,
    ),
  ].join('\n')

  const msg = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `Analyze these Reddit posts and comments about "${query}". Return raw JSON only (no markdown fences) matching this exact shape:

{
  "painPoints": [{ "id": "pp1", "title": "...", "description": "1-2 sentences", "severity": "critical|high|medium|low", "frequency": <integer> }],
  "featureRequests": [{ "id": "fr1", "title": "...", "description": "1-2 sentences", "votes": <integer>, "category": "..." }],
  "sentiment": { "positive": <integer>, "neutral": <integer>, "negative": <integer>, "summary": "2-3 sentences" },
  "competitors": [{ "id": "c1", "name": "...", "description": "...", "threat_level": "high|medium|low", "comparison": "1-2 sentences" }],
  "roadmap": [{ "id": "r1", "title": "...", "priority": "P1|P2|P3", "impact": "High|Medium|Low", "effort": "High|Medium|Low", "reason": "...", "percentage": <integer 1-100> }]
}

Rules: 4-8 pain points by severity, 5-10 feature requests by votes, sentiment integers sum to 100, 2-5 competitors, 6-10 roadmap items by priority. Base everything strictly on the data.

DATA:
${corpus}`,
      },
    ],
  })

  const text = msg.content[0].type === 'text' ? msg.content[0].text : '{}'
  const clean = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
  return JSON.parse(clean)
}

// ── Box Upload ─────────────────────────────────────────────────────────────────

app.post('/api/box-upload', async (req, res) => {
  const { content, filename } = req.body as { content: string; filename: string }
  if (!content || !filename) {
    res.status(400).json({ error: 'content and filename are required' })
    return
  }

  const token = process.env.DEV_TOKEN
  if (!token) {
    res.status(500).json({ error: 'DEV_TOKEN not configured on server' })
    return
  }

  const form = new FormData()
  form.append('attributes', JSON.stringify({ name: filename, parent: { id: '0' } }))
  form.append('file', new Blob([content], { type: 'text/markdown' }), filename)

  const boxRes = await fetch('https://upload.box.com/api/2.0/files/content', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })

  const data = await boxRes.json() as any
  if (!boxRes.ok) {
    console.error('Box error:', data)
    res.status(boxRes.status).json({ error: data.message ?? 'Box upload failed' })
    return
  }

  const file = data.entries?.[0]
  if (!file) {
    res.status(500).json({ error: 'No file entry in Box response' })
    return
  }

  res.json({ fileId: file.id, fileName: file.name, url: `https://app.box.com/file/${file.id}` })
})

app.listen(3001, () => console.log('API server running on :3001'))
