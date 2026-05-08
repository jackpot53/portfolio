import Link from 'next/link'
import { db } from '@/db'
import { experiences } from '@/db/schema'
import { desc } from 'drizzle-orm'
import TimelineItem from '@/components/ui/TimelineItem'
import { formatPeriod } from '@/lib/format'
import { deleteExperience } from '@/app/admin/experiences/actions'
import DevLabel from '@/components/ui/DevLabel'
import FadeUp from '@/components/ui/FadeUp'
import { Button } from '@/components/ui/button'
import SectionTitle from '@/components/ui/SectionTitle'
import { Briefcase } from 'lucide-react'

export default async function Experience() {
  const rows = await db
    .select()
    .from(experiences)
    .orderBy(desc(experiences.startedAt))

  return (
    <section id="experience" className="relative overflow-hidden bg-white py-16">
      <DevLabel name="Experience" file="src/components/sections/Experience.tsx" />
      <div className="animate-float-a pointer-events-none absolute -left-40 top-1/4 size-[480px] rounded-full bg-blue-100/30 blur-3xl" />
      <div className="animate-float-b pointer-events-none absolute -right-40 bottom-1/4 size-[400px] rounded-full bg-sky-100/25 blur-3xl" />
      <div className="animate-float-c pointer-events-none absolute -left-20 bottom-10 size-[320px] rounded-full bg-indigo-50/30 blur-3xl" />
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeUp>
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <SectionTitle icon={Briefcase} color="orange">경력 / 학력</SectionTitle>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0 self-start mt-1">
              <Link href="/admin/experiences/new">+ 경력사항 생성</Link>
            </Button>
          </div>
        </FadeUp>
        <div className="mt-10">
          {rows.length === 0 ? (
            <p className="text-muted-foreground">등록된 경력·학력이 없습니다.</p>
          ) : (
            rows.map((item, index) => {
              const boundDelete = deleteExperience.bind(null, item.id)
              return (
                <FadeUp key={item.id} delay={index * 120}>
                <div className="group relative">
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
                </FadeUp>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
