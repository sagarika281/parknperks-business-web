import { DashboardSidebar } from '@/pages/Dashboard/components/DashboardSidebar'
import { CounterForm } from './components/CounterForm'
import { TodaysActivity } from './components/TodaysActivity'
import { WorkspaceTabs } from './components/WorkspaceTabs'
import '@/pages/Dashboard/Dashboard.css'
import './Counter.css'

type CounterPageProps = {
  employeeName: string
  employeeRole: string
  employeeGradient: string
}

export function CounterPage({
  employeeName,
  employeeRole,
  employeeGradient,
}: CounterPageProps) {
  return (
    <div className="counter-page">
      <div className="counter-shell">
        <div className="counter-workspace">
          <WorkspaceTabs />
          <div className="counter-body">
            <TodaysActivity />
            <CounterForm />
          </div>
        </div>
        <DashboardSidebar
          employeeName={employeeName}
          employeeRole={employeeRole}
          employeeGradient={employeeGradient}
        />
      </div>
    </div>
  )
}
