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
      <div className="h-full flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default SectionQuestionPage
