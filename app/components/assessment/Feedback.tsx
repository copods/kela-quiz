import type { MutableRefObject } from "react"
import { useEffect, useRef, useState } from "react"

import { useActionData, useLoaderData, useSubmit } from "@remix-run/react"
import { t } from "i18next"

import FeedbackIcon from "../../../public/assets/feedback.svg"
import FeedbackComponent from "../common-components/FeedbackComponent"

import Header from "./Header"

import { useScrollIntoView } from "~/hooks/useScrollIntoView"
import type { CandidateFeedbackDetails } from "~/interface/Interface"

const FeedbackForm = () => {
  const [experienceValue, setExperienceValue] = useState<string>("")
  const [levelValue, setLevelValue] = useState<string>("")
  const [overallValue, setOverAllValue] = useState<string>("")
  const [feebackComment, setFeedbackComment] = useState<string>("")

  const bottomRef = useRef() as MutableRefObject<HTMLDivElement>

  const actionData = useActionData()
  const { feedbackSubmittedAlready, assessmentName } = JSON.parse(
    useLoaderData()
  )
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(
    feedbackSubmittedAlready
  )

  const feebackDetails = [
    {
      id: "experience-level",
      question: t("candidateExamConstants.feedbackFirstQuestion"),
      option: experienceValue,
      questionType: "rating",
      required: true,
      handleChange: (value: string) => setExperienceValue(value),
    },
    {
      id: "difficulty-level",
      question: t("candidateExamConstants.feedbackSecondQuestion"),
      option: levelValue,
      questionType: "rating",
      required: true,
      handleChange: (value: string) => setLevelValue(value),
    },
    {
      id: "overall-experience",
      question: t("candidateExamConstants.feedbackThirdQuestion"),
      option: overallValue,
      questionType: "rating",
      required: true,
      handleChange: (value: string) => setOverAllValue(value),
    },
    {
      id: "feedback-comment",
      question: t("candidateExamConstants.feedbackFourthQuestion"),
      option: feebackComment,
      questionType: "text",
      required: false,
      handleChange: (value: string) => setFeedbackComment(value),
    },
  ]
  const submit = useSubmit()

  const onSubmit = () => {
    const data = feebackDetails.map((item: CandidateFeedbackDetails) => {
      const { handleChange, id, required, ...mainValue } = item
      return mainValue
    })
    submit(
      { details: JSON.stringify({ data: data }) },
      {
        method: "post",
      }
    )
  }

  useEffect(() => {
    if (actionData) {
      const data = JSON.parse(actionData)
      data.resp.status === 200 && setFeedbackSubmitted(true)
    }
  }, [actionData])

  const ScrollIntoView = () => {
    useScrollIntoView(bottomRef)
  }

  useEffect(() => {
    if (experienceValue && levelValue && overallValue) {
      ScrollIntoView()
    }
  }, [experienceValue, levelValue, overallValue])

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 justify-center bg-questionBackground pt-14 ">
        {!feedbackSubmitted ? (
          <FeedbackComponent
            feebackDetails={feebackDetails}
            assessmentName={assessmentName}
            readOnly={false}
            elementRef={bottomRef}
            handleChange={onSubmit}
          />
        ) : (
          <div className="mx-auto flex h-728 w-coolDownCard flex-col items-center justify-center gap-10 rounded-lg bg-white py-16">
            <img
              src={FeedbackIcon}
              alt={t("candidateExamConstants.endTest")}
              className="h-cooldownSVG w-cooldownSVG"
            />
            <div className="flex flex-col items-center gap-6">
              <span className="text-2xl font-bold text-gray-900">
                {t("candidateExamConstants.feedbackSubmissionHeading")}
              </span>
              <span className="text-lg font-medium text-gray-500">
                {t("candidateExamConstants.feedbackSubmissionContent")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackForm
