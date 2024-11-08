import { useSubmit } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import EndAssessmentIcon from "../../../public/assets/Frame.svg"
import Button from "../common-components/Button"

import Header from "./Header"

const EndAssessment = () => {
  const { t } = useTranslation()
  const submit = useSubmit()
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="bg-questionBackground flex-1 overflow-auto">
        <div className="grid h-full items-center">
          <div className="w-coolDownCard mx-auto flex flex-col items-center justify-center gap-10 bg-white py-16">
            <img
              src={EndAssessmentIcon}
              alt={t("candidateExamConstants.endTest")}
              className="h-cooldownSVG w-cooldownSVG"
            />
            <div className="flex flex-col items-center gap-14">
              <span className="text-2xl font-bold text-gray-900">
                {t("candidateExamConstants.testCompleted")}
              </span>
              <Button
                className="h-12 w-1/2 text-base"
                variant="primary-solid"
                title={t("candidateExamConstants.feedbackButtonText")}
                buttonText={t("candidateExamConstants.feedbackButtonText")}
                type="submit"
                value="submit"
                name="submit"
                onClick={async () => {
                  submit({ action: "giveFeedback" }, { method: "post" })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndAssessment
