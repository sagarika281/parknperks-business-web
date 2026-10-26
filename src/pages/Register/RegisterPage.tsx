import { useState, type FormEvent } from 'react'
import { PasswordField } from '@/pages/Login/components/PasswordField'
import { GoogleButton } from '@/pages/Login/components/GoogleButton'
import '@/pages/Login/Auth.css'

type RegisterPageProps = {
  onRegistered: () => void
  onBackToLogin?: () => void
}

export function RegisterPage({
  onRegistered,
  onBackToLogin,
}: RegisterPageProps) {
  const [fullName, setFullName] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onRegistered()
  }

  return (
    <div className="auth-page">
      <main className="auth-shell" aria-label="Create an account">
        <form className="auth-card" onSubmit={submit}>
          <h1 className="auth-title">Create an account</h1>

          <input
            className="auth-input"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
            aria-label="Full name"
          />

          <input
            className="auth-input"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email or phone number"
            autoComplete="username"
            aria-label="Email or phone number"
          />

          <PasswordField
            value={password}
            onChange={setPassword}
            id="register-password"
            autoComplete="new-password"
          />

          <button type="submit" className="auth-submit">
            Login
          </button>

          <p className="auth-or">OR</p>

          <GoogleButton onClick={onRegistered} />

          {onBackToLogin ? (
            <button
              type="button"
              className="auth-link auth-create"
              onClick={onBackToLogin}
            >
              Back to login
            </button>
          ) : null}
        </form>
      </main>
    </div>
  )
}
