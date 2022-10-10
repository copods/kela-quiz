import { useState } from 'react'
import TabComponent from '../TabsComponent'
import General from './General'
import Workspace from './Workspace'

const SettingsTabs = ({
  actionStatus,
  setActionStatus,
  validError,
  passNotMatched,
}: {
  actionStatus: boolean
  setActionStatus: (e: boolean) => void
  validError?: string
  passNotMatched?: string
}) => {
  const tabs = [
    {
      id: 0,
      name: 'General',
    },
    {
      id: 1,
      name: 'Workspace',
    },
  ]
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <div>
      <div className="flex flex-col gap-5">
        <TabComponent
          tabs={tabs}
          isDisabled={false}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0].id ? (
          <General
            validError={validError}
            passNotMatched={passNotMatched}
            actionStatus={actionStatus}
            setActionStatus={setActionStatus}
          />
        ) : (
          currentTab === tabs[1].id && <Workspace />
        )}
      </div>
    </div>
  )
}
export default SettingsTabs
