import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import SectionDetails from '~/components/assessment/SectionDetails'
import {
  getSectionInCandidateTest,
  getSectionInTest,
  startCandidateSection,
} from '~/utils/assessment.utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const section = await getSectionInTest(params.sectionId as string)
  const candidateSection = await getSectionInCandidateTest(
    section?.sectionId as string,
    params.assessmentId as string
  )

  return { section, candidateSection, params }
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const candidateSectionId = formData.get('candidateSectionId')
  const started = await startCandidateSection(candidateSectionId as string)

  return redirect(
    `/assessment/${params.assessmentId}/${params.sectionId}/${started?.questions[0].id}`
  )
}

export default function SectionPage() {
  return <SectionDetails />
}
