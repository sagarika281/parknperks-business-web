export type WelcomeEmployee = {
  id: string
  name: string
  role: string
  avatarGradient: string
}

export type StatusCardTone = 'teal' | 'green' | 'maroon' | 'gold'

export type StatusCardData = {
  id: string
  label: string
  value: string
  tone: StatusCardTone
  icon: string
}
