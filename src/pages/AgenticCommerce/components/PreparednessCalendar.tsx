import { useEffect, useMemo, useRef, useState } from 'react'
import {
  PREP_ACTIONS,
  PREP_CATEGORIES,
  PREP_TODAY,
  addDays,
  formatWhen,
  prepDate,
  startOfWeek,
  toIso,
  weekdayShort,
  type PrepCategory,
  type PrepEvent,
} from '../constants/preparedness'

type BoardView = 'week' | 'month' | 'agenda'

const VIEWS: BoardView[] = ['week', 'month', 'agenda']

function CategoryMark({ id }: { id: PrepCategory }) {
  if (id === 'weather') {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path d="M7 16.5h9.2a3.3 3.3 0 0 0 .3-6.6 4.6 4.6 0 0 0-8.8-1.2A3.2 3.2 0 0 0 7 16.5z" fill="currentColor" />
      </svg>
    )
  }
  if (id === 'shipment') {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 12V20M4.5 8.8 12 13l7.5-4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    )
  }
  if (id === 'staffing') {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <circle cx="9" cy="8" r="2.2" fill="currentColor" />
        <circle cx="15.5" cy="9" r="1.7" fill="currentColor" />
        <path d="M4.5 17.5c.6-2.2 2.2-3.3 4.5-3.3s3.8 1.1 4.4 3.3M14 14.4c1.2.2 2.2.9 2.8 2.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'campaign') {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path d="M12 3.5c.4 2.4 1.2 3.8 3.2 5.2-2 .2-3.4 1.4-4.2 3.6-.8-2.4-2.4-3.6-4.6-4 2.2-1.2 3.2-2.8 3.6-4.8.4 1.6 1.2 2.8 2 3.6z" fill="currentColor" />
      </svg>
    )
  }
  if (id === 'agent') {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path d="M12 3.2 13.5 8.8 19 10.2 13.5 11.6 12 17.2 10.5 11.6 5 10.2 10.5 8.8 12 3.2z" fill="currentColor" />
      </svg>
    )
  }
  return <span className={`prep-dot is-${id}`} aria-hidden="true" />
}

type PreparednessCalendarProps = {
  events: PrepEvent[]
  selectedId: string
  onSelect: (id: string) => void
  onScheduleAgent?: () => void
}

export function PreparednessCalendar({
  events,
  selectedId,
  onSelect,
  onScheduleAgent,
}: PreparednessCalendarProps) {
  const detail = useRef<HTMLElement>(null)
  const [view, setView] = useState<BoardView>('week')
  const [cursor, setCursor] = useState(() => prepDate(PREP_TODAY))
  const [activeCategories, setActiveCategories] = useState<PrepCategory[]>(
    PREP_CATEGORIES.map((item) => item.id),
  )
  const [notice, setNotice] = useState('')
  const [ready, setReady] = useState<Record<string, boolean>>({})

  const visible = useMemo(
    () => events.filter((event) => activeCategories.includes(event.category)),
    [activeCategories, events],
  )
  const selected = visible.find((event) => event.id === selectedId) ?? visible[0] ?? null

  useEffect(() => {
    detail.current?.scrollTo({ top: 0 })
    setNotice('')
  }, [selected?.id])

  useEffect(() => {
    if (view !== 'week') return
    document
      .querySelector('.prep-day.is-focus')
      ?.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  }, [selected?.date, view])

  const weekStart = startOfWeek(cursor)
  const weekDays = Array.from({ length: 7 }, (_, index) => toIso(addDays(weekStart, index)))

  const shift = (direction: -1 | 1) => {
    setCursor((current) => {
      if (view === 'month') {
        return new Date(current.getFullYear(), current.getMonth() + direction, 1)
      }
      return addDays(current, direction * 7)
    })
  }

  const toggleCategory = (id: PrepCategory) => {
    setActiveCategories((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const eventsOn = (iso: string) => visible.filter((event) => event.date === iso)

  const selectEvent = (event: PrepEvent) => {
    onSelect(event.id)
    setCursor(prepDate(event.date))
  }

  return (
    <section className="prep-board" aria-label="Calendar and preparedness">
      <header className="prep-header">
        <div className="prep-title">
          <h2>Calendar &amp; Preparedness</h2>
          <p>Brew &amp; Co. · Bandra West · All outlets</p>
        </div>
        <div className="prep-score" aria-label="Preparedness score 72 out of 100">
          <span>Preparedness score</span>
          <strong>72/100</strong>
        </div>
        <div className="prep-views" role="tablist" aria-label="Calendar view">
          {VIEWS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={view === item}
              className={view === item ? 'is-active' : ''}
              onClick={() => setView(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
        <div className="prep-nav">
          <button type="button" className="prep-today" onClick={() => setCursor(prepDate(PREP_TODAY))}>
            Today
          </button>
          <button type="button" className="prep-arrow" aria-label="Previous" onClick={() => shift(-1)}>
            ‹
          </button>
          <button type="button" className="prep-arrow" aria-label="Next" onClick={() => shift(1)}>
            ›
          </button>
        </div>
      </header>

      <div className="prep-filters" role="toolbar" aria-label="Event categories">
        {PREP_CATEGORIES.map((item) => {
          const on = activeCategories.includes(item.id)
          return (
            <button
              key={item.id}
              type="button"
              className={on ? `is-on is-${item.id}` : `is-${item.id}`}
              aria-pressed={on}
              onClick={() => toggleCategory(item.id)}
            >
              <CategoryMark id={item.id} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

      <div className="prep-body">
        <div className="prep-canvas">
          {view === 'week' ? (
            <div className="prep-week">
              {weekDays.map((iso) => {
                const events = eventsOn(iso)
                const isToday = iso === PREP_TODAY
                const isFocus = selected?.date === iso
                return (
                  <article
                    key={iso}
                    className={['prep-day', isFocus ? 'is-focus' : '', isToday ? 'is-today' : '']
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <header>
                      <span>{weekdayShort(iso)}</span>
                      <div className="prep-day-num">
                        <strong>{prepDate(iso).getDate()}</strong>
                        {isToday ? <em>Today</em> : null}
                      </div>
                    </header>
                    <div className="prep-day-events">
                      {events.map((event) => (
                        <button
                          key={event.id}
                          type="button"
                          className={[
                            'prep-chip',
                            `is-${event.tone}`,
                            `is-${event.category}`,
                            event.id === selected?.id ? 'is-current' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => selectEvent(event)}
                        >
                          <span className="prep-chip-row">
                            <CategoryMark id={event.category} />
                            <span className="prep-chip-copy">
                              <span className="prep-chip-name">{event.title}</span>
                              <time>{event.time}</time>
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : null}

          {view === 'month' ? <MonthGrid cursor={cursor} events={visible} selectedId={selected?.id} onSelect={selectEvent} /> : null}

          {view === 'agenda' ? (
            <div className="prep-agenda">
              {weekDays.flatMap((iso) => eventsOn(iso)).map((event) => {
                const prepared = ready[event.id] ?? Boolean(event.prepared)
                const when = prepDate(event.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })
                return (
                  <article
                    key={event.id}
                    className={[
                      'prep-agenda-row',
                      `is-${event.tone}`,
                      event.id === selected?.id ? 'is-current' : '',
                      event.callout ? 'has-callout' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <button type="button" className="prep-agenda-main" onClick={() => selectEvent(event)}>
                      <span className="prep-agenda-when">
                        <strong>{when}</strong>
                        <time>{event.time}</time>
                      </span>
                      <span className="prep-agenda-mark" aria-hidden="true">
                        <CategoryMark id={event.category} />
                      </span>
                      <span className="prep-agenda-copy">
                        <span className="prep-agenda-title">
                          <strong>{event.title}</strong>
                          {(event.tags ?? []).map((tag) => (
                            <em key={tag.label} className={`is-${tag.tone}`}>
                              {tag.label}
                            </em>
                          ))}
                        </span>
                        <span className="prep-agenda-meta">
                          {event.outlet} · {event.responsible}
                        </span>
                        {event.note ? <span className="prep-agenda-note">{event.note}</span> : null}
                      </span>
                    </button>
                    <button
                      type="button"
                      className={prepared ? 'prep-agenda-status is-ready' : 'prep-agenda-status'}
                      onClick={() => {
                        selectEvent(event)
                        setReady((current) => ({ ...current, [event.id]: !prepared }))
                      }}
                    >
                      {prepared ? '✓ Prepared' : 'Prep needed'}
                    </button>
                  </article>
                )
              })}
            </div>
          ) : null}
        </div>

        <aside ref={detail} className="prep-detail" aria-label="Event details">
          {selected ? (
            <>
              <div className="prep-detail-title">
                <span className={`prep-detail-mark is-${selected.category}`} aria-hidden="true">
                  <CategoryMark id={selected.category} />
                </span>
                <h3>{selected.title}</h3>
              </div>
              {selected.badges.length > 0 ? (
                <div className="prep-badges">
                  {selected.badges.map((badge) => (
                    <span key={badge.label} className={`is-${badge.tone}`}>
                      {badge.label}
                    </span>
                  ))}
                </div>
              ) : null}
              <dl className="prep-meta">
                <div>
                  <dt>Date / Time</dt>
                  <dd>{formatWhen(selected.date, selected.time)}</dd>
                </div>
                <div>
                  <dt>Outlet</dt>
                  <dd>{selected.outlet}</dd>
                </div>
                <div>
                  <dt>Responsible</dt>
                  <dd>{selected.responsible}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{PREP_CATEGORIES.find((item) => item.id === selected.category)?.label}</dd>
                </div>
              </dl>
              <p className="prep-summary">{selected.summary}</p>
              {selected.callout ? <p className="prep-callout">{selected.callout}</p> : null}
              <p className="prep-actions-label">Actions</p>
              <div className="prep-actions">
                {PREP_ACTIONS.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className={label === 'Schedule Agent Action' ? 'is-agent' : ''}
                    onClick={() => {
                      if (label === 'Schedule Agent Action') {
                        onScheduleAgent?.()
                        return
                      }
                      setNotice(`${label} saved for ${selected.title}`)
                    }}
                  >
                    {label === 'Schedule Agent Action' ? <CategoryMark id="agent" /> : null}
                    {label}
                  </button>
                ))}
              </div>
              {notice ? <p className="prep-notice">{notice}</p> : null}
              <p className="prep-actions-label">Preparation notes</p>
              <ul className="prep-notes">
                <li>Confirm cover for the affected outlet before the slot.</li>
                <li>Tell the floor team which menu items stay available.</li>
                <li>Keep the preparedness score updated after the action.</li>
              </ul>
            </>
          ) : (
            <p className="prep-empty">Choose a category to see event details.</p>
          )}
        </aside>
      </div>
    </section>
  )
}

function MonthGrid({
  cursor,
  events,
  selectedId,
  onSelect,
}: {
  cursor: Date
  events: PrepEvent[]
  selectedId?: string
  onSelect: (event: PrepEvent) => void
}) {
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const days = new Date(year, month + 1, 0).getDate()
  const pad = (new Date(year, month, 1).getDay() + 6) % 7
  const cells: Array<number | null> = [
    ...Array.from({ length: pad }, () => null),
    ...Array.from({ length: days }, (_, index) => index + 1),
  ]
  const label = cursor.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <div className="prep-month">
      <p className="prep-month-label">{label}</p>
      <div className="prep-month-dow">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="prep-month-grid">
        {cells.map((day, index) => {
          if (day === null) return <span key={`empty-${index}`} />
          const iso = toIso(new Date(year, month, day))
          const dayEvents = events.filter((event) => event.date === iso)
          return (
            <div key={iso} className={iso === PREP_TODAY ? 'is-today' : ''}>
              <strong>{day}</strong>
              {dayEvents.slice(0, 2).map((event) => (
                <button
                  key={event.id}
                  type="button"
                  className={event.id === selectedId ? 'is-current' : ''}
                  onClick={() => onSelect(event)}
                >
                  {event.title}
                </button>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
