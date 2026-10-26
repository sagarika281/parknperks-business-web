import type { StatusCardData } from '../types/welcome'

type WelcomeStatusCardProps = {
  card: StatusCardData
}

export function WelcomeStatusCard({ card }: WelcomeStatusCardProps) {
  return (
    <article className={`welcome-status-card is-${card.tone}`}>
      <span className="welcome-status-icon" aria-hidden="true">
        {card.icon}
      </span>
      <p className="welcome-status-label">{card.label}</p>
      <p className="welcome-status-value">{card.value}</p>
    </article>
  )
}
