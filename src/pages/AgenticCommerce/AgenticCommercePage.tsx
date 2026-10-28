import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DashboardSidebar } from '@/pages/Dashboard/components/DashboardSidebar'
import '@/pages/Dashboard/Dashboard.css'
import { ActionCentre, type CentreTab } from './components/ActionCentre'
import { ActionDetails } from './components/ActionDetails'
import { AgentActionPanel } from './components/AgentActionPanel'
import { PreparednessCalendar } from './components/PreparednessCalendar'
import {
  DEFAULT_ACTION_ID,
  createInitialActions,
  matchesFilter,
} from './constants/actions'
import {
  DEFAULT_PREP_EVENT,
  PREP_EVENTS,
  PREP_TODAY,
} from './constants/preparedness'
import type { PrepEvent } from './constants/preparedness'
import type { ActionFilter, AgenticAction } from './types/action'
import './AgenticCommerce.css'

type AgenticCommercePageProps = {
  employeeName: string
  employeeRole: string
  employeeGradient: string
}

function nowLabel() {
  return new Date().toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function AgenticCommercePage({
  employeeName,
  employeeRole,
  employeeGradient,
}: AgenticCommercePageProps) {
  const [actions, setActions] = useState<AgenticAction[]>(createInitialActions)
  const [filter, setFilter] = useState<ActionFilter>('all')
  const [tab, setTab] = useState<CentreTab>('actions')
  const [prepEvents, setPrepEvents] = useState<PrepEvent[]>(PREP_EVENTS)
  const [prepId, setPrepId] = useState(DEFAULT_PREP_EVENT)
  const [agentOpen, setAgentOpen] = useState(false)
  const [params, setParams] = useSearchParams()

  const requestedId = params.get('action')
  const selected = useMemo(() => {
    return (
      actions.find((action) => action.id === requestedId) ??
      actions.find((action) => action.id === DEFAULT_ACTION_ID) ??
      actions[0]
    )
  }, [actions, requestedId])

  const select = (id: string) => {
    const next = new URLSearchParams(params)
    next.set('action', id)
    setParams(next, { replace: true })
  }

  const patch = (id: string, update: (action: AgenticAction) => AgenticAction) => {
    setActions((current) =>
      current.map((action) => (action.id === id ? update(action) : action)),
    )
  }

  const createAction = () => {
    const id = `draft-${Date.now()}`
    const created: AgenticAction = {
      id,
      title: 'New Agentic Action',
      location: 'Bandra West',
      confidence: 70,
      due: 'Today',
      status: 'new',
      signal: 'clock',
      signalLabel: 'Manual Signal',
      impact: 'Impact pending',
      approver: 'Owner',
      trigger: 'Created from Action Centre',
      evidence: ['Add supporting evidence before this action is sent for approval.'],
      affected: 0,
      affectedLabel: 'members',
      cost: '₹0',
      predictedReturn: 'Return pending',
      revenue: 0,
      history: [{ title: 'Created by Owner', time: `Today ${nowLabel()}` }],
    }
    setActions((current) => [created, ...current])
    setFilter('all')
    setTab('actions')
    select(id)
  }

  const addPrepEvent = () => {
    const id = `event-${Date.now()}`
    const created: PrepEvent = {
      id,
      title: 'New Event',
      date: PREP_TODAY,
      time: '12:00',
      category: 'agent',
      tone: 'neutral',
      badges: [],
      outlet: 'Bandra West',
      responsible: 'Owner',
      summary: 'Added from the calendar.',
    }
    setPrepEvents((current) => [...current, created])
    setPrepId(id)
  }

  return (
    <div className="agentic-page">
      <div className="agentic-shell">
        <div className="agentic-workspace">
          <ActionCentre
            actions={actions}
            filter={filter}
            tab={tab}
            selectedId={selected.id}
            onFilter={(next) => {
              setFilter(next)
              const visible = actions.filter((action) => matchesFilter(action, next))
              if (visible[0] && !visible.some((action) => action.id === selected.id)) {
                select(visible[0].id)
              }
            }}
            onTab={setTab}
            onSelect={select}
            onCreate={createAction}
            prepEvents={prepEvents}
            prepSelectedId={prepId}
            onSelectPrep={setPrepId}
            onAddPrep={addPrepEvent}
          />
          {tab === 'calendar' ? (
            <PreparednessCalendar
              events={prepEvents}
              selectedId={prepId}
              onSelect={setPrepId}
              onScheduleAgent={() => setAgentOpen(true)}
            />
          ) : (
            <ActionDetails
              action={selected}
              onApprove={() =>
                patch(selected.id, (action) =>
                  action.status === 'needs-approval' || action.status === 'new'
                    ? {
                        ...action,
                        status: 'executing',
                        revenue: action.revenue || 0,
                        history: [
                          ...action.history.filter((entry) => entry.title !== 'Awaiting approval'),
                          { title: 'Approved by Owner', time: `Today ${nowLabel()}` },
                        ],
                      }
                    : action,
                )
              }
              onSchedule={() =>
                patch(selected.id, (action) =>
                  action.status === 'dismissed' || action.status === 'completed'
                    ? action
                    : {
                        ...action,
                        status: 'scheduled',
                        history: [
                          ...action.history,
                          { title: 'Scheduled by Owner', time: `Today ${nowLabel()}` },
                        ],
                      },
                )
              }
              onDelegate={() =>
                patch(selected.id, (action) => ({
                  ...action,
                  approver: 'Delegated',
                  history: [
                    ...action.history,
                    { title: 'Delegated by Owner', time: `Today ${nowLabel()}` },
                  ],
                }))
              }
              onDismiss={() =>
                patch(selected.id, (action) =>
                  action.status === 'dismissed'
                    ? action
                    : {
                        ...action,
                        status: 'dismissed',
                        history: [
                          ...action.history.filter((entry) => entry.title !== 'Awaiting approval'),
                          { title: 'Dismissed by Owner', time: `Today ${nowLabel()}` },
                        ],
                      },
                )
              }
              onRename={(title) =>
                patch(selected.id, (action) => ({
                  ...action,
                  title,
                }))
              }
            />
          )}
        </div>
        <DashboardSidebar
          employeeName={employeeName}
          employeeRole={employeeRole}
          employeeGradient={employeeGradient}
        />
      </div>
      {agentOpen ? (
        <AgentActionPanel
          role={employeeRole}
          employeeName={employeeName}
          onClose={() => setAgentOpen(false)}
          onOpenWorkspace={() => setAgentOpen(false)}
        />
      ) : null}
    </div>
  )
}
