import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import CandidateRegister from '~/components/assessment/CandidateRegister'
import {
  getCandidateIDFromAssessmentID,
  updateCandidateFirstLastName,
  updateNextCandidateStep,
} from '~/models/candidate.server'
import { checkIfTestLinkIsValidAndRedirect } from '~/utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    'register'
  )
  if (typeof candidateNextRoute === 'string') {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response('Not Found', { status: 404 })
  }
  return null
}

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const candidateID = await getCandidateIDFromAssessmentID(
    params.assessmentId as string
  )
  if (candidateID?.candidateId) {
    const updatedCandidate = await updateCandidateFirstLastName(
      candidateID?.candidateId,
      firstName,
      lastName
    )
    if (updatedCandidate) {
      await updateNextCandidateStep(params.assessmentId as string, {
        nextRoute: 'instructions',
        isSection: false,
        currentSectionId: null,
      })
      return redirect(`/assessment/${params.assessmentId}/instructions`)
    }
  }
  return null
}

export default function CandidateOnboard() {
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50">
      <CandidateRegister />
    </div>
  )
}
