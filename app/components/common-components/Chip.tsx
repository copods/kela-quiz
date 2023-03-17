const Chip = ({
  text,
  variant = "default",
  rightChildren,
}: {
  text: string
  variant?: string
  rightChildren?: JSX.Element
}) => {
  const variantMap: any = {
    success: "border border-green-100 bg-green-100 text-green-800",
    error: "border border-red-100 bg-red-100 text-red-800",
    warning: "border border-yellow-100 bg-yellow-100 text-yellow-800",
    default: "border border-black text-grey-800",
    editIcon:
      "border border-gray-200 text-gray-700 bg-blue-50 px-4 text-base py-1.5 w-3/6",
  }
  return (
    <div
      className={`flex items-center justify-between rounded-full px-3 py-1 text-xs font-medium ${variantMap[variant]}`}
      data-cy="chip-tag"
    >
      {text}
      {rightChildren && rightChildren}
    </div>
  )
}

export default Chip
