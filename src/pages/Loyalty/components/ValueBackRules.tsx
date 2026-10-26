import { useState } from 'react'

const MIN_RUPEES = 5
const MAX_RUPEES = 25

export function ValueBackRules() {
  const [rupees, setRupees] = useState(10)
  const beans = Math.round(100 / rupees)
  const cost = beans * 0.1
  const costLabel = Number.isInteger(cost) ? `${cost}` : cost.toFixed(1)
  const fill = ((rupees - MIN_RUPEES) / (MAX_RUPEES - MIN_RUPEES)) * 100

  return (
    <section className="loyalty-board menu-panel is-rules" aria-label="Value-back rules">
      <header className="loyalty-board-head">
        <div>
          <h2>Value-Back Rules</h2>
          <div className="loyalty-board-meta">
            <span className="loyalty-active">Active</span>
          </div>
        </div>
        <div className="loyalty-board-actions">
          <button type="button">Edit Rules</button>
          <button type="button" className="is-performance">
            Publish
          </button>
        </div>
      </header>

      <div className="rule-grid">
        <article>
          <p>Earn Rate</p>
          <strong>1 Bean per ₹10</strong>
        </article>
        <article>
          <p>Redemption Threshold</p>
          <strong>100 Beans</strong>
        </article>
        <article>
          <p>Daily Cap</p>
          <strong>50 Beans</strong>
        </article>
        <article>
          <p>Expiry</p>
          <strong>12 months</strong>
        </article>
      </div>

      <h3>Earn rate simulation</h3>
      <div className="sim-card">
        <div className="sim-head">
          <strong>1 Bean per ₹{rupees} spent</strong>
          <span>Estimated cost: ~{costLabel}% of spend</span>
        </div>
        <label className="earn-slider">
          <i style={{ width: `${fill}%` }} />
          <b style={{ left: `${fill}%` }} />
          <input
            type="range"
            min={MIN_RUPEES}
            max={MAX_RUPEES}
            value={rupees}
            aria-label="Earn rate simulation"
            onChange={(event) => setRupees(Number(event.target.value))}
          />
        </label>
        <div className="sim-scale">
          <span>₹5 (generous)</span>
          <span>₹25 (conservative)</span>
        </div>
        <p>
          A member spending ₹100 earns <b>{beans} Beans</b>. At 100 Beans they get ₹10 off — a{' '}
          <b>{beans}% effective reward rate</b>.
        </p>
      </div>
    </section>
  )
}
