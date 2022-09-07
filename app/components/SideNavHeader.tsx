import { Link } from '@remix-run/react'
import logo from '~/../public/assets/logo.svg'
import { commonConstants, sideNav } from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to={routes.dashboard}
        tabIndex={0}
        aria-label={commonConstants.goToDashboard}
        title={commonConstants.logo}
      >
        <img src={logo} alt={commonConstants.logo} />
      </Link>
      <span className="text-3xl">{sideNav.sideNavHeading}</span>
    </div>
  )
}

export default Header
