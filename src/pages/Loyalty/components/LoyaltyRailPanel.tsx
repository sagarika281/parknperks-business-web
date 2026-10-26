import { PROGRAMME_ITEMS, type ProgrammeId } from '../constants/programme'

type LoyaltyRailPanelProps = {
  selectedId: ProgrammeId
  onSelect: (id: ProgrammeId) => void
}

export function LoyaltyRailPanel({ selectedId, onSelect }: LoyaltyRailPanelProps) {
  return (
    <>
      <div className="loyalty-stats is-summary">
        <div className="loyalty-stat-row">
          <article>
            <p>Members</p>
            <strong>1,284</strong>
          </article>
          <article>
            <p>Member sales</p>
            <strong>68%</strong>
          </article>
        </div>
        <div className="loyalty-stat-row">
          <article>
            <p>Outstanding</p>
            <strong>13.9k Beans</strong>
          </article>
          <article>
            <p>At risk</p>
            <strong>47</strong>
          </article>
        </div>
      </div>
      <div className="loyalty-list is-programme">
        {PROGRAMME_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === selectedId ? 'loyalty-item is-selected' : 'loyalty-item'}
            onClick={() => onSelect(item.id)}
          >
            <span className="loyalty-item-icon" aria-hidden="true">
              <ProgrammeIcon id={item.id} />
            </span>
            <span className="loyalty-item-copy">
              <strong>{item.title}</strong>
              <em>{item.detail}</em>
              {item.meta ? <em>{item.meta}</em> : null}
            </span>
            <span className="loyalty-item-status">
              {item.attention ? <b>{item.attention}</b> : null}
              <i className={statusClass(item)}>{item.attention ? 'Attention' : item.status}</i>
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

function statusClass(item: (typeof PROGRAMME_ITEMS)[number]) {
  if (item.attention) return 'is-attention'
  if (item.status === 'Good') return 'is-good'
  return ''
}

function ProgrammeIcon({ id }: { id: ProgrammeId }) {
  if (id === 'setup') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="8" r="2.1" stroke="#d9c6f2" strokeWidth="1.3" />
        <path
          d="M8 1.8v1.6M8 12.6v1.6M1.8 8h1.6M12.6 8h1.6M3.6 3.6l1.1 1.1M11.3 11.3l1.1 1.1M12.4 3.6l-1.1 1.1M4.7 11.3l-1.1 1.1"
          stroke="#d9c6f2"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (id === 'value') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="8" r="5.2" stroke="#f0c56e" strokeWidth="1.3" />
        <path d="M8 5.2v5.6M6.4 6.6c.4-.6 1-.8 1.6-.8 1 0 1.6.5 1.6 1.2S9 8.2 8 8.2 6.4 8.7 6.4 9.4s.6 1.2 1.6 1.2c.6 0 1.2-.2 1.6-.8" stroke="#f0c56e" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'milestone') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="6.2" r="3.1" stroke="#e7b4ea" strokeWidth="1.3" />
        <path d="M6.2 8.8 5.2 13.2 8 11.4l2.8 1.8-1-4.4" stroke="#e7b4ea" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    )
  }
  if (id === 'tiers') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M3 11.5h10M4.2 8h7.6M5.6 4.5h4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'currency') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="8" r="5.2" stroke="#f0c56e" strokeWidth="1.3" />
        <path d="M8 4.8v6.4M6.3 6.4h2.4a1.3 1.3 0 0 1 0 2.6H7.1a1.3 1.3 0 0 0 0 2.6h2.6" stroke="#f0c56e" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'wallet') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <rect x="2" y="3.6" width="12" height="8.8" rx="1.6" stroke="#b9d7ff" strokeWidth="1.3" />
        <path d="M2 6.4h12" stroke="#b9d7ff" strokeWidth="1.3" />
        <circle cx="11.2" cy="9.2" r="0.8" fill="#b9d7ff" />
      </svg>
    )
  }
  if (id === 'performance') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M3 12.4V8.2M8 12.4V4.2M13 12.4V6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  return null
}
