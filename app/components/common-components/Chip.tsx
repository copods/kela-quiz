const Chip = ({ text, variant }: { text: string; variant: any }) => {
  const getChipVariant = () => {
    switch (variant) {
      case "sucess":
        return `rounded-full bg-green-100 px-4 py-2 text-xs font-medium text-green-800`

      case "wrong":
        return `rounded-full bg-red-100 px-4 py-2 text-xs font-medium text-red-800`

      case "skipped":
        return `rounded-full bg-yellow-100 px-4 py-2 text-xs text-red-800`
    }
  }
  return (
    <span className={`${getChipVariant()}`} data-cy="chip-tag">
      {text}
    </span>
  )
}

export default Chip
