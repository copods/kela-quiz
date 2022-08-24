const CandidtateListOfTestItem = ({
  email,
  invitedBy,
  index,
}: {
  email: string
  invitedBy: string
  index: number
}) => {
  return (
    <div className="col-span-full grid grid-cols-10 ">
      <div
        id="groupByTestRow"
        className="col-span-full grid grid-cols-10 gap-3 border-t-[1px] border-solid border-[#E5E7EB] bg-white px-12 py-4"
      >
        <div className=" col-span-1 truncate">
          <span className=" text-base leading-6 text-gray-700">
            {index + 1}
          </span>
        </div>
        <div className="col-span-3 truncate">{email}</div>
        <div className="col-span-2 truncate">
          <span className=" text-base leading-6 text-gray-700">
            {invitedBy}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CandidtateListOfTestItem
