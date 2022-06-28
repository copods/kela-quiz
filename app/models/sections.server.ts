import type { User, Section } from '@prisma/client'
import { prisma } from '~/db.server'

export async function getSectionById({ id }: Pick<Section, 'id'>) {
  return prisma.section.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
    },
  })
}

export async function getAllSections() {
  return await prisma.section.findMany()
}

export async function createSection({
  name,
  userId,
}: Pick<Section, 'name'> & { userId: User['id'] }) {
  return await prisma.section.create({
    data: {
      name,
      userId,
    },
  })
}

export async function deleteSectionById(id: string) {
  return prisma.section.delete({ where: { id } })
}
