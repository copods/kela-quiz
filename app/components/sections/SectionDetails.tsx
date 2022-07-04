import { useState } from 'react'
import type { Question, Section } from '@prisma/client'
import AddQuestion from './AddQuestion'
import QuestionCard from "./QuestionCard"


const SectionDetails = ({ sectionDetails }: { sectionDetails: (Section & { questions: Question[]; }) | null }) => {
  const [addQuestionModal, setAddQuestionModalValue] = useState(false)
  const [currentAccordian, setOpenAccordian] = useState(-1)
  const [search, setSearch] = useState('')



  return (
    <div className="w-full px-9 py-6 h-full bg-white border border-gray-200 rounded-2xl flex flex-col gap-6 overflow-auto" >
      <h2 className="text-2xl font-semibold text-gray-700">{sectionDetails?.name}</h2>
      <hr className="-mt-2 border-0 h-px bg-gray-300 w-full" />
      <div className="flex justify-between items-center">
        <input type="text" name="search" className="w-48 h-9 rounded-lg border border-gray-200 text-sm px-3" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        <button className="px-5 h-9 text-[#F0FDF4] bg-primary rounded-lg text-xs" onClick={() => setAddQuestionModalValue(!addQuestionModal)} >+ Add Question</button>
      </div>

      {/* QUESTION LIST  */}

      {sectionDetails?.questions
        .filter((question: Question) => {
          return question.question.toLowerCase().includes(search.toLowerCase())
        })
        .map((question: Question, i: number) => {
          return (
            <QuestionCard key={question.id} question={question} currentAccordian={currentAccordian} setOpenAccordian={setOpenAccordian} index={i} />
          )
        })}

      {
        sectionDetails?.questions.length === 0 && <div className='flex justify-center p-7'>No Record Found</div>
      }

      {/* ADD QUESTIONS  */}
      <AddQuestion addQuestionModal={addQuestionModal} setAddQuestionModalValue={setAddQuestionModalValue} />
    </div >
  )
}

export default SectionDetails