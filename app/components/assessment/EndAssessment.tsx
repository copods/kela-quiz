import EndAssessmentIcon from '../../../public/assets/endAssessment.svg'
import Logo from '~/components/Logo'
import { candidateExamConstants, sideNav } from '~/constants/common.constants'

const EndAssessment = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-50">
      <div className="flex h-20 w-full flex-row items-center gap-3 bg-white px-5 shadow">
        <Logo height="40" />
        <span className="text-3xl font-bold text-gray-900">
          {sideNav.sideNavHeading}
        </span>
      </div>
      <div className="mt-[-80px] flex h-full w-full flex-col items-center justify-center gap-4">
        <img
          src={EndAssessmentIcon}
          alt={candidateExamConstants.endAssesment}
        />
        <p className="text-5xl font-bold text-gray-900">
          {candidateExamConstants.assessmentEnd}
        </p>
      </div>
    </div>
  )
}

export default EndAssessment
