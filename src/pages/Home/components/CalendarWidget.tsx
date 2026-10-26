import { useState } from 'react'

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

/** September 2026 starts on Tuesday → Mo column empty on week 1 */
const DAYS: (number | null)[] = [
  null, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, null, null, null, null,
]

const SELECTED = 18
const DOT_DAY = 20
const MAIN_MONTH = 8 // September
const MAIN_YEAR = 2026

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function CalendarWidget() {
  const [monthIndex, setMonthIndex] = useState(MAIN_MONTH)
  const [year, setYear] = useState(MAIN_YEAR)

  const goPrev = () => {
    if (monthIndex === 0) {
      setMonthIndex(11)
      setYear((y) => y - 1)
    } else {
      setMonthIndex((m) => m - 1)
    }
  }

  const goNext = () => {
    if (monthIndex === 11) {
      setMonthIndex(0)
      setYear((y) => y + 1)
    } else {
      setMonthIndex((m) => m + 1)
    }
  }

  const goToday = () => {
    setMonthIndex(MAIN_MONTH)
    setYear(MAIN_YEAR)
  }

  const isMainMonth = monthIndex === MAIN_MONTH && year === MAIN_YEAR

  return (
    <section className="calendar-widget" aria-label="Calendar">
      <div className="calendar-nav">
        <button type="button" className="calendar-arrow" onClick={goPrev} aria-label="Previous month">
          ‹
        </button>
        <h2 className="calendar-title">
          {MONTHS[monthIndex]} {year}
        </h2>
        <button type="button" className="calendar-arrow" onClick={goNext} aria-label="Next month">
          ›
        </button>
      </div>

      <div className="calendar-weekdays">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {DAYS.map((day, i) => (
          <span
            key={i}
            className={[
              'calendar-day',
              day === SELECTED && isMainMonth ? 'is-selected' : '',
              day === DOT_DAY && isMainMonth ? 'has-dot' : '',
              day === null ? 'is-empty' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {day ?? ''}
          </span>
        ))}
      </div>

      <button type="button" className="calendar-today" onClick={goToday}>
        Today
      </button>
    </section>
  )
}
