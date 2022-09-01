import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import {
  candidateExam,
  commonConstants,
  routeFiles,
} from '~/constants/common.constants'
import { QuestionTypes } from '~/interface/Interface'

const Question = () => {
  const { question, section, lastSection } = useLoaderData()

  const questionType = question?.question?.questionType?.value

  const [userAnswer, setUserAnswer] = useState(
    questionType === QuestionTypes.singleChoice
      ? question.selectedOptions[0]?.id
      : questionType === QuestionTypes.text
      ? question?.answers
      : {}
  )

  const onChangeHandle = (event: any, index?: number) => {
    if (questionType === QuestionTypes.singleChoice) {
      setUserAnswer(event.id)
    }
    if (questionType === QuestionTypes.text) {
      setUserAnswer((oldVal: Array<string>) => {
        oldVal[index || 0] = event.target.value
        return [...oldVal]
      })
    }
  }

  return (
    <form method="post" className="flex h-full flex-col gap-9">
      <div className="flex h-full max-h-full flex-1 gap-9 overflow-auto">
        <div className="flex h-full w-1/2 flex-col gap-3">
          <div className="flex h-10 items-center justify-between">
            <div className="flex gap-5 text-lg font-semibold">
              <span>Question </span>
              <span>
                {question?.order}/{section?.totalQuestions}
              </span>
            </div>
          </div>
          <div className="shadow-base h-full flex-1 overflow-auto rounded-lg border border-gray-200 bg-white p-4">
            <div
              dangerouslySetInnerHTML={{
                __html: question?.question?.question,
              }}
            />
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col gap-3">
          <div className="flex h-10 items-center justify-between">
            <div className="flex gap-5 text-lg font-semibold">
              {routeFiles.options}
            </div>
          </div>
          <div className="shadow-base flex h-full flex-1 flex-col gap-6 overflow-auto">
            {question?.question?.options?.map(
              (option: {
                id: string
                option: string
                rightAnswer: boolean
              }) => {
                return (
                  <div key={option.id} className="flex gap-4">
                    {questionType === QuestionTypes.singleChoice ? (
                      <input
                        type="radio"
                        name="option"
                        value={option.id}
                        checked={option.id === userAnswer}
                        onChange={() => {
                          onChangeHandle(option)
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        value={option.id}
                        name="option"
                        onChange={() => {
                          onChangeHandle(option.id)
                        }}
                      />
                    )}
                    <div className="w-full rounded-lg border border-gray-200 bg-white p-5">
                      <div
                        dangerouslySetInnerHTML={{ __html: option?.option }}
                      />
                    </div>
                  </div>
                )
              }
            )}
            {question?.question?.correctAnswer?.map(
              (answer: { id: string }, index: number) => {
                return (
                  <div key={answer.id}>
                    <textarea
                      name="answer"
                      id=""
                      value={userAnswer[index]}
                      rows={4}
                      onChange={() => onChangeHandle(event, index)}
                      className="w-full rounded-lg border border-gray-200 bg-white p-5"
                    />
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-6">
        <div className="flex gap-5">
          <button
            className="text-gray-primary h-11 w-40 rounded-md border border-primary bg-white text-base font-medium text-primary shadow-sm"
            name="previous"
            value="prev"
            type="submit"
            disabled={question.order === 1}
          >
            {commonConstants.prevoiusButton}
          </button>
          {question.order !== section.totalQuestions ? (
            <button
              className="h-11 w-40 rounded-md border border-primary bg-primary text-base font-medium text-gray-50 shadow-sm"
              name="next"
              value="next"
              type="submit"
              disabled={question.order === section.totalQuestions}
            >
              {commonConstants.nextButton}
            </button>
          ) : lastSection ? (
            <button
              className="h-11 w-40 rounded-md border border-primary bg-primary text-base font-medium text-gray-50 shadow-sm"
              name="endExam"
              value={section.order}
              type="submit"
              disabled={question.order !== section.totalQuestions}
            >
              {candidateExam.endTest}
            </button>
          ) : (
            <button
              className="h-11 w-40 rounded-md border border-primary bg-primary text-base font-medium text-gray-50 shadow-sm"
              name="nextSection"
              value={section.order}
              type="submit"
              disabled={question.order !== section.totalQuestions}
            >
              {candidateExam.nextSection}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default Question
