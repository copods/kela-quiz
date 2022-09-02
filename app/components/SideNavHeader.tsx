import logo from '~/../public/assets/logo.svg'
import { sideNav } from '~/constants/common.constants'

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-4">
      <img src={logo} alt={sideNav.kQuizLogo} />
      <span className="text-3xl font-bold leading-9">
        {sideNav.sideNavHeading}
      </span>
    </div>
  )
}

export default Header
