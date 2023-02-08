import { useLoaderData, useSubmit } from "@remix-run/react"
import tickMark from "~/../public/assets/tickMark.svg"
import dash from "~/../public/assets/dash.svg"
import React from "react"

const CandidateQuestionStepper = () => {
  const { section, candidateTests, params } = useLoaderData()
  const submit = useSubmit()

  return (
    <div className="flex w-full items-center justify-center gap-2">
      {candidateTests.sections[section.order - 1].questions.map(
        (question: any, i: number) => {
          return (
            <div key={question.id} className="contents">
              <div
                key={question.id}
                tabIndex={0}
                onKeyUp={() => {}}
                role="button"
                onClick={() => {
                  if (question.status && question.status !== "NOT_VIEWED") {
                    submit(
                      { skip: "skip", jumpQuestionId: question.id },
                      {
                        method: "post",
                      }
                    )
                  }
                }}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  question.status && question.status !== "NOT_VIEWED"
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                } ${
                  params.questionId === question.id
                    ? "bg-primary text-white"
                    : question.status === "ANSWERED"
                    ? "bg-green-600 text-white"
                    : question.status === "SKIPPED" ||
                      question.status === "VIEWED"
                    ? "bg-gray-700 text-white"
                    : "border border-primary text-primary"
                }`}
              >
                {params.questionId === question.id ? (
                  question.order
                ) : question.status === "ANSWERED" ? (
                  <img src={tickMark} alt="correct" />
                ) : question.status === "SKIPPED" ||
                  question.status === "VIEWED" ? (
                  <img src={dash} alt="skipped" />
                ) : (
                  question.order
                )}
              </div>
              {candidateTests.sections[section.order - 1].questions.length !==
                i + 1 && (
                <span className="h-1 min-w-4 max-w-32 flex-1 rounded-full bg-gray-300"></span>
              )}
            </div>
          )
        }
      )}
    </div>
  )
}

export default CandidateQuestionStepper
