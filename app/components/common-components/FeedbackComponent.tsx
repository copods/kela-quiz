import type { MutableRefObject } from "react"

import { t } from "i18next"

import Rating from "../assessment/Rating"

import Button from "./Button"

import type { CandidateFeedbackDetails } from "~/interface/Interface"

const FeedbackComponent = ({
  feebackDetails,
  assessmentName,
  givenBy,
  readOnly,
  elementRef,
  handleChange,
  emailReplyHandleChange,
}: {
  feebackDetails: CandidateFeedbackDetails[]
  assessmentName: string
  givenBy?: { name: string; email: string }
  readOnly: boolean
  elementRef?: MutableRefObject<HTMLDivElement>
  handleChange: () => void
  emailReplyHandleChange?: () => void
}) => {
  const isButtonDisabled = () => {
    const isDisabled = feebackDetails.some(
      (feedback) => !feedback.value && feedback.required
    )
    return isDisabled
  }

  return (
    <div className="flex h-728 w-728 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
      <div
        className="flex w-full flex-col items-center border-b border-gray-200 py-6"
        data-cy="feedback-form-header"
      >
        <span className="text-2xl font-bold text-gray-900">{`${t(
          "candidateExamConstants.feedbackHeader"
        )}-${assessmentName}`}</span>
        {givenBy && (
          <span className="text-sm font-medium text-gray-500">{`by ${givenBy.name} | ${givenBy.email} `}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col overflow-auto" ref={elementRef}>
        {feebackDetails.map((feedback) => {
          return (
            <div
              className="flex flex-col gap-5 border-b border-gray-200 p-8"
              key={feedback.id}
              data-cy="feedback-question"
            >
              <span className="text-lg font-medium text-gray-700">
                {feedback.required || readOnly
                  ? feedback.question
                  : `${feedback.question} (Optional)`}
              </span>

              {feedback.questionType === "rating" ? (
                <Rating
                  id={feedback.id}
                  ratings={["1", "2", "3", "4", "5"]}
                  option={feedback.value}
                  handleChange={(data) => {
                    !readOnly && feedback.handleChange(data)
                  }}
                />
              ) : (
                <textarea
                  id={feedback.id}
                  name={feedback.id}
                  placeholder="Select"
                  className="rounded-lg border border-gray-200 px-3.5 py-2.5"
                  rows={6}
                  onChange={(e) =>
                    !readOnly && feedback.handleChange(e.target.value)
                  }
                  disabled={readOnly && true}
                  maxLength={500}
                >
                  {feedback.value}
                </textarea>
              )}
            </div>
          )
        })}
      </div>
      <div
        className={`flex border-t border-gray-200 py-6 px-8 ${
          readOnly ? "justify-end" : "justify-center"
        }`}
        data-cy="feedback-form-footer"
      >
        {readOnly ? (
          <div className="flex items-center gap-4">
            <span
              className="cursor-pointer text-sm font-medium text-gray-500"
              tabIndex={0}
              role="button"
              onKeyUp={() => {}}
              onClick={emailReplyHandleChange}
            >
              {t("feedback.replyWithMail")}
            </span>
            <Button
              className="text-base"
              variant="primary-solid"
              title={t("commonConstants.close")}
              buttonText={t("commonConstants.close")}
              onClick={handleChange}
              data-cy="close"
            />
          </div>
        ) : (
          <Button
            className="h-12 w-1/2 text-base"
            variant="primary-solid"
            title={t("commonConstants.submit")}
            buttonText={t("commonConstants.submit")}
            type="submit"
            value="submit"
            name="submit"
            isDisabled={isButtonDisabled()}
            onClick={handleChange}
          />
        )}
      </div>
    </div>
  )
}

export default FeedbackComponent
