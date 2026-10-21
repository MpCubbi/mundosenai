'use client'

import { Check, Circle } from 'lucide-react'
import { STAGES, useStage } from './stage-provider'

export function Scoreboard() {
  const { stage } = useStage()
  const score = Math.round((stage / 6) * 100)

  return (
    <aside className="card scoreboard" aria-label="Placar de qualidade do front-end">
      <p className="eyebrow">Qualidade do front-end</p>
      <p className="stat__num" aria-live="polite">
        {score}%
      </p>
      <div
        className="meter"
        role="meter"
        aria-label="Qualidade do front-end"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
      >
        <span style={{ width: `${score}%` }} />
      </div>
      <ul className="score-list">
        {STAGES.slice(1).map((s) => {
          const done = stage >= s.id
          return (
            <li key={s.id} data-done={done}>
              {done ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Circle size={16} aria-hidden="true" />
              )}
              <span>
                {s.name}
                <span className="sr-only">{done ? ' (corrigido)' : ' (pendente)'}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
