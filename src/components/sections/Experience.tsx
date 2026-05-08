import { siteData } from '@/lib/data'
import TimelineItem from '@/components/ui/TimelineItem'

export default function Experience() {
  return (
    <section id="experience" className="bg-surface/50 py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="mb-12 text-4xl font-extrabold text-white">경력 / 학력</h2>
        <div className="max-w-2xl">
          {siteData.experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              isLast={index === siteData.experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
