import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import CandidateLayout from '~/components/layouts/CandidateLayout'
import {
  getCandidate,
  getCandidateTestForSideNav,
} from '~/models/candidate.server'

export const loader: LoaderFunction = async ({ params, request }) => {
  const candidateTets = await getCandidateTestForSideNav(
    params.assessmentId as string
  )
  const candidate = await getCandidate(params.assessmentId as string)
  return { candidateTets, candidate }
}

export default function CandidateAssessment() {
  const { candidate, candidateTets } = useLoaderData()
  return (
    <CandidateLayout candidate={candidate} candidateTest={candidateTets}>
      <div>Assessment Candidate Works.....!</div>
    </CandidateLayout>
  )
}
