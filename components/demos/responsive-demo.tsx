'use client'

import { useId, useState } from 'react'
import { Menu } from 'lucide-react'

const PRESETS = [
  { label: 'Celular · 360', width: 360 },
  { label: 'Celular grande · 430', width: 430 },
  { label: 'Tablet · 560', width: 560 },
] as const

function MiniSite({ fixed }: { fixed?: boolean }) {
  return (
    <div className={`rd-site ${fixed ? 'rd-site--fixed' : 'rd-site--fluid'}`}>
      <header className="rd-site__header">
        <strong>Aurora</strong>
        {fixed ? (
          <nav aria-hidden="true">
            <span>Cafés</span>
            <span>Assinatura</span>
            <span>Blog</span>
            <span>Contato</span>
          </nav>
        ) : (
          <>
            <nav className="rd-site__nav" aria-hidden="true">
              <span>Cafés</span>
              <span>Assinatura</span>
              <span>Blog</span>
              <span>Contato</span>
            </nav>
            <Menu className="rd-site__burger" size={22} aria-hidden="true" />
          </>
        )}
      </header>
      <div className="rd-site__hero">
        <p className="rd-site__title">Café fresco na sua porta</p>
        <p className="rd-site__text">Torrado toda semana e enviado em 24 horas.</p>
        <span className="rd-site__cta">Assinar</span>
      </div>
      <div className="rd-site__cards" aria-hidden="true">
        <div>Clássico</div>
        <div>Intenso</div>
        <div>Suave</div>
      </div>
    </div>
  )
}

export function ResponsiveDemo() {
  const id = useId()
  const [width, setWidth] = useState(390)

  return (
    <div className="panel">
      <div className="panel__bar">
        <div>
          <h3 className="panel__title">Simulador de tela</h3>
          <p className="panel__desc">Arraste e compare o mesmo site sem e com responsividade.</p>
        </div>
        <div className="seg" role="group" aria-label="Larguras de tela comuns">
          {PRESETS.map((p) => (
            <button
              key={p.width}
              type="button"
              aria-pressed={width === p.width}
              onClick={() => setWidth(p.width)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rd-slider">
        <label htmlFor={id}>
          Largura da tela: <output>{width}px</output>
        </label>
        <input
          id={id}
          type="range"
          min={300}
          max={560}
          step={10}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>

      <div className="rd-compare" style={{ ['--w' as string]: `${width}px` }}>
        <figure className="rd-col">
          <figcaption className="rd-cap rd-cap--bad">Sem responsividade (largura fixa)</figcaption>
          <div className="rd-screen rd-screen--bad">
            <MiniSite fixed />
          </div>
          {width < 560 ? (
            <p className="rd-warn">Conteúdo cortado: o usuário teria que arrastar para o lado.</p>
          ) : (
            <p className="rd-ok">Só funciona porque a tela é grande o bastante.</p>
          )}
        </figure>
        <figure className="rd-col">
          <figcaption className="rd-cap rd-cap--good">Responsivo (layout fluido)</figcaption>
          <div className="rd-screen rd-screen--good">
            <MiniSite />
          </div>
          <p className="rd-ok">
            {width < 480
              ? 'Menu vira ícone e os cartões empilham.'
              : 'Há espaço: menu completo e cartões lado a lado.'}
          </p>
        </figure>
      </div>
    </div>
  )
}
