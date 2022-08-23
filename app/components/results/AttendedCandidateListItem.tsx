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
      <div
        id="groupByTestRow"
        className="col-span-full grid grid-cols-12 border-t-[1px] border-solid border-[#E5E7EB] bg-white px-12 py-4 gap-3"
      >
        <div className=" col-span-1 truncate">
          <span className=" text-base leading-6 text-gray-700">
            {index + 1}
          </span>
        </div>
        <div className="col-span-3 truncate">{name}</div>
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
            className={`rounded-full px-2 py-1 text-xs leading-6 text-gray-900 ${
              review ? 'bg-green-200' : 'bg-yellow-200'
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
