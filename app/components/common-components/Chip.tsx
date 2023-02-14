const Chip = ({ text, variant }: { text: string; variant: string }) => {
  const variantMap: any = {
    success: `bg-green-100`,
    error: `bg-red-100`,
    warning: `bg-yellow-100`,
  }

  return (
    <span
      className={`rounded-full px-4 py-2 text-xs font-medium ${variantMap[variant]} text-${variantMap[variant]}-800 `}
      data-cy="chip-tag"
    >
      {text}
    </span>
  )
}

export default Chip
