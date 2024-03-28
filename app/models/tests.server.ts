import type { Section } from "@prisma/client"

import { checkFeatureAuthorization } from "./authorization.server"

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
export async function getAllTestsCount(
  currentWorkspaceId: string | undefined,
  userId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        currentWorkspaceId!,
        "assessments",
        "read"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    const testCount = await prisma.test.count({
      where: {
        deleted: false,
        workspaceId: currentWorkspaceId,
      },
    })
    return testCount
  } catch (error) {
    throw error
  }
}
export async function getAllTests(
  sortBy: string | null,
  sortOrder: string | null,
  workspaceId: string,
  testsItemsPerPage = 5,
  testsCurrentPage = 1,
  userId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        workspaceId,
        "assessments",
        "read"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    const PER_PAGE_ITEMS = testsItemsPerPage
    return await prisma.test.findMany({
      take: PER_PAGE_ITEMS,
      skip: (testsCurrentPage - 1) * PER_PAGE_ITEMS,
      orderBy: {
        [sortBy ? sortBy : "createdAt"]: sortOrder ? sortOrder : "asc",
      },
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
  } catch (error) {
    throw error
  }
}

export async function createTest(
  createdById: string,
  workspaceId: string,
  data: {
    name: string
    description: string
    dispatchResultOnTestCompleted: boolean
    sections: Array<{
      sectionId: string
      timeInSeconds: number
      totalQuestions: number
      order: number
    }>
  },
  userId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        workspaceId,
        "assessments",
        "create"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    return await prisma.test.create({
      data: {
        name: data.name,
        description: data.description,
        dispatchResultOnTestCompleted: data.dispatchResultOnTestCompleted,
        createdById,
        workspaceId,
        sections: {
          create: [...data.sections],
        },
      },
    })
  } catch (error) {
    throw error
  }
}

export async function updateTest(
  workspaceId: string,
  id: string,
  data: {
    dispatchResultOnTestCompleted: boolean
  },
  userId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        workspaceId,
        "assessments",
        "update"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    return await prisma.test.update({
      where: {
        id,
      },
      data: {
        dispatchResultOnTestCompleted: data.dispatchResultOnTestCompleted,
      },
    })
  } catch (error) {
    throw error
  }
}

export async function deleteTestById(
  id: string,
  userId: string,
  workspaceId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        workspaceId,
        "assessments",
        "delete"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    return prisma.test.update({
      where: { id },
      data: {
        deleted: true,
        deletedAt: new Date().toString(),
      },
    })
  } catch (error) {
    throw error
  }
}
