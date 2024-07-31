/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useEffect, useState } from "react"

import { useActionData, useLoaderData, useSubmit } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"

import Button from "../common-components/Button"
import Loading from "../common-components/Loading"

import { QuestionTypes } from "~/interface/Interface"

const CSVQuestionUploadDrawer = ({ open, setOpen, data, setData }: any) => {
  const [invalidQuestions, setInvalidQuestions] = useState(0)
  const [loading, setLoading] = useState(false)
  const { sectionDetails, questionTypes } = useLoaderData()

  const { t } = useTranslation()
  const submit = useSubmit()

  const getOption = (optionsArr: any, option: string) =>
    optionsArr.split(",").includes(option)

  useEffect(() => {
    setInvalidQuestions(
      data.questions.filter((_: any, index: number) => {
        if (!_.A || !_.B) {
          _.selected = false
          _.disabled = true
          return true
        }
        if (
          getOption(_.Answer, "A") &&
          getOption(_.Answer, "B") &&
          getOption(_.Answer, "C") &&
          getOption(_.Answer, "D")
        ) {
          _.selected = false
          _.disabled = true
          return true
        }

        if (
          _.Answer.split(",").some(
            (_: string) => !["A", "B", "C", "D"].includes(_)
          )
        ) {
          _.selected = false
          _.disabled = true
          _.incorrectAnswer = true
          return true
        }

        const tempKeys: any = Object.keys(_).map((key) => {
          return _[key] ? key : null
        })

        if (
          !_.Answer.split(",").every((element: any) =>
            tempKeys.includes(element)
          )
        ) {
          console.log("x", tempKeys, tempKeys.includes(_.Answer), _.Answer)
          _.selected = false
          _.disabled = true
          return true
        }
        sectionDetails?.questions?.forEach((question: any) => {
          if (question.question === _.Question) {
            _.selected = false
            _.warn = true
            return true
          }
        })
      }).length
    )
  }, [open])

  const saveQuestion = () => {
    let questions = []
    for (let question of data.questions) {
      if (question.selected) {
        let testQuestion: {
          question: string
          options: Array<{ id: string; option: string }>
          correctAnswer: Array<{ id: string; answer: string }>
          questionTypeId: string
          sectionId: string
          checkOrder: boolean
        } = {
          question: question.Question,
          options: [],
          correctAnswer: [],
          questionTypeId:
            question.Answer?.split(",")?.length == 1
              ? questionTypes.find(
                  (item: {
                    createdAt: string
                    displayName: string
                    id: string
                    updatedAt: string
                    value: string
                  }) => item.value === QuestionTypes.singleChoice
                )?.id
              : questionTypes.find(
                  (item: {
                    createdAt: string
                    displayName: string
                    id: string
                    updatedAt: string
                    value: string
                  }) => item.value === QuestionTypes.multipleChoice
                )?.id,

          sectionId: sectionDetails?.id as string,
          checkOrder: false,
        }

        if (question.A) {
          let optionForQuestion = {
            id: uuidv4(),
            option: question.A,
            isCorrect: getOption(question.Answer, "A"),
          }
          testQuestion.options.push(optionForQuestion)
        }
        if (question.B) {
          let optionForQuestion = {
            id: uuidv4(),
            option: question.B,
            isCorrect: getOption(question.Answer, "B"),
          }
          testQuestion.options.push(optionForQuestion)
        }
        if (question.C) {
          let optionForQuestion = {
            id: uuidv4(),
            option: question.C,
            isCorrect: getOption(question.Answer, "C"),
          }
          testQuestion.options.push(optionForQuestion)
        }
        if (question.D) {
          let optionForQuestion = {
            id: uuidv4(),
            option: question.D,
            isCorrect: getOption(question.Answer, "D"),
          }
          testQuestion.options.push(optionForQuestion)
        }
        questions.push(testQuestion)
      }
    }
    setLoading(true)
    setOpen(false)
    submit(
      {
        questionsData: JSON.stringify(questions),
        action: "add-question-by-csv",
      },
      { method: "post" }
    )
  }

  const actionData = useActionData()
  useEffect(() => {
    if (actionData?.msg === "success") {
      setLoading(false)
    }
  }, [actionData])

  const classes =
    "transition-right fixed top-0 bottom-0 h-full w-9/12 bg-white shadow-xl duration-300 ease-in-out rounded-lg p-5 z-50 flex overflow-hidden flex-col gap-3"
  return (
    <>
      {open && (
        <div className="backdrop fixed top-0 left-0 right-0 bottom-0 bg-slate-200 opacity-50"></div>
      )}
      <div className={`${classes} ${open ? "right-0" : "right-[-75%]"}`}>
        <div className="flex items-start justify-between font-semibold">
          <div>
            <h2>{data.fileName}</h2>
            <span className="text-xs font-normal text-slate-400">
              Total Questions: {data.questions?.length} ● Selected Questions:
              {data.questions.filter((_: any) => _.selected)?.length} ●{" "}
              {invalidQuestions > 0 && (
                <span className="text-red-500">
                  Invalid Questions: {invalidQuestions}
                </span>
              )}
            </span>
          </div>
          <button onClick={() => setOpen(false)}>&times;</button>
        </div>
        <div className="over flex flex-1 flex-col gap-3 overflow-auto">
          {/* <div className="font-normal">Questions</div> */}
          {data.questions.map((question: any, index: number) => (
            <div className="flex items-start gap-3" key={index}>
              <input
                type="checkbox"
                className="mt-3"
                checked={question.selected}
                onChange={() => {
                  setData((old: any) => {
                    const newQuestions = [...old.questions]
                    newQuestions[index].selected = !newQuestions[index].selected
                    return { ...old, questions: newQuestions }
                  })
                }}
                disabled={question.disabled}
              />
              <div
                key={index}
                className="flex flex-1 gap-1 rounded-xl border border-slate-200 bg-slate-100 p-2"
              >
                <div className="w-5">{index + 1}.</div>
                <div key={index} className="flex flex-col gap-1 ">
                  <div className="font-semibold">{question.Question}</div>
                  <div className="flex flex-col gap-1">
                    {question.A && (
                      <div className="flex items-center gap-3 text-sm">
                        <input
                          type={
                            question.Answer.split(",")?.length == 1
                              ? "radio"
                              : "checkbox"
                          }
                          name={`answer-${index}`}
                          value="A"
                          checked={getOption(question.Answer, "A")}
                        />
                        <span>{question.A}</span>
                      </div>
                    )}
                    {question.B && (
                      <div className="flex items-center gap-3 text-sm">
                        <input
                          type={
                            question.Answer.split(",")?.length == 1
                              ? "radio"
                              : "checkbox"
                          }
                          name={`answer-${index}`}
                          value="B"
                          checked={getOption(question.Answer, "B")}
                        />
                        <span>{question.B}</span>
                      </div>
                    )}
                    {question.C && (
                      <div className="flex items-center gap-3 text-sm">
                        <input
                          type={
                            question.Answer.split(",")?.length == 1
                              ? "radio"
                              : "checkbox"
                          }
                          name={`answer-${index}`}
                          value="C"
                          checked={getOption(question.Answer, "C")}
                        />
                        <span>{question.C}</span>
                      </div>
                    )}
                    {question.D && (
                      <div className="flex items-center gap-3 text-sm">
                        <input
                          type={
                            question.Answer.split(",")?.length == 1
                              ? "radio"
                              : "checkbox"
                          }
                          name={`answer-${index}`}
                          value="D"
                          checked={getOption(question.Answer, "D")}
                        />
                        <span>{question.D}</span>
                      </div>
                    )}
                  </div>
                  {question.disabled && (
                    <span className="text-xs text-red-600">
                      {question.incorrectAnswer
                        ? "Incorrect Answer"
                        : "Invalid Question"}
                    </span>
                  )}
                  {question.warn && (
                    <span className="text-xs text-yellow-500">
                      Question is repeated
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <Button
            tabIndex={0}
            type="button"
            id="cancel-delete-pop-up"
            variant="primary-outlined"
            className="px-5"
            title={t("commonConstants.cancel")}
            buttonText={t("commonConstants.cancel")}
            onClick={() => {
              if (setOpen !== undefined) setOpen(false)
            }}
          />
          <Button
            tabIndex={0}
            onClick={() => {
              saveQuestion()
            }}
            id="add-question"
            className="h-9 w-36 px-5"
            buttonText="Save"
            variant="primary-solid"
            title="Save"
            aria-label="Save"
          />
        </div>
      </div>
      {loading && <Loading />}
    </>
  )
}

export default CSVQuestionUploadDrawer
