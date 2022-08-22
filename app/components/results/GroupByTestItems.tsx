import type { CandidateTest, Test } from '~/interface/Interface'
import { Link } from '@remix-run/react'
const GroupByTestItems = ({
  candidateTests,
  index,
  id,
}: {
  candidateTests: Test & { candidateTest?: CandidateTest; count?: number }
  index: number
  id: string
}) => {
  // return (
  //   <div className="col-span-full grid grid-cols-10">
  //     <div
  //       id="groupByTestRow"
  //       className="col-span-full grid grid-cols-10 border-t-[1px] border-solid border-[#E5E7EB] px-12 py-4"
  //     >

  return (
    <div className="col-span-full grid grid-cols-10">
      <div
        id="groupByTestRow"
        className="col-span-full grid grid-cols-10 gap-3 border-t border-solid border-borderColor px-12 py-4"
      >
        <div className=" col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">{index}</span>
        </div>
        <div className="col-span-3 truncate">
          <Link
            tabIndex={0}
            to={`/results/groupByTests/${id}`}
            className="text-base font-semibold text-primary"
          >
            {candidateTests.name}
          </Link>
        </div>
        <div className="col-span-2 truncate text-base leading-6 text-gray-700">
          {candidateTests.candidateTest?.length}
        </div>
        <div className="col-span-3 truncate text-base leading-6 text-gray-700">
          {candidateTests?.count}
        </div>
      </div>
    </div>
  )
}
export default GroupByTestItems
