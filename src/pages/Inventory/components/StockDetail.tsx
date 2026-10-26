import type { StockItem } from '../constants/stock'
import { formatQty, statusClass } from '../constants/stock'

type StockDetailProps = {
  item: StockItem
  onRestock: () => void
  onRemove: () => void
}

export function StockDetail({ item, onRestock, onRemove }: StockDetailProps) {
  const below =
    item.minimum != null ? Math.max(0, Math.round((item.minimum - item.quantity) * 10) / 10) : 0
  const fill =
    item.minimum != null ? Math.min(100, Math.round((item.quantity / item.minimum) * 100)) : 100
  const stockValue =
    item.unitCost != null ? Math.round(item.quantity * item.unitCost).toLocaleString('en-IN') : null

  return (
    <section className="stock-detail" aria-label={item.name}>
      <header className="stock-head">
        <div>
          <h2>{item.name}</h2>
          <div className="stock-tags">
            <span className="stock-tag">{item.category}</span>
            <span className={`stock-tag ${statusClass(item.status)}`}>{item.status}</span>
          </div>
        </div>
        <div className="stock-actions">
          <button type="button" className="is-restock" onClick={onRestock}>
            Restock
          </button>
          <button type="button" onClick={onRemove}>
            Remove
          </button>
        </div>
      </header>

      <div className="stock-level">
        <p>Current stock level</p>
        <strong>
          {formatQty(item.quantity, item.unit)}
          {item.minimum != null ? <em> / {formatQty(item.minimum, item.unit)} minimum</em> : null}
        </strong>
        <span className="stock-bar" aria-hidden="true">
          <i style={{ width: `${fill}%` }} />
        </span>
        {item.minimum != null && below > 0 ? (
          <span className="stock-note">
            {formatQty(below, item.unit)} below minimum threshold
          </span>
        ) : null}
      </div>

      <div className="stock-facts">
        {item.unitCost != null ? (
          <article>
            <p>Unit cost</p>
            <strong>₹{item.unitCost.toLocaleString('en-IN')}</strong>
            <span>per {item.unit}</span>
          </article>
        ) : null}
        {stockValue != null ? (
          <article>
            <p>Stock value</p>
            <strong>₹{stockValue}</strong>
            <span>at current price</span>
          </article>
        ) : null}
        {item.lastRestocked ? (
          <article>
            <p>Last restocked</p>
            <strong>{item.lastRestocked}</strong>
            <span>{item.supplier}</span>
          </article>
        ) : null}
      </div>

      {item.history.length > 0 ? (
        <div className="stock-history">
          <h3>Restock history</h3>
          <ul>
            {item.history.map((entry) => (
              <li key={`${entry.date}-${entry.qty}`}>
                <div>
                  <strong>{entry.date}</strong>
                  <span>by {entry.by}</span>
                </div>
                <div className="stock-history-qty">
                  <b>{entry.qty}</b>
                  <span>{entry.cost}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="stock-supplier">
        <div>
          <h3>Supplier</h3>
          <strong>{item.supplier}</strong>
          {item.leadTime ? <span>Lead time: {item.leadTime}</span> : null}
        </div>
        <button type="button">Send PO</button>
      </div>
    </section>
  )
}
