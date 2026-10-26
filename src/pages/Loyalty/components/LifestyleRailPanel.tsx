import { LIFESTYLE_ITEMS, type LifestyleId } from '../constants/lifestyle'

type LifestyleRailPanelProps = {
  selectedId: LifestyleId
  onSelect: (id: LifestyleId) => void
}

export function LifestyleRailPanel({ selectedId, onSelect }: LifestyleRailPanelProps) {
  return (
    <>
      <div className="loyalty-stats is-bridge">
        <article>
          <p>Connected</p>
          <strong>1,284</strong>
        </article>
        <article>
          <p>Conversions</p>
          <strong>47</strong>
        </article>
        <article>
          <p>Settlement</p>
          <strong>₹8,420</strong>
        </article>
        <article className="is-ratio">
          <p>Ratio</p>
              <strong>100→80</strong>
        </article>
      </div>
      <div className="loyalty-list">
        {LIFESTYLE_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              item.id === selectedId ? 'loyalty-item is-bridge-item is-selected' : 'loyalty-item is-bridge-item'
            }
            onClick={() => onSelect(item.id)}
          >
            <span className="loyalty-item-icon" aria-hidden="true">
              <LifestyleIcon id={item.id} />
            </span>
            <span className="loyalty-item-copy">
              <strong>{item.title}</strong>
              {item.detail ? <em>{item.detail}</em> : null}
              {item.meta ? <em>{item.meta}</em> : null}
            </span>
            <span className="loyalty-item-status">
              <i className={statusClass(item.status)}>{item.status}</i>
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

function statusClass(status: string) {
  if (status === 'Pending') return 'is-pending'
  if (status === 'Good') return 'is-good'
  return ''
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <rect x="1.5" y="1.5" width="5.2" height="5.2" rx="1.1" />
      <rect x="9.3" y="1.5" width="5.2" height="5.2" rx="1.1" />
      <rect x="1.5" y="9.3" width="5.2" height="5.2" rx="1.1" />
      <rect x="9.3" y="9.3" width="5.2" height="5.2" rx="1.1" />
    </svg>
  )
}

function LifestyleIcon({ id }: { id: LifestyleId }) {
  if (id === 'overview') return <GridIcon />
  if (id === 'wallet') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <rect x="1.5" y="3.5" width="13" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="11.2" cy="9.4" r="0.8" fill="currentColor" />
      </svg>
    )
  }
  if (id === 'experience') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="5.2" r="2.2" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M3.2 13.2c.6-2.3 2.4-3.4 4.8-3.4s4.2 1.1 4.8 3.4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (id === 'eligibility') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5.2 8.1 7.1 10l3.7-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (id === 'settlement') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M4 2.5h5.2L12.5 5.8V13a.8.8 0 0 1-.8.8H4a.8.8 0 0 1-.8-.8V3.3A.8.8 0 0 1 4 2.5Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 2.6V6h3.3M5.2 8.4h5.6M5.2 10.6h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'audit') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M4 2.8h8v10.4H4V2.8Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 6h4M6 8.4h4M6 10.8h2.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'settings') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <circle cx="8" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M8 1.8v1.6M8 12.6v1.6M1.8 8h1.6M12.6 8h1.6M3.6 3.6l1.1 1.1M11.3 11.3l1.1 1.1M12.4 3.6l-1.1 1.1M4.7 11.3l-1.1 1.1"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (id === 'performance') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M2.5 12.5h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M4 12.2V8.2M8 12.2V5M12 12.2V3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'rules') {
    return (
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="5.5" cy="4.5" r="1.3" fill="currentColor" />
        <circle cx="10.5" cy="8" r="1.3" fill="currentColor" />
        <circle cx="7" cy="11.5" r="1.3" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
      <path d="M8 2.2v11.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M8 3.4 3.2 6.2M8 3.4l4.8 2.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3.2 6.2 5.2 10.6h-4L3.2 6.2ZM12.8 6.2l2 4.4h-4l2-4.4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}
