type SideAlert = {
  id: string
  title: string
  detail: string
  icon: 'weather' | 'shipment' | 'shift'
}

const ICONS: Record<SideAlert['icon'], string> = {
  weather: '☁',
  shipment: '📦',
  shift: '⏰',
}

type AlertItemProps = {
  alert: SideAlert
  onClick?: () => void
}

export function AlertItem({ alert, onClick }: AlertItemProps) {
  return (
    <button type="button" className="side-alert" onClick={onClick}>
      <span className="side-alert-icon" aria-hidden="true">
        {ICONS[alert.icon]}
      </span>
      <div>
        <h3 className="side-alert-title">{alert.title}</h3>
        <p className="side-alert-detail">{alert.detail}</p>
      </div>
    </button>
  )
}

export type { SideAlert }
