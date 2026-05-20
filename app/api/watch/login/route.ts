import { NextRequest, NextResponse } from 'next/server'
import { makeSessionToken } from '@/lib/watch-auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (!password || password !== process.env.WATCH_PASSWORD) {
    return NextResponse.json({ error: 'Invalid' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('watch_session', makeSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return res
}
