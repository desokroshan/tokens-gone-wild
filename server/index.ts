import 'dotenv/config'
import express from 'express'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
app.use(express.json())

const APIFY_TOKEN = process.env.APIFY_TOKEN!
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// ── Box OAuth ──────────────────────────────────────────────────────────────────

const BOX_CLIENT_ID     = process.env.CLIENT_ID!
const BOX_CLIENT_SECRET = process.env.CLIENT_SECRET!
const BOX_REDIRECT_URI  = 'http://localhost:3001/auth/box/callback'

let boxTokens: { access_token: string; refresh_token: string; expires_at: number } | null = null

async function getBoxToken(): Promise<string> {
  if (boxTokens && Date.now() < boxTokens.expires_at - 60_000) {
    return boxTokens.access_token
  }
  if (boxTokens?.refresh_token) {
    const r = await fetch('https://api.box.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: boxTokens.refresh_token,
        client_id: BOX_CLIENT_ID,
        client_secret: BOX_CLIENT_SECRET,
      }),
    })
    const data = await r.json() as any
    boxTokens = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + data.expires_in * 1000,
    }
    console.log('Box token refreshed')
    return boxTokens.access_token
  }
  throw new Error('Not authenticated with Box — visit http://localhost:3001/auth/box')
}

// Start OAuth flow
app.get('/auth/box', (_req, res) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: BOX_CLIENT_ID,
    redirect_uri: BOX_REDIRECT_URI,
  })
  res.redirect(`https://account.box.com/api/oauth2/authorize?${params}`)
})

// OAuth callback — exchange code for tokens
app.get('/auth/box/callback', async (req, res) => {
  const { code } = req.query as { code?: string }
  if (!code) { res.status(400).send('Missing code'); return }

  const r = await fetch('https://api.box.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: BOX_CLIENT_ID,
      client_secret: BOX_CLIENT_SECRET,
      redirect_uri: BOX_REDIRECT_URI,
    }),
  })
  const data = await r.json() as any
  if (!r.ok) { res.status(500).send(`Box auth failed: ${data.error_description ?? data.error}`); return }

  boxTokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  }
  console.log('Box authenticated successfully')
  res.send('<h2>Box connected! You can close this tab and upload roadmaps.</h2>')
})

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

  let token: string
  try {
    token = await getBoxToken()
  } catch (e: any) {
    res.status(401).json({ error: e.message })
    return
  }

  const blob = new Blob([content], { type: 'text/markdown' })

  async function boxUpload(url: string): Promise<{ ok: boolean; status: number; data: any }> {
    const form = new FormData()
    form.append('attributes', JSON.stringify({ name: filename, parent: { id: '0' } }))
    form.append('file', blob, filename)
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    })
    const text = await r.text()
    let data: any = {}
    try { data = JSON.parse(text) } catch { /* empty body */ }
    return { ok: r.ok, status: r.status, data }
  }

  let result = await boxUpload('https://upload.box.com/api/2.0/files/content')

  // 409 = file already exists — overwrite it using the update endpoint
  if (result.status === 409) {
    const existingId = result.data?.context_info?.conflicts?.[0]?.id
    if (!existingId) {
      res.status(409).json({ error: 'File already exists but could not find its ID to overwrite' })
      return
    }
    result = await boxUpload(`https://upload.box.com/api/2.0/files/${existingId}/content`)
  }

  if (!result.ok) {
    console.error(`Box error ${result.status}:`, JSON.stringify(result.data, null, 2))
    const message = result.data?.message ?? result.data?.code ?? result.data?.error ?? JSON.stringify(result.data)
    res.status(result.status).json({ error: `Box ${result.status}: ${message}` })
    return
  }

  const file = result.data.entries?.[0]
  if (!file) {
    res.status(500).json({ error: 'No file entry in Box response' })
    return
  }

  res.json({ fileId: file.id, fileName: file.name, url: `https://app.box.com/file/${file.id}` })
})

app.listen(3001, () => console.log('API server running on :3001'))
