import { useState } from 'react'

type PasswordFieldProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  autoComplete?: string
}

export function PasswordField({
  value,
  onChange,
  placeholder = 'Password',
  id = 'password',
  autoComplete = 'current-password',
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="auth-password-wrap">
      <input
        id={id}
        className="auth-input"
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="auth-eye"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M3 3l18 18M10.5 10.6A3 3 0 0 0 13.4 13.5M9.9 5.1A10.5 10.5 0 0 1 12 4.8c5.2 0 9.3 3.5 10.5 7.2a11 11 0 0 1-4.2 5.1M6.1 6.2A11 11 0 0 0 1.5 12c1.2 3.7 5.3 7.2 10.5 7.2 1.3 0 2.5-.2 3.6-.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <circle
              cx="12"
              cy="12"
              r="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
