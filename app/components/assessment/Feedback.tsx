import type { MutableRefObject } from "react"
import { useEffect, useRef, useState } from "react"

import { useActionData, useLoaderData, useSubmit } from "@remix-run/react"
import { t } from "i18next"

import FeedbackIcon from "../../../public/assets/feedback.svg"
import Button from "../common-components/Button"

import Header from "./Header"
import Rating from "./Rating"

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
      question: "How do you like the experience of K-Quiz portal?",
      option: experienceValue,
      questionType: "rating",
      required: true,
      handleChange: (value: string) => setExperienceValue(value),
    },
    {
      id: "difficulty-level",
      question: "How do you rate the difficulty level of the test?",
      option: levelValue,
      questionType: "rating",
      required: true,
      handleChange: (value: string) => setLevelValue(value),
    },
    {
      id: "overall-experience",
      question: "Please rate your overall experience",
      option: overallValue,
      questionType: "rating",
      required: true,
      handleChange: (value: string) => setOverAllValue(value),
    },
    {
      id: "feedback-comment",
      question: "Write your feedback",
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
          <div className="flex h-728 w-728 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
            <div
              className="flex w-full justify-center border-b border-gray-200 py-6 text-2xl font-bold text-gray-900"
              data-cy="feedback-form-header"
            >
              {`${t(
                "candidateExamConstants.feedbackHeader"
              )}-${assessmentName}`}
            </div>
            <div
              className=" flex flex-1 flex-col overflow-auto"
              ref={bottomRef}
            >
              {feebackDetails.map((feedback) => {
                return (
                  <div
                    className="flex flex-col gap-5 border-b border-gray-200 py-8 px-8"
                    key={feedback.id}
                    data-cy="feedback-question"
                  >
                    <span className="text-lg font-medium text-gray-700">
                      {feedback.required
                        ? feedback.question
                        : `${feedback.question} (Optional)`}
                    </span>

                    {feedback.required ? (
                      <Rating
                        id={feedback.id}
                        count={["1", "2", "3", "4", "5"]}
                        option={feedback.option}
                        handleChange={(data) => feedback.handleChange(data)}
                      />
                    ) : (
                      <textarea
                        id={feedback.id}
                        name={feedback.id}
                        placeholder="Select"
                        className="rounded-lg border border-gray-200 px-3.5 py-2.5"
                        rows={6}
                        onChange={(e) => feedback.handleChange(e.target.value)}
                      >
                        {feebackComment}
                      </textarea>
                    )}
                  </div>
                )
              })}
            </div>
            <div
              className="flex justify-center border-t border-gray-200 py-6"
              data-cy="feedback-form-footer"
            >
              <Button
                className="h-12 w-1/2 text-base"
                variant="primary-solid"
                title={t("commonConstants.submit")}
                buttonText={t("commonConstants.submit")}
                type="submit"
                value="submit"
                name="submit"
                isDisabled={!experienceValue || !levelValue || !overallValue}
                onClick={onSubmit}
              />
            </div>
          </div>
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
