import Link from 'next/link'
import ExperienceForm from '@/components/ui/ExperienceForm'
import { createExperience } from '../actions'

export default function NewExperiencePage() {
  return (
    <main className="min-h-screen bg-bg py-24">
      <div className="mx-auto max-w-xl px-6">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-white">
            ← 돌아가기
          </Link>
          <h1 className="text-3xl font-extrabold text-white">경력 추가</h1>
        </div>
        <ExperienceForm action={createExperience} submitLabel="추가" />
      </div>
    </main>
  )
}
