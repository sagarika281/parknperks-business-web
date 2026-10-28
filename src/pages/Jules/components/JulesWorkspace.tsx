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
type ApprovalStatus = 'pending' | 'approved' | 'rejected'
type ApprovalId = 'campaign' | 'promotion' | 'purchase'

const APPROVAL_ITEMS = [
  {
    id: 'campaign',
    icon: '📣',
    title: 'Send WhatsApp campaign to 18 members',
    detail: 'Expected: ₹1,200–₹1,900 revenue',
  },
  {
    id: 'promotion',
    icon: '🎁',
    title: 'Increase promotional reward from 5 to 10 Beans',
    detail: 'Max cost ₹180',
  },
  {
    id: 'purchase',
    icon: '📦',
    title: 'Submit ₹9,840 emergency purchase order to Blue Tokai',
    detail: 'Immediate stock replenishment',
  },
] as const

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
  const [approvalStatuses, setApprovalStatuses] = useState<Record<ApprovalId, ApprovalStatus>>({
    campaign: 'pending',
    promotion: 'pending',
    purchase: 'pending',
  })
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

  function decideApproval(id: string, status: Exclude<ApprovalStatus, 'pending'>) {
    setApprovalStatuses((current) => ({ ...current, [id]: status }))
  }

  function approveAll() {
    setApprovalStatuses((current) => ({
      campaign: current.campaign === 'pending' ? 'approved' : current.campaign,
      promotion: current.promotion === 'pending' ? 'approved' : current.promotion,
      purchase: current.purchase === 'pending' ? 'approved' : current.purchase,
    }))
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
                >
                  <span className="jules-plan-badge">{index + 1}</span>
                  <span className="jules-plan-copy">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {centreTab === 'actions' ? (
          <div className="jules-ws-actions">
            <h2>Completed Actions</h2>
            <div className="jules-ws-actions-list">
              {COMPLETED_ACTIONS.map((item) => (
                <div
                  key={item}
                  className="jules-ws-actions-row"
                >
                  <span
                    className="jules-ws-action-check"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="jules-plan-copy">{item}</span>
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
                  {item.detail ? <span>{item.detail}</span> : null}
                </span>
                <em className={item.status === 'Forecast' ? 'is-forecast' : 'is-confirmed'}>
                  {item.status}
                </em>
              </li>
            ))}
          </ul>
        ) : railTab === 'approvals' ? (
          <div className="jules-ws-approvals">
            <ul className="jules-ws-approval-list">
              {APPROVAL_ITEMS.map((item) => {
                const status = approvalStatuses[item.id]
                return (
                  <li className="jules-ws-approval-card" key={item.id}>
                    <strong>
                      <span aria-hidden="true">{item.icon}</span>
                      {item.title}
                    </strong>
                    <span className="jules-ws-approval-detail">{item.detail}</span>
                    {status === 'pending' ? (
                      <div className="jules-ws-approval-controls">
                        <button
                          type="button"
                          className="is-approve"
                          onClick={() => decideApproval(item.id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="is-reject"
                          onClick={() => decideApproval(item.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className={`jules-ws-approval-status is-${status}`}>
                        {status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
            <button type="button" className="jules-ws-approve-all" onClick={approveAll}>
              Approve All
            </button>
          </div>
        ) : (
          <div className="jules-ws-audit">
            <p>
              <span>Now</span>
              <span>Phase: idle</span>
            </p>
            <p>
              <span>Scenario: rain</span>
            </p>
            <p>
              <span>Approvals: </span>
              {APPROVAL_ITEMS.map((item, index) => (
                <span key={item.id}>
                  {index > 0 ? ', ' : ''}
                  {approvalStatuses[item.id]}
                </span>
              ))}
            </p>
            <p>
              <span>User: {employeeName}</span>
              <span>({roleLabel})</span>
            </p>
          </div>
        )}
      </aside>
    </div>,
    document.body,
  )
}

function EvidenceIcon({ icon }: { icon: EvidenceItem['icon'] }) {
  const icons: Record<EvidenceItem['icon'], string> = {
    weather: '🌧️',
    stock: '📦',
    staff: '👥',
    members: '🐾',
    sales: '📊',
    shipment: '📦',
    campaigns: '📣',
    calendar: '🗓️',
  }
  return <span aria-hidden="true">{icons[icon]}</span>
}
