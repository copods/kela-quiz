import type { HeaderProps } from "~/interface/Interface"

const Header = ({ id, heading, size, rightChildren }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <h2
        id={id}
        tabIndex={0}
        role={heading}
        title={heading}
        className={`${size ? size : "text-3xl"} font-bold text-black`}
      >
        {heading}
      </h2>
      {rightChildren}
    </header>
  )
}
export default Header
