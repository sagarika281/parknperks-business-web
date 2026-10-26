export type ProgrammeId =
  | 'setup'
  | 'value'
  | 'milestone'
  | 'tiers'
  | 'currency'
  | 'wallet'
  | 'performance'

export type ProgrammeItem = {
  id: ProgrammeId
  title: string
  detail: string
  meta?: string
  status: string
  attention?: number
}

export const PROGRAMME_ITEMS: ProgrammeItem[] = [
  {
    id: 'setup',
    title: 'Programme Setup',
    detail: 'Beans programme',
    meta: 'Updated 3 days ago',
    status: 'Active',
  },
  {
    id: 'value',
    title: 'Value-Back',
    detail: '1 Bean per ₹10 spent',
    meta: 'Updated 1 week ago',
    status: 'Active',
  },
  {
    id: 'milestone',
    title: 'Milestone Card',
    detail: '5 milestone stamps',
    meta: 'Updated 2 weeks ago',
    status: 'Active',
  },
  {
    id: 'tiers',
    title: 'Tiers',
    detail: '4 active tiers',
    meta: '3 members ready to upgrade',
    status: 'Active',
    attention: 3,
  },
  {
    id: 'currency',
    title: 'Brand Currency',
    detail: '13,900 Beans outstanding',
    meta: '₹1,390 liability',
    status: 'Active',
  },
  {
    id: 'wallet',
    title: 'Member Wallet',
    detail: '1,284 wallet members',
    status: 'Active',
  },
  {
    id: 'performance',
    title: 'Performance',
    detail: '72 NPS · 68% attach rate',
    status: 'Good',
  },
]

export const TIERS = [
  { name: 'Starter', range: '0–199 Beans', count: 312, fill: 32, color: '#d4c4a4' },
  { name: 'Regular', range: '200–499 Beans', count: 487, fill: 58, color: '#e4a15c' },
  { name: 'Loyal', range: '500–999 Beans', count: 341, fill: 46, color: '#1e6b52' },
  { name: 'Legend', range: '1,000+ Beans', count: 144, fill: 24, color: '#c4475c' },
]
