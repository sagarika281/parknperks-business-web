import { useState } from 'react'

export function CounterForm() {
  const [mobile, setMobile] = useState('')

  return (
    <section className="counter-form" aria-label="Counter">
      <h1>Counter</h1>
      <p className="counter-form-sub">Scan or enter customer number</p>
      <label className="counter-form-label" htmlFor="customer-mobile">
        Customer mobile number
      </label>
      <input
        id="customer-mobile"
        className="counter-form-input"
        inputMode="numeric"
        autoComplete="tel"
        maxLength={10}
        placeholder="Enter 10-digit number"
        value={mobile}
        onChange={(event) => setMobile(event.target.value.replace(/\D/g, '').slice(0, 10))}
      />
      <button type="button" className="counter-scan">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path
            d="M2.5 5.5V3.2h2.3M11.2 3.2h2.3v2.3M13.5 10.5v2.3h-2.3M4.8 12.8H2.5v-2.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path d="M5 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        Scan QR
      </button>
      <button type="button" className="counter-new">
        + New Member
      </button>
    </section>
  )
}
