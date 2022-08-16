import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import Question from '~/components/assessment/Question'
import {
  endCurrentSection,
  getOrderedSection,
  getTestInstructionForCandidate,
  getTestSectionDetails,
  skipAndNextQuestion,
  startAndGetQuestion,
  updateNextCandidateStep,
} from '~/models/candidate.server'

export const loader: LoaderFunction = async ({ params, request }) => {
  const question = await startAndGetQuestion(params.questionId as string)
  const section = await getTestSectionDetails(params.sectionId as string)

  return { question, section }
}

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
  const next = formData.get('next')
  const previous = formData.get('previous')
  const nextSection = formData.get('nextSection')
  const options: any = formData.get('option')

  console.log(...formData, options)
  console.log('op', JSON.parse(options))
  return
  let nextQuestionId = null
  if (next) {
    // need to write script for submiting answers
    // currently it only has navigations
    nextQuestionId = await skipAndNextQuestion({
      selectedOptions: [options],
      sectionId: params.sectionId as string,
      currentQuestionId: params.questionId as string,
      nextOrPrev: 'next',
    })
  }
  if (previous) {
    // need to write script for submiting answers
    // currently it only has navigations
    nextQuestionId = await skipAndNextQuestion({
      selectedOptions: [options],
      sectionId: params.sectionId as string,
      currentQuestionId: params.questionId as string,
      nextOrPrev: 'prev',
    })
  }

  if (nextSection) {
    const candidateTest = await getTestInstructionForCandidate(
      params.assessmentId as string
    )

    await endCurrentSection(
      params.assessmentId as string,
      params.sectionId as string
    )
    const nextSectionObject = await getOrderedSection(
      candidateTest?.test.id as string,
      parseInt(nextSection as string) + 1
    )
    await updateNextCandidateStep(params.assessmentId as string, {
      nextRoute: 'section',
      isSection: true,
      currentSectionId: nextSectionObject?.id,
    })

    return redirect(
      `/assessment/${params.assessmentId}/${nextSectionObject?.id}`
    )
  }

  return redirect(
    `/assessment/${params.assessmentId}/${params.sectionId}/${nextQuestionId}`
  )
}

export default function AssessmentQuestionForSection() {
  return <Question />
}
