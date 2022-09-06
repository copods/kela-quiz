import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'
import ExamAttendedCandidatesComponent from '~/components/results/AttendedCandidatesList'
import { statusCheck } from '~/constants/common.constants'
import { getTestAttendedCandiated } from '~/models/result.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.testId, 'resultId not found')
  const attendedCandidateForTest = await getTestAttendedCandiated({
    id: params.testId,
  })
  if (!attendedCandidateForTest) {
    throw new Response(statusCheck.notFound, { status: 404 })
  }

  return json({ attendedCandidateForTest })
}

const Attended = () => {
  return <ExamAttendedCandidatesComponent />
}

export default Attended
