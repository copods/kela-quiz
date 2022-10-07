import { useState } from 'react'
import StepsTabComponent from '../tests/StepsTab'
import General from './General'
import Workspace from './Workspace'

const SettingsTabs = ({
  actionStatus,
  setActionStatus,
  error,
}: {
  actionStatus: boolean
  setActionStatus: (e: boolean) => void
  error?: string
}) => {
  const tabs = [
    {
      id: 0,
      name: 'Step 1',
      description: 'General',
    },
    {
      id: 1,
      name: 'Step 2',
      description: 'Workspace',
    },
    {
      id: 2,
      name: 'Step 2',
      description: 'Workspace',
    },
  ]
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <div>
      <div className="flex flex-col gap-8">
        <StepsTabComponent
          tabs={tabs}
          isDisabled={false}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0].id ? (
          <General
            error={error}
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
