import type { Option } from '~/interface/Interface'
const ResultDetailsQuestionsPreview = ({
  textAnswer,
  status,
  selectedOptions,
  question,
  correctAnswer,
  correctOption,
  checkOrder,
}: {
  textAnswer: any
  status: string
  selectedOptions: any
  question: any
  correctAnswer: any
  correctOption: any
  checkOrder: boolean
}) => {
  const correctAnswersArray = correctAnswer.map((a: any) => a.answer)
  function areEqual(textAnswer: any, correctAnswersArray: any) {
    let N = textAnswer.length
    let M = correctAnswersArray.length

    // If lengths of array are not equal means
    // array are not equal
    if (N != M) return false

    // Sort both arrays
    textAnswer.sort()
    correctAnswersArray.sort()

    // Linearly compare elements
    for (let i = 0; i < N; i++)
      if (textAnswer[i] != correctAnswersArray[i]) return false

    // If all elements were same.
    return true
  }
  if (areEqual(textAnswer, correctAnswersArray))
    console.log(areEqual(textAnswer, correctAnswersArray), 'kk')

  return (
    <div className="flex w-full  rounded-lg  border border-gray-300 bg-gray-50">
      <div className="flex w-6/12 gap-2 p-6">
        <span>Q1.</span>
        <div
          className="question flex-1   flex-row"
          dangerouslySetInnerHTML={{
            __html: question,
          }}
        ></div>
      </div>
      <hr className="h-[auto] w-px bg-gray-300" />
      <div className="w-6/12 p-6">
        {status === 'ANSWERED' && (
          <div className="flex flex-col gap-2">
            <div>
              {checkOrder === true &&
                textAnswer.map((textAnswer: any, index: number) => {
                  console.log(textAnswer === correctAnswer[index].answer, 'l')
                  return (
                    <div
                      key={index}
                      className={`${
                        textAnswer === correctAnswer[index].answer
                          ? 'rounded border border-solid bg-green-100 p-6'
                          : 'rounded border border-solid bg-[#FAD1E5] p-6'
                      }`}
                    >
                      {textAnswer}
                    </div>
                  )
                })}
              {
                <div>
                  {checkOrder === false &&
                    areEqual(textAnswer, correctAnswersArray) === true &&
                    textAnswer.map((textAnswer: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className={
                            'rounded border border-solid bg-green-100 p-6'
                          }
                        >
                          {textAnswer}
                        </div>
                      )
                    })}

                  {checkOrder === false &&
                    areEqual(textAnswer, correctAnswersArray) === false &&
                    textAnswer.map((textAnswer: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className={
                            'rounded border border-solid bg-[#FAD1E5] p-6'
                          }
                        >
                          {textAnswer}
                        </div>
                      )
                    })}
                </div>
              }
            </div>
            <div className="flex flex-col gap-6">
              {selectedOptions.map((selectedOptions: Option, index: number) => {
                console.log(correctOption[index]?.option, 'lll')
                return (
                  <div key={selectedOptions.questionId}>
                    <div className="flex flex-col gap-7">
                      <div
                        className={`${
                          selectedOptions.option ===
                          correctOption[index]?.option
                            ? 'ql-editor rounded border border-solid bg-green-100 p-6'
                            : 'ql-editor rounded border border-solid bg-[#FAD1E5] p-6'
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: `${selectedOptions.option}`,
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
              <div className="flex flex-col gap-6">
                {selectedOptions.map(
                  (selectedOptions: Option, index: number) => {
                    return (
                      <div key={index}>
                        {selectedOptions.questionId !==
                          selectedOptions.coInQuestionId && (
                          <div
                            key={index}
                            className={
                              'ql-editor rounded border border-solid bg-green-100 p-6'
                            }
                            dangerouslySetInnerHTML={{
                              __html: `${correctOption[index]?.option}`,
                            }}
                          ></div>
                        )}
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          </div>
        )}
        {status === 'SKIPPED' && <span>skipped</span>}
      </div>
    </div>
  )
}
export default ResultDetailsQuestionsPreview
