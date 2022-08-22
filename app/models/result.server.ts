import type { CandidateTest } from '@prisma/client'
import { prisma } from '~/db.server'
import type { Test } from '@prisma/client'

export async function getCandidateEmailById({ id }: Pick<CandidateTest, 'id'>) {
  return prisma.test.findUnique({
    where: { id },
    include: {
      candidateTest: {
        include: {
          candidate: {
            select: {
              email: true,
              createdBy: true,
            },
          },
        },
      },
    },
  })
}

export async function getAllCandidateTests(obj: object) {
  const filter = obj ? obj : {}
  const res: Array<Test> = await prisma.test.findMany({
    ...filter,

    include: {
      _count: {
        select: {
          candidateResult: true,
          candidateTest: true,
          // sections: true,
        },
      },
      candidateTest: {
        select: {
          id: true,
          endAt: true,
        },
      },
    },
  })
  if (res) {
    res.forEach(
      (
        test: Test & { count?: number; candidateTest?: Array<CandidateTest> }
      ) => {
        let count = 0
        test?.candidateTest?.forEach((candidateTest: CandidateTest) => {
          if (candidateTest?.endAt !== null) {
            count = count + 1
          }
        })
        test['count'] = count
      }
    )
  }

  return res
}
