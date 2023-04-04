import { prisma } from "~/db.server"
export async function getCandidatesFeedback(
  workspaceId: string,
  feedbackItemsPerPage = 5,
  feedbackCurrentPage = 1
) {
  const PER_PAGE_ITEMS = feedbackItemsPerPage
  try {
    const value = await prisma.userFeedback.findMany({
      take: PER_PAGE_ITEMS,
      skip: (feedbackCurrentPage - 1) * PER_PAGE_ITEMS,
      where: {
        workspaceId: workspaceId,
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

    const feedbackDetails = value.map((item) => {
      let count = 0
      let questionsLength = 0
      item.userFeedbackQuestion.forEach((feedback) => {
        if (feedback.questionType === "rating") {
          count = count + Number(feedback.value)
          questionsLength = questionsLength + 1
        }
      })
      if (count > questionsLength * 3) {
        return { ...item, feedbackType: "Positive" }
      } else if (count < questionsLength * 3) {
        return { ...item, feedbackType: "Negative" }
      } else if ((count = questionsLength * 3)) {
        return { ...item, feedbackType: "Neutral" }
      }
      return null
    })
    return feedbackDetails
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
      userFeedbackQuestion: true,
    },
  })

  let feedbackCount = {
    positive: 0,
    negative: 0,
    neutral: 0,
  }
  allValues.forEach((item) => {
    let count = 0
    let questionsLength = 0
    item.userFeedbackQuestion.forEach((feedback) => {
      if (feedback.questionType === "rating") {
        count = count + Number(feedback.value)
        questionsLength = questionsLength + 1
      }
    })
    if (count > questionsLength * 3) {
      feedbackCount.positive = feedbackCount.positive + 1
    } else if (count < questionsLength * 3) {
      feedbackCount.negative = feedbackCount.negative + 1
    } else if ((count = questionsLength * 3)) {
      feedbackCount.neutral = feedbackCount.neutral + 1
    }
  })
  return feedbackCount
}
