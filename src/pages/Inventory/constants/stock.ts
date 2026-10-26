export type StockCategory = 'Beverages' | 'Dairy' | 'Dry Goods' | 'Packaging' | 'Equipment'

export type StockStatus = 'Low' | 'In Stock' | 'Critical' | 'Out of Stock'

export type RestockEntry = {
  date: string
  by: string
  qty: string
  cost: string
}

export type StockItem = {
  id: string
  name: string
  supplier: string
  category: StockCategory
  status: StockStatus
  quantity: number
  unit: string
  minimum?: number
  unitCost?: number
  lastRestocked?: string
  leadTime?: string
  history: RestockEntry[]
}

export const STOCK_CATEGORIES: Array<'All Items' | StockCategory> = [
  'All Items',
  'Beverages',
  'Dairy',
  'Dry Goods',
  'Packaging',
  'Equipment',
]

export const STOCK_ITEMS: StockItem[] = [
  {
    id: 'arabica',
    name: 'Arabica Coffee Beans',
    supplier: 'Blue Tokai',
    category: 'Beverages',
    status: 'Low',
    quantity: 8.5,
    unit: 'kg',
    minimum: 10,
    unitCost: 820,
    lastRestocked: '2026-09-10',
    leadTime: '2–3 business days',
    history: [
      { date: '2026-09-10', by: 'Sagar M.', qty: '+12 kg', cost: '₹9,840' },
      { date: '2026-08-28', by: 'Priya S.', qty: '+10 kg', cost: '₹8,200' },
      { date: '2026-08-10', by: 'Sagar M.', qty: '+8 kg', cost: '₹6,560' },
    ],
  },
  {
    id: 'oat-milk',
    name: 'Oat Milk',
    supplier: 'Epigamia',
    category: 'Dairy',
    status: 'In Stock',
    quantity: 24,
    unit: 'L',
    minimum: 16,
    unitCost: 120,
    lastRestocked: '2026-09-12',
    leadTime: '1–2 business days',
    history: [
      { date: '2026-09-12', by: 'Sagar M.', qty: '+16 L', cost: '₹1,920' },
      { date: '2026-08-28', by: 'Priya S.', qty: '+12 L', cost: '₹1,440' },
      { date: '2026-08-10', by: 'Sagar M.', qty: '+10 L', cost: '₹1,200' },
    ],
  },
  {
    id: 'whole-milk',
    name: 'Whole Milk',
    supplier: 'Nandini',
    category: 'Dairy',
    status: 'Low',
    quantity: 18,
    unit: 'L',
    minimum: 24,
    unitCost: 68,
    lastRestocked: '2026-09-08',
    leadTime: '1 business day',
    history: [
      { date: '2026-09-08', by: 'Priya S.', qty: '+20 L', cost: '₹1,360' },
      { date: '2026-08-26', by: 'Sagar M.', qty: '+15 L', cost: '₹1,020' },
      { date: '2026-08-11', by: 'Sagar M.', qty: '+12 L', cost: '₹816' },
    ],
  },
  {
    id: 'sugar',
    name: 'Refined Sugar',
    supplier: 'Local Wholesale',
    category: 'Dry Goods',
    status: 'In Stock',
    quantity: 22,
    unit: 'kg',
    minimum: 15,
    unitCost: 52,
    lastRestocked: '2026-09-09',
    leadTime: '2–3 business days',
    history: [
      { date: '2026-09-09', by: 'Sagar M.', qty: '+10 kg', cost: '₹520' },
      { date: '2026-08-25', by: 'Priya S.', qty: '+8 kg', cost: '₹416' },
      { date: '2026-08-08', by: 'Sagar M.', qty: '+6 kg', cost: '₹312' },
    ],
  },
  {
    id: 'cardamom',
    name: 'Cardamom Pods',
    supplier: 'Kochi Spices',
    category: 'Dry Goods',
    status: 'Low',
    quantity: 180,
    unit: 'g',
    minimum: 250,
    unitCost: 3,
    lastRestocked: '2026-09-06',
    leadTime: '4–5 business days',
    history: [
      { date: '2026-09-06', by: 'Priya S.', qty: '+200 g', cost: '₹600' },
      { date: '2026-08-22', by: 'Sagar M.', qty: '+150 g', cost: '₹450' },
      { date: '2026-08-05', by: 'Sagar M.', qty: '+100 g', cost: '₹300' },
    ],
  },
  {
    id: 'espresso-cups',
    name: 'Espresso Cups (8oz)',
    supplier: 'PackRight',
    category: 'Packaging',
    status: 'In Stock',
    quantity: 420,
    unit: 'pcs',
    minimum: 200,
    unitCost: 4,
    lastRestocked: '2026-09-11',
    leadTime: '3–4 business days',
    history: [
      { date: '2026-09-11', by: 'Sagar M.', qty: '+200 pcs', cost: '₹800' },
      { date: '2026-08-27', by: 'Priya S.', qty: '+150 pcs', cost: '₹600' },
      { date: '2026-08-12', by: 'Sagar M.', qty: '+100 pcs', cost: '₹400' },
    ],
  },
  {
    id: 'takeaway-lids',
    name: 'Takeaway Lids',
    supplier: 'PackRight',
    category: 'Packaging',
    status: 'Critical',
    quantity: 85,
    unit: 'pcs',
    minimum: 200,
    unitCost: 3,
    lastRestocked: '2026-09-04',
    leadTime: '3–4 business days',
    history: [
      { date: '2026-09-04', by: 'Sagar M.', qty: '+200 pcs', cost: '₹600' },
      { date: '2026-08-20', by: 'Priya S.', qty: '+150 pcs', cost: '₹450' },
      { date: '2026-08-06', by: 'Sagar M.', qty: '+100 pcs', cost: '₹300' },
    ],
  },
  {
    id: 'vanilla-syrup',
    name: 'Vanilla Syrup',
    supplier: 'Monin India',
    category: 'Beverages',
    status: 'Out of Stock',
    quantity: 0,
    unit: 'L',
    minimum: 5,
    unitCost: 850,
    lastRestocked: '2026-08-18',
    leadTime: '5–7 business days',
    history: [
      { date: '2026-08-18', by: 'Priya S.', qty: '+5 L', cost: '₹4,250' },
      { date: '2026-07-30', by: 'Sagar M.', qty: '+4 L', cost: '₹3,400' },
      { date: '2026-07-12', by: 'Sagar M.', qty: '+3 L', cost: '₹2,550' },
    ],
  },
  {
    id: 'hazelnut-syrup',
    name: 'Hazelnut Syrup',
    supplier: 'Monin India',
    category: 'Beverages',
    status: 'Low',
    quantity: 3.2,
    unit: 'L',
    minimum: 5,
    unitCost: 920,
    lastRestocked: '2026-09-07',
    leadTime: '5–7 business days',
    history: [
      { date: '2026-09-07', by: 'Sagar M.', qty: '+4 L', cost: '₹3,680' },
      { date: '2026-08-21', by: 'Priya S.', qty: '+3 L', cost: '₹2,760' },
      { date: '2026-08-04', by: 'Sagar M.', qty: '+2 L', cost: '₹1,840' },
    ],
  },
  {
    id: 'paper-straws',
    name: 'Paper Straws',
    supplier: 'GreenPack',
    category: 'Packaging',
    status: 'In Stock',
    quantity: 600,
    unit: 'pcs',
    minimum: 300,
    unitCost: 2,
    lastRestocked: '2026-09-13',
    leadTime: '2–3 business days',
    history: [
      { date: '2026-09-13', by: 'Priya S.', qty: '+400 pcs', cost: '₹800' },
      { date: '2026-08-29', by: 'Sagar M.', qty: '+300 pcs', cost: '₹600' },
      { date: '2026-08-14', by: 'Sagar M.', qty: '+200 pcs', cost: '₹400' },
    ],
  },
  {
    id: 'chocolate-powder',
    name: 'Chocolate Powder',
    supplier: 'Barry Callebaut',
    category: 'Dry Goods',
    status: 'In Stock',
    quantity: 4.5,
    unit: 'kg',
    minimum: 3,
    unitCost: 640,
    lastRestocked: '2026-09-05',
    leadTime: '7–10 business days',
    history: [
      { date: '2026-09-05', by: 'Sagar M.', qty: '+5 kg', cost: '₹3,200' },
      { date: '2026-08-19', by: 'Priya S.', qty: '+4 kg', cost: '₹2,560' },
      { date: '2026-08-02', by: 'Sagar M.', qty: '+3 kg', cost: '₹1,920' },
    ],
  },
  {
    id: 'espresso-filter',
    name: 'Espresso Machine Filter',
    supplier: 'La Marzocco',
    category: 'Equipment',
    status: 'Critical',
    quantity: 2,
    unit: 'pcs',
    minimum: 4,
    unitCost: 1450,
    lastRestocked: '2026-09-01',
    leadTime: '5–7 business days',
    history: [
      { date: '2026-09-01', by: 'Sagar M.', qty: '+4 pcs', cost: '₹5,800' },
      { date: '2026-08-15', by: 'Priya S.', qty: '+2 pcs', cost: '₹2,900' },
      { date: '2026-07-28', by: 'Sagar M.', qty: '+2 pcs', cost: '₹2,900' },
    ],
  },
]

export function statusClass(status: StockStatus) {
  if (status === 'Low') return 'is-low'
  if (status === 'Critical') return 'is-critical'
  if (status === 'Out of Stock') return 'is-out'
  return 'is-ok'
}

export function formatQty(quantity: number, unit: string) {
  const value = Number.isInteger(quantity) ? String(quantity) : String(quantity)
  return `${value} ${unit}`
}
