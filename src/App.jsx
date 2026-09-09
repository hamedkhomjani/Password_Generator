import { useEffect, useState } from 'react'
import PasswordGenerator from './components/PasswordGenerator'
import './App.css'

function getInitialTheme() {
  const saved = localStorage.getItem('sl-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('sl-theme', theme)
  }, [theme])

  return (
    <div className="site">
      <header className="nav">
        <nav className="nav-inner">
          <a href="#top" className="brand">
            <div className="brand-mark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <span className="brand-name">
              Secure<em>Lock</em>
            </span>
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#faq">FAQ</a>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label="Toggle light and dark theme"
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
          <a href="#generator" className="nav-cta">Generate Now</a>
        </nav>
      </header>

      <section id="top" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="pill">Free · Open Source · Zero Data</span>
            <h1>
              Create <span className="grad">unbreakable passwords</span> in one click
            </h1>
            <p>
              SecureLock generates cryptographically secure random passwords
              right in your browser. No servers, no tracking, no compromise.
            </p>
            <div className="hero-actions">
              <a href="#generator" className="btn-primary">Start Generating</a>
              <a href="#features" className="btn-ghost">Explore Features</a>
            </div>
            <div className="hero-stats">
              <div>
                <strong>256-bit</strong>
                <span>Entropy available</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Local & private</span>
              </div>
              <div>
                <strong>0</strong>
                <span>Passwords stored</span>
              </div>
            </div>
          </div>
          <div className="hero-card" id="generator">
            <PasswordGenerator />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features" id="features">
        <div className="section-head">
          <span className="pill">Why SecureLock</span>
          <h2>Everything you need for strong security</h2>
          <p>Advanced features packed into a simple, professional tool.</p>
        </div>
        <div className="feature-grid">
          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3>Real Cryptographic Randomness</h3>
            <p>
              Powered by the Web Crypto API, the same industry-standard
              randomness used by banks and security professionals.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Fully Private & Offline</h3>
            <p>
              Passwords never leave your device. Everything runs locally —
              ideal for sensitive, high-privilege accounts.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            </div>
            <h3>Customizable to Your Needs</h3>
            <p>
              Fine-tune length from 4 to 64 characters and choose exactly which
              character sets to include or exclude.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3>Instant Strength Assessment</h3>
            <p>
              A live entropy-based meter shows you exactly how strong your
              password is before you use it.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </div>
            <h3>One-Click Copy</h3>
            <p>
              Safely copy your new password to the clipboard with a single
              click — effortlessly move it into any login form.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.5-6.3 4.5L8 13.8 2 9.4h7.6z" />
              </svg>
            </div>
            <h3>No Account Required</h3>
            <p>
              Start generating instantly. There&apos;s nothing to sign up for and
              no data to hand over — it just works.
            </p>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="section security" id="security">
        <div className="section-head">
          <span className="pill">Security First</span>
          <h2>How your passwords stay safe</h2>
          <p>We treat your privacy as our top priority.</p>
        </div>
        <div className="security-grid">
          <div className="sec-step">
            <div className="sec-num">01</div>
            <h3>Generated Locally</h3>
            <p>
              Passwords are created entirely within your browser using the Web
              Crypto API — nothing is transmitted anywhere.
            </p>
          </div>
          <div className="sec-step">
            <div className="sec-num">02</div>
            <h3>No Storage, Ever</h3>
            <p>
              We do not store, log, or save any generated password. Once you
              copy it, it&apos;s gone from our hands forever.
            </p>
          </div>
          <div className="sec-step">
            <div className="sec-num">03</div>
            <h3>Industry-Standard Entropy</h3>
            <p>
              Each character is drawn from a cryptographically secure random
              source, giving you bank-grade strength.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="faq">
        <div className="section-head">
          <span className="pill">FAQ</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq-list">
          <FaqItem
            q="Is it really possible that my passwords are never sent anywhere?"
            a="Yes. The entire generator runs in your browser's JavaScript engine. There is no backend server, no analytics script, and no network request made when you generate. Your password exists only in your own device memory."
          />
          <FaqItem
            q="What password length should I use?"
            a="For most accounts, 16 characters is a great baseline. For high-value accounts like email, banking, or password managers, we recommend 20-32 characters. The length slider covers up to 64 characters, which is more than enough for any modern system."
          />
          <FaqItem
            q="Should I include all character types?"
            a="Generally yes — mixing uppercase, lowercase, numbers, and symbols dramatically increases the entropy of your password. However, some legacy systems restrict special characters, so SecureLock lets you customize exactly which sets to include."
          />
          <FaqItem
            q="Is a long random password better than a passphrase?"
            a="Both approaches are excellent. A sufficiently long random password (16+ characters) provides enormous entropy. If a system accepts spaces, a multi-word passphrase of 4-6 random words can also be very strong and more memorable. Either is vastly better than a reused or predictable password."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-inner">
          <h2>Ready to lock down your accounts?</h2>
          <p>Generate a strong, unique password right now — it takes seconds.</p>
          <a href="#generator" className="btn-primary">Generate Your Password</a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="brand">
            <div className="brand-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <span className="brand-name">
              Secure<em>Lock</em>
            </span>
          </div>
          <p className="footer-tag">
            Free, open-source password generation. Your security starts here.
          </p>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#faq">FAQ</a>
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} SecureLock. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FaqItem({ q, a }) {
  return (
    <details className="faq-item">
      <summary>{q}</summary>
      <p>{a}</p>
    </details>
  )
}

export default App
