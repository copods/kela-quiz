import { Icon } from '@iconify/react'
import { useLoaderData, useNavigate } from '@remix-run/react'
import { routes } from '~/constants/route.constants'
import ResultDetailsQuestionsPreview from './ResultDetailsQuestionsPreview'
import Divider from '../common-components/divider'
import type { SectionInCandidateTest } from '~/interface/Interface'

const ResultDetailBySections = () => {
  const resultDetailsLoaderData = useLoaderData()
  const sectionDetail = resultDetailsLoaderData.sectionDetail
  let navigate = useNavigate()
  return (
    <div className="flex h-full flex-col gap-5">
      <header className="flex flex-col gap-6">
        <div className="flex gap-5">
          <div
            onClick={() =>
              navigate(
                `/${resultDetailsLoaderData.params.workspaceId}${routes.resultGroupTest}/${resultDetailsLoaderData.params?.testId}/${resultDetailsLoaderData.params.candidateId}`
              )
            }
            className="flex items-center gap-4 "
            role={'button'}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                navigate(
                  `/${resultDetailsLoaderData.params.workspaceId}${routes.resultGroupTest}/${resultDetailsLoaderData.params?.testId}/${resultDetailsLoaderData.params.candidateId}`
                )
            }}
          >
            <Icon
              className="text-3xl font-semibold text-gray-900"
              id="backButton"
              icon="mdi:arrow-left"
            ></Icon>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold text-gray-900" id="title">
              {sectionDetail.candidateTest?.candidate?.firstName}{' '}
              {sectionDetail.candidateTest?.candidate?.lastName}
            </h1>
            <hr className="h-5 w-px bg-gray-300" />
            <h1 className="text-3xl font-semibold text-gray-900" id="title">
              {sectionDetail.section?.name}
            </h1>
          </div>
        </div>
        <Divider height="1px" />
      </header>
      <div className="flex flex-col gap-6">
        {sectionDetail.questions.map(
          (questions: SectionInCandidateTest, index: number) => {
            return (
              <ResultDetailsQuestionsPreview
                key={questions.id}
                textAnswer={questions.answers}
                status={questions.status}
                selectedOptions={questions.selectedOptions}
                question={questions.question.question}
                correctAnswer={questions.question.correctAnswer}
                correctOption={questions.question.correctOptions}
                checkOrder={questions.question.checkOrder}
                questionType={questions.question.questionType}
                index={index + 1}
              />
            )
          }
        )}
      </div>
    </div>
  )
}
export default ResultDetailBySections
