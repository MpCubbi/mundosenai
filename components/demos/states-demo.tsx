'use client'

import { useId, useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'

const BUTTON_STATES = [
  { label: 'Padrão', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Foco', className: 'is-focus' },
  { label: 'Pressionado', className: 'is-active' },
  { label: 'Desabilitado', className: 'is-disabled' },
  { label: 'Carregando', className: 'is-loading' },
] as const

export function ButtonStates() {
  return (
    <div className="panel">
      <h3 className="panel__title">Todo componente tem estados</h3>
      <p className="panel__desc">
        Um botão não é só &quot;um botão&quot;: o usuário precisa saber o que está acontecendo em
        cada momento.
      </p>
      <ul className="st-grid">
        {BUTTON_STATES.map((s) => (
          <li key={s.label}>
            <span
              className={`st-btn ${s.className}`}
              aria-hidden="true"
            >
              {s.className === 'is-loading' ? (
                <Loader2 size={16} className="st-spin" />
              ) : null}
              Salvar
            </span>
            <span className="st-label">{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

type Status = 'idle' | 'loading' | 'sent'

export function LiveForm() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
  const showError = touched && email.length > 0 && !valid
  const showOk = valid

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setStatus('loading')
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <form className="panel st-form" onSubmit={submit} noValidate>
      <h3 className="panel__title">Feedback imediato</h3>
      <p className="panel__desc">Digite um e-mail inválido, depois corrija. Depois envie.</p>

      <label htmlFor={id} className="st-form__label">
        E-mail
      </label>
      <div className={`st-input ${showError ? 'is-error' : ''} ${showOk ? 'is-ok' : ''}`}>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          value={email}
          aria-invalid={showError}
          aria-describedby={`${id}-help`}
          onChange={(e) => {
            setEmail(e.target.value)
            setStatus('idle')
          }}
          onBlur={() => setTouched(true)}
        />
        {showError ? <AlertCircle size={18} aria-hidden="true" /> : null}
        {showOk ? <CheckCircle2 size={18} aria-hidden="true" /> : null}
      </div>
      <p
        id={`${id}-help`}
        className={`st-form__help ${showError ? 'is-error' : ''}`}
        aria-live="polite"
      >
        {showError
          ? 'Esse e-mail parece incompleto. Exemplo: nome@dominio.com'
          : showOk
            ? 'Tudo certo!'
            : 'Usaremos só para enviar o comprovante.'}
      </p>

      <button type="submit" className="d-btn d-btn--primary" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="st-spin" aria-hidden="true" /> Enviando…
          </>
        ) : status === 'sent' ? (
          <>
            <CheckCircle2 size={16} aria-hidden="true" /> Enviado com sucesso
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" /> Enviar
          </>
        )}
      </button>
    </form>
  )
}
