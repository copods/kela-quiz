import type { LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'
import ExamPendingComponent from '~/components/results/ExamPending'
import { getPendingExamCandidateByTestId } from '~/models/result.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.testId, 'resultId not found')
  const testPreview = await getPendingExamCandidateByTestId({
    id: params.testId,
  })
  if (!testPreview) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ testPreview })
}
const ExamPending = () => {
  return <ExamPendingComponent />
}

export default ExamPending
