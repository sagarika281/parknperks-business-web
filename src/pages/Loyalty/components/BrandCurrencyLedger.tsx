const FIGURES = [
  { label: 'Issued', value: '48,200', tone: 'is-green' },
  { label: 'Redeemed', value: '34,300', tone: '' },
  { label: 'Outstanding', value: '13,900', tone: 'is-wine' },
  { label: 'Expired', value: '0', tone: '' },
  { label: 'Liability', value: '₹1,390', tone: 'is-wine' },
  { label: 'Converted', value: '1,200', tone: 'is-green' },
]

const TRANSACTIONS = [
  { initial: 'K', name: 'Karthik S.', detail: 'Earned · Today 14:22', amount: '+40 Beans', tone: 'is-green' },
  { initial: 'P', name: 'Priya M.', detail: 'Redeemed · Today 11:08', amount: '-100 Beans', tone: 'is-wine' },
  { initial: 'A', name: 'Arjun K.', detail: 'Earned · Yesterday 09:41', amount: '+20 Beans', tone: 'is-green' },
  {
    initial: 'M',
    name: 'Meera R.',
    detail: 'Converted · Yesterday 18:05',
    amount: '−200 Beans → 160 Coins',
    tone: '',
  },
]

export function BrandCurrencyLedger() {
  return (
    <section className="loyalty-board menu-panel" aria-label="Brand currency">
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

      <div className="figure-grid">
        {FIGURES.map((figure) => (
          <article key={figure.label}>
            <p>{figure.label}</p>
            <strong className={figure.tone}>{figure.value}</strong>
          </article>
        ))}
      </div>

      <h3>Recent transactions</h3>
      <div className="txn-list">
        {TRANSACTIONS.map((txn) => (
          <article key={txn.name}>
            <span>{txn.initial}</span>
            <div>
              <strong>{txn.name}</strong>
              <em>{txn.detail}</em>
            </div>
            <b className={txn.tone}>{txn.amount}</b>
          </article>
        ))}
      </div>
    </section>
  )
}
