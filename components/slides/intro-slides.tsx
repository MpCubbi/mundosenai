import { Slide, SlideHeader } from '@/components/presentation/slide'
import { Figure } from '@/components/presentation/figure'
import { Scoreboard } from '@/components/presentation/scoreboard'
import { ChaosCounter, ChaosMarquee, ChaosSticker } from '@/components/presentation/chaos'
import { AnatomyDemo } from '@/components/demos/anatomy-demo'

export function HeroSlide() {
  return (
    <Slide id="inicio" stage={0} title="Abertura">
      <ChaosMarquee />
      <div className="grid split">
        <div className="stack">
          <SlideHeader
            as="h1"
            id="inicio"
            eyebrow="Apresentação · Desenvolvimento Web"
            title="Front-end e UI/UX"
            lead="Por que a interface é o produto, e como transformar um site ruim em uma ótima experiência, ao vivo."
          />
          <div className="row">
            <a className="btn" href="#importancia">
              Começar a apresentação
            </a>
            <span className="chip">Role para baixo ou use as setas</span>
          </div>
          <div className="row">
            <ChaosCounter />
            <ChaosSticker />
          </div>
          <p className="small">Apresentado por: Nome 1 · Nome 2 · Nome 3 · Nome 4</p>
        </div>
        <Scoreboard />
      </div>
    </Slide>
  )
}

const STATS = [
  {
    value: '50 ms',
    text: 'é o tempo que uma pessoa leva para formar uma primeira opinião visual sobre um site.',
    source: 'Lindgaard et al., 2006',
  },
  {
    value: '53%',
    text: 'das visitas em celular são abandonadas se a página leva mais de 3 segundos para carregar.',
    source: 'Google / DoubleClick, 2016',
  },
  {
    value: '94%+',
    text: 'das páginas iniciais têm falhas de acessibilidade detectáveis automaticamente.',
    source: 'WebAIM Million, 2025',
  },
  {
    value: '1,3 bi',
    text: 'de pessoas no mundo vivem com algum tipo de deficiência (cerca de 16%).',
    source: 'Organização Mundial da Saúde, 2023',
  },
]

export function ImportanceSlide() {
  return (
    <Slide id="importancia" stage={0} tone="alt" title="Por que importa">
      <div className="grid split">
        <div className="stack">
          <SlideHeader
            id="importancia"
            eyebrow="01 · Por que Front-end?"
            title="É a parte do produto que as pessoas realmente tocam."
            lead="Front-end é tudo o que roda no navegador: o que o usuário vê, clica e sente. Hoje falamos só dessa parte, sem back-end."
          />
          <ul className="list">
            <li>
              <strong>Primeira impressão:</strong> a aparência define a confiança antes de qualquer
              texto ser lido.
            </li>
            <li>
              <strong>Negócio:</strong> interfaces lentas ou confusas aumentam o abandono e reduzem
              vendas.
            </li>
            <li>
              <strong>Inclusão:</strong> uma interface mal feita deixa pessoas de fora.
            </li>
            <li>
              <strong>Marca:</strong> para a maioria dos usuários, o front-end é a empresa.
            </li>
          </ul>
        </div>
        <Figure
          src="/images/iceberg.png"
          alt="Ilustração de um iceberg: a ponta acima da água é uma janela de navegador com uma interface colorida; abaixo da água, uma massa escura com engrenagens e servidores."
          caption="Só a ponta do iceberg é visível: o usuário julga o produto inteiro pelo front-end."
        />
      </div>

      <div className="grid cols-4 stretch">
        {STATS.map((s) => (
          <div key={s.value} className="card">
            <span className="stat__num">{s.value}</span>
            <p className="body">{s.text}</p>
            <p className="small">{s.source}</p>
          </div>
        ))}
      </div>
    </Slide>
  )
}

export function AnatomySlide() {
  return (
    <Slide id="anatomia" stage={0} title="HTML, CSS e JavaScript">
      <SlideHeader
        id="anatomia"
        eyebrow="02 · O que é Front-end?"
        title="Três camadas: estrutura, aparência e comportamento."
        lead="Tudo o que você vê em um site é construído com HTML, CSS e JavaScript. Experimente ligar uma camada de cada vez."
      />
      <div className="grid cols-2 split">
        <AnatomyDemo />
        <div className="grid cols-1 stretch" style={{ ['--cols' as string]: 1 }}>
          <div className="card">
            <h3 className="h3">HTML: o esqueleto</h3>
            <p className="body">Define o que cada coisa é: título, parágrafo, botão, imagem, formulário.</p>
          </div>
          <div className="card">
            <h3 className="h3">CSS: a aparência</h3>
            <p className="body">Cores, fontes, espaços, grid e adaptação a cada tamanho de tela.</p>
          </div>
          <div className="card">
            <h3 className="h3">JavaScript: o movimento</h3>
            <p className="body">Reage a cliques, valida formulários, atualiza a tela sem recarregar.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <span className="chip chip--brand">Interface</span>
        <span className="chip chip--brand">Interação</span>
        <span className="chip chip--brand">Responsividade</span>
        <span className="chip chip--brand">Acessibilidade</span>
        <span className="chip chip--brand">Performance</span>
      </div>
    </Slide>
  )
}
