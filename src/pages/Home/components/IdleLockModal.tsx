import { useEffect, useState } from 'react'

const COUNTDOWN_SECONDS = 30

type IdleLockModalProps = {
  onStay: () => void
  onLock: () => void
}

export function IdleLockModal({ onStay, onLock }: IdleLockModalProps) {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS)

  useEffect(() => {
    if (seconds <= 0) {
      onLock()
      return
    }

    const id = window.setTimeout(() => {
      setSeconds((s) => s - 1)
    }, 1000)

    return () => window.clearTimeout(id)
  }, [seconds, onLock])

  return (
    <div
      className="idle-lock-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="idle-lock-title"
    >
      <div className="idle-lock-modal">
        <h2 id="idle-lock-title" className="idle-lock-title">
          Are you still there?
        </h2>
        <p className="idle-lock-count" aria-live="polite">
          {seconds}
        </p>
        <p className="idle-lock-copy">
          You will be locked out in {seconds} second{seconds === 1 ? '' : 's'}.
        </p>
        <button type="button" className="idle-lock-stay" onClick={onStay}>
          Stay signed in
        </button>
        <button type="button" className="idle-lock-now" onClick={onLock}>
          Lock now
        </button>
      </div>
    </div>
  )
}
