import { useRef } from 'react'
import type { Campaign } from '../constants/campaigns'

type CampaignDetailProps = {
  campaign: Campaign
  onApprove: () => void
  onRequestChanges: () => void
  onReject: () => void
  onPause: () => void
  onExtend: () => void
}

export function CampaignDetail({
  campaign,
  onApprove,
  onRequestChanges,
  onReject,
  onPause,
  onExtend,
}: CampaignDetailProps) {
  const liveRef = useRef<HTMLElement>(null)
  const live = campaign.status === 'Active'
  const statusClass = campaign.status.toLowerCase().replace(/\s+/g, '-')

  return (
    <section className="camp-detail" aria-label={campaign.name}>
      <header className="camp-detail-head">
        <div className="camp-detail-title">
          <h2>{campaign.name}</h2>
          <div className="camp-detail-badges">
            <span className={campaign.paused ? 'is-paused' : `is-${statusClass}`}>
              {campaign.paused ? 'Paused' : campaign.status}
            </span>
            {campaign.ai ? (
              <span className="is-agent">
                <SparkIcon />
                Agent Recommended
              </span>
            ) : null}
          </div>
        </div>
        <div className="camp-detail-actions">
          {live ? (
            <>
              <button
                type="button"
                className="is-approve"
                onClick={() => liveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                View Live Performance
              </button>
              <button type="button" onClick={onPause}>
                {campaign.paused ? 'Resume' : 'Pause'}
              </button>
              <button type="button" onClick={onExtend}>
                Extend
              </button>
            </>
          ) : (
            <>
              <button type="button" className="is-approve" onClick={onApprove}>
                Approve
              </button>
              <button type="button" onClick={onRequestChanges}>
                Request Changes
              </button>
              <button type="button" className="is-reject" onClick={onReject}>
                Reject
              </button>
            </>
          )}
        </div>
      </header>

      <div className="camp-detail-grid">
        <article>
          <p>Audience</p>
          <strong>{campaign.members}</strong>
        </article>
        <article>
          <p>Channel</p>
          <strong>{campaign.channel}</strong>
        </article>
        <article>
          <p>Schedule</p>
          <strong>{campaign.when}</strong>
        </article>
        <article>
          <p>Reach</p>
          <strong>{campaign.reach}</strong>
        </article>
        <article>
          <p>Predicted Impact</p>
          <strong>{campaign.impact}</strong>
        </article>
        <article>
          <p>Agent Rec</p>
          <strong>{campaign.agentRec}</strong>
        </article>
      </div>

      {live ? (
        <section ref={liveRef}>
          <h3>Live Performance</h3>
          <div className="camp-live">
            <article>
              <p>Sent</p>
              <strong>{campaign.sent}</strong>
            </article>
            <article>
              <p>Opened</p>
              <strong>{campaign.opened}</strong>
            </article>
            <article>
              <p>Redeemed</p>
              <strong>{campaign.redeemed}</strong>
            </article>
          </div>
        </section>
      ) : null}

      {!live && campaign.recommendation ? (
        <section>
          <h3>Agent Recommendation</h3>
          <div className="camp-rec">
            <p className="camp-rec-title">
              <SparkIcon />
              {campaign.recommendation.title}
            </p>
            <p>{campaign.recommendation.body}</p>
          </div>
        </section>
      ) : null}

      {live ? null : (
        <section>
          <h3>Approval History</h3>
          <p>{campaign.history}</p>
        </section>
      )}

      <section>
        <h3>Message Preview</h3>
        <div className="camp-phone">
          <div className="camp-phone-screen">
            <p className="camp-phone-brand">{campaign.preview.brand}</p>
            <p className="camp-phone-copy">
              <SparkIcon />
              <span>{campaign.preview.body}</span>
            </p>
            <span className="camp-phone-cta">{campaign.preview.cta}</span>
          </div>
        </div>
      </section>

      {live ? null : (
      <section>
        <h3>Activity Timeline</h3>
        <ol className="camp-timeline">
          {campaign.timeline.map((event) => (
            <li key={`${event.title}-${event.time}`}>
              <strong>{event.title}</strong>
              <span>{event.time}</span>
            </li>
          ))}
        </ol>
      </section>
      )}
    </section>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path
        d="M8 1.2 9.1 5.4 13.4 6.5 9.1 7.6 8 11.8 6.9 7.6 2.6 6.5 6.9 5.4 8 1.2z"
        fill="currentColor"
      />
      <path d="M12.2 9.2 12.7 10.8 14.3 11.3 12.7 11.8 12.2 13.4 11.7 11.8 10.1 11.3 11.7 10.8 12.2 9.2z" fill="currentColor" />
    </svg>
  )
}
