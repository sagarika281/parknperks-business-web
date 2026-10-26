import { ProfileAvatar } from '@/shared/components'
import type { Employee } from '../types/employee'

export type { Employee }

type EmployeeCardProps = {
  employee: Employee
  onSelect?: (employee: Employee) => void
  disabled?: boolean
}

export function EmployeeCard({
  employee,
  onSelect,
  disabled,
}: EmployeeCardProps) {
  return (
    <button
      type="button"
      className="employee-card"
      disabled={disabled}
      onClick={() => onSelect?.(employee)}
    >
      <ProfileAvatar
        name={employee.name}
        gradient={employee.avatarGradient}
        size="sm"
      />
      <span className="employee-info">
        <span className="employee-name">{employee.name}</span>
        <span className="employee-role">{employee.role}</span>
        <span className={`employee-status is-${employee.statusTone}`}>
          {employee.status}
        </span>
      </span>
    </button>
  )
}
