import { useState, useRef } from 'react'

export default function PasswordGenerator() {
  const [length, setLength] = useState(20)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const generatorRef = useRef(null)

  const letters = ['uppercase', 'lowercase', 'numbers', 'symbols']
  const activeCount = letters.filter((k) => options[k]).length

  function generate() {
    const len = Math.max(4, Math.min(64, length))
    let chars = ''
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (options.numbers) chars += '0123456789'
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!chars) {
      setPassword('Select at least one option')
      return
    }

    const pools = []
    if (options.uppercase) pools.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    if (options.lowercase) pools.push('abcdefghijklmnopqrstuvwxyz')
    if (options.numbers) pools.push('0123456789')
    if (options.symbols) pools.push('!@#$%^&*()_+-=[]{}|;:,.<>?')

    const buf = new Uint32Array(len)
    crypto.getRandomValues(buf)

    let result = ''
    pools.forEach((pool) => {
      result += pool[buf[result.length] % pool.length]
    })
    for (let i = result.length; i < len; i++) {
      result += chars[buf[i] % chars.length]
    }

    const arr = result.split('')
    for (let i = arr.length - 1; i > 0; i--) {
      const j = buf[i + pools.length] % (i + 1)
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setPassword(arr.join(''))
    setCopied(false)
  }

  async function copy() {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard unavailable
    }
  }

  function toggle(key) {
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      if (!letters.some((k) => next[k])) return prev
      return next
    })
  }

  function basePoolSize() {
    let n = 0
    if (options.uppercase) n += 26
    if (options.lowercase) n += 26
    if (options.numbers) n += 10
    if (options.symbols) n += 33
    return n
  }

  function score() {
    if (!password || password === 'Select at least one option') return 0
    const poolSize = basePoolSize()
    const entropy = length * Math.log2(poolSize || 1)
    let s = 0
    if (entropy >= 40) s++
    if (entropy >= 60) s++
    if (entropy >= 80) s++
    if (entropy >= 100) s++
    if (activeCount >= 3) s++
    if (activeCount === 4) s++
    return s
  }

  const s = score()
  const strengthLabel =
    s === 0
      ? 'Very Weak'
      : s <= 2
        ? 'Weak'
        : s <= 4
          ? 'Fair'
          : s <= 5
            ? 'Strong'
            : 'Excellent'
  const strengthPct = s === 0 ? 8 : s * 16
  const strengthColor =
    s === 0
      ? 'var(--danger)'
      : s <= 2
        ? 'var(--danger)'
        : s <= 4
          ? 'var(--warning)'
          : 'var(--success)'

  return (
    <div className="gt-wrap" ref={generatorRef}>
      <div className="gt-output">
        <input
          readOnly
          value={password}
          placeholder="Your secure password will appear here"
          aria-label="Generated password"
        />
        <button className="gt-copy" onClick={copy} title="Copy password">
          {copied ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="gt-strength">
        <div className="gt-strength-top">
          <span>Strength</span>
          <strong style={{ color: strengthColor }}>{strengthLabel}</strong>
        </div>
        <div className="gt-meter">
          <div
            className="gt-meter-fill"
            style={{ width: `${strengthPct}%`, background: strengthColor }}
          />
        </div>
      </div>

      <div className="gt-length">
        <div className="gt-length-head">
          <label htmlFor="length">Password Length</label>
          <span className="gt-length-val">{length}</span>
        </div>
        <input
          id="length"
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <div className="gt-length-scale">
          <span>4</span>
          <span>64</span>
        </div>
      </div>

      <div className="gt-options">
        {letters.map((key) => (
          <label className="gt-opt" key={key}>
            <span className="gt-opt-label">
              {key === 'uppercase' && <em>Aa</em>}
              {key === 'lowercase' && <em>aa</em>}
              {key === 'numbers' && <em>123</em>}
              {key === 'symbols' && <em>#!</em>}
              <b>{key[0].toUpperCase() + key.slice(1)}</b>
              {key === 'uppercase' && ' (A-Z)'}
              {key === 'lowercase' && ' (a-z)'}
              {key === 'numbers' && ' (0-9)'}
              {key === 'symbols' && ' (!@#...)'}
            </span>
            <input type="checkbox" checked={options[key]} onChange={() => toggle(key)} />
            <span className="gt-check" />
          </label>
        ))}
      </div>

      <button className="gt-generate" onClick={generate} style={{ '--ga': strengthColor }}>
        Generate Strong Password
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </button>

      <p className="gt-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Generated locally in your browser. Nothing is ever sent to a server.
      </p>
    </div>
  )
}
