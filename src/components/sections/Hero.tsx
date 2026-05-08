import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center bg-background">
      <DevLabel name="Hero" file="src/components/sections/Hero.tsx" />
      <div className="mx-auto max-w-[1100px] px-6 w-full">
        <p className="mb-3 text-lg text-muted-foreground">안녕하세요,</p>
        <h1 className="text-5xl font-extrabold leading-tight text-foreground md:text-7xl">
          {siteData.name}
          <span className="text-muted-foreground">입니다.</span>
        </h1>
        <p className="mt-4 text-2xl font-semibold text-primary md:text-3xl">
          {siteData.title}
        </p>
        <div className="mt-10 flex gap-4">
          <Button asChild size="lg">
            <a href="#projects">프로젝트 보기</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">연락하기</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
