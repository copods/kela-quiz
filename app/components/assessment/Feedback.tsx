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
  const [submitError, setSubmitError] = useState<string | null>(null)

  const bottomRef = useRef() as MutableRefObject<HTMLDivElement>

  const actionData = useActionData()
  const { feedbackSubmittedAlready, assessmentName } = useLoaderData()
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(
    feedbackSubmittedAlready
  )

  const candidateFeedbackDetails = [
    {
      id: "experience-level",
      question: "How do you like the experience of K-Quiz portal?",
      value: experienceValue,
      questionType: "rating",
      required: true,
      handleChange: (value: string) => {
        setSubmitError(null)
        setExperienceValue(value)
      },
    },
    {
      id: "difficulty-level",
      question: "How do you rate the difficulty level of the test?",
      value: levelValue,
      questionType: "rating",
      required: true,
      handleChange: (value: string) => {
        setSubmitError(null)
        setLevelValue(value)
      },
    },
    {
      id: "overall-experience",
      question: "Please rate your overall experience",
      value: overallValue,
      questionType: "rating",
      required: true,
      handleChange: (value: string) => {
        setSubmitError(null)
        setOverAllValue(value)
      },
    },
    {
      id: "feedback-comment",
      question: "Write your feedback",
      value: feebackComment,
      questionType: "text",
      required: false,
      handleChange: (value: string) => {
        setSubmitError(null)
        setFeedbackComment(value)
      },
    },
  ]
  const submit = useSubmit()

  const validateFeedback = () => {
    // Check if all required fields have values
    const requiredFields = candidateFeedbackDetails.filter(
      (field) => field.required
    )
    const missingFields = requiredFields.filter((field) => !field.value)

    if (missingFields.length > 0) {
      return false
    }

    // Check if ratings are within valid range (assuming 1-5)
    const ratingFields = candidateFeedbackDetails.filter(
      (field) => field.questionType === "rating"
    )
    const invalidRatings = ratingFields.filter((field) => {
      const rating = parseInt(field.value)
      return isNaN(rating) || rating < 1 || rating > 5
    })

    if (invalidRatings.length > 0) {
      return false
    }

    return true
  }

  const onSubmit = () => {
    if (!validateFeedback()) {
      setSubmitError("Please fill in all required fields with valid ratings")
      return
    }

    const data = candidateFeedbackDetails.map(
      (item: CandidateFeedbackDetails) => {
        const { handleChange, id, required, ...mainValue } = item
        return mainValue
      }
    )
    submit(
      { details: JSON.stringify({ data: data }) },
      {
        method: "post",
      }
    )
  }

  useEffect(() => {
    if (actionData) {
      if (actionData.resp?.status === 200) {
        setFeedbackSubmitted(true)
        setSubmitError(null)
      } else if (actionData.errors) {
        setSubmitError(
          actionData.errors.title === "commonConstants.commonError"
            ? "There was an error submitting your feedback. Please try again."
            : actionData.errors.title
        )
      }
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
      <div className="bg-questionBackground flex flex-1 justify-center pt-14">
        {!feedbackSubmitted ? (
          <div className="flex flex-col items-center">
            <FeedbackComponent
              feebackDetails={candidateFeedbackDetails}
              assessmentName={assessmentName}
              readOnly={false}
              elementRef={bottomRef}
              handleChange={onSubmit}
            />
            {submitError && (
              <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">
                {submitError}
              </div>
            )}
          </div>
        ) : (
          <div className="h-728 w-coolDownCard mx-auto flex flex-col items-center justify-center gap-10 rounded-lg bg-white py-16">
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
