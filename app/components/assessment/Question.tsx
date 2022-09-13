import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import {
  candidateExamConstants,
  commonConstants,
} from '~/constants/common.constants'
import { QuestionTypes } from '~/interface/Interface'
import Button from '../form/Button'
import Checkbox from '../form/CheckBox'
import sanitizeHtml from 'sanitize-html'
import CandidateQuestionHeader from './CandidateQuestionHeader'

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
    <>
      <CandidateQuestionHeader />
      <div className="w-full flex-1 overflow-auto bg-questionBackground p-6">
        <form method="post" className="flex h-full flex-col rounded-lg border">
          <div className="flex h-full max-h-full flex-1 overflow-auto rounded-t-lg bg-white">
            <div className="flex h-full w-1/2 flex-col gap-8 border-r p-6">
              <div className="flex h-10 items-center justify-between">
                <div className="flex text-xl">
                  <span>Question </span>
                </div>
              </div>
              <div className="ql-editor h-full flex-1 overflow-auto border-gray-200 bg-white p-0">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(question?.question?.question),
                  }}
                />
              </div>
            </div>
            <div className="flex h-full w-1/2 flex-col gap-8 py-6">
              <div className="flex h-10 items-center justify-between px-6">
                {questionType === QuestionTypes.singleChoice ? (
                  <div className="flex text-xl">Select Correct Option</div>
                ) : (
                  <div className="flex text-xl">Select Correct Option's</div>
                )}
              </div>
              <div className="flex h-full flex-1 flex-col overflow-auto">
                {question?.question?.options?.map(
                  (option: {
                    id: string
                    option: string
                    rightAnswer: boolean
                  }) => {
                    return (
                      <label
                        key={option.id}
                        className="flex cursor-pointer gap-4 border-b px-6 hover:bg-gray-100"
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
                          />
                        ) : (
                          <Checkbox
                            value={option.id}
                            name="option"
                            handleChange={() => onChangeHandle(option.id)}
                          />
                        )}
                        <div className="ql-editor w-full bg-inherit p-0">
                          <div
                            className="cursor-pointer"
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(option?.option),
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
          <div className="flex h-16 items-center justify-between gap-6 rounded-b-lg border-t bg-white px-6 py-4 drop-shadow-[0px_-2px_10px_rgba(0,0,0,0.06)]">
            <div>
              <span className="cursor-pointer font-bold underline">
                Skip Question
              </span>
            </div>
            <div className="flex gap-6">
              <Button
                className="h-8 w-28"
                varient="primary-outlined"
                title={commonConstants.prevoiusButton}
                buttonText={commonConstants.prevoiusButton}
                isDisabled={question.order === 1}
                type="submit"
                value="prev"
                name="previous"
              />
              {question.order !== section.totalQuestions ? (
                <Button
                  className="h-8 w-28"
                  varient="primary-solid"
                  title={commonConstants.nextButton}
                  buttonText={commonConstants.nextButton}
                  isDisabled={question.order === section.totalQuestions}
                  type="submit"
                  value="next"
                  name="next"
                />
              ) : lastSection ? (
                <Button
                  className="h-8 w-28"
                  varient="primary-solid"
                  title={candidateExamConstants.endTest}
                  buttonText={candidateExamConstants.endTest}
                  isDisabled={question.order !== section.totalQuestions}
                  type="submit"
                  value={section.order}
                  name="endExam"
                />
              ) : (
                <Button
                  className="h-8 w-28"
                  varient="primary-solid"
                  title={candidateExamConstants.nextSection}
                  buttonText={candidateExamConstants.nextSection}
                  isDisabled={question.order !== section.totalQuestions}
                  type="submit"
                  value={section.order}
                  name="nextSection"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Question
