const Header = ({
  id,
  heading,
  component,
}: {
  id: string
  heading: string
  component?: React.ReactNode
}) => {
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
      {component && component}
    </header>
  )
}
export default Header
