import { Link } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import logo from "~/../public/assets/logo.svg"
import { routes } from "~/constants/route.constants"

const Header = ({ title }: { title: string }) => {
  const { t } = useTranslation()

  return (
    <Link
      to={routes.members}
      tabIndex={0}
      aria-label={t("commonConstants.goToDashboard")}
      title={t("commonConstants.logo")}
    >
      <div className="flex items-center gap-4">
        <img src={logo} alt={t("commonConstants.logo")} />
        <span className="text-3xl">{t("sideNav.sideNavHeading")}</span>
      </div>
    </Link>
  )
}

export default Header
