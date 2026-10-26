import { useState } from 'react'

const STEP_COUNT = 8

type NewEmployeePanelProps = {
  onBack: () => void
}

export function NewEmployeePanel({ onBack }: NewEmployeePanelProps) {
  const [code, setCode] = useState('')

  return (
    <main className="panel panel-center invite-panel" aria-label="New employee">
      <div className="invite-steps" aria-label={`Step 1 of ${STEP_COUNT}`}>
        {Array.from({ length: STEP_COUNT }, (_, index) => (
          <span
            key={index}
            className={`invite-step${index === 0 ? ' is-current' : ''}`}
          />
        ))}
      </div>

      <div className="invite-body">
        <h1 className="invite-title">New to PARK[N]PERKS Enterprise?</h1>
        <p className="invite-lead">
          Enter the invitation code sent by your Manager to get started.
        </p>

        <label className="invite-label" htmlFor="invitation-code">
          Invitation Code
        </label>
        <input
          id="invitation-code"
          className="invite-input"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="e.g. DEMO2024"
          autoComplete="off"
        />

        <button type="button" className="invite-qr">
          <svg
            className="invite-qr-icon"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M1 1h6v6H1V1zm1.4 1.4v3.2h3.2V2.4H2.4zM9 1h6v6H9V1zm1.4 1.4v3.2h3.2V2.4h-3.2zM1 9h6v6H1V9zm1.4 1.4v3.2h3.2v-3.2H2.4zM10.2 9H9v1.6h1.2V9zm2.2 0H11v1.2h1.4V9zm2.6 0h-1.4v1.6H15V9zM9 11.2v1.4h1.6v-1.4H9zm3.2 0V15H15v-1.4h-1.4V12.6h-1.4v-1.4h-1.4zm-3.2 2.2V15h1.6v-1.6H9z"
            />
          </svg>
          Scan QR instead
        </button>

        <button type="button" className="invite-ask">
          Ask a Manager
        </button>
      </div>

      <div className="invite-actions">
        <button type="button" className="invite-back" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="invite-next">
          Next →
        </button>
      </div>
    </main>
  )
}
