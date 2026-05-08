import DevLabel from '@/components/ui/DevLabel'
import HeroLottie from '@/components/sections/HeroLottie'
import HeroLottieWC from '@/components/sections/HeroLottieWC'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-end bg-background overflow-hidden">
      <DevLabel name="Hero" file="src/components/sections/Hero.tsx" />

      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroLottieWC />
      </div>

      {/* 우측 애니메이션 */}
      <div className="relative z-10 hidden md:block w-[560px] shrink-0 pr-12">
        <HeroLottie />
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50">
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <ChevronDown className="size-4 animate-bounce" />
      </div>
    </section>
  )
}
