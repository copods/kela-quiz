import type { MutableRefObject } from "react"

import { t } from "i18next"

import Rating from "../assessment/Rating"

import Button from "./Button"

import type { CandidateFeedbackDetails } from "~/interface/Interface"

const FeedbackComponent = ({
  feebackDetails,
  assessmentName,
  readOnly,
  elementRef,
  handleChange,
}: {
  feebackDetails: CandidateFeedbackDetails[]
  assessmentName: string
  readOnly: boolean
  elementRef?: MutableRefObject<HTMLDivElement>
  handleChange: () => void
}) => {
  return (
    <div className="flex h-728 w-728 flex-col overflow-hidden rounded-lg bg-white shadow-sm">
      <div
        className="flex w-full justify-center border-b border-gray-200 py-6 text-2xl font-bold text-gray-900"
        data-cy="feedback-form-header"
      >
        {`${t("candidateExamConstants.feedbackHeader")}-${assessmentName}`}
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
                {feedback.required
                  ? feedback.question
                  : `${feedback.question} (Optional)`}
              </span>

              {feedback.required ? (
                <Rating
                  id={feedback.id}
                  count={["1", "2", "3", "4", "5"]}
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
        className="flex justify-center border-t border-gray-200 py-6"
        data-cy="feedback-form-footer"
      >
        {readOnly ? null : (
          <Button
            className="h-12 w-1/2 text-base"
            variant="primary-solid"
            title={t("commonConstants.submit")}
            buttonText={t("commonConstants.submit")}
            type="submit"
            value="submit"
            name="submit"
            isDisabled={
              !feebackDetails[0].value ||
              !feebackDetails[1].value ||
              !feebackDetails[2].value
            }
            onClick={handleChange}
          />
        )}
      </div>
    </div>
  )
}

export default FeedbackComponent