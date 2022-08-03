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
      <div className="items-top flex  justify-between overflow-ellipsis break-all text-base text-gray-600">
        {/* <div className="ql-editor flex-1 ">
          <div
            className="cursor-pointer"
            onClick={() => onAccordianToggle(index)}
            dangerouslySetInnerHTML={{ __html: question.question }}
          ></div>
        </div> */}

        {isExpanded === index ? (
          <div className="items-top flex flex-1 justify-between">
            <div className="ql-editor flex-1 ">
              <div
                className="cursor-pointer"
                onClick={() => onAccordianToggle(-1)}
                dangerouslySetInnerHTML={{ __html: question.question }}
              ></div>
            </div>
            <Icon
              icon={'akar-icons:circle-chevron-up'}
              className="mt-3 cursor-pointer text-xl text-gray-400"
              onClick={() => onAccordianToggle(-1)}
            />
          </div>
        ) : (
          <div className="items-top flex flex-1 justify-between">
            <div className="ql-editor flex-1 ">
              <div
                className="cursor-pointer"
                onClick={() => onAccordianToggle(index)}
                dangerouslySetInnerHTML={{ __html: question.question }}
              ></div>
            </div>
            <Icon
              icon={'akar-icons:circle-chevron-down'}
              className="mt-3 cursor-pointer text-xl text-gray-400"
              onClick={() => onAccordianToggle(index)}
            />
          </div>
        )}
      </div>
      <div
        className={
          'overflow-scroll text-base text-gray-600 transition-all ' +
          (isExpanded === index ? 'h-full' : 'max-h-0')
        }
      >
        <div className="grid grid-cols-1 gap-4 pt-6 ">
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
