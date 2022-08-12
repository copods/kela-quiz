import { prisma } from '~/db.server'
export async function getAllCandidateTests(obj: any) {
  var filter = obj ? obj : {}
  const res = await prisma.test.findMany({
    ...filter,
    include: {
      _count: {
        select: {
          candidateResult: true,
          candidateTest: true,
          sections: true,
        },
      },
      candidateTest: true,
    },
  })
  console.log(res)
  return res
}
