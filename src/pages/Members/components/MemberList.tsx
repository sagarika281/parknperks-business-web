import { FILTERS, type Member, type MemberFilter } from '../constants/members'

type MemberListProps = {
  members: Member[]
  selectedId: string
  query: string
  filter: MemberFilter
  lastVisit: string
  onQuery: (value: string) => void
  onFilter: (filter: MemberFilter) => void
  onLastVisit: (value: string) => void
  onSelect: (id: string) => void
}

export function MemberList({
  members,
  selectedId,
  query,
  filter,
  lastVisit,
  onQuery,
  onFilter,
  onLastVisit,
  onSelect,
}: MemberListProps) {
  return (
    <section className="members-panel" aria-label="Members">
      <header className="members-panel-head">
        <h2>Members</h2>
        <button type="button" className="members-import">
          + Import
        </button>
      </header>
      <input
        className="members-search"
        type="search"
        placeholder="Search by name or number..."
        value={query}
        onChange={(event) => onQuery(event.target.value)}
      />
      <div className="members-filters">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={filter === item.id ? 'is-active' : ''}
            onClick={() => onFilter(item.id)}
          >
            {item.label} {item.count}
          </button>
        ))}
        <label className="members-visit">
          <span className="visually-hidden">Last visit</span>
          <select value={lastVisit} onChange={(event) => onLastVisit(event.target.value)}>
            <option value="all">Last Visit</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last week">Last week</option>
          </select>
        </label>
      </div>
      <ul className="members-list">
        {members.map((member) => (
          <li key={member.id}>
            <button
              type="button"
              className={member.id === selectedId ? 'members-card is-selected' : 'members-card'}
              onClick={() => onSelect(member.id)}
            >
              <span className={`members-avatar is-${member.avatar}`} aria-hidden="true">
                {member.initial}
              </span>
              <span className="members-card-copy">
                <span className="members-card-name">
                  {member.name}
                  <span className={`members-tier is-${member.tier.toLowerCase()}`}>{member.tier}</span>
                  {member.milestone ? <span className="members-milestone">MILESTONE</span> : null}
                </span>
                <span className="members-card-meta">
                  {member.phoneList} · {member.visits} visits · {member.lastVisit === 'Last week' ? 'Last week' : `Last ${member.lastVisit}`}
                </span>
                <span className="members-card-value">Beans · ₹{member.beans * 10}</span>
              </span>
              <span className="members-card-beans">{member.beans}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
