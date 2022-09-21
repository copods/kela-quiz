import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import CandidateInstruction from '~/components/assessment/CandidateInstruction'
import {
  checkIfTestLinkIsValidAndRedirect,
  getCandidateByAssessmentId,
  getSectionByOrder,
  getSectionInCandidateTest,
  getSectionInTest,
  getTestInstructions,
  startCandidateSection,
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

  const candidate = await getCandidateByAssessmentId(
    params.assessmentId as string
  )

  return json({ instructions, firstSection, candidate })
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

    // new
    const section = await getSectionInTest(firstSectionId as string)
    const candidateSection = await getSectionInCandidateTest(
      section?.sectionId as string,
      params.assessmentId as string
    )

    const started = await startCandidateSection(candidateSection?.id as string)

    return redirect(
      `/assessment/${params.assessmentId}/${firstSectionId}/${started?.questions[0].id}`
    )
  }
}

const TestInstructions = () => {
  return <CandidateInstruction />
}

export default TestInstructions
