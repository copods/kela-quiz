import type { CandidateTest, Prisma, Test } from "@prisma/client"

import { checkFeatureAuthorization } from "./authorization.server"

import { prisma } from "~/db.server"

export async function getAllCandidatesOfTestCount(
  id: string,
  statusFilter: string,
  userId: string,
  workspaceId: string,
  searchText?: string,
  passFailFilter?: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(userId, workspaceId, "results", "read"))
    ) {
      throw {
        status: 403,
      }
    }
    const searchFilter: Prisma.CandidateWhereInput = searchText
      ? {
        OR: [
          { firstName: { contains: searchText, mode: "insensitive" } },
          { lastName: { contains: searchText, mode: "insensitive" } },
          { email: { contains: searchText, mode: "insensitive" } },
        ],
      }
      : {}

    // ============================================================
    // filter by pass fail
    // ============================================================

    const test = await prisma.candidateTest.findFirst({
      where: { testId: id },
      select: { candidateResult: true },
    })
    const qualyfing = Math.ceil(
      (test?.candidateResult[0]?.totalQuestion as number | 0) * 0.7
    ) // for 70% passing marks

    const candidateFilters: Prisma.CandidateTestWhereInput = {
      candidateResult: {},
    }

    if (passFailFilter === "pass") {
      candidateFilters.candidateResult = {
        some: {
          correctQuestion: { gte: qualyfing },
        },
      }
    }
    if (passFailFilter === "fail") {
      candidateFilters.candidateResult = {
        some: {
          correctQuestion: { lt: qualyfing },
        },
      }
    }
    // ============================================================
    // filter by pass fail end
    // ============================================================

    const count = await prisma.candidateTest.count({
      where: {
        ...(statusFilter === "complete"
          ? { NOT: { endAt: { equals: null } } }
          : statusFilter === "pending"
            ? { startedAt: { equals: null } }
            : {}),
        testId: id,
        candidate: {
          ...searchFilter,
        },
        ...candidateFilters,
      },
    })
    return count
  } catch (error) {
    throw error
  }
}

export async function getAllCandidatesOfTest({
  id,
  workspaceId,
  userId,
  currentWorkspaceId,
  currentPage,
  pageSize,
  statusFilter,
  searchText,
  passFailFilter,
}: {
  id: string
  workspaceId: string
  userId: string
  currentWorkspaceId: string
  currentPage?: number
  pageSize?: number
  statusFilter?: string
  searchText?: string
  passFailFilter?: string
}) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        currentWorkspaceId,
        "results",
        "read"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    const searchFilter: Prisma.CandidateWhereInput = searchText
      ? {
        OR: [
          { firstName: { contains: searchText, mode: "insensitive" } },
          { lastName: { contains: searchText, mode: "insensitive" } },
          { email: { contains: searchText, mode: "insensitive" } },
        ],
      }
      : {}

    // ============================================================
    // filter by pass fail
    // ============================================================

    const test = await prisma.candidateTest.findFirst({
      where: { testId: id },
      select: { candidateResult: true },
    })
    // const totalQuestionInTest= test?.candidateResult[0]?.totalQuestion
    const qualyfing = Math.ceil(
      (test?.candidateResult[0]?.totalQuestion as number | 0) * 0.7
    ) // for 70% passing marks

    const candidateFilters: Prisma.CandidateTestWhereInput = {
      candidateResult: {},
    }

    if (passFailFilter === "pass") {
      candidateFilters.candidateResult = {
        some: {
          correctQuestion: { gte: qualyfing },
        },
      }
    }
    if (passFailFilter === "fail") {
      candidateFilters.candidateResult = {
        some: {
          correctQuestion: { lt: qualyfing },
        },
      }
    }
    // ============================================================
    // filter by pass fail end
    // ============================================================

    return prisma.test.findFirst({
      where: {
        id,
        workspaceId,
      },
      include: {
        candidateTest: {
          take: pageSize,
          where: {
            ...(statusFilter === "complete"
              ? { NOT: { endAt: { equals: null } } }
              : statusFilter === "pending"
                ? { startedAt: { equals: null } }
                : {}),
            candidate: {
              ...searchFilter,
            },
            ...candidateFilters,
          },
          skip: (currentPage! - 1) * pageSize!,
          orderBy: { createdAt: "desc" },
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
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getSectionWiseResultsOfIndividualCandidate({
  testId,
  candidateId,
  workspaceId,
  userId,
}: {
  testId: string
  candidateId: string
  workspaceId: string
  userId: string
}) {
  try {
    if (
      !(await checkFeatureAuthorization(userId, workspaceId, "results", "read"))
    ) {
      throw {
        status: 403,
      }
    }
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
            id: true,
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
  } catch (error) {
    throw error
  }
}

export async function updateCandidateStatus({
  id,
  candidateStatus,
  currentWorkspaceId,
  userId,
}: {
  id: string
  candidateStatus: string
  currentWorkspaceId: string
  userId: string
}) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        currentWorkspaceId,
        "results",
        "read"
      ))
    ) {
      throw {
        status: 403,
      }
    }
    return await prisma.candidateResult.update({
      where: {
        id,
      },
      data: {
        isQualified: candidateStatus == "true" ? true : false,
      },
    })
  } catch (error) {
    throw error
  }
}

export async function getTotalTestCount(
  workspaceId: string,
  currentWorkspaceId: string,
  userId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(
        userId,
        currentWorkspaceId,
        "results",
        "read"
      ))
    ) {
      throw {
        status: 403,
      }
    }
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
  } catch (error) {
    throw error
  }
}

export async function getAllCandidateTestsCount(
  workspaceId: string,
  statusFilter: string,
  userId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(userId, workspaceId, "results", "read"))
    ) {
      throw {
        status: 403,
      }
    }
    const testCount = await prisma.test.count({
      where: {
        ...(statusFilter === "active"
          ? { NOT: { deleted: { equals: true } } }
          : statusFilter === "inactive"
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
  } catch (error) {
    throw error
  }
}

export async function getAllCandidateTests(
  workspaceId: string,
  resultsItemsPerPage: number = 10,
  resultsCurrentPage: number = 1,
  statusFilter: string,
  sortBy: string,
  sortOrder: string,
  userId: string
) {
  const PER_PAGE_ITEMS = resultsItemsPerPage
  try {
    if (
      !(await checkFeatureAuthorization(userId, workspaceId, "results", "read"))
    ) {
      throw {
        status: 403,
      }
    }
    const res: Array<Test> = await prisma.test.findMany({
      take: PER_PAGE_ITEMS,
      skip: (resultsCurrentPage - 1) * PER_PAGE_ITEMS,
      orderBy: { [sortBy ?? "createdAt"]: sortOrder ?? "asc" },
      where: {
        ...(statusFilter === "active"
          ? { NOT: { deleted: { equals: true } } }
          : statusFilter === "inactive"
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
          test["count"] = count
        }
      )
    }

    return res
  } catch (error) {
    throw error
  }
}

export async function getResultDetailBySection(
  id: string,
  userId: string,
  workspaceId: string
) {
  try {
    if (
      !(await checkFeatureAuthorization(userId, workspaceId, "results", "read"))
    ) {
      throw {
        status: 403,
      }
    }
    return await prisma.sectionInCandidateTest.findUnique({
      where: {
        id,
      },
      select: {
        candidateTest: {
          select: {
            candidate: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        section: {
          select: {
            name: true,
          },
        },
        questions: {
          select: {
            question: {
              select: {
                question: true,
                correctOptions: {
                  select: {
                    option: true,
                    id: true,
                  },
                },
                questionType: {
                  select: {
                    value: true,
                  },
                },
                options: true,
                correctAnswer: true,
                checkOrder: true,
              },
            },
            answers: true,
            status: true,
            id: true,
            selectedOptions: {
              select: {
                id: true,
                option: true,
                questionId: true,
              },
            },
          },
        },
      },
    })
  } catch (error) {
    throw error
  }
}
