import type { CandidateResult, CandidateTest } from '@prisma/client'
import { prisma } from '~/db.server'
import type { Test } from '@prisma/client'

export async function getPendingExamCandidateByTestId({
  id,
}: Pick<CandidateTest, 'id'>) {
  return prisma.test.findFirst({
    where: {
      id,
    },
    include: {
      candidateTest: {
        where: {
          startedAt: null,
        },
        include: {
          candidate: {
            select: {
              email: true,
              createdBy: true,
            },
          },
        },
      },
    },
  })
}
export async function getTestAttendedCandiated({
  id,
}: Pick<CandidateResult, 'id'>) {
  return prisma.test.findFirst({
    where: {
      id,
    },
    include: {
      candidateTest: {
        where: {
          NOT: {
            startedAt: null,
          },
          endAt: null,
        },
        include: {
          candidate: {
            select: {
              email: true,
              createdBy: true,
            },
          },
        },
      },
    },
  })
}
export async function getResultsOfCandidatesByTestId({
  testId,
}: Pick<CandidateResult, 'testId'>) {
  return prisma.candidateResult.findMany({
    where: { testId },
    select: {
      id: true,
      totalQuestion: true,
      correctQuestion: true,
      unanswered: true,
      isQualified: true,
      candidate: {
        select: {
          lastName: true,
          firstName: true,
          email: true,
          createdBy: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  })
}

export async function getAllCandidatesOfTest({
  id,
  workspaceId,
}: {
  id: string
  workspaceId: string
}) {
  return prisma.test.findFirst({
    where: {
      id,
      workspaceId,
    },
    include: {
      candidateTest: {
        include: {
          candidateResult: true,
          candidate: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              createdBy: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      },
    },
  })
}

export async function getResultsOfIndividualCandidates({ id }: { id: string }) {
  return await prisma.candidateResult.findUnique({
    where: {
      id,
    },
    select: {
      candidate: true,
      testId: true,
      candidateTestId: true,
    },
  })
}

export async function getSectionWiseResultsOfIndividualCandidate({
  testId,
  candidateTestId,
}: {
  testId: string
  candidateTestId: string
}) {
  return await prisma.sectionWiseResult.findMany({
    where: {
      testId,
      candidateTestId,
    },
    select: {
      id: true,
      section: {
        select: {
          startedAt: true,
          endAt: true,
          section: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },

      test: {
        select: {
          id: true,
          sections: {
            select: {
              id: true,
              timeInSeconds: true,
              section: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },

      totalQuestion: true,
      correctQuestion: true,
      unanswered: true,
    },
  })
}

export async function updateCandidateStatus({
  id,
  candidateStatus,
}: {
  id: string
  candidateStatus: string
}) {
  return await prisma.candidateResult.update({
    where: {
      id,
    },
    data: {
      isQualified: candidateStatus == 'true' ? true : false,
    },
  })
}

export async function getAllCandidateTests(obj: object, workspaceId: string) {
  const filter = obj ? obj : {}
  const res: Array<Test> = await prisma.test.findMany({
    ...filter,
    where: { workspaceId },
    include: {
      _count: {
        select: {
          candidateResult: true,
          candidateTest: true,
        },
      },
      candidateTest: {
        select: {
          id: true,
          endAt: true,
        },
      },
    },
  })
  if (res) {
    res.forEach(
      (
        test: Test & { count?: number; candidateTest?: Array<CandidateTest> }
      ) => {
        let count = 0
        test?.candidateTest?.forEach((candidateTest: CandidateTest) => {
          if (candidateTest?.endAt !== null) {
            count = count + 1
          }
        })
        test['count'] = count
      }
    )
  }
  return res
}
