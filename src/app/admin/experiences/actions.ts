'use server'

import { db } from '@/db'
import { experiences } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createExperience(formData: FormData) {
  await db.insert(experiences).values({
    type: formData.get('type') as string,
    title: formData.get('title') as string,
    organization: formData.get('organization') as string,
    startedAt: formData.get('startedAt') as string,
    endedAt: (formData.get('endedAt') as string) || null,
    description: (formData.get('description') as string) || null,
    sortOrder: Number(formData.get('sortOrder') ?? 0),
  })
  revalidatePath('/')
  redirect('/')
}

export async function updateExperience(id: number, formData: FormData) {
  await db
    .update(experiences)
    .set({
      type: formData.get('type') as string,
      title: formData.get('title') as string,
      organization: formData.get('organization') as string,
      startedAt: formData.get('startedAt') as string,
      endedAt: (formData.get('endedAt') as string) || null,
      description: (formData.get('description') as string) || null,
      sortOrder: Number(formData.get('sortOrder') ?? 0),
    })
    .where(eq(experiences.id, id))
  revalidatePath('/')
  redirect('/')
}

export async function deleteExperience(id: number, _formData: FormData) {
  await db.delete(experiences).where(eq(experiences.id, id))
  revalidatePath('/')
}
