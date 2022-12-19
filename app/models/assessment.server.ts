import type {
  CandidateTest,
  Candidate,
  Test,
  Section,
  SectionInCandidateTest,
  CandidateQuestion,
  SectionInTest,
} from '@prisma/client'

import { prisma } from '~/db.server'
import { sendMailToRecruiter, sendOTPMail } from './sendgrid.servers'

export async function checkIfTestLinkIsValid(id: CandidateTest['id']) {
  try {
    return await prisma.candidateTest.findUnique({
      where: { id },
      select: { candidateStep: true, endAt: true, linkSentOn: true },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getCandidateIDFromAssessmentID(id: CandidateTest['id']) {
  try {
    return await prisma.candidateTest.findFirst({
      where: { id },
      select: { candidateId: true },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

async function generateOTP() {
  // generate random 4 digit OTP
  var digits = '1234567896'
  let OTP = ''
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }
  return parseInt(OTP)
}

async function sendOTPToUser({ id, OTP }: { id: string; OTP: number }) {
  const user = await prisma.candidate.findUnique({
    where: { id },
    select: { email: true },
  })
  return await sendOTPMail(user?.email as string, OTP)
}

export async function updateCandidateFirstLastName(
  id: Candidate['id'],
  firstName: Candidate['firstName'],
  lastName: Candidate['lastName']
) {
  try {
    const OTP = await generateOTP()

    const data = await prisma.candidate.update({
      where: { id },
      data: { firstName, lastName, OTP },
    })
    await sendOTPToUser({ id, OTP })
    return data
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}
export async function resendOtp({ assessmentId }: { assessmentId: string }) {
  const user = await prisma.candidateTest.findUnique({
    where: { id: assessmentId },
    select: { candidate: { select: { OTP: true, email: true, id: true } } },
  })
  const OTPValue = await generateOTP()
  if (user) {
    await prisma.candidate.update({
      where: { id: user?.candidate?.id },
      data: {
        OTP: OTPValue,
      },
    })
    return await sendOTPMail(user?.candidate?.email as string, OTPValue)
  } else return null
}

export async function verifyOTP({
  assessmentId,
  otp,
}: {
  assessmentId: string
  otp: number
}) {
  const candidateAssessmentOtp = await prisma.candidateTest.findUnique({
    where: { id: assessmentId },
    select: {
      candidate: { select: { OTP: true, id: true } },
    },
  })
  return candidateAssessmentOtp?.candidate?.OTP === otp
}

export async function updateNextCandidateStep(
  id: CandidateTest['id'],
  newCandidateStep: CandidateTest['candidateStep']
) {
  try {
    return await prisma.candidateTest.update({
      where: { id },
      data: { candidateStep: Object.assign({}, newCandidateStep) },
      select: { id: true },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}
export async function getCandidateEmail(id: string) {
  return prisma.candidateTest.findUnique({
    where: { id },
    select: {
      candidate: {
        select: {
          email: true,
        },
      },
    },
  })
}
export async function getTestInstructionForCandidate(id: CandidateTest['id']) {
  try {
    return await prisma.candidateTest.findUnique({
      where: { id },
      select: {
        candidateId: true,
        test: {
          select: {
            id: true,
            description: true,
            sections: {
              select: {
                id: true,
                order: true,
                totalQuestions: true,
                timeInSeconds: true,
                section: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getOrderedSection(testId: Test['id'], order: number) {
  try {
    return await prisma.sectionInTest.findFirst({
      where: { testId, order },
      select: {
        id: true,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getCandidate(id: CandidateTest['id']) {
  try {
    return await prisma.candidate.findFirst({
      where: {
        tests: {
          some: {
            id,
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getCandidateTest(id: CandidateTest['id']) {
  try {
    return await prisma.candidateTest.findUnique({
      where: { id },
      select: {
        sections: {
          select: {
            id: true,
            order: true,
            section: {
              select: {
                id: true,
                name: true,
              },
            },
            questions: {
              select: {
                id: true,
                status: true,
                order: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
            timeInCandidateQuestion: true,
            startedAt: true,
            endAt: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        testId: true,
        test: {
          select: {
            name: true,
            description: true,
            sections: {
              select: {
                timeInSeconds: true,
              },
            },
          },
        },
        startedAt: true,
        endAt: true,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}
export async function candidateTestStart(id: CandidateTest['id']) {
  try {
    return await prisma.candidateTest.update({
      where: { id },
      data: { startedAt: new Date() },
      select: { candidateStep: true },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getTestSectionDetails(id: CandidateTest['id']) {
  try {
    return await prisma.sectionInTest.findUnique({
      where: {
        id,
      },
      select: {
        order: true,
        section: true,
        sectionId: true,
        timeInSeconds: true,
        totalQuestions: true,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getCandidateSectionDetails(
  sectionId: Section['id'],
  candidateTestId: SectionInCandidateTest['candidateTestId']
) {
  try {
    return await prisma.sectionInCandidateTest.findFirst({
      where: {
        sectionId,
        candidateTestId,
      },
      select: {
        id: true,
        startedAt: true,
        order: true,
        section: {
          select: {
            id: true,
            name: true,
          },
        },
        endAt: true,
        sectionId: true,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function candidateSectionStart(id: SectionInCandidateTest['id']) {
  try {
    const section = await prisma.sectionInCandidateTest.findUnique({
      where: { id },
    })

    const select = {
      id: true,
      startedAt: true,
      endAt: true,
      sectionId: true,
      questions: {
        where: {
          order: 1,
        },
        select: {
          id: true,
          selectedOptions: true,
          answers: true,
          answeredAt: true,
        },
      },
    }

    if (section?.startedAt) {
      return await prisma.sectionInCandidateTest.findUnique({
        where: {
          id,
        },
        select: select,
      })
    } else {
      return await prisma.sectionInCandidateTest.update({
        where: {
          id,
        },
        data: {
          startedAt: new Date(),
        },
        select: select,
      })
    }
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function startAndGetQuestion(id: CandidateQuestion['id']) {
  try {
    const question = await prisma.candidateQuestion.findUnique({
      where: {
        id,
      },
      select: {
        status: true,
      },
    })
    return prisma.candidateQuestion.update({
      where: { id },
      data: {
        status: question?.status == 'NOT_VIEWED' ? 'VIEWED' : question?.status,
      },
      select: {
        id: true,
        order: true,
        question: {
          select: {
            id: true,
            question: true,
            options: {
              select: {
                id: true,
                option: true,
              },
            },
            correctAnswer: {
              select: {
                id: true,
              },
            },
            questionType: true,
          },
        },
        status: true,
        selectedOptions: true,
        answers: true,
        answeredAt: true,
      },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}
export async function skipAnswerAndNextQuestion({
  selectedOptions,
  sectionId,
  currentQuestionId,
  nextOrPrev,
  answers,
}: {
  selectedOptions: Array<string>
  sectionId: SectionInTest['id']
  currentQuestionId: CandidateQuestion['id']
  nextOrPrev: string
  answers: Array<string>
}) {
  try {
    const question = await prisma.candidateQuestion.findUnique({
      where: {
        id: currentQuestionId,
      },
      select: {
        status: true,
        selectedOptions: {
          select: {
            id: true,
          },
        },
      },
    })

    //filtering current answers from old answers
    let oldAnswers: Array<string> = []
    question?.selectedOptions?.forEach((option: { id: string }) => {
      if (!selectedOptions.includes(option.id)) {
        oldAnswers.push(option.id)
      }
    })

    // create data according to action taken i.e. next, prev or skip
    let updateData = null
    if (nextOrPrev == 'skip') {
      updateData = null
    } else {
      updateData = {
        selectedOptions: {
          connect: selectedOptions?.map((option) => ({ id: option })),
          disconnect: oldAnswers?.map((option) => ({ id: option })),
        },
        answers,
      }
    }

    const currentQuestion = await prisma.candidateQuestion.update({
      where: {
        id: currentQuestionId,
      },
      data: {
        ...updateData,
        status:
          selectedOptions?.length || answers?.length
            ? 'ANSWERED'
            : question?.status === 'ANSWERED'
            ? 'ANSWERED'
            : 'SKIPPED',
        answeredAt: new Date(),
      },
      select: {
        sectionInCandidateTestId: true,
        order: true,
        id: true,
      },
    })

    //getting section to check last question
    const section = await prisma.sectionInTest.findFirst({
      where: {
        id: sectionId,
      },
      select: {
        totalQuestions: true,
      },
    })

    // checking first question
    if (currentQuestion?.order == 1 && nextOrPrev == 'prev') {
      return currentQuestionId
    }
    // checking last question
    if (
      currentQuestion?.order == section?.totalQuestions &&
      nextOrPrev == 'next'
    ) {
      return currentQuestionId
    }

    // getting nextQuestionId
    const netxQuestion = await prisma.candidateQuestion.findFirst({
      where: {
        sectionInCandidateTestId:
          currentQuestion?.sectionInCandidateTestId || '',
        order:
          (currentQuestion?.order || 0) +
          (nextOrPrev == 'next' || nextOrPrev == 'skip' ? 1 : -1),
      },
      select: {
        id: true,
        order: true,
      },
    })
    return netxQuestion?.id
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function endCurrentSection(
  candidateTestId: SectionInCandidateTest['candidateTestId'],
  id: SectionInTest['id']
) {
  const testSection = await prisma.sectionInTest.findUnique({ where: { id } })
  const section = await prisma.sectionInCandidateTest.findFirst({
    where: { candidateTestId, sectionId: testSection?.sectionId },
    select: {
      id: true,
      startedAt: true,
      endAt: true,
      candidateTest: {
        select: {
          endAt: true,
        },
      },
    },
  })

  if (section?.endAt) {
    return { msg: 'Section already ended' }
  }
  const sectionId = section?.id
  calculateResultByIdSection(sectionId)

  return await prisma.sectionInCandidateTest.updateMany({
    where: { candidateTestId, sectionId: testSection?.sectionId },
    data: { endAt: new Date() },
  })
}

export async function endAssessment(id: string) {
  const candidateTest = await prisma.candidateTest.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      startedAt: true,
      endAt: true,
      test: {
        select: {
          name: true,
        },
      },
      candidate: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          createdBy: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  })

  const recruiterEmail = candidateTest?.candidate.createdBy.email
  const testName = candidateTest?.test.name
  const candidateName = `${candidateTest?.candidate.firstName} ${candidateTest?.candidate.lastName} `
  if (candidateTest?.endAt) {
    return { msg: 'Exam already ended' }
  }
  calculateResult(id)
  let endExam = await prisma.candidateTest.update({
    where: {
      id,
    },
    data: {
      endAt: new Date(),
    },
  })
  if (candidateTest)
    await sendMailToRecruiter(recruiterEmail, testName, candidateName)
  return endExam
}
async function calculateResultByIdSection(sectionid?: string) {
  let totalQuestionInTest = 0
  let unansweredInTest = 0
  let correctInTest = 0
  let skippedInTest = 0
  let incorrectInTest = 0
  const section = await prisma.sectionInCandidateTest.findUnique({
    where: {
      id: sectionid,
    },
    select: {
      id: true,
      endAt: true,
      candidateTest: {
        select: { testId: true, id: true, candidateId: true },
      },
      questions: {
        select: {
          id: true,
          questionId: true,
          status: true,
          answers: true,
          selectedOptions: true,
          question: {
            select: {
              correctAnswer: true,
              correctOptions: true,
              questionType: true,
            },
          },
        },
      },
    },
  })
  if (section) {
    const totalQuestion = section?.questions?.length
      ? section?.questions?.length
      : 0
    let unanswered = 0
    let correct = 0
    let incorrect = 0
    let skipped = 0
    for (let question of section?.questions || []) {
      // counting unanswered questions
      if (
        question?.answers.length == 0 &&
        question?.selectedOptions?.length == 0 &&
        question.status != 'SKIPPED'
      ) {
        unanswered += 1
        continue
      }

      if (question.status == 'SKIPPED') {
        skipped += 1
        continue
      }

      if (question?.question?.questionType?.value == 'TEXT') {
        const correctAnswers = question?.question?.correctAnswer
          ?.flatMap((opt) => opt?.answer.toLowerCase())
          .sort()
        const userAnswers = question?.answers
          ?.flatMap((opt) => opt.toLowerCase())
          .sort()
        if (correctAnswers?.length == userAnswers?.length) {
          let correctFlag = true
          for (let i = 0; i < correctAnswers?.length; i++) {
            if (correctAnswers[i].localeCompare(userAnswers[i]) != 0) {
              correctFlag = false
              break
            }
          }
          if (correctFlag) {
            correct += 1
          } else {
            incorrect += 1
          }
        }
      } else if (question?.question?.questionType?.value == 'SINGLE_CHOICE') {
        if (
          question?.selectedOptions[0].id ===
          question?.question?.correctOptions[0].id
        ) {
          correct += 1
        } else {
          incorrect += 1
        }
      } else if (question?.question?.questionType?.value == 'MULTIPLE_CHOICE') {
        const correctOptionsId = question?.question?.correctOptions
          ?.flatMap((opt) => opt?.id)
          .sort()
        const userAnswers = question.selectedOptions
          ?.flatMap((opt) => opt.id)
          .sort()
        let correctFlag = false
        if (correctOptionsId?.length == userAnswers?.length) {
          correctFlag = true
          for (let i = 0; i < correctOptionsId?.length; i++) {
            if (correctOptionsId[i].localeCompare(userAnswers[i]) != 0) {
              correctFlag = false
              break
            }
          }
        }
        if (correctFlag) {
          correct += 1
        } else {
          incorrect += 1
        }
      }
    }

    totalQuestionInTest += totalQuestion
    unansweredInTest += unanswered
    correctInTest += correct
    skippedInTest += skipped
    incorrectInTest += incorrect
    await prisma.sectionWiseResult.create({
      data: {
        sectionInCandidateTestId: section?.id,
        totalQuestion,
        correctQuestion: correct,
        unanswered,
        skipped,
        incorrect,
        testId: section?.candidateTest.testId,
        candidateTestId: section?.candidateTest.id,
      },
    })

    await prisma.candidateResult.create({
      data: {
        candidateId: section?.candidateTest.candidateId,
        candidateTestId: section?.candidateTest.id,
        totalQuestion: totalQuestionInTest,
        correctQuestion: correctInTest,
        unanswered: unansweredInTest,
        skipped: skippedInTest,
        incorrect: incorrectInTest,
        testId: section?.candidateTest.testId,
        isQualified: false,
      },
    })
  }
}

async function calculateResult(id: CandidateTest['id']) {
  const candidateTest = await prisma.candidateTest.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      testId: true,
      sections: true,
      candidateId: true,
    },
  })
  let totalQuestionInTest = 0
  let unansweredInTest = 0
  let correctInTest = 0
  let skippedInTest = 0
  let incorrectInTest = 0

  if (candidateTest) {
    for (let sec of candidateTest?.sections || []) {
      const section = await prisma.sectionInCandidateTest.findUnique({
        where: {
          id: sec.id,
        },
        select: {
          id: true,
          questions: {
            select: {
              id: true,
              questionId: true,
              status: true,
              answers: true,
              selectedOptions: true,
              question: {
                select: {
                  correctAnswer: true,
                  correctOptions: true,
                  questionType: true,
                },
              },
            },
          },
        },
      })
      if (section) {
        const totalQuestion = section?.questions?.length
          ? section?.questions?.length
          : 0
        let unanswered = 0
        let correct = 0
        let incorrect = 0
        let skipped = 0
        for (let question of section?.questions || []) {
          // counting unanswered questions
          if (
            question?.answers.length == 0 &&
            question?.selectedOptions?.length == 0 &&
            question.status != 'SKIPPED'
          ) {
            unanswered += 1
            continue
          }

          if (question.status == 'SKIPPED') {
            skipped += 1
            continue
          }

          if (question?.question?.questionType?.value == 'TEXT') {
            const correctAnswers = question?.question?.correctAnswer
              ?.flatMap((opt) => opt?.answer.toLowerCase())
              .sort()
            const userAnswers = question?.answers
              ?.flatMap((opt) => opt.toLowerCase())
              .sort()
            if (correctAnswers?.length == userAnswers?.length) {
              let correctFlag = true
              for (let i = 0; i < correctAnswers?.length; i++) {
                if (correctAnswers[i].localeCompare(userAnswers[i]) != 0) {
                  correctFlag = false
                  break
                }
              }
              if (correctFlag) {
                correct += 1
              } else {
                incorrect += 1
              }
            }
          } else if (
            question?.question?.questionType?.value == 'SINGLE_CHOICE'
          ) {
            if (
              question?.selectedOptions[0].id ===
              question?.question?.correctOptions[0].id
            ) {
              correct += 1
            } else {
              incorrect += 1
            }
          } else if (
            question?.question?.questionType?.value == 'MULTIPLE_CHOICE'
          ) {
            const correctOptionsId = question?.question?.correctOptions
              ?.flatMap((opt) => opt?.id)
              .sort()
            const userAnswers = question.selectedOptions
              ?.flatMap((opt) => opt.id)
              .sort()
            let correctFlag = false
            if (correctOptionsId?.length == userAnswers?.length) {
              correctFlag = true
              for (let i = 0; i < correctOptionsId?.length; i++) {
                if (correctOptionsId[i].localeCompare(userAnswers[i]) != 0) {
                  correctFlag = false
                  break
                }
              }
            }
            if (correctFlag) {
              correct += 1
            } else {
              incorrect += 1
            }
          }
        }

        totalQuestionInTest += totalQuestion
        unansweredInTest += unanswered
        correctInTest += correct
        skippedInTest += skipped
        incorrectInTest += incorrect
      }
    }
    await prisma.candidateResult.updateMany({
      where: {
        candidateId: candidateTest.candidateId,
        testId: candidateTest.testId,
      },
      data: {
        candidateId: candidateTest?.candidateId,
        candidateTestId: id,
        totalQuestion: totalQuestionInTest,
        correctQuestion: correctInTest,
        unanswered: unansweredInTest,
        skipped: skippedInTest,
        incorrect: incorrectInTest,
        testId: candidateTest?.testId,
        isQualified: false,
      },
    })
  }
}
