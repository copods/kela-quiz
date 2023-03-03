import { useTranslation } from "react-i18next"

import TabComponent from "../common-components/TabsComponent"

const SettingsTabs = ({
  currentWorkspaceId,
}: {
  currentWorkspaceId: string
}) => {
  const { t } = useTranslation()
  const tabs = [
    {
      name: t("tabs.general"),
      route: `/${currentWorkspaceId}/settings/general`,
    },
    {
      name: t("tabs.workspaces"),
      route: `/${currentWorkspaceId}/settings/workspace`,
    },
  ]
  return (
    <div
      className="tabsWrapper flex border-b-2 border-solid
     border-gray-300"
    >
      {tabs.map((tab, i) => {
        return <TabComponent key={i} tab={tab} />
      })}
    </div>
  )
}
export default SettingsTabs
