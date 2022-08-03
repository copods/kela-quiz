import { prisma } from '~/db.server'
import type { CandidateTest, Candidate } from '@prisma/client'

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

export async function getTestInstructionForCandidate(
  id: CandidateTest['id']
) {
  return await prisma.candidateTest.findUnique({
    where: { id },
    include: {
      test: {
        include: {
          sections: {
            include: {
              section: true
            }
          }
        }
      },
    },
  })
}

export async function candidateTestStart(id: CandidateTest['id']) {
  return await prisma.candidateTest.update({
    where: { id },
    data: { startedAt: new Date() },
    select: { candidateStep: true }
  })
}