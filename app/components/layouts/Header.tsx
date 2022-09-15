import { commonConstants, sideNav } from '~/constants/common.constants'
import logo from '~/../public/assets/logo.svg'

export default function Header() {
  return (
    <div className="header flex h-16 items-center gap-4 border-b border-solid border-gray-300 bg-white px-6">
      <img src={logo} alt={commonConstants.logo} className="h-8 w-8" />
      <span className="text-2xl font-bold">{sideNav.sideNavHeading}</span>
    </div>
  )
}
