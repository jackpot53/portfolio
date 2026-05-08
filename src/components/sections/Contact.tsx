'use client'

import { useState } from 'react'
import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react'
import FadeUp from '@/components/ui/FadeUp'

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 6.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(siteData.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-16">
      <DevLabel name="Contact" file="src/components/sections/Contact.tsx" />
      <div className="animate-float-a pointer-events-none absolute -left-40 top-1/3 size-[440px] rounded-full bg-rose-100/25 blur-3xl" />
      <div className="animate-float-b pointer-events-none absolute -right-40 bottom-1/4 size-[400px] rounded-full bg-pink-50/20 blur-3xl" />
      <div className="animate-float-c pointer-events-none absolute -right-20 top-10 size-[300px] rounded-full bg-red-50/15 blur-3xl" />
      <div className="mx-auto max-w-[1100px] px-6 text-center">
        <FadeUp><SectionTitle icon={Mail} color="rose">연락처</SectionTitle></FadeUp>
        <FadeUp delay={100}>
          <p className="mb-10 text-lg text-muted-foreground">
            함께 일하고 싶으시다면 언제든지 연락 주세요.
          </p>
          <div className="mb-10 flex flex-col items-center gap-3">
            <span className="animate-wave text-6xl">👋</span>
            <p className="font-section text-2xl text-gray-700">같이 멋진 걸 만들어봐요!</p>
          </div>
        </FadeUp>
        <FadeUp delay={200}>
      <div className="flex flex-wrap justify-center gap-4">

        {/* 이메일 */}
        <button
          onClick={copyEmail}
          className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
            <Mail className="size-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">
              {copied ? '복사됐어요!' : '이메일'}
            </p>
            <p className="text-xs text-gray-400">{siteData.email}</p>
          </div>
          {copied
            ? <Check className="ml-1 size-4 text-emerald-500" />
            : <Copy className="ml-1 size-4 text-gray-300 transition-colors group-hover:text-gray-500" />
          }
        </button>

        {/* GitHub */}
        <a
          href={siteData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
            <GitHubIcon className="size-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">GitHub</p>
            <p className="text-xs text-gray-400">{siteData.github.replace('https://', '')}</p>
          </div>
          <ArrowUpRight className="ml-1 size-4 text-gray-300 transition-colors group-hover:text-gray-500" />
        </a>

        {/* LinkedIn */}
        <a
          href={siteData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <LinkedInIcon className="size-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">LinkedIn</p>
            <p className="text-xs text-gray-400">{siteData.linkedin.replace('https://', '')}</p>
          </div>
          <ArrowUpRight className="ml-1 size-4 text-gray-300 transition-colors group-hover:text-gray-500" />
        </a>

      </div>
        </FadeUp>

      <footer className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} {siteData.name}
      </footer>
      </div>
    </section>
  )
}
