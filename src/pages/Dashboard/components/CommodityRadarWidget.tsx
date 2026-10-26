import { COMMODITY_ITEMS } from '../constants/commodities'
import type { CommodityTone } from '../constants/commodities'
import { CornerGrip } from './CornerGrip'

function Sparkline({ tone }: { tone: CommodityTone }) {
  const path =
    tone === 'stable'
      ? 'M2 16 C8 14 12 10 18 8 C24 6 28 4 38 3'
      : tone === 'wait'
        ? 'M2 10 C8 9 14 12 20 10 C26 8 32 11 38 10'
        : 'M2 4 C10 6 16 8 22 12 C28 16 32 18 38 20'
  const color = tone === 'stable' ? '#2f9e6b' : tone === 'wait' ? '#b5aa9e' : '#c4474a'

  return (
    <svg className="dash-commodity-spark" viewBox="0 0 40 24" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CommodityRadarWidget() {
  return (
    <article className="dash-widget dash-commodity">
      <div className="dash-panel-head">
        <div>
          <h2 className="dash-widget-title">Commodity Radar</h2>
          <p className="dash-panel-sub">
            Live input-cost tracking · 7-day trend · margin impact
          </p>
        </div>
        <span className="dash-panel-badge">2 high-risk inputs</span>
      </div>

      <div className="dash-commodity-list">
        {COMMODITY_ITEMS.map((item) => (
          <div key={item.id} className="dash-commodity-row">
            <span className={`dash-commodity-dot is-${item.tone}`} aria-hidden="true" />
            <div className="dash-commodity-copy">
              <p className="dash-commodity-name">{item.name}</p>
              <p className="dash-commodity-hint">{item.hint}</p>
            </div>
            <Sparkline tone={item.tone} />
            <div className="dash-commodity-price">
              <p>
                {item.price}
                <span>{item.unit}</span>
              </p>
              <p className={`is-${item.changeTone}`}>{item.change}</p>
            </div>
          </div>
        ))}
      </div>
      <CornerGrip />
    </article>
  )
}
