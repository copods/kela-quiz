export const FeedbackCard = ({
  id,
  title,
  value,
  icon,
}: {
  id: string
  title: string
  value: number
  icon: string
}) => {
  return (
    <div className="flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-[0px_1px_10px_rgba(0,0,0,0.08)]">
      <div className="flex gap-4">
        <img src={icon} alt={title} />
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600">{title}</span>
          <span className="text-xl font-semibold text-feedbackColor">
            {value}
          </span>
        </div>
      </div>
    </div>
  )
}