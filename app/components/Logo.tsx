interface LogoProps {
  height?: string
  width?: string
}

function Logo({ height, width }: LogoProps) {
  return <img src="assets/logo.svg" height={height} width={width} alt="logo" />
}

export default Logo
