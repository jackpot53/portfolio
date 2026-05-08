import type { Experience } from '@/lib/data'
import { cn } from '@/lib/utils'

type TimelineItemProps = {
  item: Experience
  isLast?: boolean
}

export default function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-accent ring-2 ring-accent/30" />
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>
      <div className={cn('pb-8', isLast && 'pb-0')}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-white">{item.title}</span>
          <span className="text-sm text-gray-500">·</span>
          <span className="text-sm text-gray-400">{item.organization}</span>
        </div>
        <p className="mt-0.5 text-xs text-accent-light">{item.period}</p>
        {item.description && (
          <p className="mt-1 text-sm text-gray-400">{item.description}</p>
        )}
      </div>
    </div>
  )
}
