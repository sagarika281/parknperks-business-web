import { useEffect, useRef, useState } from 'react'
import { STATUS_LABEL } from '../constants/actions'
import type { AgenticAction } from '../types/action'
import { ActionGlyph } from './ActionGlyph'

type ActionDetailsProps = {
  action: AgenticAction
  onApprove: () => void
  onSchedule: () => void
  onDelegate: () => void
  onDismiss: () => void
  onRename: (title: string) => void
}

export function ActionDetails({
  action,
  onApprove,
  onSchedule,
  onDelegate,
  onDismiss,
  onRename,
}: ActionDetailsProps) {
  const scroller = useRef<HTMLElement>(null)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(action.title)

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    setEditing(false)
    setDraft(action.title)
    // Only a new selection should return the details to the heading.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action.id])

  const commitTitle = () => {
    const next = draft.trim()
    if (next && next !== action.title) onRename(next)
    else setDraft(action.title)
    setEditing(false)
  }

  const showActions =
    editing || (action.status !== 'dismissed' && action.status !== 'completed')

  return (
    <section
      ref={scroller}
      className="agentic-details-panel"
      aria-label="Action details"
    >
      <header className="agentic-detail-head">
        <div className="agentic-detail-identity">
          <span className={`agentic-detail-icon is-${action.signal}`} aria-hidden="true">
            <ActionGlyph signal={action.signal} />
          </span>
          <div className="agentic-detail-copy">
            {editing ? (
              <input
                className="agentic-detail-title-input"
                value={draft}
                aria-label="Action title"
                autoFocus
                onChange={(event) => setDraft(event.target.value)}
                onBlur={commitTitle}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') commitTitle()
                  if (event.key === 'Escape') {
                    setDraft(action.title)
                    setEditing(false)
                  }
                }}
              />
            ) : (
              <h2>{action.title}</h2>
            )}
            <p>
              {action.signalLabel} · {action.location}
            </p>
          </div>
        </div>
        {showActions ? (
          <div className="agentic-detail-buttons">
            <button type="button" className="is-approve" onClick={onApprove}>
              Approve
            </button>
            <button type="button" onClick={() => setEditing(true)}>
              Edit Action
            </button>
            <button type="button" onClick={onSchedule}>
              Schedule
            </button>
            <button type="button" onClick={onDelegate}>
              Delegate
            </button>
            <button type="button" className="is-dismiss" onClick={onDismiss}>
              Dismiss
            </button>
          </div>
        ) : null}
      </header>

      <div className="agentic-detail-badges">
        <span className={`is-${action.status}`}>{STATUS_LABEL[action.status]}</span>
        {action.highPriority ? <span className="is-priority">High priority</span> : null}
        {action.agentRecommended ? (
          <span className="is-recommended">
            <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
              <path
                d="M12 3.2 13.4 8.6 18.8 10 13.4 11.4 12 16.8 10.6 11.4 5.2 10 10.6 8.6 12 3.2z"
                fill="currentColor"
              />
              <path
                d="M18 14.2 18.6 16.4 20.8 17 18.6 17.6 18 19.8 17.4 17.6 15.2 17 17.4 16.4 18 14.2z"
                fill="currentColor"
              />
            </svg>
            Agent Recommended
          </span>
        ) : null}
      </div>

      <div className="agentic-metrics">
        <article>
          <p>Predicted Impact</p>
          <strong>{action.impact}</strong>
        </article>
        <article>
          <p>Confidence</p>
          <strong>{action.confidence}%</strong>
        </article>
        <article>
          <p>Due</p>
          <strong>{action.due}</strong>
        </article>
        <article>
          <p>Approver</p>
          <strong>{action.approver}</strong>
        </article>
      </div>

      <section className="agentic-section">
        <h3>Trigger</h3>
        <p className="agentic-trigger">{action.trigger}</p>
      </section>

      <section className="agentic-section">
        <h3>Supporting Evidence</h3>
        <ul className="agentic-evidence">
          {action.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="agentic-section">
        <h3>Affected</h3>
        <div className="agentic-affected">
          <span className="agentic-affected-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <circle cx="9" cy="8.5" r="2.3" />
              <circle cx="15.2" cy="9.2" r="1.8" />
              <path d="M4.4 17.2c.7-2.3 2.4-3.4 4.6-3.4s3.9 1.1 4.6 3.4" />
              <path d="M13.6 14.2c1.3.2 2.4.9 3 2.4" />
            </svg>
          </span>
          <span className="agentic-affected-copy">
            <strong>{action.affected}</strong>
            <em>{action.affectedLabel}</em>
          </span>
        </div>
      </section>

      <section className="agentic-section">
        <h3>Cost &amp; Return</h3>
        <div className="agentic-cost">
          <article>
            <p>Cost of Action</p>
            <strong>{action.cost}</strong>
          </article>
          <article>
            <p>Predicted Return</p>
            <strong className="is-return">{action.predictedReturn}</strong>
          </article>
        </div>
      </section>

      <section className="agentic-section">
        <h3>Activity History</h3>
        <ul className="agentic-history">
          {action.history.map((entry) => (
            <li key={`${entry.title}-${entry.time}`}>
              <strong>{entry.title}</strong>
              <span>{entry.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
