import headerLogo from '~/../public/assets/logo.svg'
import { candidateHeader } from '~/constants/common.constants'
const CandidateInstructionHeader = () => {
  return (
    <div className="flex h-16 border border-b-gray-300 bg-white px-8 py-4">
      <div className="flex items-center gap-2">
        <img src={headerLogo} alt="" className="h-8" />
        <h3 className="text-lg font-bold text-gray-900">
          {candidateHeader.headerHeading}
        </h3>
      </div>
    </div>
  )
}
export default CandidateInstructionHeader
