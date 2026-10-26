function RainSunIcon() {
  return (
    <svg className="weather-main-icon" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="34" cy="12" r="7" fill="#F4C95D" />
      <path
        d="M12 27c0-5.2 4.2-9.5 9.5-9.5 4 0 7.4 2.4 8.9 5.9A7.2 7.2 0 0 1 38 36H14.5A5.5 5.5 0 0 1 12 27z"
        fill="#E8EEF5"
      />
      <path
        d="M17 38.5l-1.2 3.2M23 38.5l-1.2 3.2M29 38.5l-1.2 3.2"
        stroke="#7EB8E0"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PeriodIcon({ type }: { type: 'suncloud' | 'rain' | 'storm' }) {
  if (type === 'rain') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M6 13a4.5 4.5 0 0 1 8.7-1.6A3.2 3.2 0 0 1 17.5 17.5H7A2.8 2.8 0 0 1 6 13z"
          fill="#E8EEF5"
        />
        <path
          d="M9 18.5l-.9 2.2M13 18.5l-.9 2.2"
          stroke="#7EB8E0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (type === 'storm') {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M6 12.5a4.5 4.5 0 0 1 8.7-1.6A3.2 3.2 0 0 1 17.5 17H7A2.8 2.8 0 0 1 6 12.5z"
          fill="#E8EEF5"
        />
        <path d="M12 14l-2 3.5h2.2L11 20" fill="#F4C95D" />
        <path
          d="M8.5 18.5l-.7 1.8M15 18.5l-.7 1.8"
          stroke="#7EB8E0"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="16" cy="8" r="3.5" fill="#F4C95D" />
      <path
        d="M5.5 14a4 4 0 0 1 7.6-1.5A2.8 2.8 0 0 1 16 18H6.5A2.5 2.5 0 0 1 5.5 14z"
        fill="#E8EEF5"
      />
    </svg>
  )
}

const PERIODS = [
  { label: 'Morning', temp: '26°', type: 'suncloud' as const },
  { label: 'Afternoon', temp: '28°', type: 'rain' as const },
  { label: 'Evening', temp: '25°', type: 'storm' as const },
]

export function WeatherWidget() {
  return (
    <section className="weather-widget" aria-label="Weather">
      <div className="weather-top">
        <RainSunIcon />
        <span className="weather-temp">28°C</span>
      </div>

      <p className="weather-condition">Light rain · Indiranagar</p>
      <p className="weather-range">High 31° · Low 24°</p>

      <p className="weather-alert">
        <span className="weather-alert-icon" aria-hidden="true">
          ⚠
        </span>
        Heavier rain after 4 PM — 70% chance
      </p>

      <div className="weather-periods">
        {PERIODS.map((p) => (
          <div key={p.label} className="weather-period">
            <span className="weather-period-label">{p.label}</span>
            <PeriodIcon type={p.type} />
            <span className="weather-period-temp">{p.temp}</span>
          </div>
        ))}
      </div>

      <p className="weather-updated">Updated 8 min ago</p>
    </section>
  )
}
