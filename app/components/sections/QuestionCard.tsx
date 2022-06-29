import { Icon } from "@iconify/react"
import type { Question } from "@prisma/client";

const QuestionCard = ({ question, currentAccordian, setOpenAccordian, index }: { question: Question, currentAccordian: number, setOpenAccordian: (e: number) => void, index: number }) => {

  return (
    <div key={question.id} className="border border-gray-300 rounded-2xl bg-gray-50 px-6 py-7" >
      <div className='flex items-center justify-between text-gray-600 text-base '>
        {question.question}
        {
          currentAccordian === index
            ?
            <Icon icon={'akar-icons:circle-chevron-up'} className="text-gray-400 text-xl cursor-pointer" onClick={() => setOpenAccordian(-1)} />
            :
            <Icon icon={'akar-icons:circle-chevron-down'} className="text-gray-400 text-xl cursor-pointer" onClick={() => setOpenAccordian(index)} />
        }
      </div>
      <div className={'text-gray-600 text-base transition-all overflow-hidden ' + (currentAccordian === index ? 'max-h-96' : 'max-h-0')}>
        {question.question}<br />
        {question.question}<br />
        {question.question}<br />

      </div>
    </div>
  )
}

export default QuestionCard