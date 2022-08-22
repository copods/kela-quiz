import type { Candidate, CandidateTest } from '~/interface/Interface'
import CandidateSideNav from '../side-nav/CandidateSideNav'

export default function CandidateLayout({
  children,
  candidate,
  candidateTest,
}: {
  children: JSX.Element
  candidate: Candidate
  candidateTest: CandidateTest
}) {
  return (
    <main className="flex max-h-screen min-h-screen">
      <div className="w-2/12 min-w-260 bg-white drop-shadow-md">
        <CandidateSideNav candidate={candidate} candidateTest={candidateTest} />
      </div>
      <div className="h-screen flex-1 overflow-auto bg-slate-50 p-9">
        {children}
      </div>
    </main>
  )
}
