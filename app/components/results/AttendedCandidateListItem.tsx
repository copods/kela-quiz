import { commonConstants } from '~/constants/common.constants'
import { Link } from '@remix-run/react'

const AttendedCandidateListItem = ({
  id,
  email,
  invitedBy,
  name,
  index,
  result,
  review,
  testId,
  candidateResultId,
}: {
  id: string
  email: string
  invitedBy: string
  name: string
  index: number
  result: number
  review: boolean
  testId: string
  candidateResultId: string
}) => {
  return (
    <div className="col-span-full">
      <div className="col-span-full grid grid-cols-12 gap-3 rounded-b-lg border-t border-solid border-gray-200 bg-white px-12 py-6">
        <div className=" col-span-1 truncate">
          <span className=" text-base text-gray-700">{index}</span>
        </div>
        <Link
          to={`/results/groupByTests/${testId}/${candidateResultId}`}
          className="col-span-3 truncate font-semibold text-primary"
        >
          {name}
        </Link>
        <div className="col-span-4 truncate">{email}</div>
        <div className="col-span-2 truncate">
          <span className="text-base text-gray-700">{invitedBy}</span>
        </div>
        <div className="col-span-1 truncate">
          <span className=" text-base text-gray-700">
            {result >= 0 ? `${result}%` : ''}
          </span>
        </div>
        <div className="col-span-1">
          <span
            className={`rounded-full px-2 py-1 text-xs text-gray-900 ${
              result >= 0 ? 'bg-green-200' : 'bg-yellow-200'
            }`}
          >
            {result >= 0 ? commonConstants.complete : commonConstants.pending}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AttendedCandidateListItem
