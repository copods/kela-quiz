import { candidateExamConstants } from '~/constants/common.constants'
import EndAssessmentIcon from '../../../public/assets/end-test.svg'

import Header from './Header'

const EndAssessment = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-50">
      <Header />
      <div className="py-auto flex-1 overflow-auto">
        <div className="grid h-full items-center">
          <div className="mx-auto flex w-coolDownCard flex-col items-center justify-center gap-8 bg-white py-16">
            <img
              src={EndAssessmentIcon}
              alt="End test"
              className="h-cooldownSVG w-cooldownSVG"
            />
            <span className="text-2xl font-bold text-gray-900">
              {candidateExamConstants.testCompleted}
            </span>
            <span className="text-lg font-medium text-gray-500">
              {candidateExamConstants.candidateContact}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndAssessment
