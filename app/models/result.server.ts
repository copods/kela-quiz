import { prisma } from '~/db.server'
import type { CandidateTest } from '~/interface/Interface'

export async function getAllCandidateTests(obj: any) {
  var filter = obj ? obj : {}
  let count = 0
  var res = await prisma.test.findMany({
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
    res.map((test: any) => {
      console.log('test:', test)
      test?.candidateTest?.map((candidateTest: CandidateTest) => {
        if (candidateTest?.endAt !== null) {
          count = count + 1
        }
      })
      test.count = count
      return count
    })
  }

  return res
}
