import { areEqual } from 'helper/results.helper'
import { useTranslation } from 'react-i18next'
import type { Option, CorrectAnswer, QuestionType } from '~/interface/Interface'
import Divider from '../common-components/divider'
const ResultDetailsQuestionsPreview = ({
  textAnswer,
  status,
  selectedOptions,
  question,
  correctAnswer,
  correctOption,
  checkOrder,
  questionType,
  index,
}: {
  textAnswer: Array<CorrectAnswer>
  status: string
  selectedOptions: Array<Option>
  question: string
  correctAnswer: Array<CorrectAnswer>
  correctOption: Array<Option>
  checkOrder: boolean
  questionType: QuestionType
  index: number
}) => {
  const { t } = useTranslation()
  const correctAnswersArray = correctAnswer.map(
    (correctAnswer: any) => correctAnswer.answer
  )

  // extracting correct options
  const sortedCorrectOptionArray = correctOption.map((option: Option) => {
    return option.option
  })

  let flag = selectedOptions.map((selectedOptions: Option, index: number) => {
    return selectedOptions.option === correctOption[index]?.option
      ? 'correct'
      : 'incorrect'
  })
  //checking if given and correct answers are correct in order
  const correctOrder = textAnswer.map(
    (textAnswer: CorrectAnswer, index: number) => {
      return (
        textAnswer === (correctAnswer[index].answer as unknown as CorrectAnswer)
      )
    }
  )
  return (
    <div className="flex w-full  rounded-lg  border border-gray-300 bg-gray-50">
      <div className="flex w-6/12 flex-col gap-6 p-6">
        <div className="flex items-center gap-8">
          <span className="rounded-52 border border-gray-700 px-3 text-sm text-gray-700">
            {/* {show chip according to type of question} */}
            {questionType.displayName === 'Text'
              ? t('resultConstants.text')
              : t('sectionsConstants.mcq')}
          </span>
          {/* {if question type is TEXT then
          CASE1: if ordered then show ordered front of question type
          CASE2: if unordered then show unordered front of question badge
          } */}
          {questionType.displayName === 'Text' && (
            <span className="list-item text-xs text-gray-800">
              {checkOrder
                ? t('resultConstants.order')
                : t('resultConstants.unordered')}
            </span>
          )}
        </div>
        <div className="flex gap-6">
          {/* {showing question serial number} */}
          <span>
            {t('resultConstants.q')}.{index}
          </span>
          {/* {question} */}
          <div
            className="question flex-1   flex-row"
            dangerouslySetInnerHTML={{
              __html: question,
            }}
          ></div>
        </div>
      </div>
      <hr className="h-[auto] w-px bg-gray-300" />
      <div className="w-6/12 p-6">
        {/* {checking if question is answered by candidate} */}
        {status === 'ANSWERED' && (
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl text-gray-800">
                  {t('resultConstants.givenAnswer')}
                </h3>
                <div>
                  {checkOrder === true &&
                  questionType.displayName === 'Text' &&
                  correctOrder.includes(false) ? (
                    <span className="rounded-full bg-[#FAD1E5] px-2.5 py-2.5 text-xs">
                      {t('resultConstants.wrong')}
                    </span>
                  ) : (
                    checkOrder === true &&
                    questionType.displayName === 'Text' &&
                    !correctOrder.includes(false) && (
                      <span className="rounded-full bg-green-100 px-2.5 py-2.5 text-xs">
                        {t('resultConstants.correct')}
                      </span>
                    )
                  )}
                  {checkOrder === false &&
                  questionType.displayName === 'Text' &&
                  areEqual(textAnswer, correctAnswersArray) === false ? (
                    <span className="rounded-full bg-[#FAD1E5] px-2.5 py-2.5 text-xs">
                      {t('resultConstants.wrong')}
                    </span>
                  ) : (
                    checkOrder === false &&
                    questionType.displayName === 'Text' &&
                    areEqual(textAnswer, correctAnswersArray) === true && (
                      <span className="rounded-full bg-green-100 px-2.5 py-2.5 text-xs">
                        {t('resultConstants.correct')}
                      </span>
                    )
                  )}
                  {flag.includes('incorrect') === true &&
                  questionType.displayName !== 'Text' ? (
                    <span className="rounded-full bg-[#FAD1E5] px-2.5 py-2.5 text-xs">
                      {t('resultConstants.wrong')}
                    </span>
                  ) : (
                    flag.includes('incorrect') === false &&
                    questionType.displayName !== 'Text' && (
                      <span className="rounded-full bg-green-100 px-2.5 py-2.5 text-xs">
                        {t('resultConstants.correct')}
                      </span>
                    )
                  )}
                </div>
              </div>

              {checkOrder === true &&
                correctOrder.includes(false) &&
                textAnswer.map((textAnswer: CorrectAnswer, index: number) => {
                  return (
                    <div
                      key={index}
                      className="rounded border border-solid bg-[#FAD1E5] p-6"
                    >
                      {textAnswer}
                    </div>
                  )
                })}
              {checkOrder === true &&
                !correctOrder.includes(false) &&
                textAnswer.map((textAnswer: CorrectAnswer, index: number) => {
                  return (
                    <div
                      key={index}
                      className="rounded border border-solid bg-green-100 p-6"
                    >
                      {textAnswer}
                    </div>
                  )
                })}
              {
                <div className="flex flex-col gap-6">
                  {checkOrder === false &&
                    areEqual(textAnswer, correctAnswersArray) === true &&
                    textAnswer.map(
                      (textAnswer: CorrectAnswer, index: number) => {
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
                      }
                    )}

                  {checkOrder === false &&
                    areEqual(textAnswer, correctAnswersArray) === false &&
                    textAnswer.map(
                      (textAnswer: CorrectAnswer, index: number) => {
                        return (
                          <div
                            key={index}
                            className={
                              correctAnswersArray.includes(textAnswer as any)
                                ? 'rounded border border-solid bg-green-100 p-6'
                                : 'rounded border border-solid bg-[#FAD1E5] p-6'
                            }
                          >
                            {textAnswer}
                          </div>
                        )
                      }
                    )}
                  {selectedOptions.map((selectedOption: Option) => {
                    return (
                      <div key={selectedOption.questionId}>
                        <div className="flex flex-col gap-7">
                          <div
                            className={`${
                              sortedCorrectOptionArray.includes(
                                selectedOption.option
                              )
                                ? 'ql-editor rounded border border-solid bg-green-100 p-6'
                                : 'ql-editor rounded border border-solid bg-[#FAD1E5] p-6'
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: `${selectedOption.option}`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              }
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-7">
                {/* conditional rendering if gieven answer is wrong */}
                {correctOrder.includes(false) && checkOrder === true && (
                  <div className="flex flex-col gap-7">
                    <Divider height="1px" />
                    <h3 className="text-xl text-gray-800">
                      {t('resultConstants.correctAnswer')}
                    </h3>
                  </div>
                )}
                {areEqual(textAnswer, correctAnswersArray) === false &&
                  checkOrder === false && (
                    <div className="flex flex-col gap-7">
                      <Divider height="1px" />
                      <h3 className="text-xl text-gray-800">
                        {t('resultConstants.correctAnswer')}
                      </h3>
                    </div>
                  )}
                {flag.includes('incorrect') && (
                  <div className="flex flex-col gap-7">
                    <Divider height="1px" />
                    <h3 className="text-xl text-gray-800">
                      {t('resultConstants.correctAnswer')}
                    </h3>
                  </div>
                )}

                {/* {if MCQ is incorrect} */}
                <div className="flex flex-col gap-6">
                  {flag.includes('incorrect') &&
                    correctOption.map(
                      (correctOption: Option, index: number) => {
                        return (
                          <div key={index}>
                            <div
                              key={index}
                              className={
                                'ql-editor rounded border border-solid bg-green-100 p-6'
                              }
                              dangerouslySetInnerHTML={{
                                __html: `${correctOption?.option}`,
                              }}
                            ></div>
                          </div>
                        )
                      }
                    )}

                  {/* {if TEXT type question is wrong } */}
                  {checkOrder === false &&
                    areEqual(textAnswer, correctAnswersArray) === false &&
                    correctAnswer.map(
                      (correctAnswer: CorrectAnswer, index: number) => {
                        return (
                          <div
                            key={index}
                            className={
                              'ql-editor rounded border border-solid bg-green-100 p-6'
                            }
                          >
                            {correctAnswer.answer}
                          </div>
                        )
                      }
                    )}
                  {/* {if order is true and given answer is wrong then showing correct answer} */}
                  {checkOrder === true &&
                    correctOrder.includes(false) &&
                    correctAnswer.map(
                      (correctAnswer: CorrectAnswer, index: number) => {
                        return (
                          <div
                            key={index}
                            className="rounded border border-solid bg-green-100 p-6"
                          >
                            {correctAnswer.answer}
                          </div>
                        )
                      }
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* {if question is skipped by candidate } */}
        {status === 'SKIPPED' && <span>{t('resultConstants.skipped')}</span>}
      </div>
    </div>
  )
}
export default ResultDetailsQuestionsPreview
