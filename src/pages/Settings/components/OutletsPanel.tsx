import { OUTLETS } from '../constants/outlets'

function OutletGlyph() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true">
      <rect x="4" y="14" width="32" height="20" rx="3" fill="#c44a56" />
      <path d="M8 14V10h8v4M24 14V8h8v6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="16" y="20" width="8" height="14" rx="1.5" fill="#fff4e8" />
      <rect x="7.5" y="18" width="6" height="5" rx="1" fill="#f3c4c8" />
      <rect x="26.5" y="18" width="6" height="5" rx="1" fill="#f3c4c8" />
      <text x="20" y="12.5" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700">
        24H
      </text>
    </svg>
  )
}

export function OutletsPanel() {
  return (
    <div className="set-form">
      <header className="set-head set-head-row">
        <div>
          <h1>Outlets</h1>
          <p>Manage your outlet locations and device status.</p>
          <p className="set-fee">₹999 setup fee per new outlet</p>
        </div>
        <button type="button" className="set-btn set-btn-ghost">
          + Add Outlet
        </button>
      </header>

      <div className="set-outlet-list">
        {OUTLETS.map((outlet) => (
          <article key={outlet.id} className="set-outlet-card">
            <span className="set-outlet-icon">
              <OutletGlyph />
            </span>
            <div className="set-outlet-copy">
              <strong>{outlet.name}</strong>
              <p>{outlet.address}</p>
              <p>
                GSTIN: {outlet.gstin} · Manager: {outlet.manager}
              </p>
            </div>
            <span className={outlet.deviceOnline ? 'set-device is-online' : 'set-device'}>
              <span aria-hidden="true">●</span>
              {outlet.deviceOnline ? 'Device online' : 'Device offline'}
            </span>
            <button type="button" className="set-btn set-btn-ghost">
              Edit
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
