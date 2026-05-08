import { siteData } from '@/lib/data'
import Image from 'next/image'
import DevLabel from '@/components/ui/DevLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import HeroHeading from '@/components/sections/HeroHeading'
import FadeUp from '@/components/ui/FadeUp'
import { UserRound, Mail } from 'lucide-react'

const stats = [
  { value: '3+', label: '년 경력' },
  { value: '10+', label: '프로젝트' },
  { value: '20+', label: '기술 스택' },
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-16">
      <DevLabel name="About" file="src/components/sections/About.tsx" />
      <div className="animate-float-a pointer-events-none absolute -left-40 top-1/3 size-[440px] rounded-full bg-teal-100/25 blur-3xl" />
      <div className="animate-float-b pointer-events-none absolute -right-40 bottom-1/4 size-[400px] rounded-full bg-cyan-100/20 blur-3xl" />
      <div className="animate-float-c pointer-events-none absolute -right-20 top-10 size-[300px] rounded-full bg-sky-50/30 blur-3xl" />
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeUp><SectionTitle icon={UserRound} color="blue">소개</SectionTitle></FadeUp>
        <FadeUp delay={150} className="flex w-full flex-col gap-12 md:flex-row md:items-center">

        {/* 좌측: 아바타 */}
        <div className="shrink-0">
          <div className="relative size-[180px] rounded-full ring-4 ring-primary/20 ring-offset-4 ring-offset-background overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/9d/99/b9/9d99b905a2fcc14e1e9a37e0ce6d17de.jpg"
              alt={siteData.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 우측: 배지 + 이름 + 소개글 + 버튼 + 소셜 */}
        <div className="flex-1">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            {siteData.title}
          </div>
          <div className="mb-8">
            <HeroHeading />
          </div>

          <div className="space-y-4">
            {siteData.bio.split('\n\n').map((paragraph, i) => (
              <p key={i} className="font-section text-lg leading-relaxed text-muted-foreground">{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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

        </FadeUp>
      </div>
    </section>
  )
}
