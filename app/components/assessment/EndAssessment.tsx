import { useTranslation } from "react-i18next"

import EndAssessmentIcon from "../../../public/assets/Frame.svg"

import Header from "./Header"

const EndAssessment = () => {
  const { t } = useTranslation()

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="grid h-full items-center">
          <div className="mx-auto flex w-coolDownCard flex-col items-center justify-center gap-10 bg-white py-16">
            <img
              src={EndAssessmentIcon}
              alt={t("candidateExamConstants.endTest")}
              className="h-cooldownSVG w-cooldownSVG"
            />
            <span className="text-2xl font-bold text-gray-900">
              {t("candidateExamConstants.testCompleted")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndAssessment
