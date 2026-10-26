export type Outlet = {
  id: string
  name: string
  address: string
  gstin: string
  manager: string
  deviceOnline: boolean
}

export const OUTLETS: Outlet[] = [
  {
    id: 'indiranagar',
    name: 'Indiranagar',
    address: '12th Main, HAL 2nd Stage, Indiranagar, Bengaluru 560008',
    gstin: '29AABCU9603R1ZM',
    manager: 'Priya Nair',
    deviceOnline: true,
  },
  {
    id: 'koramangala',
    name: 'Koramangala',
    address: '80 Feet Road, 4th Block, Koramangala, Bengaluru 560034',
    gstin: '29AABCU9603R2ZM',
    manager: 'Arjun Sharma',
    deviceOnline: true,
  },
]
