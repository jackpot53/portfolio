import { siteData } from '@/lib/data'
import Image from 'next/image'
import DevLabel from '@/components/ui/DevLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import { UserRound } from 'lucide-react'

export default function About() {
  const initials = siteData.name.charAt(0)

  return (
    <section id="about" className="relative mx-auto max-w-[1100px] px-6 py-24">
      <DevLabel name="About" file="src/components/sections/About.tsx" />
      <SectionTitle icon={UserRound} color="blue">소개</SectionTitle>
      <div className="flex flex-col items-start gap-12 md:flex-row md:items-center">
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
        <div>
          <div className="space-y-4">
            {siteData.bio.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={`mailto:${siteData.email}`}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              ✉ {siteData.email}
            </a>
            <a
              href={siteData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              GitHub ↗
            </a>
            <a
              href={siteData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
