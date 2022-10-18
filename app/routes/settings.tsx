import AdminLayout from '~/components/layouts/AdminLayout'
import { Outlet, useLocation, useNavigate } from '@remix-run/react'
import SettingsTabs from '~/components/settings/SettingTab'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function Settings() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/settings') return navigate('/settings/general')
  }, [navigate, location.pathname])
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {t('commonConstants.settings')}
          </h1>
        </div>
        <SettingsTabs />
        <Outlet />
      </div>
    </AdminLayout>
  )
}
