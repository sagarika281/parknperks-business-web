import { CornerGrip } from './CornerGrip'

type CafeStatusWidgetProps = {
  employeeName: string
}

export function CafeStatusWidget({ employeeName }: CafeStatusWidgetProps) {
  const firstName = employeeName.split(' ')[0]

  return (
    <article className="dash-widget dash-cafe">
      <div className="dash-cafe-photo" role="img" aria-label="Brew and Co. cafe interior" />
      <div className="dash-cafe-body">
        <p className="dash-cafe-date">Monday · 14 SEP 2026</p>
        <h2 className="dash-cafe-greeting">
          Good morning, {firstName}{' '}
          <span aria-hidden="true">☀️</span>
        </h2>
        <p className="dash-cafe-locations">
          Brew &amp; Co. · Indiranagar + Koramangala
        </p>
        <div className="dash-cafe-stats">
          <p>
            <span>Footfall today (so far)</span>
            <strong className="is-teal">64</strong>
          </p>
          <p>
            <span>Forecast for today</span>
            <strong>190</strong>
          </p>
        </div>
      </div>
      <CornerGrip />
    </article>
  )
}
