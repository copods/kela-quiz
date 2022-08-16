import type { CandidateTest, Test } from '~/interface/Interface'
import { NavLink } from '@remix-run/react'
const GroupByTestItems = ({
  candidateTests,
  index,
  id,
}: {
  candidateTests: Test & { candidateTest?: CandidateTest }
  index: number
  id: string
}) => {
  return (
    <div className="col-span-full grid grid-cols-10">
      <div
        id="groupByTestRow"
        className="col-span-full grid grid-cols-10 border-t-[1px] border-solid border-[#E5E7EB] px-12 py-4"
      >
        <div className=" col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">{index}</span>
        </div>
        <div className="col-span-3 truncate">
          <NavLink to={`/results/groupByTests/${id}`} key={index}>
            <span
              className="  text-base font-semibold text-primary"
              id="group-by-item-test"
            >
              {candidateTests.name}
            </span>
          </NavLink>
        </div>
        <div className="col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">
            {candidateTests.candidateTest?.length}
          </span>
        </div>
        <div className="col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">0</span>
        </div>
      </div>
    </div>
  )
}
export default GroupByTestItems
