import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySession } from '@/lib/watch-auth'

const BASE = process.env.POIMENAS_API_URL
const KEY = process.env.POIMENAS_API_KEY

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const cookieStore = await cookies()
  const session = cookieStore.get('watch_session')?.value
  if (!session || !verifySession(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!BASE || !KEY) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 503 })
  }

  const { path } = await params
  const url = new URL(`${BASE}/api/${path.join('/')}`)
  req.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v))

  const hasBody = !['GET', 'HEAD'].includes(req.method)
  const body = hasBody ? await req.text() : undefined

  try {
    const upstream = await fetch(url.toString(), {
      method: req.method,
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body,
      signal: AbortSignal.timeout(8000),
    })
    const data = await upstream.json()
    return NextResponse.json(data, { status: upstream.status })
  } catch {
    return NextResponse.json({ error: 'Agent unreachable' }, { status: 503 })
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
