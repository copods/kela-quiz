import { Link } from '@remix-run/react'
import logo from '~/../public/assets/logo.svg'
import { sideNav } from '~/constants/common.constants'

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-4">
      <Link
         to={'/dashboard'}
         tabIndex={0}
         aria-label="Go to Dashboard"
         title='logo'>
           <img src={logo} alt="logo" />
      </Link>
      <span className="text-3xl font-bold leading-9">
        {sideNav.sideNavHeading}
      </span>
    </div>
  )
}

export default Header
