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
  bio: '데이터에서 가치를 발굴하는 AI/ML 엔지니어입니다. 머신러닝 모델 설계부터 프로덕션 배포까지 전 과정을 직접 경험하며, 단순히 높은 정확도를 넘어 실제 비즈니스 문제를 해결하는 데 집중합니다.\n\n추천 시스템, 이상 탐지, 자연어 처리 등 다양한 도메인에서 프로젝트를 수행했으며, MLOps 파이프라인 구축과 LLM 기반 서비스 개발에도 깊은 관심을 갖고 있습니다. 데이터를 통해 더 나은 의사결정을 만들어가는 일에 보람을 느낍니다.',
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
      description: '사내 문서·매뉴얼 수천 건을 청크 단위로 분할해 Pinecone 벡터 DB에 색인하고, GPT-4 기반 LLM이 관련 컨텍스트를 참조해 정확한 답변을 생성하는 사내 지식 검색 시스템입니다. Hybrid Search(BM25 + Dense)로 검색 정확도를 높이고 응답 지연을 평균 1.2초 이내로 유지했습니다.',
      tags: ['LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
      github: 'https://github.com/username/llm-rag',
      demo: 'https://demo.example.com',
      featured: true,
    },
    {
      id: 'churn-prediction',
      title: '고객 이탈 예측 모델',
      description: '180만 건의 고객 행동 로그를 피처 엔지니어링해 XGBoost 기반 이탈 예측 파이프라인을 구축했습니다. SHAP 분석으로 이탈 주요 요인을 시각화하고 마케팅팀의 타겟 캠페인에 활용, AUC 0.91 / 이탈율 11% 감소 성과를 달성했습니다.',
      tags: ['Python', 'XGBoost', 'MLflow', 'Docker'],
      github: 'https://github.com/username/churn-prediction',
      featured: false,
    },
    {
      id: 'sentiment-api',
      title: '리뷰 감성 분석 API',
      description: '쇼핑몰 리뷰 50만 건으로 KR-BERT를 파인튜닝해 긍·부정·중립 3-class 분류 모델을 학습했습니다. FastAPI로 REST API를 구축하고 GCP Cloud Run에 배포해 일 평균 20만 건의 실시간 추론 요청을 처리하며 F1-Score 0.93을 기록했습니다.',
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
