const CONTENT = [
  ['Membership card', 'Branded, tier-coloured'],
  ['Beans balance', 'Live, real-time'],
  ['Tier status', 'Legend · since Mar 2025'],
  ['Expiry reminder', 'Sent 30 days before'],
  ['Passbook', 'Last 90 days of activity'],
]

export function MemberWallet() {
  return (
    <section className="loyalty-view" aria-label="Member wallet">
      <header className="loyalty-board-head">
        <div>
          <h2>Member Wallet</h2>
          <div className="loyalty-board-meta">
            <span className="loyalty-active">Live</span>
          </div>
        </div>
        <div className="loyalty-board-actions">
          <button type="button">Preview Experience</button>
          <button type="button" className="is-performance">
            Edit Card Design
          </button>
        </div>
      </header>

      <div className="wallet-layout">
        <div className="wallet-device">
          <div className="wallet-pass">
            <p>Brew &amp; Co.</p>
            <strong>Legend</strong>
            <em>Karthik Subramanian</em>
            <div>
              <span>Beans balance</span>
              <b>520</b>
            </div>
          </div>
          <small>Member ID · BC-7291-KS</small>
        </div>
        <div className="wallet-content">
          <h3>Wallet content</h3>
          <dl>
            {CONTENT.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
