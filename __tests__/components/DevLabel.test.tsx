import { render, screen, fireEvent, act } from '@testing-library/react'
import DevLabel from '@/components/ui/DevLabel'

const originalEnv = process.env.NODE_ENV

afterEach(() => {
  Object.defineProperty(process.env, 'NODE_ENV', {
    value: originalEnv,
    configurable: true,
  })
})

describe('DevLabel', () => {
  it('development 환경이 아니면 null을 반환한다', () => {
    // jest 기본 NODE_ENV는 'test'
    const { container } = render(
      <DevLabel name="Hero" file="src/components/sections/Hero.tsx" />
    )
    expect(container.firstChild).toBeNull()
  })

  it('development 환경에서 컴포넌트명 버튼을 렌더링한다', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true,
    })
    render(<DevLabel name="Hero" file="src/components/sections/Hero.tsx" />)
    expect(screen.getByRole('button', { name: 'Hero' })).toBeInTheDocument()
  })

  it('클릭 시 클립보드에 복사하고 피드백 텍스트를 표시한다', async () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true,
    })
    const writeText = jest.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    render(<DevLabel name="About" file="src/components/sections/About.tsx" />)
    const btn = screen.getByRole('button', { name: 'About' })

    await act(async () => { fireEvent.click(btn) })

    expect(writeText).toHaveBeenCalledWith(
      'Component: About\nFile: src/components/sections/About.tsx'
    )
    expect(screen.getByText('✓ copied')).toBeInTheDocument()
  })

  it('1.5초 후 copied 피드백이 원래 이름으로 돌아온다', async () => {
    jest.useFakeTimers()
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true,
    })
    Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue(undefined) } })

    render(<DevLabel name="Skills" file="src/components/sections/Skills.tsx" />)
    const btn = screen.getByRole('button', { name: 'Skills' })

    await act(async () => { fireEvent.click(btn) })
    expect(screen.getByText('✓ copied')).toBeInTheDocument()

    act(() => { jest.advanceTimersByTime(1500) })
    expect(screen.getByRole('button', { name: 'Skills' })).toBeInTheDocument()

    jest.useRealTimers()
  })
})
