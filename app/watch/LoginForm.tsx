'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const res = await fetch('/api/watch/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    setLoading(false)
    if (res.ok) {
      router.refresh()
    } else {
      setError(true)
      setPw('')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] relative z-10">
      <div className="w-full max-w-xs">
        <h1
          className="text-3xl font-medium text-[#FAF7F0] mb-8 text-center"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Watch
        </h1>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full bg-[#3a0000] border border-[#D4AF37]/30 text-[#FAF7F0] px-4 py-3 text-sm placeholder-[#FAF7F0]/30 focus:outline-none focus:border-[#D4AF37]/70"
          />
          {error && (
            <p className="text-sm text-red-400">Incorrect password.</p>
          )}
          <button
            type="submit"
            disabled={loading || !pw}
            className="w-full bg-[#D4AF37] text-[#4A0000] font-bold py-3 text-sm hover:bg-[#c4a030] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
