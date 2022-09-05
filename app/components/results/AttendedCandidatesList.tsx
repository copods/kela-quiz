import { useLoaderData } from '@remix-run/react'
import {
  members,
  resultConstants,
  testsConstants,
} from '~/constants/common.constants'
import type { Candidate, CandidateTest, User } from '~/interface/Interface'
import CandidtateAttendedList from './CandidateListAttended'

const ExamAttendedCandidatesComponent = () => {
  const { attendedCandidateForTest } = useLoaderData()
  const testData = attendedCandidateForTest?.candidateTest
  return (
    <div className="pb-4">
      <div className="bg-tableHeader shadow-table col-span-full rounded-lg border border-solid border-gray-200">
        <div className="col-span-full grid grid-cols-10 gap-3 py-4 px-12">
          <span className="col-span-1 text-sm font-semibold text-gray-500">
            {resultConstants.srNo}
          </span>
          <span className="col-span-3 text-sm font-semibold text-gray-500">
            {members.email}
          </span>
          <span className="col-span-2 text-sm font-semibold text-gray-500">
            {resultConstants.invitedBy}
          </span>
          <span className="col-span-2 text-sm font-semibold text-gray-500">
            {resultConstants.startedAt}
          </span>
        </div>
        {testData?.map(
          (
            data: CandidateTest & {
              candidate: Candidate & { createdBy: User }
            },
            i: number
          ) => (
            <div
              key={data.id}
              className="memberRow col-span-10 grid rounded-lg"
            >
              <CandidtateAttendedList
                email={data?.candidate?.email}
                invitedBy={`${data?.candidate?.createdBy?.firstName} ${data?.candidate?.createdBy?.lastName}`}
                index={i + 1}
                startedAt={data?.startedAt as Date}
              />
            </div>
          )
        )}
        {testData.length === 0 && (
          <div className="flex justify-center bg-white p-7">
            {testsConstants.noCandidateForTest}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamAttendedCandidatesComponent
