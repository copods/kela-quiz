// import logo from '~/../public/assets/logo.svg'
import { Icon } from '@iconify/react'
import { NavLink, useLoaderData, useLocation } from '@remix-run/react'
import candidateLogo from '~/../public/assets/candidateLogo.svg'
import { candidateExam, QuestionStatus } from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
import type {
  Candidate,
  CandidateQuestion,
  CandidateTest,
  SectionInCandidateTest,
} from '~/interface/Interface'
import Divider from '../divider'

const CandidateSideNav = ({
  candidate,
  candidateTest,
}: {
  candidate: Candidate
  candidateTest: CandidateTest
}) => {
  const location = useLocation() // to get current location

  const routeData = useLoaderData()

  const getTotalTime = () => {
    let totalTimeInSeconds = 0
    candidateTest?.test?.sections.forEach(
      (section: { timeInSeconds: number }) => {
        totalTimeInSeconds += section?.timeInSeconds
      }
    )
    return totalTimeInSeconds / 60
  }

  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="p-5">
        <div className="flex items-center gap-4">
          <img src={candidateLogo} alt="logo" height={'40px'} />
        </div>
      </div>
      <Divider height="2px" />
      <div className="flex flex-col gap-1 p-5">
        <div className="text-base font-semibold text-gray-900">
          {candidateTest?.test?.name}
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
          <Icon icon={'ic:outline-access-time'} className="text-base" />
          <span>{candidateExamConstants.timeLimit}:</span>
          <span className="text-gray-800">{getTotalTime()} Mins</span>
        </div>
      </div>
      <Divider height="1px" />

      {/* Candidate Sidenav */}
      <div className="flex flex-1 flex-col gap-6 py-6">
        {/* sidenav menu group */}
        <div className="flex flex-col gap-2.5">
          <div className="px-5 text-sm font-semibold text-gray-900">
            {candidateExamConstants.assessmentDetails}
          </div>
          <div
            className={`flex h-11 items-center text-sm ${
              location.pathname.includes(routes.instructions)
                ? 'border-0 border-l-4 border-primary bg-blue-50 px-4 font-semibold text-primary'
                : 'px-5 font-medium text-gray-800 '
            }`}
          >
            {candidateExamConstants.info}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="px-5 text-sm font-semibold text-gray-900">
            {candidateExamConstants.assessmentTests}
          </div>
          <div>
            {candidateTest?.sections.map((section: SectionInCandidateTest) => {
              return (
                <div key={section.id}>
                  <div
                    className={`flex h-11 items-center justify-between gap-2 text-sm ${
                      routeData?.currentSectionInTest?.section.id ===
                        section.section.id && !routeData.params?.questionId
                        ? 'border-0 border-l-4 border-primary bg-blue-50 px-4 font-semibold text-primary'
                        : 'px-5 font-medium text-gray-800'
                    }`}
                  >
                    <span>{section?.section?.name}</span>
                    {!section?.startedAt &&
                      routeData?.currentSectionInTest?.section.id !=
                        section.section.id && (
                        <Icon
                          icon={'bytesize:lock'}
                          className="text-lg text-gray-800"
                        />
                      )}
                    {section?.endAt && (
                      <Icon
                        icon={'teenyicons:tick-circle-outline'}
                        className="text-lg text-green-800"
                      />
                    )}
                  </div>
                  {routeData?.currentSectionInTest?.section.id ===
                    section.section.id &&
                    routeData.params?.questionId &&
                    section?.questions.map((question: CandidateQuestion) => {
                      return (
                        <NavLink
                          key={question.id}
                          to={`/assessment/${routeData?.params?.assessmentId}/${routeData?.params?.sectionId}/${question?.id}`}
                          className={({ isActive }) =>
                            isActive
                              ? 'flex h-11 items-center justify-between gap-2 border-0 border-l-4 border-primary bg-blue-50 pl-7 pr-8 text-sm font-semibold text-primary'
                              : 'flex h-11 items-center justify-between gap-2 px-8 text-sm font-medium text-gray-800'
                          }
                        >
                          <span>
                            {candidateExamConstants.question} {question?.order}
                          </span>
                          {question.status === QuestionStatus.skipped && (
                            <Icon
                              icon={'bi:dash-circle'}
                              className="text-lg text-red-800"
                            />
                          )}
                          {question.status === QuestionStatus.answered && (
                            <Icon
                              icon={'teenyicons:tick-circle-outline'}
                              className="text-lg text-green-800"
                            />
                          )}
                        </NavLink>
                      )
                    })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="justify-end p-5">
        <div>
          <hr className="mb-3 mt-3 border border-solid border-gray-300" />
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-lg font-medium leading-7 text-white">
                  {candidate?.firstName?.slice(0, 1)}
                  {candidate?.lastName?.slice(0, 1)}
                </span>
              </div>

              <div className="flex-col gap-2">
                <p className="w-full truncate text-xs font-semibold leading-4 text-gray-900">
                  {candidate.firstName} {candidate.lastName}
                </p>
                <p className="w-full truncate text-xs leading-4 text-gray-500">
                  {candidate.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateSideNav
