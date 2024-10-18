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
    <div className="col-span-1 flex gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-cardShadow">
      <img src={icon} alt={title} />
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-600">{title}</span>
        <span className="text-xl font-semibold text-feedbackColor">
          {value}
        </span>
      </div>
    </div>
  )
}
