import { Briefcase, GraduationCap } from 'lucide-react'

interface Item {
  id: string
  type: 'work' | 'education'
  title: string
  organization: string
  period: string
  description?: string
}

interface TimelineItemProps {
  item: Item
  isLast?: boolean
}

export default function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  const Icon = item.type === 'work' ? Briefcase : GraduationCap

  return (
    <div className="grid grid-cols-[148px_20px_1fr] items-start">

      {/* 날짜 */}
      <div className="pr-5 pt-4 text-right">
        <span className="text-xs leading-relaxed text-gray-400 whitespace-nowrap">{item.period}</span>
      </div>

      {/* 중앙: 아이콘 도트 + 세로선 */}
      <div className="flex flex-col items-center">
        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600 mt-3.5">
          <Icon className="size-3 text-white" />
        </div>
        {!isLast && <div className="mt-2 min-h-[32px] w-px flex-1 bg-gray-200" />}
      </div>

      {/* 내용 카드 */}
      <div className={`ml-5 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-md ${isLast ? 'mb-0' : 'mb-8'}`}>
        <h3 className="font-semibold text-gray-900 leading-snug">{item.title}</h3>
        <p className="mt-0.5 text-sm text-blue-600">{item.organization}</p>
        {item.description && (
          <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.description}</p>
        )}
      </div>

    </div>
  )
}
