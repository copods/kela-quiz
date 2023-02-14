const Chip = ({ text, variant }: { text: string; variant: string }) => {
  const variantMap: any = {
    success: `bg-green-100 text-green-800`,
    error: `bg-red-100 text-red-800`,
    warning: `bg-yellow-100 text-yellow-800`,
  }

  return (
    <span
      className={`rounded-full px-4 py-2 text-xs font-medium ${variantMap[variant]}`}
      data-cy="chip-tag"
    >
      {text}
    </span>
  )
}

export default Chip
