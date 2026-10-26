import { EmployeeSessionProvider } from '@/shared/session'
import { AppRoutes } from '@/routes'
import './App.css'

function App() {
  return (
    <EmployeeSessionProvider>
      <AppRoutes />
    </EmployeeSessionProvider>
  )
}

export default App
