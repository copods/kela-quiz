import type { User, Section, Question } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

import { checkFeatureAuthorization } from "./authorization.server"

import { prisma } from "~/db.server"
import { deleteQuestionStatus } from "~/interface/Interface"

export async function getSectionById({
  id,
  userId,
  workspaceId,
}: {
  id: string
  userId: string | undefined
  workspaceId: string
}) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId!,
        workspaceId,
        "questions",
        "read"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    return prisma.section.findUnique({
      where: {
        id,
      },
      include: {
        questions: {
          where: {
            deleted: false,
          },
          include: {
            correctOptions: true,
            options: true,
            correctAnswer: true,
            questionType: {
              select: {
                displayName: true,
                value: true,
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

export async function getFirstSection(
  sortBy: string | null,
  sortOrder: string | null,
  workspaceId: string,
  testCurrentPage = 1,
  testItemsPerPage = 5
) {
  const firstSection = await prisma.section.findFirst({
    orderBy: { [sortBy ? sortBy : "createdAt"]: sortOrder ? sortOrder : "asc" },
    take: testItemsPerPage,
    skip: (testCurrentPage - 1) * testItemsPerPage,

    where: {
      workspaceId,
      deleted: false,
    },
  })

  return firstSection?.id
}

export async function getAllTestsCounts(currentWorkspaceId: string) {
  const userCount = await prisma.section.count({
    where: {
      deleted: false,
      workspaceId: currentWorkspaceId,
    },
  })
  return userCount
}
export async function getAllSections(
  sortBy: string | null,
  sortOrder: string | null,
  workspaceId: string,
  testCurrentPage = 1,
  testItemsPerPage = 5,
  userId: string,
  currentWorkspaceId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        currentWorkspaceId,
        "tests",
        "read"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    const PER_PAGE_ITEMS = testItemsPerPage
    const res = await prisma.section.findMany({
      orderBy: {
        [sortBy ? sortBy : "createdAt"]: sortOrder ? sortOrder : "asc",
      },
      take: PER_PAGE_ITEMS,
      skip: (testCurrentPage - 1) * PER_PAGE_ITEMS,

      where: {
        deleted: false,
        workspaceId,
      },
      include: {
        createdBy: true,
        questions: true,
      },
    })
    if (res) {
      res.forEach(
        (
          section: Section & {
            count?: number
            questions?: Array<Question>
          }
        ) => {
          let count = 0
          section?.questions?.forEach((question: Question) => {
            if (question?.deleted == false) {
              count = count + 1
            }
          })
          section["count"] = count
        }
      )
    }
    return res
  } catch (error) {
    throw error
  }
}

export async function createSection({
  name,
  description,
  createdById,
  workspaceId,
  userId,
}: Pick<Section, "name" | "description" | "workspaceId"> & {
  createdById: User["id"]
  userId: string
}) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        workspaceId!,
        "tests",
        "create"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    return await prisma.section.create({
      data: {
        name,
        description,
        createdById,
        workspaceId,
      },
    })
  } catch (error) {
    throw error
  }
}
export async function editSectionById(
  id: string,
  name: string,
  description: string,
  userId: string,
  workspaceId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(userId, workspaceId, "tests", "update"))
    ) {
      throw {
        status: 403,
      }
    }
    return prisma.section.update({
      where: { id },
      data: {
        name: name,
        description: description,
      },
    })
  } catch (error) {
    throw error
  }
}
export async function deleteSectionById(
  id: string,
  userId: string,
  workspaceId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(userId, workspaceId, "tests", "delete"))
    ) {
      throw {
        status: 403,
      }
    }
    return prisma.section.update({
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

export async function checkSectionById(id: string) {
  return prisma.section.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          sectionInTest: true,
        },
      },
      sectionInTest: {
        select: {
          test: {
            select: {
              id: true,
              deleted: true,
            },
          },
        },
      },
    },
  })
}
export async function getQuestionType() {
  return prisma.questionType.findMany()
}

export async function addQuestion(
  question: string,
  options: Array<{ id: string; option: string; isCorrect: boolean }>,
  correctAnswer: Array<{ id: string; answer: string; order: number }>,
  questionTypeId: string,
  sectionId: string,
  createdById: string,
  checkOrder: boolean,
  userId: string,
  workspaceId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        workspaceId,
        "questions",
        "create"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    let questionId = uuidv4()
    await prisma.question
      .create({
        data: {
          id: questionId,
          question,
          sectionId,
          createdById,
          questionTypeId,
          checkOrder,
          options: {
            createMany: {
              data: options.map((option) => ({
                option: option.option,
                id: option.id,
                coInQuestionId: option.isCorrect ? questionId : null,
                createdById,
              })),
            },
          },
          correctAnswer: {
            createMany: {
              data: correctAnswer,
            },
          },
        },
      })
      .then(() => {
        return true
      })
  } catch (error) {
    throw error
  }
}
export async function deleteQuestionById(
  id: string,
  userId: string,
  workspaceId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        workspaceId,
        "questions",
        "delete"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    const questionData = await prisma.question.findUnique({
      where: {
        id,
      },
      select: {
        section: {
          select: {
            questions: {
              where: {
                deleted: {
                  equals: false,
                },
              },
            },
            sectionInTest: {
              where: {
                test: {
                  deleted: {
                    equals: false,
                  },
                },
              },
              select: {
                totalQuestions: true,
              },
            },
          },
        },
      },
    })
    const totalQuestionsList = questionData?.section?.sectionInTest.map(
      (data: { totalQuestions: number }) => {
        return data.totalQuestions
      }
    )
    if (questionData && totalQuestionsList) {
      if (
        questionData.section.questions?.length <=
        Math.max(...totalQuestionsList)
      ) {
        return deleteQuestionStatus.notDeleted
      }
    }

    const deleteQuestion = await prisma.question.update({
      where: {
        id,
      },
      data: {
        deleted: true,
        deletedAt: new Date().toString(),
      },
    })
    if (deleteQuestion) {
      return deleteQuestionStatus.deleted
    }
  } catch (error) {
    throw error
  }
}
