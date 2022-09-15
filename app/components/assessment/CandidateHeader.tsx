import logo from '~/../public/assets/logo.svg'
import { commonConstants, sideNav } from '~/constants/common.constants'

const CandidateHeader = () => {
  return (
    <div className="flex items-center gap-4 bg-white pl-4">
      <div className="p-2">
        <img src={logo} alt={commonConstants.logo} />
      </div>
      <div className="font-bold">{sideNav.sideNavHeading}</div>
    </div>
  )
}

export default CandidateHeader
