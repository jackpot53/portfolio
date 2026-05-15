'use client'

import { useEffect, useState } from 'react'
import { Briefcase, MapPin, Clock, ExternalLink, Building2 } from 'lucide-react'
import Image from 'next/image'
import type { JobItem } from '@/app/api/jobs/route'
import DevLabel from '@/components/ui/DevLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import FadeUp from '@/components/ui/FadeUp'

const EMPLOYMENT_TYPE_LABEL: Record<string, string> = {
  FULLTIME: '정규직',
  PARTTIME: '파트타임',
  CONTRACTOR: '계약직',
  INTERN: '인턴',
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return '오늘'
  if (days < 7) return `${days}일 전`
  if (days < 30) return `${Math.floor(days / 7)}주 전`
  return `${Math.floor(days / 30)}개월 전`
}

function JobCard({ job, index }: { job: JobItem; index: number }) {
  return (
    <FadeUp delay={index * 60}>
      <a
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {job.companyLogo ? (
              <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border border-gray-100">
                <Image
                  src={job.companyLogo}
                  alt={job.company}
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                  unoptimized
                />
              </div>
            ) : (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                <Building2 className="size-5" />
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {job.title}
              </p>
              <p className="text-xs text-gray-500">{job.company}</p>
            </div>
          </div>
          <ExternalLink className="mt-0.5 size-4 shrink-0 text-gray-300 transition-colors group-hover:text-blue-400" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
          {job.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {job.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {timeAgo(job.postedAt)}
          </span>
          {job.employmentType && (
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-600">
              {EMPLOYMENT_TYPE_LABEL[job.employmentType] ?? job.employmentType}
            </span>
          )}
        </div>

        {/* Skills */}
        {job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {job.skills.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 5 && (
              <span className="text-xs text-gray-400">+{job.skills.length - 5}</span>
            )}
          </div>
        )}
      </a>
    </FadeUp>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="size-10 shrink-0 animate-pulse rounded-xl bg-gray-100" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3.5 w-40 animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="flex gap-1.5">
        <div className="h-5 w-14 animate-pulse rounded-full bg-gray-100" />
        <div className="h-5 w-16 animate-pulse rounded-full bg-gray-100" />
        <div className="h-5 w-12 animate-pulse rounded-full bg-gray-100" />
      </div>
    </div>
  )
}

export default function Jobs() {
  const [jobs, setJobs] = useState<JobItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setJobs(data.jobs)
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : '공고를 불러오지 못했습니다.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="jobs" className="relative bg-gray-50 py-16">
      <DevLabel name="Jobs" file="src/components/sections/Jobs.tsx" />
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeUp>
          <SectionTitle icon={Briefcase} color="blue">채용 공고</SectionTitle>
        </FadeUp>
        <FadeUp delay={80}>
          <p className="mb-10 text-sm text-gray-500">
            AI / ML 엔지니어 관련 최신 채용 공고입니다.
          </p>
        </FadeUp>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-8 text-center text-sm text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 text-center text-sm text-gray-400">
            현재 공고가 없습니다.
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
