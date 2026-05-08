'use client'

import { siteData } from '@/lib/data'

export default function HeroHeading() {
  return (
    <h1 className="font-section text-base leading-[1.1] md:text-xl">
      <span className="text-muted-foreground">안녕하세요,&nbsp;</span>
      <span className="hero-name">{siteData.name}</span>
      <span className="text-muted-foreground">입니다.</span>
    </h1>
  )
}
