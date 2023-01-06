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

export async function getAllCandidatesOfTestCount(
  id: string,
  statusFilter: string
) {
  const count = prisma.candidateTest.count({
    where: {
      ...(statusFilter === 'complete'
        ? { NOT: { endAt: { equals: null } } }
        : statusFilter === 'pending'
        ? { endAt: { equals: null } }
        : {}),
      testId: id,
    },
  })
  return count
}

export async function getAllCandidatesOfTest({
  id,
  workspaceId,
  currentPage,
  pageSize,
  statusFilter,
}: {
  id: string
  workspaceId: string
  currentPage?: number
  pageSize?: number
  statusFilter?: string
}) {
  return prisma.test.findFirst({
    where: {
      id,
      workspaceId,
    },
    include: {
      candidateTest: {
        take: pageSize,
        where: {
          ...(statusFilter === 'complete'
            ? { NOT: { endAt: { equals: null } } }
            : statusFilter === 'pending'
            ? { endAt: { equals: null } }
            : {}),
        },
        skip: (currentPage! - 1) * pageSize!,
        orderBy: { createdAt: 'desc' },
        select: {
          link: true,
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
  candidateId,
}: {
  testId: string
  candidateId: string
}) {
  return await prisma.candidateTest.findUnique({
    where: {
      candidateId_testId: { candidateId, testId },
    },
    select: {
      candidate: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      sections: {
        select: {
          startedAt: true,
          endAt: true,
          order: true,
          section: {
            select: {
              id: true,
              name: true,
            },
          },

          SectionWiseResult: {
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
                      sectionInTest: {
                        select: {
                          timeInSeconds: true,
                        },
                      },
                    },
                  },
                },
              },
              totalQuestion: true,
              correctQuestion: true,
              unanswered: true,
              incorrect: true,
              skipped: true,
            },
          },
        },
      },
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
export async function getTotalTestCount(workspaceId: string) {
  const totalCount = await prisma.test.count({
    where: {
      workspaceId,

      candidateTest: {
        some: {
          id: {
            not: undefined,
          },
        },
      },
    },
  })
  return totalCount
}
export async function getAllCandidateTestsCount(
  workspaceId: string,
  statusFilter: string
) {
  const testCount = await prisma.test.count({
    where: {
      ...(statusFilter === 'active'
        ? { NOT: { deleted: { equals: true } } }
        : statusFilter === 'inactive'
        ? { deleted: { equals: true } }
        : {}),
      workspaceId,
      candidateTest: {
        some: {
          id: {
            not: undefined,
          },
        },
      },
    },
  })
  return testCount
}
export async function getAllCandidateTests(
  workspaceId: string,
  resultsItemsPerPage: number = 5,
  resultsCurrentPage: number = 1,
  statusFilter: string,
  sortBy: string,
  sortOrder: string
) {
  const PER_PAGE_ITEMS = resultsItemsPerPage
  const res: Array<Test> = await prisma.test.findMany({
    take: PER_PAGE_ITEMS,
    skip: (resultsCurrentPage - 1) * PER_PAGE_ITEMS,
    orderBy: { [sortBy ?? 'createdAt']: sortOrder ?? 'asc' },
    where: {
      ...(statusFilter === 'active'
        ? { NOT: { deleted: { equals: true } } }
        : statusFilter === 'inactive'
        ? { deleted: { equals: true } }
        : {}),
      workspaceId,
      candidateTest: {
        some: {
          id: {
            not: undefined,
          },
        },
      },
    },
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
        test: Test & {
          count?: number
          candidateTest?: Array<CandidateTest>
        }
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
