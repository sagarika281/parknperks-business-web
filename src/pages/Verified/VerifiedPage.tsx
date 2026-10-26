import { useEffect } from 'react'
import { LeftPanel } from '@/pages/Home/components/LeftPanel'
import { RightPanel } from '@/pages/Home/components/RightPanel'
import { VerifiedMark } from './components/VerifiedMark'

type VerifiedPageProps = {
  onDone: () => void
  durationMs?: number
}

/**
 * Verified state — same dashboard shell + cream card size as PIN.
 */
export function VerifiedPage({
  onDone,
  durationMs = 1400,
}: VerifiedPageProps) {
  useEffect(() => {
    const id = window.setTimeout(onDone, durationMs)
    return () => window.clearTimeout(id)
  }, [onDone, durationMs])

  return (
    <div className="dashboard is-pin-open">
      <LeftPanel locked />

      <main className="panel panel-center panel-pin" aria-label="PIN verified">
        <div className="pin-card verified-card">
          <VerifiedMark />
        </div>
      </main>

      <RightPanel locked />
    </div>
  )
}
