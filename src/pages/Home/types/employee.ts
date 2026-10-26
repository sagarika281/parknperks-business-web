export type Employee = {
  id: string
  name: string
  role: string
  status: string
  statusTone: 'active' | 'upcoming' | 'muted' | 'finished'
  /** CSS linear-gradient used for the profile circle */
  avatarGradient: string
}
