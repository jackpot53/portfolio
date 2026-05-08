'use client'

import { useState } from 'react'
import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'

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
