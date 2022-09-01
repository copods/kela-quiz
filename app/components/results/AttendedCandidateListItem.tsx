import { commonConstants } from "~/constants/common.constants"

const AttendedCandidateListItem = ({
  email,
  invitedBy,
  name,
  index,
  result,
  review,
}: {
  email: string
  invitedBy: string
  name: string
  index: number
  result: number
  review: boolean
}) => {
  return (
    <div className="col-span-full">
      <div className="col-span-full grid grid-cols-12 gap-3 border-t border-solid border-gray-200 bg-white px-12 py-6">
        <div className=" col-span-1 truncate">
          <span className=" text-base text-gray-700">{index}</span>
        </div>
        <div className="col-span-3 truncate">{name}</div>
        <div className="col-span-4 truncate">{email}</div>
        <div className="col-span-2 truncate">
          <span className="text-base text-gray-700">
            {invitedBy}
          </span>
        </div>
        <div className="col-span-1 truncate">
          <span className=" text-base text-gray-700">{result}%</span>
        </div>
        <div className="col-span-1 truncate">
          <span
            className={`rounded-full px-2 py-1 text-xs text-gray-900 ${
              review ? 'bg-green-200' : 'bg-yellow-200'
            }`}
          >
            {review ? commonConstants.complete : commonConstants.pending}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AttendedCandidateListItem
