import { WelcomeHeader } from './components/WelcomeHeader'
import { WelcomeStatusCard } from './components/WelcomeStatusCard'
import { WelcomeActions } from './components/WelcomeActions'
import { WELCOME_STATUS_CARDS } from './constants/statusCards'
import type { WelcomeEmployee } from './types/welcome'

type WelcomePageProps = {
  employee: WelcomeEmployee
  onStartShift?: () => void
  onSignInAsSomeoneElse: () => void
}

/**
 * Full-screen welcome after PIN — not nested under Home.
 */
export function WelcomePage({
  employee,
  onStartShift,
  onSignInAsSomeoneElse,
}: WelcomePageProps) {
  return (
    <div className="welcome-page">
      <main className="welcome-shell" aria-label="Welcome back">
        <div className="welcome-content">
          <WelcomeHeader employee={employee} />

          <section className="welcome-status-grid" aria-label="Shift overview">
            {WELCOME_STATUS_CARDS.map((card) => (
              <WelcomeStatusCard key={card.id} card={card} />
            ))}
          </section>

          <WelcomeActions
            onStartShift={onStartShift}
            onSignInAsSomeoneElse={onSignInAsSomeoneElse}
          />
        </div>
      </main>
    </div>
  )
}
