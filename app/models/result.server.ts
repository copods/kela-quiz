import { prisma } from '~/db.server'
export async function getAllCandidateTests(obj: any) {
  var filter = obj ? obj : {}
  return prisma.test.findMany({
    ...filter,
    include: { candidateTest: true },
  })
}
