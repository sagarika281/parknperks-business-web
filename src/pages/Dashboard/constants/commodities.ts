export type CommodityTone = 'risk' | 'stable' | 'wait'

export type CommodityItem = {
  id: string
  name: string
  hint: string
  price: string
  unit: string
  change: string
  tone: CommodityTone
  changeTone: 'up' | 'down'
}

export const COMMODITY_ITEMS: CommodityItem[] = [
  {
    id: 'arabica',
    name: 'Arabica Coffee',
    hint: 'Lock in 5kg this week',
    price: '₹820',
    unit: '/kg',
    change: '↑ 4.2%',
    tone: 'risk',
    changeTone: 'up',
  },
  {
    id: 'milk',
    name: 'Whole Milk',
    hint: 'Stable — no action',
    price: '₹68',
    unit: '/L',
    change: '↑ 0.3%',
    tone: 'stable',
    changeTone: 'down',
  },
  {
    id: 'sugar',
    name: 'Refined Sugar',
    hint: 'Slight dip — wait',
    price: '₹45',
    unit: '/kg',
    change: '↓ 1.1%',
    tone: 'wait',
    changeTone: 'down',
  },
  {
    id: 'cardamom',
    name: 'Cardamom',
    hint: 'Source alternate now',
    price: '₹1840',
    unit: '/kg',
    change: '↑ 8.7%',
    tone: 'risk',
    changeTone: 'up',
  },
]
