export type CampaignStatus = 'Active' | 'Scheduled' | 'Needs Approval' | 'Draft' | 'Completed'

export type CampaignFilter =
  | 'All'
  | 'Active'
  | 'Scheduled'
  | 'Draft'
  | 'Approval'
  | 'Completed'
  | 'AI Rec'

export const CAMPAIGN_FILTERS: CampaignFilter[][] = [
  ['All', 'Active', 'Scheduled'],
  ['Draft', 'Approval', 'Completed'],
  ['AI Rec'],
]

export type CampaignPreview = {
  brand: string
  body: string
  cta: string
}

export type CampaignEvent = {
  title: string
  time: string
}

export type Campaign = {
  id: string
  name: string
  status: CampaignStatus
  members: string
  channel: string
  when: string
  ai: boolean
  initial: string
  tone: 'wine' | 'green' | 'gold'
  sent: string
  opened: string
  redeemed: string
  conversion: string
  message: string
  reach: string
  impact: string
  agentRec: string
  recommendation?: { title: string; body: string }
  history: string
  preview: CampaignPreview
  timeline: CampaignEvent[]
  paused?: boolean
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'rainy-day',
    name: 'Rainy Day Hot Beverage',
    status: 'Needs Approval',
    members: '18 lapsed members',
    channel: 'WhatsApp',
    when: 'Today 5 PM',
    ai: true,
    initial: 'R',
    tone: 'wine',
    sent: '—',
    opened: '—',
    redeemed: '—',
    conversion: '—',
    message: 'Rainy evening? Come in for a warm hug. Show this to claim your hot beverage reward — today only!',
    reach: '18 members',
    impact: '₹1,200–₹1,900',
    agentRec: 'Yes — AI triggered',
    recommendation: {
      title: 'Why PARK[N]PERKS AI recommended this',
      body: 'Rain forecast for today 4–8 PM. Historical data shows hot-beverage conversions rise 38% during rainy evenings. 18 members lapsed 21–35 days ago and responded to weather-triggered offers previously. Predicted incremental revenue: ₹1,200–₹1,900.',
    },
    history: 'Created by AI Agent · Awaiting your approval · No prior history',
    preview: {
      brand: 'BREW & CO.',
      body: 'Rainy evening? Come in for a warm hug.\nShow this to claim your hot beverage reward — today only!',
      cta: 'Claim Reward',
    },
    timeline: [
      { title: 'Campaign created by AI Agent', time: 'Today 9:00 AM' },
      { title: 'Submitted for approval', time: 'Today 9:01 AM' },
      { title: 'Awaiting manager review', time: 'Now' },
    ],
  },
  {
    id: 'legend-tier',
    name: 'Legend Tier Surprise',
    status: 'Active',
    members: '3 Legend members',
    channel: 'Automated',
    when: 'Ongoing',
    ai: false,
    initial: 'L',
    tone: 'gold',
    sent: '3',
    opened: '2',
    redeemed: '1',
    conversion: '33%',
    message: "Surprise! As a Legend member you've unlocked a secret menu item. Visit us to claim it.",
    reach: '3 members',
    impact: '42% redemption',
    agentRec: 'Manual',
    history: 'Live · Sent to Legend members',
    preview: {
      brand: 'BREW & CO.',
      body: "Surprise! As a Legend member you've unlocked a secret menu item. Visit us to claim it.",
      cta: 'Claim Reward',
    },
    timeline: [
      { title: 'Campaign created', time: 'Yesterday' },
      { title: 'Approved and sent', time: 'Yesterday' },
    ],
  },
  {
    id: 'sunday-slow',
    name: 'Sunday Slow Hours',
    status: 'Scheduled',
    members: '42 regular members',
    channel: 'SMS',
    when: 'Sun 11 AM',
    ai: false,
    initial: 'S',
    tone: 'green',
    sent: '—',
    opened: '—',
    redeemed: '—',
    conversion: '—',
    message: 'Slow Sunday pour. Double Beans on any brew before noon.',
    reach: '42 members',
    impact: '—',
    agentRec: 'No',
    history: 'Scheduled by you · Sun 11 AM',
    preview: {
      brand: 'BREW & CO.',
      body: 'Slow Sunday pour. Double Beans on any brew before noon.',
      cta: 'View offer',
    },
    timeline: [
      { title: 'Campaign created', time: 'Yesterday' },
      { title: 'Scheduled', time: 'Sun 11 AM' },
    ],
  },
  {
    id: 'first-visit',
    name: 'First Visit Hello',
    status: 'Draft',
    members: 'New members',
    channel: 'Push',
    when: 'Not scheduled',
    ai: true,
    initial: 'F',
    tone: 'wine',
    sent: '—',
    opened: '—',
    redeemed: '—',
    conversion: '—',
    message: 'Welcome in. Your first visit earns a starter Bean bonus.',
    reach: 'New members',
    impact: '—',
    agentRec: 'Yes — AI triggered',
    recommendation: {
      title: 'Why PARK[N]PERKS AI recommended this',
      body: 'New members have not received a welcome yet. A first-visit Bean bonus is the usual starter for this cohort.',
    },
    history: 'Draft · Not yet submitted',
    preview: {
      brand: 'BREW & CO.',
      body: 'Welcome in. Your first visit earns a starter Bean bonus.',
      cta: 'View offer',
    },
    timeline: [
      { title: 'Campaign created by AI Agent', time: 'Today 8:40 AM' },
      { title: 'Saved as draft', time: 'Today 8:41 AM' },
    ],
  },
]

export function campaignMatches(campaign: Campaign, filter: CampaignFilter, query: string) {
  const needle = query.trim().toLowerCase()
  const inQuery =
    needle.length === 0 ||
    campaign.name.toLowerCase().includes(needle) ||
    campaign.members.toLowerCase().includes(needle) ||
    campaign.channel.toLowerCase().includes(needle) ||
    campaign.status.toLowerCase().includes(needle)
  const inFilter =
    filter === 'All' ||
    (filter === 'AI Rec' && campaign.ai) ||
    (filter === 'Approval' && campaign.status === 'Needs Approval') ||
    campaign.status === filter
  return inQuery && inFilter
}
