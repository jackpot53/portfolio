import { type LucideIcon } from 'lucide-react'

type Color = 'blue' | 'purple' | 'emerald' | 'orange' | 'rose'

const colorMap: Record<Color, { icon: string; line: string }> = {
  blue:    { icon: 'text-blue-500',    line: 'from-blue-500/50' },
  purple:  { icon: 'text-purple-500',  line: 'from-purple-500/50' },
  emerald: { icon: 'text-emerald-500', line: 'from-emerald-500/50' },
  orange:  { icon: 'text-orange-500',  line: 'from-orange-500/50' },
  rose:    { icon: 'text-rose-500',    line: 'from-rose-500/50' },
}

interface SectionTitleProps {
  icon: LucideIcon
  color?: Color
  children: React.ReactNode
}

export default function SectionTitle({ icon: Icon, color = 'blue', children }: SectionTitleProps) {
  const c = colorMap[color]
  return (
    <div className="mb-12 flex items-center gap-4">
      <div className={`flex size-10 shrink-0 items-center justify-center ${c.icon}`}>
        <Icon className="size-5" />
      </div>
      <h2 className="font-section text-3xl text-foreground">{children}</h2>
      <div className={`h-px flex-1 bg-gradient-to-r ${c.line} to-transparent`} />
    </div>
  )
}
