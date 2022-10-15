import { useLocation } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import TabComponent from '../TabsComponent'

const SettingsTabs = () => {
  const { t } = useTranslation()
  const tabs = [
    {
      name: t('tabs.general'),
      route: '/settings/general',
    },
    {
      name: t('tabs.workspace'),
      route: '/settings/workspace',
    },
  ]
  const location = useLocation() // to get current location
  return (
    <div className="flex gap-5">
      {tabs.map((tab, i) => {
        const isActive = location.pathname === tab.route // to get tabs path which would match with current location
        return (
          <div key={i}>
            <TabComponent isActive={isActive} tab={tab} />
          </div>
        )
      })}
    </div>
  )
}
export default SettingsTabs
