'use client'

import { useRef, useState } from 'react'
import { Menu, ShoppingCart } from 'lucide-react'

type Size = 'small' | 'large'

export function FittsDemo() {
  const [size, setSize] = useState<Size>('small')
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [times, setTimes] = useState<Record<Size, number[]>>({ small: [], large: [] })
  const last = useRef<number | null>(null)

  const average = (list: number[]) =>
    list.length ? Math.round(list.reduce((a, b) => a + b, 0) / list.length) : null

  const hit = () => {
    const now = performance.now()
    if (last.current !== null) {
      const elapsed = Math.round(now - last.current)
      setTimes((t) => ({ ...t, [size]: [...t[size].slice(-9), elapsed] }))
    }
    last.current = now
    setPos({ x: 8 + Math.random() * 84, y: 12 + Math.random() * 76 })
  }

  const changeSize = (next: Size) => {
    setSize(next)
    last.current = null
  }

  return (
    <div className="panel law">
      <h3 className="panel__title">Lei de Fitts</h3>
      <p className="panel__desc">
        Quanto menor e mais distante o alvo, mais tempo (e erro) para alcançá-lo. Teste: clique no alvo
        várias vezes.
      </p>
      <div className="law__bar">
        <div className="seg" role="group" aria-label="Tamanho do alvo">
          <button type="button" aria-pressed={size === 'small'} onClick={() => changeSize('small')}>
            Alvo pequeno
          </button>
          <button type="button" aria-pressed={size === 'large'} onClick={() => changeSize('large')}>
            Alvo grande
          </button>
        </div>
        <p className="law__result" aria-live="polite">
          Média: <strong>{average(times[size]) ? `${average(times[size])} ms` : '—'}</strong>
        </p>
      </div>
      <div className="fitts__arena">
        <button
          type="button"
          className={`fitts__target fitts__target--${size}`}
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          onClick={hit}
          aria-label="Alvo: clique aqui"
        />
      </div>
    </div>
  )
}

const FEW = ['Início', 'Produtos', 'Contato', 'Entrar']
const MANY = [
  'Início',
  'Produtos',
  'Novidades',
  'Ofertas',
  'Marcas',
  'Blog',
  'Sobre',
  'Carreiras',
  'Imprensa',
  'Parceiros',
  'Ajuda',
  'FAQ',
  'Contato',
  'Entrar',
]

export function HickDemo() {
  return (
    <div className="panel law">
      <h3 className="panel__title">Lei de Hick</h3>
      <p className="panel__desc">
        Quanto mais opções, mais tempo para decidir. Procure &quot;Contato&quot; nos dois menus.
      </p>
      <div className="hick">
        <div>
          <p className="hick__label">4 opções</p>
          <ul className="hick__menu">
            {FEW.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="hick__label">14 opções</p>
          <ul className="hick__menu">
            {MANY.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function MillerDemo() {
  return (
    <div className="panel law">
      <h3 className="panel__title">Lei de Miller</h3>
      <p className="panel__desc">
        Lembramos de cerca de 7 (±2) itens por vez. Agrupar (chunking) ajuda a ler e memorizar.
      </p>
      <div className="miller">
        <div>
          <p className="hick__label">Sem agrupamento</p>
          <p className="miller__value">11999887766</p>
        </div>
        <div>
          <p className="hick__label">Agrupado</p>
          <p className="miller__value miller__value--good">(11) 99988-7766</p>
        </div>
      </div>
    </div>
  )
}

export function JakobDemo() {
  return (
    <div className="panel law">
      <h3 className="panel__title">Lei de Jakob</h3>
      <p className="panel__desc">
        As pessoas passam a maior parte do tempo em outros sites. Elas esperam que o seu funcione
        igual.
      </p>
      <div className="jakob">
        <div>
          <p className="hick__label">Padrão conhecido</p>
          <div className="jakob__bar" aria-hidden="true">
            <strong>Loja</strong>
            <span>Início</span>
            <span>Produtos</span>
            <ShoppingCart size={16} />
          </div>
        </div>
        <div>
          <p className="hick__label">&quot;Criativo&quot; demais</p>
          <div className="jakob__bar jakob__bar--odd" aria-hidden="true">
            <ShoppingCart size={16} />
            <span>Início</span>
            <span>Produtos</span>
            <Menu size={16} />
          </div>
          <p className="jakob__q">Onde está a logo? E o carrinho?</p>
        </div>
      </div>
    </div>
  )
}
