import { prisma } from '~/db.server'
import type { CandidateTest, Candidate, Test, Section, SectionInCandidateTest, CandidateQuestion, SectionInTest } from '@prisma/client'

export async function checkIfTestLinkIsValid(id: CandidateTest['id']) {
  return await prisma.candidateTest.findUnique({
    where: { id },
    select: { candidateStep: true },
  })
}

export async function getCandidateIDFromAssessmentID(id: CandidateTest['id']) {
  return await prisma.candidateTest.findFirst({
    where: { id },
    select: { candidateId: true },
  })
}

export async function updateCandidateFirstLastName(
  id: Candidate['id'],
  firstName: Candidate['firstName'],
  lastName: Candidate['lastName']
) {
  return await prisma.candidate.update({
    where: { id },
    data: { firstName, lastName },
  })
}

export async function updateNextCandidateStep(
  id: CandidateTest['id'],
  newCandidateStep: CandidateTest['candidateStep']
) {
  return await prisma.candidateTest.update({
    where: { id },
    data: { candidateStep: Object.assign({}, newCandidateStep) },
    select: { id: true },
  })
}

export async function getCandidateTestForSideNav(
  id: CandidateTest['id'],
) {
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
              description: true
            }
          },
          questions: {
            select: {
              id: true,
              status: true,
              order: true
            }
          },
          timeInCandidateQuestion: true,
          startedAt: true,
          endAt: true
        }
      },
      test: {
        select: {
          name: true,
          description: true
        }
      },
      startedAt: true,
      endAt: true
    }
  })
}

export async function getCandidate(
  id: CandidateTest['id'],
) {
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
}

export async function getTestInstructionForCandidate(
  id: CandidateTest['id']
) {
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
              section: true
            }
          }
        }
      }
    }
  })
}

export async function candidateTestStart(id: CandidateTest['id']) {
  return await prisma.candidateTest.update({
    where: { id },
    data: { startedAt: new Date() },
    select: { candidateStep: true }
  })
}

export async function getOrderedSection(testId: Test['id'], order: number) {
  return await prisma.sectionInTest.findFirst({
    where: { testId, order }
  })
}



export async function getTestSectionDetails(id: CandidateTest['id']) {
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
}

export async function getCandidateSectionDetails(sectionId: Section['id'], candidateTestId: SectionInCandidateTest['candidateTestId']) {
  return await prisma.sectionInCandidateTest.findFirst({
    where: {
      sectionId, candidateTestId
    },
    select: {
      id: true,
      startedAt: true,
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
}

export async function startCandidateSection(id: SectionInCandidateTest['id']) {
  const section = await prisma.sectionInCandidateTest.findUnique({ where: { id } })
  if (section?.startedAt) {
    return await prisma.sectionInCandidateTest.findUnique({
      where: {
        id
      },
      select: {
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
    })
  } else {
    return await prisma.sectionInCandidateTest.update({
      where: {
        id
      },
      data: {
        startedAt: new Date()
      },
      select: {
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
    })
  }
}

// async function getAllQuestions(sectionInCandidateTestId: SectionInCandidateTest['id']) {
//   return prisma.candidateQuestion.findMany({
//     where: { sectionInCandidateTestId },
//     select: {
//       id: true,
//       answeredAt: true,
//       status: true,
//       question: {
//         select: {
//           id: true
//         }
//       }
//     }
//   })
// }

// export async function getFirstQuestionId(id: SectionInCandidateTest['id']) {
//   const questions = await getAllQuestions(id)
//   return questions[0]
// }

export async function startAndGetQuestion(id: CandidateQuestion['id']) {
  return prisma.candidateQuestion.update({
    where: { id },
    data: {
      status: 'VIEWED'
    },
    select: {
      id: true,
      order: true,
      question: {
        select: {
          question: true,
          options: {
            select: {
              id: true,
              option: true
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
}


export async function skipAndNextQuestion(sectionId: SectionInTest['id'], currentQuestionId: CandidateQuestion['id'], nextOrPrev: string) {

  // write script for save question answer
  // write script for last question

  //getting currentQuestionOrder
  const currentQuestion = await prisma.candidateQuestion.findFirst({
    where: {
      id: currentQuestionId
    },
    select: {
      sectionInCandidateTestId: true,
      order: true
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
}

// export async function getNextSection(sectionId: SectionInTest['id'], currentSectionOrder: number) {
//   const section = await prisma.section
// }



export async function endCurrentSection(candidateTestId: SectionInCandidateTest['candidateTestId'], id: SectionInTest['id']) {
  const testSection = await prisma.sectionInTest.findUnique({ where: { id } })
  console.log('testSection', testSection)

  const section = await prisma.sectionInCandidateTest.findFirst({
    where: { candidateTestId, sectionId: testSection?.sectionId },
    select: {
      id: true, startedAt: true, endAt: true
    }
  })

  if (section?.endAt) {
    return { msg: "Section already ended" }
  }
  console.log("sect:", section)

  return await prisma.sectionInCandidateTest.updateMany({
    where: { candidateTestId, sectionId: testSection?.sectionId },
    data: { endAt: new Date() }
  })

}