import { Shield, Sparkles, Zap } from 'lucide-react'

function Pin({ n }: { n: number }) {
  return (
    <span className="slop__pin" aria-hidden="true">
      {n}
    </span>
  )
}

export function SlopMock() {
  return (
    <div className="panel slop-wrap">
      <h3 className="panel__title">Anatomia de um &quot;AI slop&quot;</h3>
      <p className="panel__desc">Uma landing page gerada sem direção. Reconhece?</p>

      <div className="slop" role="img" aria-label="Exemplo de landing page genérica gerada por IA, com gradiente roxo, três cartões iguais e texto vago">
        <Pin n={1} />
        <p className="slop__badge">
          <Sparkles size={14} aria-hidden="true" /> Powered by AI
          <Pin n={4} />
        </p>
        <p className="slop__title">
          Eleve sua experiência para o próximo nível
          <Pin n={3} />
        </p>
        <p className="slop__text">Soluções inovadoras que transformam a forma como você trabalha.</p>
        <div className="slop__cta">
          <span>Começar agora</span>
          <span>Saiba mais</span>
        </div>
        <div className="slop__cards">
          <Pin n={2} />
          {[
            { icon: Zap, t: 'Rápido', d: 'Resultados incríveis em segundos.' },
            { icon: Shield, t: 'Seguro', d: 'Proteção de ponta a ponta.' },
            { icon: Sparkles, t: 'Inteligente', d: 'Tecnologia de última geração.' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="slop__card">
              <span className="slop__icon">
                <Icon size={18} aria-hidden="true" />
              </span>
              <strong>{t}</strong>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>

      <ol className="slop-legend">
        <li>
          <span>1</span> Gradiente roxo/azul &quot;padrão de IA&quot;
        </li>
        <li>
          <span>2</span> Três cartões idênticos com ícone + título + frase
        </li>
        <li>
          <span>3</span> Texto vago, que serve para qualquer produto
        </li>
        <li>
          <span>4</span> Selos e brilhos sem função
        </li>
      </ol>
    </div>
  )
}
