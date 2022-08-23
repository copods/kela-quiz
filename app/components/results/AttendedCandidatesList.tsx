import { useLoaderData } from '@remix-run/react'
import { members, resultConstants } from '~/constants/common.constants'
import AttendedCandidateListItem from './AttendedCandidateListItem'

const ExamAttendedCandidatesComponent = () => {
  const { attendedCandidateForTest } = useLoaderData()
  const testData = attendedCandidateForTest

  return (
    <>
      {testData?.length !== 0 ? (
        <div className="bg-[#F9FAFB] pb-4  ">
          <div className="col-span-full rounded-lg border border-solid border-[#E5E7EB] bg-tableHeader shadow-table">
            <div className="col-span-full grid grid-cols-18 py-4 px-12">
              <span className="col-span-2 text-sm  font-semibold  text-gray-500">
                {resultConstants.srno}
              </span>
              <span className="col-span-4 text-sm  font-semibold  text-gray-500">
                {members.name}
              </span>
              <span className="col-span-5 text-sm  font-semibold  text-gray-500">
                {members.email}
              </span>
              <span className="col-span-3 text-sm  font-semibold  text-gray-500">
                {resultConstants.invitedBy}
              </span>
              <span className="col-span-2 text-sm  font-semibold  text-gray-500">
                {resultConstants.result}
              </span>
              <span className="col-span-2 text-sm  font-semibold  text-gray-500">
                {resultConstants.review}
              </span>
            </div>
            {testData?.map((result: any, i: any) => (
              <div
                key={result.id}
                className="memberRow col-span-10 grid  rounded-lg"
              >
                <AttendedCandidateListItem
                  email={result?.candidate?.email}
                  invitedBy={`${result?.candidate?.createdBy?.firstName}`}
                  name={`${result?.candidate?.firstName} ${result?.candidate?.lastName}`}
                  result={
                    (result?.correctQuestion / result?.totalQuestion) * 100
                  }
                  review={result?.isQualified}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No Candidate for this Test</div>
      )}
    </>
  )
}

export default ExamAttendedCandidatesComponent
