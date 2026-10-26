import { DEMO_EMPLOYEE, EMPLOYEES } from '../constants/employees'
import { EmployeeCard, type Employee } from './EmployeeCard'
import { AlertItem, type SideAlert } from './AlertItem'
import { RightFooter } from './RightFooter'

const FOLD_ALERTS: SideAlert[] = [
  {
    id: 'a1',
    title: 'Weather alert',
    detail: 'Heavy rain possible after 4 PM',
    icon: 'weather',
  },
  {
    id: 'a2',
    title: 'Shipment update',
    detail: 'One delivery may arrive late',
    icon: 'shipment',
  },
]

const BELOW_FOLD_ALERTS: SideAlert[] = [
  {
    id: 'a3',
    title: 'Shift reminder',
    detail: 'Afternoon shift starts in 35 minutes',
    icon: 'shift',
  },
]

type RightPanelProps = {
  onSkip?: () => void
  onSelectEmployee?: (employee: Employee) => void
  onNewEmployee?: () => void
  locked?: boolean
}

export function RightPanel({
  onSkip,
  onSelectEmployee,
  onNewEmployee,
  locked = false,
}: RightPanelProps) {
  const openPin = () => {
    onSelectEmployee?.(DEMO_EMPLOYEE)
  }
  return (
    <aside
      className="panel panel-right"
      aria-label="Sign in"
      aria-hidden={locked || undefined}
      inert={locked || undefined}
    >
      <div className="panel-scroll">
        {/* Screenshot 1 first fold — alerts peek / cut at bottom */}
        <div className="right-first-fold">
          <header className="signin-header">
            <h2 className="signin-title">Sign In</h2>
            <button
              type="button"
              className="a11y-btn"
              aria-label="Accessibility options"
              disabled={locked}
              tabIndex={locked ? -1 : undefined}
            >
              <span className="a11y-btn-inner" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="12" height="12">
                  <circle cx="12" cy="4" r="2.2" fill="currentColor" />
                  <path
                    d="M12 8v3.5l-3.4 6.2h2.3l2.1-3.9 2.1 3.9h2.3L14 11.5V8H12z"
                    fill="currentColor"
                  />
                  <circle
                    cx="8.2"
                    cy="18.8"
                    r="2.4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M13.2 14.5l2 3.8H18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
          </header>

          <div className="employee-list">
            {EMPLOYEES.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                disabled={locked}
                onSelect={onSelectEmployee}
              />
            ))}
          </div>

          <div className="signin-links">
            <button type="button" onClick={onNewEmployee}>
              New employee?
            </button>
            <a href="#employee-code">Use employee code</a>
          </div>

          <div className="side-alerts">
            {FOLD_ALERTS.map((alert) => (
              <AlertItem key={alert.id} alert={alert} onClick={openPin} />
            ))}
          </div>
        </div>

        {/* Screenshot 2 — after scroll */}
        <div className="right-below-fold">
          {BELOW_FOLD_ALERTS.map((alert) => (
            <AlertItem key={alert.id} alert={alert} onClick={openPin} />
          ))}
          <RightFooter onSkip={onSkip} />
        </div>
      </div>
    </aside>
  )
}
