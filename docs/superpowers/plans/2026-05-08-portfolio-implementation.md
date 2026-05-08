# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** AI/ML 엔지니어 포트폴리오 사이트를 Next.js App Router로 구현한다 — 단일 페이지 스크롤, 다크 배경, 퍼플 강조색.

**Architecture:** `src/lib/data.ts`에 모든 콘텐츠를 정적 데이터로 관리하고, Server Component인 `app/page.tsx`가 섹션 컴포넌트를 조합한다. 스크롤 연동 네비게이션은 `IntersectionObserver`를 사용하는 Client Component로 분리한다.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, pnpm, Jest + React Testing Library

---

## 파일 구조

```
src/
  app/
    layout.tsx          # 폰트·메타데이터·Navbar 포함 루트 레이아웃
    page.tsx            # 섹션 조합 (Server Component)
    globals.css         # 디자인 토큰, 기본 스타일
  components/
    Navbar.tsx          # 고정 상단 네비게이션 (Client Component)
    sections/
      Hero.tsx
      About.tsx
      Skills.tsx
      Projects.tsx
      Experience.tsx
      Contact.tsx
    ui/
      Badge.tsx         # 스킬 태그 pill
      ProjectCard.tsx
      TimelineItem.tsx
  lib/
    data.ts             # 정적 콘텐츠 데이터
    utils.ts            # cn() 유틸리티
__tests__/
  lib/
    utils.test.ts
    data.test.ts
  components/
    Badge.test.tsx
    ProjectCard.test.tsx
    TimelineItem.test.tsx
    Navbar.test.tsx
```

---

## Task 1: Next.js 프로젝트 초기화

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: 프로젝트 생성**

```bash
pnpm create next-app . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

프롬프트에서 모두 기본값 선택.

- [ ] **Step 2: 생성 확인**

```bash
pnpm dev
```

`localhost:3000` 에서 Next.js 기본 페이지가 보이면 성공.

- [ ] **Step 3: 불필요한 보일러플레이트 제거**

`src/app/page.tsx` 내용을 다음으로 교체:

```tsx
export default function Home() {
  return <main>포트폴리오</main>
}
```

`src/app/globals.css` 내용을 다음으로 교체 (Tailwind 지시어만 유지):

```css
@import "tailwindcss";
```

`public/` 폴더의 기본 SVG 파일 삭제:

```bash
rm public/next.svg public/vercel.svg
```

- [ ] **Step 4: 커밋**

```bash
git add -A
git commit -m "feat: initialize Next.js project"
```

---

## Task 2: 테스트 인프라 설정

**Files:**
- Create: `jest.config.ts`, `jest.setup.ts`
- Modify: `package.json`

- [ ] **Step 1: 의존성 설치**

```bash
pnpm add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest ts-jest
```

- [ ] **Step 2: `jest.config.ts` 생성**

```ts
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
}

export default config
```

- [ ] **Step 3: `jest.setup.ts` 생성**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: `package.json`에 test 스크립트 추가**

`scripts` 블록에 추가:

```json
"test": "jest",
"test:watch": "jest --watch",
"type-check": "tsc --noEmit"
```

- [ ] **Step 5: 설정 확인**

```bash
pnpm test
```

Expected: `No tests found` (에러 없이 종료)

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "feat: add Jest + React Testing Library"
```

---

## Task 3: 디자인 시스템 설정

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: `tailwind.config.ts` 커스텀 색상 추가**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        border: '#222222',
        accent: {
          DEFAULT: '#7c3aed',
          light: '#a855f7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
}

export default config
```

- [ ] **Step 2: `src/app/globals.css` 업데이트**

```css
@import "tailwindcss";

:root {
  --font-inter: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

html {
  scroll-behavior: smooth;
  background-color: #0a0a0a;
  color: #ffffff;
}

::selection {
  background-color: #7c3aed;
  color: #ffffff;
}

/* 스크롤바 스타일 */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }
```

- [ ] **Step 3: `src/app/layout.tsx` 폰트 설정**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '포트폴리오 | AI/ML 엔지니어',
  description: 'AI/ML 엔지니어 포트폴리오 사이트',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="bg-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 4: 브라우저에서 배경색 확인**

```bash
pnpm dev
```

`localhost:3000` 배경이 `#0a0a0a` (거의 검정)이면 성공.

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: configure design system tokens"
```

---

## Task 4: 유틸리티 함수 (TDD)

**Files:**
- Create: `src/lib/utils.ts`
- Create: `__tests__/lib/utils.test.ts`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/lib/utils.test.ts`:

```ts
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('단일 클래스 반환', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('여러 클래스 병합', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('falsy 값 무시', () => {
    expect(cn('foo', false, undefined, null, 'bar')).toBe('foo bar')
  })

  it('Tailwind 충돌 클래스 마지막 것으로 덮어씀', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
pnpm test __tests__/lib/utils.test.ts
```

Expected: FAIL — `Cannot find module '@/lib/utils'`

- [ ] **Step 3: 의존성 설치 후 구현**

```bash
pnpm add clsx tailwind-merge
```

`src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
pnpm test __tests__/lib/utils.test.ts
```

Expected: PASS (4 tests)

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: add cn() utility"
```

---

## Task 5: 콘텐츠 데이터 레이어 (TDD)

**Files:**
- Create: `src/lib/data.ts`
- Create: `__tests__/lib/data.test.ts`

- [ ] **Step 1: 타입 + 실패 테스트 작성**

`__tests__/lib/data.test.ts`:

```ts
import { siteData } from '@/lib/data'

describe('siteData', () => {
  it('필수 개인정보 필드가 존재한다', () => {
    expect(typeof siteData.name).toBe('string')
    expect(typeof siteData.title).toBe('string')
    expect(typeof siteData.email).toBe('string')
    expect(typeof siteData.bio).toBe('string')
  })

  it('소셜 링크가 존재한다', () => {
    expect(typeof siteData.github).toBe('string')
    expect(typeof siteData.linkedin).toBe('string')
  })

  it('스킬 카테고리가 모두 배열이다', () => {
    expect(Array.isArray(siteData.skills.languages)).toBe(true)
    expect(Array.isArray(siteData.skills.frameworks)).toBe(true)
    expect(Array.isArray(siteData.skills.mlops)).toBe(true)
    expect(Array.isArray(siteData.skills.cloud)).toBe(true)
  })

  it('프로젝트가 1개 이상 존재하고 필수 필드를 가진다', () => {
    expect(siteData.projects.length).toBeGreaterThan(0)
    const p = siteData.projects[0]
    expect(typeof p.id).toBe('string')
    expect(typeof p.title).toBe('string')
    expect(typeof p.description).toBe('string')
    expect(Array.isArray(p.tags)).toBe(true)
    expect(typeof p.github).toBe('string')
    expect(typeof p.featured).toBe('boolean')
  })

  it('경력/학력이 1개 이상 존재하고 필수 필드를 가진다', () => {
    expect(siteData.experience.length).toBeGreaterThan(0)
    const e = siteData.experience[0]
    expect(['work', 'education'].includes(e.type)).toBe(true)
    expect(typeof e.title).toBe('string')
    expect(typeof e.organization).toBe('string')
    expect(typeof e.period).toBe('string')
  })

  it('대표 프로젝트(featured)가 정확히 1개다', () => {
    const featured = siteData.projects.filter(p => p.featured)
    expect(featured.length).toBe(1)
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
pnpm test __tests__/lib/data.test.ts
```

Expected: FAIL — `Cannot find module '@/lib/data'`

- [ ] **Step 3: `src/lib/data.ts` 구현**

```ts
export type SkillCategory = {
  languages: string[]
  frameworks: string[]
  mlops: string[]
  cloud: string[]
}

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  github: string
  demo?: string
  featured: boolean
}

export type Experience = {
  id: string
  type: 'work' | 'education'
  title: string
  organization: string
  period: string
  description?: string
}

export const siteData = {
  name: '홍길동',
  title: 'AI / ML 엔지니어',
  email: 'example@email.com',
  github: 'https://github.com/username',
  linkedin: 'https://linkedin.com/in/username',
  bio: '데이터에서 가치를 발굴하는 AI/ML 엔지니어입니다. 실험부터 프로덕션 배포까지 전 과정을 경험했습니다.',
  avatar: '', // 프로필 사진 경로 (없으면 이니셜 아바타 사용)

  skills: {
    languages: ['Python', 'SQL', 'R', 'Bash'],
    frameworks: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'LangChain'],
    mlops: ['MLflow', 'Docker', 'Kubernetes', 'Airflow', 'GitHub Actions'],
    cloud: ['AWS SageMaker', 'GCP Vertex AI', 'S3', 'BigQuery'],
  } satisfies SkillCategory,

  projects: [
    {
      id: 'llm-rag',
      title: 'LLM 기반 RAG 검색 시스템',
      description: '기업 내부 문서를 벡터 DB에 색인하고 LLM으로 질의응답하는 시스템',
      tags: ['LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
      github: 'https://github.com/username/llm-rag',
      demo: 'https://demo.example.com',
      featured: true,
    },
    {
      id: 'churn-prediction',
      title: '고객 이탈 예측 모델',
      description: 'XGBoost 기반 이탈 예측 파이프라인 — AUC 0.91 달성',
      tags: ['Python', 'XGBoost', 'MLflow', 'Docker'],
      github: 'https://github.com/username/churn-prediction',
      featured: false,
    },
    {
      id: 'sentiment-api',
      title: '리뷰 감성 분석 API',
      description: 'KR-BERT 파인튜닝 기반 한국어 감성 분류 REST API',
      tags: ['PyTorch', 'Hugging Face', 'FastAPI', 'GCP'],
      github: 'https://github.com/username/sentiment-api',
      featured: false,
    },
  ] satisfies Project[],

  experience: [
    {
      id: 'job-1',
      type: 'work',
      title: 'ML 엔지니어',
      organization: '회사명',
      period: '2023 – 현재',
      description: '추천 시스템 및 이상 탐지 모델 개발 및 운영',
    },
    {
      id: 'job-2',
      type: 'work',
      title: '데이터 사이언티스트',
      organization: '이전 회사명',
      period: '2021 – 2023',
      description: '고객 행동 분석 및 A/B 테스트 설계',
    },
    {
      id: 'edu-1',
      type: 'education',
      title: '컴퓨터공학 학사',
      organization: '대학교명',
      period: '2017 – 2021',
    },
  ] satisfies Experience[],
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
pnpm test __tests__/lib/data.test.ts
```

Expected: PASS (6 tests)

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: add static content data layer"
```

---

## Task 6: Badge 컴포넌트 (TDD)

**Files:**
- Create: `src/components/ui/Badge.tsx`
- Create: `__tests__/components/Badge.test.tsx`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/components/Badge.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Badge from '@/components/ui/Badge'

describe('Badge', () => {
  it('텍스트를 렌더링한다', () => {
    render(<Badge>Python</Badge>)
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('기본 variant는 default다', () => {
    render(<Badge>Python</Badge>)
    const el = screen.getByText('Python')
    expect(el.className).toContain('border-border')
  })

  it('accent variant는 퍼플 테두리를 가진다', () => {
    render(<Badge variant="accent">PyTorch</Badge>)
    const el = screen.getByText('PyTorch')
    expect(el.className).toContain('border-accent')
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
pnpm test __tests__/components/Badge.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/ui/Badge'`

- [ ] **Step 3: `src/components/ui/Badge.tsx` 구현**

```tsx
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
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
pnpm test __tests__/components/Badge.test.tsx
```

Expected: PASS (3 tests)

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: add Badge component"
```

---

## Task 7: TimelineItem 컴포넌트 (TDD)

**Files:**
- Create: `src/components/ui/TimelineItem.tsx`
- Create: `__tests__/components/TimelineItem.test.tsx`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/components/TimelineItem.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import TimelineItem from '@/components/ui/TimelineItem'
import type { Experience } from '@/lib/data'

const workItem: Experience = {
  id: 'test-1',
  type: 'work',
  title: 'ML 엔지니어',
  organization: '테스트 회사',
  period: '2023 – 현재',
  description: '모델 개발',
}

const eduItem: Experience = {
  id: 'test-2',
  type: 'education',
  title: '컴퓨터공학 학사',
  organization: '테스트 대학',
  period: '2017 – 2021',
}

describe('TimelineItem', () => {
  it('직책과 회사명을 렌더링한다', () => {
    render(<TimelineItem item={workItem} />)
    expect(screen.getByText('ML 엔지니어')).toBeInTheDocument()
    expect(screen.getByText('테스트 회사')).toBeInTheDocument()
  })

  it('기간을 렌더링한다', () => {
    render(<TimelineItem item={workItem} />)
    expect(screen.getByText('2023 – 현재')).toBeInTheDocument()
  })

  it('description이 있으면 렌더링한다', () => {
    render(<TimelineItem item={workItem} />)
    expect(screen.getByText('모델 개발')).toBeInTheDocument()
  })

  it('description이 없으면 렌더링하지 않는다', () => {
    render(<TimelineItem item={eduItem} />)
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
pnpm test __tests__/components/TimelineItem.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/ui/TimelineItem'`

- [ ] **Step 3: `src/components/ui/TimelineItem.tsx` 구현**

```tsx
import type { Experience } from '@/lib/data'
import { cn } from '@/lib/utils'

type TimelineItemProps = {
  item: Experience
  isLast?: boolean
}

export default function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative flex gap-6">
      {/* 세로선 + 포인트 */}
      <div className="flex flex-col items-center">
        <div className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-accent ring-2 ring-accent/30" />
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>

      {/* 내용 */}
      <div className={cn('pb-8', isLast && 'pb-0')}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-white">{item.title}</span>
          <span className="text-sm text-gray-500">·</span>
          <span className="text-sm text-gray-400">{item.organization}</span>
        </div>
        <p className="mt-0.5 text-xs text-accent-light">{item.period}</p>
        {item.description && (
          <p className="mt-1 text-sm text-gray-400">{item.description}</p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
pnpm test __tests__/components/TimelineItem.test.tsx
```

Expected: PASS (4 tests)

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: add TimelineItem component"
```

---

## Task 8: ProjectCard 컴포넌트 (TDD)

**Files:**
- Create: `src/components/ui/ProjectCard.tsx`
- Create: `__tests__/components/ProjectCard.test.tsx`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/components/ProjectCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/ui/ProjectCard'
import type { Project } from '@/lib/data'

const featuredProject: Project = {
  id: 'test-project',
  title: 'RAG 시스템',
  description: 'LLM 기반 검색 시스템',
  tags: ['LangChain', 'FastAPI'],
  github: 'https://github.com/test',
  demo: 'https://demo.test',
  featured: true,
}

const regularProject: Project = {
  id: 'test-project-2',
  title: '감성 분석',
  description: 'BERT 기반 분류',
  tags: ['PyTorch'],
  github: 'https://github.com/test2',
  featured: false,
}

describe('ProjectCard', () => {
  it('프로젝트 제목과 설명을 렌더링한다', () => {
    render(<ProjectCard project={featuredProject} />)
    expect(screen.getByText('RAG 시스템')).toBeInTheDocument()
    expect(screen.getByText('LLM 기반 검색 시스템')).toBeInTheDocument()
  })

  it('태그를 모두 렌더링한다', () => {
    render(<ProjectCard project={featuredProject} />)
    expect(screen.getByText('LangChain')).toBeInTheDocument()
    expect(screen.getByText('FastAPI')).toBeInTheDocument()
  })

  it('GitHub 링크를 렌더링한다', () => {
    render(<ProjectCard project={featuredProject} />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', 'https://github.com/test')
  })

  it('demo가 있으면 데모 링크를 렌더링한다', () => {
    render(<ProjectCard project={featuredProject} />)
    const link = screen.getByRole('link', { name: /데모/i })
    expect(link).toHaveAttribute('href', 'https://demo.test')
  })

  it('demo가 없으면 데모 링크를 렌더링하지 않는다', () => {
    render(<ProjectCard project={regularProject} />)
    expect(screen.queryByRole('link', { name: /데모/i })).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
pnpm test __tests__/components/ProjectCard.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/ui/ProjectCard'`

- [ ] **Step 3: `src/components/ui/ProjectCard.tsx` 구현**

```tsx
import type { Project } from '@/lib/data'
import { cn } from '@/lib/utils'
import Badge from './Badge'

type ProjectCardProps = {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative rounded-xl border border-border bg-surface p-6 transition-all',
        'hover:border-accent/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]',
        className,
      )}
    >
      <h3 className="text-lg font-bold text-white">{project.title}</h3>
      <p className="mt-2 text-sm text-gray-400">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="accent">{tag}</Badge>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 underline-offset-4 hover:text-white hover:underline"
        >
          GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent-light underline-offset-4 hover:underline"
          >
            데모
          </a>
        )}
      </div>
    </article>
  )
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
pnpm test __tests__/components/ProjectCard.test.tsx
```

Expected: PASS (5 tests)

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: add ProjectCard component"
```

---

## Task 9: Navbar 컴포넌트 (TDD)

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `__tests__/components/Navbar.test.tsx`

- [ ] **Step 1: 실패 테스트 작성**

`__tests__/components/Navbar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('모든 네비게이션 항목을 렌더링한다', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: '소개' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '스킬' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '프로젝트' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '경력' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '연락처' })).toBeInTheDocument()
  })

  it('각 링크는 앵커 href를 가진다', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: '소개' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: '스킬' })).toHaveAttribute('href', '#skills')
  })
})
```

- [ ] **Step 2: 테스트 실패 확인**

```bash
pnpm test __tests__/components/Navbar.test.tsx
```

Expected: FAIL — `Cannot find module '@/components/Navbar'`

- [ ] **Step 3: `src/components/Navbar.tsx` 구현**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: '소개', href: '#about' },
  { label: '스킬', href: '#skills' },
  { label: '프로젝트', href: '#projects' },
  { label: '경력', href: '#experience' },
  { label: '연락처', href: '#contact' },
]

const SECTION_IDS = ['about', 'skills', 'projects', 'experience', 'contact']

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
        <span className="font-bold text-white">포트폴리오</span>
        <ul className="flex gap-6">
          {NAV_ITEMS.map(({ label, href }) => {
            const id = href.replace('#', '')
            return (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    'text-sm transition-colors',
                    activeId === id ? 'text-accent-light' : 'text-gray-400 hover:text-white',
                  )}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
pnpm test __tests__/components/Navbar.test.tsx
```

Expected: PASS (2 tests)

- [ ] **Step 5: 커밋**

```bash
git add -A
git commit -m "feat: add Navbar with scroll-active tracking"
```

---

## Task 10: Hero 섹션

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: `src/components/sections/Hero.tsx` 작성**

```tsx
import { siteData } from '@/lib/data'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 배경 글로우 장식 */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6">
        <p className="mb-3 text-lg text-gray-400">안녕하세요,</p>
        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {siteData.name}
          </span>
          <span className="text-white">입니다.</span>
        </h1>
        <p className="mt-4 text-2xl font-semibold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent md:text-3xl">
          {siteData.title}
        </p>

        <div className="mt-10 flex gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-border px-6 py-3 font-semibold text-gray-300 transition-colors hover:border-accent hover:text-white"
          >
            연락하기
          </a>
        </div>
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        ↓
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `src/app/page.tsx`에 Hero 추가하여 브라우저 확인**

```tsx
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

```bash
pnpm dev
```

`localhost:3000` 에서 Hero 섹션 확인.

- [ ] **Step 3: 커밋**

```bash
git add -A
git commit -m "feat: add Hero section"
```

---

## Task 11: About 섹션

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: `src/components/sections/About.tsx` 작성**

```tsx
import { siteData } from '@/lib/data'
import Image from 'next/image'

export default function About() {
  const initials = siteData.name
    .split('')
    .filter((_, i) => i === 0)
    .join('')

  return (
    <section id="about" className="mx-auto max-w-[1100px] px-6 py-24">
      <h2 className="mb-12 text-4xl font-extrabold text-white">소개</h2>

      <div className="flex flex-col items-start gap-12 md:flex-row md:items-center">
        {/* 프로필 사진 or 이니셜 아바타 */}
        <div className="shrink-0">
          {siteData.avatar ? (
            <Image
              src={siteData.avatar}
              alt={siteData.name}
              width={180}
              height={180}
              className="rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-[180px] w-[180px] items-center justify-center rounded-2xl bg-accent/20 text-5xl font-bold text-accent-light">
              {initials}
            </div>
          )}
        </div>

        {/* 소개 텍스트 */}
        <div>
          <p className="text-lg leading-relaxed text-gray-300">{siteData.bio}</p>

          <div className="mt-6 flex gap-4">
            <a
              href={`mailto:${siteData.email}`}
              className="text-sm text-gray-400 transition-colors hover:text-accent-light"
            >
              ✉ {siteData.email}
            </a>
            <a
              href={siteData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-accent-light"
            >
              GitHub ↗
            </a>
            <a
              href={siteData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-accent-light"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `src/app/page.tsx`에 추가**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  )
}
```

- [ ] **Step 3: 커밋**

```bash
git add -A
git commit -m "feat: add About section"
```

---

## Task 12: Skills 섹션

**Files:**
- Create: `src/components/sections/Skills.tsx`

- [ ] **Step 1: `src/components/sections/Skills.tsx` 작성**

```tsx
import { siteData } from '@/lib/data'
import Badge from '@/components/ui/Badge'

const CATEGORY_LABELS: Record<keyof typeof siteData.skills, string> = {
  languages: '언어',
  frameworks: '프레임워크',
  mlops: 'MLOps',
  cloud: '클라우드',
}

export default function Skills() {
  return (
    <section id="skills" className="bg-surface/50 py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="mb-12 text-4xl font-extrabold text-white">스킬</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {(Object.keys(siteData.skills) as Array<keyof typeof siteData.skills>).map((category) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-light">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {siteData.skills[category].map((skill) => (
                  <Badge key={skill} variant="default">{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `src/app/page.tsx`에 추가**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
    </main>
  )
}
```

- [ ] **Step 3: 커밋**

```bash
git add -A
git commit -m "feat: add Skills section"
```

---

## Task 13: Projects 섹션

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: `src/components/sections/Projects.tsx` 작성**

```tsx
import { siteData } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'

export default function Projects() {
  const featured = siteData.projects.find((p) => p.featured)!
  const rest = siteData.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="mx-auto max-w-[1100px] px-6 py-24">
      <h2 className="mb-12 text-4xl font-extrabold text-white">프로젝트</h2>

      {/* 대표 프로젝트 — 전체 너비 */}
      <div className="mb-6">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-accent-light">
          대표 프로젝트
        </span>
        <ProjectCard project={featured} className="border-accent/30 bg-accent/5" />
      </div>

      {/* 나머지 프로젝트 — 2열 그리드 */}
      <div className="grid gap-4 md:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `src/app/page.tsx`에 추가**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
    </main>
  )
}
```

- [ ] **Step 3: 커밋**

```bash
git add -A
git commit -m "feat: add Projects section"
```

---

## Task 14: Experience 섹션

**Files:**
- Create: `src/components/sections/Experience.tsx`

- [ ] **Step 1: `src/components/sections/Experience.tsx` 작성**

```tsx
import { siteData } from '@/lib/data'
import TimelineItem from '@/components/ui/TimelineItem'

export default function Experience() {
  return (
    <section id="experience" className="bg-surface/50 py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="mb-12 text-4xl font-extrabold text-white">경력 / 학력</h2>

        <div className="max-w-2xl">
          {siteData.experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={index === siteData.experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: `src/app/page.tsx`에 추가**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
    </main>
  )
}
```

- [ ] **Step 3: 커밋**

```bash
git add -A
git commit -m "feat: add Experience section"
```

---

## Task 15: Contact 섹션 + 최종 page.tsx 조합

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: `src/components/sections/Contact.tsx` 작성**

```tsx
'use client'

import { useState } from 'react'
import { siteData } from '@/lib/data'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(siteData.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="mx-auto max-w-[1100px] px-6 py-24">
      <h2 className="mb-4 text-4xl font-extrabold text-white">연락처</h2>
      <p className="mb-10 text-lg text-gray-400">
        함께 일하고 싶으시다면 언제든지 연락 주세요.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={copyEmail}
          className="flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm text-gray-300 transition-colors hover:border-accent hover:text-white"
        >
          {copied ? '✓ 복사됨' : `✉ ${siteData.email}`}
        </button>

        <a
          href={siteData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border bg-surface px-5 py-3 text-sm text-gray-300 transition-colors hover:border-accent hover:text-white"
        >
          GitHub ↗
        </a>

        <a
          href={siteData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border bg-surface px-5 py-3 text-sm text-gray-300 transition-colors hover:border-accent hover:text-white"
        >
          LinkedIn ↗
        </a>
      </div>

      <footer className="mt-16 border-t border-border pt-8 text-sm text-gray-600">
        © {new Date().getFullYear()} {siteData.name}
      </footer>
    </section>
  )
}
```

- [ ] **Step 2: `src/app/page.tsx` 최종 완성**

```tsx
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: `src/app/layout.tsx`에 Navbar 추가**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '포트폴리오 | AI/ML 엔지니어',
  description: 'AI/ML 엔지니어 포트폴리오 사이트',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="bg-bg text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 4: 전체 페이지 브라우저 확인**

```bash
pnpm dev
```

확인 항목:
- 모든 섹션이 순서대로 보인다
- 스크롤 시 Navbar 활성 항목이 바뀐다
- 네비게이션 클릭 시 해당 섹션으로 스크롤된다
- 이메일 복사 버튼이 동작한다

- [ ] **Step 5: 전체 테스트 실행**

```bash
pnpm test
```

Expected: 모든 테스트 PASS

- [ ] **Step 6: 타입 체크**

```bash
pnpm type-check
```

Expected: 에러 없음

- [ ] **Step 7: 최종 커밋**

```bash
git add -A
git commit -m "feat: complete portfolio site implementation"
```
