import { useState } from 'react'
import { ProfileAvatar } from '@/shared/components'
import type { Employee } from '../types/employee'

const PIN_LENGTH = 4
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', 'Back'] as const

type PinModalProps = {
  employee: Employee
  location?: string
  onBack: () => void
  onComplete: () => void
}

export function PinModal({
  employee,
  location = 'Indiranagar',
  onBack,
  onComplete,
}: PinModalProps) {
  const [pin, setPin] = useState('')
  const firstName = employee.name.split(' ')[0]

  const press = (key: (typeof KEYS)[number]) => {
    if (key === 'Clear') {
      setPin('')
      return
    }
    if (key === 'Back') {
      setPin((p) => p.slice(0, -1))
      return
    }
    if (pin.length >= PIN_LENGTH) return
    const next = pin + key
    setPin(next)
    if (next.length === PIN_LENGTH) {
      window.setTimeout(onComplete, 120)
    }
  }

  return (
    <main className="panel panel-center panel-pin" aria-label="Enter PIN">
      <div className="pin-card">
        <button type="button" className="pin-back" onClick={onBack}>
          ← Back
        </button>

        <div className="pin-body">
          <div className="pin-identity">
            <ProfileAvatar
              name={employee.name}
              gradient={employee.avatarGradient}
              size="md"
              className="pin-avatar"
            />
            <h1 className="pin-greeting">Welcome back, {firstName}.</h1>
            <p className="pin-meta">
              {employee.role} · {location}
            </p>
          </div>

          <div
            className="pin-dots"
            aria-label={`${pin.length} of ${PIN_LENGTH} digits entered`}
          >
            {Array.from({ length: PIN_LENGTH }, (_, i) => (
              <span
                key={i}
                className={`pin-dot${i < pin.length ? ' is-filled' : ''}`}
              />
            ))}
          </div>

          <div className="pin-keypad" role="group" aria-label="PIN keypad">
            {KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`pin-key${key === 'Clear' || key === 'Back' ? ' is-action' : ''}`}
                onClick={() => press(key)}
                aria-label={key === 'Back' ? 'Delete' : key}
              >
                {key === 'Back' ? '←' : key}
              </button>
            ))}
          </div>

          <div className="pin-alt-actions">
            <button type="button" className="pin-alt-btn">
              Use badge <span aria-hidden="true">🏷️</span>
            </button>
            <button type="button" className="pin-alt-btn">
              Use QR <span aria-hidden="true">📱</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pin-footer-links">
        <button type="button" className="pin-footer-link">
          Forgot PIN?
        </button>
        <button type="button" className="pin-footer-link" onClick={onBack}>
          Switch user
        </button>
      </div>
    </main>
  )
}
