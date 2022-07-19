import { Icon } from '@iconify/react'
import type { Question } from '~/interface/Interface'

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
      className="rounded-lg border border-gray-300 bg-gray-50 px-6 py-7"
    >
      <div className="flex items-center justify-between text-base text-gray-600 ">
        {question.question}
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
          'overflow-hidden text-base text-gray-600 transition-all ' +
          (isExpanded === index ? 'max-h-96' : 'max-h-0')
        }
      >
        {question.question}
        <br />
        {question.question}
        <br />
        {question.question}
        <br />
      </div>
    </div>
  )
}

export default QuestionCard
