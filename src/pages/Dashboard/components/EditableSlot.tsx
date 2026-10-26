import type { ReactNode } from 'react'

type EditableSlotProps = {
  editing: boolean
  label: string
  size: 'cafe' | 'wide' | 'half' | 'full'
  onRemove: () => void
  children: ReactNode
}

export function EditableSlot({ editing, label, size, onRemove, children }: EditableSlotProps) {
  return (
    <div className={editing ? `dash-edit-slot is-${size} is-editing` : `dash-edit-slot is-${size}`}>
      {editing ? (
        <>
          <button
            type="button"
            className="dash-edit-remove"
            aria-label={`Remove ${label}`}
            onClick={onRemove}
          >
            <svg viewBox="0 0 16 16" width="8" height="8" aria-hidden="true">
              <path
                d="M3.6 3.6 12.4 12.4M12.4 3.6 3.6 12.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="dash-edit-drag">{label} - drag to move</span>
        </>
      ) : null}
      {children}
    </div>
  )
}
