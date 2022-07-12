import type { Candidate, User } from '@prisma/client'
import { prisma } from '~/db.server'

export async function createCandidate({
  emails,
  createdById,
  testId
}: {emails: Array<string> ,createdById: User['id'],testId: string }) {
  // const candidate = await prisma.candidate.create({
  //   data: {
  //     email,
  //     firstName,
  //     lastName,
  //     createdById,
  //   },
  // })
  // console.log(candidate)

  // get test for which user is registered for
//   const test = await prisma.test.findUnique({
//     where: { id: testId },
//     include: { sections: true },
//   })

//   // generating random link
//   const candidateLink = 'mytestlink@gmail.com'

//   // creating candidate Test#CandidateTest
//   const candidateTest = await prisma.candidateTest.create({
//     data: {
//       testId,
//       link: candidateLink,
//       candidateId: candidate.id,
//     },
//   })

//   for (let section in test?.sections) {
//     // creating Section in CandidateTest#SectionInCandidateTest
//     // const sectionInCandidateTest= await prisma.sectionInCandidateTest.create({
//     //   data: {
//     //     sectionId: section?.sectionId,
//     //     candidateTestId: candidateTest.id
//     //     link: candidateLink,
//     //     candidateId: candidate.id,
//     //   }
//     // })
//   }
}
