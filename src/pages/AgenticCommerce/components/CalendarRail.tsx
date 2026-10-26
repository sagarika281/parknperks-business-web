import { useMemo, useState } from 'react'
import { formatWhen, type PrepEvent } from '../constants/preparedness'

const RAIL_FILTERS = [
  ['all', 'disruptions', 'weather'],
  ['shipment', 'staffing'],
  ['campaign', 'loyalty', 'lifestyle'],
  ['agent'],
] as const

const FILTER_LABEL: Record<(typeof RAIL_FILTERS)[number][number], string> = {
  all: 'All',
  disruptions: 'Disruptions',
  weather: 'Weather',
  shipment: 'Shipments',
  staffing: 'Staffing',
  campaign: 'Campaigns',
  loyalty: 'Loyalty',
  lifestyle: 'Lifestyle',
  agent: 'Agent Actions',
}

type RailFilter = keyof typeof FILTER_LABEL

type CalendarRailProps = {
  events: PrepEvent[]
  selectedId: string
  onSelect: (id: string) => void
}

function matchesRail(event: PrepEvent, filter: RailFilter) {
  if (filter === 'all') return true
  if (filter === 'disruptions') {
    return event.tone === 'alert' || event.badges.some((badge) => badge.tone !== 'live')
  }
  return event.category === filter
}

export function CalendarRail({ events, selectedId, onSelect }: CalendarRailProps) {
  const [filter, setFilter] = useState<RailFilter>('all')
  const visible = useMemo(
    () =>
      events
        .filter((event) => matchesRail(event, filter))
        .slice()
        .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)),
    [events, filter],
  )

  return (
    <>
      <div className="cal-rail-stats" aria-label="Preparedness summary">
        <article>
          <p>Prep score</p>
          <strong>72/100</strong>
        </article>
        <article>
          <p>Critical</p>
          <strong>2</strong>
        </article>
        <article>
          <p>Shipments</p>
          <strong>
            1 <em>delayed</em>
          </strong>
        </article>
        <article className="is-approvals">
          <p>Approvals</p>
          <strong>2</strong>
        </article>
      </div>

      <div className="cal-rail-filters" role="toolbar" aria-label="Calendar filters">
        {RAIL_FILTERS.map((row) => (
          <div key={row.join('-')}>
            {row.map((id) => (
              <button
                key={id}
                type="button"
                className={filter === id ? 'is-active' : ''}
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
              >
                {FILTER_LABEL[id]}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="agentic-action-list cal-rail-list">
        {visible.map((event) => (
          <button
            key={event.id}
            type="button"
            className={event.id === selectedId ? 'cal-rail-card is-selected' : 'cal-rail-card'}
            aria-current={event.id === selectedId ? 'true' : undefined}
            onClick={() => onSelect(event.id)}
          >
            <strong>{event.title}</strong>
            <span>{formatWhen(event.date, event.time)}</span>
            <span>
              {event.outlet} · {event.responsible}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}
