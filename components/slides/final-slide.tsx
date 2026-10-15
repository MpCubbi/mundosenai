import { Check } from 'lucide-react'
import { Slide, SlideHeader } from '@/components/presentation/slide'
import { contrastRatio, formatRatio } from '@/lib/contrast'

const CHECKLIST = [
  'Contraste de texto de pelo menos 4,5:1',
  'Texto corrido com 16 px ou mais',
  'No máximo duas famílias tipográficas',
  'Espaçamento e alinhamento consistentes',
  'Funciona de 320 px até telas grandes',
  'Alvos de toque com pelo menos 44 px',
  'Tudo usável pelo teclado, com foco visível',
  'Imagens com alt e campos com rótulo',
  'Estados e feedback para cada ação',
  'Testado com pessoas reais',
]

const REFERENCES = [
  { label: 'WCAG 2.2 (W3C)', href: 'https://www.w3.org/TR/WCAG22/' },
  { label: '10 Usability Heuristics (NN/g)', href: 'https://www.nngroup.com/articles/ten-usability-heuristics/' },
  { label: 'Laws of UX', href: 'https://lawsofux.com/' },
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org/pt-BR/' },
  { label: 'web.dev Learn', href: 'https://web.dev/learn' },
]

export function FinalSlide() {
  const before = formatRatio(contrastRatio('#ff4fd2', '#ff7be5'))

  const recap = [
    ['Cores', `Antes: rosa sobre rosa (${before}). Depois: contraste acima de 4,5:1 e paleta curta.`],
    ['Tipografia', 'Antes: 3 fontes, 13 px, tudo em caixa alta. Depois: 2 fontes, 18 px, entrelinha 1,6.'],
    ['Layout', 'Antes: tudo colado e desalinhado. Depois: grid, espaçamento e hierarquia.'],
    ['Responsividade', 'Antes: só funcionava em tela grande. Depois: adapta-se de 320 px para cima.'],
    ['Acessibilidade', 'Antes: sem foco e com movimento constante. Depois: foco visível e movimento reduzido.'],
    ['Polimento', 'Antes: botões sem reação. Depois: hover, transições e entrada suave.'],
  ]

  return (
    <Slide id="conclusao" stage={6} tone="dark" title="Conclusão">
      <SlideHeader
        id="conclusao"
        eyebrow="14 · Conclusão"
        title="Esse é o mesmo site do começo."
        lead="Nenhuma linha de back-end mudou. Só o front-end, e ele transformou completamente a experiência."
      />

      <div className="grid cols-3 stretch">
        {recap.map(([title, text]) => (
          <div key={title} className="card">
            <h3 className="h3">{title}</h3>
            <p className="small">{text}</p>
          </div>
        ))}
      </div>

      <div className="grid split">
        <div className="stack">
          <h3 className="h3">Checklist para o seu próximo projeto</h3>
          <ul className="checklist">
            {CHECKLIST.map((item) => (
              <li key={item}>
                <Check size={16} aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="stack">
          <h3 className="h3">Para continuar estudando</h3>
          <ul className="list">
            {REFERENCES.map((r) => (
              <li key={r.href}>
                <a className="link" href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="lead">Obrigado! Perguntas?</p>
        </div>
      </div>
    </Slide>
  )
}
