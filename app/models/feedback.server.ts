import { prisma } from "~/db.server"

export async function getCandidatesFeedback() {
  try {
    const value = await prisma.userFeedback.findMany({
      include: {
        userFeedbackQuestion: true,
        candidateTest: {
          select: {
            endAt: true,
          },
        },
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
    return value
  } catch (error) {
    throw new Error("Something went wrong..!")
  }
}
