import { STAFF } from '../constants/staff'

export function StaffPanel() {
  return (
    <div className="set-form">
      <header className="set-head set-head-row">
        <div>
          <h1>Staff &amp; Roles</h1>
          <p>Manage team members, their roles, and access.</p>
        </div>
        <button type="button" className="set-btn set-btn-soft">
          + Invite Staff
        </button>
      </header>

      <div className="set-card set-staff-list">
        {STAFF.map((member) => (
          <article key={member.id} className="set-staff-row">
            <span className="set-staff-avatar" style={{ background: member.tone }} aria-hidden="true">
              {member.initial}
            </span>
            <div className="set-staff-copy">
              <div className="set-staff-name">
                <strong>{member.name}</strong>
                <span className={`set-role is-${member.role}`}>{member.roleLabel}</span>
              </div>
              <p>
                {member.outlet} · {member.phone}
              </p>
            </div>
            <div className="set-staff-actions">
              <button type="button" className="set-btn set-btn-ghost">
                Edit
              </button>
              {member.canRemove ? (
                <button type="button" className="set-btn set-btn-soft">
                  Remove
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
