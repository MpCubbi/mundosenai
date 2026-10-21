'use client'

import { useId, useState } from 'react'
import { CheckCircle2, TriangleAlert } from 'lucide-react'

const GOOD = { size: 18, lineHeight: 1.6, measure: 60 }
const BAD = { size: 11, lineHeight: 1.0, measure: 90 }

export function TypePlayground() {
  const [size, setSize] = useState<number>(GOOD.size)
  const [lineHeight, setLineHeight] = useState<number>(GOOD.lineHeight)
  const [measure, setMeasure] = useState<number>(GOOD.measure)
  const id = useId()

  const warnings: string[] = []
  if (size < 16) warnings.push('Fonte pequena: use pelo menos 16 px no texto corrido.')
  if (lineHeight < 1.4) warnings.push('Entrelinha apertada: o ideal fica entre 1,4 e 1,6.')
  if (lineHeight > 1.9) warnings.push('Entrelinha solta demais: as linhas parecem desconectadas.')
  if (measure > 80) warnings.push('Linha longa: o olho se perde. Ideal: 45 a 75 caracteres.')
  if (measure < 35) warnings.push('Linha curta demais: leitura fragmentada.')

  return (
    <div className="panel tp">
      <div className="tp__controls">
        <div className="tp__field">
          <label htmlFor={`${id}-size`}>
            Tamanho <output>{size}px</output>
          </label>
          <input
            id={`${id}-size`}
            type="range"
            min={10}
            max={28}
            step={1}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
        <div className="tp__field">
          <label htmlFor={`${id}-lh`}>
            Entrelinha <output>{lineHeight.toFixed(1).replace('.', ',')}</output>
          </label>
          <input
            id={`${id}-lh`}
            type="range"
            min={1}
            max={2.2}
            step={0.1}
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
          />
        </div>
        <div className="tp__field">
          <label htmlFor={`${id}-ch`}>
            Largura da linha <output>{measure} caracteres</output>
          </label>
          <input
            id={`${id}-ch`}
            type="range"
            min={20}
            max={100}
            step={5}
            value={measure}
            onChange={(e) => setMeasure(Number(e.target.value))}
          />
        </div>
        <div className="tp__presets">
          <button
            type="button"
            className="d-btn"
            onClick={() => {
              setSize(BAD.size)
              setLineHeight(BAD.lineHeight)
              setMeasure(BAD.measure)
            }}
          >
            Deixar ruim
          </button>
          <button
            type="button"
            className="d-btn d-btn--primary"
            onClick={() => {
              setSize(GOOD.size)
              setLineHeight(GOOD.lineHeight)
              setMeasure(GOOD.measure)
            }}
          >
            Ajuste ideal
          </button>
        </div>
      </div>

      <div className="tp__preview">
        <p
          className="tp__text"
          style={{
            fontSize: `${size}px`,
            lineHeight,
            maxWidth: `${measure}ch`,
          }}
        >
          Uma boa tipografia é quase invisível: ninguém percebe quando está certa, mas todo mundo sente
          quando está errada. Tamanho, espaço entre linhas e largura do parágrafo decidem se as pessoas
          vão ler o seu conteúdo até o fim ou desistir nas primeiras linhas.
        </p>
        <div
          className={`tp__verdict ${warnings.length === 0 ? 'is-ok' : 'is-warn'}`}
          aria-live="polite"
        >
          {warnings.length === 0 ? (
            <p>
              <CheckCircle2 size={18} aria-hidden="true" /> Legibilidade confortável.
            </p>
          ) : (
            <ul>
              {warnings.map((w) => (
                <li key={w}>
                  <TriangleAlert size={16} aria-hidden="true" /> {w}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
