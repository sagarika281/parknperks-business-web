import { BILLING_TOOLS } from '../constants/integrations'

function ToolIcon({ id }: { id: string }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  if (id === 'petpooja') {
    return (
      <svg {...common}>
        <path d="M8 20c2-6 3-12 4-16 1 4 2 10 4 16" />
        <path d="M7 14h10" />
      </svg>
    )
  }
  if (id === 'posist') {
    return (
      <svg {...common}>
        <path d="M4 10h16l-1 9H5l-1-9z" />
        <path d="M3 10l2-5h14l2 5" />
      </svg>
    )
  }
  if (id === 'zoho') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="7" />
        <path d="M8 12h8" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
      <path d="M3 5h2l2.2 10h10.4l2-7H7.2" />
    </svg>
  )
}

export function IntegrationsPanel() {
  return (
    <div className="set-form">
      <header className="set-head">
        <h1>Integrations</h1>
        <p>Connect billing and third-party tools.</p>
      </header>

      <div className="set-card set-integrations">
        <section className="set-int-block">
          <div className="set-int-label">
            <strong>PERKS Link — Billing Integration</strong>
            <span className="set-chip">Edition Two · 2027</span>
          </div>
          <div className="set-tool-row">
            {BILLING_TOOLS.map((tool) => (
              <button
                key={tool.id}
                type="button"
                className={tool.available ? 'set-tool' : 'set-tool is-muted'}
                disabled={!tool.available}
              >
                <ToolIcon id={tool.id} />
                {tool.label}
              </button>
            ))}
          </div>
        </section>

        <section className="set-int-block set-int-row">
          <div>
            <strong>Marg / Tally — CSV Import</strong>
            <p>Import member data and transaction history via CSV</p>
          </div>
          <button type="button" className="set-btn set-btn-soft">
            Import CSV
          </button>
        </section>

        <section className="set-int-block set-int-row">
          <div>
            <strong>Public API</strong>
            <p>Available on Growth plan and above</p>
          </div>
          <button type="button" className="set-btn set-btn-locked" disabled>
            Locked
          </button>
        </section>
      </div>
    </div>
  )
}
