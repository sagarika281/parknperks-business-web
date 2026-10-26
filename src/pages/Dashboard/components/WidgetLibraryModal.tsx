import { useEffect, useMemo, useRef, useState } from 'react'
import {
  WIDGET_CATEGORIES,
  WIDGET_LIBRARY,
  type WidgetCategoryId,
  type WidgetLibraryItem,
} from '../constants/widgetLibrary'

type WidgetLibraryModalProps = {
  onClose: () => void
}

function CategoryIcon({ id }: { id: WidgetCategoryId }) {
  if (id === 'ai') {
    return (
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <path
          d="M8 1.2l1.1 3.2L12.4 5.4 9.8 7.4l.8 3.3L8 8.8 5.4 10.7l.8-3.3L3.6 5.4l3.3-1z"
          fill="currentColor"
        />
      </svg>
    )
  }
  if (id === 'performance') {
    return (
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <path d="M2 12h2V8H2v4zm4 0h2V5H6v7zm4 0h2V3h-2v9z" fill="currentColor" />
      </svg>
    )
  }
  if (id === 'loyalty') {
    return (
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <path d="M8 2l1.6 3.2L13 6.1 10.2 8.4 11 12 8 10.2 5 12l.8-3.6L3 6.1l3.4-.9z" fill="currentColor" />
      </svg>
    )
  }
  if (id === 'operations') {
    return (
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <rect x="3" y="2.5" width="10" height="11" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5.5 6.5h5M5.5 9h5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    )
  }
  if (id === 'customers') {
    return (
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <circle cx="6" cy="5.5" r="2" fill="currentColor" />
        <circle cx="10.5" cy="6" r="1.6" fill="currentColor" />
        <path d="M2.8 12.2c.5-1.8 2-2.8 3.4-2.8s2.8 1 3.3 2.8M9.2 9.6c1.2 0 2.4.7 2.9 2.2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (id === 'staff') {
    return (
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <circle cx="8" cy="5" r="2.1" fill="currentColor" />
        <path
          d="M3.6 12.6c.7-2.2 2.4-3.3 4.4-3.3s3.7 1.1 4.4 3.3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (id === 'inventory') {
    return (
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <path d="M3 6.2L8 3.5l5 2.7v6.2L8 15.1 3 12.4z" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 6.2l5 2.6 5-2.6M8 8.8V15" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <path d="M3 6.5v5.2a1 1 0 0 0 1 1h6.2L13 9.8V4.2H5.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 4.2V3h6.2v5.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function WidgetPreview({ kind }: { kind: WidgetLibraryItem['preview'] }) {
  if (kind === 'matrix') {
    return (
      <div className="dash-lib-preview is-matrix">
        <p>AI Action Matrix</p>
        <div>
          <span>
            <b>Act Now</b>
            <i>3 items</i>
          </span>
          <span>
            <b>Plan Ahead</b>
            <i>2 items</i>
          </span>
        </div>
      </div>
    )
  }
  if (kind === 'brief') {
    return (
      <div className="dash-lib-preview is-brief">
        <div>
          <strong>WHAT CHANGED</strong>
          <span>Revenue up 12% vs yesterday</span>
        </div>
      </div>
    )
  }
  if (kind === 'revenue') {
    return (
      <div className="dash-lib-preview is-revenue">
        <p>Revenue Trend</p>
        <strong>₹18,400</strong>
        <span>↑ 12% vs yesterday</span>
        <i>M T W T F S S</i>
      </div>
    )
  }
  if (kind === 'margin') {
    return (
      <div className="dash-lib-preview is-margin">
        <p>Gross Margin</p>
        <strong>62.4%</strong>
        <span>↓ 3.2pp vs last week</span>
        <i />
      </div>
    )
  }
  if (kind === 'product') {
    return (
      <div className="dash-lib-preview is-product">
        <p>Product Performance</p>
        <strong>Cappuccino</strong>
        <span>₹4,200 68%</span>
      </div>
    )
  }
  if (kind === 'health') {
    return (
      <div className="dash-lib-preview is-health">
        <p>Loyalty Health</p>
        <strong>84</strong>
        <span>/ 100 · Good</span>
        <i>92 Earn · 78 Redeem · 82 Retain</i>
      </div>
    )
  }
  if (kind === 'risk') {
    return (
      <div className="dash-lib-preview is-risk">
        <p>Members at Risk 5</p>
        <strong>Rahul M.</strong>
        <span>Legend · 42 days</span>
        <i>Sneha K.</i>
      </div>
    )
  }
  if (kind === 'liability') {
    return (
      <div className="dash-lib-preview is-liability">
        <p>Currency Liability</p>
        <strong>13,900</strong>
        <span>Beans outstanding · ₹1,390 value</span>
        <i>+840 −220</i>
      </div>
    )
  }
  if (kind === 'preparedness') {
    return (
      <div className="dash-lib-preview is-preparedness">
        <p>Preparedness</p>
        <strong>72</strong>
        <span>/100 · Action needed</span>
        <i>Weather · Rain 4 PM · Staffing Covered</i>
      </div>
    )
  }
  if (kind === 'staffing') {
    return (
      <div className="dash-lib-preview is-staffing">
        <p>Staffing Readiness</p>
        <strong>Morning shift</strong>
        <span>4/4 covered</span>
        <i>Afternoon shift</i>
      </div>
    )
  }
  if (kind === 'churn') {
    return (
      <div className="dash-lib-preview is-churn">
        <p>Churn Risk</p>
        <strong>5 · 8 · 12</strong>
        <span>Legend · Loyal · Regular</span>
      </div>
    )
  }
  if (kind === 'nps') {
    return (
      <div className="dash-lib-preview is-nps">
        <p>NPS</p>
        <strong>+62</strong>
        <span>↑ 4 pts vs last month</span>
        <i />
      </div>
    )
  }
  if (kind === 'alerts') {
    return (
      <div className="dash-lib-preview is-alerts">
        <p>Inventory Alerts 4</p>
        <strong>Vanilla Syrup</strong>
        <span>Out of stock</span>
        <i>Oat Milk Low — 2 units</i>
      </div>
    )
  }
  if (kind === 'commodity') {
    return (
      <div className="dash-lib-preview is-commodity">
        <p>Commodity Radar</p>
        <strong>Arabica Coffee</strong>
        <span>↑ 4.2% · High</span>
      </div>
    )
  }
  if (kind === 'campaigns') {
    return (
      <div className="dash-lib-preview is-campaigns">
        <p>Active Campaigns</p>
        <strong>Rain Day Special</strong>
        <span>SMS · 480 sent</span>
        <i>18% conv.</i>
      </div>
    )
  }
  if (kind === 'tasks') {
    return (
      <div className="dash-lib-preview is-tasks">
        <p>My Tasks · 3 of 5 done</p>
        <strong>Hide vanilla syrup items</strong>
        <span>Complete station setup</span>
        <i>Evening prep checklist</i>
      </div>
    )
  }
  if (kind === 'footfall') {
    return (
      <div className="dash-lib-preview is-footfall">
        <p>Footfall</p>
        <strong>247</strong>
        <span>Peak 1–2 PM · ↑ 8% vs yesterday</span>
      </div>
    )
  }
  return (
    <div className="dash-lib-preview is-queue">
      <p>Approval Queue</p>
      <strong>Rain promo campaign</strong>
      <em>Urgent</em>
      <span>₹5,000 ad</span>
    </div>
  )
}

export function WidgetLibraryModal({ onClose }: WidgetLibraryModalProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<WidgetCategoryId>('ai')
  const [addedIds, setAddedIds] = useState<string[]>([])
  const filtersRef = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState({ width: 100, left: 0 })

  function updateThumb() {
    const el = filtersRef.current
    if (!el) return
    const ratio = el.clientWidth / el.scrollWidth
    const width = Math.max(16, ratio * 100)
    const max = el.scrollWidth - el.clientWidth
    const left = max <= 0 ? 0 : (el.scrollLeft / max) * (100 - width)
    setThumb({ width, left })
  }

  function scrollFiltersTo(clientX: number, track: HTMLDivElement) {
    const el = filtersRef.current
    if (!el) return
    const rect = track.getBoundingClientRect()
    const max = el.scrollWidth - el.clientWidth
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    el.scrollLeft = ratio * max
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    updateThumb()
    window.addEventListener('resize', updateThumb)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', updateThumb)
    }
  }, [onClose])

  const widgets = useMemo(() => {
    const text = query.trim().toLowerCase()
    return WIDGET_LIBRARY.filter((widget) => {
      if (widget.category !== category) return false
      if (!text) return true
      return (
        widget.title.toLowerCase().includes(text) ||
        widget.description.toLowerCase().includes(text)
      )
    })
  }, [category, query])

  return (
    <div className="dash-lib-overlay" onClick={onClose}>
      <div
        className="dash-lib-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="widget-library-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="dash-lib-head">
          <div>
            <h2 id="widget-library-title">Widget Library</h2>
            <p>Choose widgets to personalise your Dashboard</p>
          </div>
          <button type="button" className="dash-lib-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
              <path
                d="M4 4l8 8M12 4l-8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <label className="dash-lib-search">
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
            <circle cx="7" cy="7" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M10.2 10.2L13.2 13.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            placeholder="Search widgets..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div
          className="dash-lib-filters"
          role="tablist"
          aria-label="Widget categories"
          ref={filtersRef}
          onScroll={updateThumb}
        >
          {WIDGET_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={category === item.id}
              className={`dash-lib-filter${category === item.id ? ' is-active' : ''}`}
              onClick={() => setCategory(item.id)}
            >
              <CategoryIcon id={item.id} />
              {item.label}
            </button>
          ))}
        </div>
        <div
          className="dash-lib-scroll"
          onPointerDown={(event) => {
            if (event.target !== event.currentTarget) return
            scrollFiltersTo(event.clientX, event.currentTarget)
          }}
        >
          <span
            style={{ width: `${thumb.width}%`, marginLeft: `${thumb.left}%` }}
            onPointerDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
              const el = filtersRef.current
              const track = event.currentTarget.parentElement
              if (!el || !track) return
              const startX = event.clientX
              const startLeft = el.scrollLeft
              const max = el.scrollWidth - el.clientWidth
              const trackWidth = track.getBoundingClientRect().width
              const move = (ev: PointerEvent) => {
                el.scrollLeft = startLeft + ((ev.clientX - startX) / trackWidth) * max
              }
              const up = () => {
                window.removeEventListener('pointermove', move)
                window.removeEventListener('pointerup', up)
              }
              window.addEventListener('pointermove', move)
              window.addEventListener('pointerup', up)
            }}
          />
        </div>

        <div className="dash-lib-list">
          {widgets.map((widget) => {
            const added = addedIds.includes(widget.id)
            return (
              <article key={widget.id} className="dash-lib-row">
                <WidgetPreview kind={widget.preview} />
                <div className="dash-lib-copy">
                  <h3>{widget.title}</h3>
                  <p>{widget.description}</p>
                  {widget.sizes.length > 0 ? (
                    <div className="dash-lib-sizes">
                      {widget.sizes.map((size) => (
                        <span key={size}>{size}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="dash-lib-action">
                  <button
                    type="button"
                    className={added ? 'dash-lib-add is-added' : 'dash-lib-add'}
                    aria-label={added ? `${widget.title} added` : `Add ${widget.title}`}
                    aria-pressed={added}
                    onClick={() =>
                      setAddedIds((current) =>
                        current.includes(widget.id)
                          ? current.filter((id) => id !== widget.id)
                          : [...current, widget.id],
                      )
                    }
                  >
                    {added ? (
                      <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
                        <path
                          d="M3.2 8.2 6.4 11.4 12.8 4.6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
                        <path
                          d="M8 3.2v9.6M3.2 8h9.6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>
                  {added ? (
                    <span className="dash-lib-added">
                      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                        <path
                          d="M3.2 8.2 6.4 11.4 12.8 4.6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Added
                    </span>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
