import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/ui/ProjectCard'
import type { Project } from '@/lib/data'

const featuredProject: Project = {
  id: 'test-project',
  title: 'RAG 시스템',
  description: 'LLM 기반 검색 시스템',
  tags: ['LangChain', 'FastAPI'],
  github: 'https://github.com/test',
  demo: 'https://demo.test',
  featured: true,
}

const regularProject: Project = {
  id: 'test-project-2',
  title: '감성 분석',
  description: 'BERT 기반 분류',
  tags: ['PyTorch'],
  github: 'https://github.com/test2',
  featured: false,
}

describe('ProjectCard', () => {
  it('프로젝트 제목과 설명을 렌더링한다', () => {
    render(<ProjectCard project={featuredProject} />)
    expect(screen.getByText('RAG 시스템')).toBeInTheDocument()
    expect(screen.getByText('LLM 기반 검색 시스템')).toBeInTheDocument()
  })

  it('태그를 모두 렌더링한다', () => {
    render(<ProjectCard project={featuredProject} />)
    expect(screen.getByText('LangChain')).toBeInTheDocument()
    expect(screen.getByText('FastAPI')).toBeInTheDocument()
  })

  it('GitHub 링크를 렌더링한다', () => {
    render(<ProjectCard project={featuredProject} />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', 'https://github.com/test')
  })

  it('demo가 있으면 데모 링크를 렌더링한다', () => {
    render(<ProjectCard project={featuredProject} />)
    const link = screen.getByRole('link', { name: /데모/i })
    expect(link).toHaveAttribute('href', 'https://demo.test')
  })

  it('demo가 없으면 데모 링크를 렌더링하지 않는다', () => {
    render(<ProjectCard project={regularProject} />)
    expect(screen.queryByRole('link', { name: /데모/i })).not.toBeInTheDocument()
  })
})
