import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { QuestionTypes } from '~/interface/Interface'
import Checkbox from '../form/CheckBox'
import CandidateQuestionHeader from './CandidateQuestionHeader'
import CandidateQuestionFooter from './CandidateQuestionFooter'
import CandidateQuestionStepper from './CandidateQuestionStepper'

const Question = () => {
  const { question } = useLoaderData()
  const questionType = question?.question?.questionType?.value
  // const [test, setTest] = useState(question?.question?.options)
  const [userAnswer, setUserAnswer] = useState(
    questionType === QuestionTypes.singleChoice
      ? question.selectedOptions[0]?.id
      : questionType === QuestionTypes.text
      ? question?.answers
      : question.selectedOptions.flatMap((option: any) => option.id)
  )
  useEffect(() => {}, [userAnswer])

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
    if (questionType === QuestionTypes.multipleChoice) {
      setUserAnswer((val: any) => {
        if (userAnswer.indexOf(event.id) === -1) {
          return [...val, event.id]
        } else {
          val.splice(userAnswer.indexOf(event.id), 1)
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
            <div className="flex h-full w-1/2 flex-col gap-8 border-r p-5">
              <div className="flex items-center justify-between">
                <div className="flex text-xl font-medium">
                  <span>Question </span>
                </div>
              </div>
              <div className="ql-editor h-full flex-1 overflow-auto border-gray-200 bg-white p-0">
                <div
                  className="font-normal"
                  dangerouslySetInnerHTML={{
                    __html: question?.question?.question,
                  }}
                />
              </div>
            </div>
            <div className="flex h-full w-1/2 flex-col gap-2 py-5">
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
                  (
                    option: {
                      isCorrect: boolean
                      id: string
                      option: string
                      rightAnswer: boolean
                    },
                    i: number
                  ) => {
                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-start gap-4 border-b px-5 ${
                          option.id === userAnswer
                            ? 'bg-blue-50'
                            : 'hover:bg-gray-100'
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
          <CandidateQuestionFooter />
        </form>
      </div>
    </div>
  )
}

export default Question
