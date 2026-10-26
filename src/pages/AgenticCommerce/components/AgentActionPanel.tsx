import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const PROMPTS = [
  'Guide me through my shift',
  'I found a stock issue',
  'Complete my checklist',
] as const

type AgentActionPanelProps = {
  role?: string
  onClose: () => void
  onOpenWorkspace?: () => void
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatPanelDate(date: Date) {
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'short' })
  const month = date.toLocaleDateString('en-GB', { month: 'short' })
  return `${weekday}, ${date.getDate()} ${month}, ${date.getFullYear()}`
}

export function AgentActionPanel({
  role = 'Staff',
  onClose,
  onOpenWorkspace,
}: AgentActionPanelProps) {
  const [moreOpen, setMoreOpen] = useState(false)
  const [listening, setListening] = useState(true)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <>
      <button
        type="button"
        className="agent-action-backdrop"
        aria-label="Close agent action"
        onClick={onClose}
      />
      <aside
        className="agent-action-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Agent Action"
      >
        <header className="agent-action-head">
          <span className="agent-action-role">
            <span className="agent-action-role-mark" aria-hidden="true">
              N
            </span>
            {role}
          </span>
          <div className="agent-action-identity">
            <strong>PARK[N]PERKS</strong>
            <span>{formatPanelDate(new Date())}</span>
          </div>
          <div className="agent-action-head-actions">
            <button
              type="button"
              className="agent-action-workspace"
              onClick={() => onOpenWorkspace?.()}
            >
              Open Workspace
            </button>
            <span className="agent-action-demo">DEMO</span>
            <button
              type="button"
              className="agent-action-icon"
              aria-label="More options"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((open) => !open)}
            >
              ···
            </button>
            <button
              type="button"
              className="agent-action-icon"
              aria-label="Close"
              onClick={onClose}
            >
              ×
            </button>
            {moreOpen ? (
              <div className="agent-action-more" role="menu">
                <button type="button" role="menuitem" onClick={() => onOpenWorkspace?.()}>
                  Open Workspace
                </button>
              </div>
            ) : null}
          </div>
        </header>

        <div className="agent-action-body">
          <h2>{greeting()}. Here&apos;s your shift overview.</h2>

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
            <button type="button" className="agent-action-type">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M7 15h10M7 10h.01M10 10h.01M13 10h.01M16 10h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              Type instead
            </button>
          </div>

          <div className="agent-action-prompts">
            {PROMPTS.map((prompt) => (
              <button key={prompt} type="button">
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
              <path d="m9 12 2.1 2.1L15.4 10" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
          Guarded Autopilot
        </footer>
      </aside>
    </>,
    document.body,
  )
}
