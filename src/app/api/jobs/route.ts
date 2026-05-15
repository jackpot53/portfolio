import { NextRequest, NextResponse } from 'next/server'

export interface JobItem {
  id: string
  title: string
  company: string
  companyLogo: string | null
  employmentType: string
  location: string
  postedAt: string
  applyLink: string
  skills: string[]
}

interface JSearchJob {
  job_id: string
  employer_name: string
  employer_logo: string | null
  job_title: string
  job_employment_type: string
  job_employment_types: string[] | null
  job_apply_link: string
  job_posted_at_datetime_utc: string
  job_city: string | null
  job_state: string | null
  job_country: string
  job_required_skills: string[] | null
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') ?? 'AI ML engineer jobs'
  const country = searchParams.get('country') ?? 'us'
  const date_posted = searchParams.get('date_posted') ?? 'month'
  const num_pages = searchParams.get('num_pages') ?? '1'

  const url = new URL('https://jsearch.p.rapidapi.com/search-v2')
  url.searchParams.set('query', query)
  url.searchParams.set('num_pages', num_pages)
  url.searchParams.set('country', country)
  url.searchParams.set('date_posted', date_posted)

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      'x-rapidapi-key': apiKey,
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: `Upstream API error: ${res.status}` },
      { status: res.status },
    )
  }

  const json = await res.json()
  const raw: JSearchJob[] = json?.data?.jobs ?? []

  const jobs: JobItem[] = raw.map((j) => ({
    id: j.job_id,
    title: j.job_title,
    company: j.employer_name,
    companyLogo: j.employer_logo ?? null,
    employmentType: j.job_employment_types?.[0] ?? j.job_employment_type ?? '',
    location: [j.job_city, j.job_country].filter(Boolean).join(', '),
    postedAt: j.job_posted_at_datetime_utc,
    applyLink: j.job_apply_link,
    skills: j.job_required_skills ?? [],
  }))

  return NextResponse.json({ jobs })
}
