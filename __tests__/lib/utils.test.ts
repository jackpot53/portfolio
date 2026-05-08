import { cn } from '@/lib/utils'

describe('cn', () => {
  it('단일 클래스 반환', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('여러 클래스 병합', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('falsy 값 무시', () => {
    expect(cn('foo', false, undefined, null, 'bar')).toBe('foo bar')
  })

  it('Tailwind 충돌 클래스 마지막 것으로 덮어씀', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })
})
