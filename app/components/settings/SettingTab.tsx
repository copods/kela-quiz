import { useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TabComponent from '../TabsComponent'

const SettingsTabs = () => {
  const { t } = useTranslation()
  const tabs = [
    {
      id: 0,
      name: t('tabs.general'),
      route: '/settings/general',
    },
    {
      id: 1,
      name: t('tabs.workspace'),
      route: '/settings/workspace',
    },
  ]
  const [currentTab, setCurrentTab] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    if (tabs[0].id === currentTab) {
      navigate(tabs[0].route)
    }
  }, [navigate])
  return (
    <div>
      <div className="flex flex-col gap-5">
        <TabComponent
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
    </div>
  )
}
export default SettingsTabs
