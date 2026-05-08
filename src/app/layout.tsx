import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Faster+One&family=Gaegu&family=Irish+Grover&family=Nanum+Pen+Script&family=Story+Script&family=Sunflower:wght@300&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg text-white antialiased">
        <Navbar />
        {children}
        <Script
          src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.10/dist/dotlottie-wc.js"
          type="module"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
