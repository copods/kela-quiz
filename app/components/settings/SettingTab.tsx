import { useTranslation } from 'react-i18next'
import TabComponent from '../TabsComponent'

const SettingsTabs = ({
  currentWorkspaceId,
}: {
  currentWorkspaceId: string
}) => {
  const { t } = useTranslation()
  const tabs = [
    {
      name: t('tabs.general'),
      route: `/${currentWorkspaceId}/settings/general`,
    },
    {
      name: t('tabs.workspaces'),
      route: `/${currentWorkspaceId}/settings/workspace`,
    },
  ]
  return (
    <div className="tabsWrapper flex gap-5">
      {tabs.map((tab, i) => {
        return <TabComponent key={i} tab={tab} />
      })}
    </div>
  )
}
export default SettingsTabs
