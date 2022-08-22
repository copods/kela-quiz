import type { Question, User } from '@prisma/client'
import { env } from 'process'
import { prisma } from '~/db.server'
import { sendTestInviteMail } from './sendgrid.servers'

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
    let candidateTest = await prisma.candidateTest.create({
      data: {
        testId,
        candidateId
      }
    })
    return candidateTest
  } catch (error) {
    throw new Error('Candidate Test Create Error..!')
  }
}

export async function updateTestLink({ id, link }: { id: string, link: string }) {
  try {
    let candidateTest = await prisma.candidateTest.update({
      where: {
        id
      },
      data: {
        link
      },
    })
    return candidateTest
  } catch (error) {
    throw new Error('Error updating test link..!')
  }
}

export async function createSectionInTest({ sectionId, candidateTestId, totalQuestions }: { sectionId: string, candidateTestId: string, totalQuestions: number }) {
  try {
    let sectioInTest = await prisma.sectionInCandidateTest.create({
      data: {
        sectionId,
        candidateTestId,
      }
    })
    let randomQuestionsOfSections: Array<Question> = await prisma.$queryRaw`SELECT * FROM "Question" WHERE "sectionId" = ${sectionId} ORDER BY RANDOM() LIMIT ${totalQuestions};`

    for (let i = 0; i < randomQuestionsOfSections.length; i++) {
      await prisma.candidateQuestion.create({
        data: {
          questionId: randomQuestionsOfSections[i].id,
          sectionInCandidateTestId: sectioInTest.id,
          order: i + 1
        }
      })
    }
    return 'done'
  } catch (error) {
    throw new Error('Error creating section in test ..!')
  }
}

export async function getTestById(id: string) {
  return await prisma.test.findUnique({
    where: { id },
    include: { sections: true },
  })
}

export async function sendMailToCandidate(email: string, link: string) {
  sendTestInviteMail(email, link)
}

async function createCandidateData({
  email,
  createdById,
  testId
}: { email: string, createdById: User['id'], testId: string }) {

  let user = await createIndividualCandidate({ email, createdById })

  let candidateTest = await createCandidateTest({ testId, candidateId: user.id })

  // generating random link
  const candidateLink = env.PUBLIC_URL + '/assessment/' + candidateTest.id

  let updatedCandidateTest = await updateTestLink({ id: candidateTest.id, link: candidateLink })

  let test = await getTestById(testId)

  // creating section in test
  if (test?.sections) {
    for (const section of test.sections) {
      await createSectionInTest({ sectionId: section.sectionId, candidateTestId: candidateTest.id, totalQuestions: section.totalQuestions })
    }
  }

  await sendMailToCandidate(user?.email, updatedCandidateTest?.link as string)

}

export async function createCandidate({
  emails,
  createdById,
  testId
}: { emails: Array<string>, createdById: User['id'], testId: string }) {

  for (const email of emails) {
    await createCandidateData({ email, createdById, testId })
  }
  return "created"
}
