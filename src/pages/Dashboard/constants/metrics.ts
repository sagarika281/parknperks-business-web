export type MetricTone = 'up' | 'down' | 'new' | 'urgent'

export type MetricCardData = {
  id: string
  label: string
  value: string
  delta: string
  tone: MetricTone
}

export const DASHBOARD_METRICS: MetricCardData[] = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: '₹18,400',
    delta: '↑ +12% vs yesterday',
    tone: 'up',
  },
  {
    id: 'orders',
    label: 'Orders',
    value: '47',
    delta: '↑ +8% vs yesterday',
    tone: 'up',
  },
  {
    id: 'footfall',
    label: 'Footfall',
    value: '61',
    delta: '↑ +15% vs yesterday',
    tone: 'up',
  },
  {
    id: 'avg-order',
    label: 'Avg Order',
    value: '₹391',
    delta: '↑ +4% vs yesterday',
    tone: 'up',
  },
  {
    id: 'member-sales',
    label: 'Member Sales',
    value: '68%',
    delta: '↑ +3pp vs yesterday',
    tone: 'up',
  },
  {
    id: 'gross-margin',
    label: 'Gross Margin',
    value: '62.4%',
    delta: '↓ -3.2pp vs yesterday',
    tone: 'down',
  },
  {
    id: 'agent-revenue',
    label: 'Agent Revenue',
    value: '₹2,100',
    delta: '↑ new vs yesterday',
    tone: 'new',
  },
  {
    id: 'pending',
    label: 'Pending Actions',
    value: '3',
    delta: '↓ urgent vs yesterday',
    tone: 'urgent',
  },
]
