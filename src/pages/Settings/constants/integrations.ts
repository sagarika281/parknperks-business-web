export type BillingTool = {
  id: string
  label: string
  available: boolean
}

export const BILLING_TOOLS: BillingTool[] = [
  { id: 'petpooja', label: 'Petpooja', available: true },
  { id: 'posist', label: 'Posist', available: true },
  { id: 'zoho', label: 'Zoho', available: false },
  { id: 'shopify', label: 'Shopify', available: false },
]
