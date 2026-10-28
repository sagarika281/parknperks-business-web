import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import '@/pages/AgenticCommerce/AgenticCommerce.css'
import '../Jules.css'

const FEATURES = [
  {
    title: 'Autonomous Actions',
    body: 'Reorders stock, corrects loyalty points, schedules campaigns — without you lifting a finger.',
    tone: 'amber',
    icon: 'bolt',
  },
  {
    title: 'Live Business Intelligence',
    body: 'Surfaces revenue, footfall and loyalty trends before you ask.',
    tone: 'blue',
    icon: 'chart',
  },
  {
    title: 'Customer Intelligence',
    body: 'Identifies at-risk members and high-value guests in real time.',
    tone: 'violet',
    icon: 'people',
  },
  {
    title: 'Preparedness Scoring',
    body: 'Scores event readiness, flags gaps, schedules prep tasks automatically.',
    tone: 'slate',
    icon: 'list',
  },
  {
    title: 'Approval Workflows',
    body: 'Routes high-risk actions for owner review with full context.',
    tone: 'green',
    icon: 'check',
  },
  {
    title: 'Contextual Guidance',
    body: 'Guides your staff through shift tasks, checklist completion, and escalations step by step.',
    tone: 'lilac',
    icon: 'chat',
  },
] as const

const OWNER_PROMPTS = [
  'Get us ready for the rain this evening',
  'Why is Lifestyle Bridge costing more?',
  "Review today's business",
] as const

const STAFF_PROMPTS = [
  'Guide me through my shift',
  'I found a stock issue',
  'Complete my checklist',
] as const

type JulesView = 'features' | 'agent'

type JulesPanelProps = {
  employeeName?: string
  employeeRole?: string
  onClose: () => void
  onOpenWorkspace: () => void
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function JulesPanel({
  employeeName = 'Sagar Malhotra',
  employeeRole = 'Owner',
  onClose,
  onOpenWorkspace,
}: JulesPanelProps) {
  const [moreOpen, setMoreOpen] = useState(false)
  const [view, setView] = useState<JulesView>('features')
  const [listening, setListening] = useState(true)
  const [typingOpen, setTypingOpen] = useState(false)
  const [requestText, setRequestText] = useState('')
  const typeInputRef = useRef<HTMLInputElement>(null)

  const firstName = employeeName.split(' ')[0] || 'there'
  const initial = (employeeName.trim()[0] || 'S').toUpperCase()
  const isOwner = /owner/i.test(employeeRole)
  const prompts = isOwner ? OWNER_PROMPTS : STAFF_PROMPTS
  const agentHeadline = isOwner
    ? `${greeting()}, ${firstName}. Ready to run the evening?`
    : `${greeting()}. Here's your shift overview.`

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (!typingOpen) return
    typeInputRef.current?.focus()
  }, [typingOpen])

  const today = new Date()
  const weekday = today.toLocaleDateString('en-GB', { weekday: 'short' })
  const month = today.toLocaleDateString('en-GB', { month: 'short' })
  const dateLabel = `${weekday}, ${today.getDate()} ${month}. ${today.getFullYear()}`

  return createPortal(
    <>
      <button type="button" className="jules-backdrop" aria-label="Close Jules" onClick={onClose} />
      <aside className="jules-panel" role="dialog" aria-modal="true" aria-label="Jules">
        <header className="jules-head">
          <span className="jules-owner">
            <span className="jules-owner-mark" aria-hidden="true">
              {initial}
            </span>
            {isOwner ? 'Owner' : employeeRole}
          </span>
          <div className="jules-identity">
            <strong className="jules-brand">PARK[N]PERKS</strong>
            <span className="jules-date">{dateLabel}</span>
          </div>
          <div className="jules-head-actions">
            <button type="button" className="jules-workspace" onClick={onOpenWorkspace}>
              Open Workspace
            </button>
            <span className="jules-demo">DEMO</span>
            <button
              type="button"
              className="jules-icon-btn"
              aria-label="More options"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((open) => !open)}
            >
              ···
            </button>
            <button
              type="button"
              className={view === 'features' ? 'jules-spark' : 'jules-icon-btn'}
              aria-label={view === 'features' ? 'Open Jules assistant' : 'Show Jules features'}
              aria-pressed={view === 'features'}
              onClick={() => {
                setView((current) => (current === 'features' ? 'agent' : 'features'))
                setTypingOpen(false)
                setRequestText('')
              }}
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true">
                <path
                  d="M12 3.2 13.4 8.6 18.8 10 13.4 11.4 12 16.8 10.6 11.4 5.2 10 10.6 8.6 12 3.2z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button type="button" className="jules-close" aria-label="Close" onClick={onClose}>
              ×
            </button>
            {moreOpen ? (
              <div className="jules-more" role="menu">
                <button type="button" role="menuitem" onClick={onOpenWorkspace}>
                  Open Workspace
                </button>
              </div>
            ) : null}
          </div>
        </header>

        {view === 'features' ? (
          <>
            <div className="jules-hero">
              <h2>
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path
                    d="M12 3.2 13.2 8.4 18.4 9.6 13.2 10.8 12 16 10.8 10.8 5.6 9.6 10.8 8.4 12 3.2z"
                    fill="currentColor"
                  />
                </svg>
                Jules — Agentic Commerce AI
              </h2>
              <p>Runs your business autonomously. Surfaces insights. Acts on opportunities.</p>
            </div>

            <div className="jules-scroll">
              <ul className="jules-list">
                {FEATURES.map((feature) => (
                  <li key={feature.title}>
                    <span className={`jules-icon is-${feature.tone}`} aria-hidden="true">
                      <FeatureIcon name={feature.icon} />
                    </span>
                    <span>
                      <strong>{feature.title}</strong>
                      <p>{feature.body}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button type="button" className="jules-start" onClick={onOpenWorkspace}>
              Start Using Jules →
            </button>
          </>
        ) : (
          <>
            <div className="agent-action-body jules-agent-body">
              <h2>{agentHeadline}</h2>

              <div className="agent-action-voice">
                <button
                  type="button"
                  className={listening ? 'agent-action-mic is-live' : 'agent-action-mic'}
                  aria-pressed={listening}
                  aria-label={listening ? 'Stop listening' : 'Start listening'}
                  onClick={() => setListening((live) => !live)}
                >
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" aria-hidden="true">
                    <rect x="9" y="3.5" width="6" height="11" rx="3" fill="#fff" />
                    <path
                      d="M7 11.5a5 5 0 0 0 10 0M12 16.5v3.2M9.2 19.7h5.6"
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div
                  className={listening ? 'agent-action-bars is-live' : 'agent-action-bars'}
                  aria-hidden="true"
                >
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <p>Tap to speak</p>
              </div>

              <div className="agent-action-cta">
                <button type="button" className="agent-action-brief">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                    <path
                      d="M12 4v3M12 17v3M5.5 7.5 7.6 9.6M16.4 14.4l2.1 2.1M4 12h3M17 12h3M5.5 16.5 7.6 14.4M16.4 9.6l2.1-2.1"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="12" r="2.4" fill="currentColor" />
                  </svg>
                  Hear my briefing
                </button>
                <button
                  type="button"
                  className={typingOpen ? 'agent-action-type is-active' : 'agent-action-type'}
                  aria-pressed={typingOpen}
                  onClick={() => setTypingOpen((open) => !open)}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                    <rect
                      x="3.5"
                      y="6"
                      width="17"
                      height="12"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M7 15h10M7 10h.01M10 10h.01M13 10h.01M16 10h.01"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                  Type instead
                </button>
              </div>

              {typingOpen ? (
                <form
                  className="agent-action-compose"
                  onSubmit={(event) => {
                    event.preventDefault()
                    setRequestText('')
                  }}
                >
                  <input
                    ref={typeInputRef}
                    type="text"
                    value={requestText}
                    onChange={(event) => setRequestText(event.target.value)}
                    placeholder="Type your request..."
                    aria-label="Type your request"
                  />
                  <button type="submit" aria-label="Send request" disabled={!requestText.trim()}>
                    →
                  </button>
                </form>
              ) : null}

              <div className="agent-action-prompts">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setTypingOpen(true)
                      setRequestText(prompt)
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <footer className="agent-action-foot">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path
                    d="M12 3.5 19 6.2v5.2c0 4.4-2.9 7.8-7 9.1-4.1-1.3-7-4.7-7-9.1V6.2L12 3.5z"
                    fill="#3b78c2"
                  />
                  <path
                    d="m9 12 2.1 2.1L15.4 10"
                    stroke="#fff"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              Guarded Autopilot
            </footer>
          </>
        )}
      </aside>
    </>,
    document.body,
  )
}

function FeatureIcon({ name }: { name: (typeof FEATURES)[number]['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'bolt') {
    return (
      <svg {...common}>
        <path d="M13 3 6 13h5l-1 8 8-11h-5l1-7z" />
      </svg>
    )
  }
  if (name === 'chart') {
    return (
      <svg {...common}>
        <path d="M4 19h16M7 16V10M12 16V6M17 16v-4" />
      </svg>
    )
  }
  if (name === 'people') {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="2.4" />
        <circle cx="16" cy="9" r="2" />
        <path d="M4.5 18c.6-2.4 2.2-3.6 4.5-3.6s3.9 1.2 4.5 3.6M14 14.6c1.2.2 2.2.9 2.8 2.4" />
      </svg>
    )
  }
  if (name === 'list') {
    return (
      <svg {...common}>
        <path d="M8 7h10M8 12h10M8 17h10" />
        <path d="M5 7h.01M5 12h.01M5 17h.01" />
      </svg>
    )
  }
  if (name === 'check') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12.2 2.3 2.3 4.7-5" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M6 16.5V8.8A2.8 2.8 0 0 1 8.8 6h6.4A2.8 2.8 0 0 1 18 8.8v4.2a2.8 2.8 0 0 1-2.8 2.8H9.2L6 18.5z" />
    </svg>
  )
}
