export type FootfallBar = {
  hour: string
  value: number
  state: 'past' | 'current' | 'future'
}

/** Relative heights for 8AM–9PM chart */
/** Heights measured from the reference chart, as a percent of the tallest bar. */
export const FOOTFALL_BARS: FootfallBar[] = [
  { hour: '8AM', value: 17, state: 'past' },
  { hour: '9AM', value: 37, state: 'past' },
  { hour: '10AM', value: 34, state: 'past' },
  { hour: '11AM', value: 21, state: 'past' },
  { hour: '12PM', value: 54, state: 'past' },
  { hour: '1PM', value: 64, state: 'past' },
  { hour: '2PM', value: 45, state: 'current' },
  { hour: '3PM', value: 30, state: 'future' },
  { hour: '4PM', value: 84, state: 'future' },
  { hour: '5PM', value: 100, state: 'future' },
  { hour: '6PM', value: 92, state: 'future' },
  { hour: '7PM', value: 60, state: 'future' },
  { hour: '8PM', value: 42, state: 'future' },
  { hour: '9PM', value: 22, state: 'future' },
]
