type ActivateButtonProps = {
  onActivate?: () => void
}

export function ActivateButton({ onActivate }: ActivateButtonProps) {
  return (
    <button type="button" className="activate-btn" onClick={onActivate}>
      <span className="activate-hand" aria-hidden="true">
        👆
      </span>
      Tap to activate screen
    </button>
  )
}
