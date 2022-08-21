import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import CandidateLayout from '~/components/layouts/CandidateLayout'
import { getCandidate } from '~/models/assessment.server'
import { candidateTest } from '~/utils/assessment.utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateTests = await candidateTest(params.assessmentId as string)
  const candidate = await getCandidate(params.assessmentId as string)
  return { candidateTests, candidate }
}

export default function CandidateAssessment() {
  const { candidate, candidateTests } = useLoaderData()
  return (
    <CandidateLayout candidate={candidate} candidateTest={candidateTests}>
      <div>Assessment Candidate Works.....!</div>
    </CandidateLayout>
  )
}
