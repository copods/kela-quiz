import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'
import ExamAttendedCandidatesComponent from '~/components/results/AttendedCandidatesList'
import { getResultsOfCandidatesByTestId } from '~/models/result.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.testId, 'resultId not found')
  const attendedCandidateForTest = await getResultsOfCandidatesByTestId({
    testId: params.testId,
  })
  if (!attendedCandidateForTest) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ attendedCandidateForTest })
}

const Attended = () => {
  return <ExamAttendedCandidatesComponent />
}

export default Attended
