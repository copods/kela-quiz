import logo from '~/../public/assets/logo.svg'
function Header({ title }: { title: String }) {
  return (
    <div className="flex items-center gap-4">
      <img src={logo} alt="logo" />
      <span className="text-3xl font-bold leading-9">{title}</span>
    </div>
  )
}

export default Header
