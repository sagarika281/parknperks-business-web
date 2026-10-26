import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from 'react'

export type NewCustomerDraft = {
  name: string
  phone: string
  email: string
}

type AddCustomerModalProps = {
  onClose: () => void
  onAdd: (draft: NewCustomerDraft) => void
}

export function AddCustomerModal({ onClose, onAdd }: AddCustomerModalProps) {
  const titleId = useId()
  const nameRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    nameRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()
    if (!trimmedName || !trimmedPhone) return
    onAdd({
      name: trimmedName,
      phone: trimmedPhone,
      email: email.trim(),
    })
  }

  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="cust-modal-backdrop" onMouseDown={closeOnBackdrop}>
      <form
        className="cust-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={submit}
      >
        <h2 id={titleId}>Add Customer</h2>

        <label>
          <span>
            Full name <i>*</i>
          </span>
          <input
            ref={nameRef}
            value={name}
            placeholder="e.g. Riya Patel"
            autoComplete="name"
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          <span>
            Phone <i>*</i>
          </span>
          <input
            type="tel"
            value={phone}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            required
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            value={email}
            placeholder="riya.patel@email.com"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <div className="cust-modal-actions">
          <button type="submit">Add Customer</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
