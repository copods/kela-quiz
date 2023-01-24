import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import type {
  Question,
  Option,
  QuestionType,
  SectionInTest,
} from '~/interface/Interface'
import OptionCard from './OptionCard'
import { QuestionTypes } from '../../interface/Interface'
import { useState } from 'react'
import { useSubmit } from '@remix-run/react'
import DeletePopUp from '../common-components/DeletePopUp'
const QuestionCard = ({
  question,
  expandedIndex,
  onAccordianToggle,
  index,
  sectionInTest,
  totalQuestionInSection,
}: {
  question: Question & {
    questionType?: QuestionType
    // candidateQuestion?: CandidateQuestion[]
  }
  expandedIndex: number
  onAccordianToggle: (e: number) => void
  index: number
  sectionInTest: SectionInTest[]
  totalQuestionInSection: number
}) => {
  const [openDeleteQuestionPopUp, setOpenDeleteQuestionPopUp] = useState(false)
  const [hoverState, setHoverState] = useState(false)
  const submit = useSubmit()
  const deleteQuestion = () => {
    submit({ action: 'deleteQuestion', id: question.id }, { method: 'post' })
  }
  // filter the array (only assessment which not deleted)
  const filterTest = sectionInTest.filter((test: SectionInTest) => {
    return test.test.deleted === false
  })
  // create the array of totalQuestions
  const totalQuestionArray = filterTest.map((data: SectionInTest) => {
    return data.totalQuestions
  })
  //  sort it by higher to low time
  // because if section is used in multiple assessment so have to check the where
  // higher number of question is selected from the specific test
  const sortTotalTime = totalQuestionArray.sort((a: any, b: any) => {
    return b - a
  })

  const { t } = useTranslation()
  const displayName =
    question.questionType?.value === QuestionTypes.multipleChoice
      ? {
          name: t('sectionsConstants.msq'),
          full: t('sectionsConstants.multipleSelectQuestion'),
        }
      : question.questionType?.value === QuestionTypes.singleChoice
      ? {
          name: t('sectionsConstants.mcq'),
          full: t('sectionsConstants.multipleChoiceQuestion'),
        }
      : { name: question.questionType?.displayName, full: 'Text' }
  return (
    <div
      key={question.id}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      className="flex cursor-pointer flex-col rounded-lg border border-gray-300 bg-gray-50 px-6 py-7"
      title={t('sectionsConstants.expand')}
      tabIndex={0}
      id="question-card-wrapper"
      data-cy="question-card-wrapper"
      aria-label={t('sectionsConstants.expand')}
      role={t('sectionsConstants.expand')}
      onKeyUp={(e) => {
        if (e.key === 'Enter')
          onAccordianToggle(
            expandedIndex === -1 ? index : expandedIndex === index ? -1 : index
          )
      }}
      onClick={() => {
        onAccordianToggle(
          expandedIndex === -1 ? index : expandedIndex === index ? -1 : index
        )
      }}
    >
      <div className="break flex flex-col-reverse items-start justify-between gap-6 text-base text-gray-600 xl:flex-row">
        <div className="ql-editor !min-h-full p-0">
          <div
            className="question flex-1 cursor-pointer flex-row"
            dangerouslySetInnerHTML={{
              __html: question.question,
            }}
          ></div>
        </div>
        <div className="flex min-w-fit items-center justify-between lg:flex-1 lg:justify-end lg:gap-2">
          <div className="flex items-center">
            {hoverState ? (
              <Icon
                tabIndex={0}
                data-cy="delete-question"
                role="button"
                aria-label="delete question button"
                onClick={(e) => {
                  setOpenDeleteQuestionPopUp(!openDeleteQuestionPopUp)
                  e.stopPropagation()
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter')
                    setOpenDeleteQuestionPopUp(!openDeleteQuestionPopUp)
                  e.stopPropagation()
                }}
                icon="ic:outline-delete-outline"
                className="h-5 w-5"
              />
            ) : (
              <span
                id="question-type"
                title={displayName?.full}
                className="flex flex-1 items-center rounded-52 border border-gray-700 px-3 text-sm text-gray-700"
              >
                {displayName?.name}
              </span>
            )}
          </div>
          <div>
            {expandedIndex === index ? (
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
      </div>
      <div
        className={
          'overflow-scroll text-base text-gray-600 transition-all ' +
          (expandedIndex === index ? 'h-full' : 'max-h-0')
        }
        id="options-wrapper"
      >
        {question?.options && (
          <div className="grid grid-cols-1 gap-4 pt-6 ">
            {question.options?.map((option: Option) => {
              return (
                <div key={option.id}>
                  <OptionCard
                    option={option}
                    Questiontype={question.questionType}
                  />
                </div>
              )
            })}
          </div>
        )}
        {question?.candidateQuestion.length > 0 &&
        totalQuestionInSection > sortTotalTime[0] ? (
          <DeletePopUp
            setOpen={setOpenDeleteQuestionPopUp}
            open={openDeleteQuestionPopUp}
            onDelete={deleteQuestion}
            deleteItemType={t('candidateExamConstants.question')}
            warning={t('sectionsConstants.testMayAffectWarning')}
          />
        ) : totalQuestionInSection <= sortTotalTime[0] ? (
          <DeletePopUp
            setOpen={setOpenDeleteQuestionPopUp}
            open={openDeleteQuestionPopUp}
            onDelete={deleteQuestion}
            deleteItemType={t('candidateExamConstants.question')}
            warning={t('sectionsConstants.questionNotDeleted')}
            isHide={true}
          />
        ) : (
          <DeletePopUp
            setOpen={setOpenDeleteQuestionPopUp}
            open={openDeleteQuestionPopUp}
            onDelete={deleteQuestion}
            deleteItemType={t('candidateExamConstants.question')}
          />
        )}
      </div>
    </div>
  )
}

export default QuestionCard
