import { useEffect, useState } from 'react'
import {
  CATEGORIES,
  cloneProfile,
  formatTimeLabel,
  PROFILE_STORAGE_KEY,
  type BrandProfile,
  type DayId,
} from '../constants/profile'

type BrandProfilePanelProps = {
  profile: BrandProfile
  onChange: (profile: BrandProfile) => void
}

function readImage(file: File, onLoad: (url: string) => void) {
  if (!file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') onLoad(reader.result)
  }
  reader.readAsDataURL(file)
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  inputMode,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
}) {
  return (
    <label className="set-field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8.6V12l2.2 1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function BrandProfilePanel({ profile, onChange }: BrandProfilePanelProps) {
  const [saved, setSaved] = useState(() => cloneProfile(profile))
  const [notice, setNotice] = useState('')
  const dirty = JSON.stringify(profile) !== JSON.stringify(saved)

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(''), 2200)
    return () => window.clearTimeout(timer)
  }, [notice])

  const patch = (next: Partial<BrandProfile>) => {
    onChange({ ...profile, ...next })
  }

  const setHour = (id: DayId, next: Partial<BrandProfile['hours'][number]>) => {
    onChange({
      ...profile,
      hours: profile.hours.map((day) => (day.id === id ? { ...day, ...next } : day)),
    })
  }

  const save = () => {
    const next = cloneProfile(profile)
    setSaved(next)
    try {
      sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* keep the in-memory profile if storage is full */
    }
    setNotice('Profile saved')
  }

  return (
    <form
      className="set-form"
      onSubmit={(event) => {
        event.preventDefault()
        save()
      }}
    >
      <header className="set-head">
        <h1>Brand Profile</h1>
        <p>Manage your brand identity and contact details.</p>
      </header>

      <section className="set-card" aria-label="Identity">
        <label className={profile.coverUrl ? 'set-cover has-image' : 'set-cover'}>
          <input
            type="file"
            accept="image/*"
            aria-label="Upload cover photo"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) readImage(file, (coverUrl) => patch({ coverUrl }))
              event.target.value = ''
            }}
          />
          {profile.coverUrl ? <img src={profile.coverUrl} alt="" /> : null}
          <span className="set-cover-hint">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="9" cy="10" r="1.3" fill="currentColor" />
              <path d="M4.5 16.2l4-3 3 2.2 2.2-1.5 5.3 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            {profile.coverUrl ? 'Change cover photo' : 'Click to upload cover photo'}
          </span>
        </label>

        <div className="set-brandline">
          <label className={profile.logoUrl ? 'set-logo has-image' : 'set-logo'}>
            <input
              type="file"
              accept="image/*"
              aria-label="Upload logo"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) readImage(file, (logoUrl) => patch({ logoUrl }))
                event.target.value = ''
              }}
            />
            {profile.logoUrl ? (
              <img src={profile.logoUrl} alt="" />
            ) : (
              <>
                <b>B</b>
                <small>Logo</small>
              </>
            )}
          </label>
          <div className="set-brandcopy">
            <strong>{profile.businessName || 'Brand name'}</strong>
            <p>{profile.tagline || 'Tagline'}</p>
          </div>
        </div>

        <h2>Identity</h2>
        <div className="set-grid">
          <Field
            label="Business name"
            value={profile.businessName}
            autoComplete="organization"
            onChange={(businessName) => patch({ businessName })}
          />
          <Field
            label="Tagline"
            value={profile.tagline}
            onChange={(tagline) => patch({ tagline })}
          />
          <label className="set-field">
            <span>Category</span>
            <span className="set-select">
              <select
                value={profile.category}
                onChange={(event) => patch({ category: event.target.value })}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <Field label="GSTIN" value={profile.gstin} onChange={(gstin) => patch({ gstin })} />
        </div>
      </section>

      <section className="set-card" aria-label="Contact and online presence">
        <h2>Contact &amp; online presence</h2>
        <div className="set-grid">
          <Field
            label="Email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={profile.email}
            onChange={(email) => patch({ email })}
          />
          <Field
            label="Phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={profile.phone}
            onChange={(phone) => patch({ phone })}
          />
          <Field
            label="WhatsApp"
            type="tel"
            inputMode="tel"
            value={profile.whatsapp}
            onChange={(whatsapp) => patch({ whatsapp })}
          />
          <Field
            label="Website"
            autoComplete="url"
            value={profile.website}
            onChange={(website) => patch({ website })}
          />
          <Field
            label="Instagram"
            value={profile.instagram}
            onChange={(instagram) => patch({ instagram })}
          />
          <Field
            label="Google Business"
            value={profile.googleBusiness}
            onChange={(googleBusiness) => patch({ googleBusiness })}
          />
        </div>
      </section>

      <section className="set-card" aria-label="Registered address">
        <h2>Registered address</h2>
        <div className="set-grid is-address">
          <Field
            label="Address line 1"
            autoComplete="address-line1"
            value={profile.address1}
            onChange={(address1) => patch({ address1 })}
          />
          <Field
            label="Address line 2"
            autoComplete="address-line2"
            value={profile.address2}
            onChange={(address2) => patch({ address2 })}
          />
          <Field
            label="City"
            autoComplete="address-level2"
            value={profile.city}
            onChange={(city) => patch({ city })}
          />
          <Field
            label="State"
            autoComplete="address-level1"
            value={profile.state}
            onChange={(state) => patch({ state })}
          />
          <Field
            label="Pincode"
            inputMode="numeric"
            autoComplete="postal-code"
            value={profile.pincode}
            onChange={(pincode) => patch({ pincode })}
          />
        </div>
      </section>

      <section className="set-card is-hours" aria-label="Business hours">
        <h2>Business hours</h2>
        <div className="set-hours">
          {profile.hours.map((day) => (
            <div key={day.id} className={day.open ? 'set-hour' : 'set-hour is-closed'}>
              <span className="set-day">{day.label}</span>
              <button
                type="button"
                className={day.open ? 'set-switch is-on' : 'set-switch'}
                role="switch"
                aria-checked={day.open}
                aria-label={`${day.label} ${day.open ? 'open' : 'closed'}`}
                onClick={() => setHour(day.id, { open: !day.open })}
              >
                <span />
              </button>
              {day.open ? (
                <div className="set-hour-times">
                  <label className="set-time">
                    <span>{formatTimeLabel(day.start)}</span>
                    <input
                      type="time"
                      value={day.start}
                      aria-label={`${day.label} opening time`}
                      onChange={(event) => {
                        if (event.target.value) setHour(day.id, { start: event.target.value })
                      }}
                    />
                    <ClockIcon />
                  </label>
                  <span className="set-to">to</span>
                  <label className="set-time">
                    <span>{formatTimeLabel(day.end)}</span>
                    <input
                      type="time"
                      value={day.end}
                      aria-label={`${day.label} closing time`}
                      onChange={(event) => {
                        if (event.target.value) setHour(day.id, { end: event.target.value })
                      }}
                    />
                    <ClockIcon />
                  </label>
                </div>
              ) : (
                <span className="set-closed">Closed</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="set-actions">
        <p className="set-notice" role="status">
          {notice}
        </p>
        <button
          type="button"
          className="set-discard"
          onClick={() => {
            if (!dirty) return
            onChange(cloneProfile(saved))
            setNotice('')
          }}
        >
          Discard
        </button>
        <button type="submit" className="set-save">
          Save Profile
        </button>
      </div>
    </form>
  )
}
