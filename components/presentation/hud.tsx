'use client'

import { ChevronDown, ChevronUp, Download, EyeOff, Eye } from 'lucide-react'
import { STAGES, useStage } from './stage-provider'

export function Hud() {
  const {
    stage,
    locked,
    setLocked,
    activeIndex,
    total,
    activeTitle,
    scrollProgress,
    hudVisible,
    setHudVisible,
    next,
    prev,
  } = useStage()

  const current = STAGES[stage]

  function downloadSite() {
    const content = document.querySelector('main.page')?.outerHTML
    if (!content) return

    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map((link) => `<link rel="stylesheet" href="${(link as HTMLLinkElement).href}">`)
      .join('')

    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Front-end: da bagunça à experiência</title>${styles}</head><body>${content}</body></html>`
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'apresentacao-front-end.html'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="hud-progress" aria-hidden="true">
        <div className="hud-progress__bar" style={{ width: `${scrollProgress * 100}%` }} />
      </div>

      {hudVisible ? (
        <nav className="hud" aria-label="Controles do apresentador">
          <div className="hud__status" aria-live="polite">
            <strong>
              Estágio {stage}/6 · {current.name}
            </strong>
            <span>
              Slide {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
              {activeTitle ? ` · ${activeTitle}` : ''}
            </span>
          </div>

          <ol className="hud__steps">
            {STAGES.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="hud__dot"
                  data-done={s.id < stage}
                  aria-current={s.id === stage ? 'step' : undefined}
                  aria-label={`Estágio ${s.id}: ${s.name}. ${s.fix}`}
                  title={`${s.name} — ${s.fix}`}
                  onClick={() => setLocked(s.id)}
                >
                  {s.id}
                </button>
              </li>
            ))}
          </ol>

          <button
            type="button"
            className="hud__btn"
            aria-pressed={locked === null}
            onClick={() => setLocked(null)}
            title="Estágio acompanha a rolagem (tecla A)"
          >
            {locked === null ? 'Auto' : 'Travado'}
          </button>

          <span className="hud__sep" aria-hidden="true" />

          <button
            type="button"
            className="hud__btn"
            onClick={downloadSite}
            aria-label="Baixar o site em HTML"
            title="Baixar site em HTML"
          >
            <Download size={16} aria-hidden="true" />
          </button>
          <button type="button" className="hud__btn" onClick={prev} aria-label="Slide anterior">
            <ChevronUp size={16} aria-hidden="true" />
          </button>
          <button type="button" className="hud__btn" onClick={next} aria-label="Próximo slide">
            <ChevronDown size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hud__btn"
            onClick={() => setHudVisible(false)}
            aria-label="Esconder controles (tecla H)"
            title="Esconder controles (H)"
          >
            <EyeOff size={16} aria-hidden="true" />
          </button>
        </nav>
      ) : (
        <button
          type="button"
          className="hud-reveal"
          onClick={() => setHudVisible(true)}
          aria-label="Mostrar controles do apresentador"
        >
          <Eye size={14} aria-hidden="true" style={{ display: 'inline', marginRight: 6 }} />
          Controles
        </button>
      )}
    </>
  )
}
