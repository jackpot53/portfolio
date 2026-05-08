import { db } from '@/db'
import { experiences } from '@/db/schema'
import { asc } from 'drizzle-orm'
import TimelineItem from '@/components/ui/TimelineItem'
import { formatPeriod } from '@/lib/format'

export default async function Experience() {
  const rows = await db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.sortOrder))

  return (
    <section id="experience" className="bg-surface/50 py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="mb-12 text-4xl font-extrabold text-white">경력 / 학력</h2>
        <div className="max-w-2xl">
          {rows.length === 0 ? (
            <p className="text-gray-500">등록된 경력·학력이 없습니다.</p>
          ) : (
            rows.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={{
                  id: String(item.id),
                  type: item.type as 'work' | 'education',
                  title: item.title,
                  organization: item.organization,
                  period: formatPeriod(item.startedAt, item.endedAt),
                  description: item.description ?? undefined,
                }}
                isLast={index === rows.length - 1}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
