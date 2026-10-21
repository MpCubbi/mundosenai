'use client'

import { useEffect, useState } from 'react'
import { useStage } from './stage-provider'

export function ChaosMarquee() {
  return (
    <div className="chaos chaos-marquee" aria-hidden="true">
      <span>
        *** BEM-VINDO AO MEU SITE!!! *** CLIQUE AQUI *** OFERTA IMPERDÍVEL *** NOVIDADES TODO DIA ***
        VISITE TAMBÉM A PÁGINA 2 ***
      </span>
    </div>
  )
}

export function ChaosCounter() {
  return (
    <p className="chaos chaos--inline chaos-counter">
      Você é o visitante nº 000123
    </p>
  )
}

export function ChaosSticker() {
  return (
    <span className="chaos chaos--inline chaos-sticker" aria-hidden="true">
      NOVO!
    </span>
  )
}

export function ChaosPopup() {
  const { stage } = useStage()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (stage < 3) setOpen(true)
  }, [stage])

  if (!open) return null

  return (
    <aside className="chaos chaos-popup" aria-label="Anúncio">
      <button
        type="button"
        className="chaos-popup__x"
        onClick={() => setOpen(false)}
        aria-label="Fechar anúncio"
      >
        x
      </button>
      PARABÉNS!!! Você ganhou um prêmio!!!
      <a href="#importancia">CLIQUE AQUI AGORA</a>
    </aside>
  )
}
