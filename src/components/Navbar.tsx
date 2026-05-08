'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import DevLabel from '@/components/ui/DevLabel'
import { Button } from '@/components/ui/button'
import { Code2 } from 'lucide-react'

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
        <span className="flex items-center gap-1.5 font-bold text-foreground">
          <Code2 className="size-4 text-primary" />
          포트폴리오
        </span>
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
