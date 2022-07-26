import type { User } from '@prisma/client'
import { env } from 'process'
import { prisma } from '~/db.server'

export async function createIndividualCandidate({ email, createdById }: { email: string, createdById: string }) {
  try {
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
    return user
  } catch (error) {
    console.log(error)
    throw new Error('Candidate Create Error..!')
  }
}

export async function createCandidateTest({ testId, candidateId }: { testId: string, candidateId: string }) {
  try {
    // creating test for candidate
    let candidateTest = prisma.candidateTest.create({
      data: {
        testId,
        candidateId
      }
    })
    return candidateTest
  } catch (error) {
    console.log(error)
    throw new Error('Candidate Test Create Error..!')
  }
}

export async function updateTestLink({ id, link }: { id: string, link: string }) {
  try {
    prisma.candidateTest.update({
      where: {

      },
      data: {
        link
      },
    })
  } catch (error) {
    console.log(error)
    throw new Error('Error updating test link..!')
  }
}

async function createCandidateData({
  email,
  createdById,
  testId
}: { email: string, createdById: User['id'], testId: string }) {

  let user = await createIndividualCandidate({ email, createdById })

  let candidateTest = await createCandidateTest({ testId, candidateId: user.id })

  console.log(user)
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
}

export async function createCandidate({
  emails,
  createdById,
  testId
}: { emails: Array<string>, createdById: User['id'], testId: string }) {

  emails.forEach(async (email) => {
    await createCandidateData({ email, createdById, testId })
  })
}
