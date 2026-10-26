import { ACTIVITY_ITEMS } from '../constants/activity'

export function TodaysActivity() {
  return (
    <section className="counter-activity" aria-label="Today's activity">
      <header className="counter-activity-head">
        <h2>Today&apos;s Activity</h2>
        <p>{ACTIVITY_ITEMS.length} transactions today</p>
      </header>
      <ul className="counter-activity-list">
        {ACTIVITY_ITEMS.map((item) => (
          <li key={item.id} className="counter-activity-item">
            <div className="counter-activity-copy">
              <p className="counter-activity-name">
                <span className={`counter-activity-dot is-${item.tone}`} aria-hidden="true" />
                {item.name}
              </p>
              <p className="counter-activity-detail">{item.detail}</p>
            </div>
            <div className="counter-activity-meta">
              <span className={`counter-activity-beans is-${item.tone}`}>{item.beans}</span>
              <span className="counter-activity-time">{item.time}</span>
            </div>
          </li>
        ))}
      </ul>
      <footer className="counter-activity-summary">
        <span>Issued</span>
        <div className="counter-activity-redeemed">
          <span>Redeemed</span>
          <strong>-100 Beans</strong>
        </div>
      </footer>
    </section>
  )
}
