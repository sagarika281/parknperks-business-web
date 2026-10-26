const HISTORY = [
  { month: 'August 2026', conversions: '38 conversions', amount: '₹6,240' },
  { month: 'July 2026', conversions: '29 conversions', amount: '₹4,890' },
  { month: 'June 2026', conversions: '18 conversions', amount: '₹3,100' },
]

export function Settlement() {
  return (
    <section className="settlement" aria-label="Settlement">
      <header className="loyalty-board-head">
        <div>
          <h2>Settlement</h2>
          <div className="loyalty-board-meta">
            <span className="settlement-pending">₹8,420 Pending</span>
          </div>
        </div>
        <div className="loyalty-board-actions">
          <button type="button">Download Statement</button>
          <button type="button" className="is-performance">
            View Settlement
          </button>
        </div>
      </header>

      <article className="settlement-due">
        <div>
          <strong>Settlement Due — 18 September 2026</strong>
          <p>47 conversions this month · 9,400 Beans converted</p>
        </div>
        <b>₹8,420</b>
      </article>

      <h3>Settlement history</h3>
      <ul className="settlement-history">
        {HISTORY.map((row) => (
          <li key={row.month}>
            <div>
              <strong>{row.month}</strong>
              <p>{row.conversions}</p>
            </div>
            <span>
              <i>Paid</i>
              <b>{row.amount}</b>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
