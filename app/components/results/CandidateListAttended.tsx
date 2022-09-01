import moment from 'moment'

const CandidtateAttendedList = ({
  email,
  invitedBy,
  index,
  startedAt,
}: {
  email: string
  invitedBy: string
  index: number
  startedAt: Date
}) => {
  return (
    <div className="col-span-full grid grid-cols-10 ">
      <div
        id="groupByTestRow"
        className="col-span-full grid grid-cols-10 gap-3 border-t border-solid border-gray-200 bg-white px-12 py-4"
      >
        <div className="col-span-1 truncate">
          <span className=" text-base leading-6 text-gray-700">{index}</span>
        </div>
        <div className="col-span-3 truncate">{email}</div>
        <div className="col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">
            {invitedBy}
          </span>
        </div>
        <div className="col-span-2 truncate">
          {moment(new Date(startedAt)).format('DD MMMM YY mm:ss a')}
        </div>
      </div>
    </div>
  )
}

export default CandidtateAttendedList
