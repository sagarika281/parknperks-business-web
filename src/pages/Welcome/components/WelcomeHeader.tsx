import { ProfileAvatar } from '@/shared/components'
import type { WelcomeEmployee } from '../types/welcome'

type WelcomeHeaderProps = {
  employee: WelcomeEmployee
  location?: string
  lastSignIn?: string
}

export function WelcomeHeader({
  employee,
  location = 'Indiranagar',
  lastSignIn = 'Today 7:42 AM',
}: WelcomeHeaderProps) {
  const firstName = employee.name.split(' ')[0]

  return (
    <header className="welcome-header">
      <ProfileAvatar
        name={employee.name}
        gradient={employee.avatarGradient}
        size="lg"
        className="welcome-avatar"
      />
      <h1 className="welcome-greeting">Welcome back, {firstName}.</h1>
      <p className="welcome-meta">
        {employee.role} · {location} · Last sign-in: {lastSignIn}
      </p>
    </header>
  )
}
