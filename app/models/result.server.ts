import type { CandidateTest } from '@prisma/client'
import { prisma } from '~/db.server'
export async function getAllCandidateTests(obj: any) {
  var filter = obj ? obj : {}
  return prisma.test.findMany({
    ...filter,
    include: { candidateTest: true },
  })
}
export async function getCandidateEmailById({ id }: Pick<CandidateTest, 'id'>) {
  return prisma.test.findUnique({
    where: { id },
    include: {
      candidateTest: {
        include: {
          candidate: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  })
}
