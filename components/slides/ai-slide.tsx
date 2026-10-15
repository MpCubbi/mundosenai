import { Slide, SlideHeader } from '@/components/presentation/slide'
import { SlopMock } from '@/components/demos/slop-mock'

export function AiSlide() {
  return (
    <Slide id="vibe-coding" stage={3} tone="alt" title="Vibe coding e AI slop">
      <SlideHeader
        id="vibe-coding"
        eyebrow="07 · Uma palavra sobre IA"
        title="A IA acelera o código. O critério continua sendo seu."
        lead="Em poucos minutos, ferramentas de IA geram uma interface inteira. O risco é entregar tudo sem olhar."
      />

      <div className="grid split">
        <div className="stack">
          <div className="card">
            <h3 className="h3">Vibe coding</h3>
            <p className="body">
              Descrever o que você quer em linguagem natural e deixar a IA escrever o código, aceitando o
              resultado quase sem revisar. Ótimo para protótipos e ideias rápidas.
            </p>
          </div>
          <div className="card card--tint">
            <h3 className="h3">AI slop</h3>
            <p className="body">
              Conteúdo e interfaces genéricos, repetitivos e sem intenção, produzidos em massa pela IA.
              Tudo parece &quot;ok&quot;, e nada parece de alguém.
            </p>
          </div>
          <ul className="list">
            <li>
              <strong>Dê direção:</strong> marca, público, referências e restrições de design.
            </li>
            <li>
              <strong>Revise com os fundamentos:</strong> contraste, hierarquia, teclado, mobile.
            </li>
            <li>
              <strong>Teste com pessoas</strong> e itere. A IA não sente a interface; você sim.
            </li>
          </ul>
        </div>
        <SlopMock />
      </div>
    </Slide>
  )
}
