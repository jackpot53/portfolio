import { siteData } from '@/lib/data'
import DevLabel from '@/components/ui/DevLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import FadeUp from '@/components/ui/FadeUp'
import { Zap, Code2, Layers, GitBranch, Cloud } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

const CATEGORIES: {
  key: keyof typeof siteData.skills
  label: string
  icon: LucideIcon
  color: string
  description: string
}[] = [
  {
    key: 'languages',
    label: '언어',
    icon: Code2,
    color: 'text-blue-500 bg-blue-500/10',
    description: 'Python을 주력으로 데이터 전처리, 모델 학습, API 개발까지 전반적으로 활용하며 SQL로 대용량 데이터 분석 업무를 수행했습니다.',
  },
  {
    key: 'frameworks',
    label: '프레임워크',
    icon: Layers,
    color: 'text-purple-500 bg-purple-500/10',
    description: 'PyTorch·TensorFlow로 딥러닝 모델을 설계·학습하고, Hugging Face와 LangChain으로 LLM 기반 서비스를 구축한 경험이 있습니다.',
  },
  {
    key: 'mlops',
    label: 'MLOps',
    icon: GitBranch,
    color: 'text-emerald-500 bg-emerald-500/10',
    description: 'MLflow로 실험을 관리하고 Docker·Kubernetes 기반의 모델 서빙 파이프라인을 구축했습니다. Airflow로 배치 학습 스케줄링도 운영했습니다.',
  },
  {
    key: 'cloud',
    label: '클라우드',
    icon: Cloud,
    color: 'text-orange-500 bg-orange-500/10',
    description: 'AWS SageMaker로 모델 학습·배포 환경을 구성하고 GCP Vertex AI 파이프라인을 설계했습니다. S3·BigQuery를 통한 데이터 레이크 운영 경험이 있습니다.',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-white py-16">
      <DevLabel name="Skills" file="src/components/sections/Skills.tsx" />
      <div className="animate-float-b pointer-events-none absolute -left-40 top-1/3 size-[440px] rounded-full bg-violet-100/25 blur-3xl" />
      <div className="animate-float-a pointer-events-none absolute -right-40 top-1/4 size-[480px] rounded-full bg-purple-50/30 blur-3xl" />
      <div className="animate-float-c pointer-events-none absolute -right-20 bottom-10 size-[360px] rounded-full bg-fuchsia-50/20 blur-3xl" />
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeUp><SectionTitle icon={Zap} color="purple">스킬</SectionTitle></FadeUp>
        <div className="grid gap-6 md:grid-cols-2">
          {CATEGORIES.map(({ key, label, icon: Icon, color, description }, index) => (
            <FadeUp key={key} delay={index * 100}>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-md transition-shadow hover:shadow-lg h-full">
              <div className="mb-3 flex items-center gap-3">
                <div className={`flex size-9 items-center justify-center rounded-lg ${color}`}>
                  <Icon className="size-4" />
                </div>
                <h3 className="font-semibold text-foreground">{label}</h3>
              </div>
              <p className="mb-5 text-xs leading-relaxed text-muted-foreground">{description}</p>
              <div className="flex flex-wrap gap-2">
                {siteData.skills[key].map((skill) => (
                  <span key={skill} className="text-sm font-medium text-muted-foreground/70 hover:text-primary transition-colors">
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
