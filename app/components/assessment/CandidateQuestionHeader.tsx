import { useLoaderData } from '@remix-run/react'
import logo from '~/../public/assets/logo.svg'
import { commonConstants, sideNav } from '~/constants/common.constants'
import TimerComponent from './Timer'

const CandidateQuestionHeader = () => {
  const { candidateTests, section } = useLoaderData()

  return (
    <div className="mr-auto flex min-h-16 w-full items-center justify-between border px-5">
      <div className="flex w-64 items-center gap-4">
        <img className="h-8 w-8" src={logo} alt={commonConstants.logo} />
        <span className="text-2xl font-bold">{sideNav.sideNavHeading}</span>
      </div>
      <div className="w-min-64 flex self-center text-center text-xl font-bold">
        Section {section.order} - {candidateTests.sections.length}:{' '}
        {candidateTests.test.name}
      </div>
      <div className="flex w-64 items-center justify-end">
        <TimerComponent candidateSection={candidateTests} section={section} />
      </div>
    </div>
  )
}

export default CandidateQuestionHeader
