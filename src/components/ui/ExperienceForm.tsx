'use client'

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

const inputCls =
  'w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

const labelCls = 'mb-1 block text-sm font-medium text-gray-300'

export default function ExperienceForm({
  action,
  defaultValues = {},
  submitLabel = '저장',
}: ExperienceFormProps) {
  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <label htmlFor="type" className={labelCls}>
          구분
        </label>
        <select
          id="type"
          name="type"
          defaultValue={defaultValues.type ?? 'work'}
          className={inputCls}
          required
        >
          <option value="work">경력</option>
          <option value="education">학력</option>
        </select>
      </div>

      <div>
        <label htmlFor="title" className={labelCls}>
          직함 / 학위
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={defaultValues.title ?? ''}
          placeholder="예: ML 엔지니어"
          className={inputCls}
          required
        />
      </div>

      <div>
        <label htmlFor="organization" className={labelCls}>
          회사 / 학교
        </label>
        <input
          id="organization"
          name="organization"
          type="text"
          defaultValue={defaultValues.organization ?? ''}
          placeholder="예: Kakao Corp"
          className={inputCls}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startedAt" className={labelCls}>
            시작일
          </label>
          <input
            id="startedAt"
            name="startedAt"
            type="date"
            defaultValue={defaultValues.startedAt ?? ''}
            className={inputCls}
            required
          />
        </div>
        <div>
          <label htmlFor="endedAt" className={labelCls}>
            종료일 <span className="text-gray-500">(재직중이면 비움)</span>
          </label>
          <input
            id="endedAt"
            name="endedAt"
            type="date"
            defaultValue={defaultValues.endedAt ?? ''}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelCls}>
          설명 <span className="text-gray-500">(선택)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={defaultValues.description ?? ''}
          placeholder="주요 업무 또는 성과를 입력하세요"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="sortOrder" className={labelCls}>
          정렬 순서
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={defaultValues.sortOrder ?? 0}
          className={inputCls}
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/80"
      >
        {submitLabel}
      </button>
    </form>
  )
}
