'use client'

import { useState } from 'react'

const STEPS = [
  {
    label: '1 · HTML',
    title: 'Estrutura e significado',
    hint: 'Só HTML: o conteúdo existe, mas parece um documento de 1995. O clique não faz nada.',
    code: `<article>
  <h3>Café Aurora</h3>
  <p>Grãos especiais, torrados toda semana.</p>
  <button>Adicionar à sacola</button>
</article>`,
  },
  {
    label: '2 · + CSS',
    title: 'Aparência',
    hint: 'O mesmo HTML ganhou cor, tipografia, espaço e forma. Continua sem reagir ao clique.',
    code: `article {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(0 0 0 / .08);
}
button {
  padding: 12px 20px;
  border-radius: 999px;
  background: #c2410c;
  color: #fff;
}`,
  },
  {
    label: '3 · + JavaScript',
    title: 'Comportamento',
    hint: 'Agora o botão responde: clique nele e veja o contador mudar.',
    code: `let itens = 0
botao.addEventListener('click', () => {
  itens++
  botao.textContent = \`Na sacola (\${itens})\`
})`,
  },
] as const

export function AnatomyDemo() {
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(0)
  const current = STEPS[step]

  return (
    <div className="panel">
      <div className="anat-tabs" role="group" aria-label="Camadas do front-end">
        {STEPS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className="anat-tab"
            aria-pressed={step === i}
            onClick={() => setStep(i)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="anat-stage">
        <div className="anat-preview">
          <article className={step === 0 ? 'raw' : 'anat-card'}>
            <h3>Café Aurora</h3>
            <p>Grãos especiais, torrados toda semana.</p>
            <button
              type="button"
              onClick={() => {
                if (step === 2) setCount((c) => c + 1)
              }}
            >
              {step === 2 && count > 0 ? `Na sacola (${count})` : 'Adicionar à sacola'}
            </button>
          </article>
        </div>
        <pre className="anat-code" aria-label={`Código: ${current.title}`}>
          <code>{current.code}</code>
        </pre>
      </div>

      <p className="panel__note">
        <strong>{current.title}.</strong> {current.hint}
      </p>
    </div>
  )
}
