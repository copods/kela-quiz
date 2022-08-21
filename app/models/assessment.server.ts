import type { CandidateTest, Candidate, Test, Section, SectionInCandidateTest, CandidateQuestion, SectionInTest } from '@prisma/client'
import { prisma } from '~/db.server'


export async function checkIfTestLinkIsValid(id: CandidateTest['id']) {
  try {
    return await prisma.candidateTest.findUnique({
      where: { id },
      select: { candidateStep: true, endAt: true },
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

export async function updateCandidateFirstLastName(
  id: Candidate['id'],
  firstName: Candidate['firstName'],
  lastName: Candidate['lastName']
) {
  try {
    return await prisma.candidate.update({
      where: { id },
      data: { firstName, lastName },
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
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

export async function getTestInstructionForCandidate(
  id: CandidateTest['id']
) {
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
                    name: true
                  }
                }
              }
            }
          }
        }
      }
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
        id: true
      }
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getCandidate(
  id: CandidateTest['id'],
) {
  try {
    return await prisma.candidate.findFirst({
      where: {
        tests: {
          some: {
            id
          }
        }
      },
      select: {
        firstName: true,
        lastName: true,
        email: true
      }
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getCandidateTest(
  id: CandidateTest['id'],
) {
  try {
    return await prisma.candidateTest.findUnique({
      where: { id },
      select: {
        sections: {
          select: {
            id: true,
            section: {
              select: {
                id: true,
                name: true,
              }
            },
            questions: {
              select: {
                id: true,
                status: true,
                order: true
              },
              orderBy: {
                order: 'asc'
              }
            },
            timeInCandidateQuestion: true,
            startedAt: true,
            endAt: true
          },
          orderBy: {
            order: 'asc'
          }
        },
        testId: true,
        test: {
          select: {
            name: true,
            description: true,
            sections: {
              select: {
                timeInSeconds: true
              }
            }
          }
        },
        startedAt: true,
        endAt: true
      }
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
      select: { candidateStep: true }
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getTestSectionDetails(id: CandidateTest['id']) {
  try {
    return await prisma.sectionInTest.findUnique({
      where: {
        id
      },
      select: {
        order: true,
        section: true,
        sectionId: true,
        timeInSeconds: true,
        totalQuestions: true,
      }
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function getCandidateSectionDetails(sectionId: Section['id'], candidateTestId: SectionInCandidateTest['candidateTestId']) {
  try {
    return await prisma.sectionInCandidateTest.findFirst({
      where: {
        sectionId, candidateTestId
      },
      select: {
        id: true,
        startedAt: true,
        order: true,
        section: {
          select: {
            id: true,
            name: true
          }
        },
        endAt: true,
        sectionId: true
      }
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}

export async function candidateSectionStart(id: SectionInCandidateTest['id']) {
  try {
    const section = await prisma.sectionInCandidateTest.findUnique({ where: { id } })

    const select = {
      id: true,
      startedAt: true,
      endAt: true,
      sectionId: true,
      questions: {
        where: {
          order: 1
        },
        select: {
          id: true,
          selectedOptions: true,
          answers: true,
          answeredAt: true,
        }
      }
    }

    if (section?.startedAt) {
      return await prisma.sectionInCandidateTest.findUnique({
        where: {
          id
        },
        select: select
      })
    } else {
      return await prisma.sectionInCandidateTest.update({
        where: {
          id
        },
        data: {
          startedAt: new Date()
        },
        select: select
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
        id
      },
      select: {
        status: true
      }
    })
    return prisma.candidateQuestion.update({
      where: { id },
      data: {
        status: question?.status == 'NOT_VIEWED' ? 'VIEWED' : question?.status
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
                option: true
              }
            },
            correctAnswer: {
              select: {
                id: true
              }
            },
            questionType: true
          }
        },
        status: true,
        selectedOptions: true,
        answers: true,
        answeredAt: true
      }
    })
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}
export async function skipAnswerAndNextQuestion({ selectedOptions, sectionId, currentQuestionId, nextOrPrev, answers }: { selectedOptions: Array<string>, sectionId: SectionInTest['id'], currentQuestionId: CandidateQuestion['id'], nextOrPrev: string, answers: Array<string> }) {
  try {
    const question = await prisma.candidateQuestion.findUnique({
      where: {
        id: currentQuestionId
      },
      select: {
        selectedOptions: {
          select: {
            id: true
          }
        }
      }
    })

    //filtering current answers from old answers
    let oldAnswers: Array<string> = []
    question?.selectedOptions?.forEach((option: { id: string }) => {
      if (!selectedOptions.includes(option.id)) {
        oldAnswers.push(option.id)
      }
    })

    const currentQuestion = await prisma.candidateQuestion.update({
      where: {
        id: currentQuestionId
      },
      data: {
        selectedOptions: {
          connect: selectedOptions?.map(option => ({ id: option })),
          disconnect: oldAnswers?.map(option => ({ id: option }))
        },
        answers,
        status: selectedOptions?.length || answers?.length ? 'ANSWERED' : 'SKIPPED',
        answeredAt: new Date()
      },
      select: {
        sectionInCandidateTestId: true,
        order: true,
        id: true
      }
    })

    //getting section to check last question
    const section = await prisma.sectionInTest.findFirst({
      where: {
        id: sectionId
      },
      select: {
        totalQuestions: true
      }
    })

    // checking first question
    if (currentQuestion?.order == 1 && nextOrPrev == 'prev') {
      return currentQuestionId
    }
    // checking last question
    if (currentQuestion?.order == section?.totalQuestions && nextOrPrev == 'next') {
      return currentQuestionId
    }

    // getting nextQuestionId
    const netxQuestion = await prisma.candidateQuestion.findFirst({
      where: {
        sectionInCandidateTestId: (currentQuestion?.sectionInCandidateTestId || ''),
        order: (currentQuestion?.order || 0) + (nextOrPrev == 'next' ? 1 : -1)
      },
      select: {
        id: true,
        order: true
      }
    })
    return netxQuestion?.id
  } catch (error) {
    throw new Error('Something went wrong..!')
  }
}










export async function endCurrentSection(candidateTestId: SectionInCandidateTest['candidateTestId'], id: SectionInTest['id']) {
  const testSection = await prisma.sectionInTest.findUnique({ where: { id } })

  const section = await prisma.sectionInCandidateTest.findFirst({
    where: { candidateTestId, sectionId: testSection?.sectionId },
    select: {
      id: true, startedAt: true, endAt: true
    }
  })

  if (section?.endAt) {
    return { msg: "Section already ended" }
  }

  return await prisma.sectionInCandidateTest.updateMany({
    where: { candidateTestId, sectionId: testSection?.sectionId },
    data: { endAt: new Date() }
  })

}

export async function endAssessment(id: string) {
  const candidateTest = await prisma.candidateTest.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      startedAt: true,
      endAt: true
    }
  })
  if (candidateTest?.endAt) {
    return { msg: "Exam already ended" }
  }
  return await prisma.candidateTest.update({
    where: {
      id
    },
    data: {
      endAt: new Date()
    }
  })
}