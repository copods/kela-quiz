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
  const correctAnswersArray = correctAnswer.map((a: any) => a.answer)
  let flag = selectedOptions.map((selectedOptions: Option, index: number) => {
    return selectedOptions.option === correctOption[index]?.option
      ? 'correct'
      : 'incorrect'
  })
  return (
    <div className="flex w-full  rounded-lg  border border-gray-300 bg-gray-50">
      <div className="flex w-6/12 flex-col gap-6 p-6">
        <div className="flex items-center gap-8">
          <span className="rounded-52 border border-gray-700 px-3 text-sm text-gray-700">
            {/* {SHOW CHIP ACCORDING TO TYPE OF QUESTION} */}
            {questionType.displayName === 'Text'
              ? t('resultConstants.text')
              : t('sectionsConstants.mcq')}
          </span>
          {/* {IF QUESTION TYPE IS TEXT THEN
          CASE1: IF ORDERED THEN SHOW ORDERED FRONT OF QUESTION TYPE
          CASE2: IF UNORDERED THEN SHOW UNORDERED FRONT OF QUESTION BADGE
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
          {/* {SHOWING QUESTION NUMBER} */}
          <span>
            {t('resultConstants.q')}.{index}
          </span>
          {/* {QUESTION} */}
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
        {status === 'ANSWERED' && (
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl text-gray-800">
                  {t('resultConstants.givenAnswer')}
                </h3>
              </div>

              {checkOrder === true &&
                textAnswer.map((textAnswer: any, index: number) => {
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
                <div className="flex flex-col gap-6">
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
                            correctAnswersArray.includes(textAnswer)
                              ? 'rounded border border-solid bg-green-100 p-6'
                              : 'rounded border border-solid bg-[#FAD1E5] p-6'
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
              <div className="flex flex-col gap-7">
                {areEqual(textAnswer, correctAnswersArray) === false && (
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

                {/* {if MCQ is incorrrect} */}
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
                    correctAnswer.map((correctAnswer: any, index: number) => {
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
                    })}
                </div>
              </div>
            </div>
          </div>
        )}
        {status === 'SKIPPED' && <span>{t('resultConstants.skipped')}</span>}
      </div>
    </div>
  )
}
export default ResultDetailsQuestionsPreview
