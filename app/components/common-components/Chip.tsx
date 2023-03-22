import type { ChipComponent } from "~/interface/Interface"

const Chip = ({
  text,
  variant = "default",
}: {
  text: string
  variant?: string
}) => {
  const variantMap: ChipComponent = {
    success: "border border-green-100 bg-green-100 text-green-800",
    error: "border border-red-100 bg-red-100 text-red-800",
    warning: "border border-yellow-100 bg-yellow-100 text-yellow-800",
    default: "border border-black text-grey-800",
  }
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        variantMap[variant as keyof ChipComponent]
      }`}
      data-cy="chip-tag"
    >
      {text}
    </span>
  )
}

export default Chip
