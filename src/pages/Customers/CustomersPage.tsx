import { useMemo, useState } from 'react'
import { DashboardSidebar } from '@/pages/Dashboard/components/DashboardSidebar'
import '@/pages/Dashboard/Dashboard.css'
import { AddCustomerModal, type NewCustomerDraft } from './components/AddCustomerModal'
import { CreateCampaignModal, type NewCampaignDraft } from './components/CreateCampaignModal'
import { CampaignDetail } from './components/CampaignDetail'
import { CustomerDetail } from './components/CustomerDetail'
import { CustomersRail, type RailTab } from './components/CustomersRail'
import {
  CAMPAIGNS,
  campaignMatches,
  type Campaign,
  type CampaignFilter,
  type CampaignStatus,
} from './constants/campaigns'
import { CUSTOMERS, type Customer, type CustomerFilter } from './constants/customers'
import './Customers.css'

type CustomersPageProps = {
  employeeName: string
  employeeRole: string
  employeeGradient: string
}

export function CustomersPage({
  employeeName,
  employeeRole,
  employeeGradient,
}: CustomersPageProps) {
  const [tab, setTab] = useState<RailTab>('customers')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<CustomerFilter>('All')
  const [customers, setCustomers] = useState(CUSTOMERS)
  const [selectedId, setSelectedId] = useState(CUSTOMERS[0].id)
  const [campaigns, setCampaigns] = useState(CAMPAIGNS)
  const [selectedCampaignId, setSelectedCampaignId] = useState(CAMPAIGNS[0].id)
  const [campaignQuery, setCampaignQuery] = useState('')
  const [campaignFilter, setCampaignFilter] = useState<CampaignFilter>('All')
  const [addOpen, setAddOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return customers.filter((customer) => {
      const inFilter = filter === 'All' || customer.segments.includes(filter)
      const inQuery =
        needle.length === 0 ||
        customer.name.toLowerCase().includes(needle) ||
        customer.phone.toLowerCase().includes(needle) ||
        customer.memberId.toLowerCase().includes(needle)
      return inFilter && inQuery
    })
  }, [customers, filter, query])

  const selected = customers.find((customer) => customer.id === selectedId) ?? visible[0]

  const visibleCampaigns = useMemo(
    () => campaigns.filter((campaign) => campaignMatches(campaign, campaignFilter, campaignQuery)),
    [campaigns, campaignFilter, campaignQuery],
  )

  const selectedCampaign =
    campaigns.find((campaign) => campaign.id === selectedCampaignId) ?? visibleCampaigns[0]

  const decideCampaign = (status: CampaignStatus, history: string, eventTitle: string) => {
    if (!selectedCampaign) return
    const id = selectedCampaign.id
    setCampaigns((list) =>
      list.map((campaign) =>
        campaign.id === id
          ? {
              ...campaign,
              status,
              history,
              timeline: [
                ...campaign.timeline.filter((event) => event.title !== 'Awaiting manager review'),
                { title: eventTitle, time: 'Just now' },
              ],
            }
          : campaign,
      ),
    )
  }

  const addCustomer = (draft: NewCustomerDraft) => {
    const next = createCustomer(draft, customers.length + 1)
    setCustomers((list) => [next, ...list])
    setSelectedId(next.id)
    setTab('customers')
    setQuery('')
    setFilter('All')
    setAddOpen(false)
  }

  return (
    <div className="cust-page">
      <div className="cust-shell">
        <div className="cust-workspace">
          <CustomersRail
            tab={tab}
            query={query}
            filter={filter}
            customers={visible}
            campaigns={visibleCampaigns}
            catalog={campaigns}
            campaignQuery={campaignQuery}
            campaignFilter={campaignFilter}
            selectedId={tab === 'campaigns' ? selectedCampaignId : selectedId}
            onTab={setTab}
            onQuery={setQuery}
            onFilter={setFilter}
            onCampaignQuery={setCampaignQuery}
            onCampaignFilter={setCampaignFilter}
            onSelect={tab === 'campaigns' ? setSelectedCampaignId : setSelectedId}
            onAdd={() => setAddOpen(true)}
            onCreateCampaign={() => setCreateOpen(true)}
          />
          <div className="cust-center">
            {tab === 'campaigns' ? (
              selectedCampaign ? (
                <CampaignDetail
                  campaign={selectedCampaign}
                  onApprove={() =>
                    decideCampaign('Active', 'Approved by you · Just now', 'Approved by you')
                  }
                  onRequestChanges={() =>
                    decideCampaign('Draft', 'Changes requested · Awaiting revision', 'Changes requested')
                  }
                  onReject={() =>
                    decideCampaign('Completed', 'Rejected · No further action', 'Rejected')
                  }
                  onPause={() => {
                    if (!selectedCampaign) return
                    const id = selectedCampaign.id
                    setCampaigns((list) =>
                      list.map((campaign) =>
                        campaign.id === id ? { ...campaign, paused: !campaign.paused } : campaign,
                      ),
                    )
                  }}
                  onExtend={() => {
                    if (!selectedCampaign) return
                    const id = selectedCampaign.id
                    setCampaigns((list) =>
                      list.map((campaign) =>
                        campaign.id === id
                          ? { ...campaign, when: campaign.when === 'Extended' ? 'Ongoing' : 'Extended' }
                          : campaign,
                      ),
                    )
                  }}
                />
              ) : (
                <section className="cust-detail" aria-label="Campaigns">
                  <h2>Campaigns</h2>
                </section>
              )
            ) : selected ? (
              <CustomerDetail customer={selected} />
            ) : null}
          </div>
        </div>
        <DashboardSidebar
          employeeName={employeeName}
          employeeRole={employeeRole}
          employeeGradient={employeeGradient}
        />
      </div>
      {addOpen ? <AddCustomerModal onClose={() => setAddOpen(false)} onAdd={addCustomer} /> : null}
      {createOpen ? (
        <CreateCampaignModal
          onClose={() => setCreateOpen(false)}
          onCreate={(draft) => {
            const next = createCampaign(draft, campaigns.length + 1)
            setCampaigns((list) => [next, ...list])
            setSelectedCampaignId(next.id)
            setTab('campaigns')
            setCampaignQuery('')
            setCampaignFilter('All')
            setCreateOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

function createCampaign(draft: NewCampaignDraft, index: number): Campaign {
  const initial = (draft.name.trim()[0] ?? 'C').toUpperCase()
  return {
    id: `draft-${index}-${initial.toLowerCase()}`,
    name: draft.name,
    status: 'Draft',
    members: draft.audience,
    channel: draft.channel,
    when: 'Not scheduled',
    ai: false,
    initial,
    tone: 'wine',
    sent: '—',
    opened: '—',
    redeemed: '—',
    conversion: '—',
    message: `${draft.name} is saved as a draft.`,
    reach: draft.audience,
    impact: '—',
    agentRec: 'No',
    history: 'Draft · Not yet submitted',
    preview: {
      brand: 'BREW & CO.',
      body: `${draft.name} is saved as a draft.`,
      cta: 'Claim Reward',
    },
    timeline: [{ title: 'Saved as draft', time: 'Just now' }],
  }
}

function createCustomer(draft: NewCustomerDraft, index: number): Customer {
  const parts = draft.name.split(/\s+/).filter(Boolean)
  const initial = (parts[0]?.[0] ?? 'C').toUpperCase()
  const initials = parts
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return {
    id: `new-${index}-${initials.toLowerCase()}`,
    name: draft.name,
    initial,
    tone: 'wine',
    tier: 'Starter',
    vip: false,
    beans: 0,
    lifetimeValue: 0,
    visits: 0,
    avgOrder: 0,
    lastVisit: 'Just added',
    frequency: 'New',
    phone: draft.phone,
    email: draft.email || '—',
    memberId: `BC-N${index}-${initials}`,
    campaignsOpened: '0/3',
    campaignsRedeemed: '0/3',
    nps: 0,
    npsLabel: 'New',
    notify: true,
    segments: ['New'],
  }
}
