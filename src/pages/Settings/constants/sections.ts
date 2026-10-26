export type SettingsSectionId =
  | 'brand'
  | 'outlets'
  | 'staff'
  | 'jules'
  | 'subscription'
  | 'integrations'
  | 'legal'

export const SETTINGS_NAV: { id: SettingsSectionId; label: string }[] = [
  { id: 'brand', label: 'Brand Profile' },
  { id: 'outlets', label: 'Outlets' },
  { id: 'staff', label: 'Staff & Roles' },
  { id: 'jules', label: 'Jules AI' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'legal', label: 'Data & Legal' },
]
