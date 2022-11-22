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
      alt={'K-Quiz'}
      
      className={styleClass}
    />
  )
}

export default Logo
