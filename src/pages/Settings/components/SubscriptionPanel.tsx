import { CURRENT_SUBSCRIPTION, PLANS } from '../constants/subscription'

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M3.2 8.2l3 3 6.4-6.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SubscriptionPanel() {
  return (
    <div className="set-form">
      <header className="set-head">
        <h1>Subscription</h1>
        <p>Your current plan, billing, and plan options.</p>
      </header>

      <section className="set-card set-current-plan" aria-label="Current plan">
        <span className="set-plan-badge">{CURRENT_SUBSCRIPTION.badge}</span>
        <p className="set-plan-fee">
          {CURRENT_SUBSCRIPTION.setupFee}
          {CURRENT_SUBSCRIPTION.paid ? (
            <>
              {' · '}
              <span className="set-paid">
                Paid <span aria-hidden="true">✓</span>
              </span>
            </>
          ) : null}
        </p>
        <p className="set-plan-note">{CURRENT_SUBSCRIPTION.note}</p>
      </section>

      <div className="set-plan-grid">
        {PLANS.map((plan) => (
          <article key={plan.id} className={`set-plan-card is-${plan.tone}`}>
            <h2>{plan.name}</h2>
            <p className="set-plan-price">
              <strong>{plan.price}</strong>
              {plan.unit ? <span>{plan.unit}</span> : null}
            </p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <button type="button" className="set-btn set-btn-primary">
              {plan.cta}
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
