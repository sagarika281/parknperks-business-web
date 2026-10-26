export type DayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type DayHours = {
  id: DayId
  label: string
  open: boolean
  start: string
  end: string
}

export type BrandProfile = {
  coverUrl: string
  logoUrl: string
  businessName: string
  tagline: string
  category: string
  gstin: string
  email: string
  phone: string
  whatsapp: string
  website: string
  instagram: string
  googleBusiness: string
  address1: string
  address2: string
  city: string
  state: string
  pincode: string
  hours: DayHours[]
}

export const PROFILE_STORAGE_KEY = 'parknperks-brand-profile'

export const CATEGORIES = ['Café', 'Restaurant', 'Bakery', 'Bar', 'Retail'] as const

const HOURS: DayHours[] = [
  { id: 'mon', label: 'Mon', open: true, start: '08:00', end: '22:00' },
  { id: 'tue', label: 'Tue', open: true, start: '08:00', end: '22:00' },
  { id: 'wed', label: 'Wed', open: true, start: '08:00', end: '22:00' },
  { id: 'thu', label: 'Thu', open: true, start: '08:00', end: '22:00' },
  { id: 'fri', label: 'Fri', open: true, start: '08:00', end: '23:00' },
  { id: 'sat', label: 'Sat', open: true, start: '09:00', end: '23:00' },
  { id: 'sun', label: 'Sun', open: false, start: '08:00', end: '22:00' },
]

export const DEFAULT_PROFILE: BrandProfile = {
  coverUrl: '',
  logoUrl: '',
  businessName: 'Brew & Co.',
  tagline: 'Your daily ritual, rewarded.',
  category: 'Café',
  gstin: '29AABCU9603R1ZM',
  email: 'hello@brewandco.in',
  phone: '+91 98765 00001',
  whatsapp: '+91 98765 00001',
  website: 'brewandco.in',
  instagram: '@brewandco_blr',
  googleBusiness: 'Brew & Co. Indiranagar',
  address1: '12th Main, HAL 2nd Stage',
  address2: 'Indiranagar',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '560008',
  hours: HOURS,
}

export function cloneProfile(profile: BrandProfile): BrandProfile {
  return {
    ...profile,
    hours: profile.hours.map((day) => ({ ...day })),
  }
}

export function loadProfile(): BrandProfile {
  try {
    const raw = sessionStorage.getItem(PROFILE_STORAGE_KEY)
    if (!raw) return cloneProfile(DEFAULT_PROFILE)
    const parsed = JSON.parse(raw) as Partial<BrandProfile>
    const hours = Array.isArray(parsed.hours)
      ? DEFAULT_PROFILE.hours.map((day) => {
          const saved = parsed.hours?.find((item) => item.id === day.id)
          return saved ? { ...day, ...saved, id: day.id, label: day.label } : { ...day }
        })
      : DEFAULT_PROFILE.hours.map((day) => ({ ...day }))
    return {
      ...cloneProfile(DEFAULT_PROFILE),
      ...parsed,
      hours,
    }
  } catch {
    return cloneProfile(DEFAULT_PROFILE)
  }
}

export function formatTimeLabel(value: string) {
  const [hourText, minute = '00'] = value.split(':')
  const hour = Number(hourText)
  if (Number.isNaN(hour)) return value
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const twelve = hour % 12 || 12
  return `${String(twelve).padStart(2, '0')}:${minute} ${suffix}`
}
