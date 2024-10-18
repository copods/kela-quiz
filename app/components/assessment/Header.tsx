import { useTranslation } from "react-i18next"

import logo from "~/../public/assets/logo.svg"

export default function Header() {
  const { t } = useTranslation()

  return (
    <div className="header flex h-16 items-center gap-4 border-b border-solid border-gray-300 bg-white p-6">
      <img src={logo} alt={t("commonConstants.logo")} className="h-8 w-8" />
      <span className="text-2xl font-bold">{t("sideNav.sideNavHeading")}</span>
    </div>
  )
}
