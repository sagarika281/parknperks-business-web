export function AlertCard() {
  return (
    <div className="alert-card">
      <div className="alert-row">
        <span className="alert-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" width="18" height="18">
            <path
              d="M5 12a4 4 0 0 1 7.5-2A3 3 0 0 1 15 16H6a2.5 2.5 0 0 1-1-4.8z"
              fill="#7C6BC4"
            />
          </svg>
        </span>
        <p>Rain alert after 4 PM · Preparedness check due</p>
      </div>
      <div className="alert-row">
        <span className="alert-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20" width="18" height="18">
            <rect x="3" y="6" width="14" height="10" rx="1.5" fill="#A67C52" />
            <path d="M3 9h14M10 6v10" stroke="#F5EDE3" strokeWidth="1.2" />
          </svg>
        </span>
        <p>1 delivery may arrive late today</p>
      </div>
    </div>
  )
}
