import { BrandHeader } from './BrandHeader'
import { CalendarWidget } from './CalendarWidget'
import { WeatherWidget } from './WeatherWidget'
import { OpenStatusBar } from './OpenStatusBar'

type LeftPanelProps = {
  locked?: boolean
}

export function LeftPanel({ locked = false }: LeftPanelProps) {
  return (
    <aside
      className="panel panel-left"
      aria-label="Business info"
      aria-hidden={locked || undefined}
      inert={locked || undefined}
    >
      <div className="panel-scroll">
        {/* Screenshot 1 first fold */}
        <div className="left-first-fold">
          <BrandHeader />
          <CalendarWidget />
          <WeatherWidget />
        </div>

        {/* Screenshot 2 — after scroll */}
        <div className="left-below-fold">
          <OpenStatusBar />
        </div>
      </div>
    </aside>
  )
}
