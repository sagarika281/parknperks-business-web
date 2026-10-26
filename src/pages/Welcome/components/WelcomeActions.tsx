type WelcomeActionsProps = {
  onStartShift?: () => void
  onHearTasks?: () => void
  onSignInAsSomeoneElse: () => void
}

export function WelcomeActions({
  onStartShift,
  onHearTasks,
  onSignInAsSomeoneElse,
}: WelcomeActionsProps) {
  return (
    <div className="welcome-actions">
      <button
        type="button"
        className="welcome-btn welcome-btn-primary"
        onClick={onStartShift}
      >
        Start My Shift
      </button>
      <button
        type="button"
        className="welcome-btn welcome-btn-secondary"
        onClick={onHearTasks}
      >
        Hear My Tasks
      </button>
      <button
        type="button"
        className="welcome-switch-link"
        onClick={onSignInAsSomeoneElse}
      >
        Sign in as someone else
      </button>
    </div>
  )
}
