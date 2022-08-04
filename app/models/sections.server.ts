import type { User, Section } from '@prisma/client'
import cuid from 'cuid'
import { prisma } from '~/db.server'

export async function getSectionById({ id }: Pick<Section, 'id'>) {
  return prisma.section.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        include: {
          correctOptions: true,
          options: true,
          correctAnswer: true,
        },
      },
    },
  })
}

export async function getAllSections(obj: string) {
  var filter = obj ? obj : '{"orderBy":{"createdAt":"asc"}}'
  return await prisma.section.findMany({
    ...JSON.parse(filter),
    include: {
      createdBy: true,
      _count: {
        select: { questions: true },
      },
    },
  })
}

export async function createSection({
  name,
  description,
  createdById,
}: Pick<Section, 'name' | 'description'> & { createdById: User['id'] }) {
  return await prisma.section.create({
    data: {
      name,
      description,
      createdById,
    },
  })
}

export async function deleteSectionById(id: string) {
  return prisma.section.delete({ where: { id } })
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
      console.log(err)
      return err
    })
}
