export type InventoryStatus = 'low' | 'critical' | 'out'

export type InventoryItem = {
  id: string
  name: string
  fill: number
  bar: 'gold' | 'red' | 'empty' | 'muted'
  amount: string
  status: string
  statusTone: InventoryStatus
}

export const INVENTORY_STATS = [
  { id: 'on', value: '16', label: 'Menu items on', tone: 'sage' },
  { id: 'off', value: '2', label: 'Items off / 86d', tone: 'muted' },
  { id: 'alerts', value: '5', label: 'stock alerts', tone: 'alert' },
] as const

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'beans',
    name: 'Arabica Coffee Beans',
    fill: 85,
    bar: 'gold',
    amount: '8.5 / 10 kg',
    status: 'Low',
    statusTone: 'low',
  },
  {
    id: 'lids',
    name: 'Takeaway Lids',
    fill: 42,
    bar: 'red',
    amount: '85 / 200 pcs',
    status: 'Critical',
    statusTone: 'critical',
  },
  {
    id: 'syrup',
    name: 'Vanilla Syrup',
    fill: 0,
    bar: 'empty',
    amount: '0 / 5 L',
    status: 'Out',
    statusTone: 'out',
  },
  {
    id: 'filter',
    name: 'Espresso Machine Filter',
    fill: 50,
    bar: 'muted',
    amount: '2 / 4 pcs',
    status: 'Critical',
    statusTone: 'critical',
  },
]
