import { useEffect, useState } from 'react'
import { AlertCard } from './AlertCard'
import { ActivateButton } from './ActivateButton'

const DEMO_META = 'Indiranagar · Open · Tuesday, 18 September'

function formatTime(date: Date) {
  const h = String(date.getHours()).padStart(2, '0')
  const m = String(date.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

function greetingFor(date: Date) {
  const h = date.getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

type CenterPanelProps = {
  onActivate?: () => void
  onIdleDemo?: () => void
}

export function CenterPanel({ onActivate, onIdleDemo }: CenterPanelProps) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <main className="panel panel-center" aria-label="Main hub">
      <div className="center-top">
        <div className="center-brand">PARK[N]PERKS ENTERPRISE</div>

        <div className="center-hero">
          <p className="center-clock">{formatTime(now)}</p>
          <h1 className="center-greeting">{`${greetingFor(now)}, Brew & Co.`}</h1>
          <p className="center-meta">{DEMO_META}</p>
        </div>

        <AlertCard />
      </div>

      <div className="center-actions">
        <ActivateButton onActivate={onActivate} />
        <p className="center-session">
          <span className="session-lock" aria-hidden="true">
            🔒
          </span>
          Session ended · Touch to begin
        </p>
        <button type="button" className="idle-demo-link" onClick={onIdleDemo}>
          Demo: Trigger Idle Lock
        </button>
      </div>
    </main>
  )
}
