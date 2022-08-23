import { Outlet } from '@remix-run/react'
import type { CandidateTest, SectionInTest } from '~/interface/Interface'

const SectionQuestionPage = ({
  section,
  params,
  candidateTest,
}: {
  section: SectionInTest
  params: { assessmentId: string; sectionId?: string; questionId?: string }
  candidateTest: CandidateTest
}) => {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          {section.section.name}
        </h1>
        {params?.questionId && (
          <div className="flex items-center gap-4 text-lg font-medium text-gray-800">
            <span className="text-sm font-medium text-gray-500">
              {candidateExam.timeRemaining}
            </span>{' '}
            <span
              className={`flex w-36 justify-center rounded-lg px-4 py-1 text-lg font-bold text-gray-800 ${
                time > 120 ? 'bg-blue-100' : 'bg-red-100'
              }`}
            >
              {getFormattedTime(time)} mins
            </span>
          </div>
        )}
      </div> */}
      <div className="h-full flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default SectionQuestionPage
