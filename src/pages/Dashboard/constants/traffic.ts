export type TrafficRow = {
  id: string
  window: string
  label: string
  fill: number
  tone: 'teal' | 'red' | 'muted'
  score: string
  change: string
  changeTone: 'up' | 'down'
}

export const TRAFFIC_ROWS: TrafficRow[] = [
  {
    id: 'morning',
    window: '8–10 AM',
    label: 'Morning rush',
    fill: 72,
    tone: 'teal',
    score: '72/100',
    change: '+18% footfall',
    changeTone: 'up',
  },
  {
    id: 'lunch',
    window: '12–2 PM',
    label: 'Lunch peak',
    fill: 55,
    tone: 'teal',
    score: '55/100',
    change: '+8% footfall',
    changeTone: 'up',
  },
  {
    id: 'evening',
    window: '4–6 PM',
    label: 'Evening peak',
    fill: 91,
    tone: 'red',
    score: '91/100',
    change: '+31% footfall',
    changeTone: 'up',
  },
  {
    id: 'night',
    window: '7–9 PM',
    label: 'Winding down',
    fill: 44,
    tone: 'muted',
    score: '44/100',
    change: '-5% footfall',
    changeTone: 'down',
  },
]

export const TRAFFIC_NOTE = {
  title: 'Weekend multiplier: +22% incoming',
  detail:
    'Saturday 15 Sep — Koramangala Social District index high. Ensure full staffing.',
}
