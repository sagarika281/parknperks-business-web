import { useRef, useState } from 'react'
import { DashboardSidebar } from '@/pages/Dashboard/components/DashboardSidebar'
import '@/pages/Dashboard/Dashboard.css'
import { BrandProfilePanel } from './components/BrandProfilePanel'
import { IntegrationsPanel } from './components/IntegrationsPanel'
import { JulesSettingsPanel } from './components/JulesSettingsPanel'
import { LegalPanel } from './components/LegalPanel'
import { OutletsPanel } from './components/OutletsPanel'
import { SettingsNav } from './components/SettingsNav'
import { StaffPanel } from './components/StaffPanel'
import { SubscriptionPanel } from './components/SubscriptionPanel'
import { cloneProfile, loadProfile, type BrandProfile } from './constants/profile'
import type { SettingsSectionId } from './constants/sections'
import './Settings.css'

type SettingsPageProps = {
  employeeName: string
  employeeRole: string
  employeeGradient: string
  onSignOut: () => void
}

export function SettingsPage({
  employeeName,
  employeeRole,
  employeeGradient,
  onSignOut,
}: SettingsPageProps) {
  const [section, setSection] = useState<SettingsSectionId>('brand')
  const [profile, setProfile] = useState<BrandProfile>(() => loadProfile())
  const centerRef = useRef<HTMLDivElement>(null)

  const select = (id: SettingsSectionId) => {
    setSection(id)
    centerRef.current?.scrollTo({ top: 0 })
  }

  return (
    <div className="set-page">
      <div className="set-shell">
        <div className="set-workspace">
          <SettingsNav section={section} onSelect={select} onSignOut={onSignOut} />
          <div className="set-center" ref={centerRef}>
            {section === 'brand' ? (
              <BrandProfilePanel
                profile={profile}
                onChange={(next) => setProfile(cloneProfile(next))}
              />
            ) : null}
            {section === 'outlets' ? <OutletsPanel /> : null}
            {section === 'staff' ? <StaffPanel /> : null}
            {section === 'jules' ? <JulesSettingsPanel /> : null}
            {section === 'subscription' ? <SubscriptionPanel /> : null}
            {section === 'integrations' ? <IntegrationsPanel /> : null}
            {section === 'legal' ? <LegalPanel /> : null}
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
