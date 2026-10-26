import { TRAFFIC_NOTE, TRAFFIC_ROWS } from '../constants/traffic'
import { CornerGrip } from './CornerGrip'

export function TrafficIntelligenceWidget() {
  return (
    <article className="dash-widget dash-traffic">
      <div className="dash-traffic-head">
        <h2 className="dash-widget-title">Traffic Intelligence</h2>
        <p className="dash-traffic-sub">
          Google Maps congestion index near Indiranagar outlet · impact on
          walk-in probability
        </p>
      </div>

      <div className="dash-traffic-list">
        {TRAFFIC_ROWS.map((row) => (
          <div key={row.id} className="dash-traffic-row">
            <div className="dash-traffic-top">
              <span className="dash-traffic-window">{row.window}</span>
              <span className="dash-traffic-label">{row.label}</span>
              <span className="dash-traffic-score">Traffic {row.score}</span>
              <span className={`dash-traffic-change is-${row.changeTone}`}>
                {row.change}
              </span>
            </div>
            <div className="dash-traffic-bar-track">
              <span
                className={`dash-traffic-bar is-${row.tone}`}
                style={{ width: `${row.fill}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="dash-traffic-note">
        <strong>{TRAFFIC_NOTE.title}</strong>
        <p>{TRAFFIC_NOTE.detail}</p>
      </div>
      <CornerGrip />
    </article>
  )
}
