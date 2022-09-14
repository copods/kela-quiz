import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { QuestionTypes } from '~/interface/Interface'
import Checkbox from '../form/CheckBox'
import sanitizeHtml from 'sanitize-html'
import CandidateQuestionHeader from './CandidateQuestionHeader'
import CandidateQuestionFooter from './CandidateQuestionFooter'

const Question = () => {
  const { question } = useLoaderData()
  const questionType = question?.question?.questionType?.value
  // const [test, setTest] = useState(question?.question?.options)
  const [userAnswer, setUserAnswer] = useState(
    questionType === QuestionTypes.singleChoice
      ? question.selectedOptions[0]?.id
      : questionType === QuestionTypes.text
      ? question?.answers
      : []
  )

  // useEffect(() => {
  //   if (questionType === QuestionTypes.multipleChoice) {
  //     console.log('amsdmakdjanjksdha')
  //     test.forEach((opt: any,i:number) => {
  //       question?.selectedOptions?.forEach((el: any) => {
  //         if (el.id === opt.id) {
  //           opt.isCorrect = true
  //           return
  //         } else {
  //           opt.isCorrect = false
  //         }
  //       })
  //     })
  //   }
  // }, [])

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
    // if (questionType === QuestionTypes.multipleChoice) {
    //   setTest((old: any) => {
    // old.forEach((el: any) => {
    //   console.log('all', el)
    //   if (el.id === event.id) {
    //     el.isCorrect = !el.isCorrect
    //     console.log('sel', el)
    //     console.log('old', old)
    //     return
    //   }
    // })
    //   console.log(event)
    //   old[index as number].isCorrect = !event.isCorrect
    //   console.log('asd', ...old)
    //   return [...old]
    // })
    // question?.question?.options.forEach((opt: any) => {
    //   if (event.id === opt.id) {
    //     opt.isCorrect = !opt.isCorrect
    //     console.log(question.question.options)
    //     // let something = [...question.question.options]
    //     // console.log(something)
    //     // setTest(question.question.options)

    //   }
    // })
    // }
  }
  // useEffect(() => {
  //   console.log('test: ', test)
  // }, [test])

  return (
    <>
      <CandidateQuestionHeader />
      <div className="w-full flex-1 overflow-auto bg-questionBackground p-6">
        <form method="post" className="flex h-full flex-col rounded-lg border">
          <div className="flex h-full max-h-full flex-1 overflow-auto rounded-t-lg bg-white">
            <div className="flex h-full w-1/2 flex-col gap-8 border-r px-6 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex text-xl font-medium">
                  <span>Question </span>
                </div>
              </div>
              <div className="ql-editor h-full flex-1 overflow-auto border-gray-200 bg-white p-0">
                <div
                  className="font-normal"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(question?.question?.question),
                  }}
                />
              </div>
            </div>
            <div className="flex h-full w-1/2 flex-col gap-2 pt-6">
              <div className="flex items-center justify-between px-6">
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
                        className={`flex cursor-pointer items-start gap-4 border-b px-6 ${
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
                            isChecked={option.isCorrect}
                            className="mt-7"
                            handleChange={() => onChangeHandle(option, i)}
                          />
                        )}
                        <div className="ql-editor w-full bg-inherit py-6">
                          <div
                            className="cursor-pointer font-normal"
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
                    console.log(userAnswer)
                    return (
                      <div key={answer.id} className="border-b px-6 py-7">
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
    </>
  )
}

export default Question
