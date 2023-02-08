import { areEqualArrays } from "helper/results.helper"
import { useTranslation } from "react-i18next"
import {
  Option,
  CorrectAnswer,
  QuestionType,
  QuestionTypes,
  QuestionStatus,
} from "~/interface/Interface"

import Divider from "../common-components/divider"
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
    (correctAnswer: CorrectAnswer) => correctAnswer.answer
  )
  let flag = selectedOptions.map((selectedOptions: Option, index: number) => {
    return selectedOptions.option === correctOption[index]?.option
      ? "correct"
      : "incorrect"
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
    <div className="flex w-full  rounded-lg  border border-gray-300 bg-white">
      <div className="flex w-6/12 flex-col gap-6 p-6">
        <div className="flex items-center gap-8">
          <div className="flex w-full items-center justify-between gap-2">
            <span className="text-xl font-medium text-gray-800">
              {t("resultConstants.question")} {index}
            </span>
            <div className="flex items-center gap-8">
              <span className="rounded-52 border border-black px-3 py-1 text-xs font-medium text-gray-800">
                {/* {show chip according to type of question} */}
                {questionType.value === QuestionTypes.text
                  ? t("resultConstants.text")
                  : t("sectionsConstants.mcq")}
              </span>
              {/* {if question type is TEXT then
          CASE1: if ordered then show ordered front of question type
          CASE2: if unordered then show unordered front of question badge
          } */}
              {questionType.value === QuestionTypes.text && (
                <span className="list-item text-xs font-semibold text-gray-800">
                  {checkOrder
                    ? t("resultConstants.order")
                    : t("resultConstants.unordered")}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* {question} */}
        <div
          className="question flex-1   flex-row"
          dangerouslySetInnerHTML={{
            __html: question,
          }}
        ></div>
      </div>
      <hr className="h-[auto] w-px bg-gray-300" />
      <div className="w-6/12 p-6">
        {/* {checking if question is answered by candidate} */}
        {status === QuestionStatus.answered && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-800">
                  {t("resultConstants.givenAnswers")}
                </h3>
                <div>
                  {((checkOrder === true &&
                    questionType.value === QuestionTypes.text &&
                    correctOrder.includes(false)) ||
                    (checkOrder === false &&
                      questionType.value === QuestionTypes.text &&
                      areEqualArrays(textAnswer, correctAnswersArray) ===
                        false) ||
                    (flag.includes("incorrect") === true &&
                      questionType.value !== QuestionTypes.text)) && (
                    <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-medium text-red-800">
                      {t("resultConstants.wrong")}
                    </span>
                  )}
                  {((checkOrder === true &&
                    questionType.value === QuestionTypes.text &&
                    !correctOrder.includes(false)) ||
                    (checkOrder === false &&
                      questionType.value === QuestionTypes.text &&
                      areEqualArrays(textAnswer, correctAnswersArray) ===
                        true) ||
                    (flag.includes("incorrect") === false &&
                      questionType.value !== QuestionTypes.text)) && (
                    <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-medium text-green-800">
                      {t("resultConstants.correct")}
                    </span>
                  )}
                </div>
              </div>

              {questionType.value == QuestionTypes.text &&
                textAnswer.map((textAnswer: CorrectAnswer, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex h-full gap-2 break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600"
                    >
                      {textAnswer}
                    </div>
                  )
                })}

              {questionType.value !== QuestionTypes.text && (
                <div className="flex flex-col gap-6">
                  {selectedOptions.map((selectedOption: Option) => {
                    return (
                      <div key={selectedOption.questionId}>
                        <div className="flex flex-col gap-6">
                          <div
                            className="ql-editor flex h-full gap-2 break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html: `${selectedOption.option}`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            {((checkOrder === true &&
              questionType.value === QuestionTypes.text &&
              correctOrder.includes(false)) ||
              (checkOrder === false &&
                questionType.value === QuestionTypes.text &&
                areEqualArrays(textAnswer, correctAnswersArray) === false) ||
              (flag.includes("incorrect") === true &&
                questionType.value !== QuestionTypes.text)) && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-6">
                    <Divider height="1px" />
                    <h3 className="text-xl font-medium text-gray-800">
                      {t("resultConstants.correctAnswer")}
                    </h3>
                  </div>
                  {/* if MCQ is incorrect */}
                  {flag.includes("incorrect") && (
                    <div className="flex flex-col gap-6">
                      {correctOption.map(
                        (correctOption: Option, index: number) => {
                          return (
                            <div key={index}>
                              <div
                                key={index}
                                className={
                                  "ql-editor flex h-full gap-2 break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600"
                                }
                                dangerouslySetInnerHTML={{
                                  __html: `${correctOption?.option}`,
                                }}
                              ></div>
                            </div>
                          )
                        }
                      )}
                    </div>
                  )}

                  {/* if TEXT type question is wrong */}
                  {checkOrder === false &&
                    areEqualArrays(textAnswer, correctAnswersArray) ===
                      false && (
                      <div className="flex flex-col gap-6">
                        {correctAnswer.map(
                          (correctAnswer: CorrectAnswer, index: number) => {
                            return (
                              <div
                                key={index}
                                className={
                                  "ql-editor flex h-full gap-2 break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-gray-800"
                                }
                              >
                                {correctAnswer.answer}
                              </div>
                            )
                          }
                        )}
                      </div>
                    )}
                  {/* if order is true and given answer is wrong then showing correct answer */}
                  {checkOrder === true && correctOrder.includes(false) && (
                    <div className="flex flex-col gap-6">
                      {correctAnswer.map(
                        (correctAnswer: CorrectAnswer, index: number) => {
                          return (
                            <div
                              key={index}
                              className="flex h-full gap-2 break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600"
                            >
                              {correctAnswer.answer}
                            </div>
                          )
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {/* if question is skipped by candidate  */}
        {status === QuestionStatus.skipped && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-gray-800">
                {t("resultConstants.givenAnswers")}
              </h3>
              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm text-red-800">
                {t("resultConstants.skipped")}
              </span>
            </div>

            <div className="flex h-full gap-2 break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600">
              -
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default ResultDetailsQuestionsPreview
