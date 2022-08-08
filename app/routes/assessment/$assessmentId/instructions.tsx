import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CandidateInstruction from '~/components/assessment/CandidateInstruction'
import CandidateLayout from '~/components/layouts/CandidateLayout'
import {
  candidateTestStart,
  getCandidate,
  getCandidateTestForSideNav,
  getOrderedSectionToStartAssessment,
  getTestInstructionForCandidate,
  updateNextCandidateStep,
} from '~/models/candidate.server'
import { checkIfTestLinkIsValidAndRedirect } from '~/utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    'instructions'
  )
  if (typeof candidateNextRoute === 'string') {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response('Not Found', { status: 404 })
  }
  const instructions = await getTestInstructionForCandidate(
    params.assessmentId as string
  )
  const firstSection = await getOrderedSectionToStartAssessment(
    instructions?.test.id as string,
    1
  )
  const candidateTets = await getCandidateTestForSideNav(
    params.assessmentId as string
  )
  const candidate = await getCandidate(params.assessmentId as string)
  return json({ instructions, firstSection, candidateTets, candidate })
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const proceed = formData.get('proceedToTest')
  const firstSectionId = formData.get('firstSectionId') as string
  if (proceed) {
    await updateNextCandidateStep(params.assessmentId as string, {
      nextRoute: 'section',
      isSection: true,
      currentSectionId: firstSectionId,
    })
    await candidateTestStart(params.assessmentId as string)
    return redirect(`/assessment/${params.assessmentId}/${firstSectionId}`)
  }
}

export default function TestInstructions() {
  const { candidateTets, candidate } = useLoaderData()

  return (
    <CandidateLayout candidate={candidate} candidateTest={candidateTets}>
      <CandidateInstruction />
    </CandidateLayout>
  )
}
