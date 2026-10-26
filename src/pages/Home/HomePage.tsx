import { useCallback, useEffect, useState } from 'react'
import { LeftPanel } from './components/LeftPanel'
import { CenterPanel } from './components/CenterPanel'
import { RightPanel } from './components/RightPanel'
import { PinModal } from './components/PinModal'
import { NewEmployeePanel } from './components/NewEmployeePanel'
import { IdleLockModal } from './components/IdleLockModal'
import type { Employee } from './types/employee'

type HomePageProps = {
  onPinSuccess: (employee: Employee) => void
  onSkipDemo: () => void
}

/**
 * Home page — owns dashboard panels and page-level modals.
 * Page-only UI lives in ./components (reference: mobile feature colocation).
 */
export function HomePage({ onPinSuccess, onSkipDemo }: HomePageProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  )
  const [inviteOpen, setInviteOpen] = useState(false)
  const [idleOpen, setIdleOpen] = useState(false)

  const pinOpen = selectedEmployee !== null
  const sidesLocked = pinOpen || inviteOpen || idleOpen

  const closeIdle = useCallback(() => {
    setIdleOpen(false)
  }, [])

  useEffect(() => {
    if (!pinOpen && !inviteOpen) return
    document
      .querySelector('.panel-pin, .invite-panel')
      ?.scrollIntoView({ block: 'start' })
  }, [pinOpen, inviteOpen])

  return (
    <div
      className={[
        'dashboard',
        pinOpen || inviteOpen ? 'is-pin-open' : '',
        idleOpen ? 'is-idle-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <LeftPanel locked={sidesLocked} />

      {pinOpen ? (
        <PinModal
          employee={selectedEmployee}
          onBack={() => setSelectedEmployee(null)}
          onComplete={() => onPinSuccess(selectedEmployee)}
        />
      ) : inviteOpen ? (
        <NewEmployeePanel onBack={() => setInviteOpen(false)} />
      ) : (
        <CenterPanel
          onActivate={() => {
            // Hook for screen activation
          }}
          onIdleDemo={() => setIdleOpen(true)}
        />
      )}

      <RightPanel
        locked={sidesLocked}
        onSkip={onSkipDemo}
        onNewEmployee={() => {
          setSelectedEmployee(null)
          setInviteOpen(true)
        }}
        onSelectEmployee={(employee) => {
          setInviteOpen(false)
          setSelectedEmployee(employee)
        }}
      />

      {idleOpen ? (
        <IdleLockModal onStay={closeIdle} onLock={closeIdle} />
      ) : null}
    </div>
  )
}
