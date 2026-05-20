import { cookies } from 'next/headers'
import { verifySession } from '@/lib/watch-auth'
import LoginForm from './LoginForm'
import WatchDashboard from './WatchDashboard'

export const dynamic = 'force-dynamic'

export default async function WatchPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('watch_session')?.value
  const authed = session ? verifySession(session) : false
  return authed ? <WatchDashboard /> : <LoginForm />
}
