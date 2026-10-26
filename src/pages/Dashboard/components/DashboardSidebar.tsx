import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EMPLOYEES } from '@/pages/Home/constants/employees'
import { paths } from '@/routes/paths'
import { ProfileAvatar } from '@/shared/components'
import { useEmployeeSession } from '@/shared/session'
import { SIDEBAR_NAV } from '../constants/nav'
import { JulesPanel } from './JulesPanel'
import { ProfileSwitcher } from './ProfileSwitcher'
import { SidebarNavIcon } from './SidebarNavIcon'

const NAV_PATHS: Partial<Record<(typeof SIDEBAR_NAV)[number]['id'], string>> = {
  counter: paths.counter,
  dashboard: paths.dashboard,
  commerce: paths.agenticCommerce,
  loyalty: paths.loyalty,
  inventory: paths.inventory,
  customers: paths.customers,
}

const OUTLETS = ['Indiranagar', 'Koramangala'] as const
const COLLAPSE_KEY = 'parknperks-sidebar-collapsed'

function readCollapsed() {
  try {
    return sessionStorage.getItem(COLLAPSE_KEY) === '1'
  } catch {
    return false
  }
}

type DashboardSidebarProps = {
  employeeName: string
  employeeRole: string
  employeeGradient: string
}

function formatShortDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = date.toLocaleDateString('en-GB', { month: 'short' })
  return `${day} ${month}`
}

export function DashboardSidebar({
  employeeName,
  employeeRole,
  employeeGradient,
}: DashboardSidebarProps) {
  const [outlet, setOutlet] = useState<(typeof OUTLETS)[number]>('Indiranagar')
  const [outletOpen, setOutletOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(readCollapsed)
  const [julesOpen, setJulesOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [compactNav, setCompactNav] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 1100px)').matches,
  )
  const outletRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLButtonElement>(null)
  const { signIn, clearEmployee } = useEmployeeSession()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1100px)')
    const sync = () => setCompactNav(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const railOwnsProfile = compactNav || collapsed

  useLayoutEffect(() => {
    document.documentElement.dataset.sidebar = collapsed ? 'collapsed' : 'open'
    try {
      sessionStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0')
    } catch {
      /* ignore private-mode storage failures */
    }
  }, [collapsed])

  const toggleCollapsed = () => {
    setOutletOpen(false)
    setProfileOpen(false)
    setCollapsed((open) => !open)
  }

  const switchProfile = (employeeId: string) => {
    const next = EMPLOYEES.find((employee) => employee.id === employeeId)
    if (!next) return
    signIn(next)
    setProfileOpen(false)
  }

  const signOut = () => {
    setProfileOpen(false)
    clearEmployee()
    navigate(paths.login)
  }

  useEffect(() => {
    if (!outletOpen) return

    const close = (event: PointerEvent) => {
      if (!outletRef.current?.contains(event.target as Node)) {
        setOutletOpen(false)
      }
    }

    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [outletOpen])

  useEffect(() => {
    if (!profileOpen) return
    const close = (event: PointerEvent) => {
      const target = event.target as Node
      if (profileRef.current?.contains(target)) return
      if ((target as Element).closest?.('.dash-profile-pop')) return
      setProfileOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProfileOpen(false)
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [profileOpen])

  return (
    <aside
      className={collapsed ? 'dash-sidebar is-collapsed' : 'dash-sidebar'}
      aria-label="Business navigation"
    >
      <div className="dash-sidebar-scroll">
        <div className="dash-sidebar-top">
          <div className="dash-sidebar-brand">
            <span className="dash-sidebar-logo" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
                <path
                  d="M9 14h11a4 4 0 0 1 0 8h-1.2"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M9 14v6.5A4.5 4.5 0 0 0 13.5 25h4A4.5 4.5 0 0 0 22 20.5V18"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M12.5 9c0-1.2.8-2.2 1.2-3M16 9c0-1.2.8-2.2 1.2-3M19.5 9c0-1.2.8-2.2 1.2-3"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <p className="dash-sidebar-name">
              Brew <span className="dash-amp">&amp;</span> Co.
            </p>
            <p className="dash-sidebar-powered">
              POWERED BY PARKNPERKS ENTERPRISE
            </p>
          </div>

          <button
            type="button"
            className={
              pathname === paths.settings
                ? 'dash-sidebar-profile is-current'
                : 'dash-sidebar-profile'
            }
            aria-current={pathname === paths.settings ? 'page' : undefined}
            onClick={() => {
              if (pathname !== paths.settings) navigate(paths.settings)
            }}
          >
            <span className="dash-sidebar-profile-copy">
              <span className="dash-sidebar-profile-title">
                Profile &amp; Settings
              </span>
              <span className="dash-sidebar-profile-sub">
                Founding Partner – Edition One
              </span>
            </span>
            <span className="dash-sidebar-chevron" aria-hidden="true">
              ›
            </span>
          </button>

          <div className="dash-sidebar-divider" aria-hidden="true" />

          <nav className="dash-sidebar-nav" aria-label="Primary">
            {SIDEBAR_NAV.map((item) => {
              const to = NAV_PATHS[item.id]
              const current = to === pathname
              return (
              <button
                key={item.id}
                type="button"
                aria-current={current ? 'page' : undefined}
                className={[
                  'dash-nav-item',
                  current && !item.live ? 'is-active' : '',
                  item.live ? 'is-live' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => {
                  if (to && to !== pathname) navigate(to)
                }}
              >
                <span className="dash-nav-icon">
                  <SidebarNavIcon icon={item.icon} />
                </span>
                <span className="dash-nav-label">{item.label}</span>
                {item.live ? <span className="dash-nav-live">Live</span> : null}
                {item.badge != null ? (
                  <span className="dash-nav-badge">{item.badge}</span>
                ) : null}
                {current ? <span className="dash-nav-dot" aria-hidden="true" /> : null}
              </button>
              )
            })}
          </nav>

          <div className="dash-sidebar-divider dash-sidebar-fold-line" aria-hidden="true" />
        </div>

        <div className="dash-sidebar-footer">
          <button
            type="button"
            className="dash-sidebar-ghost"
            aria-expanded={!collapsed}
            onClick={toggleCollapsed}
          >
            <span className="dash-sidebar-ghost-icon" aria-hidden="true">
              «
            </span>
            Collapse
          </button>

          <button type="button" className="dash-sidebar-ghost" onClick={() => setJulesOpen(true)}>
            <span className="dash-sidebar-ghost-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path
                  d="M12 3l1.4 5.2L18 9.6l-4.2 3 1.2 5.4L12 15.4 8.999 18l1.2-5.4L6 9.6l4.6-1.4L12 3z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Jules
          </button>

          <div className="dash-outlet" ref={outletRef}>
            <p className="dash-outlet-label">ACTIVE OUTLET</p>
            <button
              type="button"
              className="dash-outlet-select"
              aria-expanded={outletOpen}
              aria-haspopup="listbox"
              onClick={() => setOutletOpen((open) => !open)}
            >
              <span>{outlet}</span>
              <span className="dash-outlet-caret" aria-hidden="true">
                ▾
              </span>
            </button>
            {outletOpen ? (
              <ul className="dash-outlet-menu" role="listbox" aria-label="Active outlet">
                {OUTLETS.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={name === outlet}
                      className={name === outlet ? 'is-selected' : ''}
                      onClick={() => {
                        setOutlet(name)
                        setOutletOpen(false)
                      }}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <button
            ref={railOwnsProfile ? undefined : profileRef}
            type="button"
            className="dash-user-card"
            aria-expanded={railOwnsProfile ? undefined : profileOpen}
            aria-haspopup="menu"
            onClick={() => setProfileOpen((open) => !open)}
          >
            <ProfileAvatar
              name={employeeName}
              gradient={employeeGradient}
              size="sm"
              className="dash-user-avatar"
            />
            <span className="dash-user-copy">
              <span className="dash-user-name">{employeeName}</span>
              <span className="dash-user-meta">
                <span className="dash-user-role">{employeeRole}</span>
                <span className="dash-user-sep" aria-hidden="true">
                  ·
                </span>
                <span className="dash-user-date">
                  {formatShortDate(new Date())}
                </span>
              </span>
            </span>
          </button>
        </div>
      </div>

      <div className="dash-sidebar-rail">
        <span className="dash-rail-logo" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
            <path
              d="M9 14h11a4 4 0 0 1 0 8h-1.2"
              stroke="#3a2418"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M9 14v6.5A4.5 4.5 0 0 0 13.5 25h4A4.5 4.5 0 0 0 22 20.5V18"
              stroke="#3a2418"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M12.5 9c0-1.2.8-2.2 1.2-3M16 9c0-1.2.8-2.2 1.2-3M19.5 9c0-1.2.8-2.2 1.2-3"
              stroke="#3a2418"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <button
          type="button"
          className={pathname === paths.settings ? 'dash-rail-btn is-active' : 'dash-rail-btn'}
          aria-label="Profile & Settings"
          aria-current={pathname === paths.settings ? 'page' : undefined}
          onClick={() => {
            if (pathname !== paths.settings) navigate(paths.settings)
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M5.5 19c1.1-3 3.2-4.5 6.5-4.5s5.4 1.5 6.5 4.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {SIDEBAR_NAV.map((item) => {
          const to = NAV_PATHS[item.id]
          const current = to === pathname
          return (
            <button
              key={item.id}
              type="button"
              className={[
                'dash-rail-btn',
                current && !item.live ? 'is-active' : '',
                item.live ? 'is-live' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={current ? 'page' : undefined}
              aria-label={item.label}
              onClick={() => {
                if (to && to !== pathname) navigate(to)
              }}
            >
              <SidebarNavIcon icon={item.icon} />
              {item.badge != null ? <span className="dash-rail-badge">{item.badge}</span> : null}
              {item.live ? <span className="dash-rail-dot" aria-hidden="true" /> : null}
            </button>
          )
        })}

        <span className="dash-rail-divider" aria-hidden="true" />

        <button
          type="button"
          className="dash-rail-btn is-utility dash-rail-expand"
          aria-expanded={!collapsed}
          aria-label="Expand sidebar"
          onClick={toggleCollapsed}
        >
          <span aria-hidden="true">»</span>
        </button>

        <button
          type="button"
          className="dash-rail-btn is-utility"
          aria-label="Jules"
          onClick={() => setJulesOpen(true)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path
              d="M12 3l1.4 5.2L18 9.6l-4.2 3 1.2 5.4L12 15.4 8.999 18l1.2-5.4L6 9.6l4.6-1.4L12 3z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          ref={railOwnsProfile ? profileRef : undefined}
          type="button"
          className="dash-rail-avatar-btn"
          aria-label={`${employeeName}, switch profile`}
          aria-expanded={railOwnsProfile ? profileOpen : undefined}
          aria-haspopup="menu"
          onClick={() => setProfileOpen((open) => !open)}
        >
          <ProfileAvatar
            name={employeeName}
            gradient={employeeGradient}
            size="sm"
            className="dash-rail-avatar"
          />
        </button>
      </div>
      <ProfileSwitcher
        open={profileOpen}
        anchorRef={profileRef}
        activeName={employeeName}
        onClose={() => setProfileOpen(false)}
        onSelect={switchProfile}
        onSignOut={signOut}
      />
      {julesOpen ? (
        <JulesPanel
          onClose={() => setJulesOpen(false)}
          onOpenWorkspace={() => {
            setJulesOpen(false)
            navigate(paths.agenticCommerce)
          }}
        />
      ) : null}
    </aside>
  )
}
