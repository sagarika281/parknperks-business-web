export type StaffRole = 'owner' | 'manager' | 'staff'

export type StaffMember = {
  id: string
  name: string
  role: StaffRole
  roleLabel: string
  outlet: string
  phone: string
  initial: string
  tone: string
  canRemove: boolean
}

export const STAFF: StaffMember[] = [
  {
    id: 'sagar',
    name: 'Sagar Malhotra',
    role: 'owner',
    roleLabel: 'Owner/Signatory',
    outlet: 'All outlets',
    phone: '+91 98765 00001',
    initial: 'S',
    tone: 'linear-gradient(145deg, #9a2740, #c44a56)',
    canRemove: false,
  },
  {
    id: 'priya',
    name: 'Priya Nair',
    role: 'manager',
    roleLabel: 'Outlet Manager',
    outlet: 'Indiranagar',
    phone: '+91 98765 00002',
    initial: 'P',
    tone: 'linear-gradient(145deg, #1a6e64, #3b9770)',
    canRemove: true,
  },
  {
    id: 'arjun',
    name: 'Arjun Sharma',
    role: 'manager',
    roleLabel: 'Outlet Manager',
    outlet: 'Koramangala',
    phone: '+91 98765 00003',
    initial: 'A',
    tone: 'linear-gradient(145deg, #1a6e64, #3b9770)',
    canRemove: true,
  },
  {
    id: 'ritu',
    name: 'Ritu Kapoor',
    role: 'staff',
    roleLabel: 'Counter Staff',
    outlet: 'Indiranagar',
    phone: '+91 98765 00004',
    initial: 'R',
    tone: 'linear-gradient(145deg, #6d645e, #9a8f84)',
    canRemove: true,
  },
]
