import type { LifestyleId } from '../constants/lifestyle'
import type { ProgrammeId } from '../constants/programme'
import { LifestyleRailPanel } from './LifestyleRailPanel'
import { LoyaltyRailPanel } from './LoyaltyRailPanel'

type RailTab = 'loyalty' | 'lifestyle'

type LoyaltyRailProps = {
  tab: RailTab
  selectedId: ProgrammeId
  lifestyleId: LifestyleId
  onTab: (tab: RailTab) => void
  onSelect: (id: ProgrammeId) => void
  onSelectLifestyle: (id: LifestyleId) => void
  onCreate: () => void
}

export function LoyaltyRail({
  tab,
  selectedId,
  lifestyleId,
  onTab,
  onSelect,
  onSelectLifestyle,
  onCreate,
}: LoyaltyRailProps) {
  return (
    <aside className="loyalty-rail" aria-label="Loyalty and lifestyle">
      <h1>Loyalty &amp; Lifestyle</h1>
      <div className="loyalty-tabs" role="tablist" aria-label="Programme views">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'loyalty'}
          className={tab === 'loyalty' ? 'is-active' : ''}
          onClick={() => onTab('loyalty')}
        >
          <span className="tab-icon is-heart" aria-hidden="true">
            <HeartIcon />
          </span>
          Loyalty
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'lifestyle'}
          className={tab === 'lifestyle' ? 'is-active' : ''}
          onClick={() => onTab('lifestyle')}
        >
          <span className="tab-icon" aria-hidden="true">
            <GridIcon />
          </span>
          Lifestyle
        </button>
      </div>

      {tab === 'loyalty' ? (
        <LoyaltyRailPanel selectedId={selectedId} onSelect={onSelect} />
      ) : (
        <LifestyleRailPanel selectedId={lifestyleId} onSelect={onSelectLifestyle} />
      )}

      <div className="loyalty-create">
        <button type="button" onClick={onCreate}>
          {tab === 'lifestyle' ? 'Manage Lifestyle Bridge' : '+ Create Programme Element'}
        </button>
      </div>
    </aside>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
      <path
        d="M8 13.2S3.4 10.2 3.4 6.8C3.4 5 4.7 3.8 6.2 3.8c.9 0 1.6.4 1.8 1.1.2-.7.9-1.1 1.8-1.1 1.5 0 2.8 1.2 2.8 3C12.6 10.2 8 13.2 8 13.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <rect x="1.5" y="1.5" width="5.2" height="5.2" rx="1.1" />
      <rect x="9.3" y="1.5" width="5.2" height="5.2" rx="1.1" />
      <rect x="1.5" y="9.3" width="5.2" height="5.2" rx="1.1" />
      <rect x="9.3" y="9.3" width="5.2" height="5.2" rx="1.1" />
    </svg>
  )
}

export type { RailTab }
