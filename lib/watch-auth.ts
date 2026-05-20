import { createHmac } from 'crypto'

export function makeSessionToken(): string {
  const secret = process.env.WATCH_SECRET!
  const password = process.env.WATCH_PASSWORD!
  return createHmac('sha256', secret).update(password).digest('hex')
}

export function verifySession(token: string): boolean {
  const secret = process.env.WATCH_SECRET
  const password = process.env.WATCH_PASSWORD
  if (!secret || !password) return false
  return token === makeSessionToken()
}
