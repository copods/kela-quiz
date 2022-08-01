import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import CandidateInstruction from '~/components/assessment/CandidateInstruction'
import CandidateLayout from '~/components/layouts/CandidateLayout'
import { checkIfTestLinkIsValidAndRedirect } from '~/utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    'instructions'
  )
  console.log(candidateNextRoute)
  if (typeof candidateNextRoute === 'string') {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response('Not Found', { status: 404 })
  }
  return null
}

export default function TestInstructions() {
  return (
    <CandidateLayout>
      <CandidateInstruction />
    </CandidateLayout>
  )
}
