import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import logo from '~/../public/assets/logo.svg'
import { routes } from '~/constants/route.constants'

const Header = ({ title }: { title: string }) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-4">
      <Link
        to={routes.members}
        tabIndex={0}
        aria-label={t('commonConstants.goToDashboard')}
        title={t('commonConstants.logo')}
      >
        <img src={logo} alt={t('commonConstants.logo')} />
      </Link>
      <span className="text-3xl">{t('sideNav.sideNavHeading')}</span>
    </div>
  )
}

export default Header
