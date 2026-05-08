import { render, screen } from '@testing-library/react'
import Badge from '@/components/ui/Badge'

describe('Badge', () => {
  it('텍스트를 렌더링한다', () => {
    render(<Badge>Python</Badge>)
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('기본 variant는 default다', () => {
    render(<Badge>Python</Badge>)
    const el = screen.getByText('Python')
    expect(el.className).toContain('border-border')
  })

  it('accent variant는 퍼플 테두리를 가진다', () => {
    render(<Badge variant="accent">PyTorch</Badge>)
    const el = screen.getByText('PyTorch')
    expect(el.className).toContain('border-accent')
  })
})
