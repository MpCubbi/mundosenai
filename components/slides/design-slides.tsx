import { AlertTriangle, Check, Info, X } from 'lucide-react'
import { Slide, SlideHeader, FixNote } from '@/components/presentation/slide'
import { TypePlayground } from '@/components/demos/type-playground'
import { BeforeAfterCard, GridOverlay } from '@/components/demos/layout-demos'
import { ButtonStates, LiveForm } from '@/components/demos/states-demo'
import { ContrastChecker } from '@/components/demos/contrast-checker'
import { contrastRatio, formatRatio } from '@/lib/contrast'

const SAMPLES = [
  { label: 'Antes', fg: '#ff4fd2', bg: '#ff7be5' },
  { label: 'Depois', fg: '#1c1917', bg: '#faf7f2' },
] as const

const SEMANTIC = [
  { name: 'Sucesso', fg: '#15803d', bg: '#dcfce7', Icon: Check },
  { name: 'Erro', fg: '#b91c1c', bg: '#fee2e2', Icon: X },
  { name: 'Aviso', fg: '#92400e', bg: '#fef3c7', Icon: AlertTriangle },
  { name: 'Informação', fg: '#1d4ed8', bg: '#dbeafe', Icon: Info },
] as const

export function ColorsSlide() {
  return (
    <Slide id="cores" stage={1} tone="alt" title="Cores">
      <SlideHeader
        id="cores"
        eyebrow="03 · Fundamentos visuais · Cor"
        title="Cor não é decoração: é legibilidade."
        lead="Rosa sobre rosa chama atenção, mas ninguém consegue ler. O contraste entre texto e fundo é o primeiro requisito de um bom front-end."
      />
      <FixNote>trocamos as cores por uma paleta curta com contraste mínimo de 4,5:1.</FixNote>

      <div className="grid split">
        <div className="stack">
          <ul className="list">
            <li>
              <strong>Regra 60-30-10:</strong> 60% neutro (fundo), 30% secundário (texto e superfícies),
              10% destaque (ações).
            </li>
            <li>
              <strong>Poucas cores:</strong> de 3 a 5, cada uma com uma função.
            </li>
            <li>
              <strong>Cor com significado:</strong> verde, vermelho e amarelo comunicam estado, mas
              nunca sozinhos.
            </li>
            <li>
              <strong>Contraste WCAG:</strong> 4,5:1 para texto normal e 3:1 para texto grande.
            </li>
          </ul>

          <div className="panel">
            <h3 className="panel__title">Paleta com função</h3>
            <div
              className="palette"
              role="img"
              aria-label="Proporção da paleta: 60% fundo creme, 30% texto escuro e 10% laranja de destaque"
            >
              <span style={{ flex: 6, background: '#faf7f2', color: '#1c1917' }}>60% fundo</span>
              <span style={{ flex: 3, background: '#1c1917', color: '#faf7f2' }}>30% texto</span>
              <span style={{ flex: 1, background: '#c2410c', color: '#ffffff' }}>10%</span>
            </div>
            <ul className="semantic">
              {SEMANTIC.map(({ name, fg, bg, Icon }) => (
                <li key={name} style={{ color: fg, background: bg }}>
                  <Icon size={16} aria-hidden="true" /> {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stack">
          <div className="panel">
            <h3 className="panel__title">Mesmo texto, contrastes diferentes</h3>
            <div className="cd">
              {SAMPLES.map((s) => {
                const ratio = contrastRatio(s.fg, s.bg)
                const pass = ratio >= 4.5
                return (
                  <div key={s.label} className="cd__item">
                    <div className="cd__sample" style={{ color: s.fg, background: s.bg }}>
                      <strong>Frete grátis hoje!</strong>
                      <span>Compre agora e receba em casa.</span>
                    </div>
                    <p className={`cd__ratio ${pass ? 'is-pass' : 'is-fail'}`}>
                      <strong>{s.label}:</strong> {formatRatio(ratio)}{' '}
                      {pass ? (
                        <>
                          <Check size={14} aria-hidden="true" /> passa
                        </>
                      ) : (
                        <>
                          <X size={14} aria-hidden="true" /> reprova
                        </>
                      )}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <ContrastChecker />
    </Slide>
  )
}

export function TypographySlide() {
  return (
    <Slide id="tipografia" stage={2} title="Tipografia">
      <SlideHeader
        id="tipografia"
        eyebrow="04 · Fundamentos visuais · Tipografia"
        title="Mais de 90% da web é texto."
        lead="Tipografia é o que transforma informação em leitura confortável. Três fontes, 13 px e caixa alta não ajudam ninguém."
      />
      <FixNote>duas famílias, texto com 18 px, entrelinha de 1,6 e linhas com até 70 caracteres.</FixNote>

      <div className="grid split">
        <ul className="list">
          <li>
            <strong>Até 2 famílias:</strong> uma para títulos, outra para texto corrido.
          </li>
          <li>
            <strong>Hierarquia clara:</strong> título, subtítulo, corpo e legenda com tamanhos distintos.
          </li>
          <li>
            <strong>Corpo com 16 px ou mais</strong> e entrelinha entre 1,4 e 1,6.
          </li>
          <li>
            <strong>Linhas de 45 a 75 caracteres:</strong> mais do que isso cansa o olhar.
          </li>
          <li>
            <strong>Evite caixa alta em frases</strong> e texto justificado em colunas estreitas.
          </li>
        </ul>

        <div className="panel specimen">
          <p className="specimen__label">Hierarquia</p>
          <p className="specimen__h1">Título principal</p>
          <p className="specimen__h2">Subtítulo de seção</p>
          <p className="specimen__body">
            Texto corrido com tamanho confortável, para ser lido sem esforço em qualquer tela.
          </p>
          <p className="specimen__cap">Legenda ou nota de apoio</p>
          <div className="specimen__pair">
            <div>
              <span className="specimen__aa specimen__aa--display">Aa</span>
              <small>Bricolage Grotesque · títulos</small>
            </div>
            <div>
              <span className="specimen__aa">Aa</span>
              <small>Inter · texto</small>
            </div>
          </div>
        </div>
      </div>

      <TypePlayground />
    </Slide>
  )
}

const CONCEPTS = [
  {
    title: 'Alinhamento',
    text: 'Elementos relacionados partem da mesma linha invisível. O olho percebe ordem.',
  },
  {
    title: 'Proximidade',
    text: 'O que está perto parece relacionado. Agrupe por significado, separe com espaço.',
  },
  {
    title: 'Espaço em branco',
    text: 'Respiro não é desperdício: dá foco e reduz o cansaço. Use uma escala (8, 16, 24, 32 px).',
  },
  {
    title: 'Hierarquia',
    text: 'Tamanho, peso e cor mostram o que é mais importante. Nem tudo pode gritar.',
  },
]

export function LayoutSlide() {
  return (
    <Slide id="layout" stage={3} tone="alt" title="Layout">
      <SlideHeader
        id="layout"
        eyebrow="05 · Fundamentos visuais · Layout"
        title="Organize para guiar o olhar."
        lead="Um bom layout diz às pessoas onde olhar primeiro, depois e por último, sem precisar de explicação."
      />
      <FixNote>conteúdo alinhado em um grid, espaçamento consistente e hierarquia clara.</FixNote>

      <div className="grid cols-4 stretch">
        {CONCEPTS.map((c) => (
          <div key={c.title} className="card">
            <h3 className="h3">{c.title}</h3>
            <p className="body">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="grid cols-2 stretch">
        <GridOverlay />
        <BeforeAfterCard />
      </div>
    </Slide>
  )
}

const FAMILIES = [
  {
    title: 'Navegação',
    items: 'Menu, breadcrumbs, abas, rodapé',
    tip: 'O usuário sempre sabe onde está e para onde pode ir.',
  },
  {
    title: 'Entrada de dados',
    items: 'Campos, seletores, checkboxes, datas',
    tip: 'Rótulo visível, ajuda clara e erros explicados.',
  },
  {
    title: 'Ações',
    items: 'Botões, links, menus de contexto',
    tip: 'Uma ação principal por tela, com texto que diz o que acontece.',
  },
  {
    title: 'Feedback',
    items: 'Carregando, sucesso, erro, toasts',
    tip: 'Toda ação merece uma resposta em menos de 1 segundo.',
  },
  {
    title: 'Conteúdo',
    items: 'Títulos, textos, imagens, vídeos, tabelas',
    tip: 'Escaneável: parágrafos curtos, listas e imagens com propósito.',
  },
  {
    title: 'Estrutura',
    items: 'Cards, listas, grids, modais',
    tip: 'Padrões repetidos criam familiaridade e reduzem a carga mental.',
  },
]

export function ElementsSlide() {
  return (
    <Slide id="elementos" stage={3} title="Elementos de um bom front-end">
      <SlideHeader
        id="elementos"
        eyebrow="06 · Os elementos de um bom front-end"
        title="Componentes consistentes, com todos os estados."
        lead="Bons sites são feitos de poucas peças bem resolvidas, reaproveitadas em todas as telas."
      />

      <div className="grid cols-3 stretch">
        {FAMILIES.map((f) => (
          <div key={f.title} className="card">
            <h3 className="h3">{f.title}</h3>
            <p className="small">{f.items}</p>
            <p className="body">{f.tip}</p>
          </div>
        ))}
      </div>

      <div className="grid cols-2 stretch">
        <ButtonStates />
        <LiveForm />
      </div>
    </Slide>
  )
}
