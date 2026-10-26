export type SidebarNavItem = {
  id: string
  label: string
  icon: 'counter' | 'dashboard' | 'commerce' | 'loyalty' | 'inventory' | 'customers'
  active?: boolean
  live?: boolean
  badge?: number
}

export const SIDEBAR_NAV: SidebarNavItem[] = [
  { id: 'counter', label: 'Counter', icon: 'counter', live: true },
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'commerce', label: 'Agentic Commerce', icon: 'commerce', badge: 2 },
  { id: 'loyalty', label: 'Loyalty & Lifestyle', icon: 'loyalty' },
  { id: 'inventory', label: 'Inventory & Menu', icon: 'inventory' },
  { id: 'customers', label: 'Customers & Campaigns', icon: 'customers' },
]
