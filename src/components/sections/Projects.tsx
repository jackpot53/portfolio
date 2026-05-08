import { siteData } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'

export default function Projects() {
  const featured = siteData.projects.find((p) => p.featured)!
  const rest = siteData.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="mx-auto max-w-[1100px] px-6 py-24">
      <h2 className="mb-12 text-4xl font-extrabold text-white">프로젝트</h2>
      <div className="mb-6">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent-light">
          대표 프로젝트
        </span>
        <ProjectCard project={featured} className="border-accent/30 bg-accent/5" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
