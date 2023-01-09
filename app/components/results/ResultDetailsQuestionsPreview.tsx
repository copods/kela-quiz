import type {Option } from '~/interface/Interface'
import Divider from '../common-components/divider'
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
  const compare = () => {
    const correctAnswers = correctAnswer
      ?.flatMap((opt: any) => opt?.answer.toLowerCase())
      .sort()
    const userAnswers = textAnswer
      ?.flatMap((opt: any) => opt.toLowerCase())
      .sort()
    if (correctAnswers?.length === userAnswers?.length) {
      let correctFlag = true
      for (let i = 0; i < correctAnswers?.length; i++) {
        if (correctAnswers[i].localeCompare(userAnswers[i]) != 0) {
          correctFlag = false
          break
        }
      }
      if (correctFlag) {
        return 'correct'
      }
    }
  }

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
            {textAnswer.length === 1 &&
              checkOrder === false &&
              textAnswer[0] === correctAnswer[0]?.answer && (
                <div className="flex flex-col gap-7">
                  <div className="flex items-center  justify-between">
                    <h3 className="text-xl">Given answer</h3>
                    <span className="rounded-full bg-green-100 px-2.5 py-2.5 text-sm">
                      Correct
                    </span>
                  </div>
                  <div className="rounded border border-solid bg-green-100 p-6">
                    {textAnswer}
                  </div>
                </div>
              )}
            {textAnswer.length === 1 &&
              checkOrder === false &&
              textAnswer[0] !== correctAnswer[0]?.answer && (
                <div>
                  <div className="flex flex-col gap-7">
                    <div className="flex items-center  justify-between">
                      <h3 className="text-xl">Given Answer</h3>
                      <span className="rounded-full bg-[#FAD1E5] px-2.5 py-2.5 text-sm">
                        Wrong
                      </span>
                    </div>
                    <div className="rounded border border-solid bg-[#FAD1E5] p-6">
                      {textAnswer}
                    </div>
                    <Divider height="1px" />
                    <div className="flex items-center  justify-between">
                      <h3 className="text-xl">Correct</h3>
                    </div>
                    <div className="rounded border border-solid bg-green-100 p-6">
                      {correctAnswer[0]?.answer}
                    </div>
                  </div>
                </div>
              )}

            {textAnswer.length > 0 && checkOrder === true && compare() && (
              <div className="flex flex-col gap-7">
                <div className="flex items-center  justify-between">
                  <h3 className="text-xl">Given answer</h3>
                  <span className="rounded-full bg-green-100 px-2.5 py-2.5 text-sm">
                    Correct
                  </span>
                </div>
                <div className="flex flex-col gap-7">
                  {textAnswer.map((textAnswer: any) => {
                    return (
                      <div className="rounded border border-solid bg-green-100 p-6">
                        {textAnswer}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {selectedOptions.length > 0 && selectedOptions.length < 2 && (
              <div>
                {selectedOptions.map((selectedOptions: Option) => {
                  return (
                    <div key={selectedOptions.questionId}>
                      {selectedOptions.questionId ===
                        selectedOptions.coInQuestionId && (
                        <div className="flex flex-col gap-7">
                          <div className="flex items-center  justify-between">
                            <h3 className="text-xl">Given answer</h3>
                            <span className="rounded-full bg-green-100 px-2.5 py-2.5 text-sm">
                              Correct
                            </span>
                          </div>
                          <div
                            className="ql-editor rounded border border-solid bg-green-100 p-6"
                            dangerouslySetInnerHTML={{
                              __html: `${selectedOptions.option}`,
                            }}
                          ></div>
                        </div>
                      )}
                      {selectedOptions.coInQuestionId !==
                        selectedOptions.questionId && (
                        <div className="flex flex-col gap-7">
                          <div className="flex items-center  justify-between">
                            <h3 className="text-xl">Given answer</h3>
                            <span className="rounded-full bg-[#FAD1E5] px-2.5 py-2.5 text-sm">
                              Wrong
                            </span>
                          </div>
                          <div
                            className="ql-editor rounded border border-solid bg-[#FAD1E5] p-6"
                            dangerouslySetInnerHTML={{
                              __html: `${selectedOptions.option}`,
                            }}
                          ></div>
                          <Divider height="1px" />
                          <div className="flex items-center  justify-between">
                            <span className="rounded-full bg-green-100 px-2.5 py-2.5 text-sm">
                              Correct
                            </span>
                          </div>
                          <div
                            className="ql-editor rounded border border-solid bg-[#FAD1E5] p-6"
                            dangerouslySetInnerHTML={{
                              __html: `${correctAnswer[0]?.option}`,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
            {selectedOptions.length >= 2 && (
              <div className="flex flex-col gap-2">
                <span>selected Answers</span>
                {selectedOptions.map((selectedOptions: any) => {
                  return (
                    <div key={selectedOptions.questionId}>
                      <div className="flex flex-col gap-7">
                        <div
                          className={`${
                            selectedOptions.questionId ===
                            selectedOptions.coInQuestionId
                              ? 'ql-editor rounded border border-solid bg-green-100 p-6'
                              : 'bg-[#FAD1E5] p-6'
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: `${selectedOptions.option}`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                })}

                <span>correct options</span>
                {correctOption.map((correctOption: Option) => {
                  return (
                    <div
                      key={correctOption.id}
                      className="ql-editor rounded border border-solid bg-green-100 p-6"
                      dangerouslySetInnerHTML={{
                        __html: `${correctOption?.option}`,
                      }}
                    ></div>
                  )
                })}
              </div>
            )}
          </div>
        )}
        {status === 'SKIPPED' && <span>skipped</span>}
      </div>
    </div>
  )
}
export default ResultDetailsQuestionsPreview
