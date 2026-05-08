import { siteData } from '@/lib/data'
import Badge from '@/components/ui/badge'
import DevLabel from '@/components/ui/DevLabel'

const CATEGORY_LABELS: Record<keyof typeof siteData.skills, string> = {
  languages: '언어',
  frameworks: '프레임워크',
  mlops: 'MLOps',
  cloud: '클라우드',
}

export default function Skills() {
  return (
    <section id="skills" className="relative bg-surface/50 py-24">
      <DevLabel name="Skills" file="src/components/sections/Skills.tsx" />
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="mb-12 text-4xl font-extrabold text-white">스킬</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {(Object.keys(siteData.skills) as Array<keyof typeof siteData.skills>).map((category) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent-light">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {siteData.skills[category].map((skill) => (
                  <Badge key={skill} variant="default">{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
