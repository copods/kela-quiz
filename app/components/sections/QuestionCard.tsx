import { useState } from "react"

import { Icon } from "@iconify/react"
import { useSubmit } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import type { CorrectAnswer } from "../../interface/Interface"
import { QuestionTypes } from "../../interface/Interface"
import DeletePopUp from "../common-components/DeletePopUp"

import OptionCard from "./OptionCard"

import type { Question, Option, QuestionType } from "~/interface/Interface"
const QuestionCard = ({
  question,
  expandedIndex,
  onAccordianToggle,
  index,
  deletePermission,
}: {
  question: Question & {
    questionType?: QuestionType
  }
  expandedIndex: number
  onAccordianToggle: (e: number) => void
  index: number
  deletePermission: boolean
}) => {
  const [openDeleteQuestionPopUp, setOpenDeleteQuestionPopUp] = useState(false)
  const [hoverState, setHoverState] = useState(false)
  const submit = useSubmit()
  const deleteQuestion = () => {
    submit({ action: "deleteQuestion", id: question.id }, { method: "post" })
  }
  const { t } = useTranslation()
  const displayName =
    question.questionType?.value === QuestionTypes.multipleChoice
      ? {
          name: t("sectionsConstants.msq"),
          full: t("sectionsConstants.multipleSelectQuestion"),
        }
      : question.questionType?.value === QuestionTypes.singleChoice
      ? {
          name: t("sectionsConstants.mcq"),
          full: t("sectionsConstants.multipleChoiceQuestion"),
        }
      : { name: question.questionType?.displayName, full: "Text" }
  return (
    <div
      key={question.id}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      className="flex cursor-pointer flex-col rounded-lg border border-gray-300 bg-gray-50 px-6 py-7"
      title={t("sectionsConstants.expand")}
      tabIndex={0}
      id="question-card-wrapper"
      data-cy="question-card-wrapper"
      aria-label={t("sectionsConstants.expand")}
      role={t("sectionsConstants.expand")}
      onKeyUp={(e) => {
        if (e.key === "Enter")
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
      <div className="flex">
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
            {deletePermission && hoverState ? (
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
                  if (e.key === "Enter")
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
                icon={"akar-icons:circle-chevron-up"}
                className="cursor-pointer text-xl text-gray-400"
              />
            ) : (
              <Icon
                icon={"akar-icons:circle-chevron-down"}
                className="cursor-pointer text-xl text-gray-400"
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={
          "overflow-scroll text-base text-gray-600 transition-all " +
          (expandedIndex === index ? "h-full" : "max-h-0")
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
        {question?.correctAnswer && (
          <div className="grid grid-cols-1 gap-4 pt-6 ">
            {question.correctAnswer?.map((answer: CorrectAnswer) => (
              <div key={answer.id}>
                <OptionCard
                  option={answer}
                  Questiontype={question.questionType}
                />
              </div>
            ))}
          </div>
        )}
        {
          <DeletePopUp
            setOpen={setOpenDeleteQuestionPopUp}
            open={openDeleteQuestionPopUp}
            onDelete={deleteQuestion}
            deleteItemType={t("candidateExamConstants.question")}
          />
        }
      </div>
    </div>
  )
}

export default QuestionCard
