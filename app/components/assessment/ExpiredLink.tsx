import { useTranslation } from "react-i18next"

import InvalidLink from "../../../public/assets/invalid-link.svg"

import Header from "./Header"

const ExpiredLinkComponent = () => {
  const { t } = useTranslation()
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="grid h-full items-center">
          <div className="w-coolDownCard mx-auto flex flex-col items-center justify-center gap-10 bg-white py-16">
            <img
              src={InvalidLink}
              alt={t("candidateExamConstants.ExpiredLink")}
              className="h-cooldownSVG w-cooldownSVG"
            />
            <span className="text-2xl font-bold text-gray-900">
              {t("candidateExamConstants.ExpiredLink")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ExpiredLinkComponent
