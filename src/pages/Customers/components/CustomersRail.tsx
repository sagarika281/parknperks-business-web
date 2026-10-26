import { CAMPAIGN_FILTERS, type Campaign, type CampaignFilter } from '../constants/campaigns'
import { CUSTOMER_FILTERS, formatInr, type Customer, type CustomerFilter } from '../constants/customers'

type RailTab = 'customers' | 'campaigns'

type CustomersRailProps = {
  tab: RailTab
  query: string
  filter: CustomerFilter
  customers: Customer[]
  campaigns: Campaign[]
  catalog: Campaign[]
  campaignQuery: string
  campaignFilter: CampaignFilter
  selectedId: string
  onTab: (tab: RailTab) => void
  onQuery: (query: string) => void
  onFilter: (filter: CustomerFilter) => void
  onCampaignQuery: (query: string) => void
  onCampaignFilter: (filter: CampaignFilter) => void
  onSelect: (id: string) => void
  onAdd: () => void
  onCreateCampaign: () => void
}

export function CustomersRail({
  tab,
  query,
  filter,
  customers,
  campaigns,
  catalog,
  campaignQuery,
  campaignFilter,
  selectedId,
  onTab,
  onQuery,
  onFilter,
  onCampaignQuery,
  onCampaignFilter,
  onSelect,
  onAdd,
  onCreateCampaign,
}: CustomersRailProps) {
  const campaignsMode = tab === 'campaigns'
  const counts = {
    active: catalog.filter((campaign) => campaign.status === 'Active').length,
    scheduled: catalog.filter((campaign) => campaign.status === 'Scheduled').length,
    approval: catalog.filter((campaign) => campaign.status === 'Needs Approval').length,
    draft: catalog.filter((campaign) => campaign.status === 'Draft').length,
  }

  return (
    <aside className={campaignsMode ? 'cust-rail is-campaigns' : 'cust-rail'} aria-label="Customers and campaigns">
      <h1>Customers &amp; Campaigns</h1>
      <div className="cust-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'customers'}
          className={tab === 'customers' ? 'is-active' : ''}
          onClick={() => onTab('customers')}
        >
          <PeopleIcon />
          Customers
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'campaigns'}
          className={tab === 'campaigns' ? 'is-active' : ''}
          onClick={() => onTab('campaigns')}
        >
          <MegaphoneIcon />
          Campaigns
        </button>
      </div>

      {campaignsMode ? (
        <>
          <div className="camp-stats">
            <article>
              <span>Active</span>
              <strong>{counts.active}</strong>
            </article>
            <article>
              <span>Scheduled</span>
              <strong>{counts.scheduled}</strong>
            </article>
            <article>
              <span>Needs Approval</span>
              <strong>{counts.approval}</strong>
            </article>
            <article>
              <span>Draft</span>
              <strong>{counts.draft}</strong>
            </article>
          </div>

          <label className="camp-search">
            <span className="sr-only">Search campaigns</span>
            <input
              type="search"
              value={campaignQuery}
              placeholder="Search campaigns..."
              onChange={(event) => onCampaignQuery(event.target.value)}
            />
          </label>

          <div className="camp-filters">
            {CAMPAIGN_FILTERS.map((row) => (
              <div key={row.join('-')}>
                {row.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={name === campaignFilter ? 'is-active' : ''}
                    onClick={() => onCampaignFilter(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="cust-stats">
            <article>
              <span>Total</span>
              <strong>1,284</strong>
            </article>
            <article>
              <span>Active</span>
              <strong>847</strong>
            </article>
            <article>
              <span>New (30d)</span>
              <strong>32</strong>
            </article>
            <article>
              <span>At risk</span>
              <strong>47</strong>
            </article>
          </div>

          <label className="cust-search">
            <span className="sr-only">Search name, phone or member ID</span>
            <input
              type="search"
              value={query}
              placeholder="Search name, phone or member ID..."
              onChange={(event) => onQuery(event.target.value)}
            />
          </label>

          <div className="cust-filters">
            <div>
              {CUSTOMER_FILTERS.slice(0, 4).map((name) => (
                <button
                  key={name}
                  type="button"
                  className={name === filter ? 'is-active' : ''}
                  onClick={() => onFilter(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <div>
              {CUSTOMER_FILTERS.slice(4).map((name) => (
                <button
                  key={name}
                  type="button"
                  className={name === filter ? 'is-active' : ''}
                  onClick={() => onFilter(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="cust-list">
        {tab === 'campaigns'
          ? campaigns.map((campaign) => (
              <button
                key={campaign.id}
                type="button"
                className={campaign.id === selectedId ? 'camp-card is-selected' : 'camp-card'}
                onClick={() => onSelect(campaign.id)}
              >
                <span className="camp-card-top">
                  <strong>{campaign.name}</strong>
                  <span className={`camp-badge is-${campaign.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {campaign.status === 'Needs Approval' ? 'Needs Approval' : campaign.status}
                  </span>
                </span>
                <em>{`${campaign.members} · ${campaign.channel}`}</em>
                <span className="camp-card-foot">
                  <span>{campaign.when}</span>
                  {campaign.ai ? <AiIcon /> : null}
                </span>
              </button>
            ))
          : customers.map((customer) => (
              <button
                key={customer.id}
                type="button"
                className={customer.id === selectedId ? 'cust-item is-selected' : 'cust-item'}
                onClick={() => onSelect(customer.id)}
              >
                <span className={`cust-avatar is-${customer.tone}`}>{customer.initial}</span>
                <span className="cust-copy">
                  <strong>{customer.name}</strong>
                  <em>
                    {customer.tier} · {customer.beans} Beans
                  </em>
                  <em>
                    Last visit {customer.lastVisit} · {formatInr(customer.lifetimeValue)} LTV
                  </em>
                </span>
                {customer.notify ? <i className="cust-dot" /> : null}
              </button>
            ))}
      </div>

      <div className="cust-add">
        <button type="button" onClick={campaignsMode ? onCreateCampaign : onAdd}>
          {campaignsMode ? '+ Create Campaign' : '+ Add Customer'}
        </button>
      </div>
    </aside>
  )
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <circle cx="6" cy="5.2" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.8 12.2c.4-2 1.6-3 3.2-3s2.8 1 3.2 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="11" cy="5.6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.2 9.4c1.4.2 2.3 1.1 2.8 2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function AiIcon() {
  return (
    <svg className="camp-ai" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 1.1 9.15 6.05 14 7.2 9.15 8.35 8 13.3 6.85 8.35 2 7.2l4.85-1.15L8 1.1Z"
      />
      <path fill="currentColor" d="M12.2 1.4 12.7 3l1.6.5-1.6.5-.5 1.6-.5-1.6-1.6-.5 1.6-.5.5-1.6Z" />
    </svg>
  )
}

function MegaphoneIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path d="M3 7.2h2.2l5-2.6v7.2l-5-2.4H3V7.2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5.2 9.6v1.8c0 .7.5 1.3 1.2 1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export type { RailTab }
