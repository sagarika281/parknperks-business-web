import { TIERS } from '../constants/programme'

const TOTAL = TIERS.reduce((sum, tier) => sum + tier.count, 0)

const SCORES = [
  { label: 'NPS score', value: '72', note: 'Excellent', tone: '' },
  { label: 'Attach rate', value: '68%', note: '+3pp this month', tone: 'is-up' },
  { label: 'ROI', value: '4.2×', note: 'Programme investment', tone: 'is-up' },
  { label: 'At risk', value: '47', note: 'No visit 30+ days', tone: '' },
]

export function ProgrammePerformance() {
  return (
    <section className="loyalty-board menu-panel" aria-label="Programme performance">
      <header className="loyalty-board-head">
        <div>
          <h2>Programme Performance</h2>
          <div className="loyalty-board-meta">
            <span className="loyalty-active">Good Health</span>
          </div>
        </div>
      </header>

      <div className="score-grid">
        {SCORES.map((score) => (
          <article key={score.label}>
            <p>{score.label}</p>
            <strong>{score.value}</strong>
            <span className={score.tone}>{score.note}</span>
          </article>
        ))}
      </div>

      <h3>Tier distribution</h3>
      <div className="dist-list">
        {TIERS.map((tier) => {
          const share = Math.round((tier.count / TOTAL) * 100)
          return (
            <article key={tier.name}>
              <div className="tier-line">
                <span className="loyalty-tier-dot" style={{ background: tier.color }} />
                <strong>{tier.name}</strong>
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
    </section>
  )
}
