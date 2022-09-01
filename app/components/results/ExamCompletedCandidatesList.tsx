import { useLoaderData } from '@remix-run/react'
import {
  members,
  resultConstants,
  testsConstants,
} from '~/constants/common.constants'
import type { Candidate, CandidateResult, User } from '~/interface/Interface'
import AttendedCandidateListItem from './AttendedCandidateListItem'

const ExamCompletedCandidatesComponent = () => {
  const { attendedCandidateForTest } = useLoaderData()
  const testData = attendedCandidateForTest

  return (
    <>
      {testData?.length !== 0 ? (
        <div className="bg-[#F9FAFB] pb-4">
          <div className="rounded-lg border border-solid border-gray-200 bg-tableHeader shadow-table">
            <div className="grid grid-cols-12 gap-3 py-4 px-12">
              <span className="col-span-1 text-sm font-semibold text-gray-500">
                {resultConstants.srNo}
              </span>
              <span className="col-span-3 text-sm font-semibold text-gray-500">
                {members.name}
              </span>
              <span className="col-span-4 text-sm font-semibold text-gray-500">
                {members.email}
              </span>
              <span className="col-span-2 text-sm font-semibold text-gray-500">
                {resultConstants.invitedBy}
              </span>
              <span className="col-span-1 text-sm font-semibold text-gray-500">
                {resultConstants.result}
              </span>
              <span className="col-span-1 text-sm font-semibold text-gray-500">
                {resultConstants.review}
              </span>
            </div>
            {testData?.map(
              (
                result: CandidateResult & {
                  candidate: Candidate & { createdBy: User }
                },
                i: number
              ) => (
                <div
                  key={result.id}
                  className="memberRow col-span-10 grid rounded-lg"
                >
                  <AttendedCandidateListItem
                    email={result?.candidate?.email}
                    invitedBy={`${result?.candidate?.createdBy?.firstName}`}
                    name={`${result?.candidate?.firstName} ${result?.candidate?.lastName}`}
                    result={
                      (result?.correctQuestion / result?.totalQuestion) * 100
                    }
                    review={result?.isQualified}
                    index={i + 1}
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

export default ExamCompletedCandidatesComponent
