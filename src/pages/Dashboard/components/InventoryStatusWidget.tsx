import { INVENTORY_ITEMS, INVENTORY_STATS } from '../constants/inventory'
import { CornerGrip } from './CornerGrip'

export function InventoryStatusWidget() {
  return (
    <article className="dash-widget dash-inventory">
      <div className="dash-panel-head">
        <div>
          <h2 className="dash-widget-title">Inventory &amp; Menu Status</h2>
          <p className="dash-panel-sub">Live stock alerts · Menu availability</p>
        </div>
        <span className="dash-panel-badge">5 alerts</span>
      </div>

      <div className="dash-inventory-stats">
        {INVENTORY_STATS.map((stat) => (
          <div key={stat.id} className={`dash-inventory-stat is-${stat.tone}`}>
            <p>{stat.value}</p>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="dash-inventory-list">
        {INVENTORY_ITEMS.map((item) => (
          <div key={item.id} className="dash-inventory-row">
            <div className="dash-inventory-top">
              <span className="dash-inventory-name">{item.name}</span>
              <span className="dash-inventory-amount">{item.amount}</span>
              <span className={`dash-inventory-status is-${item.statusTone}`}>
                {item.status}
              </span>
            </div>
            <div className="dash-inventory-track">
              <span
                className={`dash-inventory-bar is-${item.bar}`}
                style={{ width: `${item.fill}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="dash-inventory-link">
        View Full Inventory →
      </button>
      <CornerGrip />
    </article>
  )
}
