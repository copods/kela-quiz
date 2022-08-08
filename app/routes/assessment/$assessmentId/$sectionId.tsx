import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import SectionQuestionPage from '~/components/assessment/SectionQuestionPage'
import CandidateLayout from '~/components/layouts/CandidateLayout'
import {
  getCandidate,
  getCandidateTestForSideNav,
  getTestSectionDetails,
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
  const candidateTest = await getCandidateTestForSideNav(
    params.assessmentId as string
  )
  const candidate = await getCandidate(params.assessmentId as string)
  return { section, candidateTest, candidate }
}

export default function AssessmentSection() {
  const { section, candidateTest, candidate } = useLoaderData()

  return (
    <CandidateLayout candidate={candidate} candidateTest={candidateTest}>
      <SectionQuestionPage section={section} />
    </CandidateLayout>
  )
}
