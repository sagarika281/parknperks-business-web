import { useState } from 'react'
import { TIERS } from '../constants/programme'

type ProgrammeBoardProps = {
  onEdit: () => void
  onPause: () => void
  onPerformance: () => void
  onReviewTiers: () => void
  onViewInsight: () => void
}

export function ProgrammeBoard({
  onEdit,
  onPause,
  onPerformance,
  onReviewTiers,
  onViewInsight,
}: ProgrammeBoardProps) {
  const [paused, setPaused] = useState(false)

  return (
    <section className="loyalty-board" aria-label="Beans programme">
      <header className="loyalty-board-head">
        <div>
          <h2>Brew &amp; Co. Beans Programme</h2>
          <div className="loyalty-board-meta">
            <span className="loyalty-active">{paused ? 'Paused' : 'Active'}</span>
            <p>Est. March 2025 · Updated 3 days ago</p>
          </div>
        </div>
        <div className="loyalty-board-actions">
          <button type="button" onClick={onEdit}>
            Edit Programme
          </button>
          <button
            type="button"
            onClick={() => {
              setPaused((value) => !value)
              onPause()
            }}
          >
            {paused ? 'Resume Programme' : 'Pause Programme'}
          </button>
          <button type="button" className="is-performance" onClick={onPerformance}>
            View Performance
          </button>
        </div>
      </header>

      <div className="loyalty-metrics">
        <article>
          <p>Active members</p>
          <strong>1,284</strong>
          <span>+32 this month</span>
        </article>
        <article>
          <p>Member sales %</p>
          <strong>68%</strong>
          <span>+3pp vs last month</span>
        </article>
        <article>
          <p>Redemption rate</p>
          <strong>42%</strong>
          <span>vs 38% target</span>
        </article>
        <article>
          <p>Programme NPS</p>
          <strong>72</strong>
          <span className="is-quiet">Excellent</span>
        </article>
      </div>

      <section id="loyalty-value" className="loyalty-block">
        <h3>Earn &amp; redemption</h3>
        <div className="loyalty-earn">
          <article>
            <p>Earn Rate</p>
            <strong>1 Bean per ₹10</strong>
            <span>Coffee purchases · No cap</span>
          </article>
          <article>
            <p>Redemption Threshold</p>
            <strong>100 Beans = ₹10</strong>
            <span>Min. 100 Beans to redeem</span>
          </article>
        </div>
      </section>

      <section id="loyalty-tiers" className="loyalty-block">
        <h3>Tier structure</h3>
        <div className="loyalty-tiers">
          {TIERS.map((tier) => (
            <article key={tier.name}>
              <span className="loyalty-tier-dot" style={{ background: tier.color }} />
              <span className="loyalty-tier-copy">
                <strong>{tier.name}</strong>
                <em>{tier.range}</em>
              </span>
              <span className="loyalty-tier-bar" aria-hidden="true">
                <i style={{ width: `${tier.fill}%`, background: tier.color }} />
              </span>
              <b>{tier.count}</b>
            </article>
          ))}
        </div>
      </section>

      <section id="loyalty-currency" className="loyalty-block">
        <h3>Currency summary</h3>
        <div className="loyalty-currency">
          <article>
            <p>Issued</p>
            <strong>48,200 Beans</strong>
          </article>
          <article>
            <p>Redeemed</p>
            <strong>34,300 Beans</strong>
          </article>
          <article>
            <p>Outstanding</p>
            <strong>13,900 · ₹1,390 liability</strong>
          </article>
        </div>
      </section>

      <section id="loyalty-setup" className="loyalty-block">
        <h3>Alerts</h3>
        <div className="loyalty-alerts">
          <article>
            <span className="loyalty-alert-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" width="16" height="16">
                <path
                  d="M10 2.4 18.2 17H1.8L10 2.4Z"
                  fill="none"
                  stroke="#e0a15a"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M10 8.2v3.6" stroke="#e0a15a" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="10" cy="14.2" r="0.8" fill="#e0a15a" />
              </svg>
            </span>
            <p>3 members ready to upgrade tier — review eligibility</p>
            <button type="button" onClick={onReviewTiers}>
              Review Tiers
            </button>
          </article>
          <article>
            <span className="loyalty-alert-icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" width="16" height="16">
                <path
                  d="M10 2.2a5.1 5.1 0 0 0-2.7 9.4c.3.2.5.6.5 1v.5h4.4v-.5c0-.4.2-.8.5-1A5.1 5.1 0 0 0 10 2.2Z"
                  fill="#f2c14b"
                />
                <path d="M8.2 14.6h3.6M8.6 16.2h2.8" stroke="#e0a84a" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </span>
            <p>Cardamom Latte drives 18% of Beans earnings — consider featured placement</p>
            <button type="button" onClick={onViewInsight}>
              View Insight
            </button>
          </article>
        </div>
      </section>
    </section>
  )
}
