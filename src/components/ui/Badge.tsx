import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'accent'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full border px-3 py-1 text-sm font-medium transition-transform hover:-translate-y-0.5',
        variant === 'default' && 'border-border bg-surface text-gray-300',
        variant === 'accent' && 'border-accent bg-accent/10 text-accent-light',
        className,
      )}
    >
      {children}
    </span>
  )
}
