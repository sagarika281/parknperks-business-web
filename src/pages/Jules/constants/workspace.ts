export const PIPELINE_STEPS = [
  'Understand',
  'Investigate',
  'Plan',
  'Prepare',
  'Simulate',
  'Policy Check',
  'Execute',
  'Verify',
  'Monitor',
] as const

export type PipelineStepStatus = 'pending' | 'done' | 'active'

export type EvidenceStatus = 'Confirmed' | 'Forecast'

export type EvidenceItem = {
  id: string
  title: string
  detail: string
  status: EvidenceStatus
  icon: 'weather' | 'stock' | 'staff' | 'members' | 'sales' | 'shipment' | 'campaigns' | 'calendar'
}

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'weather',
    title: 'IMD Weather Forecast',
    detail: '',
    status: 'Confirmed',
    icon: 'weather',
  },
  {
    id: 'inventory',
    title: 'Inventory & Stock',
    detail: '0L vanilla syrup · Arabica 4.2kg low',
    status: 'Confirmed',
    icon: 'stock',
  },
  {
    id: 'staffing',
    title: 'Staffing & Shifts',
    detail: 'Evening shift 1 person short',
    status: 'Confirmed',
    icon: 'staff',
  },
  {
    id: 'loyalty',
    title: 'Loyalty Members',
    detail: '18 lapsed members match hot-beverage',
    status: 'Confirmed',
    icon: 'members',
  },
  {
    id: 'sales',
    title: 'Sales & Counter',
    detail: 'Wed avg 54 covers · 5–7 PM',
    status: 'Confirmed',
    icon: 'sales',
  },
  {
    id: 'shipment',
    title: 'Shipment PNP-2048',
    detail: 'Blue Tokai delayed',
    status: 'Forecast',
    icon: 'shipment',
  },
  {
    id: 'campaigns',
    title: 'Campaigns',
    detail: 'No conflicting active campaigns',
    status: 'Confirmed',
    icon: 'campaigns',
  },
  {
    id: 'calendar',
    title: 'Calendar',
    detail: '4 related events found',
    status: 'Confirmed',
    icon: 'calendar',
  },
]

export type JulesChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
}

export const PLAN_ITEMS = [
  'Alert staff: evening prep checklist for rain surge',
  'Verify stock: flag vanilla syrup, check alternatives',
  'Contact Blue Tokai: expedite Arabica shipment',
  'Build loyalty campaign: 18 hot-beverage lapsed members',
  'Offer 10-Bean promotion: offset vanilla unavailability',
  'Update calendar: weather recheck at 3:30 PM',
] as const

export const COMPLETED_ACTIONS = [
  'Staff preparation checklist created (3 tasks assigned)',
  'Stock verification assigned to Priya Sharma',
  'Weather recheck scheduled 3:30 PM on Calendar',
  'Campaign audience built — 18 lapsed members identified',
  'WhatsApp message drafted — vanilla items excluded',
  'Internal shipment follow-up created for PNP-2048',
] as const
