import type { MetricCardData } from '../constants/metrics'

type MetricCardProps = {
  metric: MetricCardData
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className={`dash-metric is-${metric.tone}`}>
      <p className="dash-metric-label">{metric.label}</p>
      <p className="dash-metric-value">{metric.value}</p>
      <p className="dash-metric-delta">{metric.delta}</p>
    </article>
  )
}
