import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import type {
  Question,
  Option,
  CorrectAnswer,
  QuestionType,
} from '~/interface/Interface'
import OptionCard from './OptionCard'

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
  const displayName =
    question.questionType?.displayName === 'Multiple Choice'
      ? { name: 'MSQ', full: 'Multiple Select Question' }
      : question.questionType?.displayName === 'Single Choice'
      ? { name: 'MCQ', full: 'Multiple Choice Question' }
      : { name: question.questionType?.displayName, full: 'Text' }
  return (
    <div
      key={question.id}
      className="flex cursor-pointer flex-col rounded-lg border border-gray-300 bg-gray-50 px-6 py-7"
      title={t('sectionsConstants.expand')}
      tabIndex={0}
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
        <div className="ql-editor p-0">
          <div
            className="question flex-1 cursor-pointer flex-row"
            dangerouslySetInnerHTML={{
              __html: question.question,
            }}
          ></div>
        </div>
        <div className="flex min-w-fit items-center justify-between lg:flex-1 lg:justify-end lg:gap-2">
          <div>
            <span
              className="flex flex-1 items-center rounded-52 border border-gray-700 px-3 text-sm text-gray-700"
              title={displayName?.full}
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
      >
        {question?.options && (
          <div className="grid grid-cols-1 gap-4 pt-6 ">
            {question.options?.map((option: Option) => {
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
