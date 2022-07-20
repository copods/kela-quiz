import { useState } from 'react'
import type { Question, Section } from '~/interface/Interface'
import QuestionCard from './QuestionCard'

const SectionDetails = ({
  sectionDetails,
}: {
  sectionDetails: (Section & { questions: Question[] }) | null
}) => {
  const [currentAccordian, setCurrentAccordian] = useState(-1)
  const [searchText, setSearchText] = useState('')

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-auto rounded-lg border border-gray-200 bg-white px-9 py-6">
      <h2 className="text-2xl font-semibold text-gray-700">
        {sectionDetails?.name}
      </h2>
      <hr className="-mt-2 h-px w-full border-0 bg-gray-300" />
      <div className="flex items-center justify-between">
        <input
          type="text"
          name="search"
          className="h-9 w-48 rounded-lg border border-gray-200 px-3 text-sm"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="h-9 rounded-lg bg-primary px-5 text-xs text-[#F0FDF4]">
          + Add Question
        </button>
      </div>

      {/* QUESTION LIST  */}

      {sectionDetails?.questions
        .filter((question: Question) => {
          return question.question
            .toLowerCase()
            .includes(searchText.toLowerCase())
        })
        .map((question: Question, i: number) => {
          return (
            <QuestionCard
              key={question.id}
              question={question}
              isExpanded={currentAccordian}
              onAccordianToggle={setCurrentAccordian}
              index={i}
            />
          )
        })}

      {sectionDetails?.questions.length === 0 && (
        <div className="flex justify-center p-7">
          No questions found. Add your first question
        </div>
      )}
    </div>
  )
}

export default SectionDetails
