import { useState } from "react"

import { Icon } from "@iconify/react"
import {
  useLoaderData,
  useNavigate,
  useSubmit,
  useTransition,
} from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"

import BreadCrumb from "../../common-components/BreadCrumb"

import OptionForQuestion from "./OptionForQuestion"
import QuestionEditor from "./QuestionEditor"

import Button from "~/components/common-components/Button"
import { routes } from "~/constants/route.constants"
import { QuestionTypes, sortByOrder } from "~/interface/Interface"

const AddQuestionInSection = () => {
  const { t } = useTranslation()

  const { sectionDetails, questionTypes, currentWorkspaceId } = useLoaderData()
  const [selectedTypeOfQuestion, onQuestionTypeChange] = useState(() => {
    for (let questionType of questionTypes) {
      if (questionType.value === QuestionTypes.multipleChoice) {
        return questionType.id
      }
    }
  })
  const [question, setQuestion] = useState("")
  const [singleChoiceAnswer, setSingleChoiceAnswer] = useState("")

  const [options, setOptions] = useState([
    {
      option: "",
      isCorrect: false,
      id: uuidv4(),
    },
    {
      option: "",
      isCorrect: false,
      id: uuidv4(),
    },
    {
      option: "",
      isCorrect: false,
      id: uuidv4(),
    },
    {
      option: "",
      isCorrect: false,
      id: uuidv4(),
    },
  ])
  const [textCorrectAnswer, setTextCorrectAnswer] = useState([
    {
      id: uuidv4(),
      answer: "",
    },
  ])
  const [checkOrder, setCheckOrder] = useState(false)
  const transition = useTransition()
  const navigate = useNavigate()
  const submit = useSubmit()
  const [answerCount, setAnswerCount] = useState(0)
  const breadCrumbArray = [
    {
      tabName: "testsConstants.testText",
      route: `/${currentWorkspaceId}${routes.tests}`,
    },
    {
      tabName: "addQuestion.addQuestion",
      route: `/${currentWorkspaceId}${routes.tests}/${sectionDetails?.id}${routes.addQuestion}`,
    },
  ]
  const getQuestionType = (id: string) => {
    let quesValue = ""
    for (let quesType of questionTypes) {
      if (quesType.id == id) {
        quesValue = quesType?.value as string
      }
    }
    return quesValue
  }

  const saveQuestion = (addMoreQuestion: boolean) => {
    if (!question.length) {
      toast.error(t("addQuestion.enterTheQuestion"), {
        toastId: "questionRequired",
      })
      return
    }

    if (
      getQuestionType(selectedTypeOfQuestion) ===
        QuestionTypes.multipleChoice ||
      getQuestionType(selectedTypeOfQuestion) === QuestionTypes.singleChoice
    ) {
      let optionCount = 0
      for (let option of options) {
        if (option.option.length) {
          optionCount = optionCount + 1
        }
      }
      if (optionCount < 2) {
        toast.error(t("addQuestion.mimimumTwoOptionsRequired"), {
          toastId: "optionsRequired",
        })
        return
      }
      let flag = 0
      for (let option of options) {
        if (option.isCorrect && !option.option) {
          toast.error(t("statusCheck.selectCorrOption"), {
            toastId: "correctOptionRequired",
          })
          return
        }
        if (option.isCorrect && option.option) {
          flag = 1
        }
      }
      if (
        flag === 0 &&
        getQuestionType(selectedTypeOfQuestion) === QuestionTypes.multipleChoice
      ) {
        toast.error(t("statusCheck.selectCorrOption"), {
          toastId: "correctOptionRequired",
        })
        return
      }
      if (
        flag === 0 &&
        getQuestionType(selectedTypeOfQuestion) ===
          QuestionTypes.singleChoice &&
        !singleChoiceAnswer
      ) {
        toast.error(t("statusCheck.selectCorrOption"), {
          toastId: "correctOptionsRequired",
        })
        return
      }
    }

    if (getQuestionType(selectedTypeOfQuestion) === QuestionTypes.text) {
      for (let answer of textCorrectAnswer) {
        if (answer.answer.length === 0) {
          toast.error("Enter all the Options", { toastId: "optionsRequired" })
          return
        }
      }
    }

    let testQuestion: {
      question: string
      options: Array<{ id: string; option: string }>
      correctAnswer: Array<{ id: string; answer: string }>
      questionTypeId: string
      sectionId: string
      addMoreQuestion: boolean
      checkOrder: boolean
    } = {
      question,
      options: [],
      correctAnswer: [],
      questionTypeId:
        answerCount === 1
          ? questionTypes.find(
              (item: {
                createdAt: string
                displayName: string
                id: string
                updatedAt: string
                value: string
              }) => item.value === QuestionTypes.singleChoice
            )?.id
          : selectedTypeOfQuestion,
      sectionId: sectionDetails?.id as string,
      addMoreQuestion,
      checkOrder: false,
    }
    if (
      getQuestionType(selectedTypeOfQuestion) ===
        QuestionTypes.multipleChoice &&
      answerCount === 1
    ) {
      options.forEach((option) => {
        let optionForQuestion = {
          id: option.id,
          option: option.option,
          isCorrect: option.isCorrect,
        }
        if (option.option) {
          testQuestion.options.push(optionForQuestion)
        }
      })
    } else if (
      getQuestionType(selectedTypeOfQuestion) === QuestionTypes.multipleChoice
    ) {
      options.forEach(
        (option: { option: string; isCorrect: boolean; id: string }) => {
          let optionForQuestion = {
            id: option.id,
            option: option.option,
            isCorrect: option.isCorrect,
          }
          if (option.option) {
            testQuestion.options.push(optionForQuestion)
          }
        }
      )
    } else if (getQuestionType(selectedTypeOfQuestion) === QuestionTypes.text) {
      testQuestion.checkOrder = checkOrder
      textCorrectAnswer.forEach((correctAnswer, index) => {
        let optionForQuestion = {
          id: correctAnswer.id,
          answer: correctAnswer.answer,
          order: index,
        }
        testQuestion.correctAnswer.push(optionForQuestion)
      })
    }
    submit({ quesData: JSON.stringify(testQuestion) }, { method: "post" })
  }
  return (
    <div className="flex h-full flex-col gap-6">
      <BreadCrumb data={breadCrumbArray} />
      <div className="flex">
        <h1
          title={sectionDetails?.name}
          role={sectionDetails?.name}
          aria-label={sectionDetails?.name}
          tabIndex={0}
          className="inline-block text-3xl font-bold text-gray-900"
        >
          {sectionDetails?.name} - {t("addQuestion.addQuestion")}
        </h1>
      </div>
      <div className="flex h-40 flex-1 flex-row gap-6">
        <QuestionEditor
          question={question}
          setQuestion={setQuestion}
          questionTypeList={questionTypes}
          selectedTypeOfQuestion={selectedTypeOfQuestion}
          onQuestionTypeChange={onQuestionTypeChange}
        />
        <OptionForQuestion
          textCorrectAnswer={textCorrectAnswer}
          setTextCorrectAnswer={setTextCorrectAnswer}
          singleChoiceAnswer={singleChoiceAnswer}
          setSingleChoiceAnswer={setSingleChoiceAnswer}
          options={options}
          setOptions={setOptions}
          answerCount={answerCount}
          setAnswerCount={setAnswerCount}
          selectedTypeOfQuestion={selectedTypeOfQuestion}
          questionTypeList={questionTypes}
          checkOrder={checkOrder}
          setCheckOrder={setCheckOrder}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Button
            tabIndex={0}
            id="cancel"
            onClick={() =>
              navigate(
                `/${currentWorkspaceId}${routes.tests}/${sectionDetails?.id}`
              )
            }
            isDisabled={transition.state === "submitting"}
            className="h-9 px-5"
            title={
              transition.state === "submitting" ? "Canceling..." : "Cancel"
            }
            buttonText={
              transition.state === "submitting" ? "Canceling..." : "Cancel"
            }
            variant="secondary-solid"
          />
        </div>
        <div className="flex gap-2">
          <Button
            tabIndex={0}
            id="save-and-exit"
            isDisabled={transition.state === "submitting"}
            className="h-9 px-5"
            onClick={() => saveQuestion(false)}
            variant="primary-solid"
            title={sortByOrder.saveAndExit}
            buttonText={
              <>
                <Icon icon="ic:round-save" className="mr-1" />
                {transition.state === "submitting"
                  ? "Saving..."
                  : sortByOrder.saveAndExit}
              </>
            }
          />
          <Button
            tabIndex={0}
            id="save-and-add-more"
            isDisabled={transition.state === "submitting"}
            className="h-9 px-5"
            onClick={() => saveQuestion(true)}
            variant="primary-solid"
            title={sortByOrder.saveAndAddMore}
            buttonText={
              <>
                <Icon icon="ic:round-save" className="mr-1" />
                {transition.state === "submitting"
                  ? sortByOrder.saving
                  : sortByOrder.saveAndAddMore}
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default AddQuestionInSection
