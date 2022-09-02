import { sideNav } from "~/constants/common.constants"

interface LogoProps {
  height?: string
  width?: string
  styleClass?: string
}

const Logo = ({ height, width, styleClass }: LogoProps) => {
  return (
    <img
      src="../../assets/logo.svg"
      height={height}
      width={width}
      alt={sideNav.kQuizLogo}
      className={styleClass}
    />
  )
}

export default Logo
