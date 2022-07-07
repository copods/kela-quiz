import { Icon } from "@iconify/react"
import type { Question } from "../Interface";

const QuestionCard = ({ question, isExpanded, onAccordianToggle, index }: { question: Question, isExpanded: number, onAccordianToggle: (e: number) => void, index: number }) => {

  return (
    <div key={question.id} className="border border-gray-300 rounded-2xl bg-gray-50 px-6 py-7" >
      <div className='flex items-center justify-between text-gray-600 text-base '>
        {question.question}
        {
          isExpanded === index
            ?
            <Icon icon={'akar-icons:circle-chevron-up'} className="text-gray-400 text-xl cursor-pointer" onClick={() => onAccordianToggle(-1)} />
            :
            <Icon icon={'akar-icons:circle-chevron-down'} className="text-gray-400 text-xl cursor-pointer" onClick={() => onAccordianToggle(index)} />
        }
      </div>
      <div className={'text-gray-600 text-base transition-all overflow-hidden ' + (isExpanded === index ? 'max-h-96' : 'max-h-0')}>
        {question.question}<br />
        {question.question}<br />
        {question.question}<br />

      </div>
    </div>
  )
}

export default QuestionCard