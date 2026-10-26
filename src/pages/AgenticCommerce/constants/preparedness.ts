export type PrepCategory =
  | 'weather'
  | 'shipment'
  | 'staffing'
  | 'campaign'
  | 'loyalty'
  | 'lifestyle'
  | 'maintenance'
  | 'inventory'
  | 'agent'

export type PrepTone = 'alert' | 'ok' | 'neutral' | 'warn'

export type PrepBadge = {
  label: string
  tone: 'critical' | 'delayed' | 'live'
}

export type AgendaTag = {
  label: string
  tone: 'high' | 'medium' | 'info' | 'critical' | 'soft'
}

export type PrepEvent = {
  id: string
  title: string
  date: string
  time: string
  category: PrepCategory
  tone: PrepTone
  badges: PrepBadge[]
  outlet: string
  responsible: string
  summary: string
  callout?: string
  tags?: AgendaTag[]
  note?: string
  prepared?: boolean
}

export const PREP_TODAY = '2026-09-15'
export const DEFAULT_PREP_EVENT = 'vanilla-syrup'

export const PREP_CATEGORIES: { id: PrepCategory; label: string }[] = [
  { id: 'weather', label: 'Weather' },
  { id: 'shipment', label: 'Shipment' },
  { id: 'staffing', label: 'Staffing' },
  { id: 'campaign', label: 'Campaign' },
  { id: 'loyalty', label: 'Loyalty' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'agent', label: 'Agent Action' },
]

export const PREP_ACTIONS = [
  'Create Preparation Task',
  'Assign to Team Member',
  'Mark as Prepared',
  'Schedule Agent Action',
  'Add Note',
  'Notify Team',
] as const

export const PREP_EVENTS: PrepEvent[] = [
  {
    id: 'rain-forecast',
    title: 'Heavy Rain Forecast',
    date: '2026-09-15',
    time: '14:00',
    category: 'weather',
    tone: 'alert',
    badges: [{ label: 'watch', tone: 'live' }],
    outlet: 'Bandra West',
    responsible: 'Owner',
    summary:
      'Heavy rain expected from 2 PM. Footfall may drop outside and rise for hot drinks inside.',
    tags: [
      { label: 'high', tone: 'high' },
      { label: 'forecast', tone: 'soft' },
    ],
    note: '-20% footfall, +34% hot beverage',
  },
  {
    id: 'evening-rush',
    title: 'Evening Rush (High Footfall)',
    date: '2026-09-15',
    time: '17:00',
    category: 'staffing',
    tone: 'ok',
    badges: [{ label: 'live', tone: 'live' }],
    outlet: 'Bandra West',
    responsible: 'Manager',
    summary: 'Forecast peak between 5 PM and 7 PM. Extra bar cover is recommended.',
    tags: [
      { label: 'high', tone: 'high' },
      { label: 'predicted', tone: 'soft' },
    ],
  },
  {
    id: 'lids-reorder',
    title: 'Takeaway Lids Reorder Due',
    date: '2026-09-16',
    time: '10:00',
    category: 'inventory',
    tone: 'neutral',
    badges: [],
    outlet: 'Bandra West',
    responsible: 'Manager',
    summary: 'Lid stock falls under the reorder point before the weekend rush.',
    tags: [
      { label: 'medium', tone: 'medium' },
      { label: 'confirmed', tone: 'soft' },
    ],
  },
  {
    id: 'weekend-campaigns',
    title: 'Weekend Campaigns Live',
    date: '2026-09-16',
    time: '09:00',
    category: 'campaign',
    tone: 'warn',
    badges: [{ label: 'live', tone: 'live' }],
    outlet: 'All outlets',
    responsible: 'Manager',
    summary: 'Monsoon hot-drink and loyalty offers go live for the weekend.',
    tags: [
      { label: 'info', tone: 'info' },
      { label: 'confirmed', tone: 'soft' },
    ],
    prepared: true,
  },
  {
    id: 'vanilla-syrup',
    title: 'Vanilla Syrup Delivery (Delayed)',
    date: '2026-09-17',
    time: '14:00',
    category: 'shipment',
    tone: 'alert',
    badges: [
      { label: 'critical', tone: 'critical' },
      { label: 'delayed', tone: 'delayed' },
    ],
    outlet: 'Bandra West',
    responsible: 'Manager',
    summary:
      'Monin India delivery delayed from 14 Sep to 17 Sep. 4 menu items at risk of stockout.',
    callout: '4 menu items unavailable',
    tags: [
      { label: 'critical', tone: 'critical' },
      { label: 'delayed', tone: 'soft' },
    ],
    note: '4 menu items unavailable',
  },
  {
    id: 'loyalty-drop',
    title: 'Lifestyle Bridge Settlement',
    date: '2026-09-18',
    time: '09:00',
    category: 'lifestyle',
    tone: 'ok',
    badges: [],
    outlet: 'All outlets',
    responsible: 'Owner',
    summary: 'Bridge settlement for the lifestyle partners is ready to collect.',
    tags: [
      { label: 'medium', tone: 'medium' },
      { label: 'confirmed', tone: 'soft' },
    ],
    note: '₹8,420 receivable',
    prepared: true,
  },
  {
    id: 'machine-service',
    title: 'Espresso Machine Service',
    date: '2026-09-19',
    time: '08:30',
    category: 'maintenance',
    tone: 'neutral',
    badges: [],
    outlet: 'Bandra West',
    responsible: 'Technician',
    summary: 'Preventive service window before the Saturday open.',
  },
  {
    id: 'agent-prep',
    title: 'Agent: Prep Hot Menu',
    date: '2026-09-21',
    time: '16:00',
    category: 'agent',
    tone: 'warn',
    badges: [{ label: 'live', tone: 'live' }],
    outlet: 'Bandra West',
    responsible: 'Agent',
    summary: 'Agent recommends pushing the hot menu before the rain window.',
  },
  {
    id: 'lifestyle-walk',
    title: 'Weekend Walk-in Lift',
    date: '2026-09-20',
    time: '12:00',
    category: 'lifestyle',
    tone: 'ok',
    badges: [],
    outlet: 'Bandra West',
    responsible: 'Manager',
    summary: 'Nearby market event is expected to lift afternoon walk-ins.',
  },
]

export function prepDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function toIso(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function startOfWeek(date: Date) {
  const next = new Date(date)
  const mondayOffset = (next.getDay() + 6) % 7
  next.setDate(next.getDate() - mondayOffset)
  next.setHours(0, 0, 0, 0)
  return next
}

export function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function formatWhen(iso: string, time: string) {
  const label = prepDate(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
  return `${label} · ${time}`
}

export function weekdayShort(iso: string) {
  return prepDate(iso).toLocaleDateString('en-GB', { weekday: 'short' })
}
