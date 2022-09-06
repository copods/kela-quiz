import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'
import ExamCompletedCandidatesComponent from '~/components/results/ExamCompletedCandidatesList'
import { statusCheck } from '~/constants/common.constants'
import { getResultsOfCandidatesByTestId } from '~/models/result.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.testId, 'resultId not found')
  const attendedCandidateForTest = await getResultsOfCandidatesByTestId({
    testId: params.testId,
  })
  if (!attendedCandidateForTest) {
    throw new Response(statusCheck.notFound, { status: 404 })
  }

  return json({ attendedCandidateForTest, params })
}

const Attended = () => {
  return <ExamCompletedCandidatesComponent />
}

export default Attended
