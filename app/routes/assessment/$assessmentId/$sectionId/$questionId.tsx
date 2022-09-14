import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import Question from '~/components/assessment/Question'
import {
  candidateTest,
  getQuestion,
  getSectionInTest,
  moveToNextSection,
  saveAnswerSkipAndNext,
  endCandidateAssessment,
} from '~/utils/assessment.utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const question = await getQuestion(params.questionId as string)

  const section = await getSectionInTest(params.sectionId as string)

  const candidateTests = await candidateTest(params.assessmentId as string)

  const lastSection = candidateTests?.sections.length == section?.order

  return { question, section, lastSection, candidateTests, params }
}

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
  const next = formData.get('next')
  const previous = formData.get('previous')
  const nextSection = formData.get('nextSection')
  const endExam = formData.get('endExam')
  const options: any = formData.getAll('option')
  const answers: any = formData.getAll('answer')

  console.log(options, 'options')

  let nextQuestionId = null

  if (next || nextSection || endExam) {
    nextQuestionId = await saveAnswerSkipAndNext(
      options,
      answers,
      params.sectionId as string,
      params.questionId as string,
      'next'
    )
  }
  if (previous) {
    nextQuestionId = await saveAnswerSkipAndNext(
      options,
      answers,
      params.sectionId as string,
      params.questionId as string,
      'prev'
    )
  }

  if (nextSection) {
    const nextSecRoute = await moveToNextSection({
      assessmentId: params.assessmentId as string,
      order: parseInt(nextSection as string),
      sectionId: params.sectionId as string,
    })
    if (typeof nextSecRoute === 'string') return redirect(nextSecRoute)
  }

  if (endExam) {
    await endCandidateAssessment(
      params.assessmentId as string,
      params.sectionId as string
    )
  }

  return redirect(
    `/assessment/${params.assessmentId}/${params.sectionId}/${nextQuestionId}`
  )
}

const AssessmentQuestionForSection = () => {
  return <Question />
}

export default AssessmentQuestionForSection
