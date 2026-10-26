export type PlanId = 'starter' | 'growth' | 'enterprise'

export type Plan = {
  id: PlanId
  name: string
  price: string
  unit: string
  tone: 'starter' | 'growth' | 'enterprise'
  features: string[]
  cta: string
}

export const CURRENT_SUBSCRIPTION = {
  badge: 'Founding Partner · Edition One',
  setupFee: 'Setup fee: ₹999 × 2 outlets = ₹1,998',
  paid: true,
  note: 'Subscription starts January 2027 · Plan confirmed after 90-day review',
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹1,499',
    unit: '/outlet/mo',
    tone: 'starter',
    features: [
      'Up to 500 members',
      'Value-back programme',
      'WhatsApp campaigns (500/mo)',
      'Basic analytics',
    ],
    cta: 'Upgrade to Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹3,999',
    unit: '/outlet/mo',
    tone: 'growth',
    features: [
      'Unlimited members',
      'All programme types',
      'WhatsApp + SMS campaigns',
      'PERKS Insight full access',
      'Public API access',
      'Priority support',
    ],
    cta: 'Upgrade to Growth',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    tone: 'enterprise',
    features: [
      'Multi-brand',
      'Dedicated success manager',
      'SLA guarantee',
      'Custom integrations',
      'White-label options',
    ],
    cta: 'Upgrade to Enterprise',
  },
]
