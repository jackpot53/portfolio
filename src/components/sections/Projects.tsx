import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import FadeUp from '@/components/ui/FadeUp'
import { FolderOpen, Star, ExternalLink } from 'lucide-react'
import ProjectSvg from '@/components/ui/ProjectSvg'

function GitHubIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-white py-16">
      <DevLabel name="Projects" file="src/components/sections/Projects.tsx" />
      <div className="animate-float-b pointer-events-none absolute -left-40 top-1/4 size-[460px] rounded-full bg-emerald-100/25 blur-3xl" />
      <div className="animate-float-a pointer-events-none absolute -right-40 bottom-1/3 size-[420px] rounded-full bg-green-50/30 blur-3xl" />
      <div className="animate-float-c pointer-events-none absolute -left-20 bottom-10 size-[320px] rounded-full bg-teal-50/20 blur-3xl" />
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeUp><SectionTitle icon={FolderOpen} color="emerald">프로젝트</SectionTitle></FadeUp>

      <div className="relative">
        {/* 타임라인 세로선 */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-border via-border to-transparent" />

        <div className="space-y-10">
          {siteData.projects.map((project, index) => (
            <FadeUp key={project.id} delay={index * 150}>
            <div className="relative flex gap-8">

              {/* 타임라인 도트 */}
              <div className="relative z-10 flex shrink-0 flex-col items-center">
                <div className={`flex size-8 items-center justify-center rounded-full border-2 ${
                  project.featured
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-border bg-background'
                }`}>
                  {project.featured
                    ? <Star className="size-3.5 fill-emerald-500 text-emerald-500" />
                    : <span className="text-xs font-bold text-muted-foreground">{index + 1}</span>
                  }
                </div>
              </div>

              {/* 프로젝트 카드 */}
              <div className={`relative mb-2 flex-1 overflow-hidden rounded-2xl border p-6 transition-shadow hover:shadow-md ${
                project.featured
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-border bg-background'
              }`}>
                {project.featured && (
                  <span className="mb-2 inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                    대표 프로젝트
                  </span>
                )}
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-emerald-600 transition-colors hover:text-emerald-700"
                    >
                      <ExternalLink className="size-3.5" />
                      데모
                    </a>
                  )}
                </div>

                {/* 배경 SVG */}
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <ProjectSvg projectId={project.id} />
                </div>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground pr-36">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-muted-foreground/70 hover:text-primary transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
            </FadeUp>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}
