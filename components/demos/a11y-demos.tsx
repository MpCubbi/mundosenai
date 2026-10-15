'use client'

import { useState } from 'react'
import { AlertTriangle, Check, X } from 'lucide-react'

export function FocusDemo() {
  const [visible, setVisible] = useState(false)

  return (
    <div className="panel">
      <div className="panel__bar">
        <div>
          <h3 className="panel__title">Navegação por teclado</h3>
          <p className="panel__desc">
            Clique em um item, depois use <kbd>Tab</kbd> para avançar.
          </p>
        </div>
        <div className="seg" role="group" aria-label="Indicador de foco">
          <button type="button" aria-pressed={!visible} onClick={() => setVisible(false)}>
            Foco invisível
          </button>
          <button type="button" aria-pressed={visible} onClick={() => setVisible(true)}>
            Foco visível
          </button>
        </div>
      </div>

      <div className={`fd ${visible ? 'fd--on' : 'fd--off'}`}>
        <div className="fd__toolbar">
          <button type="button">Início</button>
          <button type="button">Produtos</button>
          <button type="button">Carrinho</button>
          <a href="#acessibilidade-teclado" onClick={(e) => e.preventDefault()}>
            Contato
          </a>
          <input type="text" aria-label="Buscar" placeholder="Buscar…" />
        </div>
        <p className="fd__msg" aria-live="polite">
          {visible ? (
            <>
              <Check size={16} aria-hidden="true" /> Dá para saber onde você está.
            </>
          ) : (
            <>
              <X size={16} aria-hidden="true" /> Quem navega só pelo teclado fica perdido.
            </>
          )}
        </p>
      </div>
    </div>
  )
}

const MODES = [
  { id: 'normal', label: 'Visão típica', filter: 'none' },
  { id: 'protanopia', label: 'Protanopia', filter: 'url(#cb-protanopia)' },
  { id: 'deuteranopia', label: 'Deuteranopia', filter: 'url(#cb-deuteranopia)' },
  { id: 'tritanopia', label: 'Tritanopia', filter: 'url(#cb-tritanopia)' },
  { id: 'achromatopsia', label: 'Acromatopsia', filter: 'url(#cb-achromatopsia)' },
] as const

const STATUS = [
  { name: 'Pagamento', color: '#16a34a', state: 'ok' },
  { name: 'Estoque', color: '#d97706', state: 'warn' },
  { name: 'Entrega', color: '#dc2626', state: 'error' },
] as const

const LABEL: Record<string, string> = { ok: 'Normal', warn: 'Atenção', error: 'Falhou' }

export function ColorblindDemo() {
  const [mode, setMode] = useState<(typeof MODES)[number]['id']>('normal')
  const filter = MODES.find((m) => m.id === mode)?.filter ?? 'none'

  return (
    <div className="panel">
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
        <defs>
          <filter id="cb-protanopia">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="cb-deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="cb-tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="cb-achromatopsia">
            <feColorMatrix
              type="matrix"
              values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="panel__bar">
        <div>
          <h3 className="panel__title">Simulador de daltonismo</h3>
          <p className="panel__desc">
            Cerca de 1 em cada 12 homens tem alguma forma de daltonismo. Nunca use só a cor para
            informar.
          </p>
        </div>
        <div className="seg seg--wrap" role="group" aria-label="Tipo de visão">
          {MODES.map((m) => (
            <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cb" style={{ filter }}>
        <div className="cb__col">
          <p className="cb__cap cb__cap--bad">Só cor</p>
          <ul>
            {STATUS.map((s) => (
              <li key={s.name}>
                <span className="cb__dot" style={{ background: s.color }} />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="cb__col">
          <p className="cb__cap cb__cap--good">Cor + ícone + texto</p>
          <ul>
            {STATUS.map((s) => (
              <li key={s.name}>
                <span className="cb__dot cb__dot--icon" style={{ background: s.color }}>
                  {s.state === 'ok' ? (
                    <Check size={14} aria-hidden="true" />
                  ) : s.state === 'warn' ? (
                    <AlertTriangle size={14} aria-hidden="true" />
                  ) : (
                    <X size={14} aria-hidden="true" />
                  )}
                </span>
                <span>
                  {s.name} <em>{LABEL[s.state]}</em>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const PAIRS = [
  {
    bad: '<div onclick="enviar()">Enviar</div>',
    good: '<button type="button">Enviar</button>',
    badNote: 'Não recebe foco, não responde a Enter e o leitor de tela não sabe que é um botão.',
    goodNote: 'Leitor de tela: “Enviar, botão”. Foco e teclado já funcionam.',
  },
  {
    bad: '<img src="grafico.png">',
    good: '<img src="grafico.png" alt="Vendas dobraram entre janeiro e junho">',
    badNote: 'O leitor de tela lê o nome do arquivo.',
    goodNote: 'A imagem é descrita para quem não a enxerga.',
  },
  {
    bad: '<input placeholder="E-mail">',
    good: '<label for="email">E-mail</label>\n<input id="email" type="email">',
    badNote: 'O placeholder some ao digitar e não é um rótulo confiável.',
    goodNote: 'O rótulo fica sempre visível e é anunciado.',
  },
] as const

export function SemanticsDemo() {
  return (
    <div className="panel">
      <h3 className="panel__title">HTML semântico e textos alternativos</h3>
      <p className="panel__desc">A forma mais barata de acessibilidade é usar o elemento certo.</p>
      <ul className="sm">
        {PAIRS.map((p) => (
          <li key={p.bad} className="sm__row">
            <div className="sm__col sm__col--bad">
              <span className="sm__tag">
                <X size={14} aria-hidden="true" /> Evite
              </span>
              <pre>
                <code>{p.bad}</code>
              </pre>
              <p>{p.badNote}</p>
            </div>
            <div className="sm__col sm__col--good">
              <span className="sm__tag">
                <Check size={14} aria-hidden="true" /> Prefira
              </span>
              <pre>
                <code>{p.good}</code>
              </pre>
              <p>{p.goodNote}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
