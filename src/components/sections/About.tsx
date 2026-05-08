import { siteData } from '@/lib/data'
import Image from 'next/image'

export default function About() {
  const initials = siteData.name.charAt(0)

  return (
    <section id="about" className="mx-auto max-w-[1100px] px-6 py-24">
      <h2 className="mb-12 text-4xl font-extrabold text-white">소개</h2>
      <div className="flex flex-col items-start gap-12 md:flex-row md:items-center">
        <div className="shrink-0">
          {siteData.avatar ? (
            <Image
              src={siteData.avatar}
              alt={siteData.name}
              width={180}
              height={180}
              className="rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-[180px] w-[180px] items-center justify-center rounded-2xl bg-accent/20 text-5xl font-bold text-accent-light">
              {initials}
            </div>
          )}
        </div>
        <div>
          <p className="text-lg leading-relaxed text-gray-300">{siteData.bio}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={`mailto:${siteData.email}`}
              className="text-sm text-gray-400 transition-colors hover:text-accent-light"
            >
              ✉ {siteData.email}
            </a>
            <a
              href={siteData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-accent-light"
            >
              GitHub ↗
            </a>
            <a
              href={siteData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-accent-light"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
