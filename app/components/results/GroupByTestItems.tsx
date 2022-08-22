import { Link } from '@remix-run/react'
import type { CandidateTest, Test } from '~/interface/Interface'
const GroupByTestItems = ({
  candidateTests,
  index,
}: {
  candidateTests: Test & { count?: number; candidateTest?: CandidateTest }
  index: number
}) => {
  return (
    <div className="col-span-full grid grid-cols-10">
      <div className="col-span-full grid grid-cols-10 gap-3 border-t border-solid border-borderColor px-12 py-4">
        <div className=" col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">{index}</span>
        </div>
        <div className="col-span-3 truncate">
          <Link
            tabIndex={0}
            to={`/results/${candidateTests.id}`}
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
