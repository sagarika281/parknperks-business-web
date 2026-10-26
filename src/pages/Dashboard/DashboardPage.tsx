import { useState } from 'react'
import type { WelcomeEmployee } from '@/pages/Welcome'
import { DashboardSidebar } from './components/DashboardSidebar'
import { DashboardHeader } from './components/DashboardHeader'
import { MetricsRow } from './components/MetricsRow'
import { CafeStatusWidget } from './components/CafeStatusWidget'
import { FootfallForecastWidget } from './components/FootfallForecastWidget'
import { TradeSignalWidget } from './components/TradeSignalWidget'
import { TrafficIntelligenceWidget } from './components/TrafficIntelligenceWidget'
import { CommodityRadarWidget } from './components/CommodityRadarWidget'
import { InventoryStatusWidget } from './components/InventoryStatusWidget'
import { MemberInsightWidget } from './components/MemberInsightWidget'
import { WidgetLibraryModal } from './components/WidgetLibraryModal'
import { EditableSlot } from './components/EditableSlot'
import './Dashboard.css'

type DashboardPageProps = {
  employee: WelcomeEmployee
  onSignOut: () => void
}

/**
 * Full-screen business dashboard — page-owned widgets live in ./components.
 */
const DASHBOARD_WIDGETS = [
  'cafe',
  'footfall',
  'trade',
  'traffic',
  'commodity',
  'inventory',
  'insight',
] as const

type DashboardWidgetId = (typeof DASHBOARD_WIDGETS)[number]

export function DashboardPage({ employee, onSignOut }: DashboardPageProps) {
  const [widgetLibraryOpen, setWidgetLibraryOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [removed, setRemoved] = useState<DashboardWidgetId[]>([])

  const visible = (id: DashboardWidgetId) => !removed.includes(id)
  const remove = (id: DashboardWidgetId) => setRemoved((current) => [...current, id])

  const showCafe = visible('cafe')
  const showFootfall = visible('footfall')
  const showTrade = visible('trade')
  const showTraffic = visible('traffic')
  const showCommodity = visible('commodity')
  const showInventory = visible('inventory')
  const showInsight = visible('insight')

  return (
    <div className="dash-page">
      <div className="dash-shell">
        <div className="dash-main">
          <div className="dash-top">
            <DashboardHeader
              employeeName={employee.name}
              employeeGradient={employee.avatarGradient}
              editing={editing}
              onAddWidget={() => setWidgetLibraryOpen(true)}
              onToggleLayout={() => setEditing((current) => !current)}
              onSignOut={onSignOut}
            />
            <MetricsRow />
          </div>
          <div className={editing ? 'dash-main-scroll is-editing' : 'dash-main-scroll'}>
            <div className="dash-widget-flow">
              {showCafe ? (
                <EditableSlot
                  editing={editing}
                  size="cafe"
                  label="Daily Greeting"
                  onRemove={() => remove('cafe')}
                >
                  <CafeStatusWidget employeeName={employee.name} />
                </EditableSlot>
              ) : null}
              {showFootfall ? (
                <EditableSlot
                  editing={editing}
                  size="wide"
                  label="Footfall Forecast"
                  onRemove={() => remove('footfall')}
                >
                  <FootfallForecastWidget />
                </EditableSlot>
              ) : null}
              {showTrade ? (
                <EditableSlot
                  editing={editing}
                  size="half"
                  label="Business Signal"
                  onRemove={() => remove('trade')}
                >
                  <TradeSignalWidget />
                </EditableSlot>
              ) : null}
              {showTraffic ? (
                <EditableSlot
                  editing={editing}
                  size="half"
                  label="Traffic Peaks"
                  onRemove={() => remove('traffic')}
                >
                  <TrafficIntelligenceWidget />
                </EditableSlot>
              ) : null}
              {showCommodity ? (
                <EditableSlot
                  editing={editing}
                  size="half"
                  label="Commodity Radar"
                  onRemove={() => remove('commodity')}
                >
                  <CommodityRadarWidget />
                </EditableSlot>
              ) : null}
              {showInventory ? (
                <EditableSlot
                  editing={editing}
                  size="half"
                  label="Inventory Status"
                  onRemove={() => remove('inventory')}
                >
                  <InventoryStatusWidget />
                </EditableSlot>
              ) : null}
              {showInsight ? (
                <EditableSlot
                  editing={editing}
                  size="full"
                  label="Member Insight"
                  onRemove={() => remove('insight')}
                >
                  <MemberInsightWidget />
                </EditableSlot>
              ) : null}
            </div>
          </div>
        </div>

        <DashboardSidebar
          employeeName={employee.name}
          employeeRole={employee.role}
          employeeGradient={employee.avatarGradient}
        />
      </div>
      {widgetLibraryOpen ? (
        <WidgetLibraryModal onClose={() => setWidgetLibraryOpen(false)} />
      ) : null}
    </div>
  )
}
