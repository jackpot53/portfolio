import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/db'
import { experiences } from '@/db/schema'
import { eq } from 'drizzle-orm'
import ExperienceForm from '@/components/ui/ExperienceForm'
import { updateExperience } from '../../actions'

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: idStr } = await params
  const id = Number(idStr)

  const [row] = await db.select().from(experiences).where(eq(experiences.id, id))
  if (!row) notFound()

  const boundUpdate = updateExperience.bind(null, id)

  return (
    <main className="min-h-screen bg-bg py-24">
      <div className="mx-auto max-w-xl px-6">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-white">
            ← 돌아가기
          </Link>
          <h1 className="text-3xl font-extrabold text-white">경력 수정</h1>
        </div>
        <ExperienceForm
          action={boundUpdate}
          submitLabel="저장"
          defaultValues={{
            type: row.type,
            title: row.title,
            organization: row.organization,
            startedAt: row.startedAt,
            endedAt: row.endedAt,
            description: row.description,
            sortOrder: row.sortOrder,
          }}
        />
      </div>
    </main>
  )
}
