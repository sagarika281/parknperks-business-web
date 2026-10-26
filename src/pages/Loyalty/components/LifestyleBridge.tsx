import { ACTIVITY, FUNNEL } from '../constants/lifestyle'

type LifestyleBridgeProps = {
  onPreview: () => void
  onEditRatio: () => void
  onManage: () => void
}

export function LifestyleBridge({ onPreview, onEditRatio, onManage }: LifestyleBridgeProps) {
  return (
    <section className="loyalty-board is-bridge" aria-label="Lifestyle bridge">
      <header className="loyalty-board-head" id="lifestyle-overview">
        <div>
          <h2>Lifestyle Bridge</h2>
          <div className="loyalty-board-meta">
            <span className="loyalty-active">Active</span>
            <p className="is-wrap">Connected to PARK[N]PERKS Lifestyle wallet</p>
          </div>
        </div>
        <div className="loyalty-board-actions">
          <button type="button" onClick={onPreview}>
            Preview in Lifestyle
          </button>
          <button type="button" onClick={onEditRatio}>
            Edit Transfer Ratio
          </button>
          <button type="button" className="is-performance" onClick={onManage}>
            Manage Bridge
          </button>
        </div>
      </header>

      <div className="loyalty-metrics">
        <article id="lifestyle-wallet">
          <p>Connected members</p>
          <strong>1,284</strong>
          <span>+8% this month</span>
        </article>
        <article>
          <p>Conversions (MTD)</p>
          <strong>47</strong>
          <span>18% conversion rate</span>
        </article>
        <article>
          <p>Currency converted</p>
          <strong>9,400 Beans</strong>
          <span className="is-quiet">→ 7,520 Coins</span>
        </article>
        <article>
          <p>Settlement due</p>
          <strong>₹8,420</strong>
          <span className="is-quiet">Due 18 Sep</span>
        </article>
      </div>

      <section id="lifestyle-ratio" className="loyalty-block">
        <h3>Transfer ratio</h3>
        <div className="bridge-ratio">
          <div>
            <p>
              <b>100</b>
              <span aria-hidden="true">→</span>
              <b>80</b>
            </p>
            <em>
              <span>Beans</span>
              <span>Lifestyle Coins</span>
            </em>
          </div>
          <small>Brand-controlled · Last changed 1 week ago</small>
        </div>
      </section>

      <section id="lifestyle-rules" className="loyalty-block">
        <h3>Conversion funnel</h3>
        <div className="bridge-funnel">
          {FUNNEL.map((row) => (
            <article key={row.label}>
              <header>
                <span>{row.label}</span>
                <b>{row.value}</b>
              </header>
              <i aria-hidden="true">
                <em style={{ width: `${row.fill}%` }} />
              </i>
            </article>
          ))}
        </div>
      </section>

      <section id="lifestyle-experience" className="loyalty-block">
        <h3>Recent member activity</h3>
        <div className="bridge-activity">
          {ACTIVITY.map((row) => (
            <article key={row.name}>
              <span aria-hidden="true">{row.initial}</span>
              <div>
                <strong>{row.name}</strong>
                <em>{row.detail}</em>
              </div>
              <time>{row.when}</time>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
