import { useTranslation } from "react-i18next"

import InvalidLink from "../../../public/assets/invalid-link.svg"

import Logo from "~/components/Logo"

const InvalidLinkComponent = () => {
  const { t } = useTranslation()

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-50">
      <div className="flex h-20 w-full flex-row items-center gap-3 bg-white px-5 shadow">
        <Logo height="40" />
        <span className="text-3xl font-bold text-gray-900">
          {t("sideNav.sideNavHeading")}
        </span>
      </div>
      <div className="-mt-20 flex h-full w-full flex-col items-center justify-center gap-10">
        <img src={InvalidLink} alt={t("commonConstants.invalidLink")} />
        <p className="text-2xl font-bold text-gray-900">
          {t("candidateExamConstants.wrongLink")}
        </p>
      </div>
    </div>
  )
}

export default InvalidLinkComponent
