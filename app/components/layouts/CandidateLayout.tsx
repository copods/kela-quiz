import { candidateExam } from '~/constants/common.constants'
import type {
  Candidate,
  CandidateTest,
  SectionInTest,
} from '~/interface/Interface'
import TimerComponent from '../assessment/Timer'
import Divider from '../divider'
import CandidateSideNav from '../side-nav/CandidateSideNav'

export default function CandidateLayout({
  children,
  candidate,
  candidateTest,
  heading,
  params = {},
  section,
}: {
  children: JSX.Element
  candidate: Candidate
  candidateTest: CandidateTest
  heading: string
  section?: SectionInTest
  params?: { assessmentId?: string; sectionId?: string; questionId?: string }
}) {
  return (
    <main className="flex max-h-screen min-h-screen">
      <div className="w-2/12 min-w-260 bg-white drop-shadow-md">
        <CandidateSideNav candidate={candidate} candidateTest={candidateTest} />
      </div>
      <div className="flex h-screen flex-1 flex-col bg-slate-50">
        <div className="flex h-20 items-center justify-between bg-white px-9 text-2xl font-semibold leading-8 text-gray-800">
          {params?.questionId ? (
            <>
              <TimerComponent candidateTest={candidateTest} section={section} />
              <form className="flex gap-5" method="post">
                <button
                  className="h-11 w-40 rounded-md border border-primary bg-white text-base font-medium text-primary shadow-sm"
                  name="endExam"
                  value={section?.order}
                  type="submit"
                >
                  {candidateExam.endTest}
                </button>
                <button
                  className="h-11 w-40 rounded-md border border-primary bg-primary text-base font-medium text-gray-50 shadow-sm"
                  name="nextSection"
                  value={section?.order}
                  type="submit"
                >
                  {candidateExam.nextSection}
                </button>
              </form>
            </>
          ) : (
            heading
          )}
        </div>
        <Divider height="2px" />
        <div className="flex-1 overflow-auto p-9">{children}</div>
      </div>
    </main>
  )
}
