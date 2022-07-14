import type { Candidate, User } from '@prisma/client'
import { raw } from '@prisma/client/runtime'
import { env } from 'process'
import { prisma } from '~/db.server'

async function createCandidateData({
  email,
  createdById,
  testId
}: { email: string, createdById: User['id'], testId: string }) {

  // checkig if candidate already exists
  let user = await prisma.candidate.findUnique({ where: { email } })

  // if candidate doesnot exist in database, create one
  if (!user) {
    user = await prisma.candidate.create({
      data: {
        email,
        createdById
      },
    })
  }
  console.log("user", user)

  // creating test for candidate
  prisma.candidateTest.create({
    data: {
      testId,
      candidateId: user.id,
    }
  }).then(candidateTest => {
    console.log(candidateTest)

    // generating random link
    const candidateLink = env.PUBLIC_URL + '/assesment/' + candidateTest.id

    // storing link to db
    prisma.candidateTest.update({
      where: {
        id: candidateTest.id
      },
      data: {
        link: candidateLink,
      },
    }).then(() => {

      // get test for which user should be registered for
      prisma.test.findUnique({
        where: { id: testId },
        include: { sections: true },
      }).then(test => {
        console.log("test: ", test)
        // creating section in test
        if (test?.sections) {
          for (let section of test.sections) {
            prisma.sectionInCandidateTest.create({
              data: {
                sectionId: section.sectionId,
                candidateTestId: candidateTest.id,
              }
            }).then(sectionInCandidateTest => {
              console.log('section in candidatetest: ', sectionInCandidateTest)

              prisma.$queryRaw`SELECT * FROM "Question" WHERE "sectionId" = ${section.sectionId} ORDER BY RANDOM() LIMIT ${section.totalQuestions};`.then((randomQuestions: any) => {
                console.log("randomQu:", randomQuestions)
                for (let question of randomQuestions) {
                  prisma.candidateQuestion.create({
                    data: {
                      questionId: question.id,
                      sectionInCandidateTestId: sectionInCandidateTest.id
                    }
                  }).then(question => {

                  }).catch(err => {

                  })
                }
              }).catch(err => {
                return { err }
              })
            }).catch(err => {
              return { err }
            })
          }
        }

      }).catch(err => {
        return { err }
      })

    }).catch(err => {
      return { err }
    })

  }).catch(err => {
    return { err }
  })
}

export async function createCandidate({
  emails,
  createdById,
  testId
}: { emails: Array<string>, createdById: User['id'], testId: string }) {

  console.log(emails, createdById, testId)
  emails.forEach(email => {
    createCandidateData({ email, createdById, testId })
  })




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
