import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import Cooldown from '~/components/assessment/Cooldown'
import {
  candidateTest,
  getSectionInCandidateTest,
  getSectionInTest,
  startCandidateSection,
} from '~/services/assessment.service'

export const loader: LoaderFunction = async ({ params, request }) => {
  const section = await getSectionInTest(params.sectionId as string)
  const candidateSection = await getSectionInCandidateTest(
    section?.sectionId as string,
    params.assessmentId as string
  )
  const candidateTests = await candidateTest(params.assessmentId as string)

  if (candidateSection?.startedAt) {
    const started = await startCandidateSection(candidateSection?.id as string)
    return redirect(
      `/assessment/${params.assessmentId}/${params.sectionId}/${started?.questions[0].id}`
    )
  }
  return { section, candidateSection, params, candidateTests }
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
  return <Cooldown />
}
