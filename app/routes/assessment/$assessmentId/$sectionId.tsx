import { Outlet, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
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
  console.log(candidateNextRoute)
  if (typeof candidateNextRoute === 'string') {
    return redirect(candidateNextRoute)
  } else if (candidateNextRoute === null) {
    throw new Response('Not Found', { status: 404 })
  }

  const section = await getTestSectionDetails(params.sectionId as string)
  const candidateTets = await getCandidateTestForSideNav(
    params.assessmentId as string
  )
  const candidate = await getCandidate(params.assessmentId as string)
  return { section, candidateTets, candidate }
}

export default function AssessmentSection() {
  const { section, candidateTets, candidate } = useLoaderData()
  return (
    <CandidateLayout candidate={candidate} candidateTest={candidateTets}>
      <div className="flex flex-col gap-9">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            {section.section.name}
          </h1>
          <div className="text-lg font-medium text-gray-800">Time: 04:32</div>
        </div>
        <Outlet />
      </div>
    </CandidateLayout>
  )
}
