import { useMemo, useState } from 'react'
import { DashboardSidebar } from '@/pages/Dashboard/components/DashboardSidebar'
import { WorkspaceTabs } from '@/pages/Counter/components/WorkspaceTabs'
import { MemberList } from './components/MemberList'
import { MemberProfile } from './components/MemberProfile'
import { MEMBERS, type MemberFilter } from './constants/members'
import '@/pages/Dashboard/Dashboard.css'
import '@/pages/Counter/Counter.css'
import './Members.css'

type MembersPageProps = {
  employeeName: string
  employeeRole: string
  employeeGradient: string
}

export function MembersPage({
  employeeName,
  employeeRole,
  employeeGradient,
}: MembersPageProps) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<MemberFilter>('all')
  const [lastVisit, setLastVisit] = useState('all')
  const [selectedId, setSelectedId] = useState('aarav')

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return MEMBERS.filter((member) => {
      if (filter === 'active' && member.status !== 'active') return false
      if (filter === 'at-risk' && member.status !== 'at-risk') return false
      if (filter === 'new' && member.status !== 'new') return false
      if (filter === 'milestone' && !member.milestone) return false
      if (lastVisit !== 'all' && member.lastVisit !== lastVisit) return false
      if (!needle) return true
      const digits = needle.replace(/\D/g, '')
      return (
        member.name.toLowerCase().includes(needle) ||
        member.phoneList.toLowerCase().includes(needle) ||
        (digits.length > 0 && member.phone.includes(digits))
      )
    })
  }, [filter, lastVisit, query])

  const selected = MEMBERS.find((member) => member.id === selectedId) ?? visible[0] ?? MEMBERS[0]

  return (
    <div className="counter-page">
      <div className="counter-shell">
        <div className="counter-workspace">
          <WorkspaceTabs />
          <div className="counter-body">
            <MemberList
              members={visible}
              selectedId={selected.id}
              query={query}
              filter={filter}
              lastVisit={lastVisit}
              onQuery={setQuery}
              onFilter={setFilter}
              onLastVisit={setLastVisit}
              onSelect={setSelectedId}
            />
            <MemberProfile member={selected} />
          </div>
        </div>
        <DashboardSidebar
          employeeName={employeeName}
          employeeRole={employeeRole}
          employeeGradient={employeeGradient}
        />
      </div>
    </div>
  )
}
