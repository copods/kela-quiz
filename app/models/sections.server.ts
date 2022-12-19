import type { User, Section,Question } from '@prisma/client'
import cuid from 'cuid'
import { prisma } from '~/db.server'

export async function getSectionById({ id }: Pick<Section, 'id'>) {
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

export async function getFirstSection(workspaceId: string) {
  const firstSection = await prisma.section.findFirst({
    where: {
      workspaceId,
      deleted: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return firstSection?.id
}

export async function getAllSections(filterData: string, workspaceId: string) {
  let filter = filterData ? filterData : '{"orderBy":{"createdAt":"desc"}}'
 const res =  await prisma.section.findMany({
    ...JSON.parse(filter),
    where: {
      deleted: false,
      workspaceId,
    },
    include: {
      createdBy: true,  
      questions:true
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
        section?.questions?.forEach((questions: Question) => {
          if (questions?.deleted == false) {
            count = count + 1
          }
        })
        section['count'] = count
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
}: Pick<Section, 'name' | 'description' | 'workspaceId'> & {
  createdById: User['id']
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
  return prisma.question.update({
    where: {
      id,
    },
    data: {
      deleted: true,
      deletedAt: new Date().toString(),
    },
  })
}
