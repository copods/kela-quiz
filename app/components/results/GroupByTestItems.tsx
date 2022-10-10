import { Link } from '@remix-run/react'
import { resultConstants } from '~/constants/common.constants'

const GroupByTestItems = ({
  index,
  id,
  candidateName,
  candidateInvitedCount,
  candidateAttendedCount,
  testDeletedStatus,
}: {
  index: number
  id: string
  candidateName: string
  candidateInvitedCount: number
  candidateAttendedCount: number | undefined
  testDeletedStatus: boolean
}) => {
  return (
    <div className="col-span-full">
      <div className="groupTestRow col-span-full grid grid-cols-10 gap-3 border-t border-solid border-gray-200 px-12 py-6">
        <div className="col-span-1 truncate">
          <span className="text-base text-gray-700">{index}</span>
        </div>
        <div className="candidate-name col-span-3">
          <Link
            tabIndex={0}
            to={`/results/groupByTests/${id}`}
            id="group-by-item-test"
            data-cy="group-by-item-test"
            className="groupByItemTest text-base font-semibold text-primary"
          >
            {candidateName}
          </Link>
        </div>
        <div className="col-span-2 truncate text-base text-gray-700">
          {candidateInvitedCount}
        </div>
        <div className="col-span-2 text-base text-gray-700">
          {candidateAttendedCount}
        </div>
        <div
          className={`${
            testDeletedStatus ? 'text-yellow-500' : 'text-green-500'
          } col-span-1 text-base`}
        >
          {testDeletedStatus
            ? resultConstants.inactive
            : resultConstants.active}
        </div>
      </div>
    </div>
  )
}
export default GroupByTestItems
