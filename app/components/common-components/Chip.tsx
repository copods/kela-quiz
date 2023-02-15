const Chip = ({
  text,
  variant = "default",
}: {
  text: string
  variant: string
}) => {
  const variantMap: any = {
    success: "bg-green-100 text-green-800 py-2 px-4",
    error: "bg-red-100 text-red-800 py-2 px-4 ",
    warning: "bg-yellow-100 text-yellow-800 py-2 px-4 ",
    default: "border rounded-52 border-black text-grey-800 px-3 py-1",
  }
  return (
    <span
      className={`rounded-full text-xs font-medium ${variantMap[variant]}`}
      data-cy="chip-tag"
    >
      {text}
    </span>
  )
}

export default Chip
