import { useTranslation } from 'react-i18next'

interface LogoProps {
  height?: string
  width?: string
  styleClass?: string
}

const Logo = ({ height, width, styleClass }: LogoProps) => {
  const { t } = useTranslation()
  return (
    <img
      src="../../assets/logo.svg"
      height={height}
      width={width}
      alt={t('logo.kQuizLogo')}
      className={styleClass}
    />
  )
}

export default Logo
