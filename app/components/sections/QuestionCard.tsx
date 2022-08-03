import { Icon } from '@iconify/react'

import type { Question, Option } from '~/interface/Interface'

import OptionsCard from './OptionsCard'

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
      className="flex flex-col  rounded-lg border border-gray-300 bg-gray-50 px-6 py-7"
    >
      <div className="flex items-center justify-between overflow-ellipsis break-all text-base text-gray-600">
        <div className="ql-editor flex-1">
          <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
        </div>

        {isExpanded === index ? (
          <Icon
            icon={'akar-icons:circle-chevron-up'}
            className="cursor-pointer text-xl text-gray-400"
            onClick={() => onAccordianToggle(-1)}
          />
        ) : (
          <Icon
            icon={'akar-icons:circle-chevron-down'}
            className="cursor-pointer text-xl text-gray-400"
            onClick={() => onAccordianToggle(index)}
          />
        )}
      </div>
      <div
        className={
          'overflow-scroll text-base text-gray-600 transition-all ' +
          (isExpanded === index ? 'max-h-96' : 'max-h-0')
        }
      >
        <div className="grid grid-cols-1 gap-4 pt-6">
          {question.options?.map((options: Option, index: number) => {
            return (
              <div key={options.id}>
                <OptionsCard options={options} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
