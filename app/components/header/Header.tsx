import type { headerProps } from "~/interface/Interface"

const Header = ({ id, heading, rightChildren }: headerProps) => {
  return (
    <header className="flex items-center justify-between">
      <h2
        id={id}
        tabIndex={0}
        role={heading}
        title={heading}
        className="text-3xl font-bold text-black"
      >
        {heading}
      </h2>
      {rightChildren}
    </header>
  )
}
export default Header
