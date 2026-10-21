import { StageProvider } from '@/components/presentation/stage-provider'
import { Hud } from '@/components/presentation/hud'
import { ChaosPopup } from '@/components/presentation/chaos'
import { AnatomySlide, HeroSlide, ImportanceSlide } from '@/components/slides/intro-slides'
import {
  ColorsSlide,
  ElementsSlide,
  LayoutSlide,
  TypographySlide,
} from '@/components/slides/design-slides'
import { AiSlide } from '@/components/slides/ai-slide'
import {
  HeuristicsSlide,
  LawsSlide,
  UiUxSlide,
} from '@/components/slides/ux-slides'
import {
  AccessibilityPracticeSlide,
  AccessibilitySlide,
  ResponsiveSlide,
} from '@/components/slides/responsive-a11y-slides'
import { FinalSlide } from '@/components/slides/final-slide'

export default function Page() {
  return (
    <StageProvider>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <ChaosPopup />
      <main id="conteudo" className="page">
        <HeroSlide />
        <ImportanceSlide />
        <AnatomySlide />
        <ColorsSlide />
        <TypographySlide />
        <LayoutSlide />
        <ElementsSlide />
        <AiSlide />
        <UiUxSlide />
        <HeuristicsSlide />
        <LawsSlide />
        <ResponsiveSlide />
        <AccessibilitySlide />
        <AccessibilityPracticeSlide />
        <FinalSlide />
      </main>
      <Hud />
    </StageProvider>
  )
}
