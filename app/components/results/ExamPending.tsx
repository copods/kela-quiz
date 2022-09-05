import { useLoaderData } from '@remix-run/react'
import CandidtateListOfTestItem from '~/components/results/CandidtateListOfTestItem'
import {
  members,
  resultConstants,
  testsConstants,
} from '~/constants/common.constants'

const ExamPendingComponent = () => {
  const { testPreview } = useLoaderData()
  const testData = testPreview?.candidateTest

  return (
    <div className="pb-4">
      <div className="col-span-full rounded-lg border border-solid border-gray-200 bg-gray-100 shadow-base">
        <div className="col-span-full grid grid-cols-10 gap-3 py-4 px-12">
          <span className="col-span-1 text-sm  font-semibold text-gray-500">
            {resultConstants.srNo}
          </span>
          <span className="col-span-3 text-sm font-semibold text-gray-500">
            {members.email}
          </span>
          <span className="col-span-6 text-sm font-semibold text-gray-500">
            {resultConstants.invitedBy}
          </span>
        </div>
        {testData?.map((data: any, i: any) => (
          <div key={data.id} className="memberRow col-span-10 grid rounded-lg">
            <CandidtateListOfTestItem
              email={data?.candidate?.email}
              invitedBy={`${data?.candidate?.createdBy?.firstName} ${data?.candidate?.createdBy?.lastName}`}
              index={i + 1}
            />
          </div>
        ))}
        {testData.length === 0 && (
          <div className="flex justify-center bg-white p-7">
            {testsConstants.noCandidateForTest}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExamPendingComponent
