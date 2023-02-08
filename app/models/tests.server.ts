import type { Section } from "@prisma/client"
import { prisma } from "~/db.server"

export async function getTestById({ id }: Pick<Section, "id">) {
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
export async function getAllTestsCount(currentWorkspaceId: string | undefined) {
  const testCount = await prisma.test.count({
    where: {
      deleted: false,
      workspaceId: currentWorkspaceId,
    },
  })
  return testCount
}
export async function getAllTests(
  sortBy: string | null,
  sortOrder: string | null,
  workspaceId: string,
  testsItemsPerPage = 5,
  testsCurrentPage = 1
) {
  const PER_PAGE_ITEMS = testsItemsPerPage
  return await prisma.test.findMany({
    take: PER_PAGE_ITEMS,
    skip: (testsCurrentPage - 1) * PER_PAGE_ITEMS,
    orderBy: { [sortBy ? sortBy : "createdAt"]: sortOrder ? sortOrder : "asc" },
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
