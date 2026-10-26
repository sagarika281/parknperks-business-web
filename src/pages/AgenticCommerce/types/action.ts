export type ActionStatus =
  | 'needs-approval'
  | 'executing'
  | 'scheduled'
  | 'new'
  | 'completed'
  | 'dismissed'

export type ActionFilter =
  | 'all'
  | 'new'
  | 'approval'
  | 'scheduled'
  | 'executing'
  | 'completed'
  | 'dismissed'

export type ActionSignal =
  | 'weather'
  | 'chart'
  | 'beans'
  | 'members'
  | 'stock'
  | 'check'
  | 'clock'

export type ActionHistoryEntry = {
  title: string
  time: string
}

export type AgenticAction = {
  id: string
  title: string
  location: string
  confidence: number
  due: string
  status: ActionStatus
  highPriority?: boolean
  agentRecommended?: boolean
  signal: ActionSignal
  signalLabel: string
  impact: string
  approver: string
  trigger: string
  evidence: string[]
  affected: number
  affectedLabel: string
  cost: string
  predictedReturn: string
  revenue: number
  history: ActionHistoryEntry[]
}
