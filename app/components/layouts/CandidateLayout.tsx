import { candidateExamConstants } from '~/constants/common.constants'
import type {
  Candidate,
  CandidateTest,
  SectionInCandidateTest,
  SectionInTest,
} from '~/interface/Interface'
import TimerComponent from '../assessment/Timer'
import Divider from '../divider'
import Button from '../form/Button'
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
  let candidateSection: SectionInCandidateTest | null = null
  for (let sec of candidateTest?.sections) {
    if (section?.section?.id === sec?.section?.id) {
      candidateSection = sec
      break
    }
  }

  return (
    <main className="flex max-h-screen min-h-screen">
      <div className="w-2/12 min-w-260 bg-white drop-shadow-md">
        <CandidateSideNav candidate={candidate} candidateTest={candidateTest} />
      </div>
      <div className="flex h-screen flex-1 flex-col bg-slate-50">
        <div className="flex h-20 items-center justify-between bg-white px-9 text-2xl font-semibold leading-8 text-gray-800">
          {params?.questionId ? (
            <>
              {candidateSection && (
                <TimerComponent
                  candidateSection={candidateSection}
                  section={section as SectionInTest}
                />
              )}
              <form className="flex gap-5" method="post">
                <Button 
                  buttonText={candidateExamConstants.endTest} 
                  varient="primary-outlined" 
                  name='endExam'
                  value={section?.order}
                  type="submit"
                  className='px-5'
                />
                <Button 
                buttonText={candidateExamConstants.nextSection}
                name="nextSection"
                value={section?.order}
                varient="primary-outlined"
                type='submit'
                className='px-5'
                />
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
