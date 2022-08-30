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
    <>
      {testData?.length !== 0 ? (
        <div className="bg-[#F9FAFB] pb-4  ">
          <div className="rounded-lg border border-solid border-[#E5E7EB] bg-tableHeader shadow-table">
            <div className=" grid grid-cols-10 gap-3 py-4 px-12">
              <span className="col-span-1 text-sm  font-semibold  text-gray-500">
                {resultConstants.srno}
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
          </div>
        </div>
      ) : (
        <div>{testsConstants.noCandidateForTest}</div>
      )}
    </>
  )
}

export default ExamAttendedCandidatesComponent
