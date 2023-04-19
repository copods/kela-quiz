import type { ChangeEvent } from "react"
import { useEffect, useState } from "react"

import { useLoaderData } from "@remix-run/react"

import Checkbox from "../form/CheckBox"

import CandidateQuestionFooter from "./CandidateQuestionFooter"
import CandidateQuestionHeader from "./CandidateQuestionHeader"
import CandidateQuestionStepper from "./CandidateQuestionStepper"

import type { Option } from "~/interface/Interface"
import { QuestionTypes } from "~/interface/Interface"

const Question = () => {
  const { question } = useLoaderData()
  const questionType = question?.question?.questionType?.value
  const [userAnswer, setUserAnswer] = useState(
    questionType === QuestionTypes.singleChoice
      ? question.selectedOptions[0]?.id
      : questionType === QuestionTypes.text
      ? question?.answers
      : question.selectedOptions.flatMap((option: Option) => option.id)
  )

  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault()
    }
    function ctrlShiftKey(e: KeyboardEvent, code: string) {
      return (
        (e.ctrlKey && e.shiftKey && e.code) ||
        (e.metaKey && e.shiftKey && e.code) === code
      )
    }

    document.onkeydown = (e) => {
      // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
      if (
        e.code === "F12" ||
        ctrlShiftKey(e, "KeyI") ||
        ctrlShiftKey(e, "KeyJ") ||
        ctrlShiftKey(e, "KeyC") ||
        ctrlShiftKey(e, "KeyK")
      )
        return false
    }
    document.addEventListener("contextmenu", handleContextmenu)
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu)
    }
  }, [])

  const onChangeHandle = (
    event:
      | Option
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>,
    index?: number
  ) => {
    if (questionType === QuestionTypes.singleChoice) {
      setUserAnswer((event as Option).id)
    }
    if (questionType === QuestionTypes.text) {
      setUserAnswer((oldVal: Array<string>) => {
        oldVal[index || 0] = (
          event as ChangeEvent<HTMLInputElement>
        ).target.value
        return [...oldVal]
      })
    }
    if (questionType === QuestionTypes.multipleChoice) {
      setUserAnswer((val: string[]) => {
        if (userAnswer.indexOf((event as Option).id) === -1) {
          return [...val, (event as Option).id]
        } else {
          val.splice(userAnswer.indexOf((event as Option).id), 1)
          return [...val]
        }
      })
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <CandidateQuestionHeader />

      <div className="flex w-full flex-1 flex-col overflow-hidden bg-questionBackground">
        <form method="post" className="flex max-h-full flex-1 flex-col">
          <div className="py-5 px-5">
            <CandidateQuestionStepper />
          </div>
          <div className="mx-5 mb-5 flex h-full overflow-auto rounded-lg border bg-white">
            <div
              className="flex h-full w-1/2 flex-col gap-8 border-r p-5"
              data-cy="questionSection"
            >
              <div className="flex items-center justify-between">
                <div className="flex text-xl font-medium">
                  <span>Question </span>
                </div>
              </div>
              <div className="ql-editor h-full flex-1 overflow-auto border-gray-200 bg-white p-0">
                <div
                  onSelect={(e) => e.preventDefault()}
                  onCopy={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  className="disable-text-selection font-normal"
                  dangerouslySetInnerHTML={{
                    __html: question?.question?.question,
                  }}
                />
              </div>
            </div>
            <div
              className="flex h-full w-1/2 flex-col gap-2 py-5"
              data-cy="answerSection"
            >
              <div className="flex items-center justify-between px-5">
                {questionType === QuestionTypes.singleChoice && (
                  <div className="flex text-xl font-medium">
                    Select Correct Option
                  </div>
                )}
                {questionType === QuestionTypes.multipleChoice && (
                  <div className="flex text-xl font-medium">
                    Select Correct Option's
                  </div>
                )}
                {questionType === QuestionTypes.text && (
                  <div className="flex text-xl font-medium">
                    Write Correct Answer
                  </div>
                )}
              </div>
              <div className="flex h-full flex-1 flex-col overflow-auto">
                {question?.question?.options.map(
                  (option: Option, i: number) => {
                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-start gap-4 border-b px-5 ${
                          option.id === userAnswer
                            ? "bg-blue-50"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {questionType === QuestionTypes.singleChoice ? (
                          <input
                            type="radio"
                            name="option"
                            value={option.id}
                            checked={option.id === userAnswer}
                            onChange={() => {
                              onChangeHandle(option)
                            }}
                            className="mt-7"
                          />
                        ) : (
                          <Checkbox
                            value={option.id}
                            name="option"
                            isChecked={userAnswer.indexOf(option.id) !== -1}
                            className="mt-7"
                            handleChange={() => onChangeHandle(option, i)}
                          />
                        )}
                        <div className="ql-editor w-full bg-inherit py-5">
                          <div
                            className="cursor-pointer font-normal"
                            dangerouslySetInnerHTML={{
                              __html: option?.option,
                            }}
                          />
                        </div>
                      </label>
                    )
                  }
                )}
                {question?.question?.correctAnswer?.map(
                  (answer: { id: string }, index: number) => {
                    return (
                      <div key={answer.id} className="border-b px-5 py-7">
                        <textarea
                          onPaste={(e) => e.preventDefault()}
                          name="answer"
                          id={answer.id}
                          value={userAnswer[index]}
                          rows={4}
                          onChange={(event) => onChangeHandle(event, index)}
                          className="w-full rounded-lg border border-gray-200 bg-white p-5"
                        />
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          </div>
          <CandidateQuestionFooter />
        </form>
      </div>
    </div>
  )
}

export default Question
