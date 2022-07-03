import type { Section } from '@prisma/client'
import { prisma } from '~/db.server'

export async function getTestById({ id }: Pick<Section, 'id'>) {
  return prisma.test.findUnique({
    where: {
      id,
    }
  })
}

export async function getAllTests() {
  return await prisma.test.findMany({
    include: {
      createdBy: true
    },
  })
}

export async function createTest(createdById: string, data: {name: string, description: string, sections: Array<{sectionId: string, timeInSeconds:number, totalQuestions:number}>}){
  return await prisma.test.create({
    data: {
      name: data.name,
      description: data.description,
      createdById,
      sections: {
        create: [
          ...data.sections
        ]
      }
    },
  })
}

export async function deleteTestById(id: string) {
  return prisma.test.delete({ where: { id } })
}