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
