const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function ActionCalendar() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const label = today.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ]

  return (
    <div className="agentic-calendar">
      <p className="agentic-calendar-month">{label}</p>
      <div className="agentic-calendar-grid" aria-hidden="true">
        {WEEKDAYS.map((day, index) => (
          <span key={`${day}-${index}`} className="agentic-calendar-dow">
            {day}
          </span>
        ))}
        {cells.map((day, index) => (
          <span
            key={day ?? `empty-${index}`}
            className={day === today.getDate() ? 'is-today' : undefined}
          >
            {day ?? ''}
          </span>
        ))}
      </div>
      <ul className="agentic-calendar-notes">
        <li>
          <strong>Today 3:30 PM</strong>
          Heavy Rain Hot-Beverage Campaign
        </li>
        <li>
          <strong>Today 4:00 PM</strong>
          Evening Rush Preparation
        </li>
      </ul>
    </div>
  )
}
