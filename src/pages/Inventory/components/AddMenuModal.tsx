import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { MENU_FILTERS, type MenuCategory } from '../constants/menu'

export type NewMenuDraft = {
  name: string
  category: MenuCategory
  price: number
  description: string
}

type AddMenuModalProps = {
  onClose: () => void
  onAdd: (draft: NewMenuDraft) => void
  initial?: NewMenuDraft
  title?: string
  submitLabel?: string
}

const CATEGORIES = MENU_FILTERS.filter((name): name is MenuCategory => name !== 'All')

export function AddMenuModal({
  onClose,
  onAdd,
  initial,
  title = 'Add Menu Item',
  submitLabel = 'Add to Menu',
}: AddMenuModalProps) {
  const titleId = useId()
  const nameRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(initial?.name ?? '')
  const [category, setCategory] = useState<MenuCategory>(initial?.category ?? 'Hot Beverages')
  const [price, setPrice] = useState(initial ? String(initial.price) : '0')
  const [description, setDescription] = useState(initial?.description ?? '')

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
    const trimmed = name.trim()
    if (!trimmed) return
    const nextPrice = Number(price)
    onAdd({
      name: trimmed,
      category,
      price: Number.isFinite(nextPrice) ? nextPrice : 0,
      description: description.trim(),
    })
  }

  return (
    <div className="inv-modal-backdrop">
      <form
        className="inv-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={submit}
      >
        <h2 id={titleId}>{title}</h2>

        <div className="inv-modal-name">
          <div className="inv-modal-icon">
            <span>Icon</span>
            <button type="button" aria-label="Item icon">
              <CupIcon />
            </button>
          </div>
          <label>
            <span>
              Item name <i>*</i>
            </span>
            <input
              ref={nameRef}
              value={name}
              placeholder="e.g. Caramel Latte"
              required
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>

        <div className="inv-modal-row is-two">
          <label>
            <span>
              Category <i>*</i>
            </span>
            <select value={category} onChange={(event) => setCategory(event.target.value as MenuCategory)}>
              {CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>
              Price (₹) <i>*</i>
            </span>
            <input
              inputMode="decimal"
              value={price}
              required
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>
        </div>

        <label>
          <span>Description</span>
          <input
            value={description}
            placeholder="Short description of the item"
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <div className="inv-modal-actions">
          <button type="submit">{submitLabel}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function CupIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M4.2 5.2h6.4v4.6a2 2 0 0 1-2 2H6.2a2 2 0 0 1-2-2V5.2Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.6 6.2h1.2a1.4 1.4 0 0 1 0 2.8h-1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}
