import type { Test } from '@prisma/client'
import { prisma } from '~/db.server'
import type { CandidateTest } from '~/interface/Interface'

export async function getAllCandidateTests(obj: string) {
  const filter = obj ? obj : {}
  let count = 0
  const res: Array<Test> = await prisma.test.findMany({
    ...filter,

    include: {
      _count: {
        select: {
          candidateResult: true,
          candidateTest: true,
          sections: true,
        },
      },
      candidateTest: {
        select: {
          id: true,
          endAt: true,
          testId: true,
        },
      },
      candidateResult: {
        select: {
          id: true,
        },
      },
    },
  })
  if (res) {
    res.forEach(
      (
        test: Test & { count?: number; candidateTest?: Array<CandidateTest> }
      ) => {
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
