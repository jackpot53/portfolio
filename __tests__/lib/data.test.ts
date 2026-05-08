import { siteData } from '@/lib/data'

describe('siteData', () => {
  it('필수 개인정보 필드가 존재한다', () => {
    expect(typeof siteData.name).toBe('string')
    expect(typeof siteData.title).toBe('string')
    expect(typeof siteData.email).toBe('string')
    expect(typeof siteData.bio).toBe('string')
  })

  it('소셜 링크가 존재한다', () => {
    expect(typeof siteData.github).toBe('string')
    expect(typeof siteData.linkedin).toBe('string')
  })

  it('스킬 카테고리가 모두 배열이다', () => {
    expect(Array.isArray(siteData.skills.languages)).toBe(true)
    expect(Array.isArray(siteData.skills.frameworks)).toBe(true)
    expect(Array.isArray(siteData.skills.mlops)).toBe(true)
    expect(Array.isArray(siteData.skills.cloud)).toBe(true)
  })

  it('프로젝트가 1개 이상 존재하고 필수 필드를 가진다', () => {
    expect(siteData.projects.length).toBeGreaterThan(0)
    const p = siteData.projects[0]
    expect(typeof p.id).toBe('string')
    expect(typeof p.title).toBe('string')
    expect(typeof p.description).toBe('string')
    expect(Array.isArray(p.tags)).toBe(true)
    expect(typeof p.github).toBe('string')
    expect(typeof p.featured).toBe('boolean')
  })

  it('경력/학력이 1개 이상 존재하고 필수 필드를 가진다', () => {
    expect(siteData.experience.length).toBeGreaterThan(0)
    const e = siteData.experience[0]
    expect(['work', 'education'].includes(e.type)).toBe(true)
    expect(typeof e.title).toBe('string')
    expect(typeof e.organization).toBe('string')
    expect(typeof e.period).toBe('string')
  })

  it('대표 프로젝트(featured)가 정확히 1개다', () => {
    const featured = siteData.projects.filter(p => p.featured)
    expect(featured.length).toBe(1)
  })
})
