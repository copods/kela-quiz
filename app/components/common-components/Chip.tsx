const Chip = ({ text, variant }: { text: string; variant: string }) => {
  const variantMap: any = {
    success: "green",
    error: "red",
    warning: "yellow",
  }

  return (
    <span
      className={`rounded-full px-4 py-2 text-xs font-medium bg-${variantMap[variant]}-100 text-${variantMap[variant]}-800 `}
      data-cy="chip-tag"
    >
      {text}
    </span>
  )
}

export default Chip
