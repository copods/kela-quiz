import { useNavigate } from "@remix-run/react"
import { useTranslation } from "react-i18next"

import unauthorrized from "../../public/assets/403.svg"

const NotFound = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const navigateToHomepage = () => {
    navigate("/")
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-24">
        <div className="mb-4">
          <img
            src={unauthorrized}
            alt={t("unauthorized.error")}
            className="h-cooldownSVG w-cooldownSVG"
          />
        </div>
        <div className="text-center leading-8">
          <p className="text-2xl font-bold">{t("unauthorized.error")}</p>
          <div
            className="font-semibold text-primary underline"
            tabIndex={0}
            role="button"
            onClick={() => navigateToHomepage()}
            onKeyUp={(e) => {
              if (e.key === "Enter") navigateToHomepage()
            }}
          >
            {t("unauthorized.gotoDashboard")}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
