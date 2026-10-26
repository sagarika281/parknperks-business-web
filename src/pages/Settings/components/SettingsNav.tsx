import { SETTINGS_NAV, type SettingsSectionId } from '../constants/sections'

type SettingsNavProps = {
  section: SettingsSectionId
  onSelect: (id: SettingsSectionId) => void
  onSignOut: () => void
}

function NavIcon({ id }: { id: SettingsSectionId }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  if (id === 'brand') {
    return (
      <svg {...common}>
        <path d="M4 20l1.1-4.1L16.2 4.8a1.7 1.7 0 0 1 2.4 0l.6.6a1.7 1.7 0 0 1 0 2.4L8.1 18.9 4 20z" />
      </svg>
    )
  }
  if (id === 'outlets') {
    return (
      <svg {...common}>
        <path d="M4 10h16l-1.1 9H5.1L4 10z" />
        <path d="M3 10l2.1-5h13.8L21 10" />
        <path d="M9 19v-4h6v4" />
      </svg>
    )
  }
  if (id === 'staff') {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="2.2" />
        <circle cx="16" cy="9" r="1.7" />
        <path d="M4.2 18.2c.7-2.5 2.6-3.8 4.8-3.8s4.1 1.3 4.8 3.8" />
        <path d="M13.2 14.8c1.3-.3 2.6 0 3.6.9.8.8 1.3 1.8 1.5 2.5" />
      </svg>
    )
  }
  if (id === 'jules') {
    return (
      <svg {...common}>
        <path d="M12 3.2l1.3 4.4 4.4 1.3-4.4 1.3L12 14.6l-1.3-4.4L6.3 8.9l4.4-1.3L12 3.2z" />
      </svg>
    )
  }
  if (id === 'subscription') {
    return (
      <svg {...common}>
        <rect x="3.5" y="6" width="17" height="12" rx="2" />
        <path d="M3.5 10h17" />
      </svg>
    )
  }
  if (id === 'integrations') {
    return (
      <svg {...common}>
        <path d="M9.5 13.2a3.6 3.6 0 0 0 5.1.3l1.8-1.8a3.6 3.6 0 0 0-5.1-5.1l-1 1" />
        <path d="M14.5 10.8a3.6 3.6 0 0 0-5.1-.3l-1.8 1.8a3.6 3.6 0 0 0 5.1 5.1l1-1" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
      <path d="M14 3.5V8h4.2" />
      <path d="M9 13h6M9 16.2h4" />
    </svg>
  )
}

export function SettingsNav({ section, onSelect, onSignOut }: SettingsNavProps) {
  return (
    <aside className="set-rail" aria-label="Settings">
      <h1>Settings</h1>
      <nav className="set-rail-nav" aria-label="Settings sections">
        {SETTINGS_NAV.map((item) => {
          const current = item.id === section
          return (
            <button
              key={item.id}
              type="button"
              className={current ? 'set-nav-btn is-active' : 'set-nav-btn'}
              aria-current={current ? 'page' : undefined}
              onClick={() => onSelect(item.id)}
            >
              <NavIcon id={item.id} />
              {item.label}
            </button>
          )
        })}
      </nav>
      <button type="button" className="set-signout" onClick={onSignOut}>
        Sign Out
      </button>
    </aside>
  )
}
