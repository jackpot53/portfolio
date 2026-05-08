'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type DefaultValues = {
  type?: string
  title?: string
  organization?: string
  startedAt?: string
  endedAt?: string | null
  description?: string | null
  sortOrder?: number
}

type ExperienceFormProps = {
  action: (formData: FormData) => Promise<void>
  defaultValues?: DefaultValues
  submitLabel?: string
}

export default function ExperienceForm({
  action,
  defaultValues = {},
  submitLabel = '저장',
}: ExperienceFormProps) {
  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="type">구분</Label>
        <select
          id="type"
          name="type"
          defaultValue={defaultValues.type ?? 'work'}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
          required
        >
          <option value="work">경력</option>
          <option value="education">학력</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">직함 / 학위</Label>
        <Input
          id="title"
          name="title"
          type="text"
          defaultValue={defaultValues.title ?? ''}
          placeholder="예: ML 엔지니어"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="organization">회사 / 학교</Label>
        <Input
          id="organization"
          name="organization"
          type="text"
          defaultValue={defaultValues.organization ?? ''}
          placeholder="예: Kakao Corp"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="startedAt">시작일</Label>
          <Input
            id="startedAt"
            name="startedAt"
            type="date"
            defaultValue={defaultValues.startedAt ?? ''}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="endedAt">
            종료일 <span className="text-muted-foreground font-normal">(재직중이면 비움)</span>
          </Label>
          <Input
            id="endedAt"
            name="endedAt"
            type="date"
            defaultValue={defaultValues.endedAt ?? ''}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">
          설명 <span className="text-muted-foreground font-normal">(선택)</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={defaultValues.description ?? ''}
          placeholder="주요 업무 또는 성과를 입력하세요"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sortOrder">정렬 순서</Label>
        <Input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={String(defaultValues.sortOrder ?? 0)}
        />
      </div>

      <Button type="submit" className="mt-2 w-full">
        {submitLabel}
      </Button>
    </form>
  )
}
