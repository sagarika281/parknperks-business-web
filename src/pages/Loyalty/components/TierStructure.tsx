import { TIERS } from '../constants/programme'

const TOTAL = TIERS.reduce((sum, tier) => sum + tier.count, 0)

const APPROACHING = [
  { initial: 'P', name: 'Priya K.', detail: '892 Beans · 108 more to Legend' },
  { initial: 'R', name: 'Rahul M.', detail: '940 Beans · 60 more to Legend' },
  { initial: 'A', name: 'Ananya T.', detail: '480 Beans · 20 more to Loyal' },
]

export function TierStructure() {
  return (
    <section className="loyalty-board menu-panel" aria-label="Tier structure">
      <header className="loyalty-board-head">
        <div>
          <h2>Tier Structure</h2>
          <div className="loyalty-board-meta">
            <span className="loyalty-active">4 Active Tiers</span>
          </div>
        </div>
        <div className="loyalty-board-actions">
          <button type="button">Add Tier</button>
          <button type="button" className="is-performance">
            Edit Tiers
          </button>
        </div>
      </header>

      <div className="tier-board">
        {TIERS.map((tier) => {
          const share = Math.round((tier.count / TOTAL) * 100)
          return (
            <article key={tier.name}>
              <div className="tier-line">
                <span className="loyalty-tier-dot" style={{ background: tier.color }} />
                <strong>{tier.name}</strong>
                <em>{tier.range}</em>
                {tier.name === 'Loyal' ? <span className="tier-ready">3 ready to upgrade</span> : null}
                <b>
                  {tier.count} ({share}%)
                </b>
              </div>
              <span className="tier-track" aria-hidden="true">
                <i style={{ width: `${share}%`, background: tier.color }} />
              </span>
            </article>
          )
        })}
      </div>

      <h3>Members approaching next tier</h3>
      <div className="approach-list">
        {APPROACHING.map((member) => (
          <article key={member.name}>
            <span>{member.initial}</span>
            <div>
              <strong>{member.name}</strong>
              <em>{member.detail}</em>
            </div>
            <button type="button">Nudge</button>
          </article>
        ))}
      </div>
    </section>
  )
}
