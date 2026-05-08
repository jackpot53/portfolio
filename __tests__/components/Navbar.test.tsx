import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('모든 네비게이션 항목을 렌더링한다', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: '소개' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '스킬' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '프로젝트' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '경력' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '연락처' })).toBeInTheDocument()
  })

  it('각 링크는 앵커 href를 가진다', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: '소개' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: '스킬' })).toHaveAttribute('href', '#skills')
  })
})
