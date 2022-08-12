import { Link } from '@remix-run/react'
import type { CandidateTest, Test } from '~/interface/Interface'
const GroupByTestItems = ({
  candidateTests,
  index,
}: {
  candidateTests: (Test & { candidateTest?: CandidateTest }) | any
  index: number
}) => {
  return (
    <div className="col-span-full grid grid-cols-10">
      <div
        id="groupByTestRow"
        className="col-span-full grid grid-cols-10 border-t border-solid border-[#E5E7EB] px-12 py-4"
      >
        <div className=" col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">
            {index + 1}
          </span>
        </div>
        <div className="col-span-3 truncate">
          <Link to={'/'}>
            <span className="  text-base font-semibold   text-primary">
              {candidateTests.name}
            </span>
          </Link>
        </div>
        <div className="col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">
            {candidateTests.candidateTest?.length}
          </span>
        </div>
        <div className="col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">
            {candidateTests._count.candidateResult === 0
              ? 0
              : candidateTests._count.candidateResult}
          </span>
        </div>
      </div>
    </div>
  )
}
export default GroupByTestItems
