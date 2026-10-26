import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { WelcomeEmployee } from '@/pages/Welcome'

type EmployeeSessionValue = {
  employee: WelcomeEmployee | null
  signIn: (employee: WelcomeEmployee) => void
  clearEmployee: () => void
}

const EmployeeSessionContext = createContext<EmployeeSessionValue | null>(null)
const SESSION_KEY = 'parknperks-employee'

function readStoredEmployee(): WelcomeEmployee | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as WelcomeEmployee
    if (!parsed?.id || !parsed.name || !parsed.role || !parsed.avatarGradient) return null
    return {
      id: parsed.id,
      name: parsed.name,
      role: parsed.role,
      avatarGradient: parsed.avatarGradient,
    }
  } catch {
    return null
  }
}

export function EmployeeSessionProvider({ children }: { children: ReactNode }) {
  const [employee, setEmployee] = useState<WelcomeEmployee | null>(readStoredEmployee)

  const signIn = useCallback((next: WelcomeEmployee) => {
    const stored = {
      id: next.id,
      name: next.name,
      role: next.role,
      avatarGradient: next.avatarGradient,
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(stored))
    setEmployee(stored)
  }, [])

  const clearEmployee = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setEmployee(null)
  }, [])

  const value = useMemo(
    () => ({ employee, signIn, clearEmployee }),
    [employee, signIn, clearEmployee],
  )

  return (
    <EmployeeSessionContext.Provider value={value}>
      {children}
    </EmployeeSessionContext.Provider>
  )
}

export function useEmployeeSession() {
  const value = useContext(EmployeeSessionContext)
  if (!value) {
    throw new Error(
      'useEmployeeSession must be used within EmployeeSessionProvider',
    )
  }
  return value
}
