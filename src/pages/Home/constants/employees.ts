import { AVATAR_GRADIENTS } from '@/shared/constants/avatarGradients'
import type { Employee } from '../types/employee'

export const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Arjun Khanna',
    role: 'Staff',
    status: 'On shift',
    statusTone: 'active',
    avatarGradient: AVATAR_GRADIENTS[0],
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Manager',
    status: 'Shift starts 8:00 AM',
    statusTone: 'upcoming',
    avatarGradient: AVATAR_GRADIENTS[1],
  },
  {
    id: '3',
    name: 'Sagar Malhotra',
    role: 'Owner',
    status: 'Not scheduled today',
    statusTone: 'muted',
    avatarGradient: AVATAR_GRADIENTS[2],
  },
  {
    id: '4',
    name: 'Neha Reddy',
    role: 'Staff',
    status: 'Shift starts 2:00 PM',
    statusTone: 'upcoming',
    avatarGradient: AVATAR_GRADIENTS[3],
  },
]

/** Employee used when an alert opens the PIN, or Skip (Demo) jumps ahead. */
export const DEMO_EMPLOYEE: Employee =
  EMPLOYEES.find((employee) => employee.statusTone === 'active') ?? EMPLOYEES[0]
