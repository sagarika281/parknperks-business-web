import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { STOCK_CATEGORIES, type StockCategory } from '../constants/stock'

export type NewStockDraft = {
  name: string
  category: StockCategory
  unit: string
  quantity: number
  minimum: number
  unitCost: number
  supplier: string
}

type AddItemModalProps = {
  onClose: () => void
  onAdd: (draft: NewStockDraft) => void
}

const CATEGORIES = STOCK_CATEGORIES.filter((name): name is StockCategory => name !== 'All Items')

export function AddItemModal({ onClose, onAdd }: AddItemModalProps) {
  const titleId = useId()
  const nameRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState<StockCategory>('Beverages')
  const [unit, setUnit] = useState('kg')
  const [quantity, setQuantity] = useState('0')
  const [minimum, setMinimum] = useState('0')
  const [unitCost, setUnitCost] = useState('0')
  const [supplier, setSupplier] = useState('')

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
    const trimmedSupplier = supplier.trim()
    if (!trimmedName || !trimmedSupplier) return
    onAdd({
      name: trimmedName,
      category,
      unit: unit.trim() || 'kg',
      quantity: toNumber(quantity),
      minimum: toNumber(minimum),
      unitCost: toNumber(unitCost),
      supplier: trimmedSupplier,
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
        <h2 id={titleId}>Add Inventory Item</h2>

        <label>
          <span>
            Item name <i>*</i>
          </span>
          <input
            ref={nameRef}
            value={name}
            placeholder="e.g. Oat Milk"
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <div className="inv-modal-row is-two">
          <label>
            <span>
              Category <i>*</i>
            </span>
            <select value={category} onChange={(event) => setCategory(event.target.value as StockCategory)}>
              {CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>
              Unit <i>*</i>
            </span>
            <input value={unit} required onChange={(event) => setUnit(event.target.value)} />
          </label>
        </div>

        <div className="inv-modal-row is-three">
          <label>
            <span>
              Qty <i>*</i>
            </span>
            <input
              inputMode="decimal"
              value={quantity}
              required
              onChange={(event) => setQuantity(event.target.value)}
            />
          </label>
          <label>
            <span>
              Min qty <i>*</i>
            </span>
            <input
              inputMode="decimal"
              value={minimum}
              required
              onChange={(event) => setMinimum(event.target.value)}
            />
          </label>
          <label>
            <span>
              Cost/unit <i>*</i>
            </span>
            <input
              inputMode="decimal"
              value={unitCost}
              required
              onChange={(event) => setUnitCost(event.target.value)}
            />
          </label>
        </div>

        <label>
          <span>
            Supplier <i>*</i>
          </span>
          <input
            value={supplier}
            placeholder="e.g. Blue Tokai"
            required
            onChange={(event) => setSupplier(event.target.value)}
          />
        </label>

        <div className="inv-modal-actions">
          <button type="submit">Add Item</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function toNumber(value: string) {
  const next = Number(value)
  return Number.isFinite(next) ? next : 0
}
