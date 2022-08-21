import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import SectionQuestionPage from '~/components/assessment/SectionQuestionPage'
import CandidateLayout from '~/components/layouts/CandidateLayout'
import {
  candidateTest,
  checkIfTestLinkIsValidAndRedirect,
  getCandidateByAssessmentId,
  getSectionInCandidateTest,
  getSectionInTest,
  moveToNextSection,
} from '~/utils/assessment.utils'

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

  const section = await getSectionInTest(params.sectionId as string)

  // getting candidate section for time validation
  const candidateSection = await getSectionInCandidateTest(
    params.assessmentId as string,
    section?.section.id as string
  )

  if (candidateSection?.endAt) {
    await moveToNextSection({
      assessmentId: params.assessmentId as string,
      order: section?.order || 0,
      sectionId: '',
    })
  }

  const candidateTests = await candidateTest(params.assessmentId as string)

  const currentSectionInTest = await getSectionInTest(
    params.sectionId as string
  )

  const candidate = await getCandidateByAssessmentId(
    params.assessmentId as string
  )

  return {
    section,
    candidateTests,
    candidate,
    params,
    currentSectionInTest,
  }
}

// export const action: ActionFunction = async ({ params, request }) => {
//   const formData = await request.formData()
//   const order = formData.get('order')

//   const candidateTests = await candidateTest(params.assessmentId as string)

//   await endCurrentSection(
//     params.assessmentId as string,
//     params.sectionId as string
//   )

//   const nextSectionObject = await getOrderedSection(
//     candidateTests?.testId as string,
//     parseInt(order as string) + 1
//   )
//   await updateNextCandidateStep(params.assessmentId as string, {
//     nextRoute: 'section',
//     isSection: true,
//     currentSectionId: nextSectionObject?.id,
//   })

//   // return redirect(`/assessment/cl70h88f265421bk272f15zgj`)
//   return redirect(`/assessment/${params.assessmentId}/${nextSectionObject?.id}`)
// }

export default function AssessmentSection() {
  const { section, candidateTests, candidate, params } = useLoaderData()

  return (
    <CandidateLayout candidate={candidate} candidateTest={candidateTests}>
      <SectionQuestionPage
        section={section}
        params={params}
        candidateTest={candidateTest}
      />
    </CandidateLayout>
  )
}
