type RightFooterProps = {
  onSkip?: () => void
}

export function RightFooter({ onSkip }: RightFooterProps) {
  return (
    <footer className="right-footer">
      <a href="#view-all" className="view-all-link">
        View all after sign-in →
      </a>
      <div className="right-footer-controls">
        <button type="button" className="footer-chip" aria-label="Language">
          EN
        </button>
        <button type="button" className="footer-chip" aria-label="Help">
          ?
        </button>
      </div>
      <button type="button" className="skip-demo-link" onClick={onSkip}>
        Skip (Demo)
      </button>
    </footer>
  )
}
