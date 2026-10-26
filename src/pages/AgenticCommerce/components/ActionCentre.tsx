import {
  ACTION_FILTERS,
  STATUS_LABEL,
  formatRevenue,
  matchesFilter,
} from '../constants/actions'
import type { ActionFilter, AgenticAction } from '../types/action'
import { ActionGlyph } from './ActionGlyph'
import { CalendarRail } from './CalendarRail'
import type { PrepEvent } from '../constants/preparedness'

const FILTER_ROWS: ActionFilter[][] = [
  ['all', 'new', 'approval'],
  ['scheduled', 'executing'],
  ['completed', 'dismissed'],
]

type CentreTab = 'actions' | 'calendar'

type ActionCentreProps = {
  actions: AgenticAction[]
  filter: ActionFilter
  tab: CentreTab
  selectedId: string
  onFilter: (filter: ActionFilter) => void
  onTab: (tab: CentreTab) => void
  onSelect: (id: string) => void
  onCreate: () => void
  prepEvents: PrepEvent[]
  prepSelectedId: string
  onSelectPrep: (id: string) => void
  onAddPrep: () => void
}

export function ActionCentre({
  actions,
  filter,
  tab,
  selectedId,
  onFilter,
  onTab,
  onSelect,
  onCreate,
  prepEvents,
  prepSelectedId,
  onSelectPrep,
  onAddPrep,
}: ActionCentreProps) {
  const needsApproval = actions.filter((action) => action.status === 'needs-approval').length
  const executing = actions.filter((action) => action.status === 'executing').length
  const scheduled = actions.filter((action) => action.status === 'scheduled').length
  const revenue = actions.reduce(
    (sum, action) => sum + (action.status === 'executing' ? action.revenue : 0),
    0,
  )
  const visible = actions.filter((action) => matchesFilter(action, filter))

  return (
    <aside className="agentic-sidebar" aria-label="Agentic Commerce">
      <div className="agentic-sidebar-header">
        <h1>Agentic Commerce</h1>
        <div className="agentic-tabs" role="tablist" aria-label="Agentic Commerce views">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'actions'}
            className={tab === 'actions' ? 'is-active' : ''}
            onClick={() => onTab('actions')}
          >
            <span className="agentic-tab-bolt" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" />
              </svg>
            </span>
            Action Centre
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'calendar'}
            className={tab === 'calendar' ? 'is-active' : ''}
            onClick={() => onTab('calendar')}
          >
            <span className="agentic-tab-cal" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M8 3.5v3M16 3.5v3M4 10h16" />
              </svg>
            </span>
            Calendar
          </button>
        </div>
        {tab === 'actions' ? <div className="agentic-summary">
          <article>
            <p>Needs Approval</p>
            <strong>{needsApproval}</strong>
          </article>
          <article>
            <p>Executing</p>
            <strong>{executing}</strong>
          </article>
          <article>
            <p>Agent Revenue</p>
            <strong>{formatRevenue(revenue)}</strong>
          </article>
          <article>
            <p>Scheduled</p>
            <strong>{scheduled}</strong>
          </article>
        </div> : null}
      </div>

      {tab === 'actions' ? (
        <div className="agentic-sidebar-filters" role="toolbar" aria-label="Action filters">
          {FILTER_ROWS.map((row) => (
            <div className="agentic-filter-row" key={row.join('-')}>
              {row.map((id) => {
                const item = ACTION_FILTERS.find((entry) => entry.id === id)
                if (!item) return null
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={filter === item.id ? 'is-active' : ''}
                    aria-pressed={filter === item.id}
                    onClick={() => onFilter(item.id)}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      ) : null}

      {tab === 'calendar' ? (
        <CalendarRail
          events={prepEvents}
          selectedId={prepSelectedId}
          onSelect={onSelectPrep}
        />
      ) : (
      <div className="agentic-action-list">
          {visible.map((action) => (
            <button
              key={action.id}
              type="button"
              className={
                action.id === selectedId
                  ? 'agentic-action-card is-selected'
                  : 'agentic-action-card'
              }
              aria-current={action.id === selectedId ? 'true' : undefined}
              onClick={() => onSelect(action.id)}
            >
              <span className={`agentic-card-icon is-${action.signal}`} aria-hidden="true">
                <ActionGlyph signal={action.signal} />
              </span>
              <span className="agentic-card-copy">
                <span className="agentic-card-title">
                  <span>{action.title}</span>
                  <em className={`is-${action.status}`}>{STATUS_LABEL[action.status]}</em>
                </span>
                <span className="agentic-card-meta">
                  {action.location} · {action.confidence}% confidence
                </span>
                <span className="agentic-card-due">{action.due}</span>
              </span>
              <span className="agentic-card-trail" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M8 7h8M8 12h8M8 17h5" />
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
              </span>
            </button>
          ))}
      </div>
      )}

      <div className="agentic-create-action">
        <button type="button" onClick={tab === 'calendar' ? onAddPrep : onCreate}>
          {tab === 'calendar' ? '+ Add Event' : '+ Create Agentic Action'}
        </button>
      </div>
    </aside>
  )
}

export type { CentreTab }
