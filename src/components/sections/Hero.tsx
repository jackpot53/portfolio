import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <DevLabel name="Hero" file="src/components/sections/Hero.tsx" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[120px]"
      />
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 w-full">
        <p className="mb-3 text-lg text-gray-400">안녕하세요,</p>
        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {siteData.name}
          </span>
          <span className="text-white">입니다.</span>
        </h1>
        <p className="mt-4 text-2xl font-semibold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent md:text-3xl">
          {siteData.title}
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-border px-6 py-3 font-semibold text-gray-300 transition-colors hover:border-accent hover:text-white"
          >
            연락하기
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        ↓
      </div>
    </section>
  )
}
