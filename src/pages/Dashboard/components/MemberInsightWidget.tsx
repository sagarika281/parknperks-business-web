import {
  MEMBER_FEEDBACK,
  MEMBER_NPS,
  MEMBER_REQUESTS,
} from '../constants/memberInsight'
import { CornerGrip } from './CornerGrip'

function Stars() {
  return (
    <span className="dash-feedback-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 12 12" width="11" height="11">
          <path
            d="M6 1.1l1.25 2.7 2.95.32-2.22 2 .64 2.9L6 7.55 3.38 8.99l.64-2.9-2.22-2 2.95-.32z"
            fill="#d5cbbd"
          />
        </svg>
      ))}
    </span>
  )
}

export function MemberInsightWidget() {
  return (
    <article className="dash-widget dash-insight">
      <section className="dash-nps">
        <h2 className="dash-widget-title">Member NPS</h2>
        <p className="dash-panel-sub">In-app survey · 43 responses · Sep 2026</p>
        <p className="dash-nps-score">
          {MEMBER_NPS.score}
          <span>/100</span>
        </p>
        <p className="dash-nps-change">{MEMBER_NPS.change}</p>
        <div className="dash-nps-bar" aria-hidden="true">
          <span style={{ width: `${MEMBER_NPS.promoters}%` }} />
          <span style={{ width: `${MEMBER_NPS.passives}%` }} />
          <span style={{ width: `${MEMBER_NPS.detractors}%` }} />
        </div>
        <p className="dash-nps-legend">
          <span className="is-promoters">{MEMBER_NPS.promoters}% Promoters</span>
          <span className="is-passives">{MEMBER_NPS.passives}% Passives</span>
          <span className="is-detractors">{MEMBER_NPS.detractors}% Detractors</span>
        </p>
      </section>

      <section className="dash-feedback">
        <h2 className="dash-insight-kicker">Latest feedback</h2>
        <div className="dash-feedback-list">
          {MEMBER_FEEDBACK.map((item) => (
            <article key={item.id} className="dash-feedback-card">
              <div className="dash-feedback-top">
                <span className={`dash-feedback-avatar is-${item.tone}`}>
                  {item.initial}
                </span>
                <span className="dash-feedback-name">{item.name}</span>
                <Stars />
              </div>
              <p>{item.quote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dash-requests">
        <h2 className="dash-insight-kicker">What members asked for</h2>
        <div className="dash-request-list">
          {MEMBER_REQUESTS.map((item) => (
            <div key={item.id} className="dash-request-row">
              <div className="dash-request-top">
                <span>{item.label}</span>
                <strong className={`is-${item.bar}`}>{item.votes} votes</strong>
              </div>
              <div className="dash-request-track">
                <span
                  className={`dash-request-bar is-${item.bar}`}
                  style={{ width: `${item.fill}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <CornerGrip />
    </article>
  )
}
