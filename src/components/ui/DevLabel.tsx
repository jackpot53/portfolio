'use client'

import { useState } from 'react'

interface DevLabelProps {
  name: string
  file: string
}

export default function DevLabel({ name, file }: DevLabelProps) {
  const [copied, setCopied] = useState(false)

  if (process.env.NODE_ENV !== 'development') return null

  const handleClick = () => {
    navigator.clipboard.writeText(`Component: ${name}\nFile: ${file}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className="absolute top-1 left-1 z-[9999] rounded bg-black/80 px-2 py-0.5 font-mono text-xs text-white transition-colors hover:bg-black"
    >
      {copied ? '✓ copied' : name}
    </button>
  )
}
