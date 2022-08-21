import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import {
  candidateExam,
  commonConstants,
  QuestionTypes,
} from '~/constants/common.constants'

function Question() {
  const { question, section, lastSection } = useLoaderData()

  const questionType = question.question.questionType.value

  const [userAnswer, setUserAnswer] = useState(
    questionType === QuestionTypes.singleChoice
      ? question.selectedOptions[0]?.id
      : questionType == 'TEXT'
      ? question?.answers
      : {}
  )

  if (questionType === QuestionTypes.multipleChoice) {
    // for (let option of question.question.options) {
    //   question.selectedOptions.forEach((selOption: any) => {
    //     if (selOption.id == option.id) {
    //       option.rightAnswer = true
    //       return
    //     } else {
    //       option.rightAnswer = false
    //     }
    //   })
    //   // option.rightAnswer =
    //   //   question.selectedOptions.indexOf(option.id) == -1 ? false : true
    // }
  }

  const onChangeHandle = (event: any, index?: number) => {
    if (questionType == QuestionTypes.singleChoice) {
      setUserAnswer(event.id)
    }
    if (questionType == QuestionTypes.multipleChoice) {
      // question.options.forEach((opt: any) => {
      //   if (option.id == opt.id) {
      //     opt.rightAnswer = !opt.rightAnswer
      //   }
      // })
      // let selectedOption: Array<string> = []
      // for (let opt of questionData.question.options) {
      //   if (opt.id == option) {
      //     opt.rightAnswer = opt.rightAnswer == 'true' ? 'false' : 'true'
      //     (opt.rightAnswer)
      //   }
      // }
      // setUserAnswer(selectedOption)
    }
    if (questionType == QuestionTypes.text) {
      setUserAnswer((oldval: Array<string>) => {
        oldval[index || 0] = event.target.value
        return [...oldval]
      })
    }
  }

  return (
    <form method="post" className="flex h-full flex-col gap-9">
      <div className="flex max-h-full flex-1 gap-9 overflow-auto">
        <div className="flex h-full w-1/2 flex-col gap-3">
          <div className="flex h-10 items-center justify-between">
            <div className="flex gap-5 text-lg font-semibold">
              <span>Question</span>{' '}
              <span>
                {question?.order}/{section?.totalQuestions}
              </span>
            </div>
          </div>
          <div className="shadow-base h-full flex-1 overflow-auto rounded-lg border border-gray-200 bg-white p-4">
            <div
              dangerouslySetInnerHTML={{
                __html: question.question.question,
              }}
            />
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col gap-3">
          <div className="flex h-10 items-center justify-between">
            <div className="flex gap-5 text-lg font-semibold">Options</div>
          </div>
          <div className="shadow-base flex h-full flex-1 flex-col gap-6 overflow-auto rounded-lg border border-gray-200 bg-white p-4">
            {question?.question?.options?.map(
              (option: {
                id: string
                option: string
                rightAnswer: boolean
              }) => {
                return (
                  <div key={option.id} className="flex gap-4">
                    {questionType == 'SINGLE_CHOICE' ? (
                      <input
                        type="radio"
                        name="option"
                        value={option.id}
                        checked={option.id == userAnswer}
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
                    <div dangerouslySetInnerHTML={{ __html: option.option }} />
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
                      className="w-full bg-gray-100 p-5"
                    ></textarea>
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
            disabled={question.order == 1}
          >
            {commonConstants.prevoiusButton}
          </button>
          {question.order != section.totalQuestions ? (
            <button
              className="h-11 w-40 rounded-md border border-primary bg-primary text-base font-medium text-gray-50 shadow-sm"
              name="next"
              value="next"
              type="submit"
              disabled={question.order == section.totalQuestions}
            >
              {commonConstants.nextButton}
            </button>
          ) : lastSection ? (
            <button
              className="h-11 w-40 rounded-md border border-primary bg-primary text-base font-medium text-gray-50 shadow-sm"
              name="endExam"
              value={section.order}
              type="submit"
              disabled={question.order != section.totalQuestions}
            >
              {candidateExam.endTest}
            </button>
          ) : (
            <button
              className="h-11 w-40 rounded-md border border-primary bg-primary text-base font-medium text-gray-50 shadow-sm"
              name="nextSection"
              value={section.order}
              type="submit"
              disabled={question.order != section.totalQuestions}
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
