import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'
import { Button } from '@/components/ui/button'
import HeroLottie from '@/components/sections/HeroLottie'
import HeroLottieWC from '@/components/sections/HeroLottieWC'
import { ArrowRight, Mail, ChevronDown } from 'lucide-react'
import HeroHeading from '@/components/sections/HeroHeading'

const stats = [
  { value: '3+', label: '년 경력' },
  { value: '10+', label: '프로젝트' },
  { value: '20+', label: '기술 스택' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center bg-background overflow-hidden">
      <DevLabel name="Hero" file="src/components/sections/Hero.tsx" />

      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroLottieWC />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 w-full py-32 flex items-center gap-12">

        {/* 좌측 텍스트 */}
        <div className="flex-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            {siteData.title}
          </div>

          <HeroHeading />

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {siteData.bio}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2">
              <a href="#projects">
                프로젝트 보기
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">연락하기</a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a href={siteData.github} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground">
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
            </a>
            <a href={siteData.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground">
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href={`mailto:${siteData.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground">
              <Mail className="size-5" />
            </a>
            <span className="h-4 w-px bg-border" />
            {stats.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-foreground">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 애니메이션 */}
        <div className="hidden md:block shrink-0 w-[500px]">
          <HeroLottie />
        </div>

      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50">
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <ChevronDown className="size-4 animate-bounce" />
      </div>
    </section>
  )
}
