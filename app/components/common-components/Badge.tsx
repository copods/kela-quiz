import type { BadgeComponent } from "~/interface/Interface"

const Badge = (props: BadgeComponent) => {
  const { children, bgColor = "bg-blue-100", textColor = "text-black" } = props

  return (
    <span
      className={`inline-block rounded-2xl px-2 py-1 text-center text-xs font-normal ${bgColor} ${textColor}`}
      data-cy="badge-tag"
    >
      {children}
    </span>
  )
}

export default Badge
