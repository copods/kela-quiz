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
      <div className="col-span-full grid grid-cols-10 border-t border-solid border-gray-200 bg-white px-12 py-6">
        <div className="col-span-1 truncate">
          <span className="text-base text-gray-700">{index}</span>
        </div>
        <div className="col-span-3 truncate">{email}</div>
        <div className="col-span-2 truncate">
          <span className="text-base text-gray-700">{invitedBy}</span>
        </div>
      </div>
    </div>
  )
}

export default CandidtateListOfTestItem
