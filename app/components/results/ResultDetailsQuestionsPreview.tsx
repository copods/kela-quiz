import { useTranslation } from "react-i18next"

import Chip from "../common-components/Chip"
import Divider from "../common-components/divider"

import type { Option, CorrectAnswer, QuestionType } from "~/interface/Interface"
import { QuestionTypes, QuestionStatus } from "~/interface/Interface"

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
  function areEqualAsnwersArray(
    textAnswer: CorrectAnswer[],
    correctAnswersArray: string[]
  ) {
    let textAnswerArrayLength = textAnswer.length
    let correctAnswersArrayLength = correctAnswersArray.length

    // If lengths of array are not equal means
    // Answers are not equal
    if (textAnswerArrayLength != correctAnswersArrayLength) return false

    // Sort both arrays
    textAnswer.sort()
    correctAnswersArray.sort()

    // Linearly compare elements
    for (let i = 0; i < textAnswerArrayLength; i++)
      if (textAnswer[i] != (correctAnswersArray[i] as unknown as CorrectAnswer))
        return false

    // If all elements were same.
    return true
  }
  const correctAnswersArray = correctAnswer.map(
    (correctAnswer: CorrectAnswer) => correctAnswer.answer
  )
  let flag = selectedOptions.map((selectedOptions: Option, index: number) => {
    return selectedOptions.id === correctOption[index]?.id
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
  const orderFlag = correctOrder.includes(false)
  return (
    <div className="flex w-full  rounded-lg  border border-gray-300 bg-white">
      <div className="flex w-6/12 flex-col gap-6 p-6">
        <div className="flex w-full items-center justify-between gap-2">
          <span className="text-xl font-medium text-gray-800">
            {t("candidateExamConstants.question")} {index}
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

        {/* {question} */}
        <div
          className="question flex-1   flex-row"
          dangerouslySetInnerHTML={{
            __html: question,
          }}
        />
      </div>
      <hr className="h-[auto] w-px bg-gray-300" />
      <div className="flex w-6/12 flex-col gap-6 p-6">
        {/* {checking if question is answered by candidate} */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium text-gray-800">
            {t("resultConstants.givenAnswers")}
          </h3>
          {status === QuestionStatus.answered ? (
            <>
              {((checkOrder === true &&
                questionType.value === QuestionTypes.text &&
                orderFlag) ||
                (checkOrder === false &&
                  questionType.value === QuestionTypes.text &&
                  areEqualAsnwersArray(textAnswer, correctAnswersArray) ===
                    false) ||
                (flag.includes("incorrect") === true &&
                  questionType.value !== QuestionTypes.text)) && (
                <Chip text={t("resultConstants.wrong")} variant={"wrong"} />
              )}
              {((checkOrder === true &&
                questionType.value === QuestionTypes.text &&
                orderFlag === false) ||
                (checkOrder === false &&
                  questionType.value === QuestionTypes.text &&
                  areEqualAsnwersArray(textAnswer, correctAnswersArray) ===
                    true) ||
                (flag.includes("incorrect") === false &&
                  questionType.value !== QuestionTypes.text)) && (
                <Chip text={t("resultConstants.correct")} variant={"sucess"} />
              )}
            </>
          ) : (
            <Chip text={t("resultConstants.skipped")} variant={"skipped"} />
          )}
        </div>
        {status === QuestionStatus.answered ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              {questionType.value == QuestionTypes.text
                ? textAnswer.map((textAnswer: CorrectAnswer, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex h-full break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600"
                      >
                        {textAnswer}
                      </div>
                    )
                  })
                : questionType.value !== QuestionTypes.text &&
                  selectedOptions.map((selectedOption: Option) => {
                    return (
                      <div
                        key={selectedOption.questionId}
                        className="ql-editor h-full break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: `${selectedOption.option}`,
                        }}
                      />
                    )
                  })}
            </div>
            {((checkOrder === true &&
              questionType.value === QuestionTypes.text &&
              orderFlag) ||
              (checkOrder === false &&
                questionType.value === QuestionTypes.text &&
                areEqualAsnwersArray(textAnswer, correctAnswersArray) ===
                  false) ||
              (flag.includes("incorrect") === true &&
                questionType.value !== QuestionTypes.text)) && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <Divider height="1px" />
                  <h3 className="text-xl font-medium text-gray-800">
                    {t("resultConstants.correctAnswer")}
                  </h3>
                </div>
                {/* if MCQ is incorrect */}
                {flag.includes("incorrect") &&
                  correctOption.map((correctOption: Option, index: number) => {
                    return (
                      <div
                        key={index}
                        className={
                          "ql-editor flex h-full gap-2 break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600"
                        }
                        dangerouslySetInnerHTML={{
                          __html: `${correctOption?.option}`,
                        }}
                      />
                    )
                  })}

                {/* if TEXT type question is wrong */}
                {checkOrder === false &&
                  areEqualAsnwersArray(textAnswer, correctAnswersArray) ===
                    false &&
                  correctAnswer.map(
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
                {/* if order is true and given answer is wrong then showing correct answer */}
                {checkOrder === true &&
                  orderFlag === true &&
                  correctAnswer.map(
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
        ) : (
          <div className="flex break-normal rounded-lg border border-solid border-gray-300 bg-gray-50 p-4 text-base font-normal text-gray-600">
            -
          </div>
        )}
      </div>
    </div>
  )
}
export default ResultDetailsQuestionsPreview
