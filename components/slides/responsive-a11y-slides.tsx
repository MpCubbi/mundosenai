import { Slide, SlideHeader, FixNote } from '@/components/presentation/slide'
import { Figure } from '@/components/presentation/figure'
import { ResponsiveDemo } from '@/components/demos/responsive-demo'
import { ColorblindDemo, FocusDemo, SemanticsDemo } from '@/components/demos/a11y-demos'

const RESPONSIVE_RULES = [
  ['Mobile-first', 'Comece pela tela pequena e adicione recursos conforme há espaço.'],
  ['Layout fluido', 'Use %, fr, rem e clamp() em vez de larguras fixas em pixels.'],
  ['Breakpoints pelo conteúdo', 'Quebre o layout onde ele deixa de funcionar, não por modelo de aparelho.'],
  ['Alvos de toque', 'Pelo menos 44 px de altura e largura, com espaço entre eles.'],
  ['Imagens flexíveis', 'max-width: 100% e tamanhos diferentes para cada tela.'],
  ['Sem rolagem horizontal', 'Texto, tabelas e imagens não podem vazar da tela.'],
]

export function ResponsiveSlide() {
  return (
    <Slide id="responsividade" stage={4} tone="alt" title="Responsividade">
      <SlideHeader
        id="responsividade"
        eyebrow="11 · Responsividade"
        title="Uma única interface, qualquer tela."
        lead="Mais da metade do acesso à web vem de celulares. O site precisa se adaptar sem pedir que o usuário dê zoom ou role para o lado."
      />
      <FixNote>o layout agora é fluido e muda de forma conforme o espaço disponível.</FixNote>

      <div className="grid split">
        <Figure
          src="/images/devices.png"
          alt="Ilustração do mesmo site exibido em um celular, um tablet, um notebook e um monitor, com o layout se reorganizando em cada tela."
          caption="O mesmo conteúdo reorganizado para cada dispositivo."
          wide
          sizes="(max-width: 900px) 100vw, 620px"
        />
        <ul className="list">
          {RESPONSIVE_RULES.map(([title, text]) => (
            <li key={title}>
              <strong>{title}:</strong> {text}
            </li>
          ))}
        </ul>
      </div>

      <ResponsiveDemo />
    </Slide>
  )
}

const POUR = [
  {
    letter: 'P',
    title: 'Perceptível',
    text: 'A informação precisa chegar por algum sentido: texto alternativo, legendas, bom contraste.',
  },
  {
    letter: 'O',
    title: 'Operável',
    text: 'Tudo funciona com teclado, com tempo suficiente e sem armadilhas de foco.',
  },
  {
    letter: 'C',
    title: 'Compreensível',
    text: 'Linguagem simples, comportamento previsível e mensagens de erro úteis.',
  },
  {
    letter: 'R',
    title: 'Robusto',
    text: 'HTML semântico que funciona em leitores de tela e tecnologias assistivas.',
  },
]

export function AccessibilitySlide() {
  return (
    <Slide id="acessibilidade" stage={5} title="Acessibilidade">
      <SlideHeader
        id="acessibilidade"
        eyebrow="12 · Acessibilidade"
        title="Acessível para todos, útil para todos."
        lead="Acessibilidade não é um recurso extra: é a base. Atinge pessoas com deficiência permanente, mas também quem está com o braço engessado, no sol ou com internet lenta."
      />
      <FixNote>foco visível, navegação por teclado e movimento reduzido para quem prefere.</FixNote>

      <div className="grid split">
        <div className="stack">
          <p className="body">
            As diretrizes <strong>WCAG</strong> se organizam em 4 princípios, conhecidos pela sigla{' '}
            <strong>POUR</strong>:
          </p>
          <div className="grid cols-2 stretch">
            {POUR.map((p) => (
              <div key={p.letter} className="card pour">
                <span className="pour__letter" aria-hidden="true">
                  {p.letter}
                </span>
                <h3 className="h3">{p.title}</h3>
                <p className="small">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
        <Figure
          src="/images/accessibility.png"
          alt="Ilustração de pessoas diversas usando tecnologia: uma com leitor de tela, outra com teclado, outra em cadeira de rodas usando um computador e outra com lupa."
          caption="Cada pessoa usa a web de um jeito diferente."
        />
      </div>

      <div className="grid cols-2 stretch">
        <FocusDemo />
        <ColorblindDemo />
      </div>
    </Slide>
  )
}

export function AccessibilityPracticeSlide() {
  return (
    <Slide id="boas-praticas" stage={5} tone="alt" title="Boas práticas de acessibilidade">
      <SlideHeader
        id="boas-praticas"
        eyebrow="13 · Acessibilidade · Na prática"
        title="Muita acessibilidade é só usar o HTML certo."
        lead="Elementos nativos já trazem foco, teclado e significado de graça. Reinventá-los com div é o caminho mais caro."
      />
      <SemanticsDemo />
      <div className="grid cols-4 stretch">
        <div className="card">
          <h3 className="h3">Teclado</h3>
          <p className="small">Tab, Shift+Tab, Enter e Esc devem bastar para usar tudo.</p>
        </div>
        <div className="card">
          <h3 className="h3">Movimento</h3>
          <p className="small">Respeite prefers-reduced-motion e evite piscar mais de 3 vezes por segundo.</p>
        </div>
        <div className="card">
          <h3 className="h3">Zoom e texto</h3>
          <p className="small">Use rem. A página deve funcionar com 200% de zoom.</p>
        </div>
        <div className="card">
          <h3 className="h3">Ferramentas</h3>
          <p className="small">Lighthouse, axe DevTools e um leitor de tela (NVDA, VoiceOver).</p>
        </div>
      </div>
    </Slide>
  )
}
