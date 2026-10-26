import { useCallback } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { AgenticCommercePage } from '@/pages/AgenticCommerce'
import { InventoryPage } from '@/pages/Inventory'
import { CustomersPage } from '@/pages/Customers'
import { LoyaltyPage } from '@/pages/Loyalty'
import { CounterPage } from '@/pages/Counter'
import { MembersPage } from '@/pages/Members'
import { SettingsPage } from '@/pages/Settings'
import { DashboardPage } from '@/pages/Dashboard'
import { HomePage } from '@/pages/Home'
import { DEMO_EMPLOYEE } from '@/pages/Home/constants/employees'
import { LoginPage } from '@/pages/Login'
import { RegisterPage } from '@/pages/Register'
import { VerifiedPage } from '@/pages/Verified'
import { WelcomePage } from '@/pages/Welcome'
import { useEmployeeSession } from '@/shared/session'
import { paths } from './paths'

function LoginRoute() {
  const navigate = useNavigate()

  return (
    <LoginPage
      onLogin={() => navigate(paths.home)}
      onCreateAccount={() => navigate(paths.register)}
    />
  )
}

function RegisterRoute() {
  const navigate = useNavigate()

  return (
    <RegisterPage
      onRegistered={() => navigate(paths.home)}
      onBackToLogin={() => navigate(paths.login)}
    />
  )
}

function HomeRoute() {
  const navigate = useNavigate()
  const { signIn } = useEmployeeSession()

  return (
    <HomePage
      onPinSuccess={(employee) => {
        signIn(employee)
        navigate(paths.verified)
      }}
      onSkipDemo={() => {
        signIn(DEMO_EMPLOYEE)
        navigate(paths.dashboard)
      }}
    />
  )
}

function VerifiedRoute() {
  const navigate = useNavigate()
  const { employee } = useEmployeeSession()
  const goWelcome = useCallback(() => {
    navigate(paths.welcome, { replace: true })
  }, [navigate])

  if (!employee) return <Navigate to={paths.home} replace />

  return <VerifiedPage onDone={goWelcome} />
}

function WelcomeRoute() {
  const navigate = useNavigate()
  const { employee, clearEmployee } = useEmployeeSession()

  if (!employee) return <Navigate to={paths.home} replace />

  return (
    <WelcomePage
      employee={employee}
      onStartShift={() => navigate(paths.dashboard)}
      onSignInAsSomeoneElse={() => {
        clearEmployee()
        navigate(paths.home)
      }}
    />
  )
}

function DashboardRoute() {
  const navigate = useNavigate()
  const { employee, clearEmployee } = useEmployeeSession()

  if (!employee) return <Navigate to={paths.login} replace />

  return (
    <DashboardPage
      employee={employee}
      onSignOut={() => {
        clearEmployee()
        navigate(paths.login)
      }}
    />
  )
}

function CounterRoute() {
  const { employee } = useEmployeeSession()

  if (!employee) return <Navigate to={paths.login} replace />

  return (
    <CounterPage
      employeeName={employee.name}
      employeeRole={employee.role}
      employeeGradient={employee.avatarGradient}
    />
  )
}

function AgenticCommerceRoute() {
  const { employee } = useEmployeeSession()

  if (!employee) return <Navigate to={paths.login} replace />

  return (
    <AgenticCommercePage
      employeeName={employee.name}
      employeeRole={employee.role}
      employeeGradient={employee.avatarGradient}
    />
  )
}

function LoyaltyRoute() {
  const { employee } = useEmployeeSession()

  if (!employee) return <Navigate to={paths.login} replace />

  return (
    <LoyaltyPage
      employeeName={employee.name}
      employeeRole={employee.role}
      employeeGradient={employee.avatarGradient}
    />
  )
}

function InventoryRoute() {
  const { employee } = useEmployeeSession()

  if (!employee) return <Navigate to={paths.login} replace />

  return (
    <InventoryPage
      employeeName={employee.name}
      employeeRole={employee.role}
      employeeGradient={employee.avatarGradient}
    />
  )
}

function CustomersRoute() {
  const { employee } = useEmployeeSession()

  if (!employee) return <Navigate to={paths.login} replace />

  return (
    <CustomersPage
      employeeName={employee.name}
      employeeRole={employee.role}
      employeeGradient={employee.avatarGradient}
    />
  )
}

function SettingsRoute() {
  const navigate = useNavigate()
  const { employee, clearEmployee } = useEmployeeSession()

  if (!employee) return <Navigate to={paths.login} replace />

  return (
    <SettingsPage
      employeeName={employee.name}
      employeeRole={employee.role}
      employeeGradient={employee.avatarGradient}
      onSignOut={() => {
        clearEmployee()
        navigate(paths.login)
      }}
    />
  )
}

function MembersRoute() {
  const { employee } = useEmployeeSession()

  if (!employee) return <Navigate to={paths.login} replace />

  return (
    <MembersPage
      employeeName={employee.name}
      employeeRole={employee.role}
      employeeGradient={employee.avatarGradient}
    />
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={paths.login} replace />} />
      <Route path={paths.login} element={<LoginRoute />} />
      <Route path={paths.register} element={<RegisterRoute />} />
      <Route path={paths.home} element={<HomeRoute />} />
      <Route path={paths.verified} element={<VerifiedRoute />} />
      <Route path={paths.welcome} element={<WelcomeRoute />} />
      <Route path={paths.dashboard} element={<DashboardRoute />} />
      <Route path={paths.counter} element={<CounterRoute />} />
      <Route path={paths.members} element={<MembersRoute />} />
      <Route path={paths.agenticCommerce} element={<AgenticCommerceRoute />} />
      <Route path={paths.loyalty} element={<LoyaltyRoute />} />
      <Route path={paths.inventory} element={<InventoryRoute />} />
      <Route path={paths.customers} element={<CustomersRoute />} />
      <Route path={paths.settings} element={<SettingsRoute />} />
      <Route path="*" element={<Navigate to={paths.login} replace />} />
    </Routes>
  )
}
