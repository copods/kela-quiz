import type { User, Section, Question } from "@prisma/client"
import cuid from "cuid"

import { prisma } from "~/db.server"
import { deleteQuestionStatus } from "~/interface/Interface"

export async function getSectionById({ id }: Pick<Section, "id">) {
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
  testItemsPerPage = 5
) {
  const PER_PAGE_ITEMS = testItemsPerPage
  const res = await prisma.section.findMany({
    orderBy: { [sortBy ? sortBy : "createdAt"]: sortOrder ? sortOrder : "asc" },
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
}

export async function createSection({
  name,
  description,
  createdById,
  workspaceId,
}: Pick<Section, "name" | "description" | "workspaceId"> & {
  createdById: User["id"]
}) {
  return await prisma.section.create({
    data: {
      name,
      description,
      createdById,
      workspaceId,
    },
  })
}
export async function editSectionById(
  id: string,
  name: string,
  description: string
) {
  return prisma.section.update({
    where: { id },
    data: {
      name: name,
      description: description,
    },
  })
}
export async function deleteSectionById(id: string) {
  return prisma.section.update({
    where: { id },
    data: {
      deleted: true,
      deletedAt: new Date().toString(),
    },
  })
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
  checkOrder: boolean
) {
  let questionId = cuid()
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
    .catch((err) => {
      return err
    })
}
export async function deleteQuestionById(id: string) {
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
  const totalQuestionArray = questionData?.section?.sectionInTest.map(
    (data: { totalQuestions: number }) => {
      return data.totalQuestions
    }
  )
  if (questionData && totalQuestionArray) {
    if (
      questionData.section.questions?.length <= Math.max(...totalQuestionArray)
    ) {
      return deleteQuestionStatus.questionNotDeleted
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
    return deleteQuestionStatus.questionDeleted
  }
}
