export type LifestyleId =
  | 'overview'
  | 'wallet'
  | 'experience'
  | 'rules'
  | 'ratio'
  | 'eligibility'
  | 'settlement'
  | 'audit'
  | 'performance'
  | 'settings'

export type LifestyleItem = {
  id: LifestyleId
  title: string
  detail: string
  meta?: string
  status: string
}

export const LIFESTYLE_ITEMS: LifestyleItem[] = [
  {
    id: 'overview',
    title: 'Bridge Overview',
    detail: 'Connected to Lifestyle wallet',
    status: 'Active',
  },
  {
    id: 'wallet',
    title: 'Wallet Connection',
    detail: '1,284 connected members',
    meta: '+8% this month',
    status: 'Active',
  },
  {
    id: 'experience',
    title: 'Member Experience',
    detail: 'Branded card live',
    status: 'Active',
  },
  {
    id: 'rules',
    title: 'Conversion Rules',
    detail: '100 Beans = 80 Coins',
    status: 'Active',
  },
  {
    id: 'ratio',
    title: 'Transfer Ratio',
    detail: '100 Beans = 80 Lifestyle Coins',
    status: 'Active',
  },
  {
    id: 'eligibility',
    title: 'Eligibility & Limits',
    detail: 'Loyal+ tier eligible',
    meta: 'Min 200 Beans',
    status: 'Active',
  },
  {
    id: 'settlement',
    title: 'Settlement',
    detail: '₹8,420 pending',
    meta: 'Due 18 September',
    status: 'Pending',
  },
  {
    id: 'audit',
    title: 'Activity & Audit',
    detail: '47 conversions this month',
    status: 'Active',
  },
  {
    id: 'performance',
    title: 'Bridge Performance',
    detail: '18% conversion rate',
    status: 'Good',
  },
  {
    id: 'settings',
    title: 'Settings',
    detail: 'Auto-settlement on',
    status: 'Active',
  },
]

export const FUNNEL = [
  { label: 'Eligible members', value: '1,284', fill: 100 },
  { label: 'Initiated conversion', value: '261', fill: 38 },
  { label: 'Completed conversion', value: '47', fill: 16 },
]

export const ACTIVITY = [
  {
    initial: 'M',
    name: 'Meera R.',
    detail: 'Converted 200 Beans → 160 Coins',
    when: 'Yesterday 18:05',
  },
  {
    initial: 'A',
    name: 'Anand P.',
    detail: 'Connected Lifestyle wallet',
    when: 'Today 09:12',
  },
  {
    initial: 'L',
    name: 'Lakshmi V.',
    detail: 'Converted 500 Beans → 400 Coins',
    when: '14 Sep 11:30',
  },
]
