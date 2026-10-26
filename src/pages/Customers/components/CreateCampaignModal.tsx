import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from 'react'

export const CAMPAIGN_AUDIENCES = [
  'All members',
  'Legend members',
  'Lapsed members',
  'New members',
  'Regular members',
] as const

export const CAMPAIGN_CHANNELS = ['WhatsApp', 'SMS', 'Push', 'Automated'] as const

export type NewCampaignDraft = {
  name: string
  audience: (typeof CAMPAIGN_AUDIENCES)[number]
  channel: (typeof CAMPAIGN_CHANNELS)[number]
}

type CreateCampaignModalProps = {
  onClose: () => void
  onCreate: (draft: NewCampaignDraft) => void
}

export function CreateCampaignModal({ onClose, onCreate }: CreateCampaignModalProps) {
  const titleId = useId()
  const nameRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [audience, setAudience] = useState<NewCampaignDraft['audience']>('All members')
  const [channel, setChannel] = useState<NewCampaignDraft['channel']>('WhatsApp')

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
    if (!trimmedName) return
    onCreate({ name: trimmedName, audience, channel })
  }

  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="cust-modal-backdrop" onMouseDown={closeOnBackdrop}>
      <form
        className="cust-modal camp-create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={submit}
      >
        <h2 id={titleId}>Create Campaign</h2>

        <label>
          <span>
            Campaign name <i>*</i>
          </span>
          <input
            ref={nameRef}
            value={name}
            placeholder="e.g. Monsoon Special Offer"
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          <span>Audience</span>
          <select value={audience} onChange={(event) => setAudience(event.target.value as NewCampaignDraft['audience'])}>
            {CAMPAIGN_AUDIENCES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Channel</span>
          <select value={channel} onChange={(event) => setChannel(event.target.value as NewCampaignDraft['channel'])}>
            {CAMPAIGN_CHANNELS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="cust-modal-actions">
          <button type="submit">Create Draft</button>
          <button type="button" className="is-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
