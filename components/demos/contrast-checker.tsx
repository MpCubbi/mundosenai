'use client'

import { useId, useState } from 'react'
import { Check, X } from 'lucide-react'
import { contrastRatio, formatRatio } from '@/lib/contrast'

const PRESETS = [
  { label: 'Site original', fg: '#ff4fd2', bg: '#ff7be5' },
  { label: 'Cinza claro', fg: '#9ca3af', bg: '#ffffff' },
  { label: 'Laranja', fg: '#e8590c', bg: '#ffffff' },
  { label: 'Nossa paleta', fg: '#1c1917', bg: '#faf7f2' },
] as const

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <li className={`cc-badge ${pass ? 'is-pass' : 'is-fail'}`}>
      {pass ? <Check size={16} aria-hidden="true" /> : <X size={16} aria-hidden="true" />}
      <span>
        {label}: <strong>{pass ? 'passa' : 'reprova'}</strong>
      </span>
    </li>
  )
}

export function ContrastChecker() {
  const id = useId()
  const [fg, setFg] = useState<string>(PRESETS[0].fg)
  const [bg, setBg] = useState<string>(PRESETS[0].bg)
  const ratio = contrastRatio(fg, bg)

  return (
    <div className="panel cc">
      <div className="panel__bar">
        <div>
          <h3 className="panel__title">Verificador de contraste (WCAG)</h3>
          <p className="panel__desc">Escolha as cores ou use um exemplo.</p>
        </div>
        <div className="seg" role="group" aria-label="Exemplos">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              aria-pressed={fg === p.fg && bg === p.bg}
              onClick={() => {
                setFg(p.fg)
                setBg(p.bg)
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cc__body">
        <div className="cc__inputs">
          <label htmlFor={`${id}-fg`}>
            Texto
            <span className="cc__color">
              <input id={`${id}-fg`} type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
              <code>{fg}</code>
            </span>
          </label>
          <label htmlFor={`${id}-bg`}>
            Fundo
            <span className="cc__color">
              <input id={`${id}-bg`} type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
              <code>{bg}</code>
            </span>
          </label>
        </div>

        <div className="cc__preview" style={{ color: fg, background: bg }}>
          <p className="cc__big">Texto grande de exemplo</p>
          <p className="cc__small">
            Texto normal: você consegue ler isto sem esforço, no sol, com a tela suja?
          </p>
        </div>

        <div className="cc__result" aria-live="polite">
          <p className="cc__ratio">{formatRatio(ratio)}</p>
          <ul>
            <Badge pass={ratio >= 4.5} label="AA · texto normal (4,5:1)" />
            <Badge pass={ratio >= 3} label="AA · texto grande (3:1)" />
            <Badge pass={ratio >= 7} label="AAA · texto normal (7:1)" />
          </ul>
        </div>
      </div>
    </div>
  )
}
