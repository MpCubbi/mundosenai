import { Check } from 'lucide-react'

type SlideProps = {
  id: string
  title: string
  stage: 0 | 1 | 2 | 3 | 4 | 5 | 6
  tone?: 'default' | 'alt' | 'dark'
  children: React.ReactNode
}

export function Slide({ id, title, stage, tone = 'default', children }: SlideProps) {
  const toneClass = tone === 'alt' ? ' slide--alt' : tone === 'dark' ? ' slide--dark' : ''
  return (
    <section
      id={id}
      data-slide
      data-stage={stage}
      data-title={title}
      className={`slide${toneClass}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="slide__inner">{children}</div>
    </section>
  )
}

type SlideHeaderProps = {
  id: string
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  as?: 'h1' | 'h2'
}

export function SlideHeader({ id, eyebrow, title, lead, as = 'h2' }: SlideHeaderProps) {
  const Heading = as
  return (
    <header className="slide__head">
      <p className="eyebrow">{eyebrow}</p>
      <Heading id={`${id}-title`} className={as === 'h1' ? 'h1' : 'h2'}>
        {title}
      </Heading>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  )
}

export function FixNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="fixnote">
      <span className="fixnote__icon" aria-hidden="true">
        <Check size={14} strokeWidth={3} />
      </span>
      <span>
        <strong>Correção aplicada:</strong> {children}
      </span>
    </p>
  )
}
