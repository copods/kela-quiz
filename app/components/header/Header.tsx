import type { headerProps } from "~/interface/Interface"

const Header = ({ id, heading, component }: headerProps) => {
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
      {component}
    </header>
  )
}
export default Header