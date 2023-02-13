const Chip = ({ text, variant }: { text: string; variant: string }) => {
  const getChipVariant = () => {
    switch (variant) {
      case "success":
        return `rounded-full bg-green-100 px-4 py-2 text-xs font-medium text-green-800`

      case "error":
        return `rounded-full bg-red-100 px-4 py-2 text-xs font-medium text-red-800`

      case "warning":
        return `rounded-full bg-yellow-100 px-4 py-2 text-xs text-red-800`
    }
  }
  return (
    <span className={getChipVariant()} data-cy="chip-tag">
      {text}
    </span>
  )
}

export default Chip
