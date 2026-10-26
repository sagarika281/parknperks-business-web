import { FOOTFALL_BARS } from '../constants/footfall'
import { CornerGrip } from './CornerGrip'

export function FootfallForecastWidget() {
  return (
    <article className="dash-widget dash-footfall">
      <div className="dash-footfall-head">
        <div>
          <h2 className="dash-widget-title">AI Footfall Forecast</h2>
          <p className="dash-footfall-sub">
            Hourly prediction · Confidence 84% · Based on 90-day pattern
          </p>
        </div>
        <span className="dash-footfall-badge">Lunch peak — prepare orders</span>
      </div>

      <div
        className="dash-footfall-chart"
        role="img"
        aria-label="Hourly footfall forecast"
      >
        {FOOTFALL_BARS.map((bar) => (
          <div
            key={bar.hour}
            className={`dash-footfall-col${bar.state === 'current' ? ' is-current-col' : ''}`}
          >
            <div className="dash-footfall-track">
              {bar.state === 'current' ? (
                <span
                  className="dash-footfall-marker"
                  style={{ bottom: `${bar.value}%` }}
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={`dash-footfall-bar is-${bar.state}`}
                style={{ height: `${bar.value}%` }}
              />
            </div>
            <span className="dash-footfall-hour">{bar.hour}</span>
          </div>
        ))}
      </div>

      <CornerGrip />

      <p className="dash-footfall-legend">
        <span className="is-actual">Actual</span>
        <span className="is-forecast">Forecast</span>
        <span className="is-next">Next hour</span>
        <span className="is-visits">Actual visits</span>
      </p>
    </article>
  )
}
