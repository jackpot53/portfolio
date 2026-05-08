import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { experiences } from './schema'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(client)

async function seed() {
  console.log('Seeding experiences...')

  await db.delete(experiences)

  await db.insert(experiences).values([
    {
      type: 'work',
      title: 'ML 엔지니어',
      organization: '회사명',
      startedAt: '2023-01-01',
      endedAt: null,
      description: '추천 시스템 및 이상 탐지 모델 개발 및 운영',
      sortOrder: 0,
    },
    {
      type: 'work',
      title: '데이터 사이언티스트',
      organization: '이전 회사명',
      startedAt: '2021-03-01',
      endedAt: '2022-12-31',
      description: '고객 행동 분석 및 A/B 테스트 설계',
      sortOrder: 1,
    },
    {
      type: 'education',
      title: '컴퓨터공학 학사',
      organization: '대학교명',
      startedAt: '2017-03-01',
      endedAt: '2021-02-28',
      sortOrder: 2,
    },
  ])

  console.log('Done.')
  process.exit(0)
}

seed()
