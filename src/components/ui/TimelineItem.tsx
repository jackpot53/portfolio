import type { Experience } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

type TimelineItemProps = {
  item: Experience
  isLast?: boolean
}

export default function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-primary ring-2 ring-primary/30" />
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>
      <div className={cn('pb-8 w-full', isLast && 'pb-0')}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-foreground">{item.title}</span>
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{item.organization}</span>
        </div>
        <p className="mt-0.5 text-xs text-primary">{item.period}</p>
        {item.description && (
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        )}
        {!isLast && <Separator className="mt-6" />}
      </div>
    </div>
  )
}
