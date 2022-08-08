import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import SectionDetails from '~/components/assessment/SectionDetails'
import {
  getCandidateSectionDetails,
  getCandidateTestForSideNav,
  getTestSectionDetails,
  startCandidateSection,
} from '~/models/candidate.server'

export const loader: LoaderFunction = async ({ params, request }) => {
  const section = await getTestSectionDetails(params.sectionId as string)
  const candidateSection = await getCandidateSectionDetails(
    section?.sectionId as string
  )
  const candidateTest = await getCandidateTestForSideNav(
    params.assessmentId as string
  )
  return { section, candidateSection, candidateTest }
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  console.log(...formData)
  const candidateSectionId = formData.get('candidateSectionId')
  const firstQuestionId = formData.get('firstQuestionId')
  const started = await startCandidateSection(candidateSectionId as string)
  console.log(started)
  return redirect(
    `/assessment/${params.assessmentId}/${params.sectionId}/${firstQuestionId}`
  )
}

export default function SectionPage() {
  return <SectionDetails />
}
