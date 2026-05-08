import Link from 'next/link'
import { db } from '@/db'
import { experiences } from '@/db/schema'
import { asc } from 'drizzle-orm'
import TimelineItem from '@/components/ui/TimelineItem'
import { formatPeriod } from '@/lib/format'
import { deleteExperience } from '@/app/admin/experiences/actions'
import DevLabel from '@/components/ui/DevLabel'
import { Button } from '@/components/ui/button'

export default async function Experience() {
  const rows = await db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.sortOrder))

  return (
    <section id="experience" className="relative bg-secondary py-24">
      <DevLabel name="Experience" file="src/components/sections/Experience.tsx" />
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-4xl font-extrabold text-foreground">경력 / 학력</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/experiences/new">+ 경력사항 생성</Link>
          </Button>
        </div>
        <div className="max-w-2xl">
          {rows.length === 0 ? (
            <p className="text-muted-foreground">등록된 경력·학력이 없습니다.</p>
          ) : (
            rows.map((item, index) => {
              const boundDelete = deleteExperience.bind(null, item.id)
              return (
                <div key={item.id} className="group relative">
                  <TimelineItem
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
                  <div className="absolute right-0 top-0 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link
                      href={`/admin/experiences/${item.id}/edit`}
                      className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      수정
                    </Link>
                    <form action={boundDelete}>
                      <button
                        type="submit"
                        className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-red-50 hover:text-red-600"
                      >
                        삭제
                      </button>
                    </form>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
