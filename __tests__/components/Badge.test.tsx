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
