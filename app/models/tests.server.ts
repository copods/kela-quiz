import type { Section } from '@prisma/client'
import { prisma } from '~/db.server'
import { sortByOrder } from '~/interface/Interface'

export async function getTestById({ id }: Pick<Section, 'id'>) {
  return prisma.test.findUnique({
    where: {
      id,
    },
    include: {
      sections: {
        include: {
          section: true,
        },
      },
    },
  })
}

export async function getAllTests(filterData: any, workspaceId: string) {
  let filter = filterData.orderBy
    ? filterData
    : { orderBy: { name: sortByOrder.ascending } }
  return await prisma.test.findMany({
    ...filter,
    where: {
      deleted: false,
      workspaceId,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      createdBy: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      sections: {
        select: {
          section: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })
}

export async function createTest(
  createdById: string,
  workspaceId: string,
  data: {
    name: string
    description: string
    sections: Array<{
      sectionId: string
      timeInSeconds: number
      totalQuestions: number
      order: number
    }>
  }
) {
  return await prisma.test.create({
    data: {
      name: data.name,
      description: data.description,
      createdById,
      workspaceId,
      sections: {
        create: [...data.sections],
      },
    },
  })
}

export async function deleteTestById(id: string) {
  return prisma.test.update({
    where: { id },
    data: {
      deleted: true,
      deletedAt: new Date().toString(),
    },
  })
}
