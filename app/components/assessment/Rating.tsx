const Rating = ({
  id,
  ratings = ["1", "2", "3", "4", "5"],
  option,
  handleChange,
}: {
  id: string
  ratings: string[]
  option: string
  handleChange: (e: string) => void
}): JSX.Element => {
  return (
    <div className="flex w-fit flex-col justify-between gap-2" key={id}>
      <div className="flex flex-row gap-4">
        {ratings.map((rating) => {
          return (
            <label key={rating} htmlFor={rating.toString() + id}>
              <span
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg ${
                  option === rating
                    ? "bg-primary text-white"
                    : "bg-blue-50 hover:bg-blue-100"
                }`}
              >
                {rating}
              </span>
              <input
                name={id}
                hidden
                key={rating}
                type="radio"
                value={rating}
                id={rating.toString() + id}
                onChange={(e) => {
                  handleChange(e.target.value)
                }}
              />
            </label>
          )
        })}
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-gray-500">Not Satisfied</span>
        <span className="text-xs text-gray-500">Satisfied</span>
      </div>
    </div>
  )
}

export default Rating
