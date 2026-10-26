import { useState } from 'react'
import { DashboardSidebar } from '@/pages/Dashboard/components/DashboardSidebar'
import '@/pages/Dashboard/Dashboard.css'
import { ActivityAudit } from './components/ActivityAudit'
import { BridgePerformance } from './components/BridgePerformance'
import { ConversionRules } from './components/ConversionRules'
import { EligibilityLimits } from './components/EligibilityLimits'
import { Settlement } from './components/Settlement'
import { LifestyleBridge } from './components/LifestyleBridge'
import { LifestyleSettings } from './components/LifestyleSettings'
import { MemberExperience } from './components/MemberExperience'
import { WalletConnection } from './components/WalletConnection'
import { BrandCurrencyLedger } from './components/BrandCurrencyLedger'
import { LoyaltyRail, type RailTab } from './components/LoyaltyRail'
import { MemberWalletPanel } from './components/MemberWalletPanel'
import { MilestoneCard } from './components/MilestoneCard'
import { ProgrammeBoard } from './components/ProgrammeBoard'
import { ProgrammePerformance } from './components/ProgrammePerformance'
import { TierStructure } from './components/TierStructure'
import { ValueBackRules } from './components/ValueBackRules'
import type { LifestyleId } from './constants/lifestyle'
import type { ProgrammeId } from './constants/programme'
import './Loyalty.css'

type LoyaltyPageProps = {
  employeeName: string
  employeeRole: string
  employeeGradient: string
}

export function LoyaltyPage({
  employeeName,
  employeeRole,
  employeeGradient,
}: LoyaltyPageProps) {
  const [tab, setTab] = useState<RailTab>('loyalty')
  const [selectedId, setSelectedId] = useState<ProgrammeId>('setup')
  const [lifestyleId, setLifestyleId] = useState<LifestyleId>('overview')

  const select = (id: ProgrammeId) => {
    setSelectedId(id)
    setTab('loyalty')
    document.querySelector('.loyalty-center')?.scrollTo({ top: 0 })
  }

  const selectLifestyle = (id: LifestyleId) => {
    setLifestyleId(id)
    setTab('lifestyle')
    document.querySelector('.loyalty-center')?.scrollTo({ top: 0 })
  }

  return (
    <div className="loyalty-page">
      <div className="loyalty-shell">
        <div className="loyalty-workspace">
          <LoyaltyRail
            tab={tab}
            selectedId={selectedId}
            lifestyleId={lifestyleId}
            onTab={(next) => {
              setTab(next)
              document.querySelector('.loyalty-center')?.scrollTo({ top: 0 })
            }}
            onSelect={select}
            onSelectLifestyle={selectLifestyle}
            onCreate={() => {
              if (tab === 'lifestyle') selectLifestyle('overview')
            }}
          />
          <div className="loyalty-center">
            {tab === 'loyalty' && selectedId === 'setup' ? (
              <ProgrammeBoard
                onEdit={() => undefined}
                onPause={() => undefined}
                onPerformance={() => select('performance')}
                onReviewTiers={() => select('tiers')}
                onViewInsight={() => undefined}
              />
            ) : tab === 'loyalty' && selectedId === 'value' ? (
              <ValueBackRules />
            ) : tab === 'loyalty' && selectedId === 'milestone' ? (
              <MilestoneCard />
            ) : tab === 'loyalty' && selectedId === 'tiers' ? (
              <TierStructure />
            ) : tab === 'loyalty' && selectedId === 'currency' ? (
              <BrandCurrencyLedger />
            ) : tab === 'loyalty' && selectedId === 'wallet' ? (
              <MemberWalletPanel />
            ) : tab === 'loyalty' && selectedId === 'performance' ? (
              <ProgrammePerformance />
            ) : lifestyleId === 'overview' ? (
              <LifestyleBridge
                onPreview={() => undefined}
                onEditRatio={() => selectLifestyle('ratio')}
                onManage={() => selectLifestyle('overview')}
              />
            ) : lifestyleId === 'wallet' ? (
              <WalletConnection />
            ) : lifestyleId === 'experience' ? (
              <MemberExperience />
            ) : lifestyleId === 'rules' || lifestyleId === 'ratio' ? (
              <ConversionRules />
            ) : lifestyleId === 'eligibility' ? (
              <EligibilityLimits />
            ) : lifestyleId === 'settlement' ? (
              <Settlement />
            ) : lifestyleId === 'audit' ? (
              <ActivityAudit />
            ) : lifestyleId === 'performance' ? (
              <BridgePerformance />
            ) : (
              <LifestyleSettings />
            )}
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
