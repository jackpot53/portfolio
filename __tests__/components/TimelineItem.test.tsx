import { render, screen } from '@testing-library/react'
import TimelineItem from '@/components/ui/TimelineItem'
import type { Experience } from '@/lib/data'

const workItem: Experience = {
  id: 'test-1',
  type: 'work',
  title: 'ML 엔지니어',
  organization: '테스트 회사',
  period: '2023 – 현재',
  description: '모델 개발',
}

const eduItem: Experience = {
  id: 'test-2',
  type: 'education',
  title: '컴퓨터공학 학사',
  organization: '테스트 대학',
  period: '2017 – 2021',
}

describe('TimelineItem', () => {
  it('직책과 회사명을 렌더링한다', () => {
    render(<TimelineItem item={workItem} />)
    expect(screen.getByText('ML 엔지니어')).toBeInTheDocument()
    expect(screen.getByText('테스트 회사')).toBeInTheDocument()
  })

  it('기간을 렌더링한다', () => {
    render(<TimelineItem item={workItem} />)
    expect(screen.getByText('2023 – 현재')).toBeInTheDocument()
  })

  it('description이 있으면 렌더링한다', () => {
    render(<TimelineItem item={workItem} />)
    expect(screen.getByText('모델 개발')).toBeInTheDocument()
  })

  it('description이 없으면 렌더링하지 않는다', () => {
    render(<TimelineItem item={eduItem} />)
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument()
  })
})
