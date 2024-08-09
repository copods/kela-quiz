import type { CandidateTest, Test } from "@prisma/client"

import { checkFeatureAuthorization } from "./authorization.server"

import { prisma } from "~/db.server"

export async function getAllCandidatesOfTestCount(
  id: string,
  statusFilter: string,
  userId: string,
  workspaceId: string,
  searchText?: string,
  passFailFilter?: string,
  customFilter?: Array<string>
) {
  try {
    if (
      !(await checkFeatureAuthorization(userId, workspaceId, "results", "read"))
    ) {
      throw {
        status: 403,
      }
    }
    const cFilter_min =
      passFailFilter == "pass"
        ? 70
        : passFailFilter == "fail"
        ? 0
        : passFailFilter == "custom"
        ? Number(customFilter ? customFilter[0] : 0)
        : 0
    const cFilter_max =
      passFailFilter == "pass"
        ? 101
        : passFailFilter == "fail"
        ? 70
        : passFailFilter == "custom"
        ? Number(customFilter ? customFilter[1] : 100) + 1
        : 101

    const queryResult: any = await prisma.$queryRaw`SELECT
        ct.*

    FROM
        "CandidateTest" ct
    JOIN
        "Test" t ON ct."testId" = t.id
    JOIN
        "Candidate" c ON ct."candidateId" = c.id
    LEFT JOIN
        "CandidateResult" cr ON ct.id = cr."candidateTestId"
    LEFT JOIN
        "User" u ON c."createdById" = u.id
    WHERE
        t."workspaceId" = ${workspaceId} 
        AND (
          c.email ILIKE '%' || ${searchText} || '%'
          OR CONCAT(c."firstName", ' ', c."lastName") ILIKE '%' || ${searchText} || '%'
        )
        AND (CASE WHEN ${passFailFilter != "all"} THEN    (
                   (cr."correctQuestion"::FLOAT / cr."totalQuestion") * 100 >= ${cFilter_min}
                  AND (cr."correctQuestion"::FLOAT / cr."totalQuestion") * 100 < ${cFilter_max}
                  AND t.id = ${id}
          ) ELSE  t.id = ${id}  END)
          AND ( 
              (${statusFilter} = 'complete' AND ct."endAt" IS NOT NULL)
              OR (${statusFilter} = 'pending' AND ct."startedAt" IS NULL)
              OR ${statusFilter} = 'all'
          )
   `
    return queryResult?.length
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
  customFilter,
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
  customFilter: Array<string>
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
    const testResp = await prisma.test.findFirst({
      where: {
        id,
        workspaceId,
      },
    })

    const cFilter_min =
      passFailFilter == "pass"
        ? 70
        : passFailFilter == "fail"
        ? 0
        : passFailFilter == "custom"
        ? Number(customFilter[0])
        : 0
    const cFilter_max =
      passFailFilter == "pass"
        ? 101
        : passFailFilter == "fail"
        ? 70
        : passFailFilter == "custom"
        ? Number(customFilter[1]) + 1
        : 101

    const queryResult: any = await prisma.$queryRaw`SELECT
          ct.*,
          c."email" AS "c_email",
          c."firstName" AS "c_firstName",
          c."lastName" AS "c_lastName",
          c."OTP" AS "c_OTP",
          u."firstName" AS "createdBy_firstName",
          u."lastName" AS "createdBy_lastName",
          cr."id" AS "cr_id",
          cr."candidateId" AS "cr_candidateId",
          cr."candidateTestId" AS "cr_candidateTestId",
          cr."totalQuestion" AS "cr_totalQuestion",
          cr."correctQuestion" AS "cr_correctQuestion",
          cr."unanswered" AS "cr_unanswered",
          cr."incorrect" AS "cr_incorrect",
          cr."skipped" AS "cr_skipped",
          cr."testId" AS "cr_testId",
          cr."isQualified" AS "cr_isQualified",
          cr."createdAt" AS "cr_createdAt",
          cr."updatedAt" AS "cr_updatedAt",
          cr."workspaceId" "AS cr_workspaceId"

      FROM
          "CandidateTest" ct
      JOIN
          "Test" t ON ct."testId" = t.id
      JOIN
          "Candidate" c ON ct."candidateId" = c.id
      LEFT JOIN
          "CandidateResult" cr ON ct.id = cr."candidateTestId"
      LEFT JOIN
          "User" u ON c."createdById" = u.id
      WHERE
          t."workspaceId" = ${workspaceId} 
          AND (
            c.email ILIKE '%' || ${searchText} || '%'
            OR CONCAT(c."firstName", ' ', c."lastName") ILIKE '%' || ${searchText} || '%'
          )
          AND (CASE WHEN ${passFailFilter != "all"} THEN    (
                   (cr."correctQuestion"::FLOAT / cr."totalQuestion") * 100 >= ${cFilter_min}
                  AND (cr."correctQuestion"::FLOAT / cr."totalQuestion") * 100 < ${cFilter_max}
                  AND t.id = ${id}
          ) ELSE  t.id = ${id}  END)
          AND ( 
              (${statusFilter} = 'complete' AND ct."endAt" IS NOT NULL)
              OR (${statusFilter} = 'pending' AND ct."startedAt" IS NULL)
              OR ${statusFilter} = 'all'
          )
      ORDER BY
          ct."createdAt" DESC
      LIMIT
          ${pageSize}
      OFFSET
          (${currentPage} - 1) * ${pageSize};`

    let response: any = {
      ...testResp,
      candidateTest: [],
    }

    response.candidateTest = queryResult?.map((res: any) => ({
      id: res.id,
      testId: res.testId,
      link: res.link,
      candidateId: res.candidateId,
      candidateStep: res.candidateStep,
      startedAt: res.startedAt,
      endAt: res.endAt,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      linkSentOn: res.linkSentOn,
      candidateResult: res.cr_id
        ? [
            {
              id: res.cr_id,
              candidateId: res.cr_candidateId,
              candidateTestId: res.cr_candidateTestId,
              totalQuestion: res.cr_totalQuestion,
              correctQuestion: res.cr_correctQuestion,
              unanswered: res.cr_unanswered,
              incorrect: res.cr_incorrect,
              skipped: res.cr_skipped,
              testId: res.cr_testId,
              isQualified: res.cr_isQualified,
              createdAt: res.cr_createdAt,
              updatedAt: res.cr_updatedAt,
              workspaceId: res.cr_workspaceId,
            },
          ]
        : [],
      candidate: {
        email: res.c_email,
        firstName: res.c_firstName,
        lastName: res.c_lastName,
        OTP: res.c_OTP,
        createdBy: {
          firstName: res.createdBy_firstName,
          lastName: res.createdBy_lastName,
        },
      },
    }))

    return response
  } catch (error) {
    console.log("errrrr", error)
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
        candidateResult: true,
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
