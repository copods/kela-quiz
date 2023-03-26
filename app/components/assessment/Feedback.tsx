import { t } from "i18next"

import Button from "../common-components/Button"

import Header from "./Header"

const FeedbackForm = () => {
  const feebackDetails = [
    {
      question: "How do you like the experience of K-Quiz portal?",
      options: "",
    },
    {
      question: "How do you rate the difficulty level of the test?",
      options: "",
    },
    {
      question: "Please rate your overall experience",
      options: "",
    },
  ]
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex h-full w-full  justify-center bg-questionBackground pt-14 ">
        <div className="h-728 w-728 rounded-lg bg-white shadow-sm">
          <div className="flex w-full justify-center border-b border-gray-200 py-6 text-2xl font-bold text-gray-900">
            {t("candidateExamConstants.feedbackForm")}
          </div>
          <div className="">
            {feebackDetails.map((feedback, index) => {
              return (
                <div
                  className="flex flex-col gap-5 border-b border-gray-200 py-8 pl-8"
                  key={index}
                >
                  {feedback.question}
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    {index + 1}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-center border-t border-gray-200 py-6 ">
            <Button
              className="w-96"
              variant="primary-solid"
              title={t("commonConstants.submit")}
              buttonText={t("commonConstants.submit")}
              type="submit"
              value="submit"
              name="submit"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm
