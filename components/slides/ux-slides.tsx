import { Slide, SlideHeader } from '@/components/presentation/slide'
import { Figure } from '@/components/presentation/figure'
import { FittsDemo, HickDemo, JakobDemo, MillerDemo } from '@/components/demos/laws-demos'

const PROCESS = [
  { n: 1, title: 'Pesquisar', text: 'Entender quem usa e qual problema resolver.' },
  { n: 2, title: 'Definir', text: 'Transformar o que aprendeu em requisitos claros.' },
  { n: 3, title: 'Idear', text: 'Esboçar várias soluções antes de escolher uma.' },
  { n: 4, title: 'Prototipar', text: 'Criar versões simples, baratas de mudar.' },
  { n: 5, title: 'Testar', text: 'Observar pessoas reais usando o protótipo.' },
  { n: 6, title: 'Iterar', text: 'Ajustar e repetir o ciclo.' },
]

export function UiUxSlide() {
  return (
    <Slide id="ui-ux" stage={3} title="UI e UX">
      <SlideHeader
        id="ui-ux"
        eyebrow="08 · UI/UX · Conceitos"
        title="UI é o que se vê. UX é o que se sente."
        lead="As duas coisas caminham juntas: uma interface bonita que confunde falha, e uma ótima ideia mal apresentada também."
      />

      <div className="grid cols-2 stretch">
        <div className="card">
          <h3 className="h3">UI · User Interface</h3>
          <p className="body">
            A camada visual e tátil: cores, tipografia, ícones, botões, espaçamento, animações.
          </p>
          <p className="small">Pergunta: &quot;Está claro e agradável de olhar?&quot;</p>
        </div>
        <div className="card">
          <h3 className="h3">UX · User Experience</h3>
          <p className="body">
            A experiência completa: encontrar, entender, completar uma tarefa e sair satisfeito.
          </p>
          <p className="small">Pergunta: &quot;Consigo fazer o que vim fazer sem esforço?&quot;</p>
        </div>
      </div>

      <div className="grid split">
        <div className="panel matrix" role="img" aria-label="Matriz 2 por 2: UX boa com UI ruim funciona mas é feio; UX boa com UI boa é o produto que as pessoas amam; UX ruim com UI ruim ninguém usa; UX ruim com UI boa é bonito mas confuso.">
          <span className="matrix__corner" aria-hidden="true" />
          <span className="matrix__head">UI ruim</span>
          <span className="matrix__head">UI boa</span>
          <span className="matrix__head matrix__head--row">UX boa</span>
          <div className="matrix__cell">
            <strong>Funciona, mas é feio</strong>
            <span>Usável, porém pouco confiável.</span>
          </div>
          <div className="matrix__cell matrix__cell--best">
            <strong>Produto que as pessoas amam</strong>
            <span>O objetivo.</span>
          </div>
          <span className="matrix__head matrix__head--row">UX ruim</span>
          <div className="matrix__cell matrix__cell--worst">
            <strong>Ninguém usa</strong>
            <span>Feio e confuso.</span>
          </div>
          <div className="matrix__cell">
            <strong>Bonito, mas confuso</strong>
            <span>Impressiona e frustra.</span>
          </div>
        </div>

        <Figure
          src="/images/ux-process.png"
          alt="Ilustração de um ciclo de design de UX: pessoas pesquisando, desenhando em quadros, prototipando em telas e testando com usuários."
          caption="UX não é um enfeite no fim: é um processo contínuo."
        />
      </div>

      <ol className="process">
        {PROCESS.map((p) => (
          <li key={p.n} className="card">
            <span className="process__n">{p.n}</span>
            <h3 className="h3">{p.title}</h3>
            <p className="small">{p.text}</p>
          </li>
        ))}
      </ol>
    </Slide>
  )
}

const HEURISTICS = [
  ['Visibilidade do estado do sistema', 'Mostre o que está acontecendo: carregando, salvo, erro.'],
  ['Linguagem do usuário', 'Fale como as pessoas falam, sem jargão técnico.'],
  ['Controle e liberdade', 'Desfazer, cancelar e voltar devem ser fáceis.'],
  ['Consistência e padrões', 'O mesmo elemento sempre funciona do mesmo jeito.'],
  ['Prevenção de erros', 'Melhor do que uma boa mensagem de erro é evitar o erro.'],
  ['Reconhecer em vez de lembrar', 'Deixe as opções visíveis; não obrigue a memorizar.'],
  ['Flexibilidade e eficiência', 'Atalhos para experientes, caminhos simples para iniciantes.'],
  ['Design estético e minimalista', 'Cada elemento extra compete com o que importa.'],
  ['Ajudar a corrigir erros', 'Mensagens claras, sem códigos, com solução.'],
  ['Ajuda e documentação', 'Quando preciso, a ajuda deve ser fácil de achar.'],
]

export function HeuristicsSlide() {
  return (
    <Slide id="heuristicas" stage={3} tone="alt" title="10 heurísticas de Nielsen">
      <SlideHeader
        id="heuristicas"
        eyebrow="09 · UI/UX · Princípios"
        title="10 heurísticas de usabilidade de Nielsen."
        lead="Uma lista de verificação criada há décadas por Jakob Nielsen e ainda usada para avaliar qualquer interface."
      />
      <ol className="grid cols-5 stretch heur-list">
        {HEURISTICS.map(([title, text], i) => (
          <li key={title} className="card heur">
            <span className="heur__n">{i + 1}</span>
            <h3 className="h3">{title}</h3>
            <p className="small">{text}</p>
          </li>
        ))}
      </ol>
    </Slide>
  )
}

export function LawsSlide() {
  return (
    <Slide id="leis" stage={3} title="Leis de UX">
      <SlideHeader
        id="leis"
        eyebrow="10 · UI/UX · Leis de UX"
        title="O comportamento humano tem padrões. Dá para testar."
        lead="Quatro leis clássicas que explicam por que algumas interfaces parecem naturais e outras cansam."
      />
      <div className="grid cols-2 stretch">
        <FittsDemo />
        <HickDemo />
        <MillerDemo />
        <JakobDemo />
      </div>
    </Slide>
  )
}
