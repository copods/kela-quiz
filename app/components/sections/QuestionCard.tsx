import { Icon } from '@iconify/react'

import type { Question, Option, CorrectAnswer } from '~/interface/Interface'
import OptionCard from './OptionCard'

const QuestionCard = ({
  question,
  isExpanded,
  onAccordianToggle,
  index,
}: {
  question: Question
  isExpanded: number
  onAccordianToggle: (e: number) => void
  index: number
}) => {
  return (
    <div
      key={question.id}
      className="flex flex-col rounded-lg border border-gray-300 bg-gray-50 px-6 py-7"
    >
      <div className="items-top break flex justify-between text-base text-gray-600">
        <div
          className="items-top flex flex-1 justify-between"
          tabIndex={0}
          role='button'
          onKeyUp={(e) => {
            if (e.key === 'Enter')
              onAccordianToggle(
                isExpanded == -1 ? index : isExpanded == index ? -1 : index
              )
          }}
          onClick={() => {
            onAccordianToggle(
              isExpanded == -1 ? index : isExpanded == index ? -1 : index
            )
          }}
        >
          <div className="ql-editor flex-1 p-0 pr-4">
            <div
              className="cursor-pointer"
              dangerouslySetInnerHTML={{ __html: question.question }}
            ></div>
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
                  <OptionCard option={option} />
                </div>
              )
            })}
          </div>
        )}
        {question?.correctAnswer && (
          <div className="grid grid-cols-1 gap-4 pt-6 ">
            {question.correctAnswer?.map((answer: CorrectAnswer) => (
              <div key={answer.id}>
                <OptionCard option={answer} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionCard
