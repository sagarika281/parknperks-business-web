export type CustomerSegment = 'Loyalty' | 'New' | 'Active' | 'High Value' | 'At Risk' | 'Dormant'

export type CustomerFilter = 'All' | CustomerSegment

export type Customer = {
  id: string
  name: string
  initial: string
  tone: 'wine' | 'green' | 'gold'
  tier: string
  vip: boolean
  beans: number
  lifetimeValue: number
  visits: number
  avgOrder: number
  lastVisit: string
  frequency: string
  phone: string
  email: string
  memberId: string
  campaignsOpened: string
  campaignsRedeemed: string
  nps: number
  npsLabel: string
  notify: boolean
  segments: CustomerSegment[]
}

export const CUSTOMER_FILTERS: CustomerFilter[] = [
  'All',
  'Loyalty',
  'New',
  'Active',
  'High Value',
  'At Risk',
  'Dormant',
]

export const CUSTOMERS: Customer[] = [
  {
    id: 'karthik',
    name: 'Karthik Subramanian',
    initial: 'K',
    tone: 'wine',
    tier: 'Legend',
    vip: true,
    beans: 520,
    lifetimeValue: 18420,
    visits: 94,
    avgOrder: 196,
    lastVisit: '2 days ago',
    frequency: '~8× per month',
    phone: '+91 98200 11234',
    email: 'karthik.s@email.com',
    memberId: 'BC-C1-KS',
    campaignsOpened: '2/3',
    campaignsRedeemed: '1/3',
    nps: 10,
    npsLabel: 'Promoter',
    notify: true,
    segments: ['Loyalty', 'Active', 'High Value'],
  },
  {
    id: 'priya',
    name: 'Priya Krishnamurthy',
    initial: 'P',
    tone: 'green',
    tier: 'Loyal',
    vip: false,
    beans: 210,
    lifetimeValue: 8200,
    visits: 40,
    avgOrder: 205,
    lastVisit: '22 days ago',
    frequency: '~2× per month',
    phone: '+91 98450 22118',
    email: 'priya.k@email.com',
    memberId: 'BC-L2-PK',
    campaignsOpened: '1/3',
    campaignsRedeemed: '0/3',
    nps: 6,
    npsLabel: 'Passive',
    notify: true,
    segments: ['Loyalty', 'At Risk'],
  },
  {
    id: 'arjun',
    name: 'Arjun Kumar',
    initial: 'A',
    tone: 'gold',
    tier: 'Regular',
    vip: false,
    beans: 88,
    lifetimeValue: 4100,
    visits: 21,
    avgOrder: 195,
    lastVisit: '45 days ago',
    frequency: '~1× per month',
    phone: '+91 99000 44120',
    email: 'arjun.k@email.com',
    memberId: 'BC-R3-AK',
    campaignsOpened: '0/3',
    campaignsRedeemed: '0/3',
    nps: 4,
    npsLabel: 'Detractor',
    notify: false,
    segments: ['Loyalty', 'Dormant'],
  },
  {
    id: 'meera',
    name: 'Meera Rajendran',
    initial: 'M',
    tone: 'green',
    tier: 'Loyal',
    vip: false,
    beans: 390,
    lifetimeValue: 12800,
    visits: 64,
    avgOrder: 200,
    lastVisit: '1 day ago',
    frequency: '~6× per month',
    phone: '+91 98111 22045',
    email: 'meera.r@email.com',
    memberId: 'BC-L4-MR',
    campaignsOpened: '2/3',
    campaignsRedeemed: '1/3',
    nps: 9,
    npsLabel: 'Promoter',
    notify: false,
    segments: ['Loyalty', 'Active', 'High Value'],
  },
  {
    id: 'rahul',
    name: 'Rahul Menon',
    initial: 'R',
    tone: 'wine',
    tier: 'Legend',
    vip: false,
    beans: 892,
    lifetimeValue: 22100,
    visits: 110,
    avgOrder: 201,
    lastVisit: '4 days ago',
    frequency: '~7× per month',
    phone: '+91 98400 77821',
    email: 'rahul.m@email.com',
    memberId: 'BC-C2-RM',
    campaignsOpened: '3/3',
    campaignsRedeemed: '2/3',
    nps: 10,
    npsLabel: 'Promoter',
    notify: false,
    segments: ['Loyalty', 'Active', 'High Value'],
  },
  {
    id: 'ananya',
    name: 'Ananya Iyer',
    initial: 'A',
    tone: 'gold',
    tier: 'Starter',
    vip: false,
    beans: 32,
    lifetimeValue: 1200,
    visits: 8,
    avgOrder: 150,
    lastVisit: '60 days ago',
    frequency: '~1× every 2 months',
    phone: '+91 99012 33456',
    email: 'ananya.i@email.com',
    memberId: 'BC-S5-AI',
    campaignsOpened: '0/3',
    campaignsRedeemed: '0/3',
    nps: 7,
    npsLabel: 'Passive',
    notify: true,
    segments: ['Loyalty', 'Dormant'],
  },
  {
    id: 'vikram',
    name: 'Vikram Nair',
    initial: 'V',
    tone: 'green',
    tier: 'Regular',
    vip: false,
    beans: 156,
    lifetimeValue: 5600,
    visits: 28,
    avgOrder: 200,
    lastVisit: '18 days ago',
    frequency: '~2× per month',
    phone: '+91 98860 11290',
    email: 'vikram.n@email.com',
    memberId: 'BC-R6-VN',
    campaignsOpened: '1/3',
    campaignsRedeemed: '1/3',
    nps: 5,
    npsLabel: 'Detractor',
    notify: false,
    segments: ['Loyalty', 'At Risk'],
  },
]

export function formatInr(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}
