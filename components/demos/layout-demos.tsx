'use client'

import { useState } from 'react'
import { Check, Grid3x3 } from 'lucide-react'

export function GridOverlay() {
  const [visible, setVisible] = useState(true)

  return (
    <div className="panel">
      <div className="panel__bar">
        <div>
          <h3 className="panel__title">Grid de 12 colunas</h3>
          <p className="panel__desc">Tudo se alinha às mesmas colunas e às mesmas margens.</p>
        </div>
        <button
          type="button"
          className="d-btn"
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        >
          <Grid3x3 size={16} aria-hidden="true" />
          {visible ? 'Esconder grid' : 'Mostrar grid'}
        </button>
      </div>

      <div className="go">
        <div className="go__layout" aria-hidden="true">
          <div className="go__nav">
            <span className="go__logo" />
            <span className="go__link" />
            <span className="go__link" />
            <span className="go__link" />
          </div>
          <div className="go__hero">
            <span className="go__line go__line--title" />
            <span className="go__line go__line--title go__line--short" />
            <span className="go__line" />
            <span className="go__line go__line--short" />
            <span className="go__cta" />
          </div>
          <div className="go__image" />
          <div className="go__card" />
          <div className="go__card" />
          <div className="go__card" />
        </div>
        {visible ? (
          <div className="go__overlay" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const FEATURES = ['5 projetos ativos', 'Exportação em PDF', 'Suporte por e-mail']

export function BeforeAfterCard() {
  const [after, setAfter] = useState(false)

  return (
    <div className="panel">
      <div className="panel__bar">
        <div>
          <h3 className="panel__title">Hierarquia e proximidade</h3>
          <p className="panel__desc">O mesmo conteúdo, com e sem critério.</p>
        </div>
        <div className="seg" role="group" aria-label="Versão do cartão">
          <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>
            Antes
          </button>
          <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>
            Depois
          </button>
        </div>
      </div>

      <div className="ba-stage">
        {after ? (
          <div className="ba-good">
            <p className="ba-good__tag">Plano Pro</p>
            <p className="ba-good__price">
              R$ 49<span>/mês</span>
            </p>
            <ul>
              {FEATURES.map((f) => (
                <li key={f}>
                  <Check size={16} aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
            <button type="button">Assinar agora</button>
          </div>
        ) : (
          <div className="ba-bad">
            <p className="ba-bad__a">Plano Pro</p>
            <p className="ba-bad__b">R$ 49 por mês</p>
            <p className="ba-bad__c">5 projetos ativos</p>
            <p className="ba-bad__d">Exportação em PDF</p>
            <p className="ba-bad__e">Suporte por e-mail</p>
            <button type="button">assinar</button>
          </div>
        )}
      </div>

      <ul className="ba-notes" aria-live="polite">
        {after ? (
          <>
            <li>Preço é o elemento dominante (tamanho + peso).</li>
            <li>Itens relacionados ficam juntos; grupos têm respiro entre si.</li>
            <li>Um único botão de ação, alinhado e com contraste.</li>
          </>
        ) : (
          <>
            <li>Tudo com o mesmo peso: o olho não sabe onde começar.</li>
            <li>Sem espaçamento: nada indica o que é grupo.</li>
            <li>Botão pequeno, sem destaque e com texto genérico.</li>
          </>
        )}
      </ul>
    </div>
  )
}
