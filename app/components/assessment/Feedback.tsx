import { useState } from "react"

import { useSubmit } from "@remix-run/react"
import { t } from "i18next"

import Button from "../common-components/Button"

import Header from "./Header"
import Rating from "./Rating"

import type { CandidateFeedbackDetails } from "~/interface/Interface"
const FeedbackForm = () => {
  const [experienceValue, setExperienceValue] = useState<string>("")
  const [levelValue, setLevelValue] = useState<string>("")
  const [overallValue, setOverAllValue] = useState<string>("")
  const [feebackComment, setFeedbackComment] = useState<string>("")

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
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1  justify-center bg-questionBackground pt-14 ">
        <div className="flex h-728 w-728 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="flex w-full justify-center border-b border-gray-200 py-6 text-2xl font-bold text-gray-900">
            {t("candidateExamConstants.feedbackForm")}
          </div>
          <div className=" flex flex-1 flex-col overflow-auto">
            {feebackDetails.map((feedback) => {
              return (
                <div
                  className="flex flex-col gap-5 border-b border-gray-200 py-8 px-8"
                  key={feedback.id}
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
          <div className="flex justify-center border-t border-gray-200 py-6">
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
      </div>
    </div>
  )
}

export default FeedbackForm
