import { DASHBOARD_METRICS } from '../constants/metrics'
import { MetricCard } from './MetricCard'

export function MetricsRow() {
  return (
    <section className="dash-metrics" aria-label="Today metrics">
      {DASHBOARD_METRICS.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </section>
  )
}
