import { TRADE_SIGNALS } from '../constants/tradeSignals'
import { CornerGrip } from './CornerGrip'

function WeatherIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M7.5 15.5h8.2a3.3 3.3 0 0 0 .4-6.6 4.4 4.4 0 0 0-8.4 1.2 2.7 2.7 0 0 0-.2 5.4z"
        fill="#d7e4f2"
        stroke="#8eb0c8"
        strokeWidth="1.2"
      />
      <path
        d="M8 18.2l-.7 2M12 18.2l-.7 2M16 18.2l-.7 2"
        fill="none"
        stroke="#7aa0c4"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MarginIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <rect x="3" y="3" width="10" height="10" rx="2" fill="#2f9e6b" />
      <rect x="11" y="11" width="10" height="10" rx="2" fill="#c4474a" />
    </svg>
  )
}

function SignalIcon({ kind }: { kind: 'weather' | 'event' | 'margin' }) {
  if (kind === 'weather') return <WeatherIcon />
  if (kind === 'event') return <EventIcon />
  return <MarginIcon />
}

function EventIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="8" cy="9" r="2.2" fill="#e07a3d" />
      <circle cx="13.2" cy="8.2" r="2" fill="#3d8fd4" />
      <circle cx="17.2" cy="10.2" r="1.7" fill="#e0b43d" />
      <path
        d="M5.2 16.8c.6-1.8 2-2.8 3.6-2.8s2.6 1 3.2 2.4M11 16.6c.5-1.5 1.6-2.3 3-2.3 1.5 0 2.5.9 3.1 2.3"
        fill="none"
        stroke="#c47a3a"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TradeSignalWidget() {
  return (
    <article className="dash-widget dash-trade">
      <div className="dash-trade-head">
        <h2 className="dash-trade-title">AI TRADE SIGNAL · TODAY</h2>
        <span className="dash-trade-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <p className="dash-trade-count">3 signals detected</p>

      <div className="dash-trade-list">
        {TRADE_SIGNALS.map((signal) => (
          <div key={signal.id} className={`dash-trade-item is-${signal.kind}`}>
            <div className="dash-trade-item-top">
              <span className="dash-trade-icon">
                <SignalIcon kind={signal.kind} />
              </span>
              <span className="dash-trade-pill">{signal.label}</span>
              <p className="dash-trade-detail">{signal.detail}</p>
            </div>
            <p className="dash-trade-hint">{signal.hint}</p>
          </div>
        ))}
      </div>
      <CornerGrip />
    </article>
  )
}
