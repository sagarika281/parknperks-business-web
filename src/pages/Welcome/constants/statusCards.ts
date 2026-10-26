import type { StatusCardData } from '../types/welcome'

export const WELCOME_STATUS_CARDS: StatusCardData[] = [
  {
    id: 'tasks',
    label: 'Your Tasks',
    value: '3 tasks for your shift',
    tone: 'teal',
    icon: '📋',
  },
  {
    id: 'station',
    label: 'Station',
    value: 'Hot-beverage station setup',
    tone: 'green',
    icon: '☕',
  },
  {
    id: 'menu',
    label: 'Menu',
    value: '3 items unavailable',
    tone: 'maroon',
    icon: '🚫',
  },
  {
    id: 'checklist',
    label: 'Checklist',
    value: '2 items pending',
    tone: 'gold',
    icon: '✅',
  },
]
