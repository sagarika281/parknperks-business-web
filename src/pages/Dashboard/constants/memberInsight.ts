export type FeedbackItem = {
  id: string
  initial: string
  name: string
  tone: 'green' | 'purple' | 'orange'
  quote: string
}

export type MemberRequest = {
  id: string
  label: string
  votes: number
  fill: number
  bar: 'teal' | 'muted' | 'red'
}

export const MEMBER_NPS = {
  score: 72,
  change: '↑ +4 vs last month · Excellent',
  promoters: 61,
  passives: 29,
  detractors: 10,
}

export const MEMBER_FEEDBACK: FeedbackItem[] = [
  {
    id: 'kiran',
    initial: 'K',
    name: 'Kiran R.',
    tone: 'green',
    quote: '“Loved the oat latte + cashback was a nice surprise!”',
  },
  {
    id: 'priya',
    initial: 'P',
    name: 'Priya M.',
    tone: 'purple',
    quote: '“Queue was a bit long on Saturday noon — otherwise perfect.”',
  },
  {
    id: 'arjun',
    initial: 'A',
    name: 'Arjun K.',
    tone: 'orange',
    quote: '“The Beans system is genius. Feels rewarding every visit.”',
  },
]

export const MEMBER_REQUESTS: MemberRequest[] = [
  {
    id: 'variety',
    label: 'More drink variety / seasonal menu',
    votes: 28,
    fill: 100,
    bar: 'teal',
  },
  {
    id: 'queues',
    label: 'Faster queues at lunch hour',
    votes: 21,
    fill: 75,
    bar: 'muted',
  },
  {
    id: 'beans',
    label: 'Option to redeem Beans for delivery',
    votes: 17,
    fill: 61,
    bar: 'teal',
  },
  {
    id: 'birthday',
    label: 'Birthday / anniversary surprise',
    votes: 14,
    fill: 50,
    bar: 'red',
  },
  {
    id: 'legend',
    label: 'Loyalty tier gift at Legend status',
    votes: 12,
    fill: 43,
    bar: 'muted',
  },
]
