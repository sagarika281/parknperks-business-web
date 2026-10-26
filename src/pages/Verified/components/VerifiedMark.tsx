export function VerifiedMark() {
  return (
    <div className="verified-mark">
      <span className="verified-circle" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="48" height="48">
          <path
            d="M14 24.5l7 7 13-14"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="verified-label">Verified</p>
    </div>
  )
}
