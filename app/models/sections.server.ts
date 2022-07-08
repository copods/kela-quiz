import type { User, Section } from '@prisma/client'
import cuid from 'cuid'
import { prisma } from '~/db.server'

export async function getSectionById({ id }: Pick<Section, 'id'>) {
  return prisma.section.findUnique({
    where: {
      id,
    },
    include: {
      questions: true
    },
  })
}

export async function getAllSections() {
  return await prisma.section.findMany({
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
  return prisma.questionType.findMany();
}

// export async function addQuestion(question: string, options: Array<{ id: string, option: string, order: number }>, correctOptions: Array<{ id: string, option: string, order: number }>, correctAnswer: Array<string>, questionTypeId: string, sectionId: string, createdById: string) {  
//   let questionId = cuid()
//   console.log(questionId)
//   await prisma.question.create({
//     data: {
//       // id: (() => {
//       //   console.log(questionId)
//       //   return questionId
//       // })(),
//       id: questionId,
//       question,
//       sectionId,
//       createdById,
//       questionTypeId,
//       options: {
//         createMany: {
//           data: [
//             {
//               data: options.map(option => ({ ...option, createdById }))
              
//             }
//           ]
//         }
//       },
//       correctOptions: {
//         createMany: {
//           data: correctOptions.map(option => ({ ...option, createdById, coInQuestionId: questionId }))
//         }
//       }
//     }
//   })
//   return true
// }