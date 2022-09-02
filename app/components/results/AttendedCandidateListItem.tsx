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
}: {
  id: string
  email: string
  invitedBy: string
  name: string
  index: number
  result: number
  review: boolean
  testId: string
}) => {
  return (
    <div className="col-span-full">
      <div className="col-span-full grid grid-cols-12 gap-3 border-t border-solid border-gray-200 bg-white px-12 py-6">
        <div className=" col-span-1 truncate">
          <span className=" text-base leading-6 text-gray-700">{index}</span>
        </div>
        <Link
          to={`/results/groupByTests/${testId}/attended/${id}`}
          className="col-span-3 truncate font-semibold text-primary"
        >
          {name}
        </Link>
        <div className="col-span-4 truncate">{email}</div>
        <div className="col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">
            {invitedBy}
          </span>
        </div>
        <div className="col-span-1 truncate">
          <span className=" text-base leading-6 text-gray-700">{result}%</span>
        </div>
        <div className="col-span-1 truncate">
          <span
            className={`rounded-full  text-base leading-6 text-gray-900 ${
              review ? 'text-green-500' : 'text-yellow-500'
            }`}
          >
            {review ? 'Complete' : 'Pending'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AttendedCandidateListItem
