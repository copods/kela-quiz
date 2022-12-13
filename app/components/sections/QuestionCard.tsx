import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import type {
  Question,
  Option,
  CorrectAnswer,
  QuestionType,
} from '~/interface/Interface'
import OptionCard from './OptionCard'
import { QuestionTypes } from '../../interface/Interface'
import { useLoaderData, useNavigate } from '@remix-run/react'

const QuestionCard = ({
  question,
  isExpanded,
  onAccordianToggle,
  index,
}: {
  question: Question & { questionType?: QuestionType }
  isExpanded: number
  onAccordianToggle: (e: number) => void
  index: number
}) => {
  const { t } = useTranslation()
  const loaderData = useLoaderData()
  const displayName =
    question.questionType?.value === QuestionTypes.multipleChoice
      ? {
          name: t('sectionsConstants.msq'),
          full: t('sectionsConstants.multipleSelectQuestion'),
        }
      : question.questionType?.value === QuestionTypes.singleChoice
      ? {
          name: t('sectionsConstants.mcq'),
          full: t('sectionsConstants.multipleChoiceQuestion'),
        }
      : { name: question.questionType?.displayName, full: 'Text' }
  const navigate = useNavigate()
  return (
    <div
      key={question.id}
      className="flex cursor-pointer flex-col rounded-lg border border-gray-300 bg-gray-50 px-6 py-7"
      title={t('sectionsConstants.expand')}
      tabIndex={0}
      id="question-card-wrapper"
      aria-label={t('sectionsConstants.expand')}
      role={t('sectionsConstants.expand')}
      onKeyUp={(e) => {
        if (e.key === 'Enter')
          onAccordianToggle(
            isExpanded === -1 ? index : isExpanded === index ? -1 : index
          )
      }}
      onClick={() => {
        onAccordianToggle(
          isExpanded === -1 ? index : isExpanded === index ? -1 : index
        )
      }}
    >
      <div className="break flex flex-col-reverse items-start justify-between gap-6 text-base text-gray-600 xl:flex-row">
        <div className="ql-editor !min-h-full p-0">
          <div
            className="question flex-1 cursor-pointer flex-row"
            dangerouslySetInnerHTML={{
              __html: question.question,
            }}
          ></div>
        </div>
        <div className="flex min-w-fit items-center justify-between lg:flex-1 lg:justify-end lg:gap-2">
          <div>
            <button
              title="Edit question"
              onClick={(e) => {
                e.stopPropagation()
                navigate(
                  `/${loaderData.currentWorkspaceId}/tests/${loaderData.sectionDetails.id}/add-question?questionid=${question.id}`
                )
              }}
            >
              Edit
            </button>
            <span
              id="question-type"
              title={displayName?.full}
              className="flex flex-1 items-center rounded-52 border border-gray-700 px-3 text-sm text-gray-700"
            >
              {displayName?.name}
            </span>
          </div>
          {isExpanded === index ? (
            <Icon
              icon={'akar-icons:circle-chevron-up'}
              className="cursor-pointer text-xl text-gray-400"
            />
          ) : (
            <Icon
              icon={'akar-icons:circle-chevron-down'}
              className="cursor-pointer text-xl text-gray-400"
            />
          )}
        </div>
      </div>
      <div
        className={
          'overflow-scroll text-base text-gray-600 transition-all ' +
          (isExpanded === index ? 'h-full' : 'max-h-0')
        }
        id="options-wrapper"
      >
        {question?.options && (
          <div className="grid grid-cols-1 gap-4 pt-6 ">
            {question.options?.map((option: Option) => {
              if (option.deleted) {
                return null
              }
              return (
                <div key={option.id}>
                  <OptionCard
                    option={option}
                    Questiontype={question.questionType}
                  />
                </div>
              )
            })}
          </div>
        )}
        {question?.correctAnswer && (
          <div className="grid grid-cols-1 gap-4 pt-6 ">
            {question.correctAnswer?.map((answer: CorrectAnswer) => (
              <div key={answer.id}>
                <OptionCard
                  option={answer}
                  Questiontype={question.questionType}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionCard
