'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ── Types ─────────────────────────────────────────────────────────────────────

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
  priority: number
  start_hour: number | null
  end_hour: number | null
} | null

type RuleRecord = NonNullable<Rule>

type ExtensionRequest = {
  id: number
  ts: number
  reason: string
  duration_minutes: number
  status: 'pending' | 'approved' | 'denied'
  resolved_ts: number | null
}

type Status = {
  locked: boolean
  reason: string
  agent_online: boolean
  last_heartbeat: string | null
  today: Today
  rule: Rule
  pending_messages: { id: number; text: string }[]
  pending_extension: ExtensionRequest | null
}

type Health = {
  version: string
  db_ok: boolean
  dnsmasq_running: boolean
  dns_locked: boolean
  allowlist: { id: number; domain: string }[]
}

type LogEntry = {
  id: number
  ts: number
  type: string
  detail: string | null
}

type ProcessStat = {
  date: string
  process: string
  seconds: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(s: number): string {
  if (s <= 0) return '0s'
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

function ruleDetail(r: RuleRecord): string {
  if (r.type === 'free') return 'free day'
  if (r.type === 'cap') return `${fmt(r.gaming_cap_seconds)} cap`
  if (r.type === 'prerequisite') {
    const parts: string[] = []
    if (r.anki_target) parts.push(`${r.anki_target} anki`)
    if (r.seterra_target_seconds) parts.push(`${fmt(r.seterra_target_seconds)} seterra`)
    if (r.duolingo_target_seconds) parts.push(`${fmt(r.duolingo_target_seconds)} duolingo`)
    return parts.join(' · ') || 'no targets'
  }
  if (r.type === 'earn_more') return `${fmt(r.gaming_cap_seconds)} base · ${r.earn_rate}× earn`
  return ''
}

const RULE_LABELS: Record<string, string> = {
  prerequisite: 'Prerequisite',
  cap: 'Time cap',
  earn_more: 'Earn more',
  free: 'Free day',
}

const TYPE_COLOR: Record<string, string> = {
  prerequisite: 'text-amber-400 bg-amber-400/10',
  cap:          'text-blue-400 bg-blue-400/10',
  earn_more:    'text-green-400 bg-green-400/10',
  free:         'text-purple-400 bg-purple-400/10',
}

const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusPill({ label, ok, detail, neutral }: {
  label: string; ok: boolean; detail?: string; neutral?: boolean
}) {
  return (
    <div className="bg-[#3a0000]/50 border border-[#D4AF37]/15 px-4 py-3 flex items-center justify-between">
      <span className="text-xs text-[#FAF7F0]/50 uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-2">
        {detail && <span className="text-xs text-[#FAF7F0]/40">{detail}</span>}
        {!neutral && (
          <span className={`text-xs font-medium ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? 'ok' : 'down'}
          </span>
        )}
      </div>
    </div>
  )
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
  label: string; value: number; target: number; asTime?: boolean
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

// ── Form defaults ─────────────────────────────────────────────────────────────

const BLANK_RULE = {
  day: 'default',
  type: 'prerequisite' as RuleRecord['type'],
  anki_target: 0,
  seterra_mins: 0,
  duolingo_mins: 0,
  gaming_cap_hours: 2,
  earn_rate: 2,
  priority: 0,
  start_hour: '',
  end_hour: '',
}

// ── Main component ────────────────────────────────────────────────────────────

export default function WatchDashboard() {
  const [status, setStatus]     = useState<Status | null>(null)
  const [health, setHealth]     = useState<Health | null>(null)
  const [rules, setRules]       = useState<RuleRecord[]>([])
  const [procStats, setProcStats] = useState<ProcessStat[]>([])
  const [logs, setLogs]         = useState<LogEntry[]>([])
  const [msg, setMsg]           = useState('')
  const [newDomain, setNewDomain] = useState('')
  const [lockMins, setLockMins]   = useState('')
  const [newRule, setNewRule]     = useState(BLANK_RULE)
  const [showRuleForm, setShowRuleForm] = useState(false)
  const [busy, setBusy]   = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // ── Fetchers ──────────────────────────────────────────────────────────────

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/poimenas/status')
      if (res.status === 401) { router.refresh(); return }
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setStatus(data)
      setError(null)
    } catch { setError('Connection failed') }
  }, [router])

  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch('/api/poimenas/health')
      if (res.ok) setHealth(await res.json())
    } catch {}
  }, [])

  const fetchRules = useCallback(async () => {
    try {
      const res = await fetch('/api/poimenas/rules')
      if (res.ok) setRules(await res.json())
    } catch {}
  }, [])

  const fetchProcStats = useCallback(async () => {
    try {
      const res = await fetch('/api/poimenas/stats/processes')
      if (res.ok) setProcStats(await res.json())
    } catch {}
  }, [])

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch('/api/poimenas/logs?limit=20')
      if (res.ok) setLogs(await res.json())
    } catch {}
  }, [])

  useEffect(() => {
    fetchStatus(); fetchHealth(); fetchRules(); fetchProcStats(); fetchLogs()
    const iv = setInterval(() => {
      fetchStatus(); fetchHealth(); fetchRules(); fetchProcStats(); fetchLogs()
    }, 30000)
    return () => clearInterval(iv)
  }, [fetchStatus, fetchHealth, fetchRules, fetchProcStats, fetchLogs])

  // ── API helpers ───────────────────────────────────────────────────────────

  async function post(path: string, body: object) {
    return fetch(`/api/poimenas/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  async function handleLock(locked: boolean) {
    setBusy(true)
    await post('lock', { locked, reason: locked ? 'manual' : '' })
    await fetchStatus(); await fetchLogs()
    setBusy(false)
  }

  async function handleTimedLock(e: React.FormEvent) {
    e.preventDefault()
    const mins = parseInt(lockMins)
    if (!mins || mins <= 0) return
    setBusy(true)
    await post('lock', { locked: true, reason: 'manual', duration_minutes: mins })
    setLockMins('')
    await fetchStatus(); await fetchLogs()
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
    await fetchStatus(); await fetchRules(); await fetchLogs()
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

  async function handleCreateRule(e: React.FormEvent) {
    e.preventDefault()
    const nr = newRule
    setBusy(true)
    await post('rules', {
      day: nr.day.trim(),
      type: nr.type,
      anki_target: nr.anki_target,
      seterra_target_seconds: nr.seterra_mins * 60,
      duolingo_target_seconds: nr.duolingo_mins * 60,
      gaming_cap_seconds: nr.gaming_cap_hours * 3600,
      earn_rate: nr.earn_rate,
      priority: nr.priority,
      start_hour: nr.start_hour !== '' ? parseInt(nr.start_hour) : null,
      end_hour: nr.end_hour !== '' ? parseInt(nr.end_hour) : null,
    })
    setNewRule(BLANK_RULE)
    setShowRuleForm(false)
    await fetchRules(); await fetchStatus()
    setBusy(false)
  }

  async function handleDeleteRule(id: number) {
    setBusy(true)
    await fetch(`/api/poimenas/rules/${id}`, { method: 'DELETE' })
    await fetchRules(); await fetchStatus(); await fetchLogs()
    setBusy(false)
  }

  async function handleApproveExtension(id: number) {
    setBusy(true)
    await post(`extension/${id}/approve`, {})
    await fetchStatus(); await fetchLogs()
    setBusy(false)
  }

  async function handleDenyExtension(id: number) {
    setBusy(true)
    await post(`extension/${id}/deny`, {})
    await fetchStatus(); await fetchLogs()
    setBusy(false)
  }

  async function handleLogout() {
    await fetch('/api/watch/logout', { method: 'POST' })
    router.refresh()
  }

  async function handleAddDomain(e: React.FormEvent) {
    e.preventDefault()
    if (!newDomain.trim()) return
    setBusy(true)
    await post('dns/allowlist', { domain: newDomain.trim() })
    setNewDomain('')
    await fetchHealth()
    setBusy(false)
  }

  async function handleRemoveDomain(id: number) {
    setBusy(true)
    await fetch(`/api/poimenas/dns/allowlist/${id}`, { method: 'DELETE' })
    await fetchHealth()
    setBusy(false)
  }

  // ── Calendar helpers ──────────────────────────────────────────────────────

  const todayISO = new Date().toISOString().split('T')[0]

  function rulesForDay(day: string): RuleRecord[] {
    return rules
      .filter(r => r.day === day || (day === todayISO && r.day === todayISO))
      .sort((a, b) => b.priority - a.priority)
  }

  function defaultRules(): RuleRecord[] {
    return rules.filter(r => r.day === 'default').sort((a, b) => b.priority - a.priority)
  }

  const nr = newRule
  const t  = status?.today

  // ── Render ────────────────────────────────────────────────────────────────

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

      {/* Extension request — shown prominently when pending */}
      {status?.pending_extension && status.pending_extension.status === 'pending' && (
        <div className="border border-amber-400/30 bg-amber-900/15 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-amber-400">Extension Request</div>
              <div className="text-xs text-[#FAF7F0]/50 mt-0.5">
                {status.pending_extension.duration_minutes} min
                {status.pending_extension.reason
                  ? ` · "${status.pending_extension.reason}"`
                  : ''}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleApproveExtension(status.pending_extension!.id)}
                disabled={busy}
                className="text-xs px-3 py-1.5 border border-green-400/40 text-green-400 hover:bg-green-900/30 disabled:opacity-25 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleDenyExtension(status.pending_extension!.id)}
                disabled={busy}
                className="text-xs px-3 py-1.5 border border-red-400/40 text-red-400 hover:bg-red-900/30 disabled:opacity-25 transition-colors"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50 mb-3">System</p>
        <div className="grid grid-cols-2 gap-2">
          <StatusPill label="RPi Server" ok={!!health} detail={health ? `v${health.version}` : 'unreachable'} />
          <StatusPill label="Database" ok={health?.db_ok ?? false} />
          <StatusPill label="dnsmasq" ok={health?.dnsmasq_running ?? false} />
          <StatusPill label="DNS Mode" ok neutral detail={health ? (health.dns_locked ? 'allowlist' : 'forwarding') : '—'} />
          <StatusPill label="Agent" ok={status?.agent_online ?? false} detail={status?.last_heartbeat ? timeSince(status.last_heartbeat) : 'never'} />
        </div>
      </div>

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
              {status.reason === 'daily_bypass' ? ' · daily bypass active'
                : status.reason === 'extension' ? ' · extension active'
                : status.reason && status.reason !== 'prerequisite'
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

      {/* Today's progress */}
      {t && (
        <div>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50 mb-3">Today</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <StatCard label="Anki" value={t.anki_cards} target={t.anki_target} />
            <StatCard label="Seterra" value={t.seterra_active_seconds} target={t.seterra_target_seconds} asTime />
            <StatCard label="Duolingo" value={t.duolingo_active_seconds} target={t.duolingo_target_seconds} asTime />
            <StatCard label="Gaming" value={t.gaming_seconds} target={t.gaming_cap_seconds ?? 0} asTime />
          </div>
          {procStats.length > 0 && (
            <div className="mt-2 border border-[#D4AF37]/10 divide-y divide-[#D4AF37]/06">
              {procStats.map(p => (
                <div key={p.process} className="flex items-center justify-between px-4 py-1.5 text-xs">
                  <span className="text-[#FAF7F0]/40 font-mono">{p.process}</span>
                  <span className="text-[#FAF7F0]/30">{fmt(p.seconds)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Calendar */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50 mb-3">Week Schedule</p>
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map(day => {
            const dayRules = rulesForDay(day)
            const defs = dayRules.length === 0 ? defaultRules() : []
            const all = [...dayRules, ...defs]
            const isToday = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase() === day
            return (
              <div
                key={day}
                className={`p-2 border text-center ${isToday ? 'border-[#D4AF37]/30 bg-[#D4AF37]/05' : 'border-[#D4AF37]/08'}`}
              >
                <div className={`text-xs uppercase tracking-wide mb-1.5 ${isToday ? 'text-[#D4AF37]/70' : 'text-[#FAF7F0]/30'}`}>
                  {day}
                </div>
                {all.length === 0 ? (
                  <span className="text-[10px] text-[#FAF7F0]/15">—</span>
                ) : all.map(r => (
                  <div key={r.id} className={`text-[10px] px-1 py-0.5 mb-0.5 rounded ${TYPE_COLOR[r.type] ?? ''} ${defs.includes(r) ? 'opacity-40' : ''}`}>
                    {r.type === 'free' ? 'free' : r.type === 'earn_more' ? 'earn' : r.type.slice(0, 5)}
                    {r.start_hour != null && (
                      <span className="opacity-60 ml-0.5">{r.start_hour}-{r.end_hour}</span>
                    )}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
        {defaultRules().length > 0 && (
          <p className="text-xs text-[#FAF7F0]/20 mt-2">
            Default rule shown dimmed on days without a specific rule.
          </p>
        )}
      </div>

      {/* Rules */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50">Rules</p>
          <button
            onClick={() => setShowRuleForm(v => !v)}
            className="text-xs text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
          >
            {showRuleForm ? 'cancel' : '+ new rule'}
          </button>
        </div>

        <div className="border border-[#D4AF37]/10 mb-3">
          {rules.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[#FAF7F0]/25">No rules configured.</div>
          ) : rules.map((r, i) => (
            <div
              key={r.id}
              className="flex items-center gap-3 px-4 py-2.5 text-sm"
              style={{ borderTop: i > 0 ? '1px solid rgba(212,175,55,0.06)' : undefined }}
            >
              <span className="text-[#FAF7F0]/30 font-mono w-16 shrink-0 text-xs">{r.day}</span>
              <span className={`text-xs px-1.5 py-0.5 shrink-0 ${TYPE_COLOR[r.type] ?? ''}`}>
                {RULE_LABELS[r.type]}
              </span>
              <span className="text-[#FAF7F0]/40 text-xs flex-1 truncate">{ruleDetail(r)}</span>
              {r.start_hour != null && (
                <span className="text-[#FAF7F0]/20 text-xs shrink-0">{r.start_hour}–{r.end_hour}h</span>
              )}
              {r.priority > 0 && (
                <span className="text-[#FAF7F0]/20 text-xs shrink-0">p{r.priority}</span>
              )}
              <button
                onClick={() => handleDeleteRule(r.id)}
                disabled={busy}
                className="text-xs text-red-400/40 hover:text-red-400 disabled:opacity-40 transition-colors shrink-0"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {showRuleForm && (
          <form onSubmit={handleCreateRule} className="border border-[#D4AF37]/15 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-[#FAF7F0]/30 block mb-1">Day</label>
                <input
                  type="text" value={nr.day}
                  onChange={e => setNewRule(r => ({ ...r, day: e.target.value }))}
                  placeholder="default, mon, …"
                  className="w-full bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm placeholder-[#FAF7F0]/20 focus:outline-none focus:border-[#D4AF37]/40"
                />
              </div>
              <div>
                <label className="text-xs text-[#FAF7F0]/30 block mb-1">Type</label>
                <select
                  value={nr.type}
                  onChange={e => setNewRule(r => ({ ...r, type: e.target.value as RuleRecord['type'] }))}
                  className="w-full bg-[#3a0000]/80 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]/40"
                >
                  <option value="prerequisite">Prerequisite</option>
                  <option value="cap">Time cap</option>
                  <option value="earn_more">Earn more</option>
                  <option value="free">Free day</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#FAF7F0]/30 block mb-1">Priority</label>
                <input
                  type="number" value={nr.priority}
                  onChange={e => setNewRule(r => ({ ...r, priority: parseInt(e.target.value) || 0 }))}
                  className="w-full bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]/40"
                />
              </div>
            </div>

            {/* Active hours (optional) */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-[#FAF7F0]/30 block mb-1">Start hour (0–23, optional)</label>
                <input
                  type="number" min="0" max="23" value={nr.start_hour}
                  onChange={e => setNewRule(r => ({ ...r, start_hour: e.target.value }))}
                  placeholder="all day"
                  className="w-full bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm placeholder-[#FAF7F0]/20 focus:outline-none focus:border-[#D4AF37]/40"
                />
              </div>
              <div>
                <label className="text-xs text-[#FAF7F0]/30 block mb-1">End hour (exclusive)</label>
                <input
                  type="number" min="1" max="24" value={nr.end_hour}
                  onChange={e => setNewRule(r => ({ ...r, end_hour: e.target.value }))}
                  placeholder="all day"
                  className="w-full bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm placeholder-[#FAF7F0]/20 focus:outline-none focus:border-[#D4AF37]/40"
                />
              </div>
            </div>

            {(nr.type === 'cap' || nr.type === 'earn_more') && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-[#FAF7F0]/30 block mb-1">Gaming cap (hours)</label>
                  <input
                    type="number" step="0.5" min="0" value={nr.gaming_cap_hours}
                    onChange={e => setNewRule(r => ({ ...r, gaming_cap_hours: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]/40"
                  />
                </div>
                {nr.type === 'earn_more' && (
                  <div>
                    <label className="text-xs text-[#FAF7F0]/30 block mb-1">Earn rate (×)</label>
                    <input
                      type="number" step="0.5" min="0.5" value={nr.earn_rate}
                      onChange={e => setNewRule(r => ({ ...r, earn_rate: parseFloat(e.target.value) || 1 }))}
                      className="w-full bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]/40"
                    />
                  </div>
                )}
              </div>
            )}

            {(nr.type === 'prerequisite' || nr.type === 'earn_more') && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-[#FAF7F0]/30 block mb-1">Anki cards</label>
                  <input
                    type="number" min="0" value={nr.anki_target}
                    onChange={e => setNewRule(r => ({ ...r, anki_target: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]/40"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#FAF7F0]/30 block mb-1">Seterra (min)</label>
                  <input
                    type="number" min="0" value={nr.seterra_mins}
                    onChange={e => setNewRule(r => ({ ...r, seterra_mins: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]/40"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#FAF7F0]/30 block mb-1">Duolingo (min)</label>
                  <input
                    type="number" min="0" value={nr.duolingo_mins}
                    onChange={e => setNewRule(r => ({ ...r, duolingo_mins: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-3 py-1.5 text-sm focus:outline-none focus:border-[#D4AF37]/40"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={busy || !nr.day.trim()}
              className="px-4 py-2 bg-[#D4AF37] text-[#4A0000] text-sm font-bold hover:bg-[#c4a030] disabled:opacity-40 transition-colors"
            >
              Create Rule
            </button>
          </form>
        )}
      </div>

      {/* Actions */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50 mb-3">Actions</p>
        <div className="space-y-3">
          <button
            onClick={handleFreeDay}
            disabled={busy}
            className="px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] text-sm hover:bg-[#D4AF37]/10 disabled:opacity-40 transition-colors"
          >
            Free day (today)
          </button>

          <form onSubmit={handleTimedLock} className="flex gap-2">
            <input
              type="number" value={lockMins}
              onChange={e => setLockMins(e.target.value)}
              placeholder="minutes" min="1"
              className="w-28 bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-4 py-2 text-sm placeholder-[#FAF7F0]/25 focus:outline-none focus:border-[#D4AF37]/40"
            />
            <button
              type="submit"
              disabled={busy || !lockMins}
              className="px-4 py-2 border border-red-400/30 text-red-400 text-sm hover:bg-red-900/20 disabled:opacity-40 transition-colors"
            >
              Lock for X min
            </button>
          </form>

          <form onSubmit={handleMessage} className="flex gap-2">
            <input
              type="text" value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Send a message to the widget…"
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

      {/* DNS Allowlist */}
      <div>
        <p className="text-xs uppercase tracking-widest text-[#D4AF37]/50 mb-3">DNS Allowlist</p>
        <div className="border border-[#D4AF37]/10 mb-3">
          {!health || health.allowlist.length === 0 ? (
            <div className="px-4 py-3 text-sm text-[#FAF7F0]/25">No domains.</div>
          ) : health.allowlist.map((d, i) => (
            <div
              key={d.id}
              className="flex items-center justify-between px-4 py-2 text-sm"
              style={{ borderTop: i > 0 ? '1px solid rgba(212,175,55,0.06)' : undefined }}
            >
              <span className="text-[#FAF7F0]/60 font-mono">{d.domain}</span>
              <button
                onClick={() => handleRemoveDomain(d.id)}
                disabled={busy}
                className="text-xs text-red-400/50 hover:text-red-400 disabled:opacity-40 transition-colors"
              >
                remove
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddDomain} className="flex gap-2">
          <input
            type="text" value={newDomain}
            onChange={e => setNewDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 bg-[#3a0000]/50 border border-[#D4AF37]/15 text-[#FAF7F0] px-4 py-2 text-sm font-mono placeholder-[#FAF7F0]/25 focus:outline-none focus:border-[#D4AF37]/40"
          />
          <button
            type="submit"
            disabled={busy || !newDomain.trim()}
            className="px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] text-sm hover:bg-[#D4AF37]/10 disabled:opacity-40 transition-colors"
          >
            Add
          </button>
        </form>
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
