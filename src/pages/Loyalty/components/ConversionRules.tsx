const RULES = [
  { label: 'Minimum Conversion', value: '200 Beans' },
  { label: 'Maximum per Month', value: '2,000 Beans' },
  { label: 'Eligible Tiers', value: 'Loyal, Legend' },
  { label: 'Cooldown Between Conversions', value: '7 days' },
  { label: 'Auto-settlement', value: 'Monthly · 18th' },
]

export function ConversionRules() {
  return (
    <section className="conversion-rules" aria-label="Conversion rules">
      <header className="loyalty-board-head">
        <div>
          <h2>Conversion Rules</h2>
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

      <article className="conversion-ratio">
        <p>Transfer Ratio</p>
        <div className="conversion-ratio-values">
          <strong>100 Beans</strong>
          <span aria-hidden="true">→</span>
          <b>80 Coins</b>
        </div>
        <i className="conversion-slider" aria-hidden="true">
          <em />
        </i>
        <small>A member converting 500 Beans receives 400 Lifestyle Coins.</small>
      </article>

      <dl className="conversion-rows">
        {RULES.map((rule) => (
          <div key={rule.label}>
            <dt>{rule.label}</dt>
            <dd>{rule.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
