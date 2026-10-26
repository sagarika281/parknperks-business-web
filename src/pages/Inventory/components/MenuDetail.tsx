import { formatPrice, type MenuItem } from '../constants/menu'

type MenuDetailProps = {
  item: MenuItem
  onToggle: () => void
  onRemove: () => void
  onEdit: () => void
}

export function MenuDetail({ item, onToggle, onRemove, onEdit }: MenuDetailProps) {
  const revenue = item.ordersToday * item.price

  return (
    <section className="stock-detail menu-detail" aria-label={item.name}>
      <header className="menu-head">
        <div className="menu-title">
          <span className="menu-cup" aria-hidden="true">
            <CupIcon />
          </span>
          <div>
            <h2>{item.name}</h2>
            <div className="stock-tags">
              <span className="stock-tag">{item.category}</span>
              <span className={item.available ? 'stock-tag is-ok' : 'stock-tag is-out'}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        </div>
        <div className="stock-actions">
          <button type="button" onClick={onEdit}>
            Edit
          </button>
          <button type="button" onClick={onRemove}>
            Remove
          </button>
        </div>
      </header>

      <p className="menu-desc">{item.description}</p>

      <div className="menu-price-row">
        <div>
          <p>Price</p>
          <strong>{formatPrice(item.price)}</strong>
        </div>
        <button type="button" onClick={onToggle}>
          {item.available ? 'Mark Unavailable' : 'Mark Available'}
        </button>
      </div>

      <div className="stock-facts">
        <article>
          <p>Orders today</p>
          <strong>{item.ordersToday}</strong>
          <span>at this outlet</span>
        </article>
        <article>
          <p>Weekly avg</p>
          <strong>{item.weeklyAvg}</strong>
          <span>orders / week</span>
        </article>
        <article>
          <p>Revenue today</p>
          <strong>{formatPrice(revenue)}</strong>
          <span>from this item</span>
        </article>
      </div>

      <div className="menu-counter">
        <strong>Connected to Billing Counter</strong>
        <p>
          This item appears in the Counter billing flow. Staff select it when building a customer bill.
          Marking it unavailable hides it from the counter.
        </p>
      </div>
    </section>
  )
}

function CupIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M6 8h9.2a3.2 3.2 0 0 1 0 6.4H15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 8h8.2v5.2A3.4 3.4 0 0 1 10.8 16.6H8.6A3.4 3.4 0 0 1 5.2 13.2V8.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 5.2c.4.7.4 1.3 0 2M10.4 5.2c.4.7.4 1.3 0 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
