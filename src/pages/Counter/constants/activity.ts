export type ActivityTone = 'up' | 'down' | 'muted'

export type ActivityItem = {
  id: string
  name: string
  detail: string
  beans: string
  time: string
  tone: ActivityTone
}

export const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: 'aarav',
    name: 'Aarav Mehta',
    detail: 'Beans issued · ₹180',
    beans: '+16 Beans',
    time: '3h ago',
    tone: 'up',
  },
  {
    id: 'ganesh',
    name: 'Ganesh Raman',
    detail: 'Visit issued · ₹240',
    beans: '+24 Beans',
    time: '3h ago',
    tone: 'up',
  },
  {
    id: 'karthik',
    name: 'Karthik Subramanian',
    detail: 'Milestone reward',
    beans: '—',
    time: '2h ago',
    tone: 'muted',
  },
  {
    id: 'meera',
    name: 'Meera Rajagopalan',
    detail: 'Beans issued · ₹120',
    beans: '+12 Beans',
    time: '2h ago',
    tone: 'up',
  },
  {
    id: 'sneha',
    name: 'Sneha Iyer',
    detail: 'Beans redeemed',
    beans: '100 Beans',
    time: '2h ago',
    tone: 'down',
  },
  {
    id: 'pooja',
    name: 'Pooja Hegde',
    detail: 'Beans issued · ₹10',
    beans: '+10 Beans',
    time: '2h ago',
    tone: 'up',
  },
  {
    id: 'rahul',
    name: 'Rahul Desai',
    detail: 'Beans issued · ₹90',
    beans: '+9 Beans',
    time: '1h ago',
    tone: 'up',
  },
  {
    id: 'ananya',
    name: 'Ananya Shah',
    detail: 'Beans redeemed',
    beans: '40 Beans',
    time: '1h ago',
    tone: 'down',
  },
]
