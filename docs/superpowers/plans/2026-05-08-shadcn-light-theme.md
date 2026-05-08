# shadcn/ui 설치 + 라이트 테마 적용 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** shadcn/ui를 Tailwind v4 방식으로 풀 설치하고, 다크 테마를 라이트 테마로 전환하며, 모든 섹션 컴포넌트를 DESIGN.md 기준 스타일로 교체한다.

**Architecture:** shadcn 표준 HSL CSS 변수 체계로 globals.css를 전면 교체하고, 기존 커스텀 ui 컴포넌트(Badge)를 shadcn으로 대체한다. 섹션 JSX 구조는 유지하고 Tailwind 클래스와 컴포넌트 import만 교체한다.

**Tech Stack:** Next.js 16 (App Router), Tailwind v4, shadcn/ui latest, TypeScript strict

---

## 파일 맵

| 파일 | 작업 |
|---|---|
| `src/app/globals.css` | @theme inline 전체 교체 → shadcn HSL 변수 |
| `src/components/ui/Badge.tsx` | 삭제 — shadcn badge로 대체 |
| `src/components/ui/button.tsx` | shadcn init으로 생성 |
| `src/components/ui/badge.tsx` | shadcn add로 생성 |
| `src/components/ui/card.tsx` | shadcn add로 생성 |
| `src/components/ui/input.tsx` | shadcn add로 생성 |
| `src/components/ui/textarea.tsx` | shadcn add로 생성 |
| `src/components/ui/label.tsx` | shadcn add로 생성 |
| `src/components/ui/separator.tsx` | shadcn add로 생성 |
| `src/components/Navbar.tsx` | 다크 클래스 → 라이트, Button 적용 |
| `src/components/sections/Hero.tsx` | gradient 제거, shadcn Button 적용 |
| `src/components/sections/About.tsx` | 다크 클래스 → 라이트 |
| `src/components/sections/Skills.tsx` | shadcn Badge import로 교체 |
| `src/components/ui/ProjectCard.tsx` | shadcn Card 적용, 다크 클래스 교체 |
| `src/components/sections/Projects.tsx` | 다크 클래스 교체 |
| `src/components/ui/TimelineItem.tsx` | 다크 클래스 → 라이트, Separator 적용 |
| `src/components/sections/Experience.tsx` | 다크 클래스 교체 |
| `src/components/sections/Contact.tsx` | shadcn Button 적용, 다크 클래스 교체 |
| `src/components/ui/ExperienceForm.tsx` | shadcn Input/Textarea/Label/Button 적용 |
| `__tests__/components/Badge.test.tsx` | shadcn badge variant에 맞게 업데이트 |

---

## Task 1: shadcn/ui 설치

**Files:**
- Create: `components.json`
- Modify: `src/app/globals.css` (shadcn이 CSS 변수 블록 추가)
- Create: `src/lib/utils.ts` (이미 존재하면 shadcn이 업데이트)

- [ ] **Step 1: shadcn init 실행**

```bash
npx shadcn@latest init -d
```

프롬프트 응답 (기본값 적용):
- Style: Default
- Base color: Zinc
- CSS variables: Yes

`components.json`이 생성되면 성공.

- [ ] **Step 2: shadcn 컴포넌트 7개 추가**

```bash
npx shadcn@latest add button badge card input textarea label separator --overwrite
```

`src/components/ui/` 에 `button.tsx`, `badge.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`, `separator.tsx` 생성 확인.

- [ ] **Step 3: 커밋**

```bash
git add components.json src/components/ui/ src/lib/utils.ts
git commit -m "feat: install shadcn/ui with 7 components"
```

---

## Task 2: globals.css — 라이트 테마 CSS 변수로 전면 교체

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: globals.css 전체를 아래 내용으로 교체**

```css
@import "tailwindcss";

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --radius: var(--radius-md);
  --font-sans: var(--font-inter), system-ui, sans-serif;
}

:root {
  --background: 0 0% 100%;
  --foreground: 220 13% 13%;
  --card: 0 0% 100%;
  --card-foreground: 220 13% 13%;
  --primary: 221 100% 56%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 14% 96%;
  --secondary-foreground: 220 13% 13%;
  --muted: 220 14% 96%;
  --muted-foreground: 220 9% 46%;
  --accent: 221 100% 56%;
  --accent-foreground: 0 0% 100%;
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 221 100% 56%;
  --radius-md: 0.5rem;
}

html {
  scroll-behavior: smooth;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

::selection {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: hsl(var(--secondary)); }
::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 3px; }
```

- [ ] **Step 2: 개발 서버에서 배경이 흰색인지 확인**

`http://localhost:3000` 열기. 배경이 흰색으로 바뀌면 성공. (텍스트는 아직 흰색으로 보일 수 있음 — 다음 태스크에서 수정)

- [ ] **Step 3: 커밋**

```bash
git add src/app/globals.css
git commit -m "feat: migrate globals.css to shadcn HSL light theme variables"
```

---

## Task 3: Navbar 라이트 테마 적용

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Navbar.tsx 전체 교체**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import DevLabel from '@/components/ui/DevLabel'
import { Button } from '@/components/ui/button'

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
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-40% 0px -55% 0px' },
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm">
      <DevLabel name="Navbar" file="src/components/Navbar.tsx" />
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
        <span className="font-bold text-foreground">포트폴리오</span>
        <ul className="flex gap-6">
          {NAV_ITEMS.map(({ label, href }) => {
            const id = href.replace('#', '')
            return (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    'text-sm transition-colors',
                    activeId === id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
        <Button variant="outline" size="sm" asChild>
          <a href="#contact">연락하기</a>
        </Button>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: 테스트 실행**

```bash
pnpm test __tests__/components/Navbar.test.tsx
```

Expected: PASS (테스트는 링크 존재 여부만 확인, 스타일 무관)

- [ ] **Step 3: 커밋**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: apply light theme to Navbar with shadcn Button"
```

---

## Task 4: Hero 라이트 테마 적용

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Hero.tsx 전체 교체**

```tsx
import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center bg-background">
      <DevLabel name="Hero" file="src/components/sections/Hero.tsx" />
      <div className="mx-auto max-w-[1100px] px-6 w-full">
        <p className="mb-3 text-lg text-muted-foreground">안녕하세요,</p>
        <h1 className="text-5xl font-extrabold leading-tight text-foreground md:text-7xl">
          {siteData.name}
          <span className="text-muted-foreground">입니다.</span>
        </h1>
        <p className="mt-4 text-2xl font-semibold text-primary md:text-3xl">
          {siteData.title}
        </p>
        <div className="mt-10 flex gap-4">
          <Button asChild size="lg">
            <a href="#projects">프로젝트 보기</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">연락하기</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 브라우저에서 Hero 확인**

`http://localhost:3000` — 흰 배경, 검은 텍스트, 파란 직함, 파란 버튼으로 보이면 성공.

- [ ] **Step 3: 커밋**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: apply light theme to Hero with shadcn Button"
```

---

## Task 5: About 라이트 테마 적용

**Files:**
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 1: About.tsx 다크 클래스 교체**

아래 변경 사항을 적용한다:

```tsx
import { siteData } from '@/lib/data'
import Image from 'next/image'
import DevLabel from '@/components/ui/DevLabel'

export default function About() {
  const initials = siteData.name.charAt(0)

  return (
    <section id="about" className="relative mx-auto max-w-[1100px] px-6 py-24">
      <DevLabel name="About" file="src/components/sections/About.tsx" />
      <h2 className="mb-12 text-4xl font-extrabold text-foreground">소개</h2>
      <div className="flex flex-col items-start gap-12 md:flex-row md:items-center">
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
            <div className="flex h-[180px] w-[180px] items-center justify-center rounded-2xl bg-primary/10 text-5xl font-bold text-primary">
              {initials}
            </div>
          )}
        </div>
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">{siteData.bio}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={`mailto:${siteData.email}`}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              ✉ {siteData.email}
            </a>
            <a
              href={siteData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              GitHub ↗
            </a>
            <a
              href={siteData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
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

- [ ] **Step 2: 커밋**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: apply light theme to About"
```

---

## Task 6: Skills + Badge 교체

기존 `Badge.tsx`(커스텀)를 shadcn `badge`로 대체하고 Skills 섹션을 업데이트한다.

**Files:**
- Delete: `src/components/ui/Badge.tsx`
- Modify: `src/components/sections/Skills.tsx`
- Modify: `__tests__/components/Badge.test.tsx`

- [ ] **Step 1: Badge 테스트를 shadcn badge에 맞게 업데이트**

`__tests__/components/Badge.test.tsx` 전체 교체:

```tsx
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('텍스트를 렌더링한다', () => {
    render(<Badge>Python</Badge>)
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('기본 variant는 default다', () => {
    render(<Badge>Python</Badge>)
    const el = screen.getByText('Python')
    expect(el).toBeInTheDocument()
  })

  it('secondary variant를 렌더링한다', () => {
    render(<Badge variant="secondary">PyTorch</Badge>)
    expect(screen.getByText('PyTorch')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 테스트 실패 확인 (Badge.tsx 아직 존재)**

```bash
pnpm test __tests__/components/Badge.test.tsx
```

Expected: FAIL — `Badge`를 named export로 import하지 못함 (기존은 default export)

- [ ] **Step 3: 기존 Badge.tsx 삭제**

```bash
rm src/components/ui/Badge.tsx
```

- [ ] **Step 4: Skills.tsx 업데이트**

```tsx
import { siteData } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import DevLabel from '@/components/ui/DevLabel'

const CATEGORY_LABELS: Record<keyof typeof siteData.skills, string> = {
  languages: '언어',
  frameworks: '프레임워크',
  mlops: 'MLOps',
  cloud: '클라우드',
}

export default function Skills() {
  return (
    <section id="skills" className="relative bg-secondary py-24">
      <DevLabel name="Skills" file="src/components/sections/Skills.tsx" />
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="mb-12 text-4xl font-extrabold text-foreground">스킬</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {(Object.keys(siteData.skills) as Array<keyof typeof siteData.skills>).map((category) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {siteData.skills[category].map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
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

- [ ] **Step 5: 테스트 통과 확인**

```bash
pnpm test __tests__/components/Badge.test.tsx
```

Expected: PASS

- [ ] **Step 6: 커밋**

```bash
git add __tests__/components/Badge.test.tsx src/components/sections/Skills.tsx
git rm src/components/ui/Badge.tsx
git commit -m "feat: replace custom Badge with shadcn badge, update Skills"
```

---

## Task 7: ProjectCard + Projects 라이트 테마 적용

**Files:**
- Modify: `src/components/ui/ProjectCard.tsx`
- Modify: `src/components/sections/Projects.tsx`

- [ ] **Step 1: ProjectCard.tsx 전체 교체**

```tsx
import type { Project } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

type ProjectCardProps = {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card className={cn('transition-shadow hover:shadow-md', className)}>
      <CardHeader className="pb-2">
        <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            데모
          </a>
        )}
      </CardFooter>
    </Card>
  )
}
```

- [ ] **Step 2: ProjectCard 테스트 확인**

```bash
pnpm test __tests__/components/ProjectCard.test.tsx
```

Expected: PASS (테스트는 텍스트/링크만 검사)

- [ ] **Step 3: Projects.tsx 다크 클래스 교체**

```tsx
import { siteData } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'
import DevLabel from '@/components/ui/DevLabel'

export default function Projects() {
  const featured = siteData.projects.find((p) => p.featured)!
  const rest = siteData.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative mx-auto max-w-[1100px] px-6 py-24">
      <DevLabel name="Projects" file="src/components/sections/Projects.tsx" />
      <h2 className="mb-12 text-4xl font-extrabold text-foreground">프로젝트</h2>
      <div className="mb-6">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
          대표 프로젝트
        </span>
        <ProjectCard project={featured} className="border-primary/30 bg-primary/5" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 커밋**

```bash
git add src/components/ui/ProjectCard.tsx src/components/sections/Projects.tsx
git commit -m "feat: apply shadcn Card to ProjectCard, light theme to Projects"
```

---

## Task 8: TimelineItem + Experience 라이트 테마 적용

**Files:**
- Modify: `src/components/ui/TimelineItem.tsx`
- Modify: `src/components/sections/Experience.tsx`

- [ ] **Step 1: TimelineItem.tsx 전체 교체**

```tsx
import type { Experience } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

type TimelineItemProps = {
  item: Experience
  isLast?: boolean
}

export default function TimelineItem({ item, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-primary ring-2 ring-primary/30" />
        {!isLast && <div className="mt-1 w-px flex-1 bg-border" />}
      </div>
      <div className={cn('pb-8 w-full', isLast && 'pb-0')}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-foreground">{item.title}</span>
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{item.organization}</span>
        </div>
        <p className="mt-0.5 text-xs text-primary">{item.period}</p>
        {item.description && (
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        )}
        {!isLast && <Separator className="mt-6" />}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: TimelineItem 테스트 확인**

```bash
pnpm test __tests__/components/TimelineItem.test.tsx
```

Expected: PASS

- [ ] **Step 3: Experience.tsx 다크 클래스 교체**

```tsx
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
```

- [ ] **Step 4: 커밋**

```bash
git add src/components/ui/TimelineItem.tsx src/components/sections/Experience.tsx
git commit -m "feat: apply light theme to TimelineItem and Experience"
```

---

## Task 9: Contact 라이트 테마 적용

**Files:**
- Modify: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Contact.tsx 전체 교체**

```tsx
'use client'

import { useState } from 'react'
import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'
import { Button } from '@/components/ui/button'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(siteData.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative mx-auto max-w-[1100px] px-6 py-24">
      <DevLabel name="Contact" file="src/components/sections/Contact.tsx" />
      <h2 className="mb-4 text-4xl font-extrabold text-foreground">연락처</h2>
      <p className="mb-10 text-lg text-muted-foreground">
        함께 일하고 싶으시다면 언제든지 연락 주세요.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="outline" onClick={copyEmail}>
          {copied ? '✓ 복사됨' : `✉ ${siteData.email}`}
        </Button>
        <Button variant="outline" asChild>
          <a href={siteData.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={siteData.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        </Button>
      </div>
      <footer className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteData.name}
      </footer>
    </section>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: apply light theme and shadcn Button to Contact"
```

---

## Task 10: ExperienceForm (관리자) 라이트 테마 적용

**Files:**
- Modify: `src/components/ui/ExperienceForm.tsx`

- [ ] **Step 1: ExperienceForm.tsx 전체 교체**

```tsx
'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type DefaultValues = {
  type?: string
  title?: string
  organization?: string
  startedAt?: string
  endedAt?: string | null
  description?: string | null
  sortOrder?: number
}

type ExperienceFormProps = {
  action: (formData: FormData) => Promise<void>
  defaultValues?: DefaultValues
  submitLabel?: string
}

export default function ExperienceForm({
  action,
  defaultValues = {},
  submitLabel = '저장',
}: ExperienceFormProps) {
  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="type">구분</Label>
        <select
          id="type"
          name="type"
          defaultValue={defaultValues.type ?? 'work'}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
          required
        >
          <option value="work">경력</option>
          <option value="education">학력</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">직함 / 학위</Label>
        <Input
          id="title"
          name="title"
          type="text"
          defaultValue={defaultValues.title ?? ''}
          placeholder="예: ML 엔지니어"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="organization">회사 / 학교</Label>
        <Input
          id="organization"
          name="organization"
          type="text"
          defaultValue={defaultValues.organization ?? ''}
          placeholder="예: Kakao Corp"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="startedAt">시작일</Label>
          <Input
            id="startedAt"
            name="startedAt"
            type="date"
            defaultValue={defaultValues.startedAt ?? ''}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="endedAt">
            종료일 <span className="text-muted-foreground font-normal">(재직중이면 비움)</span>
          </Label>
          <Input
            id="endedAt"
            name="endedAt"
            type="date"
            defaultValue={defaultValues.endedAt ?? ''}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">
          설명 <span className="text-muted-foreground font-normal">(선택)</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={defaultValues.description ?? ''}
          placeholder="주요 업무 또는 성과를 입력하세요"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sortOrder">정렬 순서</Label>
        <Input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={String(defaultValues.sortOrder ?? 0)}
        />
      </div>

      <Button type="submit" className="mt-2 w-full">
        {submitLabel}
      </Button>
    </form>
  )
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/ui/ExperienceForm.tsx
git commit -m "feat: apply shadcn Input/Textarea/Label/Button to ExperienceForm"
```

---

## Task 11: 최종 검증

- [ ] **Step 1: 전체 테스트 실행**

```bash
pnpm test
```

Expected: 모든 테스트 PASS

- [ ] **Step 2: 타입 체크**

```bash
pnpm type-check
```

Expected: 에러 0개

- [ ] **Step 3: 프로덕션 빌드**

```bash
pnpm build
```

Expected: Build completed successfully

- [ ] **Step 4: 다크 테마 잔재 확인**

```bash
grep -r "text-white\|bg-surface\|text-gray-300\|text-gray-400\|border-accent\|accent-light\|bg-bg\|#0a0a0a\|#111111" src/components/ --include="*.tsx" -l
```

Expected: 출력 없음 (잔재 없음)

- [ ] **Step 5: 최종 커밋**

```bash
git add -A
git commit -m "feat: complete shadcn/ui install and light theme migration"
```
