import { useLoaderData, useLocation, useNavigate } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import alreadySubmitted from "../../../public/assets/alreadySubmitted.svg"
import Button from "../common-components/Button"

import Header from "./Header"
const AlredySubmitted = () => {
  const { t } = useTranslation()
  const loader = JSON.parse(useLoaderData())

  const path = useLocation()
  const navigate = useNavigate()
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex-1 overflow-auto bg-questionBackground">
        <div className="grid h-full items-center">
          <div className="mx-auto flex w-coolDownCard flex-col items-center justify-center gap-10 bg-white py-16">
            <img
              src={alreadySubmitted}
              alt={t("candidateExamConstants.alreadySubmitted")}
              className="h-cooldownSVG w-cooldownSVG"
            />
            <div className="flex flex-col items-center gap-14">
              <span className="text-2xl font-bold text-gray-900">
                {t("candidateExamConstants.alreadyExamSubmitted")}
              </span>
              {!loader && (
                <Button
                  className="h-12 w-1/2 text-base"
                  variant="primary-solid"
                  title={t("candidateExamConstants.feedbackButtonText")}
                  buttonText={t("candidateExamConstants.feedbackButtonText")}
                  type="submit"
                  value="submit"
                  name="submit"
                  onClick={() => {
                    navigate(
                      path.pathname.replace("end-assessment", "feedback-form")
                    )
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AlredySubmitted
