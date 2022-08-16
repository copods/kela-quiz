import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'

function Question() {
  const { question, section } = useLoaderData()
  console.log(question)

  const questionType = question.question.questionType.value

  const [userAnswer, setUserAnswer] = useState(
    questionType === 'SINGLE_CHOICE' ? question.selectedOptions[0] : {}
  )

  if (questionType === 'MULTIPLE_CHOICE') {
    for (let option of question.question.options) {
      option.rightAnswer =
        question.selectedOptions.indexOf(option.id) == -1 ? '' : option.id
    }
  }

  const onChangeHandle = (option: any) => {
    if (questionType == 'SINGLE_CHOICE') {
      setUserAnswer(option)
    }
    if (questionType == 'MULTIPLE_CHOICE') {
      // let selectedOption: Array<string> = []
      // for (let opt of questionData.question.options) {
      //   if (opt.id == option) {
      //     opt.rightAnswer = opt.rightAnswer == 'true' ? 'false' : 'true'
      //     console.log(opt.rightAnswer)
      //   }
      // }
      // console.log(questionData.question.options, selectedOption)
      // setUserAnswer(selectedOption)
    }
  }

  // useEffect(() => {
  //   console.log(userAnswer)
  // }, [userAnswer])

  return (
    <form method="post" className="flex h-full flex-col gap-9">
      <div className="flex h-full flex-1 gap-9">
        <div className="flex w-3/5 flex-col gap-3">
          <div className="flex h-10 items-center justify-between">
            <div className="flex gap-5 text-lg font-semibold">
              <span>Question</span> <span>1/2</span>
            </div>
            <div className="flex gap-5">
              <button
                className="h-10 w-10 rounded-lg bg-gray-200"
                name="previous"
                value="prev"
                type="submit"
                disabled={question.order == 1}
              >
                P
              </button>
              <button
                className="h-10 w-10 rounded-lg bg-gray-200"
                name="next"
                value="next"
                type="submit"
                // disabled={question.order == section.totalQuestions}
              >
                N
              </button>
            </div>
          </div>
          <div className="shadow-base flex-1 rounded-lg border border-gray-200 bg-white p-4">
            <div
              dangerouslySetInnerHTML={{
                __html: question.question.question,
              }}
            ></div>
          </div>
        </div>
        <div className="flex w-2/5 flex-col gap-3">
          <div className="flex h-10 items-center justify-between">
            <div className="flex gap-5 text-lg font-semibold">Options</div>
          </div>
          <div className="shadow-base flex flex-1 flex-col gap-6 rounded-lg border border-gray-200 bg-white p-4">
            {question.question.options.map(
              (
                option: { id: string; option: string; rightAnswer: string },
                index: number
              ) => {
                return (
                  <div key={option.id} className="flex gap-4">
                    {questionType == 'SINGLE_CHOICE' ? (
                      <input
                        type="radio"
                        name="option"
                        value={option.toString()}
                        checked={option == userAnswer}
                        onChange={() => {
                          onChangeHandle(option)
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        value={option.rightAnswer}
                        name="option"
                        // checked={option.id}
                        onChange={() => {
                          onChangeHandle(option.id)
                        }}
                      />
                    )}
                    <div
                      dangerouslySetInnerHTML={{ __html: option.option }}
                    ></div>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-6">
        <button className="text-gray-primary h-11 w-40 rounded-md border border-primary bg-white text-base font-medium text-primary shadow-sm">
          End Test
        </button>
        <button
          className="h-11 w-40 rounded-md border border-primary bg-primary text-base font-medium text-gray-50 shadow-sm"
          name="nextSection"
          value={section.order}
          type="submit"
          disabled={question.order != section.totalQuestions}
        >
          End Section
        </button>
      </div>
    </form>
  )
}

export default Question
