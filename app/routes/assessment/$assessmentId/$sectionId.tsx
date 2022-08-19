import { useLoaderData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import SectionQuestionPage from '~/components/assessment/SectionQuestionPage'
import CandidateLayout from '~/components/layouts/CandidateLayout'
import {
  endCurrentSection,
  getCandidate,
  getCandidateSectionDetails,
  getCandidateTestForSideNav,
  getOrderedSection,
  getSectionInTestFronCandidateSection,
  getTestInstructionForCandidate,
  getTestSectionDetails,
  updateNextCandidateStep,
} from '~/models/candidate.server'
import { checkIfTestLinkIsValidAndRedirect } from '~/utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateNextRoute = await checkIfTestLinkIsValidAndRedirect(
    params.assessmentId as string,
    'section'
  )
  if (typeof candidateNextRoute === 'string') {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response('Not Found', { status: 404 })
  }

  const section = await getTestSectionDetails(params.sectionId as string)

  // getting candidate section for time validation
  const candidateSection = await getCandidateSectionDetails(
    section?.section.id as string,
    params.assessmentId as string
  )

  if (candidateSection?.endAt) {
    const candidateTest = await getTestInstructionForCandidate(
      params.assessmentId as string
    )

    const nextSectionObject = await getOrderedSection(
      candidateTest?.test.id as string,
      (section?.order || 0) + 1
    )
    await updateNextCandidateStep(params.assessmentId as string, {
      nextRoute: 'section',
      isSection: true,
      currentSectionId: nextSectionObject?.id,
    })

    console.log('nextSectionObject')
    console.log(nextSectionObject)
    if (nextSectionObject) {
      return redirect(
        `/assessment/${params.assessmentId}/${nextSectionObject?.id}`
      )
    } else {
      return redirect(`/assessment/${params.assessmentId}/end-assessment`)
    }
  }

  const candidateTest = await getCandidateTestForSideNav(
    params.assessmentId as string
  )

  const currentSectionInTest = await getSectionInTestFronCandidateSection({
    id: params.sectionId as string,
  })

  const candidate = await getCandidate(params.assessmentId as string)

  return {
    section,
    candidateTest,
    candidate,
    params,
    currentSectionInTest,
  }
}

export const action: ActionFunction = async ({ params, request }) => {
  console.log(`/assessment/${params.assessmentId}/`)
  const formData = await request.formData()
  const order = formData.get('order')
  const candidateTest = await getTestInstructionForCandidate(
    params.assessmentId as string
  )
  await endCurrentSection(
    params.assessmentId as string,
    params.sectionId as string
  )

  const nextSectionObject = await getOrderedSection(
    candidateTest?.test.id as string,
    parseInt(order as string) + 1
  )
  await updateNextCandidateStep(params.assessmentId as string, {
    nextRoute: 'section',
    isSection: true,
    currentSectionId: nextSectionObject?.id,
  })

  // return redirect(`/assessment/cl70h88f265421bk272f15zgj`)
  return redirect(`/assessment/${params.assessmentId}/${nextSectionObject?.id}`)
}

export default function AssessmentSection() {
  const { section, candidateTest, candidate, params } = useLoaderData()

  return (
    <CandidateLayout candidate={candidate} candidateTest={candidateTest}>
      <SectionQuestionPage
        section={section}
        params={params}
        candidateTest={candidateTest}
      />
    </CandidateLayout>
  )
}
