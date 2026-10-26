import { useState, type FormEvent } from 'react'
import { PasswordField } from './components/PasswordField'
import { GoogleButton } from './components/GoogleButton'
import './Auth.css'

type LoginPageProps = {
  onLogin: () => void
  onCreateAccount: () => void
}

export function LoginPage({ onLogin, onCreateAccount }: LoginPageProps) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="auth-page">
      <main className="auth-shell" aria-label="Login">
        <form className="auth-card" onSubmit={submit}>
          <header className="auth-heading">
            <p className="auth-kicker">Login to</p>
            <h1 className="auth-title">
              PARK<span className="auth-title-n">[N]</span>PERKS{' '}
              <span className="auth-title-rest">Business Dashboard</span>
            </h1>
          </header>

          <input
            className="auth-input"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email address or mobile number"
            autoComplete="username"
            aria-label="Email address or mobile number"
          />

          <PasswordField value={password} onChange={setPassword} />

          <button type="submit" className="auth-submit">
            Login
          </button>

          <button type="button" className="auth-link">
            Forgot Pasword ?
          </button>

          <p className="auth-or">OR</p>

          <GoogleButton onClick={onLogin} />

          <button
            type="button"
            className="auth-link auth-create"
            onClick={onCreateAccount}
          >
            Create new account
          </button>
        </form>
      </main>
    </div>
  )
}
