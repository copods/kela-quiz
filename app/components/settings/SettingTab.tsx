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
  return (
    <div className="flex gap-5">
      {tabs.map((tab, i) => {
        return <TabComponent key={i} tab={tab} />
      })}
    </div>
  )
}
export default SettingsTabs
