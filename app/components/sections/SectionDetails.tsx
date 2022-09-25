import { useLoaderData, useNavigate } from '@remix-run/react'
import { useState } from 'react'
import type { Question } from '~/interface/Interface'
import QuestionCard from './QuestionCard'
import Button from '../form/Button'
import { routes } from '~/constants/route.constants'
import { useTranslation } from 'react-i18next'

const SectionDetails = () => {
  const { t } = useTranslation()

  const sectionDetails = useLoaderData()
  const [currentAccordian, setCurrentAccordian] = useState(-1)
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-auto break-all rounded-lg border border-gray-200 bg-white px-9 py-6">
      <div className="flex">
        <h2
          className="inline-block text-2xl font-semibold text-gray-700"
          tabIndex={0}
          role={sectionDetails.sectionDetails?.name}
          title={sectionDetails.sectionDetails?.name}
          aria-label={sectionDetails.sectionDetails?.name}
        >
          {sectionDetails.sectionDetails?.name}
        </h2>
      </div>
      <hr className="-mt-2 h-px w-full bg-gray-300" />
      <div className="flex items-start justify-between gap-2 md:flex-col xl:flex-row xl:items-center">
        <input
          tabIndex={0}
          id="section-search"
          type="text"
          name="search"
          placeholder={t('sectionsConstants.search')}
          title={t('sectionsConstants.search')}
          className="h-9 w-48 rounded-lg border border-gray-200 px-3 text-sm focus:outline-dotted"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          tabIndex={0}
          onClick={() =>
            navigate(
              `${routes.sections}/${sectionDetails.sectionDetails?.id}${routes.addQuestion}`
            )
          }
          id="add-question"
          className="h-9 px-5"
          buttonText={`+ ${t('addQuestion.addQuestion')}`}
          varient="primary-solid"
          title={t('addQuestion.addQuestion')}
          aria-label={t('addQuestion.addQuestion')}
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
          {t('sectionsConstants.noQuestionAlert')}
        </div>
      )}
    </div>
  )
}

export default SectionDetails
