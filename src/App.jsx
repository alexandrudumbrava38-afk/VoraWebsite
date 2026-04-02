import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Registrazione from './pages/Registrazione'
import TutorialWallet from './pages/TutorialWallet'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import StartRender from './pages/StartRender'
import SharePC from './pages/SharePC'
import About from './pages/About'
import Showcase from './pages/Showcase'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Investors from './pages/Investors'
import PricingPage from './pages/PricingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registrazione" element={<Registrazione />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tutorial-wallet" element={<TutorialWallet />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start-render" element={<StartRender />} />
        <Route path="/share-pc" element={<SharePC />} />
        <Route path="/about" element={<About />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

/* Legacy markup preserved below — no longer rendered */
function _LegacyApp() {
  return (
    <div className="site-root">
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            <span className="logo-badge">⚡</span>
            <span className="logo-text">Vora</span>
          </div>
          <nav className="nav">
            <a>Products</a>
            <a>Pricing</a>
            <a>Docs</a>
            <a>Blog</a>
            <a>Company</a>
          </nav>
          <div className="header-cta">
            <button className="btn btn-ghost">Sign In</button>
            <button className="btn btn-primary">Get Started →</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-kicker">Platform</div>
            <h1 className="hero-title">
              Deploy smarter.
              <br />
              <span className="accent">Scale fearlessly.</span>
            </h1>
            <p className="hero-sub">
              The cloud infrastructure platform built for modern engineering teams.
              Instant deployments, intelligent auto-scaling, and zero-downtime releases.
            </p>

            <div className="hero-ctas">
              <button className="btn btn-accent">Start for free</button>
              <button className="btn btn-ghost">View documentation</button>
            </div>

            <div className="hero-stats">
              <div><strong>10M+</strong><span>Deployments / month</span></div>
              <div><strong>99.99%</strong><span>Uptime SLA</span></div>
              <div><strong>150+</strong><span>Edge locations</span></div>
              <div><strong>&lt;50ms</strong><span>Avg. cold start</span></div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container features-grid">
            <div className="feature-card">
              <div className="icon">🔗</div>
              <h3>Connect your repository</h3>
              <p>Link GitHub, GitLab, or Bitbucket. Vora auto-detects your framework and configures the build pipeline for you.</p>
            </div>
            <div className="feature-card">
              <div className="icon">⚙️</div>
              <h3>Configure your stack</h3>
              <p>Define resources, env variables, and scaling rules via dashboard or a simple YAML config. Infrastructure as code.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🚀</div>
              <h3>Ship and iterate</h3>
              <p>Every push triggers a build and deploys with zero downtime. Automatic rollbacks on failed health checks.</p>
            </div>
          </div>
        </section>

        <section className="pricing">
          <div className="container pricing-grid">
            <div className="price-card">
              <div className="muted">Starter</div>
              <h2>Free</h2>
              <p>For side projects and personal apps. No credit card needed.</p>
              <button className="btn btn-outline">Start building</button>
              <ul className="features-list">
                <li>3 projects</li>
                <li>100 GB bandwidth / month</li>
                <li>Auto-scaling (up to 2 replicas)</li>
              </ul>
            </div>

            <div className="price-card price-card-pro">
              <div className="badge">Most Popular</div>
              <div className="muted">Pro</div>
              <h2>$29 <span className="per">/mo</span></h2>
              <p>For teams that need more power, speed, and collaboration.</p>
              <button className="btn btn-primary">Start free trial</button>
              <ul className="features-list">
                <li>Unlimited projects</li>
                <li>1 TB bandwidth / month</li>
                <li>Auto-scaling (unlimited replicas)</li>
              </ul>
            </div>

            <div className="price-card">
              <div className="muted">Enterprise</div>
              <h2>Custom</h2>
              <p>For organizations with strict security and compliance needs.</p>
              <button className="btn btn-outline">Contact sales</button>
              <ul className="features-list">
                <li>Everything in Pro</li>
                <li>99.99% uptime SLA</li>
                <li>Dedicated support engineer</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} Vora — Built with VoraWebsite</div>
          <div>Privacy · Terms</div>
        </div>
      </footer>
    </div>
  )
}