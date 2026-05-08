'use client'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        autoplay?: boolean
        loop?: boolean
        style?: React.CSSProperties
      }
    }
  }
}

export default function HeroLottieWC() {
  return (
    <dotlottie-wc
      src="https://lottie.host/e4d8d1eb-9e43-45ea-82af-82caa824fc3a/6OyOWgo3AX.lottie"
      style={{ width: '100%', height: '100%' }}
      autoplay
      loop
    />
  )
}
