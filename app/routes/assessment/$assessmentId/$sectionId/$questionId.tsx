import type { ActionFunction, LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import Question from '~/components/assessment/Question'
import {
  endAssessment,
  endCurrentSection,
  getCandidateTestForSideNav,
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
  const candidateTest = await getCandidateTestForSideNav(
    params.assessmentId as string
  )
  const lastSection = candidateTest?.sections.length == section?.order

  return { question, section, lastSection }
}

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData()
  const next = formData.get('next')
  const previous = formData.get('previous')
  const nextSection = formData.get('nextSection')
  const endExam = formData.get('endExam')
  const options: any = formData.getAll('option')
  const answers: any = formData.getAll('answer')

  console.log(...formData, '=====', options, answers)
  let nextQuestionId = null
  console.log(
    '================',
    options && (typeof options == 'string' ? [options] : options)
  )

  if (next || nextSection) {
    nextQuestionId = await skipAndNextQuestion({
      selectedOptions:
        options && (typeof options == 'string' ? [options] : options),
      answers: answers,
      sectionId: params.sectionId as string,
      currentQuestionId: params.questionId as string,
      nextOrPrev: 'next',
    })
  }
  if (previous) {
    nextQuestionId = await skipAndNextQuestion({
      selectedOptions:
        options && (typeof options == 'string' ? [options] : options),
      answers: answers,
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
  if (endExam) {
    await endCurrentSection(
      params.assessmentId as string,
      params.sectionId as string
    )
    await endAssessment(params.assessmentId as string)
    return redirect(`/assessment/${params.assessmentId}/end-assessment`)
  }

  return redirect(
    `/assessment/${params.assessmentId}/${params.sectionId}/${nextQuestionId}`
  )
}

export default function AssessmentQuestionForSection() {
  return <Question />
}
