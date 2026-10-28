import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  COMPLETED_ACTIONS,
  EVIDENCE_ITEMS,
  PIPELINE_STEPS,
  PLAN_ITEMS,
  type EvidenceItem,
  type JulesChatMessage,
  type PipelineStepStatus,
} from '../constants/workspace'
import '../Jules.css'

type CentreTab = 'pipeline' | 'plan' | 'actions'
type RailTab = 'evidence' | 'approvals' | 'audit'

/** Stop on Policy Check (index 5) after walking steps one by one. */
const PIPELINE_HOLD_AT = 5
const STEP_MS = 850

type JulesWorkspaceProps = {
  employeeName: string
  employeeRole: string
  outletName?: string
  onBackToDrawer: () => void
  onClose: () => void
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function stepStatus(index: number, activeIndex: number): PipelineStepStatus {
  if (index < activeIndex) return 'done'
  if (index === activeIndex) return 'active'
  return 'pending'
}

export function JulesWorkspace({
  employeeName,
  employeeRole,
  outletName = 'Bandra West',
  onBackToDrawer,
  onClose,
}: JulesWorkspaceProps) {
  const [centreTab, setCentreTab] = useState<CentreTab>('pipeline')
  const [railTab, setRailTab] = useState<RailTab>('evidence')
  const [draft, setDraft] = useState('')
  const [activeStep, setActiveStep] = useState(-1)
  const [pipelineRun, setPipelineRun] = useState(0)
  const stepTimerRef = useRef<number | null>(null)
  const firstName = employeeName.split(' ')[0] || 'there'
  const initial = (employeeName.trim()[0] || 'S').toUpperCase()
  const isOwner = /owner/i.test(employeeRole)
  const roleLabel = isOwner ? 'Owner' : employeeRole

  const [messages, setMessages] = useState<JulesChatMessage[]>([
    {
      id: 'greet',
      role: 'assistant',
      text: `${greeting()}, ${firstName}. Ready to run the evening?`,
    },
  ])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (pipelineRun === 0) return

    if (stepTimerRef.current != null) {
      window.clearInterval(stepTimerRef.current)
      stepTimerRef.current = null
    }

    setActiveStep(0)

    stepTimerRef.current = window.setInterval(() => {
      setActiveStep((current) => {
        if (current >= PIPELINE_HOLD_AT) {
          if (stepTimerRef.current != null) {
            window.clearInterval(stepTimerRef.current)
            stepTimerRef.current = null
          }
          return PIPELINE_HOLD_AT
        }
        return current + 1
      })
    }, STEP_MS)

    return () => {
      if (stepTimerRef.current != null) {
        window.clearInterval(stepTimerRef.current)
        stepTimerRef.current = null
      }
    }
  }, [pipelineRun])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const stamp = Date.now()
    setMessages((current) => [
      ...current,
      { id: `user-${stamp}`, role: 'user', text: trimmed },
    ])
    setDraft('')
    setCentreTab('pipeline')
    setRailTab('evidence')
    setPipelineRun((run) => run + 1)

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assist-${stamp}`,
          role: 'assistant',
          text: "Heavy rain likely 4-7 PM. I've prepared a Rain Response Plan with 6 actions. 3 items need your approval to proceed.",
        },
      ])
    }, STEP_MS * 2)
  }

  return createPortal(
    <div className="jules-ws" role="dialog" aria-modal="true" aria-label="Jules workspace">
      <aside className="jules-ws-chat" aria-label="Jules conversation">
        <header className="jules-ws-chat-head">
          <span className="jules-ws-owner">
            <span className="jules-ws-owner-mark" aria-hidden="true">
              {initial}
            </span>
            {roleLabel}
          </span>
          <div className="jules-ws-identity">
            <strong>PARK[N]PERKS</strong>
            <span>{outletName}</span>
          </div>
          <div className="jules-ws-chat-actions">
            <button type="button" className="jules-ws-drawer" onClick={onBackToDrawer}>
              ← Drawer
            </button>
            <button type="button" className="jules-ws-close" aria-label="Close Jules" onClick={onClose}>
              ×
            </button>
          </div>
        </header>

        <div className="jules-ws-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === 'user' ? 'jules-ws-bubble is-user' : 'jules-ws-bubble is-assistant'
              }
            >
              {message.text}
            </div>
          ))}
        </div>

        <form
          className="jules-ws-compose"
          onSubmit={(event) => {
            event.preventDefault()
            sendMessage(draft)
          }}
        >
          <button type="button" className="jules-ws-mic" aria-label="Speak">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <rect x="9" y="3.5" width="6" height="11" rx="3" fill="#fff" />
              <path
                d="M7 11.5a5 5 0 0 0 10 0M12 16.5v3.2M9.2 19.7h5.6"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type a message..."
            aria-label="Type a message"
          />
          <button type="submit" aria-label="Send message" disabled={!draft.trim()}>
            →
          </button>
        </form>
      </aside>

      <section className="jules-ws-centre" aria-label="Jules processing">
        <div className="jules-ws-tabs" role="tablist" aria-label="Workspace views">
          {(
            [
              ['pipeline', 'Pipeline'],
              ['plan', 'Plan'],
              ['actions', 'Actions'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={centreTab === id}
              className={centreTab === id ? 'is-active' : undefined}
              onClick={() => setCentreTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {centreTab === 'pipeline' ? (
          <div className="jules-ws-pipeline">
            <h2>Processing Pipeline</h2>
            <ol>
              {PIPELINE_STEPS.map((step, index) => {
                const status = stepStatus(index, activeStep)
                return (
                  <li key={step} className={`is-${status}`}>
                    <span className="jules-ws-step-mark" aria-hidden="true">
                      {status === 'done' ? '✓' : index + 1}
                    </span>
                    <span className="jules-ws-step-label">{step}</span>
                    {status === 'active' ? (
                      <span className="jules-ws-spinner" aria-hidden="true" />
                    ) : null}
                  </li>
                )
              })}
            </ol>
          </div>
        ) : null}

        {centreTab === 'plan' ? (
          <div className="jules-ws-plan">
            <h2>Rain Response Plan</h2>
            <div className="jules-plan-list">
              {PLAN_ITEMS.map((item, index) => (
                <div
                  key={item}
                  className="jules-plan-item"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                    width: '100%',
                    minHeight: 52,
                    padding: '14px 0',
                    borderBottom:
                      index === PLAN_ITEMS.length - 1
                        ? 'none'
                        : '1px solid rgba(29, 77, 79, 0.12)',
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    className="jules-plan-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      minWidth: 28,
                      borderRadius: '50%',
                      background: '#134e4a',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 800,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span
                    className="jules-plan-copy"
                    style={{
                      display: 'block',
                      flex: '1 1 auto',
                      minWidth: 0,
                      color: '#1d4d4f',
                      fontSize: 15.5,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {centreTab === 'actions' ? (
          <div className="jules-ws-actions">
            <h2>Completed Actions</h2>
            <div className="jules-ws-actions-list">
              {COMPLETED_ACTIONS.map((item, index) => (
                <div
                  key={item}
                  className="jules-ws-actions-row"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                    width: '100%',
                    minHeight: 52,
                    padding: '14px 0',
                    borderBottom:
                      index === COMPLETED_ACTIONS.length - 1
                        ? 'none'
                        : '1px solid rgba(29, 77, 79, 0.12)',
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    className="jules-ws-action-check"
                    aria-hidden="true"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      minWidth: 28,
                      borderRadius: '50%',
                      background: '#e7f6ee',
                      color: '#1f8f4e',
                      fontSize: 14,
                      fontWeight: 800,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    className="jules-plan-copy"
                    style={{
                      display: 'block',
                      flex: '1 1 auto',
                      minWidth: 0,
                      color: '#1d4d4f',
                      fontSize: 15.5,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <aside className="jules-ws-rail" aria-label="Jules evidence">
        <div className="jules-ws-tabs" role="tablist" aria-label="Evidence views">
          {(
            [
              ['evidence', 'Evidence'],
              ['approvals', 'Approvals'],
              ['audit', 'Audit'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={railTab === id}
              className={railTab === id ? 'is-active' : undefined}
              onClick={() => setRailTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {railTab === 'evidence' ? (
          <ul className="jules-ws-evidence">
            {EVIDENCE_ITEMS.map((item) => (
              <li key={item.id}>
                <span className={`jules-ws-evidence-icon is-${item.icon}`} aria-hidden="true">
                  <EvidenceIcon icon={item.icon} />
                </span>
                <span className="jules-ws-evidence-copy">
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </span>
                <em className={item.status === 'Forecast' ? 'is-forecast' : 'is-confirmed'}>
                  {item.status}
                </em>
              </li>
            ))}
          </ul>
        ) : (
          <div className="jules-ws-empty">
            <h2>{railTab === 'approvals' ? 'Approvals' : 'Audit'}</h2>
            <p>This view will open with the next Jules step.</p>
          </div>
        )}
      </aside>
    </div>,
    document.body,
  )
}

function EvidenceIcon({ icon }: { icon: EvidenceItem['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 16,
    height: 16,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  if (icon === 'weather') {
    return (
      <svg {...common}>
        <path d="M8 16a4 4 0 1 1 1.2-7.8A5 5 0 1 1 17 14H8z" />
      </svg>
    )
  }
  if (icon === 'stock') {
    return (
      <svg {...common}>
        <path d="M4 8h16l-1.5 11H5.5L4 8zM9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    )
  }
  if (icon === 'staff') {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="2.4" />
        <circle cx="16" cy="9" r="2" />
        <path d="M4.5 18c.6-2.4 2.2-3.6 4.5-3.6s3.9 1.2 4.5 3.6M14 14.6c1.2.2 2.2.9 2.8 2.4" />
      </svg>
    )
  }
  if (icon === 'members') {
    return (
      <svg {...common}>
        <path d="M12 3.5 14 9h5.5L15 12.5 16.8 18 12 14.8 7.2 18 9 12.5 4.5 9H10z" />
      </svg>
    )
  }
  if (icon === 'sales') {
    return (
      <svg {...common}>
        <path d="M4 19h16M7 16V10M12 16V6M17 16v-4" />
      </svg>
    )
  }
  if (icon === 'shipment') {
    return (
      <svg {...common}>
        <path d="M3 7h11v10H3zM14 10h5l2 3v4h-7V10zM7 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      </svg>
    )
  }
  if (icon === 'campaigns') {
    return (
      <svg {...common}>
        <path d="M5 10v4M8 8v8M12 5v14M16 9v6M19 11v2" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  )
}
