import type { LoaderFunction, ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import CandidateRegister from '~/components/assessment/CandidateRegister'
import {
  checkIfTestLinkIsValidAndRedirect,
  getCandidateIDFromAssessmentId,
  updateCandidateDetail,
  updateNextStep,
} from '~/utils/assessment.utils'

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
  const candidateID = await getCandidateIDFromAssessmentId(
    params.assessmentId as string
  )
  if (candidateID?.candidateId) {
    const updatedCandidate = await updateCandidateDetail({
      candidateId: candidateID?.candidateId,
      firstName,
      lastName,
    })

    if (updatedCandidate) {
      await updateNextStep({
        assessmentId: params.assessmentId as string,
        nextRoute: 'verification',
        isSection: false,
      })
      return redirect(`/assessment/${params.assessmentId}/verification`)
    }
  }
  return null
}

const CandidateOnboard = () => {
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50">
      <CandidateRegister />
    </div>
  )
}

export default CandidateOnboard
