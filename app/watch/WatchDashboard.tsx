'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type Today = {
  anki_cards: number
  anki_target: number
  seterra_active_seconds: number
  seterra_target_seconds: number
  duolingo_active_seconds: number
  duolingo_target_seconds: number
  gaming_seconds: number
  gaming_cap_seconds: number | null
}

type Rule = {
  id: number
  day: string
  type: 'prerequisite' | 'cap' | 'earn_more' | 'free'
  anki_target: number
  seterra_target_seconds: number
  duolingo_target_seconds: number
  gaming_cap_seconds: number
  earn_rate: number
} | null

type Status = {
  locked: boolean
  reason: string
  agent_online: boolean
  last_heartbeat: string | null
  today: Today
  rule: Rule
  pending_messages: { id: number; text: string }[]
}

type LogEntry = {
  id: number
  ts: number
  type: string
  detail: string | null
}

function fmt(s: number): string {
  if (s < 60) return `${s}s`
  if (s < 3600) return `${Math.floor(s / 60)}m`
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

function fmtTime(ts: number): string {
  return new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function timeSince(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

function Bar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  return (
    <div className="w-full bg-[#2a0000] h-1 mt-2 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: pct >= 100 ? '#4ade80' : '#D4AF37' }}
      />
    </div>
  )
}

function StatCard({ label, value, target, asTime }: {
  label: string
  value: number
  target: number
  asTime?: boolean
}) {
  const done = target > 0 && value >= target
  return (
    <div className="bg-[#3a0000]/50 border border-[#D4AF37]/15 p-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-[#FAF7F0]/50 uppercase tracking-wide">{label}</span>
        {done && <span className="text-xs text-green-400">✓</span>}
      </div>
      <div className="text-xl font-bold text-[#FAF7F0]">
        {asTime ? fmt(value) : value}
        {target > 0 && (
          <span className="text-sm font-normal text-[#FAF7F0]/30 ml-1">
            / {asTime ? fmt(target) : target}
          </span>
        )}
      </div>
      {target > 0 && <Bar value={value} max={target} />}
    </div>
  )
}

const RULE_LABELS: Record<string, string> = {
  prerequisite: 'Prerequisite',
  cap: 'Time cap',
  earn_more: 'Earn more',
  free: 'Free day',
}

export default function WatchDashboard() {
  const [status, setStatus] = useState<Status | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/heimdall/status')
      if (res.status === 401) { router.refresh(); return }
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setStatus(data)
      setError(null)
    } catch {
      setError('Connection failed')
    }
  }, [router])

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch('/api/heimdall/logs?limit=20')
      if (res.ok) setLogs(await res.json())
    } catch {}
  }, [])

  useEffect(() => {
    fetchStatus()
    fetchLogs()
    const iv = setInterval(() => { fetchStatus(); fetchLogs() }, 30000)
    return () => clearInterval(iv)
  }, [fetchStatus, fetchLogs])

  async function post(path: string, body: object) {
    return fetch(`/api/heimdall/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  async function handleLock(locked: boolean) {
    setBusy(true)
    await post('lock', { locked, reason: locked ? 'manual' : '' })
    await fetchStatus()
    await fetchLogs()
    setBusy(false)
  }

  async function handleFreeDay() {
    setBusy(true)
    const today = new Date().toISOString().split('T')[0]
    await post('rules', {
      day: today, type: 'free', priority: 10,
      anki_target: 0, seterra_target_seconds: 0, duolingo_target_seconds: 0,
      gaming_cap_seconds: 0, earn_rate: 0,
    })
    await post('lock', { locked: false, reason: 'free day' })
    await fetchStatus()
    await fetchLogs()
    setBusy(false)
  }

  async function handleMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!msg.trim()) return
    setBusy(true)
    await post('message', { text: msg })
    setMsg('')
    await fetchLogs()
    setBusy(false)
  }

  async function handleLogout() {
    await fetch('/api/watch/logout', { method: 'POST' })
    router.refresh()
  }

  const t = status?.today

  return (
    <div className="max-w-2xl mx-auto px-6 pt-20 pb-24 relative z-10 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-[#FAF7F0]" style={{ fontFamily: 'var(--font-playfair)' }}>
          Watch
        </h1>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full" style={{
              backgroundColor: status?.agent_online ? '#4ade80' : '#ef4444'
            }} />
            <span className="text-[#FAF7F0]/40">
              {status
                ? status.agent_online
                  ? `online · ${status.last_heartbeat ? timeSince(status.last_heartbeat) : '—'}`
                  : `offline · ${status.last_heartbeat ? timeSince(status.last_heartbeat) : 'never'}`
                : '—'}
            </span>
          </div>
          <button onClick={handleLogout} className="text-sm text-[#FAF7F0]/30 hover:text-[#FAF7F0]/60 transition-colors">
            logout
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-500/30 bg-red-900/20 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Status banner */}
      {status && (
        <div
          className="px-5 py-4 border flex items-center justify-between"
          style={{
            backgroundColor: status.locked ? 'rgba(120,0,0,0.35)' : 'rgba(0,60,0,0.3)',
            borderColor: status.locked ? 'rgba(239,68,68,0.35)' : 'rgba(74,222,128,0.25)',
          }}
        >
          <div>
            <div className="text-lg font-bold tracking-widest text-[#FAF7F0]">
              {status.locked ? 'LOCKED' : 'UNLOCKED'}
            </div>
            <div className="text-sm text-[#FAF7F0]/40 mt-0.5">
              {status.rule
                ? `${RULE_LABELS[status.rule.type]} · ${status.rule.day}`
                : 'No rule active'}
              {status.reason && status.reason !== 'prerequisite'
                ? ` · ${status.reason}` : ''}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleLock(true)}
              disabled={busy || status.locked}
              className="text-xs px-3 py-1.5 border border-red-400/40 text-red-400 hover:bg-red-900/30 disabled:opacity-25 transition-colors"
            >
              Lock
            </button>
            <button
              onClick={() => handleLock(false)}
              disabled={busy || !status.locked}
              className="text-xs px-3 py-1.5 border border-green-400/40 text-green-400 hover:bg-green-900/30 disabled:opacity-25 transition-colors"
            >
              Unlock
            </button>
          </div>
        </div>
      )}

      {/* Progress */}
      {t && (
        <div>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50 mb-3">Today</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <StatCard label="Anki" value={t.anki_cards} target={t.anki_target} />
            <StatCard label="Seterra" value={t.seterra_active_seconds} target={t.seterra_target_seconds} asTime />
            <StatCard label="Duolingo" value={t.duolingo_active_seconds} target={t.duolingo_target_seconds} asTime />
            <StatCard label="Gaming" value={t.gaming_seconds} target={t.gaming_cap_seconds ?? 0} asTime />
          </div>
        </div>
      )}

      {/* Actions */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50 mb-3">Actions</p>
        <div className="space-y-3">
          <button
            onClick={handleFreeDay}
            disabled={busy}
            className="px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] text-sm hover:bg-[#D4AF37]/10 disabled:opacity-40 transition-colors"
          >
            Set free day (today)
          </button>
          <form onSubmit={handleMessage} className="flex gap-2">
            <input
              type="text"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Send a message to the overlay…"
              className="flex-1 bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-4 py-2 text-sm placeholder-[#FAF7F0]/25 focus:outline-none focus:border-[#D4AF37]/40"
            />
            <button
              type="submit"
              disabled={busy || !msg.trim()}
              className="px-4 py-2 bg-[#D4AF37] text-[#4A0000] text-sm font-bold hover:bg-[#c4a030] disabled:opacity-40 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Log */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50 mb-3">Recent Events</p>
        <div className="border border-[#D4AF37]/10">
          {logs.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[#FAF7F0]/25">No events yet.</div>
          ) : logs.map((e, i) => (
            <div
              key={e.id}
              className="flex gap-4 px-4 py-2 text-sm"
              style={{ borderTop: i > 0 ? '1px solid rgba(212,175,55,0.06)' : undefined }}
            >
              <span className="text-[#FAF7F0]/25 shrink-0 tabular-nums w-12">{fmtTime(e.ts)}</span>
              <span className="text-[#D4AF37]/60 shrink-0 w-24">{e.type}</span>
              <span className="text-[#FAF7F0]/50 truncate">{e.detail ?? '—'}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
