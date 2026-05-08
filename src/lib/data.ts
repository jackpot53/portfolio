export type SkillCategory = {
  languages: string[]
  frameworks: string[]
  mlops: string[]
  cloud: string[]
}

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  github: string
  demo?: string
  featured: boolean
}

export type Experience = {
  id: string
  type: 'work' | 'education'
  title: string
  organization: string
  period: string
  description?: string
}

export const siteData = {
  name: '홍길동',
  title: 'AI / ML 엔지니어',
  email: 'example@email.com',
  github: 'https://github.com/username',
  linkedin: 'https://linkedin.com/in/username',
  bio: '데이터에서 가치를 발굴하는 AI/ML 엔지니어입니다. 실험부터 프로덕션 배포까지 전 과정을 경험했습니다.',
  avatar: '',

  skills: {
    languages: ['Python', 'SQL', 'R', 'Bash'],
    frameworks: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'LangChain'],
    mlops: ['MLflow', 'Docker', 'Kubernetes', 'Airflow', 'GitHub Actions'],
    cloud: ['AWS SageMaker', 'GCP Vertex AI', 'S3', 'BigQuery'],
  } satisfies SkillCategory,

  projects: [
    {
      id: 'llm-rag',
      title: 'LLM 기반 RAG 검색 시스템',
      description: '기업 내부 문서를 벡터 DB에 색인하고 LLM으로 질의응답하는 시스템',
      tags: ['LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
      github: 'https://github.com/username/llm-rag',
      demo: 'https://demo.example.com',
      featured: true,
    },
    {
      id: 'churn-prediction',
      title: '고객 이탈 예측 모델',
      description: 'XGBoost 기반 이탈 예측 파이프라인 — AUC 0.91 달성',
      tags: ['Python', 'XGBoost', 'MLflow', 'Docker'],
      github: 'https://github.com/username/churn-prediction',
      featured: false,
    },
    {
      id: 'sentiment-api',
      title: '리뷰 감성 분석 API',
      description: 'KR-BERT 파인튜닝 기반 한국어 감성 분류 REST API',
      tags: ['PyTorch', 'Hugging Face', 'FastAPI', 'GCP'],
      github: 'https://github.com/username/sentiment-api',
      featured: false,
    },
  ] satisfies Project[],

  experience: [
    {
      id: 'job-1',
      type: 'work' as const,
      title: 'ML 엔지니어',
      organization: '회사명',
      period: '2023 – 현재',
      description: '추천 시스템 및 이상 탐지 모델 개발 및 운영',
    },
    {
      id: 'job-2',
      type: 'work' as const,
      title: '데이터 사이언티스트',
      organization: '이전 회사명',
      period: '2021 – 2023',
      description: '고객 행동 분석 및 A/B 테스트 설계',
    },
    {
      id: 'edu-1',
      type: 'education' as const,
      title: '컴퓨터공학 학사',
      organization: '대학교명',
      period: '2017 – 2021',
    },
  ] satisfies Experience[],
}
