import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import Question from '~/components/assessment/Question'
import {
  getCandidateTestForSideNav,
  skipAndNextQuestion,
  startAndGetQuestion,
} from '~/models/candidate.server'

export const loader: LoaderFunction = async ({ params, request }) => {
  const question = await startAndGetQuestion(params.questionId as string)
  const candidateTest = await getCandidateTestForSideNav(
    params.assessmentId as string
  )
  return { question, candidateTest }
}

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
  console.log('params', params)
  // need to write script for submiting answers
  // currently it only has navigations
  const next = await skipAndNextQuestion(
    params.sectionId as string,
    params.questionId as string
  )
  console.log('next', next)

  console.log(...formData)
  return null
}

export default function AssessmentQuestionForSection() {
  return <Question />
}
