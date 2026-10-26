import { useLocation, useNavigate } from 'react-router-dom'
import { paths } from '@/routes/paths'

export function WorkspaceTabs() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const onCounter = pathname === paths.counter

  return (
    <div className="counter-tabs" role="tablist" aria-label="Counter sections">
      <button
        type="button"
        role="tab"
        aria-selected={onCounter}
        className={onCounter ? 'is-active' : ''}
        onClick={() => {
          if (!onCounter) navigate(paths.counter)
        }}
      >
        Counter
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={!onCounter}
        className={!onCounter ? 'is-active' : ''}
        onClick={() => {
          if (onCounter) navigate(paths.members)
        }}
      >
        Members
      </button>
    </div>
  )
}
