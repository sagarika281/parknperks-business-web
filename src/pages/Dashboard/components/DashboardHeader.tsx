import { ProfileAvatar } from '@/shared/components'

type DashboardHeaderProps = {
  employeeName: string
  employeeGradient: string
  editing: boolean
  onAddWidget: () => void
  onToggleLayout: () => void
  onSignOut: () => void
}

function greetingFor(date: Date) {
  const h = date.getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatHeaderDate(date: Date) {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export function DashboardHeader({
  employeeName,
  employeeGradient,
  editing,
  onAddWidget,
  onToggleLayout,
  onSignOut,
}: DashboardHeaderProps) {
  const now = new Date()
  const firstName = employeeName.split(' ')[0]

  return (
    <>
      <div className="dash-header-left">
        <div className="dash-header-title-row">
          <h1 className="dash-header-greeting">
            {greetingFor(now)}, {firstName}
          </h1>
          <ProfileAvatar
            name={employeeName}
            gradient={employeeGradient}
            size="sm"
            className="dash-header-avatar"
          />
        </div>
        <p className="dash-header-meta">
          {formatHeaderDate(now)} · Brew &amp; Co., Bandra West · Open
        </p>
      </div>

      <button type="button" className="dash-action dash-action-add" onClick={onAddWidget}>
        + Add Widget
      </button>
      <div className="dash-header-tail">
        <button
          type="button"
          className={editing ? 'dash-action dash-action-done' : 'dash-action dash-action-edit'}
          aria-pressed={editing}
          onClick={onToggleLayout}
        >
          {editing ? (
            <>
              <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                <path
                  d="M3.2 8.2 6.4 11.4 12.8 4.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Done
            </>
          ) : (
            'Edit Layout'
          )}
        </button>
        <button
          type="button"
          className="dash-action dash-action-signout"
          onClick={onSignOut}
        >
          <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
            <rect
              x="3.2"
              y="7"
              width="9.6"
              height="7"
              rx="1.4"
              fill="#ffc44e"
            />
            <path
              d="M5.2 7V5.2a2.8 2.8 0 0 1 5.6 0V7"
              fill="none"
              stroke="#ffc44e"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </>
  )
}
