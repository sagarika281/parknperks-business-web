import { useNavigate } from 'react-router-dom'
import { paths } from '@/routes/paths'
import type { Member } from '../constants/members'

export function MemberProfile({ member }: { member: Member }) {
  const navigate = useNavigate()

  return (
    <section className="member-profile" aria-label="Member profile">
      <p className="member-profile-kicker">Member profile</p>
      <div className="member-profile-hero">
        <span className={`members-avatar is-${member.avatar} is-large`} aria-hidden="true">
          {member.initial}
        </span>
        <div className="member-profile-identity">
          <h1>{member.name}</h1>
          <p>{member.phoneProfile}</p>
          <span className="member-legend">{member.tier}</span>
        </div>
      </div>

      <div className="member-balance">
        <strong>{member.beans}</strong>
        <span>Beans · ₹{member.beans * 10} value</span>
        <div className="member-progress-meta">
          <p>Tier progress → {member.progressLabel}</p>
          <em>{member.progress}%</em>
        </div>
        <div className="member-progress" aria-hidden="true">
          <span style={{ width: `${member.progress}%` }} />
        </div>
      </div>

      <dl className="member-facts">
        <div>
          <dt>Total visits</dt>
          <dd>{member.visits}</dd>
        </div>
        <div>
          <dt>Joined</dt>
          <dd>{member.joined}</dd>
        </div>
        <div>
          <dt>Last visit</dt>
          <dd>{member.lastVisit}</dd>
        </div>
        <div>
          <dt>Home outlet</dt>
          <dd>{member.outlet}</dd>
        </div>
      </dl>

      <div className="member-activity">
        <h2>Recent activity</h2>
        <div className="member-activity-row">
          <p>
            {member.activityLabel}
            <span>{member.activityDate}</span>
          </p>
          <strong>{member.activityBeans}</strong>
        </div>
      </div>

      <div className="member-actions">
        <button type="button" className="member-action-issue" onClick={() => navigate(paths.counter)}>
          Issue Beans at Counter
        </button>
        <button type="button" className="member-action-message">
          Send Message
        </button>
        <button type="button" className="member-action-all">
          View All Activity
        </button>
      </div>
    </section>
  )
}
