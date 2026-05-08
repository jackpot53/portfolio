import type { Project } from '@/lib/data'
import { cn } from '@/lib/utils'
import Badge from './badge'

type ProjectCardProps = {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative rounded-xl border border-border bg-surface p-6 transition-all',
        'hover:border-accent/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]',
        className,
      )}
    >
      <h3 className="text-lg font-bold text-white">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-400">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="accent">{tag}</Badge>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 underline-offset-4 hover:text-white hover:underline"
        >
          GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent-light underline-offset-4 hover:underline"
          >
            데모
          </a>
        )}
      </div>
    </article>
  )
}
