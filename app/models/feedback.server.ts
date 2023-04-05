import { prisma } from "~/db.server"
export async function getCandidatesFeedback(
  workspaceId: string,
  feedbackItemsPerPage = 5,
  feedbackCurrentPage = 1,
  feedbackfilterType = "",
  testId = "",
  sortBy = "Newer"
) {
  switch (feedbackfilterType) {
    case "all_feedbacks":
      feedbackfilterType = ""
      break
    case "positive":
      feedbackfilterType = "Positive"
      break
    case "negative":
      feedbackfilterType = "Negative"
      break
    case "neutral":
      feedbackfilterType = "Neutral"
      break
  }

  const PER_PAGE_ITEMS = feedbackItemsPerPage
  try {
    return await prisma.userFeedback.findMany({
      take: PER_PAGE_ITEMS,
      skip: (feedbackCurrentPage - 1) * PER_PAGE_ITEMS,
      orderBy: {
        createdAt: sortBy === "Newer" ? "desc" : "asc",
      },
      where: {
        workspaceId: workspaceId,
        feedbackType: feedbackfilterType ? feedbackfilterType : {},
        candidateTest: {
          test: {
            id: testId === "all_tests" ? {} : testId,
          },
        },
      },
      include: {
        userFeedbackQuestion: true,
        candidate: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            tests: {
              select: {
                test: {
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
    throw new Error("Something went wrong..!")
  }
}

export async function getAllCandidatesFeedbackCount(workspaceId: string) {
  return prisma.userFeedback.count({
    where: {
      workspaceId,
    },
  })
}

export async function getAllFeedbacksCounts(workspaceId: string) {
  const allValues = await prisma.userFeedback.findMany({
    where: {
      workspaceId,
    },
    select: {
      feedbackType: true,
    },
  })
  let feedbackCount = {
    positive: 0,
    negative: 0,
    neutral: 0,
  }
  allValues.forEach((feedback) => {
    switch (feedback.feedbackType) {
      case "Positive":
        feedbackCount.positive += 1
        break
      case "Negative":
        feedbackCount.negative += 1
        break
      case "Neutral":
        feedbackCount.neutral += 1
        break
    }
  })
  return feedbackCount
}

export async function getAllTestsForFeedbackFilter(workspaceId: string) {
  return await prisma.test.findMany({
    where: {
      workspaceId,
    },
    select: {
      id: true,
      name: true,
    },
  })
}
