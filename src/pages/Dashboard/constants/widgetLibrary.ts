export type WidgetCategoryId =
  | 'ai'
  | 'performance'
  | 'loyalty'
  | 'operations'
  | 'customers'
  | 'inventory'
  | 'campaigns'
  | 'staff'

export type WidgetLibraryItem = {
  id: string
  category: WidgetCategoryId
  title: string
  description: string
  sizes: string[]
  preview:
    | 'matrix'
    | 'brief'
    | 'queue'
    | 'revenue'
    | 'margin'
    | 'product'
    | 'footfall'
    | 'health'
    | 'risk'
    | 'liability'
    | 'preparedness'
    | 'staffing'
    | 'churn'
    | 'nps'
    | 'alerts'
    | 'commodity'
    | 'campaigns'
    | 'tasks'
}

export const WIDGET_CATEGORIES: { id: WidgetCategoryId; label: string }[] = [
  { id: 'ai', label: 'AI & Agentic Commerce' },
  { id: 'performance', label: 'Business Performance' },
  { id: 'loyalty', label: 'Loyalty' },
  { id: 'operations', label: 'Operations & Preparedness' },
  { id: 'customers', label: 'Customers' },
  { id: 'inventory', label: 'Inventory & Margin' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'staff', label: 'Staff & Tasks' },
]

export const WIDGET_LIBRARY: WidgetLibraryItem[] = [
  {
    id: 'action-matrix',
    category: 'ai',
    title: 'AI Action Matrix',
    description: 'Urgency × Impact quadrant of AI recommendations',
    sizes: ['Large', 'Wide'],
    preview: 'matrix',
  },
  {
    id: 'daily-brief',
    category: 'ai',
    title: 'AI Daily Brief',
    description: 'What changed, why it matters, what needs your attention',
    sizes: ['Medium', 'Large'],
    preview: 'brief',
  },
  {
    id: 'approval-queue',
    category: 'ai',
    title: 'Approval Queue',
    description: 'Pending approvals with deadline, risk and expected impact',
    sizes: [],
    preview: 'queue',
  },
  {
    id: 'revenue-trend',
    category: 'performance',
    title: 'Revenue Trend',
    description: 'Daily revenue with comparison to prior period',
    sizes: ['Medium', 'Large', 'Wide'],
    preview: 'revenue',
  },
  {
    id: 'gross-margin',
    category: 'performance',
    title: 'Gross Margin',
    description: 'Margin % and rupee value with cost breakdown',
    sizes: ['Small', 'Medium'],
    preview: 'margin',
  },
  {
    id: 'product-performance',
    category: 'performance',
    title: 'Product Performance',
    description: 'Top and bottom items by revenue and margin',
    sizes: ['Medium', 'Large'],
    preview: 'product',
  },
  {
    id: 'footfall',
    category: 'performance',
    title: 'Footfall',
    description: 'Customer visits with time-of-day distribution',
    sizes: ['Small', 'Medium'],
    preview: 'footfall',
  },
  {
    id: 'loyalty-health',
    category: 'loyalty',
    title: 'Loyalty Health Score',
    description: 'Composite programme health metric',
    sizes: ['Small', 'Medium'],
    preview: 'health',
  },
  {
    id: 'members-at-risk',
    category: 'loyalty',
    title: 'Members at Risk',
    description: 'At-risk members filterable by tier',
    sizes: ['Medium', 'Large'],
    preview: 'risk',
  },
  {
    id: 'currency-liability',
    category: 'loyalty',
    title: 'Currency Liability',
    description: 'Outstanding beans and rupee exposure',
    sizes: ['Small', 'Medium'],
    preview: 'liability',
  },
  {
    id: 'preparedness-score',
    category: 'operations',
    title: 'Preparedness Score',
    description: 'Composite readiness score for today',
    sizes: ['Small', 'Medium'],
    preview: 'preparedness',
  },
  {
    id: 'staffing-readiness',
    category: 'operations',
    title: 'Staffing Readiness',
    description: 'Shift coverage and gap alerts',
    sizes: ['Small', 'Medium'],
    preview: 'staffing',
  },
  {
    id: 'churn-risk',
    category: 'customers',
    title: 'Churn Risk',
    description: 'Members at risk by tier and LTV',
    sizes: ['Medium', 'Large'],
    preview: 'churn',
  },
  {
    id: 'nps',
    category: 'customers',
    title: 'NPS',
    description: 'Net Promoter Score and feedback topics',
    sizes: ['Small', 'Medium'],
    preview: 'nps',
  },
  {
    id: 'inventory-alerts',
    category: 'inventory',
    title: 'Inventory Alerts',
    description: 'Out-of-stock and low-stock items requiring attention',
    sizes: ['Small', 'Medium'],
    preview: 'alerts',
  },
  {
    id: 'commodity-radar',
    category: 'inventory',
    title: 'Commodity Radar',
    description: 'Price trend alerts for key ingredients',
    sizes: ['Medium', 'Large'],
    preview: 'commodity',
  },
  {
    id: 'active-campaigns',
    category: 'campaigns',
    title: 'Active Campaigns',
    description: 'Live campaigns with reach and conversion',
    sizes: ['Medium', 'Large'],
    preview: 'campaigns',
  },
  {
    id: 'my-tasks',
    category: 'staff',
    title: 'My Tasks',
    description: 'Personal task list for the current shift',
    sizes: ['Small', 'Medium'],
    preview: 'tasks',
  },
]
