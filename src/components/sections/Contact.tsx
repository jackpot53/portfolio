'use client'

import { useState } from 'react'
import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'
import { Button } from '@/components/ui/button'
import SectionTitle from '@/components/ui/SectionTitle'
import { Mail } from 'lucide-react'

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
      <SectionTitle icon={Mail} color="rose">연락처</SectionTitle>
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
