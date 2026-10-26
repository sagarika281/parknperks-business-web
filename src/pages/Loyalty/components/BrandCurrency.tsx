const STATS = [
  { label: 'Issued', value: '48,200', tone: 'is-green' },
  { label: 'Redeemed', value: '34,300', tone: '' },
  { label: 'Outstanding', value: '13,900', tone: 'is-red' },
  { label: 'Expired', value: '0', tone: '' },
  { label: 'Liability', value: '₹1,390', tone: 'is-red' },
  { label: 'Converted', value: '1,200', tone: 'is-green' },
]

const TRANSACTIONS = [
  { initial: 'K', name: 'Karthik S.', detail: 'Earned · Today 14:22', amount: '+40 Beans', tone: 'is-green' },
  { initial: 'P', name: 'Priya M.', detail: 'Redeemed · Today 11:08', amount: '-100 Beans', tone: 'is-red' },
  { initial: 'A', name: 'Arjun K.', detail: 'Earned · Yesterday 09:41', amount: '+20 Beans', tone: 'is-green' },
  {
    initial: 'M',
    name: 'Meera R.',
    detail: 'Converted · Yesterday 18:05',
    amount: '-200 Beans → 160 Coins',
    tone: '',
  },
]

export function BrandCurrency() {
  return (
    <section className="loyalty-view" aria-label="Brand currency">
      <header className="loyalty-board-head">
        <div>
          <h2>Brand Currency (Beans)</h2>
          <div className="loyalty-board-meta">
            <span className="loyalty-active">Active</span>
          </div>
        </div>
        <div className="loyalty-board-actions">
          <button type="button" className="is-performance">
            View Full Ledger
          </button>
        </div>
      </header>

      <div className="currency-stats">
        {STATS.map((stat) => (
          <article key={stat.label}>
            <p>{stat.label}</p>
            <strong className={stat.tone}>{stat.value}</strong>
          </article>
        ))}
      </div>

      <h3>Recent transactions</h3>
      <ul className="currency-tx">
        {TRANSACTIONS.map((tx) => (
          <li key={tx.name}>
            <span>{tx.initial}</span>
            <div>
              <strong>{tx.name}</strong>
              <em>{tx.detail}</em>
            </div>
            <b className={tx.tone}>{tx.amount}</b>
          </li>
        ))}
      </ul>
    </section>
  )
}
