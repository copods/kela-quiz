import type { LoaderFunction } from '@remix-run/server-runtime'
import Question from '~/components/assessment/Question'
import { startAndGetQuestion } from '~/models/candidate.server'

export const loader: LoaderFunction = async ({ params, request }) => {
  const question = await startAndGetQuestion(params.questionId as string)
  return { ...question }
}

export default function AssessmentQuestionForSection() {
  return <Question />
}
