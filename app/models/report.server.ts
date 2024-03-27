import { getCandidateIDFromAssessmentID } from "./assessment.server"

import type { TemplateData } from "~/components/report/ReportTemplate"
import reportTemplate from "~/components/report/ReportTemplate"
import { prisma } from "~/db.server"
import type {
  Candidate,
  CandidateResult,
  CandidateTest,
} from "~/interface/Interface"

export async function generateReport(
  sections: any,
  candidate: any,
  candidateResult: any
) {
  try {
    const sectionIds = sections.map((section: any) => section.id)
    const sectionsDetails = await prisma.sectionInCandidateTest.findMany({
      where: {
        id: {
          in: sectionIds,
        },
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

    const content: TemplateData = {
      candidateName: `${candidate?.firstName} ${candidate?.lastName}`,
      candidateResult,
      sections,
      sectionsDetails,
    }
    const stream = await reportTemplate(content)
    const buffers: Buffer[] = []

    for await (const chunk of stream) {
      buffers.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    }
    return Buffer.concat(buffers).toString("base64")
  } catch (error) {
    throw error
  }
}

export async function getGeneratedReport(assessmentId: string) {
  const candidateTest = await prisma.candidateTest.findUnique({
    where: { id: assessmentId },
    select: {
      test: {
        select: { id: true },
      },
    },
  })
  const candidate = await getCandidateIDFromAssessmentID(assessmentId)
  const candidateId = candidate?.candidateId
  const testId = candidateTest?.test.id
  if (candidateId && testId) {
    const { sections, candidate, candidateResult } =
      (await prisma.candidateTest.findUnique({
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
      })) ||
      ({} as CandidateTest & { candidate: Candidate } & {
        candidateResult: CandidateResult
      })
    if (sections && candidate && candidateResult) {
      const report = await generateReport(sections, candidate, candidateResult)
      return report
    }
  }
}
