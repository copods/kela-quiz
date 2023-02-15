import { env } from "process"

import type { Question, User } from "@prisma/client"

import { sendTestInviteMail } from "./sendgrid.servers"

import { prisma } from "~/db.server"

// inviting candidate
const candidateTestLink = `${env.PUBLIC_URL}/assessment/`
export async function createIndividualCandidate({
  email,
  createdById,
}: {
  email: string
  createdById: string
}) {
  try {
    // checkig if candidate already exists
    let user = await prisma.candidate.findUnique({ where: { email } })

    // if candidate doesnot exist in database, create one
    if (!user) {
      user = await prisma.candidate.create({
        data: {
          email,
          createdById,
        },
      })
    }
    return user
  } catch (error) {
    throw new Error("candidateExamConstants.candidateCreateError")
  }
}

export async function createCandidateTest({
  testId,
  candidateId,
}: {
  testId: string
  candidateId: string
}) {
  try {
    // creating test for candidate
    let candidateTest = await prisma.candidateTest.create({
      data: {
        testId,
        candidateId,
      },
    })
    return candidateTest
  } catch (error) {
    throw new Error("candidateExamConstants.candidateTestCreateError")
  }
}

export async function updateTestLink({
  id,
  link,
}: {
  id: string
  link: string
}) {
  try {
    let candidateTest = await prisma.candidateTest.update({
      where: {
        id,
      },
      data: {
        link,
      },
    })
    return candidateTest
  } catch (error) {
    throw new Error("Error updating test link..!")
  }
}

export async function createSectionInTest({
  sectionId,
  candidateTestId,
  order,
  totalQuestions,
}: {
  sectionId: string
  candidateTestId: string
  order: number
  totalQuestions: number
}) {
  try {
    let sectioInTest = await prisma.sectionInCandidateTest.create({
      data: {
        sectionId,
        candidateTestId,
        order,
      },
    })
    let randomQuestionsOfSections: Array<Question> =
      await prisma.$queryRaw`SELECT * FROM "Question" WHERE "sectionId" = ${sectionId} AND "deleted" = FALSE  ORDER BY RANDOM() LIMIT ${totalQuestions};`
    for (let i = 0; i < randomQuestionsOfSections.length; i++) {
      await prisma.candidateQuestion.create({
        data: {
          questionId: randomQuestionsOfSections[i].id,
          sectionInCandidateTestId: sectioInTest.id,
          order: i + 1,
        },
      })
    }
    return "done"
  } catch (error) {
    throw new Error("Error creating section in test ..")
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
  testId,
}: {
  email: string
  createdById: User["id"]
  testId: string
}) {
  const user = await createIndividualCandidate({ email, createdById })
  const candidateTest = await createCandidateTest({
    testId,
    candidateId: user.id,
  })
  // generating random link
  const candidateLink = `${candidateTestLink}${candidateTest.id}`
  const updatedCandidateTest = await updateTestLink({
    id: candidateTest.id,
    link: candidateLink,
  })
  const test = await getTestById(testId)
  // creating section in test
  if (test?.sections) {
    for (const section of test.sections) {
      await createSectionInTest({
        sectionId: section.sectionId,
        candidateTestId: candidateTest.id,
        order: section.order,
        totalQuestions: section.totalQuestions,
      })
    }
  }
  await sendMailToCandidate(user?.email, updatedCandidateTest?.link as string)
}
// Resend a test link to user
export async function resendTestLink({
  id,
  candidateId,
  testId,
}: {
  id: string
  candidateId: string
  testId: string
}) {
  try {
    const candidateLink = `${candidateTestLink}${testId}`
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    })
    const candidateTest = await prisma.candidateTest.findUnique({
      where: { id: id },
      select: {
        startedAt: true,
        endAt: true,
      },
    })
    if (candidateTest?.startedAt === null && candidateTest?.endAt === null) {
      await prisma.candidateTest.update({
        where: { id: id },
        data: {
          linkSentOn: new Date(),
        },
      })
      await sendMailToCandidate(candidate?.email as string, candidateLink)
      return "created"
    } else {
      return "End Test"
    }
  } catch (error) {
    return "error"
  }
}

export async function createCandidate({
  emails,
  createdById,
  testId,
}: {
  emails: Array<string>
  createdById: User["id"]
  testId: string
}) {
  try {
    const allInvitedUsers = await prisma.candidateTest.findMany({
      select: { candidate: { select: { email: true } }, testId: true },
    })
    const invitedToSpecificTest = allInvitedUsers
      .filter((data) => data.testId == testId)
      .map((data) => data.candidate.email)
    const neverInvitedToTest = emails.filter(
      (data) => !invitedToSpecificTest.includes(data)
    )
    const emailCount = emails.length
    const neverInvitedCount = neverInvitedToTest.length
    if (emails.length > 1) {
      for (const email of neverInvitedToTest) {
        await createCandidateData({
          email,
          createdById,
          testId,
        })
      }
    } else {
      for (const email of emails) {
        await createCandidateData({
          email,
          createdById,
          testId,
        })
      }
    }
    return { created: "created", emailCount, neverInvitedCount }
  } catch (error) {
    return "error"
  }
}

export async function remindCandidate() {
  let dayTime: string | number = Date.now() - 23 * 60 * 60 * 1000
  let time: string | number = Date.now() - 24 * 60 * 60 * 1000
  dayTime = new Date(dayTime).toISOString()
  time = new Date(time).toISOString()
  console.log(dayTime, time)

  const candidates = await prisma.candidateTest.findMany({
    where: {
      AND: [
        {
          startedAt: null,
        },
        {
          createdAt: {
            lte: time,
            gte: dayTime,
          },
        },
      ],
    },
    select: {
      link: true,
      candidate: { select: { email: true } },
    },
  })
  console.log(candidates)
  if (candidates.length) {
    candidates.forEach((candidate) => {
      sendTestInviteMail(candidate.candidate.email, candidate.link as string)
    })
  }
}
