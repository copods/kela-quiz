import type { CandidateTest, Test } from '~/interface/Interface'
import { Link } from '@remix-run/react'
import { resultConstants } from '~/constants/common.constants'
const GroupByTestItems = ({
  candidateTests,
  index,
  id,
}: {
  candidateTests: Test & { candidateTest?: CandidateTest; count?: number }
  index: number
  id: string
}) => {
  return (
    <div className="col-span-full">
      <div
        id="groupByTestRow"
        className="col-span-full grid grid-cols-10 gap-3 border-t border-solid border-borderColor px-12 py-4"
      >
        <div className=" col-span-1 truncate">
          <span className=" text-base leading-6 text-gray-700">{index}</span>
        </div>
        <div className="candidate-name col-span-3 truncate">
          <Link
            tabIndex={0}
            to={`/results/groupByTests/${id}`}
            id="group-by-item-test"
            className="text-base font-semibold text-primary"
          >
            {candidateTests.name}
          </Link>
        </div>
        <div className="col-span-2 truncate text-base leading-6 text-gray-700">
          {candidateTests.candidateTest?.length}
        </div>
        <div className="col-span-2 text-base leading-6 text-gray-700">
          {candidateTests?.count}
        </div>
        <div
          className={`${
            candidateTests?.deleted ? 'text-yellow-500' : 'text-green-500'
          } col-span-1 text-base leading-6`}
        >
          {candidateTests?.deleted
            ? resultConstants.inactive
            : resultConstants.active}
        </div>
      </div>
    </div>
  )
}
export default GroupByTestItems
