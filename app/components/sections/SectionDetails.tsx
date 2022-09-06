import { useLoaderData, useNavigate } from '@remix-run/react'
import { useState } from 'react'
import type { Question } from '~/interface/Interface'
import QuestionCard from './QuestionCard'
import { addQuestion, sectionsConstants } from '~/constants/common.constants'
import Button from '../form/Button'
import { routes } from '~/constants/route.constants'

const SectionDetails = () => {
  const sectionDetails = useLoaderData()
  const [currentAccordian, setCurrentAccordian] = useState(-1)
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()
  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-auto break-all rounded-lg border border-gray-200 bg-white px-9 py-6">
      <div className='flex'>
      <h2 className="text-2xl font-semibold text-gray-700 inline-block"
        tabIndex={0}
        role={sectionDetails.sectionDetails?.name}
        title={sectionDetails.sectionDetails?.name}
        aria-label={sectionDetails.sectionDetails?.name}
      >
        {sectionDetails.sectionDetails?.name}
      </h2>
      </div>
      <hr className="-mt-2 h-px w-full border-0 bg-gray-300" />
      <div className="flex items-start justify-between gap-2 md:flex-col xl:flex-row xl:items-center">
        <input
          tabIndex={0}
          id="section-search"
          type="text"
          name="search"
          className="h-9 w-48 rounded-lg border border-gray-200 px-3 text-sm"
          placeholder={sectionsConstants.search}
          title={sectionsConstants.search}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          tabIndex={0}
          onClick={() => navigate(`${routes.sections}/${sectionDetails.sectionDetails?.id}${routes.addQuestion}`)}
          id='add-question'
          className='h-9 px-5'
          buttonText={`+ ${addQuestion.addQuestion}`}
          varient='primary-solid'
          title={addQuestion.addQuestion}
          aria-label={addQuestion.addQuestion}
        />
      </div>
      {/* QUESTION LIST  */}
      {sectionDetails.sectionDetails?.questions
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
      {sectionDetails.sectionDetails?.questions.length === 0 && (
        <div className="flex justify-center p-7">
          {sectionsConstants.noQuestionAlert}
        </div>
      )}
    </div>
  )
}

export default SectionDetails
