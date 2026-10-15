'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export const STAGES = [
  { id: 0, name: 'Site original', fix: 'Sem critérios de design' },
  { id: 1, name: 'Cores', fix: 'Paleta com contraste' },
  { id: 2, name: 'Tipografia', fix: 'Fontes, tamanhos e entrelinha' },
  { id: 3, name: 'Layout', fix: 'Espaçamento, grid e hierarquia' },
  { id: 4, name: 'Responsividade', fix: 'Adapta-se a qualquer tela' },
  { id: 5, name: 'Acessibilidade', fix: 'Foco, teclado e menos movimento' },
  { id: 6, name: 'Polimento', fix: 'Microinterações e acabamento' },
] as const

const FLAGS = ['colors', 'type', 'layout', 'responsive', 'a11y', 'polish'] as const

/** Tempo mínimo entre duas trocas de estágio: cobre as transições de 0,6 s do CSS. */
const SETTLE_MS = 750
/** Espera a rolagem "assentar" antes de confirmar um novo estágio. */
const DEBOUNCE_MS = 140
/** Por quanto tempo o slide ativo fica ancorado após uma troca de estágio. */
const ANCHOR_MS = 1000

type Engine = {
  captureAnchor: () => void
  startLoop: () => void
  scrollToSlide: (index: number) => void
  scrollByViewport: (factor: number) => void
}

type StageContextValue = {
  stage: number
  autoStage: number
  locked: number | null
  setLocked: (stage: number | null) => void
  activeIndex: number
  total: number
  activeTitle: string
  scrollProgress: number
  hudVisible: boolean
  setHudVisible: (visible: boolean) => void
  next: () => void
  prev: () => void
}

const StageContext = createContext<StageContextValue | null>(null)

export function useStage() {
  const ctx = useContext(StageContext)
  if (!ctx) throw new Error('useStage deve ser usado dentro de StageProvider')
  return ctx
}

export function StageProvider({ children }: { children: React.ReactNode }) {
  const [autoStage, setAutoStage] = useState(0)
  const [locked, setLocked] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const [activeTitle, setActiveTitle] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hudVisible, setHudVisible] = useState(true)

  const slidesRef = useRef<HTMLElement[]>([])
  const activeIndexRef = useRef(0)
  const engineRef = useRef<Engine | null>(null)

  const stage = locked ?? autoStage

  // Antes de trocar os atributos, guardamos a posição do slide ativo na página.
  // Assim o motor consegue compensar a mudança de altura enquanto o CSS anima.
  useLayoutEffect(() => {
    const root = document.documentElement
    engineRef.current?.captureAnchor()
    root.dataset.stage = String(stage)
    FLAGS.forEach((flag, index) => {
      if (stage >= index + 1) root.setAttribute(`data-${flag}`, '')
      else root.removeAttribute(`data-${flag}`)
    })
    engineRef.current?.startLoop()
  }, [stage])

  useEffect(() => {
    const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-slide]'))
    slidesRef.current = slides
    setTotal(slides.length)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    const absTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY
    const jump = (top: number) => window.scrollTo({ top, behavior: 'instant' })

    let anchor: { el: HTMLElement; abs: number; until: number } | null = null
    let nav: { target: () => number; start: number } | null = null
    let raf: number | null = null
    let lastFrame = 0
    let initialized = false
    let desiredStage = 0
    let committedStage = 0
    let lastCommit = 0
    let commitTimer: number | undefined

    const scheduleCommit = () => {
      window.clearTimeout(commitTimer)
      const wait = Math.max(DEBOUNCE_MS, lastCommit + SETTLE_MS - performance.now())
      commitTimer = window.setTimeout(() => {
        if (desiredStage === committedStage) return
        committedStage = desiredStage
        lastCommit = performance.now()
        setAutoStage(desiredStage)
      }, wait)
    }

    const updateActive = () => {
      const mid = window.innerHeight / 2
      let index = 0
      for (let i = 0; i < slides.length; i++) {
        if (slides[i].getBoundingClientRect().top <= mid) index = i
      }
      const slide = slides[index]
      if (!slide) return

      if (index !== activeIndexRef.current) {
        activeIndexRef.current = index
        setActiveIndex(index)
        setActiveTitle(slide.dataset.title ?? '')
      }

      const wanted = Number(slide.dataset.stage ?? 0)
      if (!initialized) {
        initialized = true
        desiredStage = wanted
        committedStage = wanted
        setAutoStage(wanted)
        setActiveTitle(slide.dataset.title ?? '')
        return
      }
      if (wanted !== desiredStage) {
        desiredStage = wanted
        scheduleCommit()
      }
    }

    const tick = (now: number) => {
      raf = null
      const dt = Math.min(48, lastFrame ? now - lastFrame : 16)
      lastFrame = now
      let keepGoing = false

      if (anchor) {
        const abs = absTop(anchor.el)
        const shift = abs - anchor.abs
        anchor.abs = abs
        if (!nav && Math.abs(shift) > 0.5) jump(window.scrollY + shift)
        if (now < anchor.until) keepGoing = true
        else anchor = null
      }

      if (nav) {
        const target = Math.min(maxScroll(), Math.max(0, nav.target()))
        const diff = target - window.scrollY
        if (Math.abs(diff) < 1 || now - nav.start > 2200) {
          jump(target)
          nav = null
        } else {
          const ease = 1 - Math.exp(-dt / 130)
          const step = Math.sign(diff) * Math.min(Math.abs(diff), Math.max(1.5, Math.abs(diff) * ease))
          jump(window.scrollY + step)
          keepGoing = true
        }
      }

      if (keepGoing) raf = requestAnimationFrame(tick)
      else lastFrame = 0
    }

    const startLoop = () => {
      if (raf === null) raf = requestAnimationFrame(tick)
    }

    const engine: Engine = {
      captureAnchor: () => {
        const el = slides[activeIndexRef.current]
        if (!el) return
        anchor = { el, abs: absTop(el), until: performance.now() + ANCHOR_MS }
      },
      startLoop,
      scrollToSlide: (index) => {
        const target = slides[Math.max(0, Math.min(slides.length - 1, index))]
        if (!target) return
        if (reduceMotion.matches) return jump(Math.min(maxScroll(), absTop(target)))
        nav = { target: () => absTop(target), start: performance.now() }
        startLoop()
      },
      scrollByViewport: (factor) => {
        const to = window.scrollY + window.innerHeight * factor
        if (reduceMotion.matches) return jump(Math.min(maxScroll(), Math.max(0, to)))
        nav = { target: () => to, start: performance.now() }
        startLoop()
      },
    }
    engineRef.current = engine

    let scrollFrame: number | null = null
    const onScroll = () => {
      if (scrollFrame !== null) return
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = null
        const max = maxScroll()
        setScrollProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
        updateActive()
      })
    }
    const cancelNav = () => {
      nav = null
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('wheel', cancelNav, { passive: true })
    window.addEventListener('touchstart', cancelNav, { passive: true })
    window.addEventListener('mousedown', cancelNav)

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            revealObserver.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    document
      .querySelectorAll('.card, .stat, .panel')
      .forEach((el) => revealObserver.observe(el))

    return () => {
      engineRef.current = null
      window.clearTimeout(commitTimer)
      if (raf !== null) cancelAnimationFrame(raf)
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame)
      revealObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', cancelNav)
      window.removeEventListener('touchstart', cancelNav)
      window.removeEventListener('mousedown', cancelNav)
    }
  }, [])

  const goToIndex = useCallback((index: number) => {
    engineRef.current?.scrollToSlide(index)
  }, [])

  const next = useCallback(() => {
    const current = slidesRef.current[activeIndexRef.current]
    if (current && current.getBoundingClientRect().bottom > window.innerHeight + 120) {
      engineRef.current?.scrollByViewport(0.8)
      return
    }
    goToIndex(activeIndexRef.current + 1)
  }, [goToIndex])

  const prev = useCallback(() => {
    const current = slidesRef.current[activeIndexRef.current]
    if (current && current.getBoundingClientRect().top < -120) {
      engineRef.current?.scrollByViewport(-0.8)
      return
    }
    goToIndex(activeIndexRef.current - 1)
  }, [goToIndex])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case 'PageDown':
          event.preventDefault()
          next()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
          event.preventDefault()
          prev()
          break
        case 'Home':
          event.preventDefault()
          goToIndex(0)
          break
        case 'End':
          event.preventDefault()
          goToIndex(slidesRef.current.length - 1)
          break
        case 'h':
        case 'H':
          setHudVisible((v) => !v)
          break
        case 'a':
        case 'A':
          setLocked(null)
          break
        default:
          if (/^[0-6]$/.test(event.key)) setLocked(Number(event.key))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goToIndex])

  const value = useMemo(
    () => ({
      stage,
      autoStage,
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
    }),
    [
      stage,
      autoStage,
      locked,
      activeIndex,
      total,
      activeTitle,
      scrollProgress,
      hudVisible,
      next,
      prev,
    ],
  )

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>
}
