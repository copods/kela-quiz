import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CandidateInstruction from '~/components/assessment/CandidateInstruction'
import CandidateLayout from '~/components/layouts/CandidateLayout'
import {
  candidateTest,
  checkIfTestLinkIsValidAndRedirect,
  getCandidateByAssessmentId,
  getSectionByOrder,
  getTestInstructions,
  startTest,
  updateNextStep,
} from '~/utils/assessment.utils'

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

  const instructions = await getTestInstructions(params.assessmentId as string)
  const firstSection = await getSectionByOrder(
    instructions?.test.id as string,
    1
  )

  const candidateTests = await candidateTest(params.assessmentId as string)

  const candidate = await getCandidateByAssessmentId(
    params.assessmentId as string
  )

  return json({ instructions, firstSection, candidateTests, candidate })
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const proceed = formData.get('proceedToTest')
  const firstSectionId = formData.get('firstSectionId') as string

  if (proceed) {
    await updateNextStep({
      assessmentId: params.assessmentId as string,
      nextRoute: 'section',
      isSection: true,
      currentSectionId: firstSectionId,
    })

    await startTest(params.assessmentId as string)

    return redirect(`/assessment/${params.assessmentId}/${firstSectionId}`)
  }
}

const TestInstructions = () => {
  const { candidateTests, candidate } = useLoaderData()

  return (
    <CandidateLayout candidate={candidate} candidateTest={candidateTests}>
      <CandidateInstruction />
    </CandidateLayout>
  )
}

export default TestInstructions
