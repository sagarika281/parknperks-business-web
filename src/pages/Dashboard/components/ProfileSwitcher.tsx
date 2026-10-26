import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { EMPLOYEES } from '@/pages/Home/constants/employees'

const PROFILES = [
  { id: '3', locked: false, color: '#1e6b48' },
  { id: '2', locked: true, color: '#1a5c40' },
  { id: '1', locked: false, color: '#9b2d45' },
  { id: '4', locked: true, color: '#17685f' },
] as const

type ProfileSwitcherProps = {
  open: boolean
  anchorRef: RefObject<HTMLButtonElement | null>
  activeName: string
  onClose: () => void
  onSelect: (employeeId: string) => void
  onSignOut: () => void
}

export function ProfileSwitcher({
  open,
  anchorRef,
  activeName,
  onClose,
  onSelect,
  onSignOut,
}: ProfileSwitcherProps) {
  const popRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useLayoutEffect(() => {
    if (!open) return
    const place = () => {
      const anchor = anchorRef.current
      const pop = popRef.current
      if (!anchor || !pop) return
      const rect = anchor.getBoundingClientRect()
      const width = Math.min(Math.max(rect.width, 236), window.innerWidth - 16)
      const height = pop.offsetHeight
      let left = rect.width < 120 ? rect.right - width : rect.left
      left = Math.max(8, Math.min(left, window.innerWidth - width - 8))
      const sidebar = document.querySelector('.dash-sidebar')?.getBoundingClientRect()
      const floor = sidebar && sidebar.top > window.innerHeight * 0.55 ? sidebar.top - 8 : window.innerHeight - 8
      let top = rect.top - height - 8
      if (top + height > floor) top = floor - height
      if (top < 8) top = Math.min(rect.bottom + 8, floor - height)
      pop.style.width = `${width}px`
      pop.style.left = `${left}px`
      pop.style.top = `${Math.max(8, top)}px`
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [open, anchorRef])

  if (!open) return null

  const rows = PROFILES.map((item) => {
    const employee = EMPLOYEES.find((entry) => entry.id === item.id)
    return employee ? { ...employee, locked: item.locked, color: item.color } : null
  }).filter((row) => row != null)

  return createPortal(
    <div ref={popRef} className="dash-profile-pop" role="menu" aria-label="Switch profile">
      {rows.map((profile) => {
        const active = profile.name === activeName
        return (
          <button
            key={profile.id}
            type="button"
            role="menuitem"
            className={[
              'dash-profile-row',
              active ? 'is-active' : '',
              profile.locked ? 'is-locked' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-disabled={profile.locked || undefined}
            aria-current={active ? 'true' : undefined}
            onClick={() => {
              if (!profile.locked) onSelect(profile.id)
            }}
          >
            <span className="dash-profile-avatar" style={{ background: profile.color }} aria-hidden="true">
              {profile.name.charAt(0)}
            </span>
            <span className="dash-profile-copy">
              <span className="dash-profile-name">{profile.name}</span>
              <span className="dash-profile-role">{profile.role}</span>
            </span>
            {active ? <CheckIcon /> : null}
            {profile.locked ? <LockIcon /> : null}
          </button>
        )
      })}
      <button type="button" role="menuitem" className="dash-profile-signout" onClick={onSignOut}>
        <LockIcon />
        Sign Out
      </button>
    </div>,
    document.body,
  )
}

function CheckIcon() {
  return (
    <svg className="dash-profile-mark" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M5 12.5 9.2 17 19 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg className="dash-profile-mark" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <rect x="6" y="10" width="12" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 10V8a3.5 3.5 0 0 1 7 0v2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
